import { makeRequest } from './api';

import {
  INaturalLanguageApis,
  IPromptMethodParameters,
  IChunkTextMethodParameters,
  IProcessedTextChunkEntry,
  IEntityEntry,
} from './types';

/**
 * Extract NLP entities from a text prompt
 *
 * @param {Object} params - common method parameters
 * @param {Object} params.prompt - The provided prompt to be analyzed
 *
 * */
const extractEntities = async(
  params: IPromptMethodParameters
): Promise<IEntityEntry[]> => {
  return makeRequest({
    pathname: '/tools/ai/nlp/entities',
    endpoint: params.endpoint,
    body: {
      prompt: params.prompt,
    },
  }) as Promise<IEntityEntry[]>;
};

/**
 * Split html into distinct section (or text chunks)
 *
 * @param {Object} params - common method parameters
 * @param {string} params.text - The provided text to be processed
 * @param {Array<string[]>} params.splitOn - The distinct sections to be split on
 *
 * @example
 *
 * nlp.chunk.html({
 *  text: '<div><h1> this is my header<h1> <p> this is my description</p></div>'
 *  splitOn: [['h1', 'header-1']]
 * });
 *
 * */
const chunkHtml = async(
  params: IChunkTextMethodParameters
): Promise<IProcessedTextChunkEntry[]> => {
  return makeRequest({
    pathname: '/tools/ai/nlp/split/html',
    body: {
      text: params.text,
      split_on: params.splitOn,
    },
    endpoint: params.endpoint
  }) as Promise<IProcessedTextChunkEntry[]>;
};

/**
 * Split markdown into distinct section (or text chunks)
 *
 * @param {Object} params - common method parameters
 * @param {string} params.text - The provided text to be processed
 * @param {Array<string[]>} params.splitOn - The distinct sections to be split on
 *
 * @example
 *
 * nlp.chunk.markdown({
 *  text: '# my header \n this is my description \n ## my header 2 \n  this is my other description'
 *  splitOn: [['#', 'header-1'], ['##', 'header-2']]
 * });
 *
 * */
const chunkMarkdown = async(
  params: IChunkTextMethodParameters
): Promise<IProcessedTextChunkEntry[]> => {
  return makeRequest({
    pathname: '/tools/ai/nlp/split/markdown',
    body: {
      text: params.text,
      split_on: params.splitOn,
    },
    endpoint: params.endpoint
  }) as Promise<IProcessedTextChunkEntry[]>;
};

export const nlp: INaturalLanguageApis = {
  extractEntities,
  chunk: {
    html: chunkHtml,
    markdown: chunkMarkdown,
  }
};
