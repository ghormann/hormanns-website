# Text Architecture Diagram Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `site/public/images/text_arch.png` with an updated architecture diagram, with a draw.io source file committed to the repo for future edits.

**Architecture:** Write the draw.io XML file directly (it is plain XML), open in draw.io desktop to verify and fine-tune layout, export PNG, and commit both files. The `.drawio` file is the source of truth; the PNG is a derived artifact.

**Tech Stack:** draw.io (diagrams.net) desktop app for rendering/export; draw.io XML format for source file.

---

### Task 1: Create draw.io source file

**Files:**
- Create: `site/public/images/text_arch.drawio`

- [ ] **Step 1: Write the draw.io XML file**

Create `site/public/images/text_arch.drawio` with this exact content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />

    <!-- Above firewall: Web Server -->
    <mxCell id="2" value="Web Server" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="40" y="90" width="130" height="60" as="geometry" />
    </mxCell>

    <!-- Above firewall: Twilio -->
    <mxCell id="3" value="Twilio" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="300" y="90" width="120" height="60" as="geometry" />
    </mxCell>

    <!-- Above firewall: Phone (user) -->
    <mxCell id="4" value="Phone" style="shape=mxgraph.android.phone2;strokeColor=#666666;strokeWidth=2;fillColor=#f5f5f5;fontColor=#333333;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="530" y="50" width="60" height="100" as="geometry" />
    </mxCell>

    <!-- Above firewall: Admin Phone -->
    <mxCell id="5" value="Admin Phone" style="shape=mxgraph.android.phone2;strokeColor=#666666;strokeWidth=2;fillColor=#f5f5f5;fontColor=#333333;fontSize=12;" vertex="1" parent="1">
      <mxGeometry x="700" y="50" width="60" height="100" as="geometry" />
    </mxCell>

    <!-- Firewall line -->
    <mxCell id="6" value="Firewall" style="endArrow=none;startArrow=none;html=1;strokeColor=#FF0000;strokeWidth=2;align=right;verticalAlign=bottom;fontSize=12;fontColor=#FF0000;" edge="1" parent="1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="0" y="270" as="sourcePoint" />
        <mxPoint x="920" y="270" as="targetPoint" />
      </mxGeometry>
    </mxCell>

    <!-- Below firewall: MQTT Broker -->
    <mxCell id="7" value="MQTT Broker" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="40" y="340" width="130" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: Clock and Snowman controller -->
    <mxCell id="8" value="Clock and Snowman&#xa;controller" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="40" y="500" width="160" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: XLights Render -->
    <mxCell id="9" value="XLights Render" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="280" y="500" width="130" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: fppscheduler -->
    <mxCell id="10" value="fppscheduler" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="510" y="340" width="130" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: FPP Main Show -->
    <mxCell id="11" value="FPP Main Show" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="730" y="310" width="140" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: FPP Tunnel -->
    <mxCell id="12" value="FPP Tunnel" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="730" y="430" width="140" height="60" as="geometry" />
    </mxCell>

    <!-- Below firewall: FPP Tunnel Info -->
    <mxCell id="13" value="FPP Tunnel Info" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="730" y="550" width="140" height="60" as="geometry" />
    </mxCell>

    <!-- Phone → Twilio: Text Messages -->
    <mxCell id="20" value="Text Messages" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="4" target="3" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Twilio → Web Server: API -->
    <mxCell id="21" value="API" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="3" target="2" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Phone → Web Server: HTTPS -->
    <mxCell id="22" value="HTTPS" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#333333;fontColor=#333333;fontSize=11;" edge="1" source="4" target="2" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Admin Phone → Web Server: HTTPS -->
    <mxCell id="23" value="HTTPS" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#333333;fontColor=#333333;fontSize=11;" edge="1" source="5" target="2" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- Web Server → MQTT Broker: MQTT -->
    <mxCell id="24" value="MQTT" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="2" target="7" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- MQTT Broker → Clock and Snowman controller: MQTT -->
    <mxCell id="25" value="MQTT" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="7" target="8" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- MQTT Broker → XLights Render: MQTT -->
    <mxCell id="26" value="MQTT" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="7" target="9" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- MQTT Broker → fppscheduler: MQTT -->
    <mxCell id="27" value="MQTT" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#0000FF;fontColor=#0000FF;fontSize=11;" edge="1" source="7" target="10" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- fppscheduler → FPP Main Show: REST API -->
    <mxCell id="28" value="REST API" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#333333;fontColor=#333333;fontSize=11;" edge="1" source="10" target="11" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- fppscheduler → FPP Tunnel: REST API -->
    <mxCell id="29" value="REST API" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#333333;fontColor=#333333;fontSize=11;" edge="1" source="10" target="12" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

    <!-- fppscheduler → FPP Tunnel Info: REST API -->
    <mxCell id="30" value="REST API" style="edgeStyle=orthogonalEdgeStyle;html=1;strokeColor=#333333;fontColor=#333333;fontSize=11;" edge="1" source="10" target="13" parent="1">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>

  </root>
