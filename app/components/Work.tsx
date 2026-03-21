const projects = [
  {
    id: "01",
    title: "Fintech Dashboard",
    category: "Product Design · 2024",
    description: "Redesigned the core analytics dashboard for a B2B fintech platform, reducing task completion time by 38%.",
    tags: ["Figma", "User Research", "Prototyping"],
    bg: "#f0ede8",
  },
  {
    id: "02",
    title: "Health & Wellness App",
    category: "Mobile Design · 2024",
    description: "End-to-end design of an iOS app helping users track mental health habits with gentle nudges and data visualizations.",
    tags: ["iOS", "Design System", "Motion"],
    bg: "#e8ede8",
  },
  {
    id: "03",
    title: "E-commerce Rebrand",
    category: "Brand & UX · 2023",
    description: "Complete visual and interaction redesign of a DTC fashion brand's web store, resulting in a 22% lift in conversion.",
    tags: ["Brand", "UX Writing", "A/B Testing"],
    bg: "#e8ecf0",
  },
  {
    id: "04",
    title: "Design System",
    category: "Systems Design · 2023",
    description: "Built a company-wide design system from scratch — tokens, components, documentation — adopted by 4 product teams.",
    tags: ["Tokens", "Storybook", "Documentation"],
    bg: "#f0ece8",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-32 px-6 max-w-6xl mx-auto w-full">
      <div className="flex items-end justify-between mb-16 border-b border-[#e5e7eb] pb-6">
        <h2 className="text-3xl font-light text-[#1a1a1a]">Selected Work</h2>
        <span className="text-sm text-[#6b7280]">{projects.length} projects</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group cursor-pointer"
          >
            {/* Image placeholder */}
            <div
              className="w-full aspect-[4/3] mb-5 overflow-hidden transition-transform duration-500 group-hover:scale-[0.99]"
              style={{ backgroundColor: project.bg }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl font-light text-[#1a1a1a]/10 select-none">
                  {project.id}
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#6b7280] mb-1">{project.category}</p>
                <h3 className="text-lg font-medium text-[#1a1a1a] group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-sm text-[#6b7280] mt-2 leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
              <div className="shrink-0 w-8 h-8 rounded-full border border-[#e5e7eb] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all mt-1">
                <svg
                  className="group-hover:stroke-white transition-colors"
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 7H13M7 1L13 7L7 13" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#6b7280] border border-[#e5e7eb] px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
