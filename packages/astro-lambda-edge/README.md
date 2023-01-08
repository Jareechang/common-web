# Astro Lambda@Edge Adapter

This Adapter allows Astro to deploy your SSR site to Lambda@Edge Lambda target.

This is a remix of the Astro’s [@astrojs/node](https://github.com/withastro/astro/tree/main/packages/integrations/node/).

It is purpose built for Lambda@Edge.

## Usage 

### 1. Install the adapter package

```sh
# Using NPM
npm install @common-web/astro-lambda-edge -D
# Using Yarn
yarn add @common-web/astro-lambda-edge -D
# Using PNPM
pnpm add @common-web/astro-lambda-edge -D
```

### 2. Add the following changes to `astro.config.mjs` 

```diff
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
+import lambdaAdapter from '@common-web/astro-lambda-edge';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
+  output: 'server',
+  adapter: lambdaAdapter()
});
```
