# website-3.0

Another iteration of my personal website.  This one is blog-focused and utilizes Jekyll for content management.

## Building

To bundle and run this website locally, run `bundle exec jekyll serve` at the root of this project.

To include drafts and incremental compilation, use `bundle exec jekyll serve --incremental --drafts`.

## Testing

To run tests, `cd` into the `_tests` directory, run `npm install`, and run `npm test`.

## Publishing

To publish the finalized build artifacts to NPM, bump the version in `package.json` and run:

- `bundle exec jekyll build`
- `npm publish .\_site\`

Make sure not to run `npm publish` from the root of the project, as this command will succeed, but will publish the wrong directory to NPM.

## TODO

- Fix indentation in `<li>`'s in projects page.
- Add more context to Theremin project on the project page.

## License

The following directories and their contents are Copyright Nathan Friend. You may not reuse anything therein without my permission:

- _posts/
- _drafts/
- assets/img/


All other directories and files are MIT Licensed. Feel free to use the HTML and SCSS as you please. If you do use them, a link back to https://github.com/nfriend/website-3.0 would be appreciated, but is not required.

