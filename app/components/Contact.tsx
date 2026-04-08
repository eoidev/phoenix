import { getSettings } from "../../sanity/queries";
import ContactForm from "./ContactForm";
import FadeUp from "./FadeUp";

export default async function Contact() {
  const s = await getSettings().catch(() => null);

  const email = s?.email ?? "hello@janedoe.com";
  const linkedin = s?.linkedin ?? "https://linkedin.com";
  const dribbble = s?.dribbble ?? "https://dribbble.com";

  const linkedinHandle = linkedin.replace(/\/$/, "").split("/").pop() ?? "janedoe";
  const dribbbleHandle = dribbble.replace(/\/$/, "").split("/").pop() ?? "janedoe";

  return (
    <section id="contact" className="py-32 px-6 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">

        {/* Left — heading + description (spans both rows on desktop) */}
        <FadeUp className="md:row-span-2 self-start">
          <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-5">Contact</p>
          <h2 className="text-4xl font-light text-[#1a1a1a] leading-snug mb-6">
            Let&apos;s make something
            <br />
            <em className="not-italic text-[#6b7280]">worth using.</em>
          </h2>
          <p className="text-[#6b7280] leading-relaxed max-w-sm">
            I&apos;m currently in a full-time role and not actively looking for freelance or new opportunities — but interesting conversations are always welcome. Feel free to reach out.
          </p>
        </FadeUp>

        {/* Right top — links */}
        <FadeUp delay={100} className="self-end">
          <div className="flex flex-col gap-3">
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors shrink-0">Email</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              <span>{email}</span>
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors shrink-0">LinkedIn</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              <span>/in/{linkedinHandle}</span>
            </a>
            <a href={dribbble} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors shrink-0">Dribbble</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              <span>@{dribbbleHandle}</span>
            </a>
          </div>
        </FadeUp>

        {/* Right bottom — form */}
        <FadeUp delay={200}>
          <ContactForm />
        </FadeUp>

      </div>
    </section>
  );
}
