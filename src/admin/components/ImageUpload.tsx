import { useState, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/shared/firebase'
import { useEditMode } from '@/admin/EditModeContext'
import { useToastContext } from '@/shared/Toast'

interface ImageUploadProps {
  id: string
  currentValue: string | undefined
  className?: string
  children?: React.ReactNode
}

/**
 * ImageUpload wrapper for God Mode.
 * Enables clicking an image to upload a replacement to Firebase Storage.
 * Updates the local draft state immediately.
 */
export default function ImageUpload({ id, className = '', children }: Omit<ImageUploadProps, 'currentValue'>) {
  const { mode, updateDraft, draftData } = useEditMode()
  const { addToast } = useToastContext()
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isEditing = mode === 'edit'

  if (!isEditing) {
    return <div className={className}>{children}</div>
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Basic validation
    if (!file.type.startsWith('image/')) {
       addToast('Please select an image file', 'error')
       return
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image must be under 5MB', 'error')
      return
    }

    setUploading(true)
    // Upload to a dedicated uploads folder
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`)

    try {
      const snapshot = await uploadBytes(storageRef, file)
      const url = await getDownloadURL(snapshot.ref)
      
      // Update the God Mode draft state
      updateDraft(id, url)
      addToast('Image uploaded to draft', 'success')
    } catch (err: any) {
      console.error('Upload error:', err)
      addToast(err?.message || 'Upload failed', 'error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={(e) => {
        if (isEditing) {
          e.stopPropagation()
          fileInputRef.current?.click()
        }
      }}
    >
      {/* 
        This is tricky: we want to render the children but they might expect 
        the live URL. We rely on the parent component to use the Draft URL 
        via its own useEditMode hook if it wants to show the live preview, 
        OR we can inject it here. For simplicity, we assume the children 
        are standard IMGs that will be replaced by the parent once updateDraft hits.
      */}
      {children}
      
      {/* Upload Overlay (Only visible in Edit Mode) */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full z-20">
        {uploading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-xl">📷</span>
            <span className="text-[10px] font-bold text-white uppercase tracking-wider mt-1">Change Photo</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Draft Indicator (Gold dot) */}
      {draftData[id] && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-black shadow-sm flex items-center justify-center z-30 animate-pulse">
          <span className="text-[8px] text-white">●</span>
        </div>
      )}
    </div>
  )
}
