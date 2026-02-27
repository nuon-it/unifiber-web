import { useState, useMemo, useRef, useEffect } from "react";
import svgRaw from "../../imports/id.svg?raw";

// Provinces with Unifiber coverage (spread across Indonesia)
const COVERED_PROVINCE_IDS = [
  "IDJK", // Jakarta
  "IDJB", // Jawa Barat
  "IDBT", // Banten
  "IDJT", // Jawa Tengah
  "IDJI", // Jawa Timur
  "IDBA", // Bali
  "IDSU", // Sumatera Utara
  "IDSN", // Sulawesi Selatan
  "IDKI", // Kalimantan Timur
  "IDYO", // Yogyakarta
];

// Coverage marker positions (approximate center of provinces in SVG viewBox 0-1000 x 0-368)
const coverageMarkers = [
  { id: "IDJK", name: "Jakarta", x: 282, y: 256, primary: true },
  { id: "IDJB", name: "Jawa Barat", x: 305, y: 275, primary: false },
  { id: "IDBT", name: "Banten", x: 262, y: 265, primary: false },
  { id: "IDJT", name: "Jawa Tengah", x: 365, y: 280, primary: false },
  { id: "IDJI", name: "Jawa Timur", x: 420, y: 285, primary: false },
  { id: "IDBA", name: "Bali", x: 450, y: 302, primary: false },
  { id: "IDSU", name: "Sumatera Utara", x: 135, y: 110, primary: false },
  { id: "IDSN", name: "Sulawesi Selatan", x: 560, y: 285, primary: false },
  { id: "IDKI", name: "Kalimantan Timur", x: 475, y: 140, primary: false },
  { id: "IDYO", name: "Yogyakarta", x: 348, y: 292, primary: false },
];

