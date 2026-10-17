"use client";

import { useEffect, useMemo, useRef } from "react";
import { buildServiceDiagramSvg, type DiagramConfig } from "./buildServiceDiagramSvg";
import "./services-diagram.css";

/** Per-service layered isometric diagram — same look and animation as the About-page diagram. */
export default function ServiceDiagram({ config, label }: { config: DiagramConfig; label: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { markup, height, down } = useMemo(() => buildServiceDiagramSvg(config), [config]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svgRef.current?.querySelectorAll("animateMotion, animate").forEach((n) => n.remove());
    }
  }, []);

  return (
    <div className={`nsd play w-full${down ? " down" : ""}`}>
      <div className="nsd-card" tabIndex={0}>
        <div className="nsd-art">
          <svg
            ref={svgRef}
            viewBox={`0 0 580 ${height}`}
            role="img"
            aria-label={label}
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        </div>
      </div>
    </div>
  );
}
