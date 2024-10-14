---
layout: post
title: 'GitLab Pages with multiple domains'
date: 2024-10-13 13:16:01 -0300
image: /assets/img/gitab-pages-with-multiple-domains/redirect.jpg
---

I recently migrated the website you are on now from [AWS](https://aws.amazon.com/) to [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/).

<figure>
    <img loading="lazy" src="{{ '/assets/img/gitab-pages-with-multiple-domains/redirect.jpg' | relative_url }}" alt="An abstract, AI-generated graphic of a bunch of arrows all circling each other" />
    <figcaption>Obligatory AI-generated image. This is Meta AI's vision of what a bunch of HTTP redirects look like, which will be relevant in a bit.</figcaption>
</figure>

While part of my motivation was to simplify my [bespoke Docker build](https://gitlab.com/nfriend/website-3.0-docker), the primary reason was because [Amazon ended their Alexa Developer Rewards Program](https://www.theverge.com/2024/4/10/24126291/amazon-stop-paying-developers-alexa-skills) which had been funding my website hosting for over half a decade. (I don't blame them, only a tiny fraction of the free credits went towards hosting [my one semi-popular and now defunct Alexa Skill](https://gitlab.com/nfriend/days-until).) As a result, I began owing AWS about $30 USD/month, which is a bit much for this barebones website and a smattering of side projects.

Since the vast majority of my content is static, I decided to go all in on [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/), my favorite (free!) static hosting service.

_(**Disclaimer:** I'm a bit biased since [I used to work for GitLab]({% post_url 2018-12-04-the-next-chapter %}) and even implemented [some improvements to GitLab Pages](https://gitlab.com/gitlab-org/gitlab-pages/-/merge_requests/458) while I was there.)_

It was all going swimmingly until I began repointing my DNS records from the AWS EC2 instance to GitLab Pages. I have three domains that all point to this website:

- [nathanfriend.com](https://nathanfriend.com)
- [nathanfriend.dev](https://nathanfriend.dev)
- [nathanfriend.io](https://nathanfriend.op)

At the time, the first two redirected to the third (I've since decided to instead centralize on `.com` since `.io` domains are [getting expensive lately](https://news.ycombinator.com/item?id=29403773).)

This _should_ be easy to do with GitLab pages, since GitLab [supports domain-level redirects via a Netlify-style `_redirects` file](https://docs.gitlab.com/ee/user/project/pages/redirects.html#domain-level-redirects). But a quick test configuration like this didn't seem to work:

```plaintext
https://nathanfriend.io/*  https://nathanfriend.com/:splat 301
https://nathanfriend.dev/* https://nathanfriend.com/:splat 301
```

## The problem

GitLab Pages only checks the rules in `_redirects` if no file matches the request path. From [their docs](https://docs.gitlab.com/ee/user/project/pages/redirects.html#files-override-redirects):

> Files take priority over redirects. If a file exists on disk, GitLab Pages serves the file instead of your redirect. For example, if the files `hello.html` and `world.html` exist, and the `_redirects` file contains the following line, the redirect is ignored because `hello.html` exists:
>
> ```
> /project-slug/hello.html /project-slug/world.html 302
> ```
>
> GitLab does not support Netlify [force option](https://docs.netlify.com/routing/redirects/rewrites-proxies/#shadowing) to change this behavior.

Unfortunately, this makes it impossible to fully redirect one domain to another using a `_redirects` rule. Using my example, if a request is made to `https://nathanfriend.dev`, GitLab Pages will consider this a file match to `index.html` and immediately serve the page with an `HTTP 200` instead of processing the `301` redirect as specified in the `_redirects` file.

At this point, I was considering dumping GitLab Pages altogether and switching to something like Netlify. Not being able to redirect my domains is a dealbreaker; not only is having multiple live domains annoying, but it's considered bad SEO practice. From [a Google blog](https://developers.google.com/search/blog/2008/09/demystifying-duplicate-content-penalty):

> - Don't create multiple pages, subdomains, or domains with substantially [duplicate content](https://developers.google.com/search/docs/advanced/guidelines/duplicate-content.)

Fortunately, I came up with a hacky-yet-satisfying solution.

## The solution

Since GitLab Pages redirects only work when no matching file is found, the solution is to create a _separate_ Pages site with no content at all. Then, point any domain or subdomain that should redirect at this second Pages site, and include a `_redirects` file with all the corresponding configuration.

This is exactly what I've done [here](https://gitlab.com/nfriend/nathanfriend.com-redirector/-/blob/main/public/_redirects?ref_type=heads), which is an empty project that deploy [a single `_redirects` file](https://gitlab.com/nfriend/nathanfriend.com-redirector/-/blob/main/public/_redirects?ref_type=heads) that looks like this:

```plaintext
https://nathanfriend.io/*      https://nathanfriend.com/:splat 301
https://www.nathanfriend.io/*  https://nathanfriend.com/:splat 301
https://nathanfriend.dev/*     https://nathanfriend.com/:splat 301
https://www.nathanfriend.dev/* https://nathanfriend.com/:splat 301
https://www.nathanfriend.com/* https://nathanfriend.com/:splat 301
```

Now, any request that comes in to one of these non-canonical domains will be forwarded to this Pages site and subsequently redirected to the canoical domain.

I'm reasonably happy with this solution, although I'd much prefer for GitLab to simply add support [Netlify's `force` option](https://docs.netlify.com/routing/redirects/rewrites-proxies/#shadowing) and avoid the extra complexity altogether.
