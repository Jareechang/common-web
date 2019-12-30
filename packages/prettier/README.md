# @common-web/prettier

Automatically enforce some basic coding practice in your code base (ex spacing, quotes, tab width etc)

## Getting started

Install the pkg:

**yarn:**
```js
yarn add prettier @common-web/prettier -D
```

**npm:**

```js
npm install prettier @common-web/prettier --save-dev
```

in your repo create `prettier.config.js` then added the following:


```js
const BasePrettierConfig = require('@common-web/prettier');

module.exports = BasePrettierConfig;
```

## Running TSC 

Add the following to your "scripts" in your `package.json`

```json

{
    ...,

    "scripts": {
        "prettier --write -l \"src/**/*.ts\
    }
}
```

**Note:** Feel free change the 'src' and file pattern matching to suit your needs 


```sh
// By default, tsc will pick up your tsconfig.json
prettier --write
```

## Examples

- [@common-web Rollup/ Prettier example](https://github.com/Jareechang/common-web-rollup-example)
