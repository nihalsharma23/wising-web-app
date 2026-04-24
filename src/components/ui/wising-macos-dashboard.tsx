"use client"

import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  LayoutDashboard, TrendingUp, ShieldAlert, Calculator, Sparkles,
  ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle, Clock,
  Bell, Settings, Wallet, ChevronRight, Zap,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from "recharts"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type NavId = "portfolio" | "analytics" | "compliance" | "tax" | "ai"
type Urgency = "high" | "medium" | "low"
type RiskLevel = "HIGH" | "MEDIUM" | "RESOLVED"

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const portfolioHistory = [
  { m: "Oct", v: 18.2, prev: 16.1 },
  { m: "Nov", v: 19.8, prev: 17.4 },
  { m: "Dec", v: 18.9, prev: 18.0 },
  { m: "Jan", v: 21.4, prev: 19.2 },
  { m: "Feb", v: 23.1, prev: 20.5 },
  { m: "Mar", v: 24.85, prev: 21.3 },
]

const allocations = [
  { label: "Indian Equity", pct: 42, color: "#f59e0b", value: "₹10,43,700" },
  { label: "US ETFs / Stocks", pct: 28, color: "#60a5fa", value: "$8,320" },
  { label: "UAE Real Estate", pct: 18, color: "#34d399", value: "AED 24,600" },
  { label: "Fixed Income", pct: 12, color: "#a78bfa", value: "₹2,98,200" },
]

const heroStats = [
  { label: "Total Portfolio", value: "₹24,85,400", sub: "+₹1,54,200 today", up: true, refKey: "stat-total" },
  { label: "Returns (1Y)", value: "+36.5%", sub: "vs 18.2% Nifty 50", up: true, refKey: "stat-returns" },
  { label: "Compliance Risk", value: "2 Alerts", sub: "FEMA · Double Tax", up: false, refKey: "stat-risk" },
]

const complianceAlerts = [
  { id: 1, type: "FEMA Violation",    risk: "HIGH"     as RiskLevel, fine: "$10,000+", route: "India → UAE", status: "detected"   },
  { id: 2, type: "Double Taxation",   risk: "HIGH"     as RiskLevel, fine: "$8,500+",  route: "India → USA", status: "detected"   },
  { id: 3, type: "Undetected PFIC",   risk: "MEDIUM"   as RiskLevel, fine: "$5,000+",  route: "USA Fund",    status: "monitoring" },
  { id: 4, type: "Penalty Risk",      risk: "RESOLVED" as RiskLevel, fine: "$5,000+",  route: "NRI Status",  status: "resolved"   },
]

const taxBreakdown = [
  { type: "STCG",     india: 42,  us: 18 },
  { type: "LTCG",     india: 128, us: 64 },
  { type: "VDA",      india: 31,  us: 0  },
  { type: "Dividend", india: 8,   us: 22 },
]

const aiInsights = [
  {
    id: 1,
    title: "Tax Harvest Opportunity",
    desc: "Offset ₹3.2L LTCG by harvesting losses in 3 underperforming US positions before March 31.",
    action: "Review Positions",
    urgency: "high" as Urgency,
  },
  {
    id: 2,
    title: "DTAA Benefit Detected",
    desc: "India-UAE treaty reduces dividend tax rate from 30% → 12.5%. Estimated annual saving: ₹1.4L.",
    action: "Apply Treaty",
    urgency: "medium" as Urgency,
  },
  {
    id: 3,
    title: "LRS Limit Approaching",
    desc: "Remittance at 87% of $250K annual limit. $32,500 remaining before RBI mandatory reporting threshold.",
    action: "Monitor",
    urgency: "low" as Urgency,
  },
]

const perfMetrics = [
  { label: "XIRR",         value: "36.5%",  color: "#34d399" },
  { label: "Sharpe Ratio", value: "2.14",   color: "#60a5fa" },
  { label: "Max Drawdown", value: "-4.2%",  color: "#f87171" },
  { label: "Alpha",        value: "+18.3%", color: "#f59e0b" },
]

