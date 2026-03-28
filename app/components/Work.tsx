import Image from "next/image";
import { getProjects } from "../../sanity/queries";
import FadeUp from "./FadeUp";

const fallbackBg = ["#f5f5f7", "#f5f5f7", "#f5f5f7", "#f5f5f7"];

const fallbackProjects = [
  {
    _id: "1",
    title: "Fintech Dashboard",
    category: "Product Design · 2024",
    description: "Redesigned the core analytics dashboard for a B2B fintech platform, reducing task completion time by 38%.",
    tags: ["Figma", "User Research", "Prototyping"],
    imageUrl: null,
  },
  {
    _id: "2",
    title: "Health & Wellness App",
    category: "Mobile Design · 2024",
    description: "End-to-end design of an iOS app helping users track mental health habits with gentle nudges and data visualizations.",
    tags: ["iOS", "Design System", "Motion"],
    imageUrl: null,
  },
  {
    _id: "3",
    title: "E-commerce Rebrand",
    category: "Brand & UX · 2023",
    description: "Complete visual and interaction redesign of a DTC fashion brand's web store, resulting in a 22% lift in conversion.",
    tags: ["Brand", "UX Writing", "A/B Testing"],
    imageUrl: null,
  },
  {
    _id: "4",
    title: "Design System",
    category: "Systems Design · 2023",
    description: "Built a company-wide design system from scratch — tokens, components, documentation — adopted by 4 product teams.",
    tags: ["Tokens", "Storybook", "Documentation"],
    imageUrl: null,
  },
];

export default async function Work() {
  let projects = await getProjects().catch(() => []);
  if (!projects || projects.length === 0) projects = fallbackProjects;

  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto w-full">
      <FadeUp>
        <div className="flex items-end justify-between mb-16 border-b border-[#e5e7eb] pb-6">
          <h2 className="text-3xl font-light text-[#1a1a1a]">Selected Work</h2>
          <span className="text-sm text-[#6b7280]">{projects.length} projects</span>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project: typeof fallbackProjects[0], i: number) => (
          <FadeUp key={project._id} delay={i * 100}>
          <article className="group cursor-pointer">
            <div
              className="w-full aspect-[4/3] mb-5 overflow-hidden relative transition-transform duration-500 group-hover:scale-[0.99]"
              style={{ backgroundColor: fallbackBg[i % fallbackBg.length] }}
            >
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-light text-[#1a1a1a]/10 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">{project.category}</p>
                <h3 className="text-lg font-semibold text-[#1a1a1a] group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-[#6b7280] mt-2 leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
              <div className="shrink-0 w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all mt-1">
                <span className="text-xs text-[#1a1a1a] group-hover:text-white transition-colors">↗</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags?.map((tag: string) => (
                <span key={tag} className="text-xs text-[#6b7280] border border-[#e5e7eb] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
