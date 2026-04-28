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
type CardItem = { key: string; body: string };

// ─── Block helpers ─────────────────────────────────────────────────────────────

function blockText(b: Block): string {
  return (b.children ?? []).map((c) => c.text ?? "").join("");
}

function extractBullets(blocks: Block[] | null | undefined): CardItem[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => b.listItem === "bullet")
    .map((b) => ({ key: b._key, body: blockText(b) }))
    .filter((i) => i.body);
}

function extractParagraphs(blocks: Block[] | null | undefined): string[] {
  if (!blocks) return [];
  return blocks
    .filter((b) => !b.listItem)
    .map((b) => blockText(b))
    .filter(Boolean);
}

// ─── Hardcoded fallback content for tootoot ────────────────────────────────────

const fallback = {
  title: "Tootoot",
  category: "Product Design",
  description:
    "Fan-driven concert demand platform enabling users to drive event bookings in their city.",
  tags: ["Product Design", "UX Research", "Design System", "Mobile"],
  imageUrl: null as string | null,
  roleParagraphs: [
    "I worked as a Product Designer responsible for shaping both the user experience and visual direction of the Tootoot platform. My scope covered the full design lifecycle — from early concept exploration and UX flows to high-fidelity UI and interaction design.",
    "I collaborated closely with stakeholders to translate the product vision into a cohesive experience, focusing on creating an intuitive interface that supports both fan engagement and event discovery.",
  ],
  opportunitiesIntro:
    "Tootoot introduced an innovative concept — enabling fans to drive demand for concerts in their city.",
  opportunitiesCards: [
    { key: "o1", body: "Reducing uncertainty in a model where events are not yet confirmed" },
    { key: "o2", body: "Motivating user participation in creating and supporting event demand" },
    { key: "o3", body: "Designing a system that balances community interaction with transactional flows" },
    { key: "o4", body: "Creating a clear and engaging discovery experience across cities, artists, and events" },
  ] as CardItem[],
  approach: [
    { _key: "1", title: "Simplified user flows", body: "I designed clear pathways for key actions such as discovering events, expressing interest, and tracking demand — reducing friction in a relatively unfamiliar concept." },
    { _key: "2", title: "Visual hierarchy & dark UI system", body: "I created a modern interface aligned with the music and events domain, using contrast and spacing to guide attention and highlight key actions." },
    { _key: "3", title: "System thinking", body: "Instead of designing isolated screens, I focused on building a coherent system of components and patterns, ensuring consistency across the platform." },
    { _key: "4", title: "Bridging exploration and action", body: "Special attention was given to connecting browsing behavior (exploring artists/events) with meaningful actions (supporting or attending events)." },
    { _key: "5", title: "Design for uncertainty", body: "I explored ways to communicate event status, demand levels, and progress clearly — helping users understand where they are in the journey." },
  ] as ApproachItem[],
  impactIntro:
    "The result was a cohesive product experience that made a complex, non-traditional concept more understandable and engaging for users.",
  impactCards: [
    { key: "i1", body: "Delivered a clear and visually compelling interface aligned with the target audience" },
    { key: "i2", body: "Transformed an abstract idea into tangible user flows and interactions" },
    { key: "i3", body: "Established a scalable design foundation for future product growth" },
    { key: "i4", body: "Improved the connection between user engagement and key platform actions" },
  ] as CardItem[],
  reflection:
    "This project highlighted the importance of designing not only for usability, but also for user trust and motivation, especially in products where outcomes are uncertain.",
};

