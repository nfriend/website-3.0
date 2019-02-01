# website-3.0

Another iteration of my personal website. This one is blog-focused and utilizes Jekyll for content management.

## Building

To bundle and run this website locally, run `bundle exec jekyll serve` at the root of this project.

To include drafts, incremental compilation, and livereload, use `bundle exec jekyll serve --incremental --drafts --livereload`. (Livereload doesn't seem to work on Windows.)

## Testing

To run tests, `cd` into the `_tests` directory, run `npm install`, and run `npm test`.

## Rebuilding Algolia search index

To rebuild the Algolia search index (used on the search page), run `bundle exec jekyll algolia`.

## Publishing

To publish the finalized build artifacts to NPM, bump the version in `package.json` and run:

-   `JEKYLL_ENV="production" bundle exec jekyll build`
-   `npm publish .\_site\`

Make sure not to run `npm publish` from the root of the project, as this command will succeed, but will publish the wrong directory to NPM.

## TODO

-   Search page
    -   Finish updating search page styles. Should match the Blog page.
    -   Add persistent search bar to page footer
    -   Add "powered by Algolia" tag
    -   Add OpenSearch integration: https://developer.mozilla.org/en-US/docs/Web/OpenSearch
-   Fix indentation in `<li>`'s in projects page.
-   Add more context to Theremin project on the project page.

## License

The following directories and their contents are Copyright Nathan Friend. You may not reuse anything therein without my permission:

-   \_posts/
-   \_drafts/
-   assets/img/

All other directories and files are MIT Licensed. Feel free to use the HTML and SCSS as you please. If you do use them, a link back to https://github.com/nfriend/website-3.0 would be appreciated, but is not required.