</mxGraphModel>
```

- [ ] **Step 2: Commit the source file**

```bash
git add site/public/images/text_arch.drawio
git commit -m "Add draw.io source file for text architecture diagram"
```

---

### Task 2: Open in draw.io, verify layout, and export PNG

**Files:**
- Modify: `site/public/images/text_arch.png` (replace with new export)

Note: This task requires draw.io desktop. Download from https://www.drawio.com if not installed.

- [ ] **Step 1: Open the source file**

Open `site/public/images/text_arch.drawio` in the draw.io desktop app.

- [ ] **Step 2: Verify all components are present and correctly labeled**

Check that these components exist with correct labels:
- [ ] Web Server
- [ ] Twilio
- [ ] Phone
- [ ] Admin Phone
- [ ] MQTT Broker
- [ ] Clock and Snowman controller
- [ ] XLights Render
- [ ] fppscheduler
- [ ] FPP Main Show
- [ ] FPP Tunnel
- [ ] FPP Tunnel Info
- [ ] Red "Firewall" line dividing the diagram horizontally

- [ ] **Step 3: Verify all connections have correct labels**

- [ ] Phone → Twilio: "Text Messages"
- [ ] Twilio → Web Server: "API"
- [ ] Phone → Web Server: "HTTPS"
- [ ] Admin Phone → Web Server: "HTTPS"
- [ ] Web Server → MQTT Broker: "MQTT"
- [ ] MQTT Broker → Clock and Snowman controller: "MQTT"
- [ ] MQTT Broker → XLights Render: "MQTT"
- [ ] MQTT Broker → fppscheduler: "MQTT"
- [ ] fppscheduler → FPP Main Show: "REST API"
- [ ] fppscheduler → FPP Tunnel: "REST API"
- [ ] fppscheduler → FPP Tunnel Info: "REST API"
- [ ] No connection between XLights Render and any FPP instance

- [ ] **Step 4: Adjust layout if needed**

If connection labels overlap or edges cross awkwardly:
- Drag components to better positions
- Right-click any edge → "Edit Connection" to add waypoints and reroute
- Ensure all 4 external components (Web Server, Twilio, Phone, Admin Phone) sit above the red firewall line
- Ensure all 7 internal components sit below it

- [ ] **Step 5: Export PNG**

In draw.io: File → Export As → PNG

Settings:
- Scale: 100% (or increase to 150% for higher resolution)
- Background: White
- Fit page: checked

Save as `site/public/images/text_arch.png` (overwrite the existing file).

- [ ] **Step 6: Commit the exported PNG**

```bash
git add site/public/images/text_arch.png
git commit -m "Update text architecture diagram PNG

- MQTT Server renamed to MQTT Broker (below firewall)
- Admin Phone added with HTTPS connection to Web Server
- Phone now shows Text Messages through Twilio and HTTPS to Web Server
- Clock VM renamed to Clock and Snowman controller
- xLights VM renamed to XLights Render (FPP connection removed)
- fppscheduler added, connected to MQTT Broker
- fppscheduler connects to FPP Main Show, FPP Tunnel, FPP Tunnel Info via REST API"
```
