## Common esbuild config 

Using `esbuild` to transpile typescript scripts.

- [Why](#why)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Running the build](#running-the-build)
- [Configuration Options](#configuration-options)
- [Caveats](#caveats)

## Why

**Why not use `esbuild` directly ?**

You can use it directly but for typescript projects you’d need additional setup like
handling resolution of external `node_modules` and other options like `format`, `target`, `platform`.

**This might be for you if:**

- You are creating scripts or servers on node
- You need to output `cjs`
- You need to target `es2015` syntax

This package comes with all the configuration on esbuild out of the box to get up and running without going through the docs and figuring out what options are needed.

**Typical uses:**

- You are writing simple node server in `typescript` you need to transpile to `cjs`
- You are writing npm package with utility scripts in `typescript` you need to transpile to `cjs`
- etc...

## Requirements

Requires `node >= 12.x` due to `yargs`.

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
// simple build
npx esbuild-ts

// Change path
npx esbuild-ts --entryPoint=./path-to-my-entry --outfile=./path-to-my-outfile
```

For more options see below [Configuration Options](#configuration-options)

2. Use the common config file

**Creating build.js file:**
```js
// build.js

const config = require('@common-web/esbuild');
const esbuild = require('esbuild');
const path = require('path');

// Simple
esbuild.build(config.getBaseConfig())
  .then(() => {
      console.log('Build finished');
  });

// Advanced (optional)
esbuild.build(
    config.getBaseConfig({
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

## Configuration options
| name  | description  |  defaults | cli configurable  | data type |
|---|---|---|---|---|
| rootDir | working or root directory |  current working directory |  y  | string | 
| entryPoint | entry path for the build (relative to rootDir)|  ./src/index.ts |  y  | string |
| outfile | output path for the build (relative to rootDir)|  ./dist/index.js |  y  | string|
| format | format of the build output |  'cjs' |  y  | string |
| platform | platform for the build output |  node |  y  | string |
| target | target for the build output |  'es2015' |  y  | string or string[] |
| plugins | additional esbuild plugins |  [] |  n  | array |
| tsconfig | path to tsconfig |  ./tsconfig.json |  y  | string |
| override | additional override options on esbuild |  {} |  n  | object |
| bundle | bundle the files |  false |  y  | bolean |
| external | external files to exclude from final bundle |  [] |  y  | string[] |

**More options:**

- see [esbuild#simple-options](https://esbuild.github.io/api/#simple-options)
- see [esbuild#advcaned-options](https://esbuild.github.io/api/#advanced-options)

## Caveats 

- depending on projects, some features from modern ES and typescript may be missing. Please see:  
  - [esbuild#javascript-caveats](https://esbuild.github.io/content-types/#javascript-caveats)  
  - [esbuild#typescript-caveats](https://esbuild.github.io/content-types/#typescript-caveats)  
- No typescript typechecking (types are stripped from the build process in `esbuild`)
  - [esbuild#typescript-caveats](https://esbuild.github.io/content-types/#typescript-caveats)  

Please review the [esbuild](https://esbuild.github.io/) documentation for more options and information.

## Examples

#### Bundling example (full node web app)
- [lightbnb](https://github.com/Jareechang/lightbnb) (Bundling example - node web app)
- [express-ts-esbuild](https://github.com/Jareechang/express-ts-esbuild) (simple example - one entry only)
- [node library]() (TODO - to be added)
