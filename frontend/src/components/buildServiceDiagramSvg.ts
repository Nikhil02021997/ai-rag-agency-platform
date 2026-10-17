import { GLYPHS } from "./serviceGlyphs";

/**
 * Generic builder for the per-service layered isometric diagrams. Same visual language as the
 * About-page diagram (buildDiagramSvg.js): slabs that rise in, icon tiles that drop onto them,
 * dashed rails with travelling packets, a data source feeding the base and output chips on top.
 * Pure function (no DOM), so server and client render identical markup.
 */
export type DiagramTile = { n: string; g: string };
export type DiagramLayer = {
  title: string;
  sub: string;
  color: string;
  detail?: "grid" | "lines" | "rings";
  tiles: DiagramTile[]; // 2–4 tiles
};
export type DiagramConfig = {
  /** "up": data enters at the bottom and answers rise (default). "down": data enters at the top and flows down. */
  flow?: "up" | "down";
  /** Layers listed from TOP to BOTTOM as drawn (2 or 3). For flow "down" the top layer is the input. */
  layers: DiagramLayer[];
  /** Label above the data cylinders on the left of the base layer. */
  source: string;
  /** Pill shown at the very top. */
  headline: string;
  /** Output chips under the headline (up to 4). */
  outputs: string[];
};

