const commonPresets = [
    '@babel/preset-env',

    // React support
    '@babel/preset-react',

    // TS support
    '@babel/preset-typescript'
];

const commonNodePresets = [
    [
        '@babel/preset-env',
        {
            targets: { node: 'current' },
            include: ['transform-arrow-functions'],
            modules: false
        }
    ],
    // React support
    '@babel/preset-react',

    // TS support
    '@babel/preset-typecript'
];

const commonPlugins = [
    /**
    *   link: https://babeljs.io/docs/en/babel-plugin-proposal-decorators 
    *
    *   Support decorators
    */
    ['@babel/plugin-proposal-decorators', { legacy: true }],

    /**
    *   link: https://babeljs.io/docs/en/babel-plugin-proposal-function-bind
    *
    *   Support func bind syntax obj::func -> func.bind(obj)
    */
    '@babel/plugin-proposal-function-bind',

    /**
    *   link: https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
    *
    *   Support arrow functions in class 
    */
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-classes', {'loose': true}],

    /**
    *   link: https://babeljs.io/docs/en/babel-plugin-syntax-optional-chaining 
    *
    *   Support optional chaining -> a?.b
    */
    '@babel/plugin-proposal-optional-chaining',

    ['@babel/plugin-proposal-export-default-from', { 'legacy': true }],

    /**
    *   link: https://babeljs.io/docs/en/babel-plugin-transform-proto-to-assign 
    *
    *   Support transform __proto__ to assign -> bar.__proto__ = x
    */
    '@babel/plugin-transform-proto-to-assign',
    ['@babel/plugin-transform-runtime']
];

function getBaseConfig(presetsOverride = [], pluginsOverride = []) {
  const presets = [
      ...commonPresets,
      ...presetsOverride
  ];

  const plugins = [
      ...commonPlugins,
      ...pluginsOverride
  ];

  return {
    presets,
    plugins
  };
};

function getNodeBaseConfig(presetsOverride = [], pluginsOverride = []) {
  const presets = [
      ...commonPresets,
      ...presetsOverride
  ];

  const plugins = [
      ...commonPlugins,
      ...pluginsOverride
  ];

  return {
    presets,
    plugins
  };
};

exports.getBaseConfig = getBaseConfig;
exports.getNodeBaseConfig = getNodeBaseConfig;
