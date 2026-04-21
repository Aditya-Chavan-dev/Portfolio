import { useState, useEffect } from 'react'
import { db } from '@/common/lib/firebase'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { ExperienceEntry } from '@/common/types/content.types'
import { Plus, Trash2, GripVertical, Save } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'

export default function AdminExperienceTab() {
  const [items, setItems] = useState<ExperienceEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [newEntry, setNewEntry] = useState<Partial<ExperienceEntry>>({ company: '', role: '', date: '', bullets: [''] })

  useEffect(() => {
    const q = query(collection(db, 'experience'), orderBy('order', 'asc'))
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as ExperienceEntry)))
      setLoading(false)
    })
  }, [])

  async function handleAdd() {
    if (!newEntry.company || !newEntry.role) return
    const order = items.length
    await addDoc(collection(db, 'experience'), { ...newEntry, order })
    setNewEntry({ company: '', role: '', date: '', bullets: [''] })
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this entry?')) {
      await deleteDoc(doc(db, 'experience', id))
    }
  }

  async function handleUpdate(id: string, updates: Partial<ExperienceEntry>) {
    await updateDoc(doc(db, 'experience', id), updates)
  }

  async function handleReorder(newOrder: ExperienceEntry[]) {
    setItems(newOrder)
    for (let i = 0; i < newOrder.length; i++) {
       if (newOrder[i].id) {
         await updateDoc(doc(db, 'experience', newOrder[i].id!), { order: i })
       }
    }
  }

  if (loading) return <div className="text-theme-muted text-sm">Initializing module...</div>

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Experience Management</h2>
        <p className="text-xs text-theme-muted">Manage your professional career timeline. Drag and drop to reorder.</p>
      </div>

      {/* NEW ENTRY FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Company"
            value={newEntry.company}
            onChange={e => setNewEntry({...newEntry, company: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
          />
          <input 
            placeholder="Role"
            value={newEntry.role}
            onChange={e => setNewEntry({...newEntry, role: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
          />
        </div>
        <input 
          placeholder="Date (e.g. 2021 — 2024)"
          value={newEntry.date}
          onChange={e => setNewEntry({...newEntry, date: e.target.value})}
          className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
        />
        <div className="space-y-2">
          <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest px-1">Bullets</p>
          {newEntry.bullets?.map((b, i) => (
            <div key={i} className="flex gap-2">
               <input 
                 value={b}
                 onChange={e => {
                   const nb = [...(newEntry.bullets || [])]
                   nb[i] = e.target.value
                   setNewEntry({...newEntry, bullets: nb})
                 }}
                 className="flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
               />
               <button 
                 onClick={() => {
                   const nb = [...(newEntry.bullets || [])]
                   nb.splice(i, 1)
                   setNewEntry({...newEntry, bullets: nb})
                 }}
                 className="p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
               >
                 <Trash2 size={16} />
               </button>
            </div>
          ))}
          <button 
            onClick={() => setNewEntry({...newEntry, bullets: [...(newEntry.bullets || []), '']})}
            className="w-full py-2 border border-dashed border-white/10 rounded-lg text-[10px] uppercase text-white/40 hover:text-white/60 transition-colors"
          >
            + Add Bullet
          </button>
        </div>
        <button 
          onClick={handleAdd}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
        >
          DEPLOY EXPERIENCE NODE
        </button>
      </div>

      {/* LIST SECTION */}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map(item => (
          <Reorder.Item 
            key={item.id} 
            value={item}
            className="group bg-[#131118] border border-white/[0.03] rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <div className="cursor-grab active:cursor-grabbing text-white/20">
              <GripVertical size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3">
                 <span className="font-bold text-white text-sm">{item.company}</span>
                 <span className="text-[10px] text-amber-500/60 uppercase font-mono tracking-wider">{item.date}</span>
               </div>
               <p className="text-xs text-white/40 mt-0.5">{item.role}</p>
            </div>

            <button 
              onClick={() => handleDelete(item.id!)}
              className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 size={16} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
