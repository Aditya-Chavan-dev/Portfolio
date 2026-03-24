import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { useToastContext } from '@/shared/Toast'
import MetricsDashboard from './components/MetricsDashboard'
import AdminProjectsTab from './components/AdminProjectsTab'

type Tab = 'metrics' | 'projects' | 'deploy' | 'rollback' | 'audit' | 'skills'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'metrics',  icon: '📊', label: 'Metrics' },
  { id: 'projects', icon: '📁', label: 'Projects Catalog' },
  { id: 'skills',   icon: '🛠',  label: 'Skills' },
  { id: 'deploy',   icon: '🚀', label: 'Deploy' },
  { id: 'rollback', icon: '🔄', label: 'Rollback' },
  { id: 'audit',    icon: '📋', label: 'Audit Log' },
]

export default function AdminPanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (searchParams.get('tab') as Tab) || 'metrics'
  const { user, logout } = useAuth()
  const { addToast } = useToastContext()
  const navigate = useNavigate()

  function setTab(tab: Tab) {
    setSearchParams({ tab })
  }

  async function handleLogout() {
    try {
      await logout()
      addToast('Signed out', 'info')
      navigate('/amgl-3-10', { replace: true })
    } catch {
      addToast('Logout failed', 'error')
    }
  }

  function handleEditPortfolio() {
    sessionStorage.setItem('admin_edit_session', 'true')
    sessionStorage.removeItem('has_seen_welcome')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-theme-primary flex font-sans">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 bg-white dark:bg-[#131315] border-r border-black/[0.04] dark:border-white/[0.04] shadow-sm">
        {/* Logo area */}
        <div className="px-5 py-5 border-b border-black/[0.04] dark:border-white/[0.04]">
          <h1 className="text-sm font-bold text-theme-primary tracking-tight">Admin Panel</h1>
          {user?.email && (
            <p className="text-[10px] text-theme-muted font-mono mt-0.5 truncate">{user.email}</p>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2.5 ${
                activeTab === tab.id
                  ? 'bg-amber-600/10 text-amber-600 dark:text-amber-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-black/[0.04] dark:border-white/[0.04] space-y-2">
          <button
            onClick={handleEditPortfolio}
            className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 justify-center"
          >
            ✏️ Edit Portfolio →
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer border border-red-500/20"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile top bar ──────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#131315] border-b border-black/[0.04] dark:border-white/[0.04] shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-sm font-bold text-theme-primary">Admin</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEditPortfolio}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white cursor-pointer"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-lg text-xs text-red-500 cursor-pointer border border-red-500/20"
            >
              Out
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto px-2 pb-2 gap-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-500 bg-black/[0.03] dark:bg-white/[0.03]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 pt-28 md:pt-8">
        <TabContent tab={activeTab} />
      </main>
    </div>
  )
}

function TabContent({ tab }: { tab: Tab }) {
  switch (tab) {
    case 'metrics':
      return <MetricsDashboard />
    case 'projects':
      return <AdminProjectsTab />
    case 'skills':
      return <PlaceholderTab name="Skills Manager" description="Coming in Phase 6" />
    case 'deploy':
      return <PlaceholderTab name="Deploy" description="Coming in Phase 7" />
    case 'rollback':
      return <PlaceholderTab name="Rollback" description="Coming in Phase 8" />
    case 'audit':
      return <PlaceholderTab name="Audit Log" description="Coming in Phase 6" />
    default:
      return <MetricsDashboard />
  }
}

function PlaceholderTab({ name, description }: { name: string; description: string }) {
  return (
    <div className="max-w-md">
      <h2 className="text-lg font-bold text-theme-primary mb-2">{name}</h2>
      <p className="text-sm text-theme-muted">{description}</p>
    </div>
  )
}
