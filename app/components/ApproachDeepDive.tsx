"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type ApproachItem = {
  _key: string;
  title: string;
  body: string;
  detail?: string;
  imageUrl?: string;
};

function TiltCard({
  item,
  index,
  onExpand,
}: {
  item: ApproachItem;
  index: number;
  onExpand: (item: ApproachItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      const glow = glowRef.current;
      if (!card || !glow) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y - rect.height / 2) / rect.height) * -10;
      const rotateY = ((x - rect.width / 2) / rect.width) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.55) 0%, transparent 70%)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    glow.style.background = "transparent";
  }, []);

  return (
    <div style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        className="relative bg-[#fafaf9] p-7 h-full flex flex-col gap-4 group cursor-pointer overflow-hidden"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out", willChange: "transform" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => item.detail && onExpand(item)}
      >
        {/* Glow layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-all duration-100"
          style={{ background: "transparent" }}
        />

        <span className="relative text-xs text-[#6b7280] font-mono tracking-wider">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="relative text-base font-medium text-[#1a1a1a]">{item.title}</h3>
        <p className="relative text-sm text-[#6b7280] leading-relaxed">{item.body}</p>

        {item.detail && (
          <button
            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            aria-label="Expand"
            onClick={(e) => { e.stopPropagation(); onExpand(item); }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 1H13M13 1V5.5M13 1L7.5 6.5M5.5 13H1M1 13V8.5M1 13L6.5 7.5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ApproachDeepDive({ items }: { items: ApproachItem[] }) {
  const [active, setActive] = useState<ApproachItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <TiltCard key={item._key} item={item} index={i} onExpand={setActive} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 w-9 h-9 bg-[#f3f4f6] rounded-lg flex items-center justify-center text-[#1a1a1a] hover:bg-[#e5e7eb] transition-colors z-10"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-10 flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-semibold text-[#1a1a1a]">{active.title}</h2>
                  <p className="text-[#6b7280] leading-relaxed">{active.body}</p>
                </div>
                <div>
                  <p className="text-[#1a1a1a] leading-relaxed">{active.detail}</p>
                </div>
              </div>

              <div className="w-full aspect-[16/9] bg-[#f0ede8] rounded-xl overflow-hidden flex items-center justify-center relative">
                {active.imageUrl ? (
                  <Image src={active.imageUrl} alt={active.title} fill className="object-cover" />
                ) : (
                  <span className="text-xs text-[#1a1a1a]/20 tracking-widest uppercase select-none">
                    Artifact / Screenshot
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
