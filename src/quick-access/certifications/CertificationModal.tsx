import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CertificationItem } from './certifications.types'

interface Props {
  item: CertificationItem
  onClose: () => void
}

export function CertificationModal({ item, onClose }: Props) {
  useEffect(() => {
    window.history.pushState({ modal: true }, '', '')
    const handlePop = () => onClose()
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [onClose])

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      >
        <motion.div 
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-[#131315] rounded-2xl w-full max-w-xl overflow-hidden border border-black/[0.04] dark:border-white/[0.04] shadow-xl flex flex-col font-sans"
        >
          {/* IMAGE HERO */}
          <div className="relative aspect-[16/10] bg-black/5 dark:bg-white/5 flex items-center justify-center overflow-hidden border-b border-black/[0.03] dark:border-white/[0.03]">
            <img 
              src={item.imageUrl} 
              alt={`${item.name} certificate`}
              className="object-contain w-full h-full max-h-[400px]"
            />
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-sm transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* DETAILS */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.issuer} · {item.date}</p>
            </div>

            {item.description && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider">ABOUT</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>
            )}

            {item.tags.length > 0 && (
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-wider">SKILLS LEARNED</h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-black/[0.04] dark:bg-white/[0.04] rounded text-xs font-medium text-gray-700 dark:text-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.credentialUrl && (
              <div className="mt-2 pt-4 border-t border-black/[0.03] dark:border-white/[0.03]">
                <a 
                  href={item.credentialUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                >
                  View Credential Verification →
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
