module.exports = {
  scripts: {
    // Interactive, shows the menu
    i: {
      script: 'nps-i',
      description: 'Start nps interactively',
    },
    // Run
    default: {
      default: {
        script: 'stencil build --dev --watch --serve',
        description: 'starts the dev server',
      },
      https: {
        script: 'stencil build --dev --watch --serve --config ./stencil.config.https.ts',
        description: 'Run the web stencil project in HTTPS mode',
      },
      prod: {
        default: {
          script: 'http-server ./www',
          description: 'Serve using a local file server',
        },
      },
    },
    // Build
    build: {
      script: 'stencil build',
      description: 'Build the www target',
    },
    // Deploy to GH pages
    deploy: {
      script: 'gh-pages -d www',
      description: 'Deploy to the gh-pages branch',
    },
    // Chores
    chore: {
      pin: {
        script: 'npx npm-pin-dependencies',
        description: 'pins deps',
      },
      update: {
        script: 'npx npm-check-updates',
        description: 'check for updates',
      },
      generate: {
        script: 'stencil generate',
        description: 'generate a component',
      },
    },
    // Verification
    format: {
      check: { script: `prettier --check .`, description: 'Check that files match the format' },
      fix: { script: `prettier --write .`, description: 'Fix any unformatted files' },
    },
    lint: {
      check: { script: 'eslint src', description: 'Check for linting issues' },
      fix: { script: 'eslint --fix src', description: 'Autofix linting issues' },
    },
    test: {
      default: {
        script: 'stencil test --spec --e2e',
        description: 'Run Tests',
      },
      watch: {
        script: 'stencil test --spec --e2e --watch',
        description: 'Run tests and watch for changes',
      },
    },
  },
};
