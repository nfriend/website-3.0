---
layout: post
title: My First "Hello, World!"
date: 2018-06-07 09:40:45 -0300
image: assets/img/my-first-hello-world/qbasic.png
---

The other day, I ran across [Windows 95 In Your Browser](https://win95.ajf.me/), which uses [Emscripten](https://github.com/kripken/emscripten) and [DOSBox](https://www.dosbox.com/download.php?main=1) to run a full-fledged operating system in a browser. What a time to be alive.

<figure style="margin-bottom: 20px;">
    <iframe width="500" height="315" src="https://www.youtube.com/embed/qu32fBkiHFE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</figure>

This got me thinking... if Windows 95 could run on this Frankenstein-ed stack, what other nostalgic tech could I resurrect from my childhood?

My mind immediately jumped to something that consumed hours and _hours_ of my childhood. It wasn't a game, it wasn't a chat app, it was [QBasic](https://en.wikipedia.org/wiki/QBasic).

<figure>
    <img src="{{ 'assets/img/my-first-hello-world/qbasic.png' | relative_url }}" alt="The QBasic start screen" />
    <figcaption>If you grew up on QBasic, this screenshot will induce an immediate wave of nostalgia.</figcaption>
</figure>

QBasic was a fantastic first language. Getting started was a breeze - a first-time QBasic user could fire up the all-in-one IDE/runtime environment, write something like this:

```sh
PRINT "Hello, world!"
```

... hit <span class="keyboard-key">Shift</span>+<span class="keyboard-key">F5</span>, and immediately see the greeting written to the screen!

<figure style="margin-bottom: 20px;">
    <img src="{{ 'assets/img/my-first-hello-world/hello-world.png' | relative_url }}" alt="The QBasic runtime showing a 'Hello, world!' program being executed." />
</figure>

It also came with a _great_ integrated help system that included lots of code snippets that I endless copy-and-pasted:

<figure style="margin-bottom: 20px;">
    <img src="{{ 'assets/img/my-first-hello-world/qbasic-help.png' | relative_url }}" alt="The QBasic help screen." />
</figure>

Recreating a QBasic environment in the browser was easier than expected, thanks to a project called [js-dos](http://js-dos.com/). After about an hour of work, I had a working QBasic editor running in all its glowing blue glory!

After digging around on my backup drives, I found my old QBasic .BAS files and took a trip down memory lane as I ran each of my ancient programs one-by-one. Most of them required a bit of tweaking before they would behave correctly - my 13-year-old self had a bad habit of saving files to directories without checking if they existed first, and he _really_ liked controlling program timing with empty loops:

```sh
FOR i = 0 TO 100000
NEXT i
```

... which unfortunately is entirely dependent on the speed of the host's CPU. I had to cut most of these loops by a factor of 100 since the browser runs the programs so much slower than the original hardware.

So, without further ado, here are the most interesting programs, delivered to you through time using the magic JavaScript. Click on any of the screenshots below to launch the program in a new tab:

## SPIRO.BAS

A precursor to my more modern project [Inspiral Web](https://nathanfriend.com/inspiral-web), this program creates Spirograph designs based on a few simple configurations.

Hint: Here's an example configuration to get you started:

- Inner wheel size: 52
- Outer wheel size: 100
- Hole number: 25
- Color: 12

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/spiro.bas-screenshot.png' | relative_url }}" alt="SPIRO.BAS" />
        <figcaption>SPIRO.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=SPIRO.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## ADVNTUR1.BAS

An adventure game with ASCII graphics. You control a small blue square with the numpad (<span class="keyboard-key">4</span>, <span class="keyboard-key">6</span>, <span class="keyboard-key">8</span>, and <span class="keyboard-key">2</span>), journeying around the landscape visiting small towns (green squares) and battling rouge enemies (red squares).

I gave it a few tries, and man, it is _hard_.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/advntur1.bas-screenshot.png' | relative_url }}" alt="SPIRO.BAS" />
        <figcaption>ADVNTUR1.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=ADVNTUR1.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## ALNATTCK.BAS

A super short animation of a little man being sucked up by alien invaders.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/alnattck.bas-screenshot.png' | relative_url }}" alt="ALNATTCK.BAS" />
        <figcaption>ALNATTCK.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=ALNATTCK.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## CELOHLP2.BAS

A flash-card game for cello students that quizzes their knowledge of bass clef, tenor clef, and treble clef, complete with a high-scores list.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/celohlp2.bas-screenshot.png' | relative_url }}" alt="CELOHLP2.BAS" />
        <figcaption>CELOHLP2.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay dark" href="https://nathanfriend.com/origins?file=CELOHLP2.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px-dark.svg' | relative_url }}" />
    </a>
</div>

## COOL.BAS

Another drawing program that creates intricate designs with customizable color palettes. I used to draw these shapes with color pencils as a child which inspired this QBasic version.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/cool.bas-screenshot.png' | relative_url }}" alt="COOL.BAS" />
        <figcaption>COOL.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=COOL.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## GIGA.BAS

QBasic had a fun pitch generation API which I used to recreate piano and cello pieces I was learning at the time. Here's Bach's _Giga_ from the _Partita in B Flat_:

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/giga.bas-screenshot.png' | relative_url }}" alt="GIGA.BAS" />
        <figcaption>GIGA.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=GIGA.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## GORILLA.BAS

Okay, you got me - this one isn't mine. It's one of the example programs that shipped with QBasic. My siblings and I had loads of fun lobbing explosive bananas at each other.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/gorilla.bas-screenshot.png' | relative_url }}" alt="GORILLA.BAS" />
        <figcaption>GORILLA.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=GORILLA.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## NEWTETRS.BAS

A Tetris clone.

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/newtetrs.bas-screenshot.png' | relative_url }}" alt="NEWTETRS.BAS" />
        <figcaption>NEWTETRS.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=NEWTETRS.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## PATIENCE.BAS

Test your patience! How long can you hold down <span class="keyboard-key">Q</span>?

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/patience.bas-screenshot.png' | relative_url }}" alt="PATIENCE.BAS" />
        <figcaption>PATIENCE.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=PATIENCE.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## STRESS.BAS

Feeling stressed? This little game lets you punch a square with your enemy's name on it until they spontaneously combust!

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/stress.bas-screenshot.png' | relative_url }}" alt="STRESS.BAS" />
        <figcaption>STRESS.BAS</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins?file=STRESS.BAS" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## And many, _many_ more...

There's _lots_ more where the above came from. Here's a little GUI that can launch and run any of the programs I wrote as a child:

<div class="figure-link">
    <figure>
        <img src="{{ 'assets/img/my-first-hello-world/origins-screenshot.png' | relative_url }}" alt="origins" />
        <figcaption>nathanfriend.com/origins</figcaption>
    </figure>
    <a class="figure-link-overlay" href="https://nathanfriend.com/origins" target="_blank">
        <img class="play-button" src="{{ 'assets/img/shared/baseline-play_circle_outline-24px.svg' | relative_url }}" />
    </a>
</div>

## Source

If you're interested in how this little project works, [check it out on GitHub here](https://github.com/nfriend/origins-host).
