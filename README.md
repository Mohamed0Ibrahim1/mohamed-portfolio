# Mohamed Ibrahim — Portfolio

Bilingual (Arabic / English) portfolio for graphic design, 3D and brand identity work.
Static site, no build step: open `index.html` or deploy to GitHub Pages.

## Edit content
Everything (name, bio, services, projects) lives in **`assets/js/data.js`**.

## Add a project
1. Put images/videos in `assets/media/`.
2. Copy one project object in `data.js`, change `slug`, texts, `color`, and media.

Media types:
```js
{ type: "image",   src: "assets/media/cover.jpg" }
{ type: "video",   src: "assets/media/reel.mp4", poster: "assets/media/reel.jpg" } // muted loop
{ type: "youtube", id: "VIDEO_ID" }
{ type: "vimeo",   id: "VIDEO_ID" }
```
Block layouts: `full`, `wide`, `grid2`, `grid3`, `text`, `quote`, `stats`.

Tip: keep mp4 files under ~20 MB (GitHub limit is 100 MB per file); host long videos on Vimeo/YouTube.

## Publish on GitHub Pages
Repo → Settings → Pages → Deploy from branch → pick the branch → `/ (root)`.
