---
layout: post
title: 'PDF Gotchas with Headless Chrome'
date: 2019-04-15 06:20:55 -0300
image: assets/img/pdf-gotchas-with-headless-chrome/minifigure-chrome.jpg
---

Generating PDF reports is one of those features that _every_ enterprise developer will implement at some point in their career. I had my turn on a project with my previous employer. After exploring the available options, I settled on using [Chrome's headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome) to render HTML and save the result as a PDF.

<figure>
    <img src="{{ 'assets/img/pdf-gotchas-with-headless-chrome/minifigure-chrome.jpg' | relative_url }}" alt="A headless minifigure and a Chrome logo" />
    <figcaption>"Headless Chrome" just sounds so.... gruesome.</figcaption>
</figure>

This approach seems kind of weird and a bit overkill at first, but it has a number of pretty huge advantages:

- You can build your PDFs using the most popular layout system in the world (HTML/CSS)
- Anything that can be rendered in a webpage can be used in a PDF, including:
  - images
  - custom fonts
  - links
  - 3<sup>rd</sup> party JavaScript libraries (think visualization libraries like [D3.js](https://d3js.org/) or graphing libraries like [Google Charts](https://developers.google.com/chart/))
  - _etc..._
- If you're building a web application, you can reuse components from your application in your PDF
- Printing to a PDF is a [supported use case](https://developers.google.com/web/updates/2017/04/headless-chrome#create_a_pdf_dom) of Chrome's headless mode
- Google's own [Puppeteer](https://pptr.dev/) library gives you full control over the headless instance of Chrome
- You can develop your PDF layout in Chrome - with full access to Chrome's dev tools - instead of continually regenerating the PDF to see changes

It's not all unicorns and rainbows, though. Below are a few of the gotchas I discovered while building a real PDF using headless Chrome.

## Headers and footers can't use external resources

This is the big one. If you try and place an `<img>` tag in your header or footer (a pretty common use case for a header or footer):

```html
<img src="/assets/logo.jpg" />
```

...your image won't show up. This is because Chrome won't make any requests for external resources that appear in the header or footer templates.

One workaround is to encode the image into the template as a base64'd string:

```html
<img src="data:image/png;base64, iVBORw0KGg..." />
```

I've found [this site](https://www.base64-image.de/) handy for converting an image into an `<img>`-compatible base64 string.

## Headers and footers don't inherit styles from the rest of the page

Headers and footers are specified at PDF render time by passing HTML strings to the `page.pdf()` method:

```ts
page.pdf({
  headerTemplate: '<h1>This is the header!</h1>',
  footerTemplate: '<h1>This is the footer!</h1>',
});
```

These templates are rendered in a separate context than the content of the webpage. Because of this, the CSS styles that apply to the content won't apply to the header and the footer. Any styles that apply to the content of your PDF that you would like to also apply to your header and footer must be repeated in each of your header and footer templates. And unfortunately, you can't just reference a common stylesheet using a `<link>` element - see point #1 above.

## Headers and footers require explicit margins to be visible

This one took me a while to figure out. Chrome won't automatically resize your content to make space for the header and footer templates. You'll need to make space for your header and footer by specifying a fixed margin at the top and bottom of your page:

```ts
page.pdf({
  headerTemplate: '<h1>This is the header!</h1>',
  footerTemplate: '<h1>This is the footer!</h1>',
  margin: {
    top: '100px',
    bottom: '50px',
  },
});
```

Without these margins, the content will be rendered on top of your header and footer, leaving you wondering why your header and footer templates aren't showing up.

## Page breaks can be a pain

CSS provides some rules that determine where a page break should be placed when printing, for example:

```css
@media print {
  .page {
    page-break-after: always;
  }
}
```

These rules work - but they can be finicky. You may run into problem when trying to page break inside of<sup>[1]</sup>:

- tables
- floating elements
- inline-block elements
- block elements with borders

I also had issues using `page-break-after` inside of a flexbox layout.

## Some advanced layouts simply aren't possible

There are a few edge cases - mostly dealing with headers/footers and page wrapping - that you simply can't control. For example, want to place a special footer only on pages 2, 4, and 7? Not possible. (If it is, [let me know how!](mailto:hello@nathanfriend.com))

## The page needs to finish loading

If the page being screenshotted requires time to load, (for example, if the page has JavaScript that makes an AJAX request for some data), you'll need to wait for this initialization to complete before triggering the screenshot. If you simply screenshot the page right after the initial load, your PDF will be filled with loading bars and missing data.

I worked around this by setting a global flag in the webpage once all initialization work is finished:

```ts
// in the web page
async init() {
    const data = await this.dataService.getData();
    const user = await this.userService.getUserProfile();

    // ...etc...

    window.isReadyForPDF = true;
}
```

Then, using Puppeteer's [`page.waitForFunction()`](https://pptr.dev/#?product=Puppeteer&version=v1.10.0&show=api-pagewaitforfunctionpagefunction-options-args) method, we can wait for this global variable to bet set:

```ts
// on the server
await page.waitForFunction('window.isReadyForPDF');
// now we know the page is ready for a screenshot
```

## The page might require authentication

If the page you're screenshotting is part of a web application, it's likely there's an authentication step that's required to view the page. This can be a bit of a pain to work around, but fortunately, Puppeteer provides enough control to programmatically log in to the application:

```ts
await page.waitForSelector('#username');
await page.waitForSelector('#password');

await page.evaluate(() => {
  document.querySelector('#username').value = 'my-username';
  document.querySelector('#password').value = 'my-password';
  document.querySelector('#log-in-button').click();
});
```

There are some downsides to this approach, though:

- You now need to maintain a system account for logging in to the application for PDF screenshots
- The extra login step adds quite a bit of time to the PDF generation process
- Your PDF generation is now dependent on your authentication/authorization system
- It just feels kind of wrong

---

Disclaimer: my PDF generator was written in .NET Core, so I actually used a library called [Puppeteer Sharp](https://www.puppeteersharp.com/) which aims to replicate the API of the official [Puppeteer library](https://pptr.dev/) (which runs on Node). Some of the code examples above might be slightly off since I translated them from C♯ into JavaScript.

---

**References/Attributions**

\[1\]: [https://stackoverflow.com/a/26265549/1063392](https://stackoverflow.com/a/26265549/1063392)

Minifigure/Chrome image from [https://hackernoon.com/so-many-testing-frameworks-so-little-time-b03c707b8f90](https://hackernoon.com/so-many-testing-frameworks-so-little-time-b03c707b8f90)
