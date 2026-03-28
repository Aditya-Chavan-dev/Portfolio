/**
 * Metrics & Tracing Foundation
 * Bridging to Admin Services for centralized monitoring.
 */

export { 
  tracedCall, 
  tracedWrite, 
  incrementLocalCounter,
  logMetric
} from '@/admin/MetricsOrchestrator';

export type MetricType = 'performance' | 'security' | 'traffic' | 'engine' | 'audit' | 'reads' | 'writes';

// Optional: Metadata wrapper for tracing if future-proofing is needed
export interface TraceOptions {
  label: string;
  category: MetricType;
  metadata?: Record<string, any>;
}



