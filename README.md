# 🔮 Wizard's Studio — Digital Design & Development

[![Website Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20%7C%20GSAP-purple.svg)]()
[![Design System](https://img.shields.io/badge/Design-Premium%20Dark-edbfff.svg)]()
[![Scrolling](https://img.shields.io/badge/Scroll-Lenis%20Smooth-blue.svg)]()

> **Wizard's Studio** is an award-winning style, premium dark creative portfolio landing page designed and built for digital design and development agencies. It utilizes high-end motion design, liquid cursor interactions, dynamic color scheme transformations, and layout animations to deliver a premium user experience that captivates visitors from the first pixel.

---

## 🎨 Visual Design System & Aesthetics

The design of Wizard's Studio is rooted in **modern minimalism, high-contrast typography, and fluid motion**. It breaks away from traditional grid systems to establish a premium, editorial layout reminiscent of award-winning websites on Awwwards and CSS Design Awards.

### Curated Color Palette
The interface is centered around a rich dark mode that seamlessly transitions to a soft-hued light mode in strategic content sections:

| Token | Hex / Value | Description |
| :--- | :--- | :--- |
| `--bg` | `#0a0a0a` | Deep, ink-dark canvas representing the primary background |
| `--bg-light` | `#f5f0eb` | Soft warm-sand tone triggered during light-mode intersections |
| `--surface` | `#141414` | Slightly elevated charcoal surface for containers & media cards |
| `--accent` | `#edbfff` | Luminous, pastel lilac accent highlighting interactive elements |
| `--text` | `#f0ece5` | Warm off-white for high readability and premium editorial feel |
| `--text-dim` | `#7a7a7a` | Muted titanium gray for labels, indices, and secondary copy |
| `--border` | `rgba(255,255,255,0.12)` | Subtle glassmorphic borders for grid alignment |

### Premium Typography
- **Display Typeface:** [Syne](https://fonts.google.com/specimen/Syne) — Bold, geometric, and highly expressive. Used for hero headlines and section labels to give an artistic, avant-garde tone.
- **Body Typeface:** [Inter](https://fonts.google.com/specimen/Inter) — Clean, highly legible, and neutral, providing a perfect counterweight to the expressive headers.

---

## ✨ Premium Features & Micro-Animations

What makes Wizard's Studio stand out is its **highly engaging motion layer**. Instead of static elements, every component is alive with physics-based smooth movement and interactive states:

### 1. Smart Linear Preloader
Before entering the site, visitors are welcomed by a customized, branded preloader. 
- **GSAP Counter & Fill:** A custom GSAP timeline counts from `0` to `100%` and synchronizes with a custom loading bar fill.
- **Intro Transition:** Upon completion, the preloader smoothly slides vertically out of the viewport (`yPercent: -100`) using a dramatic `power4.inOut` easing, revealing the hero content exactly as the animations stagger in.

### 2. Lenis Smooth Scroll Integration
Standard scroll physics are replaced with [Lenis](https://github.com/darkroomengineering/lenis), a lightweight, premium smooth scrolling engine. 
- Disables jagged browser jumps and introduces inertial momentum.
- Directly integrated with **GSAP ScrollTrigger** using a custom tick pipeline to maintain sync.

### 3. GSAP Scroll-Triggered Text Parallax & Blurs
As the user scrolls down the page, the hero typography splits and fades out dynamically:
- **Left/Right Shifts:** The first and second lines of the title slide horizontally in opposite directions.
- **Progressive Blur:** The texts gradually blur out (`filter: blur(8px)`) and fade, clearing visual space for the showreel container.

### 4. Cinematic Showreel Expansion
The showreel video behaves like a physical component responding to gravity:
- Starts pinned as a centered capsule (dimension: `30vw` x `30vh`).
- Scales outwards into a sweeping, cinematic player (`95vw` x `90vh`) with smooth `24px` border radiuses as the user scrolls into view.

### 5. Dynamic Theme-Shift (Dark <-> Light Transitions)
To prevent visual monotony, the landing page switches themes entirely on intersection:
- Entering the **About** and **Clients** sections triggers a smooth background and typography color-shift (`is-light` active state classes).
- Clean CSS variables automatically swap properties while keeping the layout transitions completely fluid.

### 6. Liquid Cursor-Following Hover Reveal (quickTo)
When hovering over client rows, a floating media card renders dynamically:
- Uses GSAP `quickTo` coordinates for latency-free, fluid mouse tracking.
- Random tilts and scales (`rotate: -3deg`, `scale: 1`) create a playful, interactive hover preview.

### 7. Native Media Loaders
To prevent structural shifts or flashes of unstyled media, image and video components are wrapped in standard skeleton loaders (`media-loading`). The loader fades out only when the asset is fully loaded inside the browser (`loadeddata` & `load` event listeners).

---

## 🛠️ Tech Stack & Libraries

Wizard's Studio is built strictly with performance-oriented, modern vanilla web technologies to keep bundle sizes minimal:

- **HTML5:** Semantic architecture, accessible headings structure (`h1`-`h5`), and descriptive ARIA controls.
- **CSS3:** Built completely with vanilla CSS, custom variables, responsive grid configurations, custom bezier transitions, and dynamic `clamp()` sizing for a flawless fluid typography scale.
- **JavaScript (ES6+):** Module patterns, custom event registration, and DOM lifecycle wrappers.
- **GreenSock Animation Platform (GSAP v3.13.0):** Used for advanced sequence orchestration, timeline-based keyframing, and custom ease curves.
- **GSAP ScrollTrigger:** Handles all scrollbound event bindings, parallax scroll timelines, class toggling, and pin mechanics.
- **Lenis Smooth Scroll (v1.1.18):** Provides inertial scrolling engine features.

---

## 📂 Project Architecture

```directory
Wizard's Agency/
├── assets/
│   ├── images/         # Premium project WebP & background JPG images
│   └── videos/         # 4K Loop showreel MP4 video assets
├── css/
│   └── style.css       # Design tokens, layouts, base components, and media query blocks
├── js/
│   └── main.js         # Core preloader, GSAP timeline configs, Lenis pipelines, and custom event listeners
├── index.html          # Main HTML5 semantic page entry point
└── README.md           # This premium overview guide
```

---

## 🚀 Setup & Local Development

Wizard's Studio relies on native ES modules and smooth media streams. Running it directly via `file://` might block video playback or GSAP hooks due to browser CORS policies.

To run it locally under optimal conditions:

### Option A: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Click **Go Live** on the bottom status bar, or right-click `index.html` and choose **Open with Live Server**.

### Option B: Local HTTP Server (Python/Node)
If you have Python or Node installed, you can boot a quick server from the terminal:

```bash
# Using Python 3.x
python -m http.server 8000

# Using Node.js (via http-server)
npx http-server . -p 8000
```
Open `http://localhost:8000` in your browser.

---

## 🌐 Responsive Design & Performance

The template is fully optimized for all devices, from ultra-wide desktops to mobile phones:
- **Liquid Typography:** Section headlines and hero texts scale dynamically based on the viewport width using the CSS `clamp()` function.
- **Hardware Acceleration:** Animations utilize CSS transformations (`transform`, `translate3d`) and GPU-accelerated layers, ensuring a locked `60fps` render cycle.
- **Adaptive Layouts:** Custom GSAP MatchMedia breakpoints handle desktop configurations separately, preventing mouse-tracking or heavy pins on mobile viewports.

---

*Designed and Built with 💜 by **Mueez Ullah** (2026).*
