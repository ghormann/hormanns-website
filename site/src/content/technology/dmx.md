---
title: "DMX / E1.31 with Pixels"
description: "How RGB pixels and the E1.31 protocol replaced AC circuits in our display."
heroImage: /images/pixel_hero.jpg
heroImageAlt: "A single 12V WS2811 bullet pixel node with its red, white, and blue wires"
cardImage: /images/20151019_pixel.jpg
order: 4
navGroup: 2
videos:
  - id: "yt2iT4zrkDo"
    title: "Replacing a Pixel"
  - id: "0ZOk3BZXEtk"
    title: "Behind the Scenes (2024)"
  - id: "ZMBEbfsgzBY"
    title: "Behind the Scenes (2019)"
  - id: "t6V2sWjIf3I"
    title: "Behind the Scenes (2016)"
photos:
  - src: "images/20151019_pixel.jpg"
    caption: "Bullet Node"
  - src: "images/20151128_pixel.jpg"
    caption: "Multiple Bullet Nodes"
  - src: "images/20160103_grid2.jpg"
    caption: "Front of Big Grid"
  - src: "images/20160103_grid.jpg"
    caption: "Back of Big Grid"
  - src: "images/strip.png"
    caption: "Flex Strip Pixels"
    thumb: "images/strip_120.png"
  - src: "images/alphapix4.png"
    caption: "AlphaPix 4 Pixel Controller"
    thumb: "images/alphapix4_120.png"
  - src: "christmas/2019/f16v3.jpg"
    caption: "Falcon F16v3"
  - src: "images/9ch_dumb.png"
    caption: "9 RGB Dumb Controller"
    thumb: "images/9ch_dumb_120.png"
  - src: "images/dumb_node.png"
    caption: "Dumb RGB Node"
    thumb: "images/dumb_node_120.png"
---

## Background

Prior to 2014, all of the hardware we leveraged was basically just tricks for switching AC circuits on and off. Although the LOR controller supported dimming, it implemented this by switching the AC current to a normal outlet on and off very quickly. The challenge with this technology is that you were still switching entire strings of lights on and off. (See [8-port parallel controller](/technology/parallel-8/) and [320-port parallel controller](/technology/parallel-320/) for more information)

In 2011, GE introduced the "GE Color Effect" lights for Christmas. Each "bulb" contained three LEDs (one Red, one Green, and one Blue) as well as some control chips. Using a serial protocol it was possible to make each bulb appear as any color by mixing the amount of Red/Green/Blue — and these light strings turned out to be easy to hack to work with controllers other than the original controller, starting a revolution.

By the time we wanted to test using this level of control in our display, multiple others in the DIY Christmas lighting community had discovered that China was already manufacturing RGB "pixels" for applications in outdoor signs with well documented protocols like WS2811. Soon lighting enthusiasts were developing custom hardware for controlling these RGB pixels targeted at holiday displays. In [2014](/christmas/2014/), we used our first pixels on the [grid under the countdown clock](/technology/clock/). By [2016](/christmas/2016/), we had eliminated nearly all of the AC lighting circuits in favor of pixels.

## The Pixels

For most of our display elements (grid, bushes, mega tree, and arches), we use [WS2811 IP68-rated RGB pixels](https://www.wiredwatts.com/products/sn12v50bkp3). We use different form factors depending on the application: the grids, trees, and house outlines all use Bullet Nodes; for the arches, we use high-density [Flex Strip](https://www.holidaycoro.com/Smart-Pixel-LED-RGB-Strip-60-LEDs-m-20-Pixels-m-p/708-wp.htm); the bushes (prior to [2025](/christmas/2025/)) used [Brilliant Bulbs](https://www.holidaycoro.com/Brilliant-Bulb-p/709.htm) with the same 5050 RGB LEDs as the strip.

We leverage a mixture of 5V and 12V pixels. Our 5V elements include the windows, the tunnel, the [snowmen](/technology/snowmen/), and the small sign under the [clock](/technology/clock/). All other elements are 12V.  Going forward, our default is 5v pixels as we've had far fewer issues with them and 5V pixels cost less and are more power efficient, but require more frequent power injection to avoid issues from voltage drop.

## Controllers

Regardless of the style of pixel, they all work basically the same. Each pixel requires 3 DMX channels — one each for the intensity of Red, Green, and Blue. (This means our Mega Tree with 2,400 nodes requires 7,200 DMX channels, and our 8×18ft grid takes 14,628 channels!)

Although there are a number of Pixel Controllers on the market, we currently use FPP controllers from [Kulp Lights](https://kulplights.com/) for any new construction. We still have a few [Falcon F16v3](https://pixelcontroller.com/store/content/9-f16v3-pixel-controller) controllers from Pixel Controllers and a few [AlphaPix 4](https://www.holidaycoro.com/AlphaPix-4-V3-RGB-Pixel-Controller-p/722-v3.htm?srsltid=AfmBOoqlXgemmxcvId9n0Ag1HbbCuJ65S_RdyhqbmfInOHeRQafI_5JE) controllers from HolidayCoro. All types of controllers take DMX over IP Ethernet (E1.31) and convert the data to the WS2811 serial protocol that the pixels understand. These controllers sit outside, near the pixels in waterproof enclosures along with power supplies that convert 120V to either 5V or 12V for the pixels. The [FPP-based](https://github.com/FalconChristmas/fpp) controllers allow the sequence to be loaded into the controller, reducing network bandwidth during the show.

Most of the show is made of sequences designed in [xLights](https://xlights.org/) ahead of time and played back by FPP. A few elements are different: the [countdown clock](/technology/clock/) and the small grid under it, the [snowmen](/technology/snowmen/), the [information board](/technology/info-board/), and the midnight countdown on the [large grid](/technology/grid/) are drawn live by our [custom Linux program](https://github.com/ghormann/GregsLights). It calculates every frame on the fly and sends it straight to the controllers using E1.31 or the similar DDP protocol. That lets these elements react to things a pre-built sequence can't know about, like the number of seconds until Christmas, names texted in by visitors, and the current power usage.

## Dumb RGB

Although most of our display is now smart pixels (allowing each individual pixel to be a different color), the Stars in the yard use "Dumb RGB" nodes — all nodes in a strand display the same color. We use these in the stars because (1) we need multiple lights in each star to make it bright enough, and (2) the stars are at least 8ft apart and early pixels couldn't span that distance without signal loss. We use five 27-channel controllers (9 RGB each) to control the intensity of the Red/Green/Blue inside each star.

## Learning More

If you'd like to learn more about RGB pixel technology, check out [The Aus Christmas Light 101 Manual](https://auschristmaslighting.com/wiki/AusChristmasLighting_101).
