## Quick summary

Your go-to tool belt to make it easier to work with LLMs.

- 💰 Estimate cost
- ❓ Get token information (token count, characters etc)
- 🔎 NLP: Extract entities 
- 📄 NLP: Process text (chunking etc) 

**Supported LLMs information (for token information):**

- OpenAI
- Anthropic
- More coming soon

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

Estimate costs by filtering by specific model types.

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

### NLP: Extract entities

Extract entities from your text prompt.

**Code:**

```ts
import { nlp } from '@common-web/ai-tools';

async function main() {
  const entities = await nlp.extractEntities({
    prompt: `
    John Doe.
    some random text.
    I weigh 60 kg.
    random text.
    Apple. Nike. Google. notion.com
    Japan. Korea. Vietnam.
    American.
    12PM. noon.`,
  });
  console.log(entities)
}

main();
```

**Response:**

<details>

<summary>show response</summary>

```json
[
    {
        "end": 8,
        "start": 0,
        "text": "John Doe",
        "type": "PERSON"
    },
    {
        "end": 41,
        "start": 36,
        "text": "60 kg",
        "type": "QUANTITY"
    },
    {
        "end": 61,
        "start": 55,
        "text": "Google",
        "type": "ORG"
    },
    {
        "end": 73,
        "start": 63,
        "text": "notion.com",
        "type": "ORG"
    },
    {
        "end": 80,
        "start": 75,
        "text": "Japan",
        "type": "GPE"
    },
    {
        "end": 90,
        "start": 82,
        "text": "American",
        "type": "NORP"
    },
    {
        "end": 96,
        "start": 92,
        "text": "12PM",
        "type": "CARDINAL"
    },
    {
        "end": 102,
        "start": 98,
        "text": "noon",
        "type": "TIME"
    }
]
```
</details>


### NLP: Chunk html 

Chunk Html into distinct sections by providing sections to split on (ie "h1", "h2", "h3").

**Code:**

```ts
import { nlp } from '@common-web/ai-tools';

async function main() {
  const htmlChunks = await nlp.chunk.html({
    text: `
      <!DOCTYPE html>
      <html>
      <body>
          <div>
              <h1>Foo</h1>
              <p>Some intro text about Foo.</p>
              <div>
                  <h2>this is header 2 main section</h2>
                  <p>Lorem ipsum goes here</p>
                  <h3>this is header 3 #1</h3>
                  <p>this is header 3 #1 description</p>
                  <h3>this is header 3 #2</h3>
                  <p>this is header 3 #2 description.</p>
              </div>
              <div>
                  <h2>Baz</h2>
                  <p>Some text about Baz</p>
              </div>
              <br>
              <p>more text goes here</p>
          </div>
      </body>
      </html>
    `,
    splitOn: [
      ['h1', 'header-1'],
      ['h2', 'header-2'],
      ['h3', 'header-3'],
    ],
  })
  console.log(htmlChunks);
}
```

**Response:**

<details>

<summary>show response</summary>

```json
[
    {
        "page_content": "Foo",
        "metadata": {},
        "type": "Document"
    },
    {
        "page_content": "Some intro text about Foo.  \nthis is header 2 main section this is header 3 #1 this is header 3 #2",
        "metadata": {
            "Header 1": "Foo"
        },
        "type": "Document"
    },
    {
        "page_content": "Lorem ipsum goes here",
        "metadata": {
            "Header 1": "Foo",
            "Header 2": "this is header 2 main section"
        },
        "type": "Document"
    },
    {
        "page_content": "this is header 3 #1 description",
        "metadata": {
            "Header 1": "Foo",
            "Header 2": "this is header 2 main section",
            "Header 3": "this is header 3 #1"
        },
        "type": "Document"
    },
    {
        "page_content": "this is header 3 #2 description.",
        "metadata": {
            "Header 1": "Foo",
            "Header 2": "this is header 2 main section",
            "Header 3": "this is header 3 #2"
        },
        "type": "Document"
    },
    {
        "page_content": "Baz",
        "metadata": {
            "Header 1": "Foo"
        },
        "type": "Document"
    },
    {
        "page_content": "Some text about Baz",
        "metadata": {
            "Header 1": "Foo",
            "Header 2": "Baz"
        },
        "type": "Document"
    },
    {
        "page_content": "more text goes here",
        "metadata": {
            "Header 1": "Foo"
        },
        "type": "Document"
    }
]
```
</details>


### NLP: Chunk markdown

Chunk Markdown into distinct sections by providing sections to split on (ie "#", "##", "###").

**Code:**

```ts
import { nlp } from '@common-web/ai-tools';

async function main() {
  const htmlChunks = await nlp.chunk.markdown({
    text: `
        # Foo

        Some intro text about Foo.

        ## this is header 2 main section

        Lorem ipsum goes here

        ### this is header 3 #1

        this is header 3 #1 description

        ### this is header 3 #2

        this is header 3 #2 description.

        ## Baz

        Some text about Baz

        more text goes here
    `,
    splitOn: [
      ['#', 'header-1'],
      ['##', 'header-2'],
      ['###', 'header-3'],
    ],
  })
  console.log(htmlChunks);
}
```

**Response:**

See HTML response example (it’s the same)
