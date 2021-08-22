#!/usr/bin/env node

const esbuild = require('esbuild');
const config = require('./src');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

console.time('[cli] esbuild');

// Support some quick options for cli
const argOptions = [
  'rootDir',
  'entryPoint',
  'outfile',
  'format',
  'platform',
  'target',
  'tsconfig'
];

const esbuildOptions = argOptions.reduce((acc, key) => {
  acc[key] = argv[key];
  return acc;
}, {});

esbuild.build(config.getBaseConfig(esbuildOptions))
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
      ...esbuildOptions,
      override: {
        allowOverwrite: true
      }
    }));
  });

console.timeEnd('[cli] esbuild');
