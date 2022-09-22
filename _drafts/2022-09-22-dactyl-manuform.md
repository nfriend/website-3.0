---
layout: post
title: 'Dactyl Manuform'
date: 2022-09-22 10:30:29 -0300
---

Bullet point build log:

_(TODO: Rewrite this all in blog form.)_

### Generate STL using [https://github.com/ibnuda/dactyl-keyboard/tree/refaktor](https://github.com/ibnuda/dactyl-keyboard/tree/refaktor)

- Initially tried to generate with hot-swap sockets, then gave up
- Goal is to match [my ErgoDox EZ layout](https://github.com/qmk/qmk_firmware/blob/master/keyboards/ergodox_ez/keymaps/nfriend/readme.md) as much as possible
- Also wanted an aggressive tent angle (went with π/8)
- Helpful Hacker News comment: [https://news.ycombinator.com/item?id=23445208](https://news.ycombinator.com/item?id=23445208)

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/draft.jpg' | relative_url }}" alt="A draft print of the right half" />
    <figcaption>Printed with a .8mm nozzle, .32mm layer height, and lightning infill</figcaption>
</figure>
<br>

### A few minor tweaks, and then generate and slice final STL

- [Link to JSON config]({{ 'assets/other/dactyl-manuform/manuform-any-2022.09.21-01.32.29.json' | relative_url }})
- [Link to left half STL]({{ 'assets/other/dactyl-manuform/case-left.stl' | relative_url }})
- [Link to right half STL]({{ 'assets/other/dactyl-manuform/case-right.stl' | relative_url }})

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/cura.jpg' | relative_url }}" alt="A screenshot of the final STL being sliced in Cura" />
</figure>
<br>

### Cost breakdown

| Description                           | Cost (CAD)  | Link                                                                 |
| ------------------------------------- | ----------- | -------------------------------------------------------------------- |
| Wood PLA filament for 3D printed case | $40.44      | [amazon.ca](https://a.co/d/eUWep4w)                                  |
| Kailh switch tester                   | $21.46      | [aliexpress.com](https://www.aliexpress.com/item/32898546644.html)   |
| Kailh low-profile switch tester       | $9.68       | [aliexpress.com](https://www.aliexpress.com/item/4001204818828.html) |
| Pro Micro controller (x2)             | $44.98      | [amazon.ca](https://a.co/d/1GsSJXg)                                  |
| **Total**                             | **$116.56** |                                                                      |

<br>
