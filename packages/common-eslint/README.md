## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/eslint -D
```

**npm:**

```js
npm install @common-web/eslint --save-dev
```

in your repo create `.eslintrc.js` or if you prefer `eslintrc.js` (please read caveat below (1)) file then added the following:

```js
const commonConfig = require('@common-web/eslint/eslintrc.js');

module.exports = commonConfig;
```
### Recommended (1)

I Recommend using `.eslintrc.js` as most eslint plugins (ex. transpiler - webpack, rollup) will look for `.eslintrc*` files.
Unless you would like to configure that separately into the plugin.

## Running the eslint

```sh
eslint -c eslintrc.js ./src
```
