---
title: "Song Voting"
description: "Viewers vote for the next song via a mobile-friendly website."
heroImage: /images/vote_now_2026.jpg
cardImage: /images/vote_now_card.jpg
heroImageAlt: "The vote-now.org voting page on a phone, showing the current song and the song queue with votes cast for Christmas Cannon and Hot Chocolate"
order: 6
navGroup: 2
videos: []
photos:
  - src: "images/text_arch.png"
    caption: "System Architecture"
  - src: "christmas/2019/Website/Names.jpg"
    caption: "Name Queue"
    thumb: "christmas/2019/Website/normal_size/Names.jpg"
  - src: "christmas/2019/Website/Stats.jpg"
    caption: "Statistics"
    thumb: "christmas/2019/Website/normal_size/Stats.jpg"
  - src: "images/vote_now_faq_2026.jpg"
    caption: "FAQs (2026)"
  - src: "images/vote_now_2026.jpg"
    caption: "Voting page with votes cast (2026)"
sectionSidebars:
  - heading: "How it Works"
    photoIndices: [0]
    maxPhotos: 1
---

The [text your name](/technology/text-message/) feature from [2018](/christmas/2018/) worked so well that we wanted to add an additional interactive element in [2019](/christmas/2019/). After some thought, we got the idea of allowing viewers to vote for the next song. After considering a few different implementations, we decided upon a simple website designed for the mobile phone — and that is how [vote-now.org](https://vote-now.org) was born.

## How it Works

- The front-end website is a simple single-page website with five tabs. It was developed using [Vue.js](https://vuejs.org/) and [Vite](https://vite.dev/) to be both reactive and mobile friendly. The [front-end source code](https://github.com/ghormann/Christmas-Vote-now/tree/master/frontend) is public.
- The back end is written in [Node.js](https://nodejs.org) using [Hapi](https://hapi.dev/) and provides the basic endpoints for voting and getting information about the queue. It pushes live updates (votes, the current song, the name queue) to every open phone over a WebSocket, so the page updates without refreshing. ([Source Code](https://github.com/ghormann/Christmas-Vote-now/tree/master/server))
- Each visitor is allowed to have at most 8 votes cast at any given time. Once a song they voted for begins to play, those votes are returned. In addition, a new vote is granted every 2 minutes up to a maximum of 8 available votes.
- To ensure voters don't keep repeating the same song, once a song has played, it isn't available for voting for around 9 minutes.
- We use the [Falcon Player](https://github.com/FalconChristmas/fpp) to actually play the songs on the display. It sends periodic MQTT updates on which song is playing and how many seconds are left, which are transmitted to each active web client via the web server. (Greg contributed source code to the Falcon Player project to enable this capability.)
- The [fpp scheduler](https://github.com/ghormann/fppscheduler) is responsible for scheduling. The schedule is mostly driven by votes, but also by the number of names in the queue, the show hours, and how long it has been since specific sequences were played (intro, radio station ID, etc.) When it detects the Falcon isn't playing a song, it starts the next scheduled playlist using the Falcon Player's REST API.
- A stats service running in our home [Kubernetes](https://k3s.io/) cluster records all stats (names submitted, votes cast, songs played) and periodically reports a summary to the webserver for distribution to browsers. ([Source Code](https://github.com/ghormann/ChristmasStats))
