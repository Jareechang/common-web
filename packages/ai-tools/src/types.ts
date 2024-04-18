export namespace ModelTypes {
  // OpenAI
  export enum OpenAI {
    GPT_4_TURBO_2024_04_09 = 'gpt-4-turbo-2024-04-09',
    GPT_4 = 'gpt-4',
    GPT_4_32K = 'gpt-4-32k',
    GPT_3_5_TURBO_0125 = 'gpt-3.5-turbo-0125',
    DAVINCI_002 = 'davinci-002',
    BABBAGE_002 = 'babbage-002',
    TEXT_EMBEDDING_3_SMALL = 'text-embedding-3-small',
    TEXT_EMBEDDING_3_LARGE = 'text-embedding-3-large',
    TEXT_EMBEDDING_ADA_002 = 'text-embedding-ada-002',
  }

  // Anthropic
  export enum Anthropic {
    CLAUDE_3_OPUS_20240229 = 'claude-3-opus-20240229',
    CLAUDE_3_SONNET_20240229 = 'claude-3-sonnet-20240229',
    CLAUDE_3_HAIKU_20240307 = 'claude-3-haiku-20240307',
    CLAUDE_2_1 = 'claude-2.1',
    CLAUDE_2_0 = 'claude-2.0',
    CLAUDE_INSTANT_1_2 = 'claude-instant-1.2'
  }
}

interface IPricingCostResponse {
  model: string;
  cost: {
    dollars: number;
    cents: number;
    currency: 'USD';
  };
}

export enum ICompanies {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
}

export interface ICostEstimation {
  tokens: {
    [key in ICompanies]: {
      count: number;
      characters: number;
    }
  };
  characters: number;
  costs: IPricingCostResponse[];
  total: {
    cents: number;
    dollars: number;
  }
}

export interface ICostEstimationParameters {
  /**
   * The prompt to be analyzed
   * */
  prompt: string;
  /**
   * The filters to be applied (whether that’s for specific models)
   * */
  filters?: string[];
  /**
   * provide a custom endpoint
   * */
  endpoint?: string;
}
