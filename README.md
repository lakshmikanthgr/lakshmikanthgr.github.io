# lakshmikanthgr.github.io

## Recent changes

- Homepage: added a polished dark hero, typing effect, and CTAs.
- Replaced avatar with `assets/images/star_bucks_chicago.jpg` across site.
- Site is now dark-mode only (HTML root set with `data-theme="dark").`
- Added a small JS file (`assets/js/main.js`) for typing, smooth-scroll, and reveal effects.

## Local preview

From the repository root run:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

If you want the theme toggle back or different avatar, edit the HTML files in the repo root and `assets/js/main.js`.

## Run with Docker

You can build and run the site in a container (nginx) so it behaves like a real webserver.

Build and run with Docker only:

```bash
# from the repository root
docker build -t lakshmikanth-site:latest .
docker run --rm -p 8000:80 lakshmikanth-site:latest
# then open http://localhost:8000 in your browser
```

Or with Docker Compose (recommended for repeated local dev):

```bash
docker-compose up --build -d
# then open http://localhost:8000
```

Notes
- The image serves the compiled static files from the repository root. Make sure all site files are committed or present in the working directory before building.
- If you still see missing CSS/JS on GitHub Pages, wait a minute after pushing or clear cached service worker / cache in your browser.
