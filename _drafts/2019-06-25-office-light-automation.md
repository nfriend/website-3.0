---
layout: post
title: 'Office Lights Automation (think of a better title)'
date: 2019-06-25 20:58:30 -0300
image: /assets/img/office-light-automation/video-thumbnail.png
---

There's something incredibly satisfying about writing code that interacts with the physical world. (more intro here)

<figure>
    <iframe width="500" height="315" src="https://www.youtube.com/embed/qE758TBSPzA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <figcaption>Not having to touch my lightswitches will save me <em>minutes</em> of time over the course of my life.</figcaption>
</figure>

Below are some instructions that describe how I accomplished this. Note that they very specific to my setup (IFTTT, Wemo Smart Switch, TP-Link Smart Plug, MacBook) and will likey require a bit of modification if you're trying this out for yourself.

## Install IFTTT-compatible lights/outlets and connect them to IFTTT

For my setup, I installed a [Wemo Smart Switch](https://www.belkin.com/us/p/P-F7C030/) to control the lights in my ceiling and a [TP-Link Smart Plug](https://www.kasasmart.com/us/products/smart-plugs/kasa-smart-plug-energy-monitoring-hs110) to control the lamps.

Connecting smart devices to your network can be a bit of a trick - every manufacturer has its own janky app that is used to connect the device to your WiFi. This is the beauty of [IFTTT](https://ifttt.com) - it provides a common, standardized way of controling your devices without needing to touch the manufacturers' proprietary apps.

## Create an IFTTT applet that turns on/off each light in response to a web request

One of my favorite IFTTT services is [Webhooks](https://ifttt.com/services/maker_webhooks), which allow IFTTT applets to trigger and be triggered by HTTP/HTTPS requests. Create two applets - one that turns the lights on, and one that turns them off. You may need to create more than two applets if your smart devices are made by different manufacturers (like mine are).

## Test your applet

You can test your new applet using `curl`:

```bash
curl -X POST https://maker.ifttt.com/trigger/<your IFTTT event>/with/key/<your IFTTT API key>
```

where `<your IFTTT event>` is the name of the event you chose when setting up the Webhooks applet (I chose `office_lights_on`) and `<your IFTTT API key>` is your personal IFTTT API key, which you can find by following [these instructions](https://www.home-assistant.io/components/ifttt/#sending-events-to-ifttt).

At this point, your lights should magically flick on!

## Trigger the applet when you MacBook screen turns on/off

This is where the real magic happens. Using a small piece of software called [Sleepwatcher](https://www.bernhard-baehr.de/), you can set up a `bash` file that will be executed whenever your MacBook's screen is turned on or off. This process is a bit arcane, although the documentation that is packaged with the
