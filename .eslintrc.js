module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'jsdoc'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  ignorePatterns: [
    'src/global/app.dev.ts',
    '.eslintrc.js',
    'stencil.config.ts',
    'stencil.config.https.ts',
    'package-scripts.js',
    'capacitor.config.ts',
    'www/**/*.*',
  ],
  settings: {
    react: {
      version: 'latest',
    },
    jsdoc: {
      tagNamePreference: {
        returns: 'return',
        class: 'constructor',
      },
    },
  },
  rules: {
    'import/no-unresolved': 0,
    '@stencil/strict-boolean-conditions': 0,
    'jsdoc/check-alignment': ['error'],
    'jsdoc/check-param-names': ['error'],
    'jsdoc/check-tag-names': ['error'],
    'jsdoc/check-types': 0,
    'jsdoc/implements-on-classes': 0,
    'jsdoc/newline-after-description': 0,
    'jsdoc/no-types': ['error', { contexts: ['any'] }],
    'jsdoc/no-undefined-types': 0,
    'jsdoc/require-description': [
      'error',
      { descriptionStyle: 'body', exemptedBy: ['type', 'constructor', 'return', 'inheritDoc'] },
    ],
    // This rule says "require jsdocs on Classes and Method Definitions that are not private, getters or setters"
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: { ClassDeclaration: true, MethodDefinition: false },
        contexts: [
          // Use https://astexplorer.net/ to tune
          {
            context:
              'MethodDefinition:not(:matches([accessibility="private"],[kind="get"],[kind="set"],[key.name="render"],[key.name="componentWillLoad"],[key.name="componentDidLoad"],[key.name="disconnectedCallback"]))',
          },
          { context: 'ClassProperty:not([accessibility="private"])', inlineCommentBlock: true },
        ],
      },
    ],
    'jsdoc/require-param': ['error', { exemptedBy: ['constructor', 'inheritDoc'] }],
    'jsdoc/require-param-description': ['error'],
    'jsdoc/require-param-name': ['error'],
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns': ['error'],
    'jsdoc/require-returns-check': ['error'],
    'jsdoc/require-returns-description': ['error'],
    'jsdoc/require-returns-type': 0,
    'jsdoc/valid-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowedNames: ['render'],
      },
    ],
  },
};
