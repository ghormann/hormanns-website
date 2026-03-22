---
title: "The Snowmen"
description: "Two animated snowmen having a snowball fight — from rope lights to 13,000 RGB pixels."
heroImage: https://img.youtube.com/vi/0W53e9QcRPk/maxresdefault.jpg
order: 2
videos:
  - id: "0W53e9QcRPk"
    title: "2020 (Voter Selectable)"
  - id: "GPOL_nibIAU"
    title: "2019 (Digital)"
  - id: "PEzZA8v5mrQ"
    title: "2019 Daytime"
  - id: "YY1jnphglgw"
    title: "2012 (Original)"
  - id: "WD2kRBD6h4U"
    title: "2010 (Original)"
  - id: "Z6t6t1zBcxU"
    title: "2008 (Original)"
photos:
  - src: "christmas/2016/snowman_card.jpg"
    caption: "Thank You Letter from Neighborhood Kids"
    thumb: "christmas/2016/snowman_card_thumb.jpg"
  - src: "christmas/2019/Snowman_Day/day1.jpg"
    caption: "Daytime"
    thumb: "christmas/2019/Snowman_Day/thumbnails/day1.jpg"
  - src: "christmas/2019/Snowman_Day/day2.jpg"
    caption: "Snowmen Grid"
    thumb: "christmas/2019/Snowman_Day/thumbnails/day2.jpg"
  - src: "christmas/2019/Snowman_Day/day3.jpg"
    caption: "Snowmen + Splash"
    thumb: "christmas/2019/Snowman_Day/thumbnails/day3.jpg"
  - src: "christmas/2019/Snowman_Day/day4.jpg"
    caption: "Daytime"
    thumb: "christmas/2019/Snowman_Day/thumbnails/day4.jpg"
  - src: "christmas/2019/Snowman_Day/day5.jpg"
    caption: "F16 Controller"
    thumb: "christmas/2019/Snowman_Day/thumbnails/day5.jpg"
  - src: "christmas/2019/snowman_basement.jpg"
    caption: "Construction"
    thumb: "christmas/2019/snowman_basement_120.jpg"
  - src: "christmas/2019/snowmen_close.jpg"
    caption: "Pixels Up Close"
    thumb: "christmas/2019/snowmen_close_120.jpg"
  - src: "christmas/snowmen/IMG_1141.JPG"
    caption: "Original Snowmen"
    thumb: "christmas/snowmen/thumb_IMG_1141.JPG"
  - src: "christmas/snowmen/IMG_2445.JPG"
    thumb: "christmas/snowmen/thumb_IMG_2445.JPG"
  - src: "christmas/2002/2002_snowman_3.jpg"
    thumb: "christmas/2002/_2002_snowman_3.jpg"
  - src: "christmas/2002/2002_snowman_4.jpg"
    thumb: "christmas/2002/_2002_snowman_4.jpg"
  - src: "christmas/2002/2002_snowman_5.jpg"
    thumb: "christmas/2002/_2002_snowman_5.jpg"
  - src: "christmas/2002/2002_snowman_6.jpg"
    thumb: "christmas/2002/_2002_snowman_6.jpg"
---

The snowmen were added to our display in 2002. The idea came after seeing a video by Drew Heckman of two snowmen having a snowball fight. By 2017, the snowmen were getting rather old and hard to maintain. We initially attempted to fully retire them that year, but after a few requests from the local neighborhood children, we brought them back for the end of 2017 and 2018 — earning praise from the neighborhood kids! Knowing they could not survive another season, we fully rebuilt them in newer technology for 2019.

## Digital Version (2019–present)

During 2019, we completely redesigned the snowmen from the ground up. The snowmen are now made of 5 different [pixel grids](/technology/dmx/) for a total of 13,256 RGB pixels, making the snowman the single largest element in our display. In an attempt to balance cost and quality, the bodies of the snowman have pixels separated by 1" while the other parts of the display use 2" spacing. The snowman leverages 5 volt pixels, about 13 power supplies, and a dedicated Falcon F16v3 controller.

A [custom Linux program](https://github.com/ghormann/GregsLights) controls the snowman along with the clock. The grids are held up by 1" galvanized pipe and numerous guide wires, with a pulley system to move the grids into position on the frame.

These new snowmen are more flexible than the original design. You see better arm and snowball movement, hats that can be knocked off, the ability to stick multiple snowballs on the nose or on the ground, and a neat "duck the snowball" trick. Every so often, one of them has had enough and pulls out a big cannon to fire a massive snowball at the other.

For 2020 we gave the snowman a new ability: viewers can log into our website and select one of 7 different characters for the snowman on the right. Nothing like throwing a snowball at Hans Gruber during the Holiday season!

## Original Version (2002–2018)

The original snowmen were built without wire-frame welding. Instead, the construction used:

- ½" galvanized pipe
- Wire fence (2" × 3" spacing)
- Wire cloth with ½" holes to hold the lights
- Zip ties
- Rope light
- Mini lights (35 and 50 count)
- A crazy amount of hot glue

The snowmen were really just two pieces of galvanized pipe with 4 feet (1.22 m) of wire fence between them. For the face and arms where more density was needed, wire cloth was added on top of the wire fencing for more precise light placement.

These snowmen only required 14 circuits to produce "animation" — important at the time since our display used the [320 controller](/technology/parallel-320/) with limited circuits. It worked by lighting up different sets of lights (representing different arm and snowball positions) in specific orders to give the impression of motion. Each snowman had 7 circuits:

1. Arm back to throw
2. Arm forward to throw
3. "Splat" in the face
4. "Splat" on the ground
5. Upper snowball on the nearest pipe
6. Lower snowball on the nearest pipe
7. Snowball in the middle pipe

The body (rope light) and face (mini lights) were static lights that were always powered.

*Note: Most pictures were taken before the mini-light cords were covered in black electrical tape to prevent them from being seen. The wires are not visible at night.*
