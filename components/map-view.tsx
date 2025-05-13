"use client"

import { useEffect, useRef } from "react"

interface Marker {
  id: number
  lat: number
  lng: number
  name: string
  type: "current" | "school" | "hospital" | "other"
}

interface MapViewProps {
  center: [number, number]
  zoom: number
  markers: Marker[]
}

export function MapView({ center, zoom, markers }: MapViewProps) {
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

    // Draw map background
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    gradient.addColorStop(0, "#334155")
    gradient.addColorStop(1, "#1e293b")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw grid lines
    ctx.strokeStyle = "#475569"
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    for (let y = 0; y < rect.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let x = 0; x < rect.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, rect.height)
      ctx.stroke()
    }

    // Draw a circle to represent the 5km radius
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(rect.width, rect.height) * 0.4

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#0EA5E9"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])

    // Add radius label
    ctx.fillStyle = "#94a3b8"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("5 km radius", centerX, centerY - radius - 10)

    // Draw markers
    markers.forEach((marker) => {
      // Calculate position (simplified for demo)
      // In a real app, you'd use proper geo projection
      const x = centerX + (marker.lng - center[1]) * 100
      const y = centerY - (marker.lat - center[0]) * 100

      // Draw marker
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)

      let markerColor = "#0EA5E9"
      if (marker.type === "school") markerColor = "#10B981"
      if (marker.type === "hospital") markerColor = "#F59E0B"

      ctx.fillStyle = markerColor
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw icon
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      if (marker.type === "current") {
        ctx.fillText("L", x, y)
      } else if (marker.type === "school") {
        ctx.fillText("S", x, y)
      } else if (marker.type === "hospital") {
        ctx.fillText("H", x, y)
      }

      // Draw label
      ctx.fillStyle = "#ffffff"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(marker.name, x, y + 20)
    })
  }, [center, zoom, markers])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
