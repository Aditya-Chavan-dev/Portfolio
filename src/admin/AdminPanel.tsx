import { useState } from 'react'
import WelcomeScreenEditor from './components/WelcomeScreenEditor'
import AdminProjectsTab from './components/AdminProjectsTab'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'welcome' | 'projects'>('welcome')

  return (
    <div className="min-h-screen bg-theme-primary flex flex-col font-sans">
      {/* Admin Navbar */}
      <nav className="bg-white dark:bg-[#131315] border-b border-black/[0.04] dark:border-white/[0.04] px-8 py-4 flex gap-4 shadow-sm">
        <button 
          onClick={() => setActiveTab('welcome')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'welcome' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
          }`}
        >
          Welcome Screen
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'projects' 
              ? 'bg-amber-600 text-white shadow-md' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
          }`}
        >
          Projects Catalog
        </button>
      </nav>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'welcome' ? <WelcomeScreenEditor /> : <AdminProjectsTab />}
      </div>
    </div>
  )
}

