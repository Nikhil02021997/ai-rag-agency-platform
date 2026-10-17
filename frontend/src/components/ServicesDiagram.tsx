"use client";

import { useEffect, useRef } from "react";
import { buildDiagramSvg } from "./buildDiagramSvg";
import "./services-diagram.css";

/**
 * About-page hero visual (right column): a layered diagram of all 8 services.
 *   Base:   AI, RAG & data        (AI & RAG systems, Data & analytics)
 *   Middle: Web & product         (Website Creation & Maintenance, Web & product development)
 *   Top:    Marketing & growth    (Digital marketing & growth, Google & Meta Ads, SEO, Influencer Marketing)
 * Colours and fonts come from the site theme, so light and dark mode work automatically.
 */
const SVG_MARKUP = buildDiagramSvg();

export default function ServicesDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Respect reduced-motion for the SVG packet animations (CSS handles the rest).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svgRef.current?.querySelectorAll("animateMotion, animate").forEach((n) => n.remove());
    }
  }, []);

  return (
    <div className="nsd play w-full">
      <div className="nsd-card" tabIndex={0}>
        <div className="nsd-art">
          <svg
            ref={svgRef}
            viewBox="0 0 580 600"
            role="img"
            aria-label="System diagram. Your data flows into a base layer of AI, RAG and data. It feeds a Web and product layer (Sites, Dev), then a Marketing and growth layer (Growth, Ads, SEO, Creators), producing traffic, leads and ROAS."
            dangerouslySetInnerHTML={{ __html: SVG_MARKUP }}
          />
        </div>
      </div>
    </div>
  );
}
