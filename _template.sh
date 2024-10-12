#!/usr/bin/env bash

cd _site || exit

function htmlEscape () {
  local s
  s=${1//&/&amp;}
  s=${s//</&lt;}
  s=${s//>/&gt;}
  s=${s//'"'/&quot;}
  s=${s//\'/&#39;}

  printf -- %s "$s"
}

function replaceInHtmlFiles () {
  echo "  - ${1}: ${2}"

  # Ignore shellcheck's recommendations to double quote things on this line;
  # its recommendations break the replacement.
  # shellcheck disable=SC2046
  # shellcheck disable=SC2086
  perl -p -i -s -e 's{\Q$pattern}{$replacement}g' -- -pattern="${1}" -replacement="${2}" $(grep --include=\*.html -rnl '.' -e ${1})
}

CI_COMMIT_SHA_ESCAPED=$(htmlEscape "$CI_COMMIT_SHA")
CI_COMMIT_SHORT_SHA_ESCAPED=$(htmlEscape "$CI_COMMIT_SHORT_SHA")
CI_COMMIT_MESSAGE_ESCAPED=$(htmlEscape "$CI_COMMIT_MESSAGE")

echo "Templating the following substitutions into all rendered .html pages in _site:"

replaceInHtmlFiles '%%DEPLOY_DATE%%' "$(date -u '+%Y-%m-%d')"
replaceInHtmlFiles '%%DEPLOY_TIME%%' "$(date -u '+%H:%M:%S')"
replaceInHtmlFiles '%%COMMIT_URL%%' "https://gitlab.com/nfriend/website-3.0/-/commit/${CI_COMMIT_SHA_ESCAPED}"
replaceInHtmlFiles '%%COMMIT_MESSAGE%%' "${CI_COMMIT_MESSAGE_ESCAPED}"
replaceInHtmlFiles '%%COMMIT_SHA%%' "${CI_COMMIT_SHORT_SHA_ESCAPED}"

cd - || exit