// ─────────────────────────────────────────────────────────────────────────────
// NAV CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const NAV: { id: NavId; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "portfolio",   label: "Portfolio",       icon: LayoutDashboard },
  { id: "analytics",  label: "Analytics",        icon: TrendingUp       },
  { id: "compliance", label: "Compliance",       icon: ShieldAlert,  badge: "2" },
  { id: "tax",        label: "Tax Intelligence", icon: Calculator       },
  { id: "ai",         label: "AI Insights",      icon: Sparkles,  badge: "3" },
]

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR SEQUENCE
// Each step: move cursor to refKey element, optionally click a nav, then wait
// ─────────────────────────────────────────────────────────────────────────────
type Step = { refKey: string; navClick?: NavId; holdMs: number }

const STEPS: Step[] = [
  { refKey: "nav-portfolio",  navClick: "portfolio",   holdMs: 1800 },
  { refKey: "stat-total",                              holdMs: 1200 },
  { refKey: "stat-returns",                            holdMs: 800  },
  { refKey: "nav-analytics",  navClick: "analytics",   holdMs: 900  },
  { refKey: "area-chart",                              holdMs: 1800 },
  { refKey: "metric-0",                                holdMs: 700  },
  { refKey: "metric-2",                                holdMs: 700  },
  { refKey: "nav-compliance", navClick: "compliance",  holdMs: 900  },
  { refKey: "alert-0",                                 holdMs: 1400 },
  { refKey: "alert-1",                                 holdMs: 1000 },
  { refKey: "alert-2",                                 holdMs: 800  },
  { refKey: "nav-tax",        navClick: "tax",         holdMs: 900  },
  { refKey: "tax-chart",                               holdMs: 2000 },
  { refKey: "nav-ai",         navClick: "ai",          holdMs: 900  },
  { refKey: "insight-0",                               holdMs: 1400 },
  { refKey: "insight-1",                               holdMs: 1400 },
  { refKey: "insight-2",                               holdMs: 1000 },
]

// ─────────────────────────────────────────────────────────────────────────────
// 3D ORB  (React Three Fiber)
// ─────────────────────────────────────────────────────────────────────────────
function GoldOrb() {
  const mesh = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.25
      mesh.current.rotation.y = clock.elapsedTime * 0.4
    }
    if (inner.current) {
      inner.current.rotation.x = -clock.elapsedTime * 0.35
      inner.current.rotation.y = clock.elapsedTime * 0.6
    }
  })

  return (
    <group>
      {/* Outer wireframe sphere */}
      <mesh ref={mesh} scale={1.0}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#f59e0b" wireframe opacity={0.25} transparent />
      </mesh>
      {/* Inner solid sphere */}
      <mesh ref={inner} scale={0.7}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.1}
          emissive="#b45309"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Ambient + directional lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} color="#fde68a" />
      <pointLight position={[-2, -2, -2]} intensity={0.8} color="#60a5fa" />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED CARD STYLE
