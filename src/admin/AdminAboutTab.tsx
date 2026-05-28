import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { useToast } from '@/common/hooks/useToast'
import { Save, User, Shield, Target, Zap, Activity } from 'lucide-react'

interface AboutContent {
  bioParagraphs: string[];
  experienceAge: string;
  globalDeployments: string;
  systemCommits: string;
  designPhilosophy: string;
  offKernel: string;
}

const DEFAULT_ABOUT: AboutContent = {
  bioParagraphs: [
    "I am a digital architect operating at the intersection of aesthetic intent and engineering rigor. With over a decade of deployment history, I specialize in building interfaces that feel alive, fluid, and spatially aware.",
    "My philosophy follows a strict logic: complexity should be handled by the machine, so the user experiences only simplicity. I optimize for the \"Aha!\" moment—the exact frame where a user realizes they are interacting with a premium architectural system."
  ],
  experienceAge: "10Y+",
  globalDeployments: "150+",
  systemCommits: "24K+",
  designPhilosophy: "I believe in the \"Nyquist Validation\" of UI—testing every interaction at its threshold to ensure zero friction. My layouts are built on spatial grids, ensuring mathematical harmony across any viewport.",
  offKernel: "When I'm not architecting systems, I'm likely exploring automotive design, studying mid-century modern furniture, or experimenting with generative art in GLSL."
}

export default function AdminAboutTab() {
  const [content, setContent] = useState<AboutContent>(DEFAULT_ABOUT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    async function loadAbout() {
      try {
        const snap = await getDoc(doc(db, 'live', 'about'))
        if (snap.exists()) {
          setContent(snap.data() as AboutContent)
        }
      } catch (err) {
        console.warn('Failed to load about data from Firestore:', err)
      } finally {
        setLoading(false)
      }
    }
    loadAbout()
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      await setDoc(doc(db, 'live', 'about'), content)
      addToast('Personnel profile updated on the live edge.', 'success')
    } catch (err: any) {
      console.error('Failed to save about data:', err)
      addToast(err.message || 'Failed to sync personnel profile.', 'error')
    } finally {
      setSaving(false)
    }
  }

  function handleBioChange(index: number, val: string) {
    const updatedBio = [...content.bioParagraphs]
    updatedBio[index] = val
    setContent({ ...content, bioParagraphs: updatedBio })
  }

  function addBioParagraph() {
    setContent({ ...content, bioParagraphs: [...content.bioParagraphs, ''] })
  }

  function removeBioParagraph(index: number) {
    const updatedBio = content.bioParagraphs.filter((_, idx) => idx !== index)
    setContent({ ...content, bioParagraphs: updatedBio })
  }

  if (loading) return <div className="text-theme-muted text-sm px-6 py-12">Calibrating personnel files...</div>

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
             Personnel Registry
             <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">Admin OS Status</span>
          </h2>
          <p className="text-xs text-theme-muted">Manage your bio parameters, historical system metrics, and operational philosophies.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-extrabold rounded-lg text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
        >
          <Save size={14} />
          {saving ? 'SYNCING...' : 'SYNC CONFIG'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Details & Bio */}
        <div className="md:col-span-2 bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <User size={16} className="text-amber-500" />
            Personnel Bio & Mission
          </h3>
          
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 block">Bio Paragraphs</label>
            {content.bioParagraphs.map((para, index) => (
              <div key={index} className="flex gap-3 items-start">
                <textarea
                  value={para}
                  onChange={(e) => handleBioChange(index, e.target.value)}
                  rows={3}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none resize-none"
                  placeholder="Enter paragraph details..."
                />
                <button
                  onClick={() => removeBioParagraph(index)}
                  className="px-3 py-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-white/40 font-mono text-xs rounded-lg transition-all"
                  title="Remove paragraph"
                >
                  X
                </button>
              </div>
            ))}
            
            <button
              onClick={addBioParagraph}
              className="mt-2 text-[10px] uppercase font-bold text-amber-500 hover:text-amber-400 transition-colors"
            >
              + Add Bio Paragraph
            </button>
          </div>
        </div>

        {/* Professional Metrics */}
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 md:p-8 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-6">
              <Activity size={16} className="text-amber-500" />
              Verified Metrics
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Experience Age</label>
                <input 
                  value={content.experienceAge}
                  onChange={(e) => setContent({ ...content, experienceAge: e.target.value })}
                  placeholder="e.g. 10Y+"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">Global Deployments</label>
                <input 
                  value={content.globalDeployments}
                  onChange={(e) => setContent({ ...content, globalDeployments: e.target.value })}
                  placeholder="e.g. 150+"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-white/30 tracking-widest ml-1 mb-2 block">System Commits</label>
                <input 
                  value={content.systemCommits}
                  onChange={(e) => setContent({ ...content, systemCommits: e.target.value })}
                  placeholder="e.g. 24K+"
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Shield size={16} className="text-amber-500" />
            Design Philosophy
          </h3>
          <textarea
            value={content.designPhilosophy}
            onChange={(e) => setContent({ ...content, designPhilosophy: e.target.value })}
            rows={4}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none resize-none"
            placeholder="Describe design systems execution..."
          />
        </div>

        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Target size={16} className="text-amber-500" />
            Off Kernel Pursuits
          </h3>
          <textarea
            value={content.offKernel}
            onChange={(e) => setContent({ ...content, offKernel: e.target.value })}
            rows={4}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm focus:border-amber-500/50 outline-none resize-none"
            placeholder="Describe hobbies or creative avenues..."
          />
        </div>
      </div>
    </div>
  )
}
