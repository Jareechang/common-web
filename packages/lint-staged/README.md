# @common-web/lint-staged

Automatically run linter commands prior to code passes git commit command

## Getting started


**yarn:**
```js
yarn add prettier @common-web/lint-staged -D
```

**npm:**

```js
npm install prettier @common-web/lint-staged --save-dev
```

in your repo create `lint-staged.config.js` then added the following:


```js
const BaseLintStagedConfig = require('@common-web/lint-staged');

module.exports = BaseLintStagedConfig;
```

## Running Prettier

Add the following to your "scripts" in your `package.json`

```json

{
    ...,

    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```


## Examples

- [Modern Express API](https://github.com/Jareechang/common-web-modern-express)
