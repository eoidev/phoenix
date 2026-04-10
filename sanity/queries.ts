import { client } from "./client";

const sanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

export async function getProjects() {
  if (!sanityConfigured) return [];
  return withTimeout(
    client.fetch(
      `*[_type == "project"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      tags,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`
    )
  );
}

export async function getProjectBySlug(slug: string) {
  if (!sanityConfigured) return null;
  return withTimeout(
    client.fetch(
      `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      tags,
      "imageUrl": image.asset->url,
      role,
      opportunities,
      approach,
      impact,
      reflection
    }`,
      { slug }
    )
  );
}

export async function getSettings() {
  if (!sanityConfigured) return null;
  return withTimeout(
    client.fetch(
      `*[_type == "settings"][0] {
      name,
      role,
      availability,
      tagline,
      bio,
      skills,
      "clients": clients[] { name, "logoUrl": logo.asset->url },
      email,
      linkedin,
      dribbble,
      "photoUrl": photo.asset->url
    }`
    )
  );
}
