import { useState } from 'react'
import { useAdminProjects } from '@/common/hooks/useAdminProjects'
import { Plus, Trash2, GripVertical, ExternalLink, Github, Star, Check, X, RefreshCw, Layers } from 'lucide-react'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { ProjectEntry } from '@/common/types/content.types'

export default function AdminProjectsTab() {
  const { items, loading, addProject, updateProject, deleteProject, updateOrder } = useAdminProjects()
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ProjectEntry>>({
    title: '',
    description: '',
    image: '',
    tags: [],
    repoUrl: '',
    liveUrl: '',
    featured: false
  })
  const [importUrl, setImportUrl] = useState('')
  const [importing, setImporting] = useState(false)

  async function handleImport() {
    if (!importUrl) return
    setImporting(true)
    try {
      // Extract owner/repo from URL
      const match = importUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      if (match) {
        const [, owner, repo] = match
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        const data = await res.json()
        setFormData({
          ...formData,
          title: data.name,
          description: data.description || '',
          repoUrl: importUrl,
          tags: data.topics || []
        })
      }
    } catch (err) {
      console.error('Failed to import metadata:', err)
    } finally {
      setImporting(false)
    }
  }

  async function handleSubmit() {
    if (editingId) {
      await updateProject(editingId, formData)
      setEditingId(null)
    } else {
      await addProject(formData)
      setIsAdding(false)
    }
    resetForm()
  }

  function resetForm() {
    setFormData({ title: '', description: '', image: '', tags: [], repoUrl: '', liveUrl: '', featured: false })
    setImportUrl('')
  }

  if (loading) return <div className="text-theme-muted text-sm px-6 py-12">Calibrating project engine...</div>

  return (
    <div className="space-y-8 max-w-5xl pb-20">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
             Project Reservoir
             <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">Digital Architect Mode</span>
          </h2>
          <p className="text-xs text-theme-muted">Manage your flagship deployments and legacy archive manually for maximum security.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
        >
          <Plus size={14} /> Initialize Project
        </button>
      </div>

      {/* ADD/EDIT MODAL-LIKE FORM */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-[#1a1a24] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl relative z-10"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">
                {editingId ? 'Modify System Build' : 'New Project Schema'}
              </h3>
              <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* GitHub Import Helper */}
            {!editingId && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Metadata Autocompleter (GitHub)</p>
                <div className="flex gap-2">
                  <input 
                    placeholder="https://github.com/owner/repo"
                    value={importUrl}
                    onChange={e => setImportUrl(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg p-2 text-xs focus:border-amber-500/50 outline-none"
                  />
                  <button 
                    onClick={handleImport}
                    disabled={importing}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] uppercase font-bold transition-all disabled:opacity-50"
                  >
                    {importing ? <RefreshCw size={14} className="animate-spin" /> : 'Fetch'}
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Project Identity</label>
                  <input 
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
                <div>
                   <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Deep Description</label>
                   <textarea 
                    placeholder="What did you architect?"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none resize-none"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Visual URI (Unsplash/Imgur)</label>
                  <input 
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Source Link</label>
                     <input 
                       placeholder="GitHub URL"
                       value={formData.repoUrl}
                       onChange={e => setFormData({...formData, repoUrl: e.target.value})}
                       className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                     />
                   </div>
                   <div>
                     <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Deployment Link</label>
                     <input 
                       placeholder="Live URL"
                       value={formData.liveUrl}
                       onChange={e => setFormData({...formData, liveUrl: e.target.value})}
                       className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                     />
                   </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">System Tags (Comma separated)</label>
                  <input 
                    placeholder="React, Framer, Rust"
                    value={formData.tags?.join(', ')}
                    onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(t => t.trim())})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div 
                  onClick={() => setFormData({...formData, featured: !formData.featured})}
                  className={`w-10 h-5 rounded-full transition-all relative ${formData.featured ? 'bg-amber-500' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 group-hover:text-amber-500 transition-colors">Flagship Project (Featured)</span>
              </label>

              <div className="flex-1" />

              <button 
                onClick={handleSubmit}
                className="px-10 py-3 bg-amber-500 hover:bg-amber-600 text-black font-extrabold rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
              >
                DEPLOY SCHEMA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIST SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[10px] uppercase font-bold text-white/30 tracking-[0.3em]">Active Portfolio Graph</h3>
           <div className="flex gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[10px] text-white/40 font-mono">Featured: {items.filter(i => i.featured).length}</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] text-white/40 font-mono">Archived: {items.filter(i => !i.featured).length}</span>
             </div>
           </div>
        </div>

        <Reorder.Group axis="y" values={items} onReorder={updateOrder} className="space-y-2">
          {items.map((item, idx) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className={`bg-[#131118] border rounded-xl p-4 flex items-center gap-6 hover:border-white/10 transition-colors group relative overflow-hidden ${item.featured ? 'border-amber-500/20' : 'border-white/5'}`}
            >
              {item.featured && (
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              )}
              
              <div className="cursor-grab active:cursor-grabbing text-white/10 group-hover:text-amber-500/40 transition-colors">
                <GripVertical size={18} />
              </div>

              <div className="w-16 h-10 rounded bg-black/40 overflow-hidden border border-white/5 flex-shrink-0">
                 <img src={item.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                  {item.featured && <Star size={10} className="text-amber-500 fill-amber-500" />}
                </div>
                <p className="text-[10px] text-theme-muted truncate max-w-md">{item.description}</p>
              </div>

              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1">
                   {item.repoUrl && <Github size={12} className="text-white/20" />}
                   {item.liveUrl && <ExternalLink size={12} className="text-white/20" />}
                 </div>
                 
                 <div className="flex border border-white/5 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingId(item.id!);
                        setFormData(item);
                      }}
                      className="p-2 bg-white/5 hover:bg-amber-500 hover:text-black transition-colors"
                    >
                      <Layers size={14} />
                    </button>
                    <button 
                      onClick={() => confirm('Purge project from reservoir?') && deleteProject(item.id!)}
                      className="p-2 bg-white/5 hover:bg-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                 </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {items.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-2xl opacity-40">
            <Layers size={40} strokeWidth={1} className="mb-4" />
            <p className="font-hud text-[10px] tracking-widest uppercase">Reservoir Empty. Initialize first project build.</p>
          </div>
        )}
      </div>
    </div>
  )
}
