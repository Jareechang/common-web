import type {
  CloudFrontRequest,
  CloudFrontRequestEvent,
  CloudFrontHeaders
} from 'aws-lambda';

/*
 * Create cloudfront edge headers
 *
 *
 * It needs to be in the format of:
 *
 * {
 *  'header-name': [
 *     {
 *        key: 'header-name',
 *        value: 'header-value'
 *      }
 *    ]
 *  }
 *
 * **/
interface EdgeHeaders {
  [key: string]: {
    key: string;
    value: string;
  }[];
}

export function mapToEdgeHeaders(headers: Headers) {
  let cfHeaders = {}
  for (const [key, value] of headers.entries()) {
    cfHeaders[key] = [
      {
        key,
        value
      }
    ]
  }
  return cfHeaders;
}

export const getRequest = (
  event: CloudFrontRequestEvent
): CloudFrontRequest => {
  const { request } = event.Records[0].cf;
  return request;
};

export const getHeaders = (
  event: CloudFrontRequestEvent
): CloudFrontHeaders => {
  const request = getRequest(event);
  return request.headers;
};

/*
 * If the default root object is set on cloudfront then path uri comes in as 'index.html'
 *
 * We will need to map this to "/" for Astro SSR
 *
 * **/
export const getPath = (event: CloudFrontRequestEvent): string => {
  const request = getRequest(event);
  const uri = request.uri;
  if (uri === '/index.html') {
    return '/';
  }
  return request.uri;
};

export const getQueryString = (event: CloudFrontRequestEvent): string => {
  const request = getRequest(event);
  return request.querystring ?? '';
};

export const getCookies = (event: CloudFrontRequestEvent): string => {
  const request = getRequest(event);
  const headers = request.headers;
  return headers.cookie?.[0].value ?? '';
}

/*
 * Create a new request header object then append the lambda@Edge origin request headers
 *
 * **/
export const createHeader = (
  headers: CloudFrontHeaders
): Headers => {
  const h: Headers = new Headers();
  Object
    .entries(headers)
    .forEach(([_, props]) => {
      const { key, value } = props[0];
      h.set(key, value);
    });
  return h;
}


/*
 * Create a new request object for Astro with the details from lambda@Edge origin request
 *
 * **/
export const createAstroRequestUrl = (
  event: CloudFrontRequestEvent
): URL => {
  let result = '';
  const headers: CloudFrontHeaders = getHeaders(event);
  const path = getPath(event);
  const host = headers.host[0].value;
  const queryString = getQueryString(event);
  const queryStringParam = queryString.length > 0 ? `?${queryString}` : '';
  const protocol = headers['x-forwarded-proto'] || 'https';
  if (host) {
    result = `${protocol}://${host}`;
  }
  return new URL(`${path}${queryStringParam}`, result);
}

export const createAstroRequestHeaders = (
  event: CloudFrontRequestEvent
): Headers => {
  const headers = getHeaders(event);
  const cookies = getCookies(event);
  const h: Headers = createHeader(headers);
  return h;
}

export const transformAstroRequest = (
  event: CloudFrontRequestEvent
): Request => {
  return new Request('https://astro.build' + event.Records[0].cf.request.uri);
}
