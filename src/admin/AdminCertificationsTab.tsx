import { useState, useEffect } from 'react'
import { db } from '@/common/lib/firebase'
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { CertificationEntry } from '@/common/types/content.types'
import { Plus, Trash2, GripVertical, ExternalLink } from 'lucide-react'
import { motion, Reorder } from 'framer-motion'

export default function AdminCertificationsTab() {
  const [items, setItems] = useState<CertificationEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [newEntry, setNewEntry] = useState<Partial<CertificationEntry>>({ title: '', issuer: '', date: '', icon: '' })

  useEffect(() => {
    const q = query(collection(db, 'certifications'), orderBy('order', 'asc'))
    return onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as CertificationEntry)))
      setLoading(false)
    })
  }, [])

  async function handleAdd() {
    if (!newEntry.title || !newEntry.issuer) return
    const order = items.length
    await addDoc(collection(db, 'certifications'), { ...newEntry, order })
    setNewEntry({ title: '', issuer: '', date: '', icon: '' })
  }

  async function handleDelete(id: string) {
    if (confirm('Delete this certificate?')) {
      await deleteDoc(doc(db, 'certifications', id))
    }
  }

  async function handleReorder(newOrder: CertificationEntry[]) {
    setItems(newOrder)
    for (let i = 0; i < newOrder.length; i++) {
       if (newOrder[i].id) {
         await updateDoc(doc(db, 'certifications', newOrder[i].id!), { order: i })
       }
    }
  }

  if (loading) return <div className="text-theme-muted text-sm">Validating modules...</div>

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-white">Certification Repository</h2>
        <p className="text-xs text-theme-muted">Manage your verified badges and credentials.</p>
      </div>

      {/* NEW ENTRY FORM */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Certificate Title"
            value={newEntry.title}
            onChange={e => setNewEntry({...newEntry, title: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none placeholder:text-white/20"
          />
          <input 
            placeholder="Issuer"
            value={newEntry.issuer}
            onChange={e => setNewEntry({...newEntry, issuer: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none placeholder:text-white/20"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Year (e.g. 2023)"
            value={newEntry.date}
            onChange={e => setNewEntry({...newEntry, date: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none placeholder:text-white/20"
          />
          <input 
            placeholder="Icon URL (SVG preferred)"
            value={newEntry.icon}
            onChange={e => setNewEntry({...newEntry, icon: e.target.value})}
            className="bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none placeholder:text-white/20"
          />
        </div>
        <button 
          onClick={handleAdd}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20"
        >
          COMMIT CREDENTIAL
        </button>
      </div>

      {/* LIST SECTION */}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(item => (
          <Reorder.Item 
            key={item.id} 
            value={item}
            className="group bg-[#131118] border border-white/[0.03] rounded-xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors"
          >
            <div className="cursor-grab active:cursor-grabbing text-white/10 group-hover:text-white/30 transition-colors">
              <GripVertical size={16} />
            </div>

            <div className="w-10 h-10 bg-white/10 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
               {item.icon ? (
                 <img src={item.icon} alt="" className="w-6 h-6 object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
               ) : (
                 <ExternalLink size={14} className="text-white/20" />
               )}
            </div>
            
            <div className="flex-1 min-w-0">
               <h3 className="font-bold text-white text-[13px] leading-tight truncate">{item.title}</h3>
               <p className="text-[10px] text-white/30 truncate mt-1 flex items-center gap-2">
                 {item.issuer} • {item.date}
               </p>
            </div>

            <button 
              onClick={() => handleDelete(item.id!)}
              className="p-2 text-white/10 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
            >
              <Trash2 size={16} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
