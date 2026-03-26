import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Your Name", type: "string" }),
    defineField({ name: "role", title: "Role / Title", type: "string", description: 'e.g. "Product Designer"' }),
    defineField({ name: "availability", title: "Availability", type: "string", description: 'e.g. "Available for work"' }),
    defineField({ name: "tagline", title: "Hero Tagline", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "clients",
      title: "Clients / Companies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "dribbble", title: "Dribbble URL", type: "url" }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
