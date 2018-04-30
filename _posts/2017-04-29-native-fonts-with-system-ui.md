---
layout: post
title:  "Native Fonts with system-ui"
date:   2018-04-27 17:15:00 -0300
---

While building the [Jekyll template](https://github.com/nfriend/website-3.0) for the latest iteration of my website (the site you're on now), I discovered a new CSS trick:

```CSS
font-family: -apple-system, system-ui, 
             BlinkMacSystemFont, 'Segoe UI', Roboto, 
             'Helvetica Neue', Arial, sans-serif;
```

This snippet (in particular, the `system-ui` part) instructs the browser to use whatever font is native to the OS.  This is great, for two reasons:

1. There's no external font to download during page load.
2. They look great! The site adopts the feel of the OS, making it feel "just right" on the host platform.

If you have more than one platform available to you (for example a Windows machine, a Mac, or an Android phone), you can give this a try by loading up this site on each and comparing the font styles.

Here's what this site looks like on a Windows 10 machine:
<br /><br />
<img src="{{ 'assets/img/native-fonts-with-system-ui/windows.png' | relative_url }}" alt="This site rendered on Windows 10"/>



Some other notable sites that use this new feature are [GitHub](https://github.com/), ... (TODO: others here).
