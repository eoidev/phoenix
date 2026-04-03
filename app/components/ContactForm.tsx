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
      <div className="border border-[#e5eaeb] p-8 text-center">
        <p className="text-lg font-light text-[#1a1a1a] mb-2">Message sent.</p>
        <p className="text-sm text-[#6b7280]">I&apos;ll be in touch within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xs text-[#6b7280] tracking-[0.3px] uppercase">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="w-full border border-[#e5eaeb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs text-[#6b7280] tracking-[0.3px] uppercase">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          className="w-full border border-[#e5eaeb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#1a1a1a] text-white text-sm py-3.5 hover:bg-[#333] transition-colors"
      >
        Send message
      </button>
    </form>
  );
}
