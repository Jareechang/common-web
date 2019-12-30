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


### Node (specific node preset)

```js
// babel.config.js

// For node based presets
const getNodeBaseConfig = require('@common-web/babel/babel.config').getNodeBaseConfig;

module.exports = getNodeBaseConfig();
```

### Other (use the base configuration)

```js
// babel.config.js

// For other application, ex react
const getBaseConfig = require('@common-web/babel/babel.config').getBaseConfig;

module.exports = getBaseConfig();
```

### Examples

- [Modern Express API](https://github.com/Jareechang/common-web-modern-express)
