#!/usr/bin/env node

const esbuild = require('esbuild');
const config = require('./src');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')

const parseArray = (arg) => {
  if (!!arg.match(',')) {
    return arg.split(',');
  }
  return arg;
}

const argv = yargs(hideBin(process.argv))
  .coerce(['external', 'target'], parseArray)
  .argv

console.time('[cli] esbuild');

// Support some quick options for cli
const argOptions = [
  'rootDir',
  'entryPoint',
  'outfile',
  'format',
  'platform',
  'target',
  'tsconfig',
  'bundle',
  'external',
];

const esbuildOptions = argOptions.reduce((acc, key) => {
  if (argv[key]) {
    acc[key] = argv[key];
  }
  return acc;
}, {});

esbuild.build(config.getBaseConfig(esbuildOptions));

console.timeEnd('[cli] esbuild');
