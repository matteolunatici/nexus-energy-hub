"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  data: { [key: string]: any }[]
  xKey: string
  yKey: string | string[]
  color: string | string[]
  stacked?: boolean
  showLegend?: boolean
}

export function BarChart({ data, xKey, yKey, color, stacked = false, showLegend = false }: BarChartProps) {
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

    // Determine if we're dealing with multiple data series
    const isMultiSeries = Array.isArray(yKey)
    const yKeys = isMultiSeries ? yKey : [yKey]
    const colors = Array.isArray(color) ? color : [color]

    // Find min and max values
    const minValue = 0
    let maxValue = 0

    if (stacked) {
      // For stacked bars, we need the sum of values at each x position
      data.forEach((d) => {
        const sum = yKeys.reduce((acc, key) => acc + d[key], 0)
        maxValue = Math.max(maxValue, sum)
      })
    } else {
      // For grouped bars, we need the max of any individual value
      data.forEach((d) => {
        yKeys.forEach((key) => {
          maxValue = Math.max(maxValue, d[key])
        })
      })
    }

    // Padding and dimensions
    const padding = 20
    const legendHeight = showLegend ? 20 : 0
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2 - legendHeight
    const barGroupWidth = chartWidth / data.length
    const barWidth = stacked ? barGroupWidth * 0.8 : (barGroupWidth * 0.8) / yKeys.length
    const barSpacing = (barGroupWidth * 0.2) / (stacked ? 2 : yKeys.length + 1)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 1

    // X-axis
    ctx.moveTo(padding, rect.height - padding - legendHeight)
    ctx.lineTo(rect.width - padding, rect.height - padding - legendHeight)

    // Y-axis
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, rect.height - padding - legendHeight)

    ctx.stroke()

    // Draw the bars
    data.forEach((d, i) => {
      const xPosition = padding + i * barGroupWidth + barSpacing

      if (stacked) {
        // Draw stacked bars
        let yOffset = 0

        yKeys.forEach((key, keyIndex) => {
          const value = d[key]
          const normalizedValue = value / maxValue
          const barHeight = normalizedValue * chartHeight

          ctx.fillStyle = colors[keyIndex % colors.length]
          ctx.fillRect(xPosition, rect.height - padding - legendHeight - barHeight - yOffset, barWidth, barHeight)

          yOffset += barHeight
        })
      } else {
        // Draw grouped bars
        yKeys.forEach((key, keyIndex) => {
          const value = d[key]
          const normalizedValue = value / maxValue
          const barHeight = normalizedValue * chartHeight

          ctx.fillStyle = colors[keyIndex % colors.length]
          ctx.fillRect(
            xPosition + keyIndex * (barWidth + barSpacing),
            rect.height - padding - legendHeight - barHeight,
            barWidth,
            barHeight,
          )
        })
      }
    })

    // Draw legend if needed
    if (showLegend && isMultiSeries) {
      const legendY = rect.height - legendHeight
      const legendItemWidth = rect.width / yKeys.length

      yKeys.forEach((key, i) => {
        const x = i * legendItemWidth + 10
        const color = colors[i % colors.length]

        // Draw color box
        ctx.fillStyle = color
        ctx.fillRect(x, legendY + 5, 10, 10)

        // Draw label
        ctx.fillStyle = "#f8fafc"
        ctx.font = "10px sans-serif"
        ctx.fillText(key, x + 15, legendY + 13)
      })
    }
  }, [data, xKey, yKey, color, stacked, showLegend])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
