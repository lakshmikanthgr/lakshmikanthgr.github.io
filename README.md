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

Cleanup guidance

Before committing a cleanup (recommended):

```bash
# remove generated site from the repo cache if it exists
git rm -r --cached _site || true
# remove local jekyll cache
rm -rf .jekyll-cache
# commit .gitignore that excludes generated files
git add .gitignore
git commit -m "Ignore generated files and local caches"
```

To fully remove the Docker files I added earlier (optional):

```bash
git rm Dockerfile docker-compose.yml .dockerignore || true
git commit -m "Remove docker artifacts"
```

After this your repository will contain only source files needed for GitHub Pages (layouts, assets, markdown, and config). 

