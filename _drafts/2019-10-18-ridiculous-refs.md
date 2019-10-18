---
layout: post
title: 'Ridiculous Refs'
date: 2019-10-18 19:27:01 -0300
image: assets/img/ridiculous-refs/mind-blown.png
---

What is the absolute craziest name that [Git](https://www.git-scm.com/) will accept as a [ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) name (i.e. the name of a [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) or a [branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging))?

<figure>
    <img src="{{ 'assets/img/ridiculous-refs/mind-blown.png' | relative_url }}" alt="The git logo with a exploding head inside" />
    <figcaption>As if Git isn't complicated enough <em>without</em> pushing it to its limits.</figcaption>
</figure>

The answer is... a lot crazier than I expected.

Here's the most ludicrous, verbose, asinine ref name I could come up with that Git still considers valid:

## TODO: add ref here

Git lays out its naming requirements for refs in [its documentation for the `check-ref-format` command](https://git-scm.com/docs/git-check-ref-format):

> 1. They can include slash `/` for hierarchical (directory) grouping, but no slash-separated component can begin with a dot `.` or end with the sequence `.lock`.
> 1. They must contain at least one `/`. This enforces the presence of a category like `heads/`, `tags/` etc. but the actual names are not restricted.
> 1. They cannot have two consecutive dots `..` anywhere.
> 1. They cannot have ASCII control characters (i.e. bytes whose values are lower than \040, or \177 `DEL`), space, tilde `~`, caret `^`, or colon `:` anywhere.
> 1. They cannot have question-mark `?`, asterisk `*`, or open bracket `[` anywhere.
> 1. They cannot begin or end with a slash `/` or contain multiple consecutive slashes.
> 1. They cannot end with a dot `.`.
> 1. They cannot contain a sequence `@{`.
> 1. They cannot be the single character `@`.
> 1. They cannot contain a `\`.

## TODO: Add section about why I needed this here

**References/Attributions**

"Exploding head" by Anniken & Andreas from the Noun Project
