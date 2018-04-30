---
layout: post
title:  "Removing SyntaxHighlighter Scrollbars In Chrome"
date:   2012-12-13 19:46:56 -0300
alert:
    info:
        title: Heads up!
        message: This is an old post - it may contain out-of-date information!
---

I use the [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) JavaScript library by Alex Gorbatchev on ~~this site~~ my previous site to auto-format chunks of code, resulting in nicely colored and tabulated blocks of text like this:

```JavaScript
$.fn.dynamicInput = function(method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        $.error('Method ' + method + ' does not exist on jQuery.dynamicInput');
    }
};
```

It's a fantastic tool. Unfortunately, Chrome surrounds each block of code with vertical scrollbars, regardless of the content's length. Luckily, fixing this issue is a breeze. Simply change line 35 in `shCore.css` from this:

```css
line-height: 1.1em;
```

to this:

```css
line-height: 1.2em;
```

This will remove the unnecessary vertical scrollbars in Chrome and allow for consistent formatting across all major browsers.

You can find `shCore.css` in the `syntaxhighlighter_X.X.XX/styles` directory.