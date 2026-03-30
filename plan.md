# Rewrite for 2026

Summary: Replace with a simple NodeJS based public site and PDF generator in the style of https://github.com/jamescodesthings/campsnap-filters

Overview: We want to significantly improve and simplify this website. We're going to use a more recent project that uses a simple node-js based site builder and bundler, with our original data to populate the website.

**Important note for all tasks: The text content of the website should remain the same, the visual style should be similar, but the backend archtiecture should change**

# Task

- [x] Research the architecture of https://github.com/jamescodesthings/campsnap-filters and store the result of the research in `desired-architecture.md`
  - Include code examples of key files like the Makefile, docker-compose.yml and some example node scripts
  - Include enough detail to take the key components of the architecture and apply them to a new project
- [x] Move the JSON data files to the root `/data`
- [x] Create a generator project in the style of https://github.com/jamescodesthings/campsnap-filters
- [x] Add Makefile in the style of https://github.com/jamescodesthings/campsnap-filters
  - Populate with build commands
  - This is our top-level task runner
  - We expect the user to use make to build and run the project
- [x] Add node scripts to:
  - run the server
  - Build the website into a single `public` directory
  - Watch the source files and rebuild the website in the `public` directory
- [x] Add `docker-compose.yml`
  - Add `gotenberg` for PDF printing like in https://github.com/jamescodesthings/campsnap-filters
  - Add `serve` for a local website like in https://github.com/jamescodesthings/campsnap-filters
  - Add a `pages` service that inherits from the server to build the gh pages like in https://github.com/jamescodesthings/campsnap-filters
- [x] Remove `index.html`
- [x] Remove the pre-commit hooks
- [x] Remove the linter
  - Keep 'prettier' and the 'prettierrc'
- [x] Remove postcss
- [x] remove storybook
- [x] Remove React
- [x] Remove Vite
- [x] Remove all JS from the front end
- [x] Remove Tailwind
  - Replace with plain `CSS`
    - Use the CSS 3 spec
    - Use css variables for key theme elements
    - Use a theme with a switchable dark mode.
- [x] Replace CircleCI with Github Actions to:
  - [x] Build the website to the root of a `pages` branch to deploy to gh pages
  - [x] Build a printable PDF copy of the website
- [x] Replace `.prettierignore` with a new copy that has no missing directories and only ignores output that is generated
- [x] Add a header that introduces the https://github.com/jamescodesthings/campsnap-filters project and links to it at https://codesthings/campsnap
  - It should use the "I feel like you're just here for the zipline" meme.
    - This should be prominent, early on in the website, in a header or jumbo somewhere.
      - Somewhere that anyone who is just here for the campnsnap filters can get to them quickly, without hindrance.
    - Add a gif
    - Add the text "I feel like you're just here for the campsnap filters" somewhere
    - https://www.youtube.com/shorts/VdAfa1z_aGg
- [x] Rewrite the readme with the new structure
- [x] Write usage docs
- [x] Write a summary blog about how the site works and put it on a blog page under the site somewhere like `https://codesthings/blog/[date]`
  - Can use markdown for this
  - Should use the same style as the base/core of the site
  - Should have links back to the main site
- [x] Add links to the homepage for the blog
