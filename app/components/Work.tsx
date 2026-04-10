import Image from "next/image";
import Link from "next/link";
import { getProjects } from "../../sanity/queries";
import FadeUp from "./FadeUp";

const fallbackBg = ["#f5f5f7", "#f5f5f7", "#f5f5f7", "#f5f5f7"];

const fallbackProjects = [
  {
    _id: "1",
    title: "Tootoot",
    slug: "tootoot",
    category: "Product Design",
    description:
      "Fan-driven concert demand platform enabling users to drive event bookings in their city.",
    tags: ["Product Design", "UX Research", "Design System", "Mobile"],
    imageUrl: null,
  },
  {
    _id: "2",
    title: "Etops Wealth Discovery",
    slug: null,
    category: "Product Design · 2024",
    description:
      "Lead Product Designer for a Swiss-based wealth management and asset consolidation platform.",
    tags: ["Product Design", "Design System", "Figma"],
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
            <ProjectCard project={project} index={i} bg={fallbackBg[i % fallbackBg.length]} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  bg,
}: {
  project: typeof fallbackProjects[0];
  index: number;
  bg: string;
}) {
  const inner = (
    <article className="group cursor-pointer">
      <div
        className="w-full aspect-[4/3] mb-5 overflow-hidden relative transition-transform duration-500 group-hover:scale-[0.99]"
        style={{ backgroundColor: bg }}
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
              {String(index + 1).padStart(2, "0")}
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
  );

  if (project.slug) {
    return <Link href={`/work/${project.slug}`}>{inner}</Link>;
  }

  return inner;
}