const sectionAnchors = [
  { id: "role", label: "My role" },
  { id: "opportunities", label: "Opportunities" },
  { id: "approach", label: "Approach" },
  { id: "impact", label: "Impact & Outcomes" },
  { id: "outputs", label: "Glimpse of Outputs" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;

  const sanityData = await getProjectBySlug(slug).catch(() => null);
  if (!sanityData && slug !== "tootoot") notFound();

  const sd = sanityData as {
    title?: string;
    category?: string;
    description?: string;
    tags?: string[];
    imageUrl?: string | null;
    keyVisualUrl?: string | null;
    role?: Block[];
    opportunities?: Block[];
    approach?: ApproachItem[];
    impact?: Block[];
    reflection?: Block[];
  } | null;

  // Derive display data
  const title = sd?.title ?? fallback.title;
  const category = sd?.category ?? fallback.category;
  const description = sd?.description ?? fallback.description;
  const tags: string[] = sd?.tags ?? fallback.tags;
  const imageUrl = sd?.imageUrl ?? fallback.imageUrl;
  const keyVisualUrl = sd?.keyVisualUrl ?? null;

  const roleParagraphs = sd?.role
    ? extractParagraphs(sd.role)
    : fallback.roleParagraphs;

  const opportunitiesIntro = sd?.opportunities
    ? extractParagraphs(sd.opportunities).join(" ")
    : fallback.opportunitiesIntro;
  const opportunitiesCards: CardItem[] = sd?.opportunities
    ? extractBullets(sd.opportunities)
    : fallback.opportunitiesCards;

  const approachItems: ApproachItem[] = sd?.approach ?? fallback.approach;

  const impactIntro = sd?.impact
    ? extractParagraphs(sd.impact).join(" ")
    : fallback.impactIntro;
  const impactCards: CardItem[] = sd?.impact
    ? extractBullets(sd.impact)
    : fallback.impactCards;

  const reflection = sd?.reflection
    ? extractParagraphs(sd.reflection).join(" ")
    : fallback.reflection;

  return (
    <>
      {/* ── Top nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/90 backdrop-blur-md border-b border-[#e5eaeb]">
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

      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="pt-32 md:pt-52 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex flex-col md:flex-row items-end justify-between gap-12">
                {/* Left: text */}
                <div className="flex flex-col gap-5 md:w-[480px]">
                  <p className="text-xs uppercase tracking-[1.2px] text-[#6b7280]">
                    {category}
                  </p>
                  <h1 className="text-7xl md:text-8xl font-light text-[#1a1a1a] leading-[1.05] tracking-tight">
                    {title}
                  </h1>
                  <p className="text-lg text-[#6b7280] leading-relaxed">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-[#6b7280] bg-white border border-[#e5eaeb] px-3 py-[7px] leading-5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: cover image card — uses CMS imageUrl when available */}
                <div className="shrink-0 relative w-96 h-72 overflow-hidden">
                  {imageUrl ? (
                    <Image src={imageUrl} alt={title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white flex items-center justify-center p-10">
                      <img src="/tootoot-logo.svg" alt={title} className="w-full h-auto" />
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── Section anchor nav ── */}
        <div className="sticky top-[72px] z-40 border-y border-[#e5eaeb] bg-[#f5f5f7]/95 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-6">
            <ul className="flex gap-8 overflow-x-auto py-4 scrollbar-none">
              {sectionAnchors.map((s) => (
                <li key={s.id} className="shrink-0">
                  <a
                    href={`#${s.id}`}
                    className="text-xs uppercase tracking-widest text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── My Role ── */}
        <section id="role" className="max-w-6xl mx-auto px-6 py-24">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-16 gap-y-6">
              <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                My Role
              </p>
              <div className="space-y-4 max-w-2xl">
                {(roleParagraphs || []).map((par, i) => (
                  <p key={i} className="text-[#1a1a1a] leading-relaxed">
                    {par}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Opportunities ── */}
        <section id="opportunities" className="border-t border-[#e5eaeb] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-4">
                  Challenges
                </p>
                <h2 className="text-3xl font-light text-[#1a1a1a] mb-6">
                  Opportunities
                </h2>
                {opportunitiesIntro && (
                  <p className="text-[#6b7280] leading-relaxed max-w-2xl">
                    {opportunitiesIntro}
                  </p>
                )}
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(opportunitiesCards || []).map((item, i) => (
                <FadeUp key={item.key} delay={i * 70}>
                  <div className="bg-[#fafaf9] p-7 h-full flex flex-col gap-5">
                    <span className="text-xs text-[#6b7280] font-mono tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-[#1a1a1a] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual showcase ── */}
        <section className="bg-white border-t border-b border-[#e5eaeb] py-28">
          <FadeUp>
            <div className="flex flex-col items-center text-center gap-6">
              <p className="text-xs uppercase tracking-[1.2px] text-[#6b7280]">
                Platform concept
              </p>
              <h3 className="text-4xl font-light text-[#1a1a1a] leading-[1.375]">
                Where fans drive the show.
              </h3>
              <div className="relative w-full max-w-[713px] aspect-[3/2] overflow-hidden">
                {keyVisualUrl ? (
                  <>
                    <Image
                      src={keyVisualUrl}
                      alt="Key visual"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-white/60" />
                  </>
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a]/10 flex items-center justify-center">
                    <span className="text-2xl font-light text-[#1a1a1a]/20 select-none">Key visual</span>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Approach ── */}
        <section id="approach" className="border-t border-[#e5eaeb] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-4">
                  How I worked
                </p>
                <h2 className="text-3xl font-light text-[#1a1a1a]">Approach</h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(approachItems || []).map((item, i) => (
                <FadeUp key={item._key} delay={i * 70}>
                  <div className="bg-[#fafaf9] p-7 h-full flex flex-col gap-4">
                    <span className="text-xs text-[#6b7280] font-mono tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-medium text-[#1a1a1a]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Impact & Outcomes ── */}
        <section id="impact" className="border-t border-[#e5eaeb] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="mb-12">
                <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-4">
                  Outcomes
                </p>
                <h2 className="text-3xl font-light text-[#1a1a1a] mb-6">
                  Impact & Outcomes
                </h2>
                {impactIntro && (
                  <p className="text-[#6b7280] leading-relaxed max-w-2xl">
                    {impactIntro}
                  </p>
                )}
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(impactCards || []).map((item, i) => (
                <FadeUp key={item.key} delay={i * 70}>
                  <div className="bg-[#fafaf9] p-8 h-full flex flex-col gap-5">
                    <span className="text-xs text-[#6b7280] font-mono tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base text-[#1a1a1a] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Glimpse of Outputs ── */}
        <section id="outputs" className="border-t border-[#e5eaeb] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-end justify-between mb-12 pb-6 border-b border-[#e5eaeb]">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-2">
                    Gallery
                  </p>
                  <h2 className="text-3xl font-light text-[#1a1a1a]">
                    Glimpse of Outputs
                  </h2>
                </div>
              </div>
            </FadeUp>

            {/* 3-col screen gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { src: "/tootoot-screen-1.jpg", alt: "Tootoot — Artist page with demand CTA" },
                { src: "/tootoot-screen-2.jpg", alt: "Tootoot — Add your tootoot demand form" },
                { src: "/tootoot-screen-3.jpg", alt: "Tootoot — Event detail with buy tickets" },
              ].map((screen, i) => (
                <FadeUp key={screen.src} delay={i * 80}>
                  <div className="relative overflow-hidden bg-[#fafaf9]" style={{ aspectRatio: "373/765" }}>
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Reflection ── */}
        <section className="border-t border-[#e5eaeb] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-16 gap-y-6">
                <p className="text-xs uppercase tracking-widest text-[#6b7280] md:pt-1">
                  Reflection
                </p>
                <p className="text-xl font-light text-[#1a1a1a] leading-relaxed max-w-2xl">
                  {reflection}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── Next case CTA ── */}
        <section className="border-t border-[#e5eaeb]">
          <Link href="/#work" className="group block">
            <div className="max-w-6xl mx-auto px-6 py-24 flex items-end justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#6b7280] mb-5">
                  Next case
                </p>
                <h2 className="text-5xl md:text-6xl font-light text-[#1a1a1a] group-hover:opacity-50 transition-opacity duration-500">
                  Explore more work
                </h2>
              </div>
              <div className="shrink-0 w-14 h-14 rounded-full border border-[#e5eaeb] flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-300">
                <span className="text-base text-[#1a1a1a] group-hover:text-white transition-colors">
                  →
                </span>
              </div>
            </div>
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}
