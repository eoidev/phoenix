import { getSettings } from "../../sanity/queries";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const s = await getSettings().catch(() => null);

  const email = s?.email ?? "hello@janedoe.com";
  const linkedin = s?.linkedin ?? "https://linkedin.com";
  const dribbble = s?.dribbble ?? "https://dribbble.com";

  const linkedinHandle = linkedin.replace(/\/$/, "").split("/").pop() ?? "janedoe";
  const dribbbleHandle = dribbble.replace(/\/$/, "").split("/").pop() ?? "janedoe";

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
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">Email</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              {email}
            </a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">LinkedIn</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              /in/{linkedinHandle}
            </a>
            <a href={dribbble} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#1a1a1a] hover:text-[#6b7280] transition-colors group">
              <span className="text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">Dribbble</span>
              <span className="h-px flex-1 bg-[#e5e7eb]" />
              @{dribbbleHandle}
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
