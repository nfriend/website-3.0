# website-3.0

<a href="https://gitlab.com/nfriend/website-3.0/pipelines/latest"
  target="_blank"><img
  src="https://gitlab.com/nfriend/website-3.0/badges/master/pipeline.svg"
  alt="GitLab build status"></a>

Another iteration of my personal website. This one is blog-focused and utilizes
Jekyll for content management.

[View the source on GitLab.](https://gitlab.com/nfriend/website-3.0)

## Building

To bundle and run this website locally, run `bundle exec jekyll serve` at the
root of this project.

To include drafts, incremental compilation, and livereload, use `bundle exec jekyll serve --incremental --drafts --livereload`. (Livereload doesn't seem to
work on Windows.)

## Testing

Once a new version of this site is published to
[nathanfriend.io](https://nathanfriend.io), automated tests can be run against
the live site by running the tests in the
[`website-3.0-tests`](https://gitlab.com/nfriend/website-3.0-tests) project.

**Note:** Usually there is no need to trigger these manually; the [deployment
project](https://gitlab.com/nfriend/website-3.0-docker) automatically triggers a
test run via a downstream pipeline after a successful deployment.

## Publishing

In most cases, it is not necessary to publish or deploy manually. This is
automated by the GitLab pipeline; simply bump the version in `package.json` and
push new changes to `master` to trigger this project's pipeline. See the
[**Deployment**](#deployment) section below for more information.

If for some reason it is necessary to manually publish the finalized build
artifacts to NPM, bump the version in `package.json` and run:

- `JEKYLL_ENV="production" bundle exec jekyll build`
- `npm publish _site/`

Make sure not to run `npm publish` from the root of the project, as this command
will succeed, but will publish the wrong directory to NPM.

### Rebuilding Algolia search index

Rebuilding of the Algolia search index is also automated by the GitLab pipeline
and shouldn't need to be run manually.

To rebuild the Algolia search index manually, (used on [the search
page](https://nathanfriend.io/search)), run `bundle exec jekyll algolia`.

Note that this requires an Algolia API key to be provided either through a local
`_algolia_api_key` file or through an `ALGOLIA_API_KEY` environment variable.

## Deployment

In order for the GitLab pipeline to succeed, two environment variables must be
present:

| Variable name   | Description                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| ALGOLIA_API_KEY | Algolia API key used for updating the Algolia search index                                                                  |
| NPM_TOKEN       | NPM token for publishing [the `@nathanfriend/website-3.0` package](https://www.npmjs.com/package/@nathanfriend/website-3.0) |

This project's pipeline is responsible for compiling the site into static
HTML/CSS and publishing the result to npm (as [`@nathanfriend/website-3.0`
package](https://www.npmjs.com/package/@nathanfriend/website-3.0)).

The final stage of this project's pipeline triggers a downstream pipeline in
[the `website-3.0-docker`
project](https://gitlab.com/nfriend/website-3.0-docker). This pipeline is
responsible for actually deploying the site to
[nathanfriend.io`](https://nathanfriend.io).

**The site will only be published/deployed if the version in this project's
[`package.json`](./package.json) is bumped.** Pushing commits to `master`
without bumping the version in [`package.json`](./package.json) will not cause
the site to be redeployed.

## License

The following directories and their contents are Copyright Nathan Friend. You
may not reuse anything therein without my permission:

- \_posts/
- \_drafts/
- assets/img/

All other directories and files are MIT Licensed. Feel free to use the HTML and
SCSS as you please. If you do use them, a link back to
https://gitlab.com/nfriend/website-3.0 would be appreciated, but is not
required.
