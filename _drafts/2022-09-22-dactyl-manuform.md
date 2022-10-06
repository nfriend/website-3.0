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
- [Link to JSON config]({{ 'assets/other/dactyl-manuform/config.json' | relative_url }})
- [Link to hosted version of STL generator](https://dactyl.mbugert.de/)
- [Link to final STL]({{ 'assets/other/dactyl-manuform/case.stl' | relative_url }})

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/insert_tester.jpg' | relative_url }}" alt="A photo of a print for determining the correct insert tolerance" />
    <figcaption>A test print with insert holes ranging from 3.8mm to 4.2mm in diameter</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/insert_tester_after.jpg' | relative_url }}" alt="A photo of another insert hole test print; this one includes installed screws" />
    <figcaption>A second test print with insert holes ranging from 4.2mm to 4.6mm. I decided to go with 4.5mm.</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/cura.jpg' | relative_url }}" alt="A screenshot of the final STL being sliced in Cura" />
    <figcaption>TODO</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/switch_tester.jpg' | relative_url }}" alt="TODO" />
    <figcaption>TODO</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/insert_installed.jpg' | relative_url }}" alt="TODO" />
    <figcaption>TODO</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/on_print_bed.jpg' | relative_url }}" alt="TODO" />
    <figcaption>TODO</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/printed_no_sanding.jpg' | relative_url }}" alt="TODO" />
    <figcaption>TODO</figcaption>
</figure>
<br>

<figure>
    <img src="{{ 'assets/img/dactyl-manuform/kailh_hot_swap_socket.jpg' | relative_url }}" alt="TODO" />
    <figcaption>TODO</figcaption>
</figure>
<br>

### Cost breakdown

Cost of all items, including tax and shipping.

| Description                                    | Cost (CAD) | Link                                                                                                                                                                  |
| ---------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wood PLA filament for 3D printed case          | $40.44     | [amazon.ca](https://a.co/d/eUWep4w)                                                                                                                                   |
| Kailh switch tester                            | $21.46     | [aliexpress.com](https://www.aliexpress.com/item/32898546644.html)                                                                                                    |
| Kailh low-profile switch tester                | $9.68      | [aliexpress.com](https://www.aliexpress.com/item/4001204818828.html)                                                                                                  |
| Pro Micro controller (x2)                      | $44.98     | [amazon.ca](https://a.co/d/1GsSJXg)                                                                                                                                   |
| Kailh BOX White switches (x90)                 | $51.26     | [aliexpress.com](https://www.aliexpress.com/item/1005004522909300.html)                                                                                               |
| Kailh hot-swap sockets (x100)                  | $17.89     | [aliexpress.com](https://www.aliexpress.com/item/4001051840976.html)                                                                                                  |
| M3 heat-seated inserts (x100)                  | $12.42     | [amazon.ca](https://a.co/d/6wMZmwo)                                                                                                                                   |
| M3 screws (x100)                               | $12.02     | [amazon.ca](https://a.co/d/enX1CBA)                                                                                                                                   |
| EC11 rotary encoder (x4)                       | $15.80     | [amazon.ca](https://a.co/d/eAp729Y)                                                                                                                                   |
| LED strip (1m)                                 | $16.37     | [aliexpress.com](https://www.aliexpress.com/item/32682015405.html)                                                                                                    |
| 1N4148 Diode (x100)                            | $8.80      | [digikey.ca](https://www.digikey.ca/en/products/detail/onsemi/1N4148/458603)                                                                                          |
| Reset button (x3)                              | $10.82     | [digikey.ca](https://www.digikey.ca/en/products/detail/e-switch/PS1057ABLK/46305)                                                                                     |
| 22AWG Wire (25')                               | $7.24      | [digikey.ca](https://www.digikey.ca/en/products/detail/sparkfun-electronics/PRT-08866/6833926)                                                                        |
| TRRS jack, female (x3)                         | $12.65     | [digikey.ca](https://www.digikey.ca/en/products/detail/switchcraft-inc/35RASMT5CHNTRX/16569698)                                                                       |
| Jumper wire (x60)                              | $11.74     | [digikey.ca](https://www.digikey.ca/en/products/detail/sparkfun-electronics/PRT-12796/5993861)                                                                        |
| Soldering iron                                 | $59.87     | [homedepot.ca](https://www.homedepot.ca/product/1001649527)                                                                                                           |
| Solder                                         | $28.23     | [homedepot.ca](https://www.homedepot.ca/product/1001652943)                                                                                                           |
| Wire stripper                                  | $11.29     | [canadiantire.ca](https://www.canadiantire.ca/en/pdp/mastercraft-20-30-gauge-wire-stripper-comfort-grip-handles-high-carbon-heat-treated-steel-0584508p.html?loc=plp) |
| Gel wood stain\*                               | $19.93     | [homedepot.ca](https://www.homedepot.ca/product/1000844900)                                                                                                           |
| Glossy polyurethane\*                          | $27.11     | [amazon.ca](https://a.co/d/do2gUQm)                                                                                                                                   |
| **Keyboard materials**                         | **$TODO**  |                                                                                                                                                                       |
| **All items** (including tools, testers, etc.) | **$TODO**  |                                                                                                                                                                       |

_\*Items I already owned before starting this project_
<br>
