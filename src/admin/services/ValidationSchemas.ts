import { z } from 'zod';

export const LandingPageSchema = z.object({
  hero: z.object({
    title: z.string().min(3),
    subtitle: z.string().min(10),
    ctaText: z.string().min(2),
  }),
  about: z.object({
    bio: z.string().min(50),
    tags: z.array(z.string()),
  }),
  metadata: z.object({
    lastUpdated: z.any().optional(),
    author: z.string(),
  })
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'published']),
  createdAt: z.any(),
});
