---
layout: post
title:  "Nathan Friend: Origins"
date:   2018-06-04 20:22:45 -0300
image:  assets/img/nathan-friend-origins/qbasic.png
---

The other day, I ran across [Windows 95 In Your Browser](https://win95.ajf.me/), which uses [Emscripten](https://github.com/kripken/emscripten) and [DOSBox](https://www.dosbox.com/download.php?main=1) to run a full-fledged operating system in a browser. What a time to be alive.

<figure>
    <iframe width="500" height="315" src="https://www.youtube.com/embed/qu32fBkiHFE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</figure>

This got me thinking... if Windows 95 could run on this Frankenstein-ed stack, what other nostalgic tech could I resurrect from my childhood?

My mind immediately jumped to something that consumed hours and _hours_ of my childhood.  It wasn't a game, it wasn't a chat app, it was [QBasic](https://en.wikipedia.org/wiki/QBasic).

<figure>
    <img src="{{ 'assets/img/nathan-friend-origins/qbasic.png' | relative_url }}" alt="The QBasic start screen" />
    <figcaption>If you've ever used QBasic, this screenshot should hit you with a wave of nostalgia.</figcaption>
</figure>

QBasic was a fantastic first language.  Compared to some of the setups required to start learning modern more modern programming languages, a first-time QBasic user could fire up the all-in-one IDE/runtime enviroment, write something like this:

```sh
PRINT "Hello, world!"
```

... hit <span class="keyboard-key">Shift</span>+<span class="keyboard-key">F5</span>, and immediately see the greeting written to the screen!

<figure style="margin-bottom: 20px;">
    <img src="{{ 'assets/img/nathan-friend-origins/hello-world.png' | relative_url }}" alt="The QBasic runtime showing a 'Hello, world!' program being executed." />
</figure>

It also came with a _great_ help system that included lots of code snippets that I endless copy-and-pasted.

----------

Recreating a QBasic environment in the browser was easier than expected, thanks to [js-dos](http://js-dos.com/).  After about an hour of work, I had a working QBasic editor running in all its glowing blue glory!

After digging around on my backup drives, I found my old QBasic directory and took a trip down memory lane as I ran each of my ancient programs one-by-one.  Most of them required a bit of tweaking before they would behave correctly - my 13-year-old self had a bad habit of saving files to directories without checking if they existed first, and _really_ liked controlling program timing with empty loops:

```sh
FOR i = 0 TO 100000
NEXT i
```

... which unfortunately is entirely dependent on the speed of the host's CPU.  I had to cut most of these loops by a factor of 100 since the brower runs the programs so much slower than the original hardware.

So, without further ado, here are the most interesting products, delivered to your browser through the magic of JavaScript:

