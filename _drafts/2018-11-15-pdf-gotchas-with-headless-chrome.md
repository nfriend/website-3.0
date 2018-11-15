---
layout: post
title:  "PDF Gotchas with Headless Chrome"
date:   2018-11-15 18:36:55 -0300
---

Generating PDF reports is one of those features that _every_ enterprise developer will implement at some point in their career.  I had my turn a few weeks ago.  After exploring the available options, I settled on using [Chrome's headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome) to render HTML and save the result as a PDF.  This approach seems kind of weird at first, but it has a number of pretty huge advantages:

- asdf