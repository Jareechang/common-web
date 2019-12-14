const commonPresets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typecript',
];

const commonPlugins = [
    // Support decorators
    '@babel/plugin-proposal-decorators',

    // Support decorators
    '@babel/plugin-proposal-function-bind',

    // Support arrow functions in classes
    '@babel/plugin-proposal-class-properties'
    ['@babel/plugin-transform-classes', {'loose': true}]

    // Support optional chaining -> a?.b
    '@babel/plugin-proposal-optional-chaining'

    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-export-default-from', { 'legacy': true }]

    '@babel/plugin-transform-proto-to-assign',
    ['@babel/plugin-transform-runtime']
];

module.exports = function (presets, plugins) {
  const presets = [
      ...commonPresets,
      ...presets
  ];

  const plugins = [
      ...commonPlugins,
      ...plugins
  ];

  return {
    presets,
    plugins
  };
};
