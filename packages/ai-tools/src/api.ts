import { DEFAULT_API_ENDPOINT } from './constants';
import { IApiRequestParameters } from './types';

const isValidArray = (value: unknown) => Array.isArray(value) && value.length > 0;
const isEmptyString = (value: unknown) => typeof value === 'string' && value.length === 0;

const normalizeParamQueries = (
  params: IApiRequestParameters
): IApiRequestParameters['queries'] => {
  const queries = params?.queries;
  const hasQueries = typeof queries === 'object'
    && Object.keys(queries).length > 0;

  let normalizedQueries = params?.queries ?? {};

  if (hasQueries) {
    for (let query in queries) {
      const queryValue = queries[query];
      const isMultipleQueryValues = queryValue && queryValue.includes(',');
      if (isMultipleQueryValues) {
        normalizedQueries[query] = (queryValue as string[]).join(',');
      } else {
        normalizedQueries[query] = (queryValue as string);
      }
    }
  }

  return normalizedQueries;
}

export const makeRequest = async(
  params: IApiRequestParameters
): Promise<unknown> => {
  const endpoint = params?.endpoint ?? DEFAULT_API_ENDPOINT;
  const pathname = params?.pathname ?? '';
  const url = new URL(`${endpoint}${pathname}`);
  const queries = normalizeParamQueries(params);
  const hasQueries = typeof queries === 'object'
    && Object.keys(queries).length > 0;
  const body = params?.body ?? {};

  if (hasQueries) {
    for (let query in queries) {
      let queryValue = queries[query];
      url.searchParams.append(query, (queryValue as string));
    }
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
};
