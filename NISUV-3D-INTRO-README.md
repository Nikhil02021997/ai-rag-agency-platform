# NISUV 3D intro

File: frontend/public/nisuv-3d-intro.html (standalone, Three.js + Anime.js via CDN, needs internet).

Preview: run `npm run dev` in frontend/, open http://localhost:3000/nisuv-3d-intro.html

Embed on a page (e.g. About hero card):
  <iframe src="/nisuv-3d-intro.html" title="NISUV Marketing intro" className="h-full w-full rounded-2xl border-0" />

Edit services: SERVICES array at top of the script. Length: TOTAL (seconds).

Update (v3):
- Wordmark is light glossy chrome with a travelling shine.
- Services launch from the logo as comets, land with a flash + ring, then unfold into cards.
- Cards sit in a frame around the logo (3 top / 1 each side / 3 bottom; 2x2 above and below on narrow screens).
