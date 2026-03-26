import { getSettings } from "../../sanity/queries";

export default async function Hero() {
  const s = await getSettings().catch(() => null);

  const role = s?.role ?? "Product Designer";
  const availability = s?.availability ?? "Available for work";
  const tagline = s?.tagline ?? "I help companies craft digital products people actually enjoy using — through research, thoughtful design, and obsessive attention to detail.";

  return (
    <section className="min-h-screen flex flex-col justify-end pb-24 px-6 max-w-6xl mx-auto w-full">
      <div className="max-w-3xl">
        <p className="text-sm text-[#6b7280] tracking-widest uppercase mb-6">
          {role} — {availability}
        </p>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-light leading-[1.05] tracking-tight text-[#1a1a1a] mb-8">
          Designing
          <br />
          <em className="not-italic font-extralight text-[#6b7280]">meaningful</em>
          <br />
          experiences
        </h1>
        <p className="text-lg text-[#6b7280] max-w-md leading-relaxed mb-10">
          {tagline}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm px-6 py-3 hover:bg-[#333] transition-colors"
          >
            View work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H13M7 1L13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="text-sm text-[#6b7280] hover:text-[#1a1a1a] transition-colors underline underline-offset-4"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
