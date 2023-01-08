import type { CloudFrontRequestEvent } from 'aws-lambda';
import astro from 'string-width';
import LambdaAtEdgeEventAboutMock from '../__mocks__/lambda-at-edge-about-mock.json';
import LambdaAtEdgeEventHomeMock from '../__mocks__/lambda-at-edge-home-mock.json';
import LambdaAtEdgeEventRootObjectMock from '../__mocks__/lambda-at-edge-root-object-mock.json';
import {
  getPath,
  mapToEdgeHeaders,
  createAstroRequestUrl,
  createAstroRequestHeaders,
  transformAstroRequest,
} from '../utils';

const events: {
  [key: string]: CloudFrontRequestEvent;
} = {
  about: LambdaAtEdgeEventAboutMock as CloudFrontRequestEvent,
  home: LambdaAtEdgeEventHomeMock as CloudFrontRequestEvent,
  rootObject: LambdaAtEdgeEventRootObjectMock as CloudFrontRequestEvent,
};

describe('utils', () => {
  describe('mapToEdgeHeaders', () => {
    it('should map headers to be lambda@edge compatible', () => {
      const h = new Headers();
      h.set('x-foo', 'bar');
      h.set('x-bar', 'baz');
      expect(mapToEdgeHeaders(h)).toEqual({
        'x-foo': [{ key: 'x-foo', value: 'bar' }],
        'x-bar': [{ key: 'x-bar', value: 'baz' }],
      });
    });
  });
  describe('getPath', () => {
    it('should map "index.html" to "/"', () => {
      expect(getPath(events.rootObject)).toEqual('/');
    });
    it('should not map the others uris', () => {
      expect(getPath(events.home)).toEqual('/');
      expect(getPath(events.about)).toEqual('/about');
    });
  });
  describe('transformAstroRequest', () => {
    it('return with the request', () => {
      expect(transformAstroRequest(events.home)).toBeTruthy();
    });
  });
  describe('createAstroRequestUrl', () => {
    it('should return with the host (protocol + host) from cloudfront', () => {
      const astroRequestUrl: URL = createAstroRequestUrl(events.about);
      expect(astroRequestUrl.toString()).toBe(
        'https://d111111abcdef8.cloudfront.net/about?test=123&enabled=1'
      );
    });
    it('should return with the query string from cloudfront', () => {
      const astroRequestUrl: URL = createAstroRequestUrl(events.about);
      expect(astroRequestUrl.searchParams.toString()).toBe('test=123&enabled=1');
    });
  });
  describe('createAstroRequestHeaders', () => {
    it('should return with the headers from cloudfront', () => {
      const astroRequestHeaders = createAstroRequestHeaders(events.about);
      expect(astroRequestHeaders.get('host')).toBe(
        'd111111abcdef8.cloudfront.net'
      );
      expect(astroRequestHeaders.get('cookie')).toBe(
        'key1=value1;key2=value2'
      );
      expect(astroRequestHeaders.get('user-agent')).toBe(
        'curl/7.66.0'
      );
      expect(astroRequestHeaders.get('accept')).toBe(
        '*/*'
      );
    });
  });
});
