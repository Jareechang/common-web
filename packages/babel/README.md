## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/babel -D
```

**npm:**

```js
npm install @common-web/babel --save-dev
```

in your repo create `babel.config.js` file then added the following:

```js
const babelConfigFn = require('@common-web/babel/babel.config.js');


// Add additional plugins as needed
const babelConfig = babelConfigFn([<other-presets>], [<other-plugins>]);

module.exports = babelConfig;
```
