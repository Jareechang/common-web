## Common jest config 

Supports typescript and modern es6 features out of the box in test code base, using the transformers:

- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [babel-jest](https://github.com/facebook/jest/tree/master/packages/babel-jest)

the configuration defaults to looking for test files in the **src/** folder under **__tests__**

## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/jest -D
```

**npm:**

```js
npm install @common-web/jest --save-dev
```

in your repo create `jest.config.js` file with the following code:

```js
const commonConfig = require('@common-web/jest');

module.exports = commonConfig;
```

**Changing common configurations, if you need to change paths or ignore certain files:**

```js
const commonConfig = require('@common-web/jest');

// Defines the "src" of the test files
process.env.COMMON_JEST_ROOT = 'my/new/root';

// Support additional extensions in your application 
process.env.COMMON_JEST_FILE_EXTENSIONS = 'svg';

// Add additional ignore patterns
process.env.COMMON_JEST_IGNORE_PATTERNS = 'dist/**';

module.exports = commonConfig;
```

### Adding the script to (package.json)
```js
{
    ...

    "scripts": {
        "test": "jest -c ./jest.config.js"
    }
}
```

For more information and options for jest cli please see official docs - [here](https://jestjs.io/docs/en/cli)

## Running the jest

```sh
yarn run test

or

npm run test
```
