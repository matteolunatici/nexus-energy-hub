"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  data: { [key: string]: any }[]
  xKey: string
  yKey: string
  color: string
  hideAxis?: boolean
}

export function LineChart({ data, xKey, yKey, color, hideAxis = false }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get the device pixel ratio
    const dpr = window.devicePixelRatio || 1

    // Set the canvas dimensions accounting for device pixel ratio
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr)

    // Set the CSS dimensions
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Clear the canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Find min and max values
    const values = data.map((d) => d[yKey])
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const range = maxValue - minValue

    // Padding
    const padding = hideAxis ? 0 : 20
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    // Draw axes if not hidden
    if (!hideAxis) {
      ctx.beginPath()
      ctx.strokeStyle = "#64748b"
      ctx.lineWidth = 1

      // X-axis
      ctx.moveTo(padding, rect.height - padding)
      ctx.lineTo(rect.width - padding, rect.height - padding)

      // Y-axis
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, rect.height - padding)

      ctx.stroke()
    }

    // Draw the line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.lineJoin = "round"

    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const normalizedValue = (d[yKey] - minValue) / (range || 1)
      const y = rect.height - padding - normalizedValue * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points
    data.forEach((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth
      const normalizedValue = (d[yKey] - minValue) / (range || 1)
      const y = rect.height - padding - normalizedValue * chartHeight

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [data, xKey, yKey, color, hideAxis])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
