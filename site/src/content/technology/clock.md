---
title: "The Countdown Clock"
description: "Our giant pixel countdown clock — from 49 incandescent circuits to 7,000+ RGB pixels."
heroImage: https://img.youtube.com/vi/z0MqBhNhmZU/maxresdefault.jpg
order: 1
videos:
  - id: "MnXRQG9p0ps"
    title: "Original Version"
  - id: "qFUG5f9jvME"
    title: "Hitting Zero (2010)"
  - id: "u8uZSKy_S0k"
    title: "Time Lapse (2011)"
  - id: "TuTu1zv39b0"
    title: "Time Lapse (2013)"
  - id: "tCQ9uxtrXfQ"
    title: "Half Grid (2014)"
  - id: "UdQGn5WxL0I"
    title: "Full Grid (2015)"
  - id: "mOmyryUlp3c"
    title: "How SSR Worked (2016)"
  - id: "pPuGSIxpJIA"
    title: "Oops… (2016)"
  - id: "z0MqBhNhmZU"
    title: "Current Version"
  - id: "aGOOmF0B3fM"
    title: "GUI Program (Current)"
  - id: "IPzWfIm7C5c"
    title: "Text Your Name"
photos:
  - src: "christmas/2003/IMG_0870.JPG"
    caption: "Original Clock (2003)"
    thumb: "christmas/2003/thumbnails/IMG_0870.JPG"
  - src: "christmas/2002/clock_back2.JPG"
    caption: "Original Clock Back (2002)"
  - src: "christmas/2004/Outside/normal_size/IMG_5997.JPG"
    caption: "Original Clock (2004)"
    thumb: "christmas/2004/Outside/thumbnails/IMG_5997.JPG"
  - src: "christmas/2014/Tree2_640.png"
    caption: "Clock with Half Grid (2014)"
  - src: "images/9ch_dumb.png"
    caption: "Dumb Controller (2015–2016)"
  - src: "christmas/2001/boxes/ssrs.jpg"
    caption: "Solid State Relays (2002–2017)"
    thumb: "christmas/2001/boxes/_ssrs.jpg"
---

Introduced in 2002, the clock is one of the oldest elements in our display, having been rebuilt a few times since the original design. The current design contains two small grids of RGB pixels controlled by [E1.31](/technology/dmx/) controllers. A [custom Linux program](https://github.com/ghormann/GregsLights) controls the clock and underlying grid, updating the color of each pixel up to 20 times per second.

## History

Originally the clock was made of standard incandescent mini-lights popular at the time. We used 49 strands that were 20 bulbs per strand. Each digit was configured like a 7-segment LED display and turned on/off by a solid state relay connected to the [Hill 320 Parallel Port controller](/technology/parallel-320/). This resulted in seven CAT-5 wires carrying control signal from the basement to the clock, with all the relays just behind the clock. In the original design, the words "Seconds until Christmas" were spelled out in 100-count mini-lights that were always on.

In 2014, we replaced the static "Seconds until Christmas" with our first RGB [pixel grid](/technology/dmx/) that scrolled messages and had simple animation. This pixel grid was originally just 48 pixels wide but expanded to 96 pixels wide the following year. The pixels are held in place by two layers of hardware cloth and a whole lot of glue. This lower grid is still used today.

In 2015, we scrapped the Hill 320 controller and started using Dumb RGB Controllers to convert the DMX signals to 12V data that could be directly fed into the Solid State relays that still switched the 110V AC current for the lights. This allowed the control signal for all lights to be supplied via a single CAT-5 cable. The Linux PC calculates the number of seconds remaining until Christmas, determines which segments need to light up, and sends the correct DMX signal.

In 2017, we finally scrapped the pegboard and incandescent mini-lights and converted the top half to use pixels as well. Everything is still powered by [custom source code](https://github.com/ghormann/GregsLights).
