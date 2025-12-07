# Site Architecture & Module Documentation

## Overview

This is a **Jekyll-based static site** hosted on GitHub Pages, serving as a portfolio for Lakshmikanth GR. The site combines Jekyll's collection system for notes with custom static HTML pages and modern dark-themed styling.

**Key features:**
- Dark mode by default
- Typing effect animation (no external dependencies)
- Responsive hero section with CTA buttons
- Jekyll collections for notes/courses
- Works locally with `jekyll serve` and on GitHub Pages

---

## Directory Structure

```
lakshmikanthgr.github.io/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Jekyll layout templates
│   └── default.html         # Base layout used by all pages
├── _notes/                  # Collection: course notes (markdown files)
│   └── cnn-fundamentals.md  # Example note with front matter
├── assets/                  # Static assets
│   ├── css/
│   │   └── style.css        # Main stylesheet (dark theme, animations)
│   ├── js/
│   │   └── main.js          # Client-side JS (typing effect, scroll, reveal)
│   └── images/
│       └── star_bucks_chicago.jpg  # Profile avatar
├── index.html               # Homepage (with front matter for Liquid)
├── about.html               # About page
├── projects.html            # Projects listing
├── contact.html             # Contact information
├── notes/
│   └── index.html           # Notes collection index (Jekyll template)
├── projects/
│   └── cuda-image-processing.html  # Example project detail page
├── README.md                # Quick start guide
└── ARCHITECTURE.md          # This file
```

---

## Core Modules & Files

### 1. **Jekyll Configuration (`_config.yml`)**

**Purpose:** Central configuration file for Jekyll build behavior and site metadata.

```yaml
title: Laksvision
description: Computer Vision • Deep Learning • System Design
baseurl: ""
url: "https://lakshmikanthgr.github.io"
collections:
  notes:
    output: true
    permalink: /notes/:path/
markdown: kramdown
```

**Key settings:**
- `collections.notes.output: true` — Generates individual pages for each note in `_notes/` at `/notes/<filename>/`
- `baseurl: ""` — Set to empty so assets load from root (works on GitHub Pages user sites)
- `markdown: kramdown` — Markdown processor for converting `.md` to HTML

**When it's used:**
- During `jekyll build` or `jekyll serve`, Jekyll reads this config and processes files accordingly.

---

### 2. **Layouts (`_layouts/default.html`)**

**Purpose:** Base template that wraps all pages using Jekyll's Liquid template engine.

**What it does:**
- Provides common header/nav/footer to all pages that declare `layout: default` in front matter.
- Injects page content via `{{ content }}` Liquid variable.
- Ensures consistent structure across all generated pages.

**Usage:**
- Pages reference it with YAML front matter:
  ```yaml
  ---
  layout: default
  title: My Page
  ---
  ```
- The layout file adds boilerplate HTML around the page content.

---

### 3. **HTML Pages (index.html, about.html, projects.html, etc.)**

**Purpose:** Site content pages that display information to visitors.

**Special handling:**
- Each page starts with `---\n---` (empty YAML front matter).
  - This tells Jekyll to process Liquid tags (`{{ '/notes/' | relative_url }}`) inside the HTML.
  - Without front matter, Jekyll treats the file as a static copy.
- Pages reference layout `default` (via the `_layouts/default.html` included by Jekyll).

**Key pages:**
- **index.html** — Hero section with typing effect, about snippet, and project cards.
- **about.html** — Full about section.
- **projects.html** — Listing of all projects.
- **notes/index.html** — Dynamically generated list of notes from the `_notes` collection using Liquid loop:
  ```liquid
  {% for note in site.notes %}
    <li><a href="{{ note.url | relative_url }}">{{ note.title }}</a></li>
  {% endfor %}
  ```

---

### 4. **Notes Collection (`_notes/`)**

**Purpose:** Store course notes and learning materials as Markdown files.

**How it works:**
1. Each `.md` file in `_notes/` must include YAML front matter:
   ```yaml
   ---
   title: CNN Fundamentals
   date: 2025-10-01
   tags: [deep-learning, cnn]
   ---
   ```
2. Jekyll converts each note to HTML at `/notes/<filename>/index.html`.
3. The notes index (`notes/index.html`) loops through `site.notes` and displays links.

**Adding a new note:**
```bash
# Create _notes/my-topic.md
echo "---
title: My Topic
date: 2025-12-07
---
# My Topic Content" > _notes/my-topic.md
```
After `jekyll serve` rebuilds, the note appears in the notes index and at `/notes/my-topic/`.

---

### 5. **Stylesheets (`assets/css/style.css`)**

**Purpose:** All visual styling for the site (colors, layout, animations, dark theme).

