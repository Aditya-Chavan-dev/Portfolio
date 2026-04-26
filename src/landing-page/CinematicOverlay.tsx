import { memo } from 'react'

/**
 * CinematicOverlay: Adds a layer of scanlines and subtle film grain.
 * Uses a Base64 embedded noise texture to avoid 404 errors.
 */
export const CinematicOverlay = memo(() => {
  const noiseUrl = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E`;

  return (
    <>
      {/* 1. CRT Scanlines */}
      <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      </div>

      {/* 2. Locally Generated Noise Grain */}
      <div className="fixed inset-0 z-[6] pointer-events-none opacity-[0.04]">
        <div 
          className="absolute inset-x-[-100%] inset-y-[-100%] w-[300%] h-[300%] brightness-150 contrast-150 animate-noise" 
          style={{ backgroundImage: `url("${noiseUrl}")` }}
        />
      </div>

      {/* 3. Subtle Vignette */}
      <div className="fixed inset-0 z-[7] pointer-events-none shadow-[inset_0_0_15vw_rgba(0,0,0,0.9)]" />
    </>
  )
})

CinematicOverlay.displayName = 'CinematicOverlay'
