# About page — team photo

`ProfilePhoto` (used in the `/about` hero, right column) looks for:

| Expected file    |
|---------------------|
| `team.jpg`           |

Drop a real photo (JPG, roughly 4:5 portrait crop, e.g. 1000x1250px) at
`frontend/public/images/team.jpg` and it will replace the placeholder
automatically — no code changes needed. Until then, a clean animated
placeholder is shown so the hero is never left blank.

`.jpg` is expected by default; if you'd rather use `.png` or `.webp`, open
`frontend/src/components/ProfilePhoto.tsx` and update the `PHOTO_SRC`
constant at the top of the file to match.