**Key sections:**
- **CSS Variables (`:root`)** — Define theme colors:
  ```css
  :root {
    --primary: #314ca6;
    --accent: #00a3ff;
    --bg: #0b1020;     /* dark background */
    --text: #e6eef8;   /* light text */
  }
  ```
- **Dark Theme (`:root[data-theme='dark']`)** — All pages set `data-theme="dark"` on the HTML tag, so these variables are active by default.
- **Hero Section (`.hero`)** — Gradient background, profile image, title, typing effect, and CTA buttons.
- **Navigation (nav)** — Sticky dark translucent bar with links.
- **Cards (`.card`)** — Project and note cards with hover animations.
- **Animations** — `@keyframes fadeInUp` for fade-in effect.

**Customization:**
- Change primary color: Edit `--primary: #314ca6` to a new hex value.
- Adjust spacing: Modify `padding`, `margin`, `gap` properties.
- Update dark theme: Edit variables under `:root[data-theme='dark']`.

---

### 6. **JavaScript (`assets/js/main.js`)**

**Purpose:** Client-side interactivity and animations.

**Functions:**

1. **Typing Effect**
   - Animates text in `.typing` span by cycling through ["Computer Vision", "Deep Learning", "System Design"].
   - No external dependency (custom implementation).

2. **Smooth Scroll for Anchors**
   - Detects clicks on links starting with `#` (e.g., `#about`).
   - Scrolls to the target element smoothly.

3. **Scroll Reveal**
   - Observes `.card` elements as they scroll into view.
   - Adds `fade-in` class to trigger the `fadeInUp` animation.

