import { useAdminProjects } from '@/common/hooks/useAdminProjects'

export default function AdminProjectsTab() {
  const { items, loading, toggleFeatured, updateOrder } = useAdminProjects()

  const featured = items.filter(item => item.featured)
  const allRepos = items.filter(item => !item.featured)

  if (loading) return <div className="text-theme-muted text-sm">Loading repositories...</div>

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Project Portfolio</h2>
        <p className="text-xs text-theme-muted opacity-70 mb-8">
           Manage which GitHub repositories are showcased on your public landing page.
        </p>
      </div>
      {/* FEATURED SECTION */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          ⭐ Featured Projects 
          <span className="text-xs px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-full text-gray-500">{featured.length}</span>
        </h3>
        <div className="bg-white dark:bg-[#131315] rounded-xl border border-black/[0.03] dark:border-white/[0.03] divide-y divide-black/[0.03] dark:divide-white/[0.03] shadow-sm overflow-hidden">
          {featured.map((item, index) => (
            <div key={item.repo.name} className="p-4 flex justify-between items-center text-sm hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{item.repo.name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">Manual Order Weight: {item.order}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-black/[0.03] dark:bg-white/[0.03] rounded-md p-0.5">
                  <button 
                    onClick={() => updateOrder(item.repo.name, Math.max(0, item.order - 1))}
                    className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded text-gray-500 cursor-pointer"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={() => updateOrder(item.repo.name, item.order + 1)}
                    className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded text-gray-500 cursor-pointer"
                    title="Move Down"
                  >
                    ↓
                  </button>
                </div>
                <button 
                  onClick={() => toggleFeatured(item.repo.name, true, index)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-md text-xs font-semibold transition-colors"
                >
                  Unfeature
                </button>
              </div>
            </div>
          ))}
          {featured.length === 0 && <div className="p-6 text-center text-gray-400 dark:text-gray-500 text-sm">No projects have been featured yet.</div>}
        </div>
      </div>

      {/* ALL REPOS SECTION */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📁 All Repositories
          <span className="text-xs px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-full text-gray-500">{allRepos.length}</span>
        </h3>
        <div className="bg-white dark:bg-[#131315] rounded-xl border border-black/[0.03] dark:border-white/[0.03] divide-y divide-black/[0.03] dark:divide-white/[0.03] shadow-sm overflow-hidden">
          {allRepos.map(item => (
            <div key={item.repo.name} className="p-4 flex justify-between items-center text-sm hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{item.repo.name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{item.repo.language || "Unknown Language"}</span>
              </div>
              <button 
                onClick={() => toggleFeatured(item.repo.name, false, featured.length)}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-xs font-semibold shadow-sm transition-colors"
              >
                Feature
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



