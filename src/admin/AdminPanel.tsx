import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { useToastContext } from '@/shared/Toast'
import MetricsDashboard from './components/MetricsDashboard'
import { SESSION_KEYS } from '@/shared/constants'

export default function AdminPanel() {
  const { user, logout } = useAuth()
  const { addToast } = useToastContext()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
      addToast('Signed out', 'info')
      navigate('/amgl-3-10', { replace: true })
    } catch {
      addToast('Logout failed', 'error')
    }
  }

  function handleGodMode() {
    sessionStorage.setItem(SESSION_KEYS.ADMIN_EDIT_SESSION, 'true')
    sessionStorage.removeItem(SESSION_KEYS.HAS_SEEN_WELCOME)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-theme-primary flex flex-col font-sans max-w-5xl mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <header className="flex items-center justify-between mb-12 md:mb-16 border-b border-black/[0.04] dark:border-white/[0.04] pb-8">
        <div>
          <h1 className="text-2xl font-bold text-theme-primary tracking-tight font-serif">
            Admin Dashboard
          </h1>
          <p className="text-[10px] sm:text-xs text-theme-muted mt-1 font-mono tracking-widest uppercase truncate max-w-[200px] sm:max-w-none">
            Authorized: {user?.email}
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          Sign Out
        </button>
      </header>

      {/* Metrics Section */}
      <section className="mb-12 md:mb-20">
        <MetricsDashboard />
      </section>

      {/* God Mode Entry */}
      <section className="flex flex-col items-center justify-center p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 dark:from-[#131315] dark:to-[#0a0a0c] border border-black/[0.04] dark:border-white/[0.04] shadow-2xl relative overflow-hidden group">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl group-hover:bg-orange-600/20 transition-all duration-700" />

        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-[1.25rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20">
            <span className="text-3xl text-white">✨</span>
          </div>
          
          <h2 className="text-3xl font-bold text-theme-primary mb-3">God Mode</h2>
          <p className="text-theme-muted text-sm mb-10 leading-relaxed px-4">
            Enter the visual editor to modify your portfolio in real-time. 
            All changes remain in your draft until you deploy globally.
          </p>

          <button
            onClick={handleGodMode}
            className="group relative px-10 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full text-base font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">
              Enter God Mode →
            </span>
          </button>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="mt-auto pt-16 text-center">
        <p className="text-[10px] text-theme-muted uppercase tracking-[0.2em] font-medium opacity-50">
          Antigravity Standard — Portfolio OS v2.4
        </p>
      </footer>
    </div>
  )
}
