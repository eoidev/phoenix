import { client } from "./client";

export async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc) {
      _id,
      title,
      category,
      description,
      tags,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`
  );
}

export async function getSettings() {
  return client.fetch(
    `*[_type == "settings"][0] {
      name,
      role,
      tagline,
      bio,
      skills,
      clients,
      email,
      linkedin,
      dribbble,
      "photoUrl": photo.asset->url
    }`
  );
}
