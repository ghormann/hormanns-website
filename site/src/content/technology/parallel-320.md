---
title: "320-Circuit Parallel Port Controller"
description: "The Hill-Robertson design for controlling up to 320 individually switchable circuits from a parallel port."
order: 9
videos: []
photos:
  - src: "christmas/2008/hill320_front.jpg"
    caption: "Controller Front"
  - src: "christmas/2002/2002_board1.jpg"
    caption: "Controller Board"
  - src: "christmas/2002/2002_board2.jpg"
    thumb: "christmas/2002/_2002_board2.jpg"
  - src: "christmas/2002/2002_board_3.jpg"
    thumb: "christmas/2002/_2002_board_3.jpg"
  - src: "christmas/2002/2002_box_1.jpg"
    caption: "Controller Box"
    thumb: "christmas/2002/_2002_box_1.jpg"
  - src: "christmas/2002/2002_box_2.jpg"
    thumb: "christmas/2002/_2002_box_2.jpg"
  - src: "christmas/2002/2002_box_3.jpg"
    thumb: "christmas/2002/_2002_box_3.jpg"
  - src: "images/74ACT374.gif"
    caption: "374 Flip-Flop"
  - src: "images/74HCT138.gif"
    caption: "138 Decoder"
  - src: "images/320write.gif"
    caption: "Write Cycle Animation"
---

> **Note:** The information on this page is rather old and was never fully completed. Although this can technically still be built and used today, there are much better solutions available. This page is kept for historical reference only. If you are looking for an inexpensive DIY AC solution that also supports dimming, check out the [Renard](http://doityourselfchristmas.com/wiki/index.php?title=Renard_Main_Page) set of solutions.

> **Standard disclaimer:** I'm not responsible for anyone hooking these circuits up and the results that follow their use.

After the 2001 season, I wasn't sure how to expand beyond the [original 8-port design](/technology/parallel-8/). Luckily, I came across Hill Robertson's design that can control up to 320 individual circuits. I modified it slightly, but it is really still the same design.

*(Note: If you need a much smaller number of circuits, check out the [original 8-port design](/technology/parallel-8/). These can always be converted to work with this design with little effort.)*

## The Parallel Port

The parallel port is a great way to interface a PC to external devices because (1) every PC has one, and (2) it's easy to program. The parallel port has 8 output wires (OUTPUT), 5 input wires (STATUS), and 4 that are bi-directional (CONTROL).

In "Standard" mode, both the 8 data bits and the 4 control bits work as latched output pins. This means all 12 bits stay "on" or "off" until they are set differently — making very simple circuits for controlling lights.

The control bits are always two positions above the base address of the parallel port. For example, if your parallel port is at port 888 (0x378 hex) then the control address is at 890 (0x37A hex). This means pins 2–8 are controlled by setting the 8 bits on port 888, while pins 1, 14, 16, 17 are attached to the lower 4 bits on port 890.

To calculate what number to write, add up the bit values:
- Bit #1 = 1 / Bit #2 = 2 / Bit #3 = 4 / Bit #4 = 8
- Bit #5 = 16 / Bit #6 = 32 / Bit #7 = 64 / Bit #8 = 128
- Example: Bits 2, 4, and 6 → 2 + 8 + 32 = **42**

## The Design

My design consists of 40 [8-circuit boxes](/technology/parallel-8/) for a total of 320 individually switchable circuits. It requires 6 writes (6 clock cycles) to change a single box (or 240 to change all boxes). Even a very slow Pentium 75 is able to change all 40 boxes in the blink of an eye.

The design for the main board only requires two types of integrated circuits: the **138 decoder** and the **374 flip-flop**.

**The 374 Flip-Flop** is really just a single chip with 8 bits of memory. There are eight "D" pins representing the input and 8 "Q" pins that are the output. The chip works by continuing to output on the "Q" pins whatever was present on the corresponding "D" pin when a clock signal was received (a clock signal occurs when pin 1 goes from Low to High).

**The 138 Decoder** takes the binary representation of 3 bits (zero = 000, 7 = 111) and sets the output pin that matches that value to Low. For example, if pins 1–3 are given 010, then pin 12 (Y3) will be set Low, and all other Y pins will be set to High.

## How a Write Works

1. The first data byte (8 bits) is put into a temporary 374 "memory buffer" representing which of 8 AC circuits should be on or off.
2. The flip-flop control bit (pin 1) is set low (0V — inverted), latching the data in the flip-flop. This allows us to use the 8-bits on the parallel port to set routing information next.
3. The flip-flop control bit is set back to high (+5V), resetting it for next time.
4. Routing information is sent via the normal data channel. 3 bits go to all 138 decoders specifying the "column", while 5 other bits only go to one decoder specifying the "row". (8 columns × 5 rows = 40 different 374 "memory" chips, each storing 8 bits = 320 unique outputs.)
5. The decoder control bit (pin 14) is set high to send a clock (Low) to the specific flip-flop box, locking the data.
6. Finally, the destination flip-flop latches the data and turns on or off the lights via the 8-circuit boxes, holding its state until the next instruction changes it.
