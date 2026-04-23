"use client"

import { useEffect, useRef, useCallback, useState, useMemo } from "react"
import createGlobe from "cobe"

export interface ComplianceNode {
  id: string
  location: [number, number]
  country: string
  alertType: string
  baseFine: number
  fineLabel: string
}

export interface ComplianceTransaction {
  id: string
  from: [number, number]
  to: [number, number]
  description: string
}

export interface GlobeCdnProps {
  nodes?: ComplianceNode[]
  transactions?: ComplianceTransaction[]
  className?: string
  speed?: number
}

const defaultNodes: ComplianceNode[] = [
  { id: "node-ind", location: [20.59, 78.96], country: "India", alertType: "FEMA Violation", baseFine: 10000, fineLabel: "$10,000+" },
  { id: "node-usa", location: [37.09, -95.71], country: "USA", alertType: "Double Tax", baseFine: 8500, fineLabel: "$8,500+" },
  { id: "node-uae", location: [23.42, 53.85], country: "UAE", alertType: "Undetected PFIC", baseFine: 5000, fineLabel: "$5,000+" },
  { id: "node-gbr", location: [55.38, -3.44], country: "UK", alertType: "Penalty", baseFine: 5000, fineLabel: "$5,000+" },
  { id: "node-sgp", location: [1.36, 103.82], country: "Singapore", alertType: "Double Tax", baseFine: 8500, fineLabel: "$8,500+" },
  { id: "node-deu", location: [51.17, 10.45], country: "Germany", alertType: "PFIC", baseFine: 5000, fineLabel: "$5,000+" },
  { id: "node-can", location: [56.13, -106.35], country: "Canada", alertType: "Penalty", baseFine: 5000, fineLabel: "$5,000+" },
  { id: "node-aus", location: [-25.27, 133.77], country: "Australia", alertType: "FEMA", baseFine: 10000, fineLabel: "$10,000+" }
]

const defaultTransactions: ComplianceTransaction[] = [
  { id: "tx-ind-usa", from: [20.59, 78.96], to: [37.09, -95.71], description: "Equity Redemption" },
  { id: "tx-ind-uae", from: [20.59, 78.96], to: [23.42, 53.85], description: "NRI Remittance" },
  { id: "tx-usa-gbr", from: [37.09, -95.71], to: [55.38, -3.44], description: "PFIC Distribution" },
  { id: "tx-sgp-ind", from: [1.36, 103.82], to: [20.59, 78.96], description: "Wire Transfer" },
  { id: "tx-deu-usa", from: [51.17, 10.45], to: [37.09, -95.71], description: "Dividend Repatriation" },
  { id: "tx-aus-sgp", from: [-25.27, 133.77], to: [1.36, 103.82], description: "Fund Redemption" }
]

export function GlobeCdn({
  nodes = defaultNodes,
  transactions = defaultTransactions,
  className = "",
  speed = 0.003,
}: GlobeCdnProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  
  const [activeArcIndices, setActiveArcIndices] = useState<number[]>([0, 1])
  const activeTransactions = useMemo(() => {
    return transactions.filter((_, i) => activeArcIndices.includes(i))
  }, [transactions, activeArcIndices])

  const [liveAlerts, setLiveAlerts] = useState(() =>
    defaultTransactions.map((t) => ({ 
        id: t.id, 
        amount: [8500, 10200, 5300, 9800, 5100, 7600][defaultTransactions.indexOf(t)] || 5000,
        label: ""
    }))
  )

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setActiveArcIndices(prev => [
        (prev[0] + 2) % defaultTransactions.length,
        (prev[1] + 2) % defaultTransactions.length
      ])
    }, 4000)
    return () => clearInterval(cycleInterval)
  }, [])

  useEffect(() => {
    // Initial formatting
    setLiveAlerts(prev => prev.map(a => ({
        ...a,
        label: a.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    })));

    const interval = setInterval(() => {
      setLiveAlerts((data) =>
        data.map((t) => {
          const delta = Math.floor(Math.random() * 650) + 150; // Random change between 150 and 800
          const direction = Math.random() > 0.5 ? 1 : -1;
          const newAmount = Math.max(5000, t.amount + (delta * direction));
          return {
            ...t,
            amount: newAmount,
            label: newAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
          }
        })
      )
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 0, theta: 0.2, dark: 0, diffuse: 1.2,
        mapSamples: 16000, mapBrightness: 6, // Adjusted to make white dots visible against black background
        baseColor: [0, 0, 0], // True black surface
        markerColor: [1, 1, 1], // White markers
        glowColor: [0.1, 0.1, 0.15], // Subtle dark glow
        markerElevation: 0.02,
        markers: nodes.map((n) => ({ location: n.location, size: 0.02, id: n.id })),
        arcs: activeTransactions.map((t) => ({ from: t.from, to: t.to, id: t.id })),
        arcColor: [1, 1, 1], // White arcs
        arcWidth: 0.8, arcHeight: 0.3, opacity: 0.85,
      })
      
      function animate() {
        if (!isPausedRef.current) phi += (speed * 2.5) // Increased speed to 2.5x to be noticeably faster
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.2 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [nodes, activeTransactions, speed])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
        }}
      />
      {nodes.map((n) => (
        <div
          key={n.id}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning
            positionAnchor: `--cobe-${n.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% -8px",
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 4,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-${n.id}, 0)`,
            filter: `drop-shadow(0 0 6px rgba(239,68,68,0.7)) blur(calc((1 - var(--cobe-visible-${n.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
            zIndex: 10
          }}
        >
          {/* Alert Card (Reduced Size & No Dot) */}
          <div style={{
            background: "rgba(180,0,0,0.92)", 
            border: "1px solid rgba(255,80,80,0.6)", 
            borderRadius: "4px", 
            padding: "2px 6px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "0px"
          }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,200,200,1)", fontWeight: "bold", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                {n.alertType}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#ffffff", fontWeight: 800, letterSpacing: "0.03em" }}>
                {n.fineLabel}
            </span>
          </div>
        </div>
      ))}
      
      {liveAlerts.filter((_, i) => activeArcIndices.includes(i)).map((t) => (
        <div
          key={t.id}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning
            positionAnchor: `--cobe-arc-${t.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            fontFamily: "monospace",
            fontSize: "0.45rem",
            color: "#ffffff",
            background: "rgba(180, 0, 0, 0.88)",
            border: "1px solid rgba(255, 100, 100, 0.5)",
            padding: "2px 7px",
            borderRadius: "3px",
            boxShadow: "0 0 8px rgba(239,68,68,0.5)",
            whiteSpace: "nowrap" as const,
            pointerEvents: "none" as const,
            opacity: `var(--cobe-visible-arc-${t.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-arc-${t.id}, 0)) * 8px))`,
            transition: "opacity 0.3s, filter 0.3s",
            fontWeight: 700,
            zIndex: 5
          }}
        >
          {t.label || t.amount}
        </div>
      ))}
    </div>
  )
}
