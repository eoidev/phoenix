"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type ApproachItem = {
  _key: string;
  title: string;
  body: string;
  detail?: string;
  imageUrl?: string;
  images?: string[];
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
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white w-full max-w-[960px] max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-2 items-end shadow-[0px_24px_48px_0px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="shrink-0 size-8 flex items-center justify-center text-[#1a1a1a] hover:opacity-60 transition-opacity"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M1 1L23 23M23 1L1 23" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="w-full p-4 flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:justify-between gap-8">
                <div className="flex flex-col gap-4 md:w-[420px]">
                  <h2 className="text-3xl font-light leading-9 text-[#1a1a1a]">{active.title}</h2>
                  <p className="text-base font-normal leading-[26px] text-[#6b7280]">{active.body}</p>
                </div>
                <div className="md:w-[420px]">
                  <p className="text-base font-normal leading-[26px] text-[#1a1a1a]">{active.detail}</p>
                </div>
              </div>

              {(active.images && active.images.length > 0) ? (
                <div className="flex gap-4 justify-center">
                  {active.images.map((url, i) => (
                    <div key={i} className="relative w-[220px] h-[420px] overflow-hidden shrink-0 bg-[#f0ede8]">
                      <Image src={url} alt={`${active.title} screenshot ${i + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : active.imageUrl ? (
                <div className="w-full h-[280px] bg-[#f0ede8] overflow-hidden relative">
                  <Image src={active.imageUrl} alt={active.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-full h-[280px] bg-[#f0ede8] overflow-hidden flex items-center justify-center">
                  <span className="text-xs font-normal leading-4 tracking-[1.2px] text-[#1a1a1a]/20 uppercase select-none">
                    Artifact / Screenshot
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
