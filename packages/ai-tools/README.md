## Quick summary

A tiny package that helps you to estimate cost of prompts in each AI service.

Give it a prompt, and get an a cost estimation based on tokens.

**Other information**

- token count 
- characters
- cost estimations
- total

**Supported services:**

- OpenAI
- Anthropic

## Getting started

1. Install the package `npm install @common-web/ai-tools`

2. Import the tool and use it

## Examples

### Estimate Cost (default)

```ts
import { estimateCost } from '@common-web/ai-tools';

async function main() {
  const cost = await estimateCost({
    prompt: 'this is my prompt',
  });
  console.log(cost)
}

main();
```

### Estimate Cost (with filtering)

```ts
import { estimateCost, ModelTypes } from '@common-web/ai-tools';

async function main() {
  const cost = await estimateCost({
    prompt: 'this is my prompt',
    filters: [
      ModelTypes.OpenAI.GPT_4_TURBO_2024_04_09,
      ModelTypes.OpenAI.TEXT_EMBEDDING_ADA_002,
      ModelTypes.Anthropic.CLAUDE_3_OPUS_20240229,
    ]
  });
  console.log(cost)
}

main();
```
