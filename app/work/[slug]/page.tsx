export const revalidate = 60;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FadeUp from "../../components/FadeUp";
import Footer from "../../components/Footer";
import { getProjectBySlug } from "../../../sanity/queries";

type Params = Promise<{ slug: string }>;

type Block = {
  _key: string;
  _type: string;
  style?: string;
  listItem?: string;
  children?: { _key: string; text: string; marks?: string[] }[];
};

type ApproachItem = { _key: string; title: string; body: string };

// ─── Hardcoded fallback content for tootoot ───────────────────────────────────

const fallback = {
  title: "Tootoot",
  category: "Product Design",
  description:
    "Fan-driven concert demand platform enabling users to drive event bookings in their city.",
  tags: ["Product Design", "UX Research", "Design System", "Mobile"],
  imageUrl: null,
  role: null,
  opportunities: null,
  approach: [
    { _key: "1", title: "Simplified user flows", body: "I designed clear pathways for key actions such as discovering events, expressing interest, and tracking demand — reducing friction in a relatively unfamiliar concept." },
    { _key: "2", title: "Visual hierarchy & dark UI system", body: "I created a modern, dark-themed interface aligned with the music and events domain, using contrast and spacing to guide attention and highlight key actions." },
    { _key: "3", title: "System thinking", body: "Instead of designing isolated screens, I focused on building a coherent system of components and patterns, ensuring consistency across the platform." },
    { _key: "4", title: "Bridging exploration and action", body: "Special attention was given to connecting browsing behavior (exploring artists/events) with meaningful actions (supporting or attending events)." },
    { _key: "5", title: "Design for uncertainty", body: "I explored ways to communicate event status, demand levels, and progress clearly — helping users understand where they are in the journey." },
  ] as ApproachItem[],
  impact: null,
  reflection: null,
};

// ─── Block renderer ────────────────────────────────────────────────────────────

