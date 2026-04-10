export const revalidate = 60;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FadeUp from "../../components/FadeUp";
import Footer from "../../components/Footer";
import { getProjectBySlug } from "../../../sanity/queries";

type Params = Promise<{ slug: string }>;

// ─── Tootoot case study content ──────────────────────────────────────────────

const tootoot = {
  title: "Tootoot",
  category: "Product Design",
  description:
    "Fan-driven concert demand platform enabling users to drive event bookings in their city.",
  tags: ["Product Design", "UX Research", "Design System", "Mobile"],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;

  // For non-tootoot slugs, check Sanity; 404 if not found
  if (slug !== "tootoot") {
    const project = await getProjectBySlug(slug).catch(() => null);
    if (!project) notFound();
    // Future: render a generic detail page using Sanity content
    notFound();
  }

  const p = tootoot;

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
            <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-4">
              {p.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-[#1a1a1a] mb-6">
              {p.title}
            </h1>
            <p className="text-lg text-[#6b7280] leading-relaxed max-w-2xl mb-8">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[#6b7280] border border-[#e5eaeb] px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ── Case study sections ── */}
        <div className="max-w-6xl mx-auto px-6">

          {/* My Role */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  My Role
                </p>
              </div>
              <div className="space-y-4 mt-6 md:mt-0">
                <p className="text-[#6b7280] leading-relaxed">
                  I worked as a Product Designer responsible for shaping both the user experience
                  and visual direction of the Tootoot platform. My scope covered the full design
                  lifecycle — from early concept exploration and UX flows to high-fidelity UI and
                  interaction design.
                </p>
                <p className="text-[#6b7280] leading-relaxed">
                  I collaborated closely with stakeholders to translate the product vision into a
                  cohesive experience, focusing on creating an intuitive interface that supports
                  both fan engagement and event discovery. In addition to execution, I contributed
                  to product thinking, helping define how core features should behave and connect
                  across the platform.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Opportunities */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  Opportunities
                </p>
              </div>
              <div className="space-y-6 mt-6 md:mt-0">
                <p className="text-[#6b7280] leading-relaxed">
                  Tootoot introduced an innovative concept — enabling fans to drive demand for
                  concerts in their city. This created several interesting UX and product
                  opportunities:
                </p>
                <ul className="space-y-2">
                  {[
                    "Reducing uncertainty in a model where events are not yet confirmed",
                    "Motivating user participation in creating and supporting event demand",
                    "Designing a system that balances community interaction with transactional flows (ticketing)",
                    "Creating a clear and engaging discovery experience across cities, artists, and events",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[#6b7280] text-sm leading-relaxed">
                      <span className="text-[#e5e7eb] select-none mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#6b7280] leading-relaxed pt-2">
                  At the same time, the product faced inherent challenges:
                </p>
                <ul className="space-y-2">
                  {[
                    "Building trust in whether events will actually happen",
                    "Maintaining engagement in early stages with limited activity",
                    "Bridging the gap between user intent (interest) and business outcome (ticket sales)",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[#6b7280] text-sm leading-relaxed">
                      <span className="text-[#e5e7eb] select-none mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>

          {/* Approach */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  Approach
                </p>
              </div>
              <div className="space-y-8 mt-6 md:mt-0">
                <p className="text-[#6b7280] leading-relaxed">
                  I approached the design with a focus on clarity, engagement, and scalability.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      title: "Simplified user flows",
                      body: "I designed clear pathways for key actions such as discovering events, expressing interest, and tracking demand — reducing friction in a relatively unfamiliar concept.",
                    },
                    {
                      title: "Visual hierarchy & dark UI system",
                      body: "I created a modern, dark-themed interface aligned with the music and events domain, using contrast and spacing to guide attention and highlight key actions.",
                    },
                    {
                      title: "System thinking",
                      body: "Instead of designing isolated screens, I focused on building a coherent system of components and patterns, ensuring consistency across the platform.",
                    },
                    {
                      title: "Bridging exploration and action",
                      body: "Special attention was given to connecting browsing behavior (exploring artists/events) with meaningful actions (supporting or attending events).",
                    },
                    {
                      title: "Design for uncertainty",
                      body: "I explored ways to communicate event status, demand levels, and progress clearly — helping users understand where they are in the journey.",
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex gap-3">
                      <span className="text-[#e5e7eb] select-none mt-0.5 text-sm">—</span>
                      <div>
                        <p className="text-sm font-medium text-[#1a1a1a] mb-1">{title}</p>
                        <p className="text-sm text-[#6b7280] leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Impact & Outcomes */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16 border-b border-[#e5e7eb]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  Impact & Outcomes
                </p>
              </div>
              <div className="space-y-6 mt-6 md:mt-0">
                <p className="text-[#6b7280] leading-relaxed">
                  The result was a cohesive product experience that made a complex, non-traditional
                  concept more understandable and engaging for users.
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
                <p className="text-[#6b7280] leading-relaxed pt-2">
                  While the product concept itself faced broader market challenges, the design work
                  demonstrated how thoughtful UX can reduce friction, build trust, and support new
                  behavioral models in emerging product spaces.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Reflection */}
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-16 py-16">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  Reflection
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <p className="text-[#6b7280] leading-relaxed">
                  This project highlighted the importance of designing not only for usability, but
                  also for user trust and motivation, especially in products where outcomes are
                  uncertain. It reinforced my focus on connecting user needs, business goals, and
                  system design into one cohesive experience.
                </p>
              </div>
            </div>
          </FadeUp>

        </div>
      </main>

      <Footer />
    </>
  );
}
