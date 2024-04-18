import {
  ICostEstimation,
  ICostEstimationParameters,
} from './types';

import { DEFAULT_COST_ESTIMATION_ENDPOINT } from './constants';

const isValidArray = (value: unknown) => Array.isArray(value) && value.length > 0;
const isEmptyString = (value: unknown) => typeof value === 'string' && value.length === 0;

export const estimateCost = async(
  params: ICostEstimationParameters
): Promise<ICostEstimation> => {
  const endpoint = params?.endpoint ?? DEFAULT_COST_ESTIMATION_ENDPOINT;
  const url = new URL(endpoint);
  const prompt = params?.prompt ?? '';
  const filters = params?.filters ?? [];

  if (isEmptyString(prompt)) {
    throw new Error('params.prompt is a required field');
  }

  if (isValidArray(filters)) {
    url.searchParams.append('filter', filters.join(','));
  }

  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
    })
  });

  return (request.json() as Promise<ICostEstimation>);
};

export * from './types';
