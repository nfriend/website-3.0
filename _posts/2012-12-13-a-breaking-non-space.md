---
layout: post
title:  "A Breaking Non-Space?"
date:   2012-12-13 20:05:11 -0300
image:  assets/img/a-breaking-non-space/broken-space.jpg
alert:
    info:
        title: Heads up!
        message: This is an old post - it may contain out-of-date information!
---

Everyone who has fought with word-wrapping in HTML layouts is familiar with the `&nbsp;` HTML entity. This special "space" character appears like a normal space to the end-user, but the browser won't break this space to wrap a line.

<figure>
    <img src="{{ 'assets/img/a-breaking-non-space/broken-space.jpg' | relative_url }}" alt="A keyboard with a broken space bar" />
    <figcaption>A broken space.</figcaption>
</figure>

Recently, I needed the opposite of `&nbsp;` - instead of a non-breaking space, I needed a breaking non-space. Luckily, there's a Unicode character that fits this description: it's named the ZERO-WIDTH-SPACE character. When the browser goes to wrap a line, it offers itself up as a valid line-wrap location. Using this character is as simple as placing &`#8203;` in your HTML where you'd like the potential line-break to happen.

<figure>
    <iframe class="rounded" width="560" height="315" src="https://www.youtube.com/embed/2IfPwTQ7au8?start=56&end=77" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <figcaption>This probably broke more than just spaces.</figcaption>
</figure>