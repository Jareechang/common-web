import type { NodeApp } from 'astro/app/node';
import type { Context, Callback, CloudFrontRequest, CloudFrontRequestEvent, CloudFrontResultResponse } from 'aws-lambda';
import { polyfill } from '@astrojs/webapi';
import {
  getRequest,
  getPath,
  mapToEdgeHeaders,
  createAstroRequestUrl,
  createAstroRequestHeaders,
} from './utils';
import { responseIterator } from './response-iterator';

polyfill(globalThis, {
  exclude: 'window document',
});

export function middleware(app: NodeApp) {
  return async function handler(
    event: CloudFrontRequestEvent,
    context: Context,
    callback: Callback<CloudFrontRequest>,
  ): Promise<CloudFrontResultResponse | undefined> {
    const cfRequest = getRequest(event);
    const uriPath = getPath(event);
    const method = cfRequest.method;
    // If the path has extension, then forward to S3 and return
    if (uriPath.match(/\.(jpg|jpeg|gif|css|png|js|ico|json|txt)$/)) {
      callback(null, cfRequest);
      return;
    }
    const requestUrl = createAstroRequestUrl(event);
    const headers = createAstroRequestHeaders(event);
    const request = new Request(requestUrl.toString(), {
      method,
      headers,
    });
    try {
      const rendered = await app.render(request);
      return {
        status: String(rendered.status),
        headers: mapToEdgeHeaders(rendered.headers),
        body: await rendered.text(),
      };
    } catch (error) {
      throw error;
    }
  }
}
