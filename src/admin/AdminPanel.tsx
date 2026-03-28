import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthProvider'
import { useToastContext } from '@/common/shared/Toast'
import MetricsDashboard from './MetricsDashboard'
import PulsePanel from './PulsePanel'
import ShieldPanel from './ShieldPanel'
import HivePanel from './HivePanel'
import EnginePanel from './EnginePanel'
import TimeMachinePanel from './TimeMachinePanel'
import BudgetPanel from './BudgetPanel'
import QualityPanel from './QualityPanel'
import SettingsPanel from './SettingsPanel'
import AdminProjectsTab from './AdminProjectsTab'
import { SESSION_KEYS } from '@/common/shared/constants'
import { useInactivityLogout } from './useInactivityLogout'
import { Activity, Shield, Users, HardDrive, History, Wallet, Edit3, LayoutDashboard, LogOut, Sparkles, Settings, FolderGit2 } from 'lucide-react'

const CATEGORIES = [
  { id: 'system', label: 'System', items: ['overview', 'settings', 'projects'] },
  { id: 'analytics', label: 'Analytics', items: ['hive', 'pulse', 'engine'] },
  { id: 'operations', label: 'Operations', items: ['shield', 'timemachine', 'budget', 'editor'] },
]

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'hive', label: 'Active Users', icon: Users },
  { id: 'pulse', label: 'Performance', icon: Activity },
  { id: 'engine', label: 'System Health', icon: HardDrive },
  { id: 'shield', label: 'Security', icon: Shield },
  { id: 'timemachine', label: 'Backups', icon: History },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'editor', label: 'Content Audit', icon: Edit3 },
]

export default function AdminPanel() {
  useInactivityLogout()
  const { logout } = useAuth()
  const { addToast } = useToastContext()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#08080A] border-r border-white/[0.05] p-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white tracking-tighter font-serif flex items-center gap-2">
          <div className="h-6 w-1.5 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
          <span className="text-amber-500">Admin</span> Health OS
        </h1>
        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1 font-mono">Precision Monitoring v2</p>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto no-scrollbar pb-8">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-2">
            <h2 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] px-3 pb-2 border-b border-white/[0.03]">
              {category.label}
            </h2>
            <div className="space-y-1">
              {category.items.map((tabId) => {
                const tab = TABS.find(t => t.id === tabId)
                if (!tab) return null
                const Icon = tab.icon
                const isActive = activeTab === tabId

                return (
                  <button
                    key={tabId}
                    onClick={() => {
                      setActiveTab(tabId)
                      setIsSidebarOpen(false)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 relative group cursor-pointer
                      ${isActive 
                        ? 'text-white bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent' 
                        : 'text-theme-muted hover:text-white hover:bg-white/[0.03]'}
                    `}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] rounded-r-full"
                      />
                    )}
                    <Icon 
                      size={18} 
                      className={`${isActive ? 'text-amber-500' : 'text-current'} transition-colors`} 
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-[11px] font-bold tracking-wide">{tab.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/[0.05] space-y-2">
         <button
           onClick={handleGodMode}
           className="group w-full flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-xl transition-all cursor-pointer overflow-hidden relative"
         >
           <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
           <span>Enter God Mode</span>
           <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
         </button>
         <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-[11px] font-bold text-theme-muted hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={14} />
            Sign Out
          </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050507] flex text-[#E4E4E7]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto no-scrollbar">
        {/* Mobile Header Toggle */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/[0.05] bg-[#0D0D11]/90 backdrop-blur-xl sticky top-0 z-30">
          <h1 className="text-lg font-bold text-white tracking-tighter font-serif">
            <span className="text-amber-500">Admin</span> OS
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-white/60 hover:text-white bg-white/5 rounded-lg border border-white/10"
          >
            <LayoutDashboard size={20} />
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-12">
          <div className="max-w-6xl mx-auto space-y-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-20">
                    <MetricsDashboard />
                    
                    <section className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent shadow-2xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A20] to-[#0D0D11]" />
                      
                      {/* Animated Mesh Gradients */}
                      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />
                      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full animate-pulse [animation-delay:1s] pointer-events-none" />

                      <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                          <Sparkles size={200} className="text-amber-500" />
                        </div>
                        
                        <div className="max-w-xl text-center md:text-left">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={10} />
                            <span>Visual Engine Active</span>
                          </div>
                          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-serif leading-[1.1]">
                            Enter <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">God Mode</span>
                          </h2>
                          <p className="text-gray-400 text-base md:text-lg mb-0 leading-relaxed font-sans max-w-md">
                            Modify your digital presence with zero code. 
                            The visual editor lets you sculpt content in real-time with instant hot-swapping.
                          </p>
                        </div>

                        <button
                          onClick={handleGodMode}
                          className="group relative px-10 py-5 bg-white text-black rounded-2xl text-[13px] font-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-amber-500/20 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden isolate"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            Launch Editor
                            <motion.span 
                              animate={{ x: [0, 5, 0] }} 
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              →
                            </motion.span>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </section>
                  </div>
                )}
                
                {activeTab === 'settings' && <SettingsPanel />}
                {activeTab === 'projects' && <AdminProjectsTab />}
                {activeTab === 'pulse' && <PulsePanel />}
                {activeTab === 'shield' && <ShieldPanel />}
                {activeTab === 'hive' && <HivePanel />}
                {activeTab === 'engine' && <EnginePanel />}
                {activeTab === 'timemachine' && <TimeMachinePanel />}
                {activeTab === 'budget' && <BudgetPanel />}
                {activeTab === 'editor' && <QualityPanel />}
                
                {!['overview', 'settings', 'projects', 'pulse', 'shield', 'hive', 'engine', 'timemachine', 'budget', 'editor'].includes(activeTab) && (
                  <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-black/[0.04] dark:border-white/[0.04] rounded-[2.5rem] opacity-50">
                    <p className="text-theme-muted font-serif italic text-lg">Module "{tabLabel(activeTab)}" Offline</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-theme-muted/50 mt-4 font-mono">Initializing System Components...</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="mt-auto px-6 lg:px-12 py-8 border-t border-white/[0.05] opacity-30">
          <p className="text-[9px] uppercase tracking-[0.3em] text-center font-bold">
            Neural-Port OS v2.4 — Antigravity Engineering
          </p>
        </footer>
      </div>
    </div>
  )
}

function tabLabel(id: string) {
  return TABS.find(t => t.id === id)?.label || id.toUpperCase()
}
