import fs from "node:fs";
import path from "node:path";
import TeamScene from "./TeamScene";

/**
 * About-page team visual.
 *
 * - If you drop a real photo at frontend/public/images/team.jpg
 *   (or .jpeg / .webp / .png, about 1000x1250 px) it is used automatically.
 * - Otherwise the animated team illustration is shown.
 */
const PHOTO_NAMES = ["team.jpg", "team.jpeg", "team.webp", "team.png"];

function findPhoto(): string | null {
  for (const name of PHOTO_NAMES) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", name))) {
      return `/images/${name}`;
    }
  }
  return null;
}

export default function ProfilePhoto() {
  const photo = findPhoto();

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-ink-raised md:mx-0">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt="The NISUV Marketing team" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <TeamScene />
      )}
    </div>
  );
}