export function IndonesiaMap() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Process SVG to add custom styling and interactivity classes
  const processedSvg = useMemo(() => {
    let processed = svgRaw;

    // Remove XML declaration if present
    processed = processed.replace(/<\?xml[^?]*\?>\s*/g, "");
    // Remove comments
    processed = processed.replace(/<!--[\s\S]*?-->/g, "");

    // Replace the original fill and stroke attributes on the root SVG
    processed = processed.replace(
      /fill="[^"]*"/,
      'fill="#c8dce8"'
    );
    processed = processed.replace(
      /stroke="[^"]*"/,
      'stroke="#a8c4d8"'
    );
    processed = processed.replace(
      /stroke-width="[^"]*"/,
      'stroke-width="0.8"'
    );

    // Add cursor and transition via a style block
    const styleBlock = `<style>
      #features path {
        transition: fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease;
        cursor: pointer;
      }
      #features path:hover {
        filter: brightness(0.9);
      }
      ${COVERED_PROVINCE_IDS.map(
        (id) => `#${id}`
      ).join(", ")} {
        fill: #00b8ff !important;
        stroke: #0099dd !important;
      }
      ${COVERED_PROVINCE_IDS.map(
        (id) => `#${id}:hover`
      ).join(", ")} {
        fill: #0099dd !important;
        stroke: #0077aa !important;
        filter: drop-shadow(0 2px 8px rgba(0, 184, 255, 0.5)) !important;
      }
      #points { display: none; }
    </style>`;

    // Insert style block after the opening SVG tag
    processed = processed.replace(
      /(<svg[^>]*>)/,
      `$1${styleBlock}`
    );

    // Make SVG responsive
    processed = processed.replace(
      / width="[^"]*"/,
      ' width="100%"'
    );
    processed = processed.replace(
      / height="[^"]*"/,
      ' height="100%"'
    );

    // Fix viewBox attribute (lowercase 'b' in the source)
    processed = processed.replace(
      /viewbox=/i,
      "viewBox="
    );

    return processed;
  }, []);

  // Track SVG element for hover interactions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const svgEl = container.querySelector("svg");
    if (!svgEl) return;

    const handleMouseOver = (e: Event) => {
      const target = e.target as SVGElement;
      const pathEl = target.closest("path");
      if (pathEl) {
        const id = pathEl.getAttribute("id");
        if (id && COVERED_PROVINCE_IDS.includes(id)) {
          setHoveredProvince(id);
        }
      }
    };

    const handleMouseOut = () => {
      setHoveredProvince(null);
    };

    svgEl.addEventListener("mouseover", handleMouseOver);
    svgEl.addEventListener("mouseout", handleMouseOut);

    return () => {
      svgEl.removeEventListener("mouseover", handleMouseOver);
      svgEl.removeEventListener("mouseout", handleMouseOut);
    };
  }, [processedSvg]);

  const hoveredMarker = coverageMarkers.find(
    (m) => m.id === hoveredProvince
  );

  return (
    <div className="relative w-full">
      <div className="relative aspect-[1000/368] rounded-xl overflow-hidden border border-[#00b8ff]/10">
        {/* Ocean background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eaf4fb] via-[#e0eff8] to-[#d6eaf5]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(13, 40, 71, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(13, 40, 71, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Indonesia Map SVG (inline) */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full"
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />

        {/* Coverage markers overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 368"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowLarge">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Pulse rings for covered areas */}
          {coverageMarkers.map((marker) => (
            <g key={`pulse-${marker.id}`}>
              <circle
                cx={marker.x}
                cy={marker.y}
                r={marker.primary ? 12 : 8}
                fill="none"
                stroke="#00b8ff"
                strokeWidth="1"
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  from={marker.primary ? "6" : "4"}
                  to={marker.primary ? "18" : "14"}
                  dur="2.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* Marker dots */}
          {coverageMarkers.map((marker) => {
            const isHovered = hoveredProvince === marker.id;
            const r = marker.primary ? 5 : 3.5;
            return (
              <g key={`marker-${marker.id}`} filter={isHovered ? "url(#glowLarge)" : "url(#glow)"}>
                {/* Outer ring */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={isHovered ? r + 3 : r + 1.5}
                  fill="rgba(0, 184, 255, 0.2)"
                  stroke="#00b8ff"
                  strokeWidth="0.5"
                />
                {/* Inner dot */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r={r}
                  fill={isHovered ? "#00b8ff" : "#0d2847"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Labels */}
          {coverageMarkers.map((marker) => {
            const isHovered = hoveredProvince === marker.id;
            return (
              <g key={`label-${marker.id}`}>
                {/* Label background */}
                <rect
                  x={marker.x - (marker.name.length * 3.2)}
                  y={marker.y - (marker.primary ? 22 : 18)}
                  width={marker.name.length * 6.4}
                  height={12}
                  rx={3}
                  fill={isHovered ? "#0d2847" : "rgba(13, 40, 71, 0.8)"}
                />
                {/* Label text */}
                <text
                  x={marker.x}
                  y={marker.y - (marker.primary ? 13 : 9)}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={marker.primary ? "7" : "6"}
                  fontWeight={marker.primary ? "700" : "600"}
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.3"
                >
                  {marker.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hovered province tooltip */}
        {hoveredMarker && (
          <div
            className="absolute pointer-events-none z-40"
            style={{
              left: `${(hoveredMarker.x / 1000) * 100}%`,
              top: `${(hoveredMarker.y / 368) * 100 - 12}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-[#00b8ff]/30">
              <div className="text-[11px] font-bold text-[#0d2847]">
                {hoveredMarker.name}
              </div>
              <div className="text-[9px] text-[#00b8ff] font-semibold">
                ● Coverage Active
              </div>
              <div className="text-[9px] text-gray-500">FTTH Network Ready</div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2.5 md:p-3 shadow-lg border border-gray-200/60">
          <div className="text-[9px] font-bold text-[#0d2847] mb-1.5 uppercase tracking-wider">
            Legenda
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#00b8ff] rounded-sm border border-[#0099dd]" />
              <span className="text-[10px] md:text-xs text-gray-600">
                Provinsi Coverage
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#c8dce8] rounded-sm border border-[#a8c4d8]" />
              <span className="text-[10px] md:text-xs text-gray-600">
                Segera Hadir
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#0d2847] rounded-full border-2 border-white shadow-sm" />
              <span className="text-[10px] md:text-xs text-gray-600">
                Active Point
              </span>
            </div>
          </div>
          <div className="mt-2 pt-1.5 border-t border-gray-200 text-[9px] text-gray-400">
            10 Provinsi Aktif
          </div>
        </div>
      </div>
    </div>
  );
}