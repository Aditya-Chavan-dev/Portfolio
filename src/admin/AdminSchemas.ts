import { z } from 'zod';

export const WelcomeConfigSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  dialogue: z.array(z.string().max(500)),
  highlightIndex: z.union([z.number(), z.array(z.number())]).optional()
});

export const ProjectOverrideSchema = z.record(z.string(), z.object({
  description: z.string().max(1000).optional(),
  techStack: z.array(z.string()).optional(),
  flagshipFeatures: z.array(z.object({
    title: z.string().max(100),
    description: z.string().max(300)
  })).optional(),
  learningsIssues: z.array(z.object({
    title: z.string().max(100),
    description: z.string().max(300)
  })).optional()
}));

export const DeploymentLogSchema = z.object({
  version: z.string(),
  env: z.enum(['production', 'staging']),
  triggeredBy: z.string(),
  status: z.enum(['pending', 'success', 'failed']),
  timestamp: z.any()
});
