import { useState, useEffect } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '@/common/lib/firebase'
import { tracedCall } from './MetricsOrchestrator'
import { SettingsSchema } from './ValidationSchemas'
import { useToastContext } from '@/common/shared/Toast'
import { Settings, CheckCircle2, XCircle, FileText, UploadCloud } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsPanel() {
  const [isOpenToWork, setIsOpenToWork] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { addToast } = useToastContext()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'adminConfig', 'status'), (snap) => {
      if (snap.exists()) {
        setIsOpenToWork(snap.data().isOpenToWork || false)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const handleToggle = async () => {
    setSaving(true)
    try {
      const newValue = !isOpenToWork
      // Guard: Schema validation (fail-safe)
      const validated = SettingsSchema.parse({ isOpenToWork: newValue })
      
      // Dual-track: Wrapping functionality in telemetry trace
      await tracedCall('settings/openToWork/update', () => 
        setDoc(doc(db, 'adminConfig', 'status'), validated, { merge: true })
      )
      addToast(`Status updated to ${newValue ? 'Active' : 'Offline'}`, 'success')
    } catch (e: any) {
      console.error('[SettingsPanel] Update failed:', e)
      addToast(e.message || 'Settings update failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Guard: Failsafe 1 (Type check)
    if (file.type !== 'application/pdf') {
      addToast('Invalid file format. PDFs only required.', 'error')
      e.target.value = ''
      return
    }

    // Guard: Failsafe 2 (Size limit < 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast('File too large. Resume must remain under 5MB.', 'error')
      e.target.value = ''
      return
    }

    setUploading(true)
    try {
      const storageRef = ref(storage, 'resume/active_resume.pdf')

      // Dual-track: Trace the upload payload via Pulse Telemetry
      await tracedCall('storage/resume/upload', () => 
        uploadBytes(storageRef, file)
      )

      addToast('Resume artifact updated successfully on the edge.', 'success')
    } catch (error: any) {
      console.error('[SettingsPanel] Upload blocked:', error)
      addToast(error.message || 'Upload transmission failed', 'error')
    } finally {
      setUploading(false)
      e.target.value = '' // reset input
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-theme-muted font-mono text-xs animate-pulse uppercase tracking-widest">Initializing Settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
          <Settings size={64} className="text-amber-500" />
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">Global Settings</h2>
        <p className="text-sm text-theme-muted mb-8 max-w-xl">
          Core availability and routing overrides. Changes reflect instantly on the public edge and emit telemetry traces to the Health Pulse monitor.
        </p>

        <div className="space-y-4 relative z-10">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Available for Hire
                {isOpenToWork ? (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    <CheckCircle2 size={12} /> Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                    <XCircle size={12} /> Offline
                  </span>
                )}
              </h3>
              <p className="text-sm text-theme-muted mt-1">Displays the hiring badge on the main landing portfolio.</p>
            </div>
            
            <button
              onClick={handleToggle}
              disabled={saving || uploading}
              className={`relative inline-flex h-7 w-14 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isOpenToWork ? 'bg-amber-500' : 'bg-[#2D2B3D]'
              } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 ${
                  isOpenToWork ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Public Resume PDF
                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  <FileText size={12} /> Active Doc
                </span>
              </h3>
              <p className="text-sm text-theme-muted mt-1 max-w-sm">
                Upload a new version. Overwrites the existing file so public links never break. Must be PDF under 5MB.
              </p>
            </div>
            
            <div className="relative flex-shrink-0">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploading || saving}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className={`px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                uploading 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                  : 'bg-white text-black hover:bg-gray-200 border border-transparent'
              }`}>
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                    Uploading Pipeline...
                  </>
                ) : (
                  <>
                    <UploadCloud size={16} /> Update Artifact
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
