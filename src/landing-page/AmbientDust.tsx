import { useEffect, useRef } from 'react'

interface AmbientDustProps {
  /** Total particle count for the drift layer */
  readonly count?: number
  readonly mouseX?: number
  readonly mouseY?: number
}

export function AmbientDust({ count = 60, mouseX = 0, mouseY = 0 }: AmbientDustProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      targetAlpha: number
      depth: number // Added for parallax variance
    }> = []

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    window.addEventListener('resize', resize)
    resize()

    // Init Particles with varying depths for a 3D parallax feel
    for (let i = 0; i < count; i++) {
      const depth = Math.random() * 40 + 10
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.15 / (depth * 0.05)), // Depth affects speed
        vy: (Math.random() - 0.5) * (0.15 / (depth * 0.05)),
        size: Math.random() * 1.8 + 0.2, // Some tiny, some larger
        alpha: Math.random() * 0.2,
        targetAlpha: Math.random() * 0.4,
        depth: depth
      })
    }

    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        // Apply base velocity
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < -50) p.x = width + 50
        if (p.x > width + 50) p.x = -50
        if (p.y < -50) p.y = height + 50
        if (p.y > height + 50) p.y = -50

        // Subtle Shimmer
        p.alpha += (p.targetAlpha - p.alpha) * 0.005
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.2
        }

        // Apply Mouse Parallax
        const offsetX = mouseX * p.depth
        const offsetY = mouseY * p.depth

        ctx.beginPath()
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.alpha * 0.5)})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [count, mouseX, mouseY])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" 
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
