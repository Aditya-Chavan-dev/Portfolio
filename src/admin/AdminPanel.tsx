import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './AuthProvider'
import { useToastContext } from '@/shared/Toast'
import MetricsDashboard from './components/panels/MetricsDashboard'
import PulsePanel from './components/panels/PulsePanel'
import ShieldPanel from './components/panels/ShieldPanel'
import HivePanel from './components/panels/HivePanel'
import EnginePanel from './components/panels/EnginePanel'
import TimeMachinePanel from './components/panels/TimeMachinePanel'
import BudgetPanel from './components/panels/BudgetPanel'
import QualityPanel from './components/panels/QualityPanel'
import { SESSION_KEYS } from '@/shared/constants'
import { Activity, Shield, Users, HardDrive, History, Wallet, Edit3, LayoutDashboard, LogOut, Sparkles } from 'lucide-react'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'pulse', label: 'Pulse', icon: Activity },
  { id: 'shield', label: 'Shield', icon: Shield },
  { id: 'hive', label: 'Hive', icon: Users },
  { id: 'engine', label: 'Engine', icon: HardDrive },
  { id: 'timemachine', label: 'Timeline', icon: History },
  { id: 'budget', label: 'Budget', icon: Wallet },
  { id: 'editor', label: 'Quality', icon: Edit3 },
]

export default function AdminPanel() {
  const { user, logout } = useAuth()
  const { addToast } = useToastContext()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

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
    <div className="min-h-screen bg-theme-primary flex flex-col font-sans max-w-7xl mx-auto px-6 py-12 lg:py-16">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-theme-primary tracking-tighter font-serif flex items-center gap-3">
            <span className="text-amber-500">Admin</span> Health OS
          </h1>
          <p className="text-[10px] text-theme-muted mt-1 font-mono tracking-widest uppercase truncate opacity-60">
            Node Terminal: {user?.email}
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl text-theme-muted hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer group"
          title="Sign Out"
        >
          <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      <div className="flex flex-wrap gap-2 mb-12 border-b border-black/[0.04] dark:border-white/[0.04] pb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                isActive 
                  ? 'text-white' 
                  : 'text-theme-muted hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={14} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <main className="flex-1 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-12">
                <MetricsDashboard />
                
                <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1A1A20] to-[#0D0D11] border border-white/[0.05] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={120} className="text-amber-500" />
                  </div>
                  
                  <div className="relative z-10 max-w-lg">
                    <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">God Mode</h2>
                    <p className="text-gray-400 text-sm mb-0 leading-relaxed">
                      Enter the visual editor to modify your portfolio in real-time. 
                      Changes are safely held in draft until deployment.
                    </p>
                  </div>

                  <button
                    onClick={handleGodMode}
                    className="mt-6 md:mt-0 group relative px-8 py-3.5 bg-white text-black rounded-full text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden z-10"
                  >
                    Enter God Mode →
                  </button>
                </section>
              </div>
            )}
            
            {activeTab === 'pulse' && <PulsePanel />}
            {activeTab === 'shield' && <ShieldPanel />}
            {activeTab === 'hive' && <HivePanel />}
            {activeTab === 'engine' && <EnginePanel />}
            {activeTab === 'timemachine' && <TimeMachinePanel />}
            {activeTab === 'budget' && <BudgetPanel />}
            {activeTab === 'editor' && <QualityPanel />}
            
            {!['overview', 'pulse', 'shield', 'hive', 'engine', 'timemachine', 'budget', 'editor'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-black/[0.04] dark:border-white/[0.04] rounded-[2.5rem] opacity-50">
                <p className="text-theme-muted font-serif italic text-lg">Module "{tabLabel(activeTab)}" Offline</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-theme-muted/50 mt-4 font-mono">Initializing System Components...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-20 pt-16 text-center border-t border-black/[0.04] dark:border-white/[0.04]">
        <p className="text-[10px] text-theme-muted uppercase tracking-[0.2em] font-medium opacity-50">
          Neural-Port OS v2.4 — Antigravity Engineering
        </p>
      </footer>
    </div>
  )
}

function tabLabel(id: string) {
  return TABS.find(t => t.id === id)?.label || id.toUpperCase()
}
