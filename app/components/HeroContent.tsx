"use client";

import { useEffect, useRef } from "react";

export default function HeroContent({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NAV_HEIGHT = 80;

    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const contentTop = rect.top;

      // Start blurring when content hits nav, fully gone when content is above viewport
      const fadeStart = NAV_HEIGHT;           // start when touching nav
      const fadeEnd = -rect.height * 0.8;    // fully faded when most content is above screen

      if (contentTop > fadeStart) {
        ref.current.style.filter = "blur(0px)";
        ref.current.style.opacity = "1";
        ref.current.style.transform = "scale(1) translateY(0px)";
      } else {
        const progress = Math.min((fadeStart - contentTop) / (fadeStart - fadeEnd), 1);
        const scale = 1 - progress * 0.04;
        const translateY = progress * -8;
        ref.current.style.filter = `blur(${progress * 10}px)`;
        ref.current.style.opacity = String(1 - progress);
        ref.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full will-change-[filter,opacity,transform]" style={{ transformOrigin: "center bottom" }}>
      {children}
    </div>
  );
}