export const DIAGRAM_COLORS = {
  violet: "#8b5cf6",
  sky: "#0ea5e9",
  pink: "#ec4899",
  amber: "#f59e0b",
  green: "#22c55e",
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const TILE_SLOTS: Record<number, { dx: number; dy: number }[]> = {
  2: [{ dx: -44, dy: 4 }, { dx: 44, dy: 4 }],
  3: [{ dx: -62, dy: 10 }, { dx: 0, dy: -4 }, { dx: 62, dy: 10 }],
  4: [{ dx: -69, dy: 10 }, { dx: -23, dy: -2 }, { dx: 23, dy: -2 }, { dx: 69, dy: 10 }],
};

export function buildServiceDiagramSvg(cfg: DiagramConfig): { markup: string; height: number; down: boolean } {
  const cx = 240, hw = 110, hh = 55, T = 14;
  type Pt = [number, number];
  const P = (cy: number, u: number, v: number): Pt => [cx - hw + hw * (u + v), cy + hh * (v - u)];
  const pt = (a: Pt) => a[0].toFixed(1) + "," + a[1].toFixed(1);
  const poly = (a: Pt[], at: string) => `<polygon points="${a.map(pt).join(" ")}" ${at}/>`;
  const ln = (a: Pt, b: Pt, at: string) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" ${at}/>`;
  const soft = 'stroke="currentColor" stroke-opacity=".2"';

  const gridD = (cy: number) => {
    let o = "";
    for (let k = 1; k < 8; k++) { const t = k / 8; o += ln(P(cy, t, 0), P(cy, t, 1), soft) + ln(P(cy, 0, t), P(cy, 1, t), soft); }
    return o;
  };
  const linesD = (cy: number) => {
    let o = "";
    for (let k = 1; k < 10; k++) o += ln(P(cy, k / 10, 0), P(cy, k / 10, 1), soft);
    return o + poly([P(cy, .04, .04), P(cy, .2, .04), P(cy, .04, .2)], 'fill="none" stroke="currentColor" stroke-opacity=".6"');
  };
  const ringsD = (cy: number) => {
    let o = "";
    [.35, .65, .9].forEach((s) => {
      o += poly([[cx, cy - hh * s], [cx + hw * s, cy], [cx, cy + hh * s], [cx - hw * s, cy]], 'fill="none" stroke="currentColor" stroke-opacity=".38"');
    });
    return o;
  };
  const DETAIL = { grid: gridD, lines: linesD, rings: ringsD };

  const slab = (cy: number, color: string, det: (cy: number) => string) => {
    const N: Pt = [cx, cy - hh], E: Pt = [cx + hw, cy], S: Pt = [cx, cy + hh], W: Pt = [cx - hw, cy];
    const sh = (a: Pt): Pt => [a[0], a[1] + T];
    return `<g style="color:${color}">` +
      poly([W, S, sh(S), sh(W)], 'fill="currentColor" fill-opacity=".42"') +
      poly([E, S, sh(S), sh(E)], 'fill="currentColor" fill-opacity=".16"') +
      poly([N, E, S, W], 'fill="currentColor" fill-opacity=".2" stroke="currentColor" stroke-opacity=".95" stroke-width="1.4" stroke-linejoin="round"') +
      det(cy) + "</g>";
  };

  type L = DiagramLayer & { cy: number; d: number; c: string; det: (cy: number) => string };
  const n = cfg.layers.length;
  const down = cfg.flow === "down";
  const STEP = 170, TOP = down ? 116 : 150;
  const defaultDetail: ("rings" | "lines" | "grid")[] = down
    ? (n === 3 ? ["grid", "lines", "rings"] : ["grid", "rings"])
    : (n === 3 ? ["rings", "lines", "grid"] : ["rings", "grid"]);
  // index 0 = top as drawn. Delays start at the INPUT layer (bottom for "up", top for "down").
  const layers: L[] = cfg.layers.map((l, i) => {
    const order = down ? i : n - 1 - i; // 0 = input
    const role = order === 0 ? "s1" : order === n - 1 ? "s3" : "s2";
    return {
      ...l,
      cy: TOP + i * STEP,
      d: +(0.2 + order * 0.35).toFixed(2),
      c: role,
      det: DETAIL[l.detail ?? defaultDetail[i]],
    };
  });
  const bottom = layers[n - 1];
  const topL = layers[0];
  const input = down ? topL : bottom;
  const height = down ? bottom.cy + 176 : bottom.cy + 112;

  const tile = (L: L, t: DiagramTile, i: number, slots: { dx: number; dy: number }[]) => {
    const ax = cx + slots[i].dx, ay = L.cy + slots[i].dy, ty = ay - 32, c = L.color;
    const glyph = GLYPHS[t.g] ?? GLYPHS.check;
    return `<g class="fade" style="--d:${(L.d + .5 + i * .1).toFixed(2)}s;color:${c}"><ellipse cx="${ax}" cy="${ay}" rx="13" ry="5" fill="#000" fill-opacity=".35"/>` +
      `<ellipse cx="${ax}" cy="${ay}" rx="4" ry="1.8" fill="currentColor"/>` + ln([ax, ty + 16], [ax, ay], 'stroke="currentColor" stroke-opacity=".7"') +
      `<text class="tl" x="${ax}" y="${ay + 19}">${esc(t.n)}</text></g>` +
      `<g class="drop" style="--d:${(L.d + .9 + i * .12).toFixed(2)}s"><g class="bob" style="--b:${(2 + i * .4).toFixed(1)}s"><g transform="translate(${ax} ${ty})">` +
      `<rect x="-17" y="-16" width="34" height="32" rx="9" class="tb"/><rect x="-17" y="-16" width="34" height="32" rx="9" fill="${c}" fill-opacity=".28" stroke="${c}" stroke-width="1.3"/>` +
      `<g class="gly">${glyph}</g></g></g></g>`;
  };
  const chain = (L: L, slots: { dx: number; dy: number }[]) => {
    const p = L.tiles.map((_, i) => `${cx + slots[i].dx},${L.cy + slots[i].dy}`).join(" ");
    return `<polyline class="flow fade" style="--d:${(L.d + .8).toFixed(2)}s;color:${L.color}" points="${p}" stroke="${L.color}" stroke-width="1.5"/>`;
  };
  const title = (L: L) => {
    const x = cx + hw + 34;
    return `<g class="fade" style="--d:${(L.d + .4).toFixed(2)}s;color:${L.color}">` + ln([cx + hw + 4, L.cy], [cx + hw + 26, L.cy], 'stroke="currentColor" stroke-opacity=".7"') +
      `<text class="lbl-t" x="${x}" y="${L.cy - 1}">${esc(L.title)}</text><text class="lbl-s" x="${x}" y="${L.cy + 17}">${esc(L.sub)}</text></g>`;
  };
  const packet = (path: string, begin: string, dur: number) =>
    `<g opacity="0"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" path="${path}"/>` +
    `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.85;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>` +
    `<rect x="-3" y="-3" width="6" height="6" transform="rotate(45)" class="pk"/></g>`;
  const cyl = (x: number, y: number, c: string) =>
    `<g style="color:${c}"><path d="M${x - 11} ${y}v14c0 3 5 5 11 5s11-2 11-5V${y}" fill="currentColor" fill-opacity=".3" stroke="currentColor" stroke-width="1.3"/><ellipse cx="${x}" cy="${y}" rx="11" ry="5" fill="currentColor" fill-opacity=".45" stroke="currentColor" stroke-width="1.3"/></g>`;

  let o = '<defs><radialGradient id="floor-s"><stop offset="0" stop-color="#7a4dff" stop-opacity=".55"/><stop offset="1" stop-color="#7a4dff" stop-opacity="0"/></radialGradient></defs>' +
    `<ellipse class="halo" cx="${cx}" cy="${(down ? topL.cy + 8 : bottom.cy + 78)}" rx="210" ry="40" fill="url(#floor-s)"/>`;

  // vertical rails behind the layers, with travelling packets
  [-36, 0, 36].forEach((dx, r) => {
    const x = cx + dx;
    const y1 = down ? topL.cy - 40 : bottom.cy - 4, y2 = down ? bottom.cy + 48 : topL.cy - 58, p = `M${x} ${y1} L${x} ${y2}`;
    o += `<line class="rail" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="#a78bfa" stroke-opacity=".55" stroke-width="1.4"/>`;
    [0, 1].forEach((k) => { o += packet(p, (2.2 + r * .8 + k * 2.3).toFixed(1), 4.6); });
  });

  // data sources feeding the base
  const by = input.cy;
  const src: Pt[] = [[40, by - 50], [40, by], [40, by + 50]];
  o += `<g class="sp ${input.c}"><g class="fade" style="--d:.2s"><text class="lbl-s" x="12" y="${src[0][1] - 26}">${esc(cfg.source)}</text>`;
  src.forEach((s, i) => {
    const ty = by + (s[1] - by) * .3, d = `M${s[0] + 14} ${s[1] + 6} C100 ${s[1] + 6} 118 ${ty} 172 ${ty}`;
    o += cyl(s[0], s[1], input.color) + `<path class="flow" d="${d}" stroke="${input.color}" stroke-width="1.5"/>` + packet(d, (1.6 + i * .7).toFixed(1), 3.2);
  });
  o += "</g></g>";

  // layers, bottom first so upper slabs overlap correctly
  [...layers].reverse().forEach((L) => {
    const slots = TILE_SLOTS[L.tiles.length] ?? TILE_SLOTS[2];
    o += `<g class="sp ${L.c}"><g class="rise" style="--d:${L.d}s">${slab(L.cy, L.color, L.det)}${chain(L, slots)}${title(L)}${L.tiles.map((t, i) => tile(L, t, i, slots)).join("")}</g></g>`;
  });

  // headline pill + output chips (top for "up", bottom for "down")
  const hw2 = Math.max(120, cfg.headline.length * 7 + 44);
  const hy = down ? bottom.cy + 128 : 14;
  const oy = down ? bottom.cy + 90 : 54;
  o += `<g class="sp sc"><g class="drop" style="--d:2.2s"><g class="bob" style="--b:2.4s"><g class="chip"><rect x="${cx - hw2 / 2}" y="${hy}" width="${hw2}" height="28" rx="14"/>` +
    `<circle cx="${cx - hw2 / 2 + 16}" cy="${hy + 14}" r="4" fill="#ec4899"/><text x="${cx - hw2 / 2 + 27}" y="${hy + 18.5}">${esc(cfg.headline)}</text></g></g></g>`;
  const widths = cfg.outputs.map((t) => Math.max(60, t.length * 7 + 38));
  const total = widths.reduce((a, b) => a + b, 0) + (widths.length - 1) * 8;
  let ox = cx - total / 2;
  cfg.outputs.forEach((t, i) => {
    const tri = down
      ? `<polygon points="${ox + 10},${oy + 10} ${ox + 15},${oy + 18} ${ox + 20},${oy + 10}" fill="#22c55e"/>`
      : `<polygon points="${ox + 10},${oy + 17} ${ox + 15},${oy + 9} ${ox + 20},${oy + 17}" fill="#22c55e"/>`;
    o += `<g class="drop" style="--d:${(2.4 + i * .12).toFixed(2)}s"><g class="bob" style="--b:${(2.8 + i * .3).toFixed(1)}s"><g class="chip"><rect x="${ox}" y="${oy}" width="${widths[i]}" height="26" rx="13"/>` +
      `${tri}<text x="${ox + 26}" y="${oy + 17.5}">${esc(t)}</text></g></g></g>`;
    ox += widths[i] + 8;
  });
  o += "</g>";

  return { markup: o, height, down };
}
