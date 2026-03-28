import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { tracedCall, tracedWrite } from './MetricsOrchestrator'
import { LandingPageSchema as WelcomeConfigSchema } from './ValidationSchemas'
import type { WelcomeConfig } from '@/landing-page/landing.types'
import { Reorder } from 'framer-motion'
import { GripVertical, Star, Trash2 } from 'lucide-react'

function validateInput(schema: any, data: any, _label: string) {
  return schema.parse(data);
}

interface DragItem {
  id: string
  text: string
}

export default function WelcomeScreenEditor() {
  const [items, setItems] = useState<DragItem[]>([])
  const [highlightId, setHighlightId] = useState<string | string[]>('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch configuration on Mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'adminConfig', 'welcomeScreen')
        const snap = await tracedCall('firestore/adminConfig/welcomeScreen/get', () => 
          getDoc(docRef)
        )
        if (snap.exists()) {
          const data = snap.data() as WelcomeConfig
          setName(data.name || 'Aditya Chavan')
          const dialogueItems = (data.dialogue || []).map((text, i) => ({ id: `row-${i}-${Date.now()}-${Math.random()}`, text }))
          setItems(dialogueItems)
          
          const hIndex = data.highlightIndex ?? 0
          if (Array.isArray(hIndex)) {
            setHighlightId(hIndex.map(idx => dialogueItems[idx]?.id).filter(Boolean) as string[])
          } else if (typeof hIndex === 'number' && hIndex >= 0 && hIndex < dialogueItems.length) {
            setHighlightId(dialogueItems[hIndex].id)
          } else {
            setHighlightId('')
          }
        }
      } catch (e) {
        console.error('Error fetching welcome config:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const dialogue = items.map(item => item.text)
      
      let computedHighlight: number | number[] = 0
      if (Array.isArray(highlightId)) {
        computedHighlight = highlightId.map(id => items.findIndex(i => i.id === id)).filter(idx => idx >= 0)
      } else if (highlightId) {
        computedHighlight = items.findIndex(i => i.id === highlightId)
        if (computedHighlight < 0) computedHighlight = 0
      }

      // SHIELD: Validate before write
      const validated = validateInput(WelcomeConfigSchema, {
        hero: { title: name, subtitle: dialogue.join(' '), ctaText: 'View Work' },
        about: { bio: dialogue.join(' '), tags: [] },
        metadata: { author: name }
      }, 'welcome_editor_save')

      const docRef = doc(db, 'adminConfig', 'welcomeScreen')
      await tracedWrite('firestore/adminConfig/welcomeScreen/update', () => 
        updateDoc(docRef, validated)
      )
    } catch (e: any) {
      console.error('Error saving config:', e)
    } finally {
      setSaving(false)
    }
  }

  const addLine = () => {
    setItems(prev => [...prev, { id: `row-new-${Date.now()}`, text: '' }])
  }

  const removeLine = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
    setHighlightId(prev => {
      if (Array.isArray(prev)) return prev.filter(itemId => itemId !== id)
      return prev === id ? '' : prev
    })
  }

  const updateLine = (id: string, text: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, text } : item))
  }

  const moveHighlight = (id: string) => {
    setHighlightId(prev => {
      if (Array.isArray(prev)) {
        return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      }
      return prev === id ? '' : id
    })
  }

  if (loading) {
    return <div className="p-8 text-gray-400">Loading Configuration…</div>
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#121212] text-white">
      
      {/* ─── List Editor ──────────────────────────────────────────────── */}
      <div className="flex-1 p-8 border-r border-[#242424] flex flex-col h-full">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Welcome Screen Dialogue</h2>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-sm font-medium transition-colors cursor-pointer flex items-center"
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save & Publish'}
            </button>
          </div>
        </div>

        {/* Drag Reorder Group */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
            {items.map((item) => {
              const isHighlight = Array.isArray(highlightId) ? highlightId.includes(item.id) : item.id === highlightId
              return (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  className="flex items-center space-x-3 bg-[#1A1A1A] p-3 rounded border border-[#2A2A2A]"
                >
                  <div className="cursor-grab text-gray-500 hover:text-gray-400">
                    <GripVertical size={18} />
                  </div>

                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateLine(item.id, e.target.value)}
                    placeholder="[Paragraph Break]"
                    className="flex-1 bg-transparent border-0 focus:ring-0 text-sm focus:outline-none placeholder-gray-600"
                  />

                  {/* Highlight Star */}
                  <button
                    onClick={() => moveHighlight(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isHighlight ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-500'
                    }`}
                    title="Highlight this line (Batman Yellow)"
                  >
                    <Star size={18} fill={isHighlight ? 'currentColor' : 'none'} />
                  </button>

                  <button
                    onClick={() => removeLine(item.id)}
                    className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                    title="Delete line"
                  >
                    <Trash2 size={18} />
                  </button>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
          
          <button
            onClick={addLine}
            className="w-full py-2 border border-dashed border-[#333333] hover:border-gray-600 rounded text-sm text-gray-400 hover:text-gray-200 transition-colors cursor-pointer mt-4"
          >
            + Add Line
          </button>
        </div>
      </div>

      {/* ─── Live Preview Pane ─────────────────────────────────────────── */}
      <div className="w-full md:w-[480px] bg-[#0A0A0A] p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-[#242424] overflow-hidden relative">
        <p className="text-xs text-gray-600 mb-4 absolute top-4 right-4">Live Static Preview</p>
        <div className="max-w-[400px] text-center w-full">
          <h1 className="text-[40px] font-light tracking-[0.06em] text-[#F5F5F5] mb-[24px]">
            {name}
          </h1>
          <div className="space-y-[1px] text-center">
            {items.map((item) => {
              const isHighlight = Array.isArray(highlightId) ? highlightId.includes(item.id) : item.id === highlightId
              if (item.text.trim() === '') return <div key={item.id} className="h-4" /> // Paragraph break spacer

              return (
                <p
                  key={item.id}
                  className={`text-[12px] leading-[1.6] ${
                    isHighlight ? 'text-[#FFFF00]' : 'text-[#FFFFFF]'
                  }`}
                >
                  {item.text}
                </p>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}



