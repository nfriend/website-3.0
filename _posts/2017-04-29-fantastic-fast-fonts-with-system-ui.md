---
layout: post
title:  "Fantastic Fast Fonts with system-ui"
date:   2018-04-27 17:15:00 -0300
image:  assets/img/native-fonts-with-system-ui/comic-sans.png
---

While building the [Jekyll template](https://github.com/nfriend/website-3.0) for the latest iteration of my website (the site you're on now), I discovered a new CSS trick:

```CSS
font-family: -apple-system, system-ui, BlinkMacSystemFont, 
             'Segoe UI', Roboto, 'Helvetica Neue', 
             Ubuntu, Arial, sans-serif;
```

This snippet (in particular, the `system-ui` part) instructs the browser to use whatever font is native to the OS.  This is great, for two reasons:

1. There's no external font to download during page load.
2. They look gorgeous! The site adopts the feel of the OS, making it feel "just right" on the host platform.

<figure>
    <img src="{{ 'assets/img/native-fonts-with-system-ui/comic-sans.png' | relative_url }}" alt="Some CSS code rendered using Comic Sans" />
    <figcaption>Comic Sans is my favorite programming font.</figcaption>
</figure>

If you have more than one platform available to you (for example a Windows machine, a Mac, or an Android phone), you can see this for yourself by pulling up this site on each and comparing the font styles.

Here's what this site looks like on a Windows 10 machine (which uses the friendly [Segoe UI](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui-symbol)):
<br /><br />
<img style="margin-left: 20px" src="{{ 'assets/img/native-fonts-with-system-ui/windows.png' | relative_url }}" alt="This site rendered on Windows 10"/>

On OS X, with its more serious [San Franciso](https://developer.apple.com/fonts/):
<br /><br />
<img style="margin-left: 20px" src="{{ 'assets/img/native-fonts-with-system-ui/mac.png' | relative_url }}" alt="This site rendered on a Mac"/>

Android, and its skinny [Roboto](https://fonts.google.com/specimen/Roboto):
<br /><br />
<img style="margin-left: 20px" src="{{ 'assets/img/native-fonts-with-system-ui/android.png' | relative_url }}" alt="This site rendered on Android"/>

And Ubuntu, rendered with its quirky self-titled [Ubuntu](https://fonts.google.com/specimen/Ubuntu):
<br /><br />
<img style="margin-left: 20px" src="{{ 'assets/img/native-fonts-with-system-ui/ubuntu.png' | relative_url }}" alt="This site rendered on Ubuntu"/>

Some related links:
- Some popular sites that take advantage of the `system-ui` font: [GitHub](https://GitHub.com) and [WordPress Admin](https://wordpress.com/wp-admin)
- The story of Medium's somewhat comical attempt to use `system-ui`: [https://medium.design/system-shock-6b1dc6d6596f](https://medium.design/system-shock-6b1dc6d6596f)
- A list of the actual fonts used on each platform when using `system-ui`: [https://css-tricks.com/snippets/css/system-font-stack/](https://css-tricks.com/snippets/css/system-font-stack/)
- This short writeup on the `system-ui` font at Smashing Magazine: [https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/)
- `system-ui` browser support: [https://caniuse.com/#search=system-ui](https://caniuse.com/#search=system-ui)

