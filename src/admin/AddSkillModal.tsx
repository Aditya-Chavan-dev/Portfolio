import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface AddSkillModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (skill: { id: string; name: string; iconUrl: string; iconSource: string; level: string }) => void
}

/**
 * Common aliases → official Devicon folder slugs.
 * Devicon uses very specific folder names (e.g., "nodejs", not "node").
 */
const DEVICON_ALIASES: Record<string, string> = {
  'node': 'nodejs',
  'js': 'javascript',
  'ts': 'typescript',
  'py': 'python',
  'rb': 'ruby',
  'postgres': 'postgresql',
  'pg': 'postgresql',
  'mongo': 'mongodb',
  'vue': 'vuejs',
  'c#': 'csharp',
  'c++': 'cplusplus',
  'cpp': 'cplusplus',
  'objective-c': 'objectivec',
  'obj-c': 'objectivec',
  'aws': 'amazonwebservices',
  'gcp': 'googlecloud',
  'k8s': 'kubernetes',
  'tf': 'terraform',
  'react native': 'react',
  'reactnative': 'react',
  'tailwind': 'tailwindcss',
  'tw': 'tailwindcss',
  'next': 'nextjs',
  'nuxt': 'nuxtjs',
  'express': 'express',
  'nest': 'nestjs',
  'angular': 'angularjs',
  'svelte': 'svelte',
  'sass': 'sass',
  'redis': 'redis',
  'mysql': 'mysql',
  'sqlite': 'sqlite',
  'graphql': 'graphql',
  'rust': 'rust',
  'go': 'go',
  'golang': 'go',
  'swift': 'swift',
  'kotlin': 'kotlin',
  'java': 'java',
  'dart': 'dart',
  'flutter': 'flutter',
  'electron': 'electron',
  'vscode': 'vscode',
  'vim': 'vim',
  'linux': 'linux',
  'ubuntu': 'ubuntu',
  'nginx': 'nginx',
  'apache': 'apache',
  'jest': 'jest',
  'webpack': 'webpack',
  'vite': 'vitejs',
  'babel': 'babel',
  'eslint': 'eslint',
}

/**
 * Converts a skill name to a Devicon CDN slug.
 * First checks the alias map, then falls back to slug generation.
 */
function toDeviconSlug(name: string): string {
  const key = name.toLowerCase().trim()
  if (DEVICON_ALIASES[key]) return DEVICON_ALIASES[key]

  return key
    .replace(/\.js$/i, 'js')
    .replace(/\./g, '')
    .replace(/\s+/g, '')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
}

function buildIconUrl(slug: string, variant: string = 'original'): string {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`
}

export default function AddSkillModal({ isOpen, onClose, onAdd }: AddSkillModalProps) {
  const [name, setName] = useState('')
  const [iconUrl, setIconUrl] = useState('')
  const [iconLoaded, setIconLoaded] = useState(false)
  const [iconError, setIconError] = useState(false)

  // Auto-generate icon URL as user types
  useEffect(() => {
    if (!name.trim()) {
      setIconUrl('')
      setIconLoaded(false)
      setIconError(false)
      return
    }

    const slug = toDeviconSlug(name)
    const url = buildIconUrl(slug)
    setIconUrl(url)
    setIconLoaded(false)
    setIconError(false)
  }, [name])

  function handleIconLoadError() {
    // Try -plain variant
    const slug = toDeviconSlug(name)
    const plainUrl = buildIconUrl(slug, 'plain')
    if (iconUrl !== plainUrl) {
      setIconUrl(plainUrl)
    } else {
      setIconError(true)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    onAdd({
      id: `skill-${Date.now()}`,
      name: name.trim(),
      iconUrl: iconError ? '' : iconUrl,
      iconSource: 'devicons',
      level: 'Intermediate',
    })
    setName('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1A1A] rounded-xl p-6 w-[380px] border border-[#2A2A2A] shadow-2xl"
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-white font-semibold text-sm">Add New Skill</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Skill Name Input */}
        <label className="block text-xs text-gray-400 mb-1.5">Skill Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. React, Docker, Python..."
          className="w-full bg-[#0F0F0F] border border-[#333] rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
          autoFocus
        />

        {/* Live Icon Preview */}
        <div className="mt-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#0F0F0F] border border-[#333] flex items-center justify-center shrink-0">
            {iconUrl && !iconError ? (
              <img
                src={iconUrl}
                alt={name}
                className="w-8 h-8 object-contain"
                onLoad={() => setIconLoaded(true)}
                onError={handleIconLoadError}
              />
            ) : iconError ? (
              <span className="text-xs text-gray-600">?</span>
            ) : (
              <span className="text-xs text-gray-600">Icon</span>
            )}
          </div>
          <div className="text-xs text-gray-500 flex-1">
            {!name.trim() && 'Type a skill name to preview its icon'}
            {name.trim() && !iconError && iconLoaded && (
              <span className="text-green-400">✓ Icon found from Devicon</span>
            )}
            {name.trim() && !iconError && !iconLoaded && (
              <span className="text-gray-400">Loading icon...</span>
            )}
            {iconError && (
              <span className="text-amber-400">
                No Devicon icon found — skill will be added without icon
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!name.trim()}
          className="mt-5 w-full py-2.5 rounded-lg text-sm font-semibold bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Add Skill
        </button>
      </form>
    </div>
  )
}



