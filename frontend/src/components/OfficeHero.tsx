import fs from "node:fs";
import path from "node:path";
import OfficeScene from "./OfficeScene";

/**
 * Home-page hero visual.
 *
 * - If you drop a real photo of your office/team at
 *   frontend/public/images/office.jpg (or .jpeg / .webp / .png) it is shown
 *   automatically, with the three service chips layered on top.
 * - Otherwise the illustrated glass-office scene is shown.
 */
const PHOTO_NAMES = ["office.jpg", "office.jpeg", "office.webp", "office.png"];

function findPhoto(): string | null {
  for (const name of PHOTO_NAMES) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", name))) {
      return `/images/${name}`;
    }
  }
  return null;
}

export default function OfficeHero() {
  const photo = findPhoto();

  if (!photo) {
    return (
      <div className="relative mx-auto w-full max-w-xl">
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-coral/25 via-violet/20 to-teal/25 blur-2xl"
        />
        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-violet/20">
          <OfficeScene />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-coral/25 via-violet/20 to-teal/25 blur-2xl"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-2xl shadow-violet/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt="The NISUV Marketing team at work in the office"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
          {[
            ["Web & product", "bg-teal", "#cat-web"],
            ["Marketing, ads & SEO", "bg-coral", "#cat-marketing"],
            ["AI, RAG & data", "bg-violet", "#cat-ai"],
          ].map(([label, dot, href]) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <span className={`h-2 w-2 rounded-full ${dot}`} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
