const definedRoot = process.env.COMMON_JEST_ROOT || '';
const supportedFileExtensions = process.env.COMMON_JEST_FILE_EXTENSIONS || '';
const isProduction = process.env.NODE_ENV === 'production';
const ignorePatterns = process.env.COMMON_JEST_IGNORE_PATTERNS || '';

function stringToArrayConfig(config) {
    if (typeof config === 'string') return config.split(',');

    return [];
}

module.exports = {
    verbose: !isProduction,
    roots: definedRoot || [
        'src'
    ],

    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],

    transform: {
      "^.+\\.jsx?$": "babel-jest",
      '^.+\\.tsx?$': 'ts-jest',
    },

    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ].concat(stringToArrayConfig(supportedFileExtensions)),

    coveragePathIgnorePatterns: [
        'node_modules'
    ].concat(stringToArrayConfig(ignorePatterns)),

    transformIgnorePatterns: [
        'node_modules'
    ].concat(stringToArrayConfig(ignorePatterns)),
};
