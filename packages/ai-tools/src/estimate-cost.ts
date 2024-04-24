import {
  ICostEstimation,
  IPromptMethodParameters,
} from './types';

import { makeRequest } from './api';

/**
 * Extract NLP entities from a text prompt
 *
 * @param {Object} params - common method parameters
 * @param {Object} params.prompt - The provided prompt to be analyzed
 * @param {Object} params.filters - filters for different model types
 *
 * @example
 *
 * const cost = await nlp.estimateCost({ prompt: "Hey! How are you ?" });
 *
 * */
export const estimateCost = async(
  params: IPromptMethodParameters
): Promise<ICostEstimation> => {
  return makeRequest({
    pathname: '/tools/ai/costs',
    endpoint: params.endpoint,
    queries: {
      filters: params.filters,
    },
    body: {
      prompt: params.prompt,
    },
  }) as Promise<ICostEstimation>;
};
