"use client"

import { useEffect, useRef, useCallback } from "react"

interface InteractiveGridProps {
  gridSize?: number
  glowRadius?: number
  maxOpacity?: number
  baseOpacity?: number
  accentColor?: [number, number, number]
  dotRadius?: number
}

export function InteractiveGrid({
  gridSize = 36,
  glowRadius = 200,
  maxOpacity = 0.6,
  baseOpacity = 0.03,
  accentColor = [220, 130, 50], // warm orange to match accent
  dotRadius = 1.5,
}: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const targetMouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>(0)
  const dprRef = useRef(1)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = dprRef.current
    const width = canvas.width / dpr
    const height = canvas.height / dpr

    // Smooth mouse interpolation
    const lerp = 0.12
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerp
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerp

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(dpr, dpr)

    const [r, g, b] = accentColor
    const glowRadiusSq = glowRadius * glowRadius

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      // Calculate distance from mouse to this vertical line
      const lineDist = Math.abs(x - mx)

      if (lineDist < glowRadius) {
        // Draw glowing segment near cursor
        const segTop = Math.max(0, my - glowRadius)
        const segBottom = Math.min(height, my + glowRadius)

        // Base line (full length, base opacity)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()

        // Glowing segment
        const gradient = ctx.createLinearGradient(x, segTop, x, segBottom)
        const peakAlpha = maxOpacity * (1 - lineDist / glowRadius)

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${peakAlpha * 0.5})`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${peakAlpha})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${peakAlpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, segTop)
        ctx.lineTo(x, segBottom)
        ctx.stroke()
      } else {
        // Base line only
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      const lineDist = Math.abs(y - my)

      if (lineDist < glowRadius) {
        const segLeft = Math.max(0, mx - glowRadius)
        const segRight = Math.min(width, mx + glowRadius)

        // Base line
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()

        // Glowing segment
        const gradient = ctx.createLinearGradient(segLeft, y, segRight, y)
        const peakAlpha = maxOpacity * (1 - lineDist / glowRadius)

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${peakAlpha * 0.5})`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${peakAlpha})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${peakAlpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(segLeft, y)
        ctx.lineTo(segRight, y)
        ctx.stroke()
      } else {
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    // Draw intersection dots with glow
    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        const dx = x - mx
        const dy = y - my
        const distSq = dx * dx + dy * dy

        if (distSq < glowRadiusSq) {
          const dist = Math.sqrt(distSq)
          const intensity = 1 - dist / glowRadius
          const eased = intensity * intensity // quadratic easing for smoother falloff
          const alpha = baseOpacity + (maxOpacity - baseOpacity) * eased
          const currentDotRadius = dotRadius + eased * 2 // dots grow near cursor

          // Glow halo
          if (eased > 0.15) {
            const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, currentDotRadius * 4)
            glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`)
            glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
            ctx.fillStyle = glowGradient
            ctx.beginPath()
            ctx.arc(x, y, currentDotRadius * 4, 0, Math.PI * 2)
            ctx.fill()
          }

          // Dot
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
          ctx.beginPath()
          ctx.arc(x, y, currentDotRadius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          // Base dot
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseOpacity * 0.6})`
          ctx.beginPath()
          ctx.arc(x, y, dotRadius * 0.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    ctx.restore()

    animationRef.current = requestAnimationFrame(draw)
  }, [gridSize, glowRadius, maxOpacity, baseOpacity, accentColor, dotRadius])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dprRef.current = dpr
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      targetMouseRef.current = { x: -1000, y: -1000 }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
