---
layout: post
title:  "Hello World 2"
date:   2018-04-27 17:15:00 -0300
---

## Welcome to nathanfriend.io!

Since my [last post]({% post_url 2017-04-25-hello-world %}), I've finished most of the outstanding to-do items for this site, except for this one:

<img src="{{ 'assets/img/hello-world-2/todo.png' | relative_url }}" alt="TODO: Start blogging" />

I think this may turn out to be the most challenging item yet.

Maybe a good place to start is a quick writeup of how this site was built.

## Jekyll

This site is built using [Jekyll](https://jekyllrb.com/), a CMS of sorts that does all its CMS-y stuff up-front at build time; the end product is a pure HTML/CSS/JS site that requires no special server-side technology other than a webserver that can serve static files.

I based this site's theme on GitHub's [jekyll-theme-minimal](https://github.com/pages-themes/minimal) theme.  I modified it a bit to be more blog-oriented and tweaked a few of the base styles. One of those tweaks was a new trick I learned to make the site adopt the OS's system font:

```css
font-family: -apple-system, system-ui, 
             BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', 
             Arial, sans-serif;
```

Not only do these fonts render ridiculously fast (no need to make a request for a web font), but they look great - the entire site subtely conforms to the look of the user's OS.