---
title: "Christmas Information Board"
description: "A 12ft wide P10 panel display showing real-time power usage, radio station, and viewer interaction info."
heroImage: https://img.youtube.com/vi/ksmsWpjH3jE/hqdefault.jpg
order: 7
videos:
  - id: "ksmsWpjH3jE"
    title: "Information Board in Action"
    thumb: https://img.youtube.com/vi/ksmsWpjH3jE/hqdefault.jpg
  - id: "8WGW7Ky4HIU"
    title: "Initial Concept"
  - id: "kgoQNgluk2M"
    title: "How it Works"
photos:
  - src: "christmas/power_box/box_closed.jpg"
    caption: "Power Monitoring Box"
  - src: "christmas/power_box/box_open.jpg"
    caption: "Power Monitoring Box (Inside)"
  - src: "christmas/power_box/sensor_large.jpg"
    caption: "Sensor and Arduino"
    thumb: "christmas/power_box/sensor_small.jpg"
  - src: "christmas/power_box/grafana_detailed.jpg"
    caption: "Chart of Amps for Each Circuit"
  - src: "christmas/power_box/grafana_summary.jpg"
    caption: "Average Amps/sec by Song"
  - src: "christmas/power_box/board_construction.jpg"
    caption: "Under Construction"
  - src: "christmas/power_box/sign_daytime.jpg"
    caption: "Daytime Picture"
showFavDisplays: true
---

In 2020, we added a new P10 panel display to provide information to viewers about our display. Measuring 12ft wide and 2ft tall, the sign displays information of interest including the radio station we broadcast on, the near real-time power consumption for the display, the phone number for interacting with the display, and periodically the total amount of power the display has consumed for the season.

## How it Works

Our display is powered by four 20-Amp breakers. We break this down into eight power runs (each less than 10 Amps). All of these power runs feed through a custom-made box consisting of an Arduino Mega, an Arduino Ethernet shield, and a bunch of ACS712 current sensors. These current sensors monitor the electrical field produced in each circuit and estimate the number of Amps currently being pulled. The Arduino continuously monitors these power sensors, calculates the total wattage consumed each second for each of the eight power runs, and then publishes the data via MQTT where it can be consumed by a number of different tools — including our custom C++ program that controls the Information Board and an InfluxDB database for logging and statistics.

When it comes to displaying the information on the 12ft sign board, our custom C++ program monitors the MQTT messages and decides what to display. It draws out each pixel in memory and then uses the DDP protocol to push the information to a BeagleBone Black in the back of the board running Falcon Pi Player. The FPP software controls the 33 P10 panels making up the board.

## Source Code

- [Controlling the Sign](https://github.com/ghormann/GregsLights/blob/master/GregsLights/src/GarageSign.cpp)
- [Arduino Power Monitoring Sensors](https://github.com/ghormann/ChristmasPowerMonitor)
