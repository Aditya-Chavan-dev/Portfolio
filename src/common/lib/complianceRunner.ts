import { z } from 'zod';
import { logMetric } from './metrics';

/**
 * Compliance Runner
 * Validates any administrative input against its defined schema.
 * Logs violations to the Shield module.
 */
export function validateInput<T>(schema: z.ZodType<T>, data: any, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorDetails = result.error.format();
    console.warn(`[Shield] Compliance violation in ${label}:`, errorDetails);
    
    // Log the violation to the metrics orchestrator
    logMetric(`compliance/violation/${label}`, 1, 'error');
    
    throw new Error(`Security Exception: Data integrity check failed for ${label}. Please review schema constraints.`);
  }

  // Log successful compliance check
  logMetric(`compliance/audit/${label}`, 1, 'ok');
  return result.data;
}


