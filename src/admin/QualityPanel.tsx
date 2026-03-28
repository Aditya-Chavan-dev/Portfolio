import { useState, useEffect } from 'react'
import { db } from '@/common/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { scanContent } from './SpellCheckerService'
import type { QualityIssue } from './SpellCheckerService'
import { Edit3, CheckCircle, AlertTriangle, Search, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QualityPanel() {
  const [issues, setIssues] = useState<QualityIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)

  const performScan = async () => {
    setScanning(true)
    try {
      const configCol = collection(db, 'adminConfig')
      const snap = await getDocs(configCol)
      
      const allIssues: QualityIssue[] = []
      snap.forEach(doc => {
        const docIssues = scanContent(doc.id, doc.data())
        allIssues.push(...docIssues)
      })
      
      setIssues(allIssues)
    } catch (e) {
      console.error('Scan failed:', e)
    } finally {
      setScanning(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    performScan()
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-theme-muted font-mono text-xs animate-pulse uppercase tracking-widest">Calibrating Lexicon...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#18181B] border border-white/5 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Edit3 size={120} className="text-amber-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Sparkles size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-serif">Content Quality</h2>
          </div>
          <p className="text-sm text-theme-muted max-w-xl mb-8 leading-relaxed">
            Automated linguistic audit of your landing page configuration. 
            Detects typos, placeholder text, and structural anomalies.
          </p>

          <button
            onClick={performScan}
            disabled={scanning}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap"
          >
            <Search size={16} />
            {scanning ? 'Scanning...' : 'Rerun Quality Audit'}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {issues.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-50 flex flex-col items-center">
            <CheckCircle size={32} className="text-emerald-500 mb-4 opacity-40" />
            <p className="text-theme-muted font-serif italic text-sm">Perfect Content Integrity. No anomalies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2 mb-2 px-2">
               <AlertTriangle size={16} className="text-amber-500" />
               <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-theme-muted">Detected Anomalies ({issues.length})</h3>
            </div>
            
            <AnimatePresence>
              {issues.map((issue, i) => (
                <motion.div
                  key={`${issue.docId}-${issue.field}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#09090B] border border-white/5 p-5 rounded-2xl flex items-start justify-between group hover:border-amber-500/30 transition-all gap-4"
                >
                  <div className="flex gap-4">
                    <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                      issue.severity === 'high' ? 'bg-red-500 shadow-lg shadow-red-500/50' : 
                      issue.severity === 'medium' ? 'bg-amber-500 shadow-lg shadow-amber-500/50' : 'bg-blue-500'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-theme-muted font-mono bg-white/5 px-2 py-0.5 rounded uppercase">{issue.docId}.{issue.field}</span>
                        <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest">{issue.severity} priority</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-200 mb-1">{issue.issue}</h4>
                      <p className="text-xs text-theme-muted italic line-clamp-2 leading-relaxed">"{issue.text}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}



