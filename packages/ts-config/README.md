## Getting started

Install the pkg:

**yarn:**
```js
yarn add @common-web/ts-config -D
```

**npm:**

```js
npm install @common-web/ts-config --save-dev
```

in your repo create `tsconfig.json` then added the following:

**note:** This assume you have ts files inside "src", if you have a different file structure, change it accordingly.

```js
{
  "extends": "./node_modules/@common-web/ts-config/tsconfig.base.json",
  "compilerOptions": {},
  "include": [
    "./src/**/*.ts",
    "./global.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

I Recommend using `.eslintrc.js` as most eslint plugins (ex. transpiler - webpack, rollup) will look for `.eslintrc*` files.
Unless you would like to configure that separately into the plugin.

## Running TSC 


This step requires you to have typescript installed.

```sh
// By default, tsc will pick up your tsconfig.json
tsc
```
