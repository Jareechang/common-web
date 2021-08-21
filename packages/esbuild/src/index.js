const path = require('path');
const customPlugins = require('./plugins');
const _ = require('lodash');

function getBaseConfig(options = {}) {
  // Use current execution path if 'rootDir' not supplied
  const rootDir = _.get(options, 'rootDir', process.cwd());
  const entryPoint = _.get(options, 'entryPoint', './src/index.tsx');
  const outfile = _.get(options, 'outfile', './dist/index.js');
  const format = _.get(options, 'format', 'cjs');
  const platform = _.get(options, 'platform', 'node');
  const target = _.get(options, 'target', 'es2015');
  const plugins = _.get(options, 'plugins', []);
  const tsconfig = _.get(options, 'tsconfig', './tsconfig.json');
  const override = _.get(options, 'override', {});
  const baseConfig = {
    entryPoints: [
      path.join(
        rootDir,
        entryPoint
      )
    ],
    outfile,
    format,
    platform,
    tsconfig: path.join(
      rootDir,
      tsconfig
    ),
    plugins: [
      customPlugins.nodeExternalsPlugin(),
      ...plugins
    ],
    target,
    ...override
  };
}

module.exports = {
  getBaseConfig,
  plugins: customPlugins
};
