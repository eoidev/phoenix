"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";

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
  deepDive?: DeepDive;
};

// ─── Icons ───────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      className="shrink-0 mt-[5px]"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="#50617a" strokeWidth="1.25" />
      <path
        d="M5.3 8.1l1.9 1.9 3.5-3.9"
        stroke="#50617a"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Three line icons for the highlight row
const HIGHLIGHT_ICONS = [
  // mapped journeys — branching path
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="5" cy="19" r="2.2" stroke="#1a1a1a" strokeWidth="1.4" />
    <circle cx="19" cy="5" r="2.2" stroke="#1a1a1a" strokeWidth="1.4" />
    <circle cx="19" cy="19" r="2.2" stroke="#1a1a1a" strokeWidth="1.4" />
    <path d="M5 16.8V9a2 2 0 0 1 2-2h8.8M16.8 5H16a2 2 0 0 0-2 2v9.8" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  // stress-tested — shield check
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l7 2.5V11c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V5.5L12 3z" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4.5" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // steps cut — layers trimmed
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3.5l8 4-8 4-8-4 8-4z" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M4.2 12l7.8 4 7.8-4" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
              <p className="text-base text-[#6b7280] leading-[26px] max-w-md">
                {item.body}
              </p>
              <ul className="flex flex-col gap-2">
                {dd.goals.map((g) => (
                  <li key={g} className="flex gap-2 items-start">
                    <CheckIcon />
                    <span className="text-base text-[#50617a] leading-[26px]">{g}</span>
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
                width={359}
                height={592}
                className="h-full w-auto max-h-[460px] object-contain drop-shadow-[0_25px_40px_rgba(50,50,93,0.12)]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-[#fafaf9] rounded-md flex flex-col items-center justify-center flex-1 py-10 px-6 text-center">
                <span className="text-7xl font-extralight tracking-[-0.06em] text-[#1a1a1a] leading-none">
                  {dd.stat.value}
                </span>
                <span className="mt-3 text-base text-[#1a2c44]">{dd.stat.label}</span>
              </div>
              <div className="bg-[#fafaf9] rounded-md flex items-center justify-center flex-1 p-6">
                <Image
                  src={dd.statImage}
                  alt={`${item.title} — gathering progress`}
                  width={356}
                  height={92}
                  className="w-full h-auto max-w-[380px]"
                />
              </div>
            </div>
          </div>

          {/* ── Highlights ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {dd.highlights.map((h, i) => (
              <div key={h} className="flex flex-col gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded">
                  {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                </div>
                <p className="text-base text-[#6b7280] leading-[26px]">{h}</p>
              </div>
            ))}
          </div>

          {/* ── The flow ── */}
          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-medium text-[#1a1a1a]">The flow</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {dd.flow.map((f) => (
                <div key={f.title} className="flex flex-col gap-4">
                  <div className="bg-[#f8fafd] border border-[#f1f5f9] rounded-md flex items-center justify-center px-6 py-7 overflow-hidden">
                    <Image
                      src={f.image}
                      alt={`${f.title} screen`}
                      width={336}
                      height={594}
                      className="w-full h-auto max-w-[240px] drop-shadow-[0_25px_30px_rgba(50,50,93,0.12)]"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#1a1a1a]">{f.title}</p>
                    <p className="mt-1 text-base text-[#6b7280] leading-[26px]">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Quote ── */}
          <div className="border-t border-[#e5edf5] pt-12">
            <figure className="flex flex-col items-center gap-8 text-center">
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light text-[#64748d] leading-snug max-w-3xl">
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

// ─── Cards grid ──────────────────────────────────────────────────────────────

export default function ApproachDeepDive({ items }: { items: ApproachItem[] }) {
  const [active, setActive] = useState<ApproachItem | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => {
          const expandable = !!item.deepDive;
          const CardInner = (
            <div
              className={`relative bg-[#fafaf9] border border-[#e5eaeb] p-7 h-full flex flex-col gap-4 ${
                expandable
                  ? "cursor-pointer group hover:border-[#1a1a1a]/25 transition-colors"
                  : ""
              }`}
              onClick={expandable ? () => setActive(item) : undefined}
              role={expandable ? "button" : undefined}
              tabIndex={expandable ? 0 : undefined}
              onKeyDown={
                expandable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive(item);
                      }
                    }
                  : undefined
              }
            >
              <span className="text-xs text-[#6b7280] font-mono tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-[#1a1a1a]">{item.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">{item.body}</p>

              {expandable && (
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-[#1a1a1a] opacity-60 group-hover:opacity-100 transition-opacity">
                  Deep dive
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M8.5 1H13M13 1V5.5M13 1L7.5 6.5M5.5 13H1M1 13V8.5M1 13L6.5 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
          );

          return (
            <FadeUp key={item._key} delay={i * 70}>
              {CardInner}
            </FadeUp>
          );
        })}
      </div>

      {active && active.deepDive && <DeepDiveModal item={active} onClose={close} />}
    </>
  );
}
