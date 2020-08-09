module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    __CONFIG__: true,
    __ENV__: true
  },
  extends: [
    "airbnb",
    "prettier"
  ],
  plugins: [
    "react-hooks",
    "react",
    "prettier"
  ],
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true // Enabled object spread
    }
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/named': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': ["error", { "props": false }],
    'react/forbid-prop-types': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
    'react-hooks/rules-of-hooks': "error", // Checks rules of Hooks
    'react-hooks/exhaustive-deps': "warn", // Checks effect dependencies
    'jsx-a11y/anchor-is-valid': [ "error", {
        'components': [ "Link" ],
        'specialLink': [ "to", "hrefLeft", "hrefRight" ],
        'aspects': [ "noHref", "invalidHref", "preferButton" ]
      }],
  }
}
