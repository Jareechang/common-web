## Why ?

Spend less time worrying about setting up plugins just to use latest ES6 or typescript features.

Just install and use.

## Getting started

1. Install the pkg:

**yarn:**
```js
yarn add @common-web/rollup -D
```

**npm:**

```js
npm install @common-web/rollup --save-dev
```

2. Add scripts to your package.json

```json
scripts: {
    "ts-check": "tsc --noEmit",
    "build": "ts-check && rollup -c"
}
```

3. Run the build
```sh
yarn run build

```

**Base plugin support:**
- eslint (see [rollup-plugin-eslint](https://github.com/TrySound/rollup-plugin-eslint) for options)
- babel (see [@common-web/babel](https://github.com/Jareechang/common-web/tree/master/packages/babel) pkg for a list default ready to use config)
- typescript (see [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript) for options)

#### Recommended Use

- Small packages, backend using latest ESnext / Typescript

### Setting up

```js
// rollup.config.js

import { getBaseRollupPlugins } from '@common-web/rollup';

const plugins = getBaseRollupPlugins({
    // eslint: { baseConfig: require('./eslintrc.js') } if you are using `eslintrc.js`
}).concat([
    // Include your own plugins to support other features 
]);

export default {
    input,
    output,
    plugins
}

```

for more configuration options visit [rollup](https://rollupjs.org/guide/en/).

### Custom Options 

**Ability to opt-out of default plugins:**

```js
// rollup.config.js

import { getBaseRollupPlugins } from '@common-web/rollup';

const plugins = getBaseRollupPlugins({
    eslint: {
        disabled: true
    },
    json: {
        disabled: true
    }
}).conat([
    // Include your own plugins to support other features 
]);

```

### Examples 

- [TS util lib Example](https://github.com/Jareechang/common-web-rollup-example)
- [Modern Express API Example](https://github.com/Jareechang/common-web-modern-express)
