"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with actual form submission logic
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-xs text-[#6b7280] tracking-widests uppercase mb-4">Contact</p>
          <h2 className="text-4xl font-light text-[#1a1a1a] leading-snug mb-6">
            Let&apos;s make something
            <br />
            <em className="not-italic text-[#6b7280]">worth using.</em>
          </h2>
          <p className="text-[#6b7280] leading-relaxed mb-10 max-w-sm">
            I&apos;m open to freelance projects, full-time roles, and long-term collaborations. Reach out and let&apos;s talk.
          </p>

          <div className="space-y-3">
            <a
              href="mailto:hello@janedoe.com"
              className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group"
            >
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">Email</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              hello@janedoe.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group"
            >
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">LinkedIn</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              /in/janedoe
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group"
            >
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">Dribbble</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              @janedoe
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div>
          {submitted ? (
            <div className="border border-[#e5e7eb] p-8 text-center">
              <p className="text-lg font-light text-[#1a1a1a] mb-2">Message sent.</p>
              <p className="text-sm text-[#6b7280]">I&apos;ll be in touch within 1–2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs text-[#6b7280] mb-2 tracking-wide uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border border-[#e5e7eb] bg-transparent px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] text-white text-sm py-3.5 hover:bg-[#333] transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
