import { useMetrics } from '@/hooks/useMetrics'

/**
 * Metrics Dashboard — default tab on /amgl-panel.
 * Shows Live Now, Today Visits, and All-Time Visits.
 */
export default function MetricsDashboard() {
  const { liveNow, todayVisits, allTimeVisits, loading } = useMetrics()

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-bold text-theme-primary mb-6">Portfolio Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Live Now */}
        <MetricCard
          icon="👁"
          label="Live Now"
          value={liveNow}
          sublabel="active visitors"
          loading={loading}
          pulse={liveNow > 0}
        />

        {/* Today */}
        <MetricCard
          icon="📅"
          label="Today"
          value={todayVisits}
          sublabel="visits today"
          loading={loading}
        />

        {/* All Time */}
        <MetricCard
          icon="📈"
          label="Total Visits"
          value={allTimeVisits}
          sublabel="all time"
          loading={loading}
        />
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  sublabel,
  loading,
  pulse = false,
}: {
  icon: string
  label: string
  value: number
  sublabel: string
  loading: boolean
  pulse?: boolean
}) {
  return (
    <div className="bg-white dark:bg-[#1a1a1d] rounded-xl border border-black/[0.06] dark:border-white/[0.06] p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-semibold text-theme-muted uppercase tracking-wider">{label}</span>
        {pulse && (
          <span className="relative flex h-2 w-2 ml-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        )}
      </div>
      {loading ? (
        <div className="h-9 w-20 bg-black/[0.04] dark:bg-white/[0.04] rounded animate-pulse" />
      ) : (
        <div className="text-3xl font-bold text-theme-primary tabular-nums">
          {value.toLocaleString()}
        </div>
      )}
      <p className="text-xs text-theme-muted mt-1">{sublabel}</p>
    </div>
  )
}
