---
layout: post
title: 'Zoom light'
date: 2024-05-31 19:09:00 -0300
image: /assets/img/zoom-light/rainbow_side_view.jpg
---

I built a light that glows when I'm on a Zoom call.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/animated.webp' | relative_url }}" alt="An animation of the Zoom light in action" />
</figure>
<br />

I recently had a blast [building my own keyboard]({% post_url 2023-06-26-i-built-a-weird-keyboard %}). As part of that project, I connected individually-addressable LED strips to the two microcontrollers inside each half. It was way easier than I expected and the end result was fantastic!

This new project was the perfect excuse to play around with these LED strips again. I wanted to engineer a way to allow my family to know I was on a Zoom call without having to open my office door. I had a vision of a nondescript, unobtrusive object that would only reveal its purpose when turned on.

I decided to build a light with a partially-transparent shade; the shade would be thick enough to obscure any pattern on its inside when dark, but would clearly reveal its inner pattern when lit.

## How it works

On a technical level, here's how it works:

- A script on my MacBook listens for Zoom calls to begin
- When it detects a Zoom call has started, the script makes a network request to `http://zoomlight/api/led/on`
- A web server running on a wireless Raspberry Pi Pico inside the light receives the request and turns on the LED strip

## Build log

### Step 1: Hello world

This was my first time working with a Raspberry Pi Pico, so my first task was to just get some code running. Before too long I was able to toggle the on-board LED on and off:

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/on_board_led_side_by_side.jpg' | relative_url }}" alt="A side-by-side showing the on-board LED both on and off" />
</figure>
<br />

### Step 2: Pico web server

Now that I had code compiling and running, I wanted to prove out the idea of running a web server on the wireless Pico.

At first, I hand-coded my own web server, which looked something [like this](https://gitlab.com/nfriend/zoom-light/-/blob/3775855bb3be1061513290f782dfd00e5f66b15e/server.py) and actually worked okay. But I then discovered [microdot](https://github.com/miguelgrinberg/microdot) and threw away my fragile, bespoke implementation for this much more fully-featured library.

I could now toggle the on-board LED remotely!

### Step 3: The SK6812s

I soldered some jumper cables to an SK6812 LED strip and connected it to the Pico. With some help from the [neopixel library](https://github.com/blaz-r/pi_pico_neopixel), I had a remotely-controllable LED strip!

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/led_strip_side_by_side.jpg' | relative_url }}" alt="A side-by-side showing the LED strip off, white, and rainbow" />
</figure>
<br />

### Step 4: The prints

With the digital problems solved, I pivoted to the analog half of this project. I designed a case and shade in [FreeCAD](https://www.freecad.org/) and 3D printed some prototypes using both PLA and PETG.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/shade_prototypes.jpg' | relative_url }}" alt="Two prototypes of the shade, one in PETG and one in PLA" />
</figure>
<br />

These first attempts were okay, but neither were perfect. Both had some printing deformities that were noticeable when backlit. In addition, the shade wasn't _quite_ deep enough to allow the light from the LED strip to diffuse, causing the center of the light to be noticeably brighter than the top and bottom edges.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/diffusion_issues.jpg' | relative_url }}" alt="One of the prototypes backlit, showing not enough light diffusion" />
</figure>
<br />

I increased the depth a bit and printed a new version of both the casing and the shade in PETG. I got lucky; both were some of the cleanest prints I've ever managed!

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/clean_prints.jpg' | relative_url }}" alt="The casing and the shade on the printer bed" />
</figure>
<br />

I usually struggle with PETG, but the 3D printing gods smiled on me that day. (Well, days. Each one took ~18 hours to print.)

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/shade_and_casing.jpg' | relative_url }}" alt="The casing and the shade on floor" />
</figure>
<br />

### Step 5: Piecing it together

The end was in sight. I fixed the LED strip and Pico to the inside of the casing using some hot glue.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/open_on_floor.jpg' | relative_url }}" alt="The casing with the LED strip and Pico installed" />
</figure>
<br />

### Step 6: Drilling holes

It was time to mount it. After some obsessive measuring, I drilled a hole all the way through the wall above my office door (for the power cord) and mounted the casing using command strips.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/mounted.jpg' | relative_url }}" alt="The casing mounted above my office door" />
</figure>
<br />

I popped on the shade and had a working light that I could manually trigger with `curl`!

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/working_side_by_side.jpg' | relative_url }}" alt="The finished light, off, on, and rainbow" />
</figure>
<br />

### Step 7: Making it automatic

The final step was to automate the light so that it automatically turned on when I entered a Zoom call and turned off when I exited.

I experimented with a few different approaches and ultimately ended up using a rather unsatisfying method of polling every 5 seconds for the number of open Zoom ports:

```sh
#!/usr/bin/env bash

# How often to poll for Zoom status, in seconds
INTERVAL=5

# Function to execute the command and process its output
monitor_zoom() {
    current_state='unknown'

    while true; do
        # output will be an integer representing the number of open Zoom ports
        output=$(lsof -i 4UDP | grep zoom | awk 'END{print NR}')

        if [[ $output -gt 2 && $current_state != "on" ]]; then
            # In practice, when on a Zoom call, $output seems to always be 6

            current_state="on"
            echo "Turning light on"
            curl -X POST http://zoomlight/api/led/on
        elif [[ $output -le 2 && $current_state != "off" ]]; then
            # In practice, when not on a Zoom call, $output seems to always be 1

            current_state="off"
            echo "Turning light off"
            curl -X POST http://zoomlight/api/led/off
        fi

        sleep $INTERVAL
    done
}

echo "Watching for Zoom meetings in the background with PID: $$"

# Start the monitoring
monitor_zoom
```

(Does anyone know of a more elegant solution? I'd love to hear it!)

I set up this script to run every time my machine starts ([like this](https://stackoverflow.com/a/13372744/1063392)).

### Step 8: Adding a frontend

Since the Pico was already running a web server, I added a simple frontend that could be accessed through a web browser.

The website shows the current status of the light (via the color of the header block) and provides a way to manually control the color of the light.

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/frontend.jpg' | relative_url }}" alt="Screenshots of the frontend application served by the Pico" />
</figure>
<br />

It uses my favorite component library, [Wired Elements](https://wiredjs.com/).

## Final thoughts

Overall, I'm _very_ happy with how this turned out. The light looks great and turns on and off exactly when it is supposed to!

<figure>
    <img loading="lazy" src="{{ 'assets/img/zoom-light/final_side_by_side.jpg' | relative_url }}" alt="The finished, mounted light, both white and rainbow" />
</figure>
<br />

## Links/resources

- All source files on GitLab: [https://gitlab.com/nfriend/zoom-light](https://gitlab.com/nfriend/zoom-light)
- 3D models on Thingiverse: [https://www.thingiverse.com/thing:6644694](https://www.thingiverse.com/thing:6644694)
- `microdot`, the Python web server library I use on the Pico: [https://github.com/miguelgrinberg/microdot](https://github.com/miguelgrinberg/microdot)
- `neopixel`, the library that interfaces with the LED strip on the Pico: [https://github.com/blaz-r/pi_pico_neopixel](https://github.com/blaz-r/pi_pico_neopixel)
