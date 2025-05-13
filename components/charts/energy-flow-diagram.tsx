"use client"

import { useEffect, useRef } from "react"

export function EnergyFlowDiagram() {
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

    // Define nodes
    const nodes = [
      { id: "chp", label: "CHP", value: "185 kW", x: 50, y: 50, width: 80, height: 40, color: "#10B981" },
      { id: "pv", label: "PV", value: "143 kW", x: 50, y: 120, width: 80, height: 40, color: "#10B981" },
      { id: "grid", label: "Grid", value: "-24 kW", x: 50, y: 190, width: 80, height: 40, color: "#F59E0B" },
      {
        id: "battery",
        label: "Battery",
        value: "74%",
        x: rect.width / 2 - 40,
        y: 120,
        width: 80,
        height: 40,
        color: "#0EA5E9",
      },
      {
        id: "lazio",
        label: "Lazio Innova",
        value: "210 kW",
        x: rect.width - 130,
        y: 50,
        width: 80,
        height: 40,
        color: "#0EA5E9",
      },
      {
        id: "school",
        label: "School",
        value: "65 kW",
        x: rect.width - 130,
        y: 120,
        width: 80,
        height: 40,
        color: "#0EA5E9",
      },
      {
        id: "hospital",
        label: "Hospital",
        value: "180 kW",
        x: rect.width - 130,
        y: 190,
        width: 80,
        height: 40,
        color: "#0EA5E9",
      },
    ]

    // Define flows
    const flows = [
      { from: "chp", to: "lazio", value: 120, color: "#10B981" },
      { from: "chp", to: "hospital", value: 65, color: "#10B981" },
      { from: "pv", to: "battery", value: 24, color: "#10B981" },
      { from: "pv", to: "school", value: 65, color: "#10B981" },
      { from: "pv", to: "lazio", value: 54, color: "#10B981" },
      { from: "grid", to: "hospital", value: 115, color: "#F59E0B" },
      { from: "grid", to: "lazio", value: 36, color: "#F59E0B" },
    ]

    // Draw nodes
    nodes.forEach((node) => {
      // Draw node rectangle
      ctx.fillStyle = node.color
      ctx.strokeStyle = "#1e293b"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(node.x, node.y, node.width, node.height, 6)
      ctx.fill()
      ctx.stroke()

      // Draw node label
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(node.label, node.x + node.width / 2, node.y + 16)

      // Draw node value
      ctx.font = "10px sans-serif"
      ctx.fillText(node.value, node.x + node.width / 2, node.y + 30)
    })

    // Draw flows
    flows.forEach((flow) => {
      const fromNode = nodes.find((n) => n.id === flow.from)
      const toNode = nodes.find((n) => n.id === flow.to)

      if (!fromNode || !toNode) return

      // Calculate start and end points
      const startX = fromNode.x + fromNode.width
      const startY = fromNode.y + fromNode.height / 2
      const endX = toNode.x
      const endY = toNode.y + toNode.height / 2

      // Calculate control points for curve
      const controlX1 = startX + (endX - startX) / 3
      const controlY1 = startY
      const controlX2 = endX - (endX - startX) / 3
      const controlY2 = endY

      // Draw flow path
      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY)

      // Style based on flow value
      const lineWidth = Math.max(1, Math.min(8, flow.value / 30))
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = flow.color
      ctx.stroke()

      // Draw arrow at end
      const arrowSize = lineWidth + 2
      const angle = Math.atan2(endY - controlY2, endX - controlX2)

      ctx.beginPath()
      ctx.moveTo(endX, endY)
      ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6))
      ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6))
      ctx.closePath()
      ctx.fillStyle = flow.color
      ctx.fill()

      // Draw flow value
      const textX = (startX + endX) / 2
      const textY = (startY + endY) / 2 - 5
      ctx.fillStyle = "#f8fafc"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${flow.value} kW`, textX, textY)
    })

    // Animation frame for flowing dots
    let animationFrame = 0
    const animate = () => {
      // Clear only the paths, not the nodes
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Redraw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = node.color
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(node.x, node.y, node.width, node.height, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = "#ffffff"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(node.label, node.x + node.width / 2, node.y + 16)

        ctx.font = "10px sans-serif"
        ctx.fillText(node.value, node.x + node.width / 2, node.y + 30)
      })

      // Draw flows with animated dots
      flows.forEach((flow) => {
        const fromNode = nodes.find((n) => n.id === flow.from)
        const toNode = nodes.find((n) => n.id === flow.to)

        if (!fromNode || !toNode) return

        const startX = fromNode.x + fromNode.width
        const startY = fromNode.y + fromNode.height / 2
        const endX = toNode.x
        const endY = toNode.y + toNode.height / 2

        const controlX1 = startX + (endX - startX) / 3
        const controlY1 = startY
        const controlX2 = endX - (endX - startX) / 3
        const controlY2 = endY

        // Draw flow path
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY)

        const lineWidth = Math.max(1, Math.min(8, flow.value / 30))
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = flow.color
        ctx.stroke()

        // Draw arrow at end
        const arrowSize = lineWidth + 2
        const angle = Math.atan2(endY - controlY2, endX - controlX2)

        ctx.beginPath()
        ctx.moveTo(endX, endY)
        ctx.lineTo(endX - arrowSize * Math.cos(angle - Math.PI / 6), endY - arrowSize * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(endX - arrowSize * Math.cos(angle + Math.PI / 6), endY - arrowSize * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fillStyle = flow.color
        ctx.fill()

        // Draw flow value
        const textX = (startX + endX) / 2
        const textY = (startY + endY) / 2 - 5
        ctx.fillStyle = "#f8fafc"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(`${flow.value} kW`, textX, textY)

        // Draw animated dots
        const numDots = Math.max(2, Math.floor(flow.value / 20))
        for (let i = 0; i < numDots; i++) {
          const t = (animationFrame / 100 + i / numDots) % 1

          // Calculate position along the Bezier curve
          const u = 1 - t
          const tt = t * t
          const uu = u * u
          const uuu = uu * u
          const ttt = tt * t

          const x = uuu * startX + 3 * uu * t * controlX1 + 3 * u * tt * controlX2 + ttt * endX
          const y = uuu * startY + 3 * uu * t * controlY1 + 3 * u * tt * controlY2 + ttt * endY

          ctx.beginPath()
          ctx.arc(x, y, lineWidth / 2 + 1, 0, Math.PI * 2)
          ctx.fillStyle = "#ffffff"
          ctx.fill()
        }
      })

      animationFrame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup animation if needed
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