**Base Href Runtime Resolver**
   - The site originally ran in two environments:
     1. **Local (Live Server)**: `http://127.0.0.1:5500/lakshmikanthgr.github.io/`
     2. **GitHub Pages**: `https://lakshmikanthgr.github.io/`
   - A small script would detect the path and set a dynamic `<base>` tag. *(Now replaced with Jekyll's `relative_url` filter.)*

---

### 7. **Assets (`assets/images/`)**

**Purpose:** Store images and media.

**Current files:**
- `star_bucks_chicago.jpg` — Profile avatar (used in header on all pages).
- `thubsup.jpg` — Unused placeholder.

**Usage:**
```html
<img src="assets/images/star_bucks_chicago.jpg" alt="Lakshmikanth GR" />
```

---

---

## How Everything Works Together

### Build Process (Local)

1. **User runs:** `jekyll serve --watch --baseurl "" --port 4000 --host 0.0.0.0`

2. **Jekyll reads:**
   - `_config.yml` for settings.
   - `_layouts/default.html` for the base layout.
   - All `.html` and `.md` files with front matter.

3. **Jekyll processes:**
   - Converts `_notes/*.md` to HTML pages in `_site/notes/` following `collections.notes.permalink`.
   - Renders Liquid tags (e.g., `{% for note in site.notes %}`) in templates.
   - Copies `assets/` as-is to `_site/assets/`.

4. **Output:** Static HTML in `_site/` directory.

5. **WEBrick server:** Serves files from `_site/` at `http://localhost:4000`.

### Deployment (GitHub Pages)

1. **User commits and pushes:** `git push origin main`

2. **GitHub detects:** Jekyll configuration (`_config.yml`) in the repo.

3. **GitHub Pages builds:** Runs `jekyll build` automatically.

4. **Output served:** Static site at `https://lakshmikanthgr.github.io/`

**No Docker or external tools needed** — GitHub Pages handles the build.

---

## Liquid Template Engine (Jekyll)

**What is Liquid?**
- Template language used by Jekyll to inject dynamic content into HTML/Markdown.

**Common Liquid tags in this site:**

| Tag | Purpose | Example |
|-----|---------|---------|
| `{% for %}` | Loop over collections | `{% for note in site.notes %}...{% endfor %}` |
| `{{ }}` | Output variable | `{{ note.title }}` |
| `\| filter` | Transform output | `{{ note.url \| relative_url }}` |
| `{% if %}` | Conditional | `{% if page.title == "About" %}...{% endif %}` |

**In this site:**
- Used in `notes/index.html` to list all notes.
- Used in nav links to resolve relative paths (`{{ '/notes/' | relative_url }}`).

---

## Dynamic Base Href (Path Resolution)

**Problem it solves:**
- The site runs at different root paths in different environments:
  - Local: `/lakshmikanthgr.github.io/` (within Live Server)
  - GitHub Pages: `/` (root domain)

**Previous solution:** Small JavaScript in page headers detected path and inserted `<base>` dynamically.

**Current solution:** Jekyll's `relative_url` filter handles it:
```html
<a href="{{ '/notes/' | relative_url }}">Notes</a>
```
- In `_config.yml` with `baseurl: ""`, this becomes `/notes/` (GitHub Pages).
- Can be overridden for local testing by changing `baseurl` temporarily.

---

## CSS Structure

### Colors & Theme

```css
:root {
  --primary: #314ca6;    /* Deep blue */
  --accent: #00a3ff;     /* Light blue */
  --bg: #0b1020;         /* Dark background */
  --text: #e6eef8;       /* Light text */
  --muted: #9aa6bf;      /* Muted gray */
}
```

### Layout Components

| Component | Class | Purpose |
|-----------|-------|---------|
| Hero | `.hero` | Header with gradient, profile pic, typing effect |
| Navigation | `nav` | Sticky top bar with links |
| Cards | `.card` | Project/note containers with hover effects |
| Container | `.container` | Max-width wrapper for content |
| Buttons | `.btn`, `.btn.ghost` | CTA buttons (solid and outline) |

### Animations

- **fadeInUp:** Text and elements fade in while moving up (1s duration).
- **Card hover:** Translate up 8px, scale 1.02x, enhanced shadow.
- **Typing effect:** Text cycles with blinking cursor.

---

## File Ignore & Cleanup

**`.gitignore` entries:**
```
_site/         # Generated by Jekyll (recreated on build)
.jekyll-cache/ # Jekyll build cache
.bundle/       # Ruby gems (local only)
Dockerfile, docker-compose.yml, .dockerignore  # Local dev only
```

**Why?**
- Generated files (`_site/`) change on every build; no need to commit.
- Keep repo clean; only source files are needed.

---

## Common Tasks & How to Do Them

### Add a New Note
```bash
mkdir -p _notes
cat > _notes/my-note.md << 'EOF'
---
title: My Learning Topic
date: 2025-12-07
tags: [topic1, topic2]
---

# My Topic

Content goes here...
EOF

# Run jekyll serve; note appears at /notes/my-note/
```

### Change Theme Color
1. Open `assets/css/style.css`
2. Find `:root { --primary: #314ca6; }`
3. Change hex to desired color.
4. Refresh browser.

### Update Profile Avatar
1. Replace `assets/images/star_bucks_chicago.jpg` with a new image.
2. Keep the filename (or update all `<img>` tags to reference the new name).

### Add a New Page
1. Create `newpage.html` with YAML front matter:
   ```html
   ---
   layout: default
   title: New Page
   permalink: /newpage/
   ---
   <h2>{{ page.title }}</h2>
   <p>Content...</p>
   ```
2. Add nav link (e.g., in `index.html` nav):
   ```html
   <a href="newpage.html">New Page</a>
   ```
3. Run `jekyll serve`; accessible at `/newpage/`.

---

## Dependencies & Build Tools

### Local Development
- **Ruby 3.0.x** (or later)
- **Jekyll 4.x** (Ruby gem)
- **Bundler** (optional, for `bundle exec jekyll serve`)

### Deployment
- **GitHub Pages** (automatic; no setup needed)

### None in Production
- No Node.js, npm, or pip needed.
- Pure static HTML/CSS/JS served by GitHub Pages.

---

## Troubleshooting Guide

| Issue | Cause | Fix |
|-------|-------|-----|
| 404 on `/notes/` locally | Liquid tags not processed | Add `---\n---` to HTML pages |
| CSS not loading | Wrong `baseurl` in config | Set `baseurl: ""` for GitHub Pages root |
| Typing effect not running | JS not loaded | Check `<script src="assets/js/main.js"></script>` at end of page |
| Notes don't appear | Missing front matter in `.md` | Add YAML block: `---\ntitle:...\ndate:...\n---` |
| Stale content | Browser cache | Hard refresh (Ctrl+Shift+R) or clear cache |

---

## Summary

This site uses **Jekyll** as a static site generator to:
1. **Manage collections** — Notes as Markdown files in `_notes/`.
2. **Template pages** — Shared layouts and Liquid logic.
3. **Build once, deploy anywhere** — Output is static HTML suitable for GitHub Pages.

**Why Jekyll?**
- GitHub Pages supports it natively; no extra build step.
- Minimal dependencies; pure HTML/CSS/JS output.
- Easy to add notes/projects via Markdown.

**Why custom CSS & JS?**
- Full control over design and animations.
- No heavy frameworks; fast load times.
- Dark theme baked in.

---

## Quick Commands

```bash
# Serve locally with live reload
jekyll serve --watch --baseurl "" --port 4000 --host 0.0.0.0

# Build static site (output to _site/)
jekyll build

# Clean and rebuild
jekyll clean && jekyll build

# Check Jekyll version
jekyll -v
```

---

**Last updated:** 7 December 2025
