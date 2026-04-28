import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'e.g. "Product Design · 2024"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "keyVisual",
      title: "Key Visual",
      type: "image",
      options: { hotspot: true },
      description: "Hero visual shown in the 'Platform concept' section",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower number = shown first",
    }),

    // ── Case study sections ─────────────────────────────────────────────────
    defineField({
      name: "role",
      title: "My Role",
      type: "array",
      of: [{ type: "block" }],
      description: "Describe your role on this project",
    }),
    defineField({
      name: "opportunities",
      title: "Opportunities & Challenges",
      type: "array",
      of: [{ type: "block" }],
      description: "Use bullet lists for opportunities and challenges",
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [
        {
          type: "object",
          name: "approachItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      description: "Each item has a title and a description",
    }),
    defineField({
      name: "impact",
      title: "Impact & Outcomes",
      type: "array",
      of: [{ type: "block" }],
      description: "Use bullet lists for outcomes",
    }),
    defineField({
      name: "reflection",
      title: "Reflection",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
