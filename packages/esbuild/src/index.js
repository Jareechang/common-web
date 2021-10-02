const path = require('path');
const customPlugins = require('./plugins');
const get = require('lodash.get');

function getBaseConfig(options = {}) {
  const entryPoint = get(options, 'entryPoint', './src/index.ts');
  const entryPoints = get(options, 'entryPoints', []);
  // Use current execution path if 'rootDir' not supplied
  const rootDir = get(options, 'rootDir', process.cwd());
  const outfile = get(options, 'outfile', './dist/index.js');
  const format = get(options, 'format', 'cjs');
  const platform = get(options, 'platform', 'node');
  const target = get(options, 'target', 'es2015');
  const plugins = get(options, 'plugins', []);
  const tsconfig = get(options, 'tsconfig', './tsconfig.json');
  const override = get(options, 'override', {});
  const bundle = get(options, 'bundle', false);
  const external = get(options, 'external', []);
  const config = {
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
    plugins: (
      platform === 'node'
      ? [customPlugins.nodeExternalsPlugin()]
      : []
    ).concat(plugins),
    bundle,
    external,
    target,
    ...override
  };

  // Replace entry points
  if (entryPoints.length > 0) {
    config.entryPoints = entryPoints;
  }

  return config;
}

module.exports = {
  getBaseConfig,
  plugins: customPlugins
};
