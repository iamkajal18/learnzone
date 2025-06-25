import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  imageUrl: z.string().url().optional(),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;