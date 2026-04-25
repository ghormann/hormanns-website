---
title: Text Architecture Diagram Update
date: 2026-04-25
status: approved
---

# Text Architecture Diagram Update

## Overview

Replace the existing `site/public/images/text_arch.png` with an updated architecture diagram. The source file will be a draw.io `.drawio` file committed to the repo, allowing easy future updates. The PNG is exported from draw.io and used on the website.

## Source File Location

- Source: `site/public/images/text_arch.drawio`
- Output: `site/public/images/text_arch.png`

## Diagram Tool

**draw.io (diagrams.net)** — free desktop app. Saves editable XML source (`.drawio`), exports PNG directly. Chosen for maximum layout control and professional output quality.

## Layout

The diagram is divided into two horizontal zones by a red firewall line.

### Above the Firewall (Internet / External)

| Component | Type |
|---|---|
| Phone | External device (user's phone) |
| Admin Phone | External device (administrator's phone) |
| Twilio | Third-party SMS relay service |
| Web Server | Our web server |

### Below the Firewall (Internal Network)

| Component | Type |
|---|---|
| MQTT Broker | Message broker (previously mislabeled "MQTT Server") |
| Clock and Snowman controller | Internal VM/service |
| XLights Render | Internal VM/render service |
| fppscheduler | Internal scheduling service |
| FPP Main Show | Falcon Player instance |
| FPP Tunnel | Falcon Player instance |
| FPP Tunnel Info | Falcon Player instance |

## Connections

| From | To | Label |
|---|---|---|
| Phone | Twilio | Text Messages |
| Twilio | Web Server | API |
| Phone | Web Server | HTTPS |
| Admin Phone | Web Server | HTTPS |
| Web Server | MQTT Broker | MQTT |
| MQTT Broker | Clock and Snowman controller | MQTT |
| MQTT Broker | XLights Render | MQTT |
| MQTT Broker | fppscheduler | MQTT |
| fppscheduler | FPP Main Show | REST API |
| fppscheduler | FPP Tunnel | REST API |
| fppscheduler | FPP Tunnel Info | REST API |

## Key Changes from Previous Diagram

1. Phone now shows only Text Messages going through Twilio (previously implied broader connectivity)
2. Phone added direct HTTPS connection to Web Server for voting website
3. MQTT Server renamed to MQTT Broker and confirmed as below the firewall
4. Clock VM renamed to "Clock and Snowman controller"
5. xLights VM renamed to "XLights Render" and direct SFTP connection to FPP removed
6. New fppscheduler service added, connected to MQTT Broker
7. fppscheduler connects to three FPP instances via REST API: FPP Main Show, FPP Tunnel, FPP Tunnel Info
8. Admin Phone added with HTTPS connection to Web Server
