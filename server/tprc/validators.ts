import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content too short"),
  description: z.string().min(10, "Description too short"),
  image: z.string().url("Invalid image URL"),
  published: z.boolean().default(false),
  categoryIds: z.array(z.number()).optional(),
});
