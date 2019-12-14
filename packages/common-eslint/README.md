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

in your repo create `eslintrc.js` file then added the following:

```js
const commonConfig = require('@common-web/eslint/eslintrc.js');

module.exports = commonConfig;
```

## Running the eslint

```sh
eslint -c eslintrc.js ./src
```