// ─────────────────────────────────────────────────────────────────────────────
const card = {
  background: "rgba(255,255,255,0.025)",
  border:     "1px solid rgba(255,255,255,0.075)",
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function WisingMacOSDemo() {
  const [activeNav, setActiveNav]       = useState<NavId>("portfolio")
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isClicking, setIsClicking]     = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const elemRefs     = useRef<Record<string, HTMLElement | null>>({})

  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.8 })
  const springY = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.8 })

  // Callback ref factory
  const setRef = useCallback(
    (key: string) => (el: HTMLElement | null) => { elemRefs.current[key] = el },
    []
  )

  // Move cursor to element center
  const moveTo = useCallback(
    (key: string): Promise<void> =>
      new Promise((resolve) => {
        const el        = elemRefs.current[key]
        const container = containerRef.current
        if (!el || !container) { setTimeout(resolve, 200); return }
        const er = el.getBoundingClientRect()
        const cr = container.getBoundingClientRect()
        rawX.set(er.left + er.width  / 2 - cr.left)
        rawY.set(er.top  + er.height / 2 - cr.top)
        setTimeout(resolve, 550) // spring settle time
      }),
    [rawX, rawY]
  )

  // Click animation
  const click = useCallback(
    (): Promise<void> =>
      new Promise((resolve) => {
        setIsClicking(true)
        setTimeout(() => { setIsClicking(false); resolve() }, 180)
      }),
    []
  )

  // Orchestration loop
  useEffect(() => {
    let cancelled = false
    let idx = 0

    async function run() {
      await new Promise((r) => setTimeout(r, 1200))
      if (cancelled) return
      setCursorVisible(true)

      // Seed cursor at window center
      const c = containerRef.current
      if (c) { rawX.set(c.offsetWidth / 2); rawY.set(c.offsetHeight / 2) }

      while (!cancelled) {
        const step = STEPS[idx % STEPS.length]
        await moveTo(step.refKey)
        if (cancelled) break

        if (step.navClick) {
          await click()
          if (!cancelled) {
            setActiveNav(step.navClick)
            await new Promise((r) => setTimeout(r, 450)) // let view mount
          }
        }

        await new Promise((r) => setTimeout(r, step.holdMs))
        idx++
      }
    }

    run()
    return () => { cancelled = true }
  }, [moveTo, click, rawX, rawY])

  // ── VIEWS ──────────────────────────────────────────────────────────────────

  const PortfolioView = (
    <motion.div
      key="portfolio"
      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-3 p-5 overflow-hidden"
    >
      {/* Hero stats row */}
      <div className="grid grid-cols-3 gap-3">
        {heroStats.map((s) => (
          <div
            key={s.refKey}
            ref={setRef(s.refKey) as any}
            className="rounded-xl p-4 relative overflow-hidden"
            style={card}
          >
            {/* Subtle glow */}
            {s.up === false && (
              <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ background: "radial-gradient(circle at 80% 20%, #ef4444 0%, transparent 60%)" }} />
            )}
            <p className="text-[9px] font-medium tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.32)" }}>{s.label}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-white font-['DM_Sans']">{s.value}</p>
            <p className={`mt-0.5 text-[11px] flex items-center gap-0.5 font-medium ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
              {s.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + Orb + Allocation */}
      <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">

        {/* Line chart */}
        <div className="col-span-3 rounded-xl p-4 flex flex-col" style={card}>
          <p className="text-[9px] tracking-[0.12em] uppercase font-medium mb-3" style={{ color: "rgba(255,255,255,0.32)" }}>Portfolio Value — 6 Months (₹ Lakhs)</p>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioHistory}>
                <defs>
                  <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="gPprev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
                <Tooltip
                  contentStyle={{ background: "#0d0d15", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11, fontFamily: "DM Mono" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(v: any, n: string) => [`₹${v}L`, n === "v" ? "This Year" : "Last Year"]}
                />
                <Area type="monotone" dataKey="prev" stroke="#60a5fa" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gPprev)" dot={false} />
                <Area type="monotone" dataKey="v"    stroke="#f59e0b" strokeWidth={2.5} fill="url(#gP)" dot={{ fill: "#f59e0b", r: 3 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3D Orb + Allocation */}
        <div className="col-span-2 flex flex-col gap-3">
          {/* R3F Orb */}
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ ...card, height: 100 }}>
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }} />
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} style={{ background: "transparent" }}>
                <GoldOrb />
              </Canvas>
            </Suspense>
          </div>

          {/* Allocations */}
          <div className="rounded-xl p-3 flex-1 min-h-0 overflow-auto" style={card}>
            <p className="text-[9px] tracking-[0.12em] uppercase font-medium mb-3" style={{ color: "rgba(255,255,255,0.32)" }}>Allocation</p>
            {allocations.map((a, i) => (
              <div key={a.label} className="mb-2.5">
                <div className="flex justify-between mb-1">
                  <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{a.label}</span>
                  <span className="text-[11px] font-mono font-semibold" style={{ color: a.color }}>{a.pct}%</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    className="h-1 rounded-full"
                    style={{ background: a.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${a.pct}%` }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )

  const AnalyticsView = (
    <motion.div
      key="analytics"
      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-3 p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white font-['DM_Sans']">Performance Analytics</h2>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Cross-border portfolio · Oct 2024 – Mar 2025</p>
        </div>
        <div className="flex gap-1">
          {["1M","3M","6M","1Y","ALL"].map((t, i) => (
            <button key={t}
              className="px-2 py-1 rounded text-[10px] font-medium transition-colors"
              style={{ background: i === 2 ? "#f59e0b" : "rgba(255,255,255,0.06)", color: i === 2 ? "#000" : "rgba(255,255,255,0.45)" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main chart */}
      <div ref={setRef("area-chart") as any} className="flex-1 min-h-0 rounded-xl p-4" style={card}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioHistory}>
            <defs>
              <linearGradient id="gAn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
            <Tooltip
              contentStyle={{ background: "#0d0d15", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#60a5fa" }}
              formatter={(v: any) => [`₹${v}L`, "Portfolio"]}
            />
            <Area type="monotone" dataKey="v" stroke="#60a5fa" strokeWidth={2.5} fill="url(#gAn)"
              dot={{ fill: "#60a5fa", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-4 gap-2">
        {perfMetrics.map((m, i) => (
          <div
            key={m.label}
            ref={setRef(`metric-${i}`) as any}
            className="rounded-xl p-3 text-center"
            style={card}
          >
            <p className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.32)" }}>{m.label}</p>
            <p className="text-base font-mono font-bold mt-0.5" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )

  const riskColor: Record<RiskLevel, string> = {
    HIGH:     "#f87171",
    MEDIUM:   "#fbbf24",
    RESOLVED: "#34d399",
  }

  const ComplianceView = (
    <motion.div
      key="compliance"
      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-2">
        <motion.div className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <h2 className="text-sm font-semibold text-white font-['DM_Sans']">Compliance Monitor</h2>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "rgba(239,68,68,0.14)", color: "#f87171", border: "1px solid rgba(239,68,68,0.28)" }}>
          2 ACTIVE ALERTS
        </span>
      </div>

      <div className="flex flex-col gap-2 overflow-auto">
        {complianceAlerts.map((a, i) => {
          const isHigh     = a.risk === "HIGH"
          const isResolved = a.status === "resolved"
          return (
            <motion.div
              key={a.id}
              ref={setRef(`alert-${i}`) as any}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4 flex items-center gap-4 relative overflow-hidden"
              style={{
                background:   isResolved ? "rgba(255,255,255,0.02)" : isHigh ? "rgba(239,68,68,0.06)" : "rgba(245,158,11,0.05)",
                border:       `1px solid ${isResolved ? "rgba(255,255,255,0.06)" : isHigh ? "rgba(239,68,68,0.22)" : "rgba(245,158,11,0.2)"}`,
              }}
            >
              {/* Left icon */}
              <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: isResolved ? "rgba(52,211,153,0.15)" : isHigh ? "rgba(239,68,68,0.15)" : "rgba(251,191,36,0.15)" }}>
                {isResolved
                  ? <CheckCircle  size={15} className="text-emerald-400" />
                  : isHigh
                  ? <AlertTriangle size={15} className="text-red-400" />
                  : <Clock        size={15} className="text-amber-400" />
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{a.type}</p>
                <p className="text-[11px] mt-0.5 font-mono" style={{ color: "rgba(255,255,255,0.38)" }}>{a.route}</p>
              </div>

              {/* Fine + badge */}
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-mono font-bold" style={{ color: riskColor[a.risk] }}>{a.fine}</p>
                <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: "rgba(255,255,255,0.32)" }}>
                  {a.risk}
                </span>
              </div>

              {/* Pulse strip for active HIGH */}
              {isHigh && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: "#f87171" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Summary strip */}
      <div className="rounded-xl p-3 flex items-center gap-3 mt-auto" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
        <Zap size={14} className="text-red-400 flex-shrink-0" />
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>
          Estimated total exposure: <span className="text-red-400 font-mono font-semibold">$28,500+</span> across 2 active violations
        </p>
        <button className="ml-auto text-[10px] font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
          style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>
          Resolve Now
        </button>
      </div>
    </motion.div>
  )

  const TaxView = (
    <motion.div
      key="tax"
      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-3 p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white font-['DM_Sans']">Tax Intelligence</h2>
          <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Estimated liability across jurisdictions</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold"
          style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.22)" }}>
          FY 2024–25
        </span>
      </div>

      <div ref={setRef("tax-chart") as any} className="flex-1 min-h-0 rounded-xl p-4" style={card}>
        <p className="text-[9px] tracking-[0.12em] uppercase font-medium mb-3" style={{ color: "rgba(255,255,255,0.32)" }}>
          Estimated Tax Liability (₹K)
        </p>
        <ResponsiveContainer width="100%" height="88%">
          <BarChart data={taxBreakdown} barGap={6} barCategoryGap="30%">
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="type" tick={{ fill: "rgba(255,255,255,0.38)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}K`} />
            <Tooltip
              contentStyle={{ background: "#0d0d15", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: "#fff" }}
              formatter={(v: any, n: string) => [`₹${v}K`, n === "india" ? "India" : "USA"]}
            />
            <Bar dataKey="india" name="India" fill="#f59e0b" radius={[4,4,0,0]} />
            <Bar dataKey="us"    name="USA"   fill="#60a5fa" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "India Total",    value: "₹2,09,000", color: "#f59e0b" },
          { label: "USA Total",      value: "$1,040",     color: "#60a5fa" },
          { label: "Net Savings (DTAA)", value: "₹1,42,000", color: "#34d399" },
        ].map((t) => (
          <div key={t.label} className="rounded-xl p-3" style={card}>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.32)" }}>{t.label}</p>
            <p className="text-base font-mono font-bold mt-0.5" style={{ color: t.color }}>{t.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )

  const urgencyPalette: Record<Urgency, { bg: string; border: string; dot: string; btn: string; btnText: string }> = {
    high:   { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.28)", dot: "#f59e0b", btn: "#f59e0b", btnText: "#000" },
    medium: { bg: "rgba(96,165,250,0.05)", border: "rgba(96,165,250,0.2)",  dot: "#60a5fa", btn: "rgba(96,165,250,0.15)", btnText: "#93c5fd" },
    low:    { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.07)", dot: "rgba(255,255,255,0.3)", btn: "rgba(255,255,255,0.08)", btnText: "rgba(255,255,255,0.55)" },
  }

  const AIView = (
    <motion.div
      key="ai"
      initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles size={14} className="text-amber-400" />
        </motion.div>
        <h2 className="text-sm font-semibold text-white font-['DM_Sans']">AI Insights</h2>
        <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full font-semibold"
          style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.22)" }}>
          3 NEW
        </span>
        <span className="ml-auto text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
          Updated 2 min ago
        </span>
      </div>

      <div className="flex flex-col gap-2.5 overflow-auto">
        {aiInsights.map((ins, i) => {
          const pal = urgencyPalette[ins.urgency]
          return (
            <motion.div
              key={ins.id}
              ref={setRef(`insight-${i}`) as any}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-4"
              style={{ background: pal.bg, border: `1px solid ${pal.border}` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: pal.dot }}
                      animate={ins.urgency === "high" ? { opacity: [1, 0.3, 1] } : {}}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    <p className="text-[13px] font-semibold text-white font-['DM_Sans']">{ins.title}</p>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>{ins.desc}</p>
                </div>
                <button
                  className="text-[10px] font-bold px-3 py-1.5 rounded-lg flex-shrink-0 transition-opacity hover:opacity-80 whitespace-nowrap"
                  style={{ background: pal.btn, color: pal.btnText }}
                >
                  {ins.action}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Wising AI tag */}
      <div className="rounded-xl p-3 flex items-center gap-2 mt-auto" style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.1)" }}>
        <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          <Wallet size={10} className="text-black" />
        </div>
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.38)" }}>
          Insights generated by <span className="text-amber-400 font-semibold">Wising AI</span> · RAG-powered · SEBI/AMFI compliant
        </p>
      </div>
    </motion.div>
  )

  const VIEWS: Record<NavId, React.ReactNode> = {
    portfolio:  PortfolioView,
    analytics:  AnalyticsView,
    compliance: ComplianceView,
    tax:        TaxView,
    ai:         AIView,
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="w-full h-full flex items-center justify-center select-none overflow-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* ── Dashboard Content ── */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ background: "#0c0c14" }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Title Bar (Optional, kept for style) ── */}
        <div
          className="flex items-center px-4 h-11 border-b"
          style={{ background: "rgba(255,255,255,0.025)", borderColor: "rgba(255,255,255,0.07)" }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-4">
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <motion.div key={c} className="w-3 h-3 rounded-full" style={{ background: c }}
                whileHover={{ scale: 1.15 }} />
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0.5 flex-1">
            {[
              { label: "Wealth OS",  active: true  },
              { label: "CA Portal",  active: false },
              { label: "Reports",    active: false },
            ].map((tab) => (
              <div key={tab.label}
                className="flex items-center gap-1.5 px-3 py-1 rounded-t text-[11px] font-medium"
                style={{
                  background:   tab.active ? "rgba(255,255,255,0.07)" : "transparent",
                  color:        tab.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.28)",
                  borderBottom: tab.active ? "1px solid rgba(245,158,11,0.5)" : "none",
                }}>
                {tab.label}
              </div>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <Bell     size={12} style={{ color: "rgba(255,255,255,0.22)" }} />
            <Settings size={12} style={{ color: "rgba(255,255,255,0.22)" }} />
          </div>
        </div>

        {/* ── Body: Sidebar + Content ── */}
        <div className="flex" style={{ height: "calc(100% - 44px)" }}>

          {/* Sidebar */}
          <div
            className="w-36 sm:w-44 flex-shrink-0 flex flex-col py-4 px-2.5 border-r overflow-y-auto"
            style={{ background: "rgba(255,255,255,0.01)", borderColor: "rgba(255,255,255,0.06)" }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                <Wallet size={13} className="text-black" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">Wising</span>
              <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-mono font-bold"
                style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                BETA
              </span>
            </div>

            {/* User profile */}
            <div className="mx-2 mb-4 p-2.5 rounded-xl flex items-center gap-2"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#000" }}>
                RN
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-white truncate">Rahul Nair</p>
                <p className="text-[9px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>NRI · India / UAE / USA</p>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-0.5">
              {NAV.map((item) => {
                const active = activeNav === item.id
                const Icon   = item.icon
                return (
                  <motion.button
                    key={item.id}
                    ref={setRef(`nav-${item.id}`) as any}
                    onClick={() => setActiveNav(item.id)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full relative"
                    style={{
                      background: active ? "rgba(245,158,11,0.13)" : "transparent",
                      color:      active ? "#f59e0b" : "rgba(255,255,255,0.42)",
                    }}
                    whileHover={{ background: active ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)" }}
                  >
                    {/* Active indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeBar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
                        style={{ background: "#f59e0b" }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    <Icon size={14} />
                    <span className="text-[12px] font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0"
                        style={{ background: item.id === "compliance" ? "rgba(239,68,68,0.18)" : "rgba(245,158,11,0.18)", color: item.id === "compliance" ? "#f87171" : "#f59e0b" }}>
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </nav>

            {/* Bottom status */}
            <div className="mt-auto px-2 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>AI Engine Active</span>
                <ChevronRight size={10} className="ml-auto" style={{ color: "rgba(255,255,255,0.2)" }} />
              </div>
            </div>
          </div>

          {/* ── Content Area ── */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {VIEWS[activeNav]}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mock Cursor ── */}
        <AnimatePresence>
          {cursorVisible && (
            <motion.div
              className="absolute pointer-events-none z-[999]"
              style={{
                x: springX,
                y: springY,
                translateX: "-25%",
                translateY: "-10%",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Cursor SVG */}
              <motion.svg
                width="22" height="28" viewBox="0 0 22 28" fill="none"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }}
                animate={{ scale: isClicking ? 0.72 : 1, rotate: isClicking ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <path
                  d="M4 2L4 21L8.5 16.5L11.5 23.5L14.2 22.4L11.2 15.5L17.5 15.5L4 2Z"
                  fill="white"
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </motion.svg>

              {/* Click ripple */}
              <AnimatePresence>
                {isClicking && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      top: "50%", left: "50%",
                      translateX: "-50%", translateY: "-50%",
                      border: "1.5px solid rgba(245,158,11,0.7)",
                    }}
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: 44, height: 44, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
