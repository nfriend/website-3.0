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

- Decided to use external Pro Micro controller holder, which I could only find in the [Wayback Machine](https://web.archive.org/web/20220607031910/https://dactyl.siskam.link/loligagger-external-holder-promicro-v2.stl)
- Decided to add my own screw holes since the generated ones were awkwardly placed
- [Link to JSON config]({{ 'assets/other/dactyl-manuform/manuform-any-2022.09.21-01.32.29.json' | relative_url }})
- [Link to hosted version of STL generator](https://dactyl.mbugert.de/)
- [Link to left half STL]({{ 'assets/other/dactyl-manuform/case-left.stl' | relative_url }})
- [Link to right half STL]({{ 'assets/other/dactyl-manuform/case-right.stl' | relative_url }})

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/cura.jpg' | relative_url }}" alt="A screenshot of the final STL being sliced in Cura" />
</figure>
<br>

### Cost breakdown

Cost of all items, including tax and shipping.

| Description                                    | Cost (CAD)  | Link                                                                                                                   |
| ---------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| Wood PLA filament for 3D printed case          | $40.44      | [amazon.ca](https://a.co/d/eUWep4w)                                                                                    |
| Kailh switch tester                            | $21.46      | [aliexpress.com](https://www.aliexpress.com/item/32898546644.html)                                                     |
| Kailh low-profile switch tester                | $9.68       | [aliexpress.com](https://www.aliexpress.com/item/4001204818828.html)                                                   |
| Pro Micro controller (x2)                      | $44.98      | [amazon.ca](https://a.co/d/1GsSJXg)                                                                                    |
| M3 heat-seated inserts (x100)                  | $12.42      | [amazon.ca](https://a.co/d/6wMZmwo)                                                                                    |
| M3 screws (x100)                               | $12.02      | [amazon.ca](https://a.co/d/enX1CBA)                                                                                    |
| 1N4148 Diode (x100)                            | $8.80       | [digikey.ca](https://www.digikey.ca/en/products/detail/onsemi/1N4148/458603)                                           |
| Reset button (x3)                              | $10.82      | [digikey.ca](https://www.digikey.ca/en/products/detail/e-switch/PS1057ABLK/46305)                                      |
| 22AWG Wire (25')                               | $7.24       | [digikey.ca](https://www.digikey.ca/en/products/detail/sparkfun-electronics/PRT-08866/6833926)                         |
| TRRS jack, female (x3)                         | $12.65      | [digikey.ca](https://www.digikey.ca/en/products/detail/switchcraft-inc/35RASMT5CHNTRX/16569698)                        |
| Jumper wire (x60)                              | $11.74      | [digikey.ca](https://www.digikey.ca/en/products/detail/sparkfun-electronics/PRT-12796/5993861)                         |
| Soldering iron                                 | $96.03      | [homedepot.ca](https://www.homedepot.ca/product/weller-10-to-60w-soldering-iron-station/1001649529)                    |
| Solder                                         | $28.23      | [homedepot.ca](https://www.homedepot.ca/product/harris-harris-8oz-spool-elec-solder/1001652943)                        |
| Gel wood stain\*                               | $19.93      | [homedepot.ca](https://www.homedepot.ca/product/varathane-gel-premium-gel-wood-stain-in-dark-walnut-236-ml/1000844900) |
| Glossy polyurethane\*                          | $27.11      | [amazon.ca](https://a.co/d/do2gUQm)                                                                                    |
| **Keyboard materials**                         | **$189.34** |                                                                                                                        |
| **All items** (including tools, testers, etc.) | **$316.51** |                                                                                                                        |

_\*Items I already owned before starting this project_
<br>
