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
- [x] We have two readmes, delete the old one that mentions react and vite and shit. Add the happy intro from that one to the new readme.
- [x] Remove any superfluous directories for tools we no longer have (like `.husky`)
- [x] Add "built"/distributed files and directories to the `.gitignore`
- [x] Make it rebuild cleanly every time 'make build' is done, i.e. it should rmrf the public directory and rebuild it from scratch.
- [x] Fix assets
  - I have added an `/assets` folder with a readme describing the assets within
  - [x] The readme is incomplete, look at the pngs, and complete the readme with a sufficient description of the files content and its purpose.
    - Where you can improve the current descriptions and make them cohesive please do.
  - [x] During the file build, copy the assets used to the output directory, under a similar "assets" path.
  - [x] Update the broken assets on the homepage to reference the assets here.
- [x] redesign research
  - We want to redesign the site for 2026 and 2026 branding.
  - At the moment it lacks character and punch.
  - 2026 is all about boldness, cleanness and friendliness.
  - No more royal blue CVs, they suuuck!
  - in the `./example-design` folder and at https://codesthings.com/campsnap is an idea of an updated design of a microsite that uses these features.
  - [x] Describe as a design brief for this website in ./example-design/research.md
    - Use the example in example-design as a good example
    - Also use https://codesthings.com/campsnap as a good example design
    - Research current design trends in 2026 and use them as a basis for further design ideas
  - [x] Include examples of relevant websites and useful resources where necessary
    - Use screenshots or descriptions of screenshots where possible to get really detailed analysis of the visual style
  - [ ] Redesign the website using the modern design research in './example-design/research.md'
    - Aim for a modern design as described by the research
    - Aim for a friendly tone
    - Aim for a professional vibe
    - Use black, white and pop (hyperpop) style colors
    - If a design challenge arises; research modern solutions
