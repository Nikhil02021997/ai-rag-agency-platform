# Service hero videos

Real looping motion-graphic .mp4 clips already ship in this folder (and in
`cards/`) — generated to match the site's brand colors, so there's nothing
you need to add for videos to show up. Drop your own clip at the same path
any time to swap one out; each component falls back to an animated SVG scene
automatically if a file is ever missing or fails to load.

`ServiceHeroBackground`
looks for these paths and falls back to the animated SVG scene alone if a
file is missing.

| Service page          | Expected file             | Optional poster frame     |
|------------------------|----------------------------|-----------------------------|
| AI & RAG systems        | `ai-rag.mp4`               | `ai-rag.jpg`                |
| Web & product dev       | `web-dev.mp4`              | `web-dev.jpg`               |
| Digital marketing       | `marketing.mp4`            | `marketing.jpg`             |
| Data & analytics        | `analytics.mp4`            | `analytics.jpg`             |

Recommendations:
- Keep each file under ~5–8MB — it autoplays muted/looped on page load, so
  size directly affects load time.
- 1280x720 or 1920x1080, 15–30s loop, no audio needed (it's muted anyway).
- H.264 .mp4 is the safest format for broad browser support.
- The poster .jpg (same name, .jpg extension) shows instantly while the
  video loads, so the hero never looks blank.

The video renders at 50% opacity underneath the existing animated SVG scene
and the dark gradient overlay, so text stays readable without any extra
work — you don't need to darken the video yourself.

## About page — "What we believe" reel

`BeliefsReel` (used on `/about`) looks for:

| Expected file            | Optional poster           |
|----------------------------|-----------------------------|
| `about-believe.mp4`        | `about-believe.jpg`         |

Same rules as above — muted, looped, autoplay, H.264 .mp4. Until a file is
added, a looping animated motion-graphic scene plays instead, so the section
is never blank.

## Services page — per-card previews

`ServiceCardMedia` (used on `/services`) looks in a `cards/` subfolder, one
clip per service:

| Service card              | Expected file                     | Optional poster                   |
|-----------------------------|-------------------------------------|--------------------------------------|
| AI & RAG systems             | `cards/ai-rag.mp4`                  | `cards/ai-rag.jpg`                  |
| Digital marketing & growth   | `cards/marketing.mp4`               | `cards/marketing.jpg`               |
| Web & product development    | `cards/web-dev.mp4`                 | `cards/web-dev.jpg`                 |
| Data & analytics             | `cards/analytics.mp4`               | `cards/analytics.jpg`               |

Keep these short and light (under ~3–4MB each) since all four can be visible
on screen at once. Recommended aspect ratio 16:10.
