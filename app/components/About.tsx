import Image from "next/image";
import { getSettings } from "../../sanity/queries";

const fallbackSkills = [
  "User Research", "Information Architecture", "Interaction Design",
  "Visual Design", "Prototyping", "Usability Testing",
  "Design Systems", "Figma", "UX Writing", "Motion Design",
];
const fallbackClients = ["Stripe", "Linear", "Notion", "Vercel", "Loom"];

export default async function About() {
  const s = await getSettings().catch(() => null);

  const skills = s?.skills?.length ? s.skills : fallbackSkills;
  const clients = s?.clients?.length ? s.clients : fallbackClients;

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto w-full">
      {/* 2-col, 4-row grid */}
      <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:grid-rows-[repeat(4,fit-content(100%))] md:gap-[35px]">

        {/* Row 1 — label, col 1 only */}
        <p className="md:col-start-1 md:row-start-1 text-xs text-[#6b7280] tracking-widest uppercase">
          About
        </p>

        {/* Row 2 — heading, col 1 only */}
        <h2 className="md:col-start-1 md:row-start-2 text-4xl font-light text-[#1a1a1a] leading-snug">
          I design with people,
          <br />
          <em className="not-italic text-[#6b7280]">not just for them.</em>
        </h2>

        {/* Row 3 — photo (col 1) + bio (col 2) */}
        <div className="md:col-start-1 md:row-start-3 flex md:justify-end">
          <div className="w-[200px] h-[268px] relative overflow-hidden bg-[#f0ede8] flex items-center justify-center">
            {s?.photoUrl ? (
              <Image src={s.photoUrl} alt={s.name ?? "Photo"} fill className="object-cover" />
            ) : (
              <span className="text-[#1a1a1a]/10 text-sm">Photo</span>
            )}

          </div>
        </div>

        <div className="md:col-start-2 md:row-start-3 space-y-4 text-[#1a1a1a] leading-relaxed md:pr-16">
          {s?.bio?.length ? (
            s.bio.map((block: { _key: string; children?: { text: string }[] }) => (
              <p key={block._key}>
                {block.children?.map((c) => c.text).join("") ?? ""}
              </p>
            ))
          ) : (
            <>
              <p>My name is Igor Slovák.</p>
              <p>I&apos;m a freelance graphic designer with focus on branding and interactive design.</p>
              <p>I help startups to growth and established companies to redefine their brands and to launch their products.</p>
            </>
          )}
        </div>

        {/* Row 4 — skills, col 2 only */}
        <div className="md:col-start-2 md:row-start-4">
          <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-4">Skills</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: string) => (
              <span key={skill} className="text-sm text-[#6b7280] border border-[#e5eaeb] px-3 py-1.5">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Clients — below grid, full width */}
      <div className="mt-16">
        <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-4">Clients & Companies</p>
        <div className="flex flex-wrap gap-3">
          {clients.map((client: string) => (
            <span key={client} className="text-sm font-medium text-[#1a1a1a] border border-[#e5eaeb] px-4 py-2">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
