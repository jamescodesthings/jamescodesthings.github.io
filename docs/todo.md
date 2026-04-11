# Tasks

# [x] Rework

Completed a rework of the site into a static site builder/generator.

# [ ] Cleanup after rework

The directory structure is a bit messy after the rework, so I need to clean it up and move files around.

The new structure should be:

```
docs/ // markdown docs, including this one, a todo list of current and previous tasks, and any other documentation that doesn't fit in the readme.md
src/assets/ // static images, svgs, icons, fonts, etc. Formerly in public/assets and src/assets and /assets, and all over.
src/css/ // Plain CSS theme from the old static directory,
src/templates/ // EJS templates from the old static directory,
src/js/ // the static/public site static JS files, served to the user.
// The generator code should be merged into the src dir as its new root:
src/index.js // from generator/src/
src/pages.js // from generator/src/
// The rest of the generator code
data/ // Unchanged, raw json data files
raw/ // Unchanged, raw source files for illustrator/etc.
public/ // Should be gitignored, a "dist" directory that we mount in docker when building and serving
// The PDF build should build back into src/assets, and be gitignored, so that we generate it and link to it in a bit of a chicken-and-egg way, but we don't have to worry about it in the repo.
```

- [ ] Move the files into the ideal structure above
- [ ] Fix the make commands and generator scripts to use the new directory structure.
- [ ] Fix the Github Actions workflow to use the new directory structure.

# [ ] Cleanup makefile

We only want to use make and docker, we shouldn't ever run the node server on the host machine.

- [ ] Create different services in the docker-compose file which inherit from build and serve, and run the different node commands in those services. Then we can just run `make build` and `make serve` and it will run the correct commands in the correct containers.
- [ ] Remove the `build-local` command from the makefile, and any references to it in the documentation. We should only be building and serving via Docker, to keep the environment consistent

# [ ] New logo

- We have a new logo in src/assets/logo/
  - There's a logo-dark.png for showing on dark backgrounds, which has white text and a cyan "feature" color.
  - There's a logo.png for showing on light backgrounds, which has black text and a magenta "feature" color.
- [ ] Document the logo design in ./docs/logo.md
  - Include dimensions, colors, fonts, a visual design description of the logo.
  - keep it simple and straightforward, but include enough detail that we can refer back to it when we need to use the logo
- [ ] Use frontend-design to review the site and where the logo should feature in order to stand out but not overwhelm.
- [ ] Document this in 'logo-usage.md' in the docs.
- [ ] Update the site to use the new logo as advised by 'logo-usage.md'

# [ ] Update socials

- [ ] We should have a dedicated "Where to find me online" section on the site, with links to my GitHub, LinkedIn, Makerworld, and any other relevant profiles. Along with what you can find there
  - [ ] We should also put this in the readme.md for people poking around the code
  - [ ] Makerworld: https://makerworld.com/en/@jamescodesthing
    - [ ] I should add some wording around designing 3d models for nerd-related hobby projects I work on, and tinywhoop (drone) parts, and computer related prints.
  - [ ] LinkedIn profile: www.linkedin.com/in/jamescodesthings should be on the site
    - [ ] I should add some wording around my experience and skills, and what you can find on my LinkedIn profile.
    - [ ] Most of the time it's just where to go to keep up with my current professional openings and projects, and to see my CV/resume.
  - [ ] Github profile: https://github.com/jamescodesthings be on the site
    - [ ] I should add some wording around the types of projects I work on, and what you can find on my GitHub profile.
      - Including this site's code with
      - a call to action on going and poking around how it works.
      - Some wording around the code style and how I like work on projects:
        - KISS
        - Enough tool for the job
        - Get a product out the door, then iterate and improve it over time.
        - I like to build things that are fun and useful, and that I can share with others.
  - [ ] I'm currently working on a photography portfolio, in the meantime you can view my instagram:
    - [ ] Instagram: https://www.instagram.com/jamescodesthings/
    - [ ] I should add some wording around the types of photos I take, and what you can find on my Instagram profile.
      - Take a look at the profile yourself to give a "vibe" and get the wording into something flashy I can talk about
      - I mostly work on Nature, and Portraiture with some street photography.
      - It's also where I post phototgraphy related projects like the camp snap filters.

# [ ] Prominent downloadable CV section

- [ ] We should have a prominent section on the site for downloading my CV
- With a link to the PDF version that we generate via Gotenberg.
- This should be one of the main calls to action on the site,
- and should be easily accessible from the homepage and the navigation menu.

# [ ] Make sure the PDF doesn't include the web-only content

- [ ] Build the PDF and ensure the display:print sections are working correctly
  - and that the PDF doesn't include the web-only content like
    - the contact form,
    - or the socials section,
    - or any of the interactive elements that don't make sense in a PDF format.
    - It should be a self-contained CV.

# [ ] Cohesion

- [ ] Update the docs in the readme to reflect the new structure and workflow.
  - [ ] Document local development workflow with docker-compose and make commands.
  - [ ] Document the directory structure
  - [ ] Document the deploy workflow with Github Actions and how to deploy to GitHub Pages.
  - [ ] Update the local build instructions with the correct order to run things to build the PDF and see the site there.
- [ ] Update the comments in the code to reflect the new structure and workflow.
- [ ] Update the documentation in the ./docs to reflect the new structure and workflow.

# [ ] Cohesion with other sites

- [ ] Output analysis to ./docs in a 'social-updates.md' file.
- [ ] Go get the bios and profiles that we link to on the site, and scan their content for:
  - [ ] Cohesion with the site content and wording
  - [ ] Any updates we should make to those profiles to bring everything into alignment
  - [ ] Any updates in branding or styling we could make on those profiles (within what we can influence) to bring everything into alignment and cohesion with the site.
  - [ ] Suggested updates to crosslink back to each other and the site.
    - Aim to link back to the site to drive traffic here then let people find the cross-linked socials here, and to create a cohesive online presence that reinforces the branding and messaging of the site across all platforms.

# [ ] Frontend Design Review

## Vibe

At a high level this is a website for other web developers, It showcases my skills, but importantly shows people how I work:

- KISS,
- understated but effective design,
- Up to the nuts cutting edge of visual web design
- Responsive and mobile-first
- Print-friendly because it also doubles as my print cv.
  - Design elements that do not fit are hidden at print don't worry about removing them completely.
- A focus on building things that are fun and useful
- that I can share with others and they get the vibe.
- The vibe is a sort of understated, playful, slightly nerdy, but professional and polished vibe.
- The design should reflect that vibe and reinforce the branding and messaging of the site.
- The design should be cohesive and consistent across all pages and elements of the site, and should create a memorable and engaging experience for visitors
- It should "say" this without saying it.

## [ ] Tasks

- [ ] Use frontend-design to review the site and make sure the design is cohesive and consistent, and that the new logo is used effectively.
- [ ] Remove excessive or out of place design features, like unnecessary animation.
- [ ] Document any design changes or updates that we make as a result of the review in 'design-updates.md' in the docs.
- [ ] Simplify areas of the design that are "too much", for example, we have some minor animation that feels out of place.
- [ ] Suggest places for animation or interaction that stick to the theme and branding of the site.
- [ ] Update the site with any design changes or updates that we make as a result of the review.
- [ ] Create a list of potential future design updates or improvements that we can make to the site in the future, and document this in 'future-design-updates.md' in the docs.
