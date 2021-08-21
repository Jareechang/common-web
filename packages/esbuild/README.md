## Common esbuild config 

Using `esbuild` to transpile typescript scripts.

- [Getting Started](#getting-started)
- [Running the build](#running-the-build)
- [Caveats](#caveats)

## Caveats 

depending on projects, some features from modern ES and typescript may be mussing. Please see:

- [esbuild#javascript-caveats](https://esbuild.github.io/content-types/#javascript-caveats)
- [esbuild#typescript-caveats](https://esbuild.github.io/content-types/#typescript-caveats)

Please review the [esbuild](https://esbuild.github.io/) documentation for more options and information.

## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/esbuild -D
```

**npm:**

```js
npm install @common-web/esbuild --save-dev
```


### Running the build

1. Directly run the cli

```sh
npx esbuild-ts 
```

2. Use the common config file

**Creating build.js file:**
```js
// build.js

const commonEsbuild = require('@common-web/esbuild');
const esbuild = require('esbuild');
const path = require('path');

// Simple
esbuild.build(
    esbuild.getBaseConfig()
).then(() => {
  console.log('Build finished');
});

// Advanced (optional)
esbuild.build(
    esbuild.getBaseConfig({
      entryPoint: './my-custom-entry-file',
      outfile: './my-custom-out-file',
      plugins: [myCustomPlugin()],
      // By default it imports tsconfig from your root directory
      tsconfig: './path-to-my-ts-config',
      rootDir: path.join(process.cwd(), '../../'),
      target: 'esnext'
    })
).then(() => {
  console.log('Build finished');
});
```

**Add scripts to package.json:**
```json
{
  ...,
  "scripts": {
    "build": "node ./build.js"
  }
}
```
**Run the build:**
```sh
yarn build
```
