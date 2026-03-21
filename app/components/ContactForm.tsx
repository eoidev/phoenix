"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-[#e5e7eb] p-8 text-center">
        <p className="text-lg font-light text-[#1a1a1a] mb-2">Message sent.</p>
        <p className="text-sm text-[#6b7280]">I&apos;ll be in touch within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">Name</label>
        <input id="name" name="name" type="text" required className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">Email</label>
        <input id="email" name="email" type="email" required className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors" placeholder="your@email.com" />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">Message</label>
        <textarea id="message" name="message" required rows={5} className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none" placeholder="Tell me about your project..." />
      </div>
      <button type="submit" className="w-full bg-[#1a1a1a] text-white text-sm py-3.5 hover:bg-[#333] transition-colors">
        Send message
      </button>
    </form>
  );
}
