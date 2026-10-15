"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

export type DeepDiveFlow = {
  title: string;
  body: string;
  image: string;
};

export type DeepDive = {
  goals: string[];
  heroImage: string;
  stat: { value: string; label: string };
  statImage: string;
  highlights: string[];
  flow: DeepDiveFlow[];
  quote: { text: string; author: string; role: string };
};

export type ApproachItem = {
  _key: string;
  title: string;
  body: string;
  detail?: string;
  imageUrl?: string;
  images?: string[];
  deepDive?: DeepDive;
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function BulletIcon() {
  return (
    <svg
      className="shrink-0 mt-[5px]"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="#1a1a1a" />
      <circle cx="8" cy="8" r="0.89" stroke="#1a1a1a" />
    </svg>
  );
}

// Line icons for the highlight row (from Figma)
const ROUTE_PATH =
  "M19.905 8.84435V4.61839M19.905 4.61839V1H24.5V4.61839H19.905ZM8.20939 22.985H19.9614C22.4672 22.985 24.4986 20.9537 24.4986 18.4479C24.4986 15.942 22.4672 13.9107 19.9614 13.9107H13.1974C11.5921 13.9107 10.2908 12.6094 10.2908 11.0041C10.2908 9.39883 11.5921 8.09748 13.1974 8.09748H17.4154M4.35498 17.7868V16.2931M8.21113 17.0399C8.21113 14.9106 6.48493 13.1844 4.35559 13.1844C2.23168 13.1844 0.511508 14.8948 0.500057 17.0187C0.493783 18.1887 1.00869 19.2385 1.82616 19.9496C2.73106 20.7368 3.5778 21.5884 4.33468 22.5188L4.35554 22.5445L4.37665 22.5186C5.12551 21.598 5.95354 20.7443 6.85639 19.9742C7.68541 19.2671 8.21113 18.215 8.21113 17.0399Z";

const HIGHLIGHT_ICONS = [
  // mapped journeys — route with pin and flag
  <svg key="0" width="25" height="24" viewBox="0 0 25 24" fill="none" aria-hidden="true">
    <path d={ROUTE_PATH} stroke="#1a1a1a" strokeMiterlimit="10" />
  </svg>,
  // stress-tested — hand holding a rising chart
  <svg key="1" width="27" height="28" viewBox="0 0 27 28" fill="none" aria-hidden="true">
    <path
      d="M18.1136 20.6488L22.3713 16.3911C23.2147 15.5477 24.5822 15.5477 25.4256 16.3911L26.1891 17.1547L16.8198 26.524H7.78252L4.902 25.1291H0.5V19.3105H5.46481L9.83782 16.962L18.7462 18.0418M18.7462 18.0418V19.1216C18.7462 20.3144 17.7793 21.2813 16.5865 21.2813H12.4065M18.7462 18.0418V6.82065H15.2568V17.6188V9.11088H11.7673V17.1959L11.7673 11.4012H8.27784V17.7998M11.6937 0.5H15.2568V4.06308M15.2568 0.5L9.33073 6.42603"
      stroke="#1a1a1a"
      strokeMiterlimit="10"
    />
  </svg>,
  // steps cut — same route icon
  <svg key="2" width="25" height="24" viewBox="0 0 25 24" fill="none" aria-hidden="true">
    <path d={ROUTE_PATH} stroke="#1a1a1a" strokeMiterlimit="10" />
  </svg>,
];

// ─── Deep-dive modal ─────────────────────────────────────────────────────────

function DeepDiveModal({ item, onClose }: { item: ApproachItem; onClose: () => void }) {
  const dd = item.deepDive!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — deep dive`}
    >
      <div
        className="relative w-full max-w-5xl my-4 bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 sm:top-7 sm:right-7 z-10 w-9 h-9 flex items-center justify-center rounded-lg text-[#50617a] hover:bg-[#f1f5f9] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-6 py-10 sm:px-10 sm:py-14 lg:px-[72px] lg:py-[72px] flex flex-col gap-16 sm:gap-20">
          {/* ── Header: intro + goals ── */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-light text-[#1a1a1a] leading-9 max-w-xl">
              {item.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <p className="text-base font-normal text-[#6b7280] leading-[26px] max-w-md">
                {item.body}
              </p>
              <ul className="flex flex-col gap-2">
                {dd.goals.map((g) => (
                  <li key={g} className="flex gap-2 items-start">
                    <BulletIcon />
                    <span className="text-base font-normal text-[#50617a] leading-[26px]">{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Hero visual: phone + stat + card ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 md:h-[520px]">
            <div className="bg-[#fafaf9] rounded-md flex items-center justify-center p-6 overflow-hidden min-h-[360px]">
              <Image
                src={dd.heroImage}
                alt={`${item.title} — core flow`}
                width={532}
                height={1086}
                className="h-full w-auto max-h-[460px] object-contain drop-shadow-[0_25px_40px_rgba(50,50,93,0.12)]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#fafaf9] rounded-md flex flex-col items-center justify-center flex-1 py-10 px-6 text-center">
                <span className="text-[64px] md:text-[96px] font-extralight tracking-[-2.4px] text-[#1a1a1a] leading-[1.05]">
                  {dd.stat.value}
                </span>
                <span className="mt-3 text-base font-normal leading-[26px] text-[#1a2c44]">{dd.stat.label}</span>
              </div>
              <div className="bg-[#fafaf9] rounded-md flex items-center justify-center flex-1 p-6">
                <Image
                  src={dd.statImage}
                  alt={`${item.title} — gathering progress`}
                  width={712}
                  height={184}
                  className="w-full h-auto max-w-[380px]"
                />
              </div>
            </div>
          </div>

          {/* ── Highlights ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {dd.highlights.map((h, i) => (
              <div key={h} className="flex flex-col gap-4">
                <div className="flex items-end h-10">
                  {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                </div>
                <p className="text-base font-normal text-[#6b7280] leading-[26px]">{h}</p>
              </div>
            ))}
          </div>

          {/* ── The flow ── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-medium text-[#1a1a1a]">The flow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dd.flow.map((f) => (
                <div key={f.title} className="flex flex-col gap-4">
                  {/* Figma: 336×601 card, 266×543 phone inset 35/29px. Percentage padding
                      resolves against width, so the ratio holds at any size in every browser. */}
                  <div className="bg-[#fafaf9] px-[10.4%] py-[8.6%]">
                    <Image
                      src={f.image}
                      alt={`${f.title} screen`}
                      width={532}
                      height={1086}
                      className="block w-full h-auto"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#50617a]">{f.title}</p>
                    <p className="text-base font-normal text-[#50617a] leading-[26px]">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quote ── */}
          <div className="border-t border-[#e5edf5] pt-12">
            <figure className="flex flex-col items-center gap-8 text-center">
              <blockquote className="text-2xl sm:text-3xl md:text-[36px] md:leading-[49.5px] font-light text-[#64748d] leading-snug max-w-[844px]">
                {dd.quote.text}
              </blockquote>
              <figcaption className="text-lg font-medium text-[#061b31]">
                {dd.quote.author}
                <span className="text-[#50617a]">, {dd.quote.role}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tilt card (from main) ───────────────────────────────────────────────────

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
  const expandable = !!(item.deepDive || item.detail);

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
        onClick={() => expandable && onExpand(item)}
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

        {expandable && (
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

// ─── Detail modal (from main) — used by cards without a deep dive ────────────

function DetailModal({ item, onClose }: { item: ApproachItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[960px] max-h-[90vh] overflow-y-auto p-6 flex flex-col gap-2 items-end shadow-[0px_24px_48px_0px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="shrink-0 size-8 flex items-center justify-center text-[#1a1a1a] hover:opacity-60 transition-opacity"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M1 1L23 23M23 1L1 23" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <div className="w-full p-4 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="flex flex-col gap-4 md:w-[420px]">
              <h2 className="text-3xl font-light leading-9 text-[#1a1a1a]">{item.title}</h2>
              <p className="text-base font-normal leading-[26px] text-[#6b7280]">{item.body}</p>
            </div>
            <div className="md:w-[420px]">
              <p className="text-base font-normal leading-[26px] text-[#1a1a1a]">{item.detail}</p>
            </div>
          </div>

          {(item.images && item.images.length > 0) ? (
            <div className="flex gap-4 justify-center">
              {item.images.map((url, i) => (
                <div key={i} className="relative w-[220px] h-[420px] overflow-hidden shrink-0 bg-[#f0ede8]">
                  <Image src={url} alt={`${item.title} screenshot ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : item.imageUrl ? (
            <div className="w-full h-[280px] bg-[#f0ede8] overflow-hidden relative">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
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
  );
}

// ─── Cards grid ──────────────────────────────────────────────────────────────

export default function ApproachDeepDive({ items }: { items: ApproachItem[] }) {
  const [active, setActive] = useState<ApproachItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <TiltCard key={item._key} item={item} index={i} onExpand={setActive} />
        ))}
      </div>

      {active?.deepDive ? (
        <DeepDiveModal item={active} onClose={close} />
      ) : active ? (
        <DetailModal item={active} onClose={close} />
      ) : null}
    </>
  );
}
