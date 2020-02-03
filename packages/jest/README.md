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
