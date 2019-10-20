---
layout: post
title: 'Ridiculous Refs'
date: 2019-10-19 19:27:01 -0300
image: assets/img/ridiculous-refs/mind-blown.png
---

How many different special characters can you jam into a [Git ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) name (i.e. the full name of a [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) or a [branch](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)) before Git will complain?

<figure>
    <img src="{{ 'assets/img/ridiculous-refs/mind-blown.png' | relative_url }}" alt="The git logo with a exploding head inside" />
    <figcaption>As if Git isn't complicated enough <em>without</em> testing its limits.</figcaption>
</figure>

The answer is... a _lot_.

Here's a list of ref names that Git considers valid, ranging from pedestrian to ludicrous:

1. `a/b`
1. `A/B`
1. `a/b/c/d`
1. `a/b.c`
1. `0/1/2`
1. `` !/"#%&'{}+,-.<>;=@]\_`{|} ``
1. `🙂🚀😂🇺🇸💩🇨🇦💯👍❤️/🤦`
1. `(╯°□°)/╯︵┻━┻`
1. `¯|_(ツ)_/¯`

The opposite is a little less flashy, but equally useful. All of these are _invalid_ ref names:

1. `a`: At least one `/` is required
1. `a/.b`: Slash-separated components can't begin with a `.`
1. `a/b.`: No ending with a `.`
1. `a/.lock`: No ending with `.lock`
1. `a/b..c`: Consecutive dots (`..`) are not allowed
1. `a/~^:?*[\`: None of the characters after `a/` are allowed
1. `a/b/`: No ending with a slash
1. `/a/b`: No beginning with a slash
1. `a/b//c`: No consecutive slashes
1. `a/@{`: The `@{` sequence is not allowed

There's some nuance to this second list - some of these rules can be relaxed in special situations. For the complete specification, check out [the documentation for the `check-ref-format` command](https://git-scm.com/docs/git-check-ref-format).

## Wait, I've created lots of branches and tags that don't contain a `/`!

Right! When you create a branch named `my-feature`, Git actually creates a ref named `refs/heads/my-feature`.

This is a bit of a tangent, but what Git is _actually_ doing under the hood is creating a new file named `my-feature` inside your repo's `.git` directory at `.git/refs/heads/my-feature`. You can see this for yourself by opening up `.git/refs/heads` in a file explorer. Understanding this makes it more obvious why the `/` character is required.

## Why should I care about this?

If all you do with Git is `pull`, `commit`, `push`, and maybe the occasional `rebase`, you can ignore these edge cases. Just keep using nice, simple, boring names like `my-feature-branch` or `v1.2`.

However, if you're building a tool that _interacts_ with Git refs, you might want to throw a few of the crazier names listed above into your test cases.

In fact, this was my motivation for compiling these lists. I built [a new GitLab Issue search feature that involved Git tag names](https://gitlab.com/gitlab-org/gitlab/merge_requests/18761), and I needed to make sure it handled any tag name the user threw at it. I was hoping to find something like the [Big List of Naughty Strings](https://github.com/minimaxir/big-list-of-naughty-strings) for Git refs, but I couldn't find anything beyond Git's technical documentation.

## Your list is wrong!

I wouldn't be surprised! [Please let me know by opening an issue!](https://gitlab.com/nfriend/website-3.0/issues/new?issue[title]=There%27s%20a%20problem%20with%20your%20Ridiculous%20Refs%20list!)

## References/Attributions

The "exploding head" icon was created by Anniken & Andreas from the Noun Project.
