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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-6">About</p>
          <h2 className="text-4xl font-light text-[#1a1a1a] leading-snug mb-8">
            I design with people,
            <br />
            <em className="not-italic text-[#6b7280]">not just for them.</em>
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-relaxed">
            <p>
              I&apos;m a UI/UX designer with 6 years of experience working at the intersection of product strategy and visual design. I believe the best design is invisible — it just works.
            </p>
            <p>
              Previously at Google, I led design for a suite of developer tools used by over 3 million engineers. Now I work with startups and scale-ups to build products that delight users and drive business outcomes.
            </p>
            <p>
              When I&apos;m not designing, I&apos;m usually hiking somewhere with a camera, or obsessing over typography.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-4">Clients & Companies</p>
            <div className="flex flex-wrap gap-3">
              {clients.map((client: string) => (
                <span key={client} className="text-sm font-medium text-[#1a1a1a] border border-[#e5e7eb] px-4 py-2">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="w-full aspect-[3/4] bg-[#f0ede8] mb-10 relative overflow-hidden flex items-center justify-center">
            {s?.photoUrl ? (
              <Image src={s.photoUrl} alt={s.name ?? "Photo"} fill className="object-cover" />
            ) : (
              <span className="text-[#1a1a1a]/10 text-sm">Photo</span>
            )}
          </div>

          <div>
            <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-4">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <span key={skill} className="text-sm text-[#6b7280] border border-[#e5e7eb] px-3 py-1.5">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
