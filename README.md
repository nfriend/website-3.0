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

## Publishing

Deployment and hosting are managed by [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), so simply `git push` to `master`.

### Rebuilding Algolia search index

Rebuilding of the Algolia search index is automated by the GitLab pipeline
and shouldn't need to be run manually.

To rebuild the Algolia search index manually, (used on [the search
page](https://nathanfriend.com/search)), run `bundle exec jekyll algolia`.

Note that this requires an Algolia API key to be provided either through a local
`_algolia_api_key` file or through an `ALGOLIA_API_KEY` environment variable.

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
