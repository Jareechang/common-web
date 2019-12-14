module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "jest": true
    },

    "globals": {
        "__dirname": false,
        "require": false,
        "$": false,
        "document": false,
        "window": false,
        "console": false,
        "module": false,
        "React": false
    },

    "rules": {
        // Strict mode
        "strict": [2, "global"],
        "curly": [2, "multi-line"],
        "new-cap": [1, { "capIsNew": false }],
        "no-console": 0,
        "no-debugger": 1,
        "prefer-const": 1,
        "prefer-template": 1,
        "object-shorthand": 1,
        "comma-dangle": [2, "never"],
        "no-unused-vars": [1, {"argsIgnorePattern": "^_" }],

        // Code style
        "indent": [1, 2, {"SwitchCase": 1}],
        "quotes": [1, "single"],
        "no-trailing-spaces": [2, { "skipBlankLines": true }],
        "space-before-function-paren": [2, "never"],
        "spaced-comment": 0,
        "jsx-quotes": [1, "prefer-double"],
        "id-length": 0,
        "comma-spacing": [0, {"before": false, "after": true}],
        "padded-blocks": [1, "never"],
        "space-before-blocks": [1, "always"],
        "react/sort-comp": 0,
        "react/jsx-no-undef": 2,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "react/jsx-max-props-per-line": 0,
        "react/jsx-filename-extension": 0,
        "react/forbid-prop-types": 0,
        "no-underscore-dangle": 0,
        "object-curly-spacing": 0,
        "prefer-destructuring": 0
    },

    "plugins": [
        "babel",
        "react"
    ]
}
