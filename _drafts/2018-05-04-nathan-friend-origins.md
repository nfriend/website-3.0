---
layout: post
title:  "Nathan Friend: Origins"
date:   2018-06-04 20:22:45 -0300
image:  assets/img/nathan-friend-origins/qbasic.png
---

The other day, I ran across [Windows 95 In Your Browser](https://win95.ajf.me/), which uses [Emscripten](https://github.com/kripken/emscripten) and [DOSBox](https://www.dosbox.com/download.php?main=1) to run a full-fledged operating system in a browser. What a time to be alive.

<figure style="margin-bottom: 20px;">
    <iframe width="500" height="315" src="https://www.youtube.com/embed/qu32fBkiHFE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</figure>

This got me thinking... if Windows 95 could run on this Frankenstein-ed stack, what other nostalgic tech could I resurrect from my childhood?

My mind immediately jumped to something that consumed hours and _hours_ of my childhood. It wasn't a game, it wasn't a chat app, it was [QBasic](https://en.wikipedia.org/wiki/QBasic).

<figure>
    <img src="{{ 'assets/img/nathan-friend-origins/qbasic.png' | relative_url }}" alt="The QBasic start screen" />
    <figcaption>If you've ever used QBasic, this screenshot should hit you with a wave of nostalgia.</figcaption>
</figure>

QBasic was a fantastic first language. Compared to some of the setups required to start learning modern more modern programming languages, a first-time QBasic user could fire up the all-in-one IDE/runtime enviroment, write something like this:

```sh
PRINT "Hello, world!"
```

... hit <span class="keyboard-key">Shift</span>+<span class="keyboard-key">F5</span>, and immediately see the greeting written to the screen!

<figure style="margin-bottom: 20px;">
    <img src="{{ 'assets/img/nathan-friend-origins/hello-world.png' | relative_url }}" alt="The QBasic runtime showing a 'Hello, world!' program being executed." />
</figure>

It also came with a _great_ help system that included lots of code snippets that I endless copy-and-pasted.

---

Recreating a QBasic environment in the browser was easier than expected, thanks to [js-dos](http://js-dos.com/). After about an hour of work, I had a working QBasic editor running in all its glowing blue glory!

After digging around on my backup drives, I found my old QBasic directory and took a trip down memory lane as I ran each of my ancient programs one-by-one. Most of them required a bit of tweaking before they would behave correctly - my 13-year-old self had a bad habit of saving files to directories without checking if they existed first, and _really_ liked controlling program timing with empty loops:

```sh
FOR i = 0 TO 100000
NEXT i
```

... which unfortunately is entirely dependent on the speed of the host's CPU. I had to cut most of these loops by a factor of 100 since the brower runs the programs so much slower than the original hardware.

So, without further ado, here are the most interesting programs, delivered to you through time using the magic JavaScript. Click on any of the screenshots to launch the program in a new tab:

## SPIRO.BAS

A precursor to my more modern project [Inspirograph](https://nathanfriend.io/inspirograph), this program creates Spirograph designs based on a few simple configurations.

Hint: If you don\'t know what values to use, try something like:

-   Inner wheel size: 52
-   Outer wheel size: 100
-   Hole number: 25
-   Color: 12

<div class="runnable-program" 
     data-program-link="https://nathanfriend.io/origins?file=SPIRO.BAS">
    <figure>
        <img src="{{ 'assets/img/nathan-friend-origins/spiro.bas-screenshot.png' | relative_url }}" alt="SPIRO.BAS" />
        <figcaption>SPIRO.BAS</figcaption>
    </figure>
    <div class="runnable-program-overlay">
        <img class="play-button" src="{{ 'assets/img/nathan-friend-origins/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </div>
</div>

## ADVNTUR1.BAS

An adventure game with ASCII graphics. You control a small blue square with the numpad (<span class="keyboard-key">4</span>, <span class="keyboard-key">6</span>, <span class="keyboard-key">8</span>, and <span class="keyboard-key">2</span>), journeying around the landscape filled with small towns (green squares) and rouge enemies (red squares).

I gave it a few tries, and man, it is _hard_.

<div class="runnable-program" 
     data-program-link="https://nathanfriend.io/origins?file=ADVNTUR1.BAS">
    <figure>
        <img src="{{ 'assets/img/nathan-friend-origins/advntur1.bas-screenshot.png' | relative_url }}" alt="SPIRO.BAS" />
        <figcaption>ADVNTUR1.BAS</figcaption>
    </figure>
    <div class="runnable-program-overlay">
        <img class="play-button higher" src="{{ 'assets/img/nathan-friend-origins/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </div>
</div>

## ALNATTCK.BAS

A super short animation of a little man being sucked up by alien invaders.

<div class="runnable-program" 
     data-program-link="https://nathanfriend.io/origins?file=ALNATTCK.BAS">
    <figure>
        <img src="{{ 'assets/img/nathan-friend-origins/alnattck.bas-screenshot.png' | relative_url }}" alt="SPIRO.BAS" />
        <figcaption>ALNATTCK.BAS</figcaption>
    </figure>
    <div class="runnable-program-overlay">
        <img class="play-button highest" src="{{ 'assets/img/nathan-friend-origins/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </div>
</div>

<style>
    .runnable-program {
        position: relative;
    }

    .runnable-program .runnable-program-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        cursor: pointer;
    }

    .runnable-program .runnable-program-overlay:hover {
        background: rgba(255, 255, 255, .12);
    }

    .runnable-program .runnable-program-overlay .play-button {
        position: relative;
        display: block;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        margin-top: 139px;
        opacity: .5;
    }

    .runnable-program .runnable-program-overlay .play-button.higher {
        margin-top: 110px;
    }

    .runnable-program .runnable-program-overlay .play-button.highest {
        margin-top: 95px;
    }

    .runnable-program .runnable-program-overlay:hover .play-button {
        opacity: .8;
    }
</style>

<script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous">
</script>

<script>
    $(function() {
        $('.runnable-program').click(function() {
            var $this = $(this);
            window.open($this.attr('data-program-link'),'_newtab');
        });
    });
</script>
