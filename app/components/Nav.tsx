"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const workSection = document.getElementById("work");
      if (workSection) {
        setPastHero(window.scrollY >= workSection.offsetTop - 80);
      } else {
        setPastHero(window.scrollY > window.innerHeight - 80);
      }
    };
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
      pastHero ? "bg-white/80 border-b border-[#e5e7eb]" : "bg-transparent"
    }`}>
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="hover:opacity-60 transition-opacity">
          <Image
            src="/eoi-logo.svg"
            alt="EOI"
            width={48}
            height={30}
            className="transition-all duration-500"
            style={{ filter: pastHero ? "none" : "brightness(0) invert(1)" }}
          />
        </a>
        <ul className="flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm transition-colors duration-500 ${
                  pastHero
                    ? "text-[#1a1a1a] hover:text-[#6b7280]"
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
