import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { tracedCall, tracedWrite } from '@/lib/metrics'
import { useEditMode } from '../EditModeContext'
import { useToastContext } from '@/shared/Toast'
import welcomeFallback from '@/landing-page/content.json'
import hubFallback from '@/hub/content.json'
import skillsFallback from '@/quick-access/skills/content.json'
import experienceFallback from '@/quick-access/experience/content.json'
import certificationsFallback from '@/quick-access/certifications/content.json'

const FALLBACKS: Record<string, any> = {
  welcome: welcomeFallback,
  hub: hubFallback,
  skills: skillsFallback,
  experience: experienceFallback,
  certifications: certificationsFallback,
  projects: {},
}

function setNestedPath(obj: any, path: string, value: any) {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (current[part] === undefined) {
      current[part] = !isNaN(Number(parts[i+1])) ? [] : {}
    }
    current = current[part]
  }
  current[parts[parts.length - 1]] = value
}

interface DeployModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface LockConfig {
  question: string
  answer: string
}

export default function DeployModal({ isOpen, onClose, onSuccess }: DeployModalProps) {
  const [loading, setLoading] = useState(false)
  const [lock, setLock] = useState<LockConfig | null>(null)
  const [inputAnswer, setInputAnswer] = useState('')
  const [error, setError] = useState('')
  const { draftData, clearDraft } = useEditMode()
  const { addToast } = useToastContext()

  useEffect(() => {
    if (!isOpen) return

    async function fetchLock() {
      setLoading(true)
      setError('')
      try {
        const snap = await tracedCall('firestore/adminOnly/deployLock', () => 
          getDoc(doc(db, 'adminOnly', 'deployLock'))
        )
        if (snap.exists()) {
          setLock(snap.data() as LockConfig)
        } else {
          const fallback = { question: 'What is 2+2?', answer: 'Apples' }
          await tracedWrite('firestore/adminOnly/deployLock/seed', () => 
            setDoc(doc(db, 'adminOnly', 'deployLock'), fallback)
          )
          setLock(fallback)
        }
      } catch (err) {
        console.error('Failed to fetch deploy lock:', err)
        setError('Failed to fetch security lock.')
      } finally {
        setLoading(false)
      }
    }

    fetchLock()
  }, [isOpen])

  if (!isOpen) return null

  async function executeDeploy() {
    setLoading(true)
    try {
      const updatesByDoc: Record<string, any> = {}
      
      for (const key in draftData) {
        const parts = key.split('.')
        const docId = parts[0]
        const pathInsideDoc = parts.slice(1).join('.')
        
        if (!docId || !pathInsideDoc) continue

        if (!updatesByDoc[docId]) {
          const currentSnap = await tracedCall(`firestore/live/${docId}/preDeploy`, () => 
            getDoc(doc(db, 'live', docId))
          )
          const currentData = currentSnap.data() || {}
          const fallback = FALLBACKS[docId] || {}
          
          updatesByDoc[docId] = {
            ...fallback,
            ...currentData
          }
        }
        
        setNestedPath(updatesByDoc[docId], pathInsideDoc, draftData[key])
      }

      for (const docId in updatesByDoc) {
        await tracedWrite(`firestore/live/${docId}/deploy`, () => 
          setDoc(doc(db, 'live', docId), updatesByDoc[docId], { merge: true })
        )
      }

      addToast('Changes deployed successfully!', 'success')
      clearDraft()
      onSuccess()
      onClose()
    } catch (err) {
      console.error('Deploy failed:', err)
      addToast('Deploy failed to write to database', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!lock) return

    if (inputAnswer.trim().toLowerCase() === lock.answer.trim().toLowerCase()) {
      executeDeploy()
    } else {
      setError('Incorrect answer. Deployment aborted.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#151518] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        
        <div className="flex items-center gap-2 text-amber-500">
          <span className="text-xl">⚠️</span>
          <h2 className="text-base font-bold text-theme-primary">High-Risk Operation</h2>
        </div>

        <p className="text-xs text-theme-muted leading-relaxed">
          You are about to push internal buffers live to production. Please answer the security question to unlock the deploy pipeline.
        </p>

        {loading && !lock && <p className="text-xs text-amber-500">Loading security gate...</p>}
        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

        {lock && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Question
              </label>
              <p className="text-sm font-semibold text-theme-primary">{lock.question}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Your Answer
              </label>
              <input
                type="text"
                autoFocus
                placeholder="Type absolute answer..."
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 rounded-lg text-sm bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.1] dark:border-white/[0.1] text-theme-primary focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow hover:shadow-lg hover:from-green-400 transitions-all cursor-pointer"
              >
                {loading ? 'Processing...' : 'Deploy Now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
