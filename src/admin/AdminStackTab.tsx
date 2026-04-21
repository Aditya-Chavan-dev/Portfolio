import { useState, useEffect } from 'react'
import { db } from '@/common/lib/firebase'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { TechStackEntry } from '@/common/types/content.types'
import { Plus, Trash2, GripVertical, Terminal, Layout, Server, Shield } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'

const ICON_MAP: Record<string, any> = {
  "Visual Architecture": Layout,
  "Core Engineering": Terminal,
  "System State": Server,
  "Ops & Scale": Shield
}

export default function AdminStackTab() {
  const [items, setItems] = useState<TechStackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [newEntry, setNewEntry] = useState<Partial<TechStackEntry>>({ category: '', tools: [''] })

  useEffect(() => {
    const q = query(collection(db, 'techstack'), orderBy('order', 'asc'))
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as TechStackEntry)))
      setLoading(false)
    })
  }, [])

  async function handleAdd() {
    if (!newEntry.category) return
    const order = items.length
    await addDoc(collection(db, 'techstack'), { ...newEntry, order })
    setNewEntry({ category: '', tools: [''] })
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this category?')) {
      await deleteDoc(doc(db, 'techstack', id))
    }
  }

  async function handleReorder(newOrder: TechStackEntry[]) {
    setItems(newOrder)
    for (let i = 0; i < newOrder.length; i++) {
       if (newOrder[i].id) {
         await updateDoc(doc(db, 'techstack', newOrder[i].id!), { order: i })
       }
    }
  }

  if (loading) return <div className="text-theme-muted text-sm">Loading visual engine...</div>

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Battle-Tested Stack</h2>
        <p className="text-xs text-theme-muted">Manage the technology categories and tools displayed in your arsenal.</p>
      </div>

      {/* NEW ENTRY FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <input 
          placeholder="Category Name (e.g. Visual Architecture)"
          value={newEntry.category}
          onChange={e => setNewEntry({...newEntry, category: e.target.value})}
          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
        />
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest px-1">Tools / Languages</p>
          {newEntry.tools?.map((t, i) => (
            <div key={i} className="flex gap-2">
               <input 
                 value={t}
                 onChange={e => {
                   const nt = [...(newEntry.tools || [])]
                   nt[i] = e.target.value
                   setNewEntry({...newEntry, tools: nt})
                 }}
                 className="flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
               />
               <button 
                 onClick={() => {
                   const nt = [...(newEntry.tools || [])]
                   nt.splice(i, 1)
                   setNewEntry({...newEntry, tools: nt})
                 }}
                 className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
               >
                 <Trash2 size={16} />
               </button>
            </div>
          ))}
          <button 
            onClick={() => setNewEntry({...newEntry, tools: [...(newEntry.tools || []), '']})}
            className="w-full py-2 border border-dashed border-white/10 rounded-lg text-[10px] uppercase text-white/40 hover:text-white/60 transition-colors"
          >
            + Add Tool
          </button>
        </div>
        <button 
          onClick={handleAdd}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
        >
          ENCODE STACK MODULE
        </button>
      </div>

      {/* LIST SECTION */}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
        {items.map(item => {
          const Icon = ICON_MAP[item.category] || Terminal;
          return (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className="bg-[#131118] border border-white/[0.03] rounded-xl p-6 flex items-start gap-6 hover:border-white/10 transition-colors relative"
            >
              <div className="cursor-grab active:cursor-grabbing text-white/10 mt-1">
                <GripVertical size={20} />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/5 rounded-lg text-amber-500">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-white tracking-tight">{item.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] text-white/60">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleDelete(item.id!)}
                className="p-2 text-white/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </Reorder.Item>
          )
        })}
      </Reorder.Group>
    </div>
  )
}
