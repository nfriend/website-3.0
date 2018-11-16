---
layout: post
title:  "PDF Gotchas with Headless Chrome"
date:   2018-11-15 18:36:55 -0300
image:  assets/img/pdf-gotchas-with-headless-chrome/minifigure-chrome.jpg
---

Generating PDF reports is one of those features that _every_ enterprise developer will implement at some point in their career.  I had my turn a few weeks ago.  After exploring the available options, I settled on using [Chrome's headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome) to render HTML and save the result as a PDF.  

<figure>
    <img src="{{ 'assets/img/pdf-gotchas-with-headless-chrome/minifigure-chrome.jpg' | relative_url }}" alt="A headless minifigure and a Chrome logo" />
    <figcaption>"Headless Chrome" just sounds so.... gruesome.</figcaption>
</figure>

This approach seems kind of weird and a bit overkill at first, but it has a number of pretty huge advantages:

- You can build your reports using the most popular layout system in the world (HTML/CSS)
- Anything that can be rendered in a webpage can be used in a report, including:
    - images
    - custom fonts
    - links
    - 3<sup>rd</sup> party JavaScript libraries (think visualization libraries like [D3.js](https://d3js.org/) or graphing libraries like [Google Charts](https://developers.google.com/chart/))
    - _etc..._
- If you're building a web application, you can reuse components from you application in your report
- Printing to a PDF is a [supported use case](https://developers.google.com/web/updates/2017/04/headless-chrome#create_a_pdf_dom) of Chrome's headless mode
- Google's own [Puppeteer](https://pptr.dev/) library gives you full control over the headless instance
- You can develop your report in Chrome - with full access to Chrome's dev tools - instead of continually regenerating your report

It's not all unicorns and rainbows, though.  Below are a few of the gotchas I discovered while building a real PDF report using headless Chrome.

## Headers and footers can't use external resources

## Headers and footers don't inherit styles from the rest of the page

## Headers and footers require explicit margins in order to show up

## Page breaks can be a pain

## Some advanced layouts simply aren't possible

## The page needs to finish loading

## The page might require authentication

----

Attributions:
- Minifigure/Chrome image from [https://hackernoon.com/so-many-testing-frameworks-so-little-time-b03c707b8f90](https://hackernoon.com/so-many-testing-frameworks-so-little-time-b03c707b8f90)