function RenderBlocks({ blocks }: { blocks: Block[] }) {
  const items: React.ReactNode[] = [];
  let listBuffer: Block[] = [];

  const flushList = () => {
    if (!listBuffer.length) return;
    items.push(
      <ul key={`list-${listBuffer[0]._key}`} className="space-y-2">
        {listBuffer.map((b) => (
          <li key={b._key} className="flex gap-3 text-[#6b7280] text-sm leading-relaxed">
            <span className="text-[#e5e7eb] select-none mt-0.5">—</span>
            <span>{b.children?.map((c) => c.text).join("") ?? ""}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  for (const block of blocks) {
    if (block.listItem === "bullet") {
      listBuffer.push(block);
    } else {
      flushList();
      const text = block.children?.map((c) => c.text).join("") ?? "";
      if (text) {
        items.push(
          <p key={block._key} className="text-[#6b7280] leading-relaxed">
            {text}
          </p>
        );
      }
    }
  }
  flushList();

  return <div className="space-y-4">{items}</div>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;

  const sanityData = await getProjectBySlug(slug).catch(() => null);

  if (!sanityData && slug !== "tootoot") notFound();

  const p = sanityData ?? fallback;

  const roleBlocks: Block[] | null = p.role ?? null;
  const opportunitiesBlocks: Block[] | null = p.opportunities ?? null;
  const approachItems: ApproachItem[] | null = p.approach ?? null;
  const impactBlocks: Block[] | null = p.impact ?? null;
  const reflectionBlocks: Block[] | null = p.reflection ?? null;

  const fallbackRole = (
    <div className="space-y-4">
      <p className="text-[#6b7280] leading-relaxed">
        I worked as a Product Designer responsible for shaping both the user experience and visual
        direction of the Tootoot platform. My scope covered the full design lifecycle — from early
        concept exploration and UX flows to high-fidelity UI and interaction design.
      </p>
      <p className="text-[#6b7280] leading-relaxed">
        I collaborated closely with stakeholders to translate the product vision into a cohesive
        experience, focusing on creating an intuitive interface that supports both fan engagement
        and event discovery.
      </p>
    </div>
  );

  const fallbackOpportunities = (
    <div className="space-y-6">
      <p className="text-[#6b7280] leading-relaxed">
        Tootoot introduced an innovative concept — enabling fans to drive demand for concerts in
        their city.
      </p>
      <ul className="space-y-2">
        {[
          "Reducing uncertainty in a model where events are not yet confirmed",
          "Motivating user participation in creating and supporting event demand",
          "Designing a system that balances community interaction with transactional flows",
          "Creating a clear and engaging discovery experience across cities, artists, and events",
        ].map((item) => (
          <li key={item} className="flex gap-3 text-[#6b7280] text-sm leading-relaxed">
            <span className="text-[#e5e7eb] select-none mt-0.5">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const fallbackImpact = (
    <div className="space-y-4">
      <p className="text-[#6b7280] leading-relaxed">
        The result was a cohesive product experience that made a complex, non-traditional concept
        more understandable and engaging for users.
      </p>
      <ul className="space-y-2">
        {[
          "Delivered a clear and visually compelling interface aligned with the target audience",
          "Transformed an abstract idea into tangible user flows and interactions",
          "Established a scalable design foundation for future product growth",
          "Improved the connection between user engagement and key platform actions",
        ].map((item) => (
          <li key={item} className="flex gap-3 text-[#6b7280] text-sm leading-relaxed">
            <span className="text-[#e5e7eb] select-none mt-0.5">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const fallbackReflection = (
    <p className="text-[#6b7280] leading-relaxed">
      This project highlighted the importance of designing not only for usability, but also for
      user trust and motivation, especially in products where outcomes are uncertain.
    </p>
  );

  return (
    <>
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/90 backdrop-blur-md border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="hover:opacity-60 transition-opacity">
            <Image src="/eoi-logo.svg" alt="EOI" width={48} height={30} />
          </Link>
          <Link
            href="/#work"
            className="text-sm text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
          >
            ← Back to work
          </Link>
        </div>
      </header>

      <main className="pt-24">
        {/* ── Project header ── */}
        <FadeUp>
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-16 border-b border-[#e5e7eb]">
            <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-4">{p.category}</p>
            <h1 className="text-5xl md:text-6xl font-light text-[#1a1a1a] mb-6">{p.title}</h1>
            <p className="text-lg text-[#6b7280] leading-relaxed max-w-2xl mb-8">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {(p.tags ?? []).map((tag: string) => (
                <span key={tag} className="text-xs text-[#6b7280] border border-[#e5eaeb] px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="max-w-6xl mx-auto px-6">

          {/* My Role */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">My Role</p>
              <div className="mt-6 md:mt-0">
                {roleBlocks ? <RenderBlocks blocks={roleBlocks} /> : fallbackRole}
              </div>
            </div>
          </FadeUp>

          {/* Opportunities */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">Opportunities</p>
              <div className="mt-6 md:mt-0">
                {opportunitiesBlocks ? <RenderBlocks blocks={opportunitiesBlocks} /> : fallbackOpportunities}
              </div>
            </div>
          </FadeUp>

          {/* Approach */}
          {approachItems && approachItems.length > 0 && (
            <FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">Approach</p>
                <div className="space-y-6 mt-6 md:mt-0">
                  {approachItems.map((item) => (
                    <div key={item._key} className="flex gap-3">
                      <span className="text-[#e5e7eb] select-none mt-0.5 text-sm">—</span>
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a] mb-1">{item.title}</p>
                        <p className="text-sm text-[#6b7280] leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {/* Impact & Outcomes */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">Impact & Outcomes</p>
              <div className="mt-6 md:mt-0">
                {impactBlocks ? <RenderBlocks blocks={impactBlocks} /> : fallbackImpact}
              </div>
            </div>
          </FadeUp>

          {/* Reflection */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">Reflection</p>
              <div className="mt-6 md:mt-0">
                {reflectionBlocks ? <RenderBlocks blocks={reflectionBlocks} /> : fallbackReflection}
              </div>
            </div>
          </FadeUp>

        </div>
      </main>

      <Footer />
    </>
  );
}
