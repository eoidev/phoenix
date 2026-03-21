const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Every project starts with deep listening. I run stakeholder interviews, user research sessions, and competitive audits to build a shared understanding of the problem space.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "From research comes clarity. I synthesize findings into user journeys, jobs-to-be-done, and a clear design brief — so everyone's aligned before a single pixel is pushed.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "I move fast from rough sketches to high-fidelity prototypes, iterating in tight loops. Design decisions are always tied back to user needs and business goals.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Handoff is a collaboration, not a hand-off. I work closely with engineers through implementation, run usability tests post-launch, and measure outcomes against success metrics.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-32 px-6 max-w-6xl mx-auto w-full">
      <div className="border-b border-[#e5e7eb] pb-6 mb-16">
        <p className="text-xs text-[#6b7280] tracking-widest uppercase mb-2">How I Work</p>
        <h2 className="text-3xl font-light text-[#1a1a1a]">My Process</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-[10px] left-[calc(100%+1rem)] right-0 h-px bg-[#e5e7eb] w-8" />
            )}
            <span className="text-xs text-[#6b7280] tracking-widest font-mono mb-4 block">{step.number}</span>
            <h3 className="text-lg font-medium text-[#1a1a1a] mb-3">{step.title}</h3>
            <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
