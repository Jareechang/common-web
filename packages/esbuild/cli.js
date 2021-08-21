#!/usr/bin/env node

const esbuild = require('esbuild');
const config = require('./src');

console.time('esbuild');

esbuild.build(config.getBaseConfig())
  .then(() => {
  /*
   *
   * Rebuild js out file from ts due to some features may not be
   * supported in typescript yet (ie nullish coalescing - `let a = "" ?? true`).
   *
   * See https://esbuild.github.io/content-types/#typescript-caveats
   *
   * **/
    esbuild.build(config.getBaseConfig({
      override: {
        allowOverwrite: true
      }
    }));
});

console.timeEnd('esbuild');
