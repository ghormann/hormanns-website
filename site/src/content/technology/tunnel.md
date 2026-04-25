---
title: "The Tunnel"
description: "A massive walk-through tunnel of RGB pixels — the largest single element in our display."
heroImage: https://img.youtube.com/vi/HpcExG1dQpo/maxresdefault.jpg
order: 2.5
videos:
  - id: "HpcExG1dQpo"
    title: "Tunnel of Lights (2023)"
  - id: "XngMaYWBpOI"
    title: "Tunnel Rainbow (2024)"
  - id: "nQgYmLia6iU"
    title: "Tunnel Buttons (2024)"
  - id: "glANXkb4Blc"
    title: "The Tunnel (2022)"
  - id: "A52b5S2XGXg"
    title: "Setup: Roof and Tunnel (2023)"
  - id: "STx_4p-lqiU"
    title: "Setup: Mega Tree and Tunnel (2023)"
  - id: "Zfi6tDEdeUk"
    title: "Setup: More Tunnel Construction (2023)"
  - id: "fLudpz4hYtA"
    title: "Setup: Tunnel (2024)"
  - id: "VgT0AFCre8k"
    title: "Setup: Tunnel and Snowmen (2024)"
photos:
  - src: "christmas/2022/20221105_164622.jpg"
    caption: "Building tunnel frame sections in the garage - Nov 5, 2022"
  - src: "christmas/2022/20221110_104639.jpg"
    caption: "Assembling truss sections in the yard - Nov 10, 2022"
  - src: "christmas/2022/20221110_164838.jpg"
    caption: "Raising the pixel grid with a lift - Nov 10, 2022"
  - src: "christmas/2024/20241220_220327.jpg"
    caption: "Naughty or Nice tunnel - Dec 20, 2024"
sectionSidebars:
  - heading: "Construction (2022)"
    photoIndices: [0, 1, 2]
    maxPhotos: 3
  - heading: "Interactive Buttons (2024)"
    photoIndices: [3]
    maxPhotos: 1
---

The tunnel was added to our display in [2022](/christmas/2022/), on the right side of the yard after moving the [countdown clock](/technology/clock/) to the far left to make room. When fully assembled it forms a 16x8 foot walk-through arch of RGB pixels that visitors can walk though and be surrounded  by lights. With more pixels than [the snowmen](/technology/snowmen/) (13,256), the tunnel became the **single largest element in our display**.

## Construction

The tunnel frame is built from aluminum truss sections assembled in the yard each season. Construction typically spans several setup days — in [2023](/christmas/2023/), dedicated setup days stretched from roof and tunnel work all the way through pixel wiring and snowmen integration. A mechanical lift is used to raise the pixel grids into position on the truss at height.

Each season the tunnel goes up in pieces:

1. Truss sections are pre-built in the garage
2. Sections are assembled end-to-end in the yard
3. Pixel grids are lifted into place on the frame
4. Power and data cabling is run along the frame
5. The full structure is anchored with ground stakes and guide wires

## Pixels and Controllers

Like the [snowmen](/technology/snowmen/), the tunnel uses **5V WS2811 RGB smart pixels** rather than the 12V pixels used in most of our other elements. The 5V pixels cost less, are more power efficient, and have fewer reliability issues — but they require more frequent power injection along the data runs to avoid voltage drop problems. Dedicated 5V power supplies are mounted in weatherproof enclosures directly on the frame alongside the pixel controllers.

Control uses the [E1.31 (sACN) protocol](/technology/dmx/) over Ethernet, with Falcon controllers from [Kulp Lights](https://kulplights.com/) receiving the data stream and converting it to the WS2811 serial signal the pixels understand. The tunnel required additional pixel controllers as it was expanded — in [2023](/christmas/2023/) we went from 11 controllers display-wide to 13, and in [2024](/christmas/2024/) to 15.

## Interactive Push Buttons (2024)

In [2024](/christmas/2024/) we added **push button controls** mounted at the tunnel entrance. Visitors can press the buttons to trigger color effects on the tunnel in real time. The buttons connect through a custom controller that sends MQTT messages to the [GregsLights](https://github.com/ghormann/GregsLights) control program, which responds by firing tunnel-specific animations.

The buttons were an immediate hit. In the [2024](/christmas/2024/) season alone, visitors pressed the tunnel buttons **40,846 times**. In [2025](/christmas/2025/) the total was **39,661 presses** — showing the interactive element consistently draws engagement throughout the season.
