## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/rollup -D
```

**npm:**

```js
npm install @common-web/rollup --save-dev
```

**Base plugin support:**
- eslint
- babel (see `@common-web/babel` pkg for a list default ready to use config)
- typescript

#### Recommended Use

- Small packages, backend using latest ESnext / Typescript

### Setting up

```js
// rollup.config.js

import { getBaseRollupPlugins } from '@common-web/rollup';

const plugins = getBaseRollupPlugins({
    // eslint: { baseConfig: require('./eslintrc.js') } if you are using `eslintrc.js`
}).conat([
    // Include your own plugins to support other features 
]);

export default {
    input,
    output,
    plugins
}

```

for more configuration options visit [rollup](https://rollupjs.org/guide/en/).
