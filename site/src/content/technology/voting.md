---
title: "Song Voting"
description: "Viewers vote for the next song via a mobile-friendly website."
order: 6
videos: []
photos:
  - src: "christmas/2019/Website/Current.jpg"
    caption: "Song List"
    thumb: "christmas/2019/Website/normal_size/Current.jpg"
  - src: "christmas/2019/Website/Names.jpg"
    caption: "Name Queue"
    thumb: "christmas/2019/Website/normal_size/Names.jpg"
  - src: "christmas/2019/Website/Stats.jpg"
    caption: "Statistics"
    thumb: "christmas/2019/Website/normal_size/Stats.jpg"
  - src: "christmas/2019/Website/Faq.jpg"
    caption: "FAQs"
    thumb: "christmas/2019/Website/normal_size/Faq.jpg"
---

The [text your name](/technology/text-message/) feature from 2018 worked so well that we wanted to add an additional interactive element in 2019. After some thought, we got the idea of allowing viewers to vote for the next song. After considering a few different implementations, we decided upon a simple website designed for the mobile phone — and that is how [vote-now.org](https://vote-now.org) was born.

## How it Works

- The front-end website is a simple single-page website with four tabs. It was developed using [Vue.js](https://vuejs.org/) to be both reactive and mobile friendly. The [front-end source code](https://github.com/ghormann/Christmas-Vote-now/tree/master/frontend) is public.
- The back end is written in [Node.js](https://nodejs.org) and provides the basic endpoints for voting and getting information about the queue. ([Source Code](https://github.com/ghormann/Christmas-Vote-now/tree/master/server))
- Each visitor is allowed to have at most 8 votes cast at any given time. Once a song they voted for begins to play, those votes are returned. In addition, a new vote is granted every few minutes up to a maximum of 8 available votes.
- To ensure voters don't keep repeating the same song, once a song has played, it isn't available for voting for around 6 minutes.
- We use the [Falcon Player](https://github.com/FalconChristmas/fpp) to actually play the songs on the display. It sends periodic MQTT updates on which song is playing and how many seconds are left, which are transmitted to each active web client via the web server. (Greg contributed source code to the Falcon Player project to enable this capability.)
- The webserver is responsible for scheduling. The schedule is mostly driven by votes, but also by the number of names in the queue, the show hours, and how long it has been since specific sequences were played (intro, radio station ID, etc.) When it detects the Falcon isn't playing a song, it sends the next scheduled playlist name to the Falcon Player via an MQTT request.
- Another set of Docker containers records all stats (names submitted, votes cast, songs played) and periodically reports a summary to the webserver for distribution to browsers. ([Source Code](https://github.com/ghormann/ChristmasStats))
