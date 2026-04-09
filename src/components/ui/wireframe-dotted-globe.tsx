import { useEffect, useRef } from "react"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as d3 from "d3"

const CITIES: { name: string; coords: [number, number] }[] = [
    { name: "New York",   coords: [-74.006,  40.712] },
    { name: "London",     coords: [ -0.127,  51.507] },
    { name: "Hong Kong",  coords: [114.169,  22.319] },
    { name: "Singapore",  coords: [103.819,   1.352] },
    { name: "Dubai",      coords: [ 55.270,  25.204] },
    { name: "Tokyo",      coords: [139.691,  35.689] },
    { name: "Zurich",     coords: [  8.541,  47.376] },
    { name: "Mumbai",     coords: [ 72.877,  19.076] },
    { name: "Sydney",     coords: [151.209, -33.868] },
    { name: "Frankfurt",  coords: [  8.682,  50.110] },
    { name: "Paris",      coords: [  2.349,  48.864] },
    { name: "Toronto",    coords: [-79.347,  43.651] },
    { name: "Nairobi",    coords: [ 36.817,  -1.286] },
    { name: "São Paulo",  coords: [-46.633, -23.550] },
]

interface Transaction { id: number; from: [number,number]; to: [number,number]; startTime: number; duration: number }
interface GlobeProps { scrollProgressRef?: { current: number }; className?: string }

export default function RotatingEarth({ scrollProgressRef, className = "" }: GlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const W = window.innerWidth
        const H = window.innerHeight
        const radius = Math.min(W, H) * 0.44
        const dpr = window.devicePixelRatio || 1

        canvas.width  = W * dpr
        canvas.height = H * dpr
        canvas.style.width  = `${W}px`
        canvas.style.height = `${H}px`
        ctx.scale(dpr, dpr)

        const projection = d3.geoOrthographic()
            .scale(radius).translate([W / 2, H / 2]).clipAngle(90)
        const path = d3.geoPath().projection(projection).context(ctx)

        const pip = (pt: [number,number], ring: number[][]): boolean => {
            let inside = false
            for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                const [xi, yi] = ring[i], [xj, yj] = ring[j]
                if ((yi > pt[1]) !== (yj > pt[1]) &&
                    pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi)
                    inside = !inside
            }
            return inside
        }
        const pif = (pt: [number,number], f: any): boolean => {
            const { type, coordinates: co } = f.geometry
            const chk = (rings: number[][][]) => { if (!pip(pt, rings[0])) return false; for (let i = 1; i < rings.length; i++) if (pip(pt, rings[i])) return false; return true }
            if (type === "Polygon") return chk(co)
            if (type === "MultiPolygon") return co.some((p: number[][][]) => chk(p))
            return false
        }
        const generateDots = (feature: any): [number,number][] => {
            const dots: [number,number][] = []
            const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
            for (let lng = minLng; lng <= maxLng; lng += 1.28)
                for (let lat = minLat; lat <= maxLat; lat += 1.28)
                    if (pif([lng, lat], feature)) dots.push([lng, lat])
            return dots
        }

        const allDots: { lng: number; lat: number }[] = []
        let landFeatures: any = null
        const transactions: Transaction[] = []
        let txId = 0, lastTxTime = -300

        const spawnTx = (now: number) => {
            if (now - lastTxTime < 300) return
            lastTxTime = now
            let a = Math.floor(Math.random() * CITIES.length)
            let b = Math.floor(Math.random() * (CITIES.length - 1))
            if (b >= a) b++
            transactions.push({ id: txId++, from: CITIES[a].coords, to: CITIES[b].coords, startTime: now, duration: 2800 })
        }

        const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t))

        const render = (elapsed: number) => {
            // p=0: globe on black bg → bright silver/white
            // p=1: globe on white bg → dark charcoal grey
            const p = scrollProgressRef?.current ?? 0
            const sc = projection.scale()
            ctx.clearRect(0, 0, W, H)

            // Ocean radial gradient
            const gx = W / 2 - sc * 0.20
            const gy = H / 2 - sc * 0.20
            const grad = ctx.createRadialGradient(gx, gy, sc * 0.04, W / 2, H / 2, sc)
            // p=0 (black bg): bright highlight → mid steel → dark edge
            // p=1 (white bg): medium grey highlight → dark grey → very dark edge
            grad.addColorStop(0,    `rgb(${lerp(230,100,p)},${lerp(232,102,p)},${lerp(240,110,p)})`)
            grad.addColorStop(0.5,  `rgb(${lerp(120,62,p)}, ${lerp(125,64,p)}, ${lerp(140,72,p)})`)
            grad.addColorStop(1,    `rgb(${lerp(20,28,p)},  ${lerp(22,30,p)},  ${lerp(32,38,p)})`)

            ctx.beginPath()
            ctx.arc(W / 2, H / 2, sc, 0, 2 * Math.PI)
            ctx.fillStyle = grad
            ctx.fill()

            if (landFeatures) {
                // Dots: bright silver on black → dark grey on white
                const dR = Math.round(lerp(195, 95, p))
                const dG = Math.round(lerp(200, 97, p))
                const dB = Math.round(lerp(215, 106, p))
                // Outlines
                const oV = Math.round(lerp(255, 80, p))
                const oA = lerp(0.70, 0.50, p)
                const gA = lerp(0.18, 0.07, p)

                ctx.beginPath(); path(d3.geoGraticule()())
                ctx.strokeStyle = `rgba(${oV},${oV},${oV},${gA})`
                ctx.lineWidth = 0.5; ctx.stroke()

                ctx.beginPath()
                landFeatures.features.forEach((f: any) => path(f))
                ctx.strokeStyle = `rgba(${oV},${oV},${oV},${oA})`
                ctx.lineWidth = 0.6; ctx.stroke()

                allDots.forEach(({ lng, lat }) => {
                    const proj = projection([lng, lat])
                    if (!proj) return
                    const [px, py] = proj
                    const dx = px - W / 2, dy = py - H / 2
                    if (dx * dx + dy * dy > sc * sc) return
                    ctx.beginPath()
                    ctx.arc(px, py, 0.9, 0, 2 * Math.PI)
                    ctx.fillStyle = `rgb(${dR},${dG},${dB})`
                    ctx.fill()
                })
            }

            // ── Curved arc transaction lines ──────────────────────────────
            spawnTx(elapsed)

            // p=0: white lines on black; p=1: dark lines on white
            const trR = Math.round(lerp(255, 40, p))
            const trG = Math.round(lerp(255, 42, p))
            const trB = Math.round(lerp(255, 50, p))
            const shR = Math.round(lerp(220, 40, p))

            for (let ti = transactions.length - 1; ti >= 0; ti--) {
                const tx = transactions[ti]
                const progress = Math.min((elapsed - tx.startTime) / tx.duration, 1)
                const interp = d3.geoInterpolate(tx.from, tx.to)
                const tStart = Math.max(0, progress - 0.22)
                const pts: { x: number; y: number }[] = []

                for (let s = 0; s <= 50; s++) {
                    const tp = tStart + (progress - tStart) * (s / 50)
                    const prj = projection(interp(Math.min(tp, 1)) as [number,number])
                    if (!prj) continue
                    const [px, py] = prj
                    const dx = px - W / 2, dy = py - H / 2
                    if (dx * dx + dy * dy > sc * sc) continue
                    pts.push({ x: px, y: py })
                }

                if (pts.length >= 2) {
                    for (let i = 1; i < pts.length; i++) {
                        const frac = i / pts.length
                        ctx.beginPath()
                        ctx.moveTo(pts[i-1].x, pts[i-1].y)
                        ctx.lineTo(pts[i].x, pts[i].y)
                        ctx.strokeStyle = `rgba(${trR},${trG},${trB},${frac * frac * 0.78})`
                        ctx.lineWidth = 0.3 + frac * 2.4
                        ctx.lineCap = "round"
                        ctx.stroke()
                    }
                }

                if (pts.length > 0) {
                    const { x: hx, y: hy } = pts[pts.length - 1]
                    ctx.save()
                    ctx.shadowColor = `rgba(${shR},${shR},${shR},0.90)`
                    ctx.shadowBlur = 10
                    ctx.beginPath()
                    ctx.arc(hx, hy, 2.2, 0, 2 * Math.PI)
                    ctx.fillStyle = `rgba(${trR},${trG},${trB},0.98)`
                    ctx.fill()
                    ctx.restore()
                }

                if (progress >= 1) transactions.splice(ti, 1)
            }
        }

        const rotation = [0, 0]
        let autoRotate = true

        const timer = d3.timer((elapsed: number) => {
            if (autoRotate) { rotation[0] += 0.09; projection.rotate(rotation) }
            render(elapsed)
        })

        const onMouseDown = (e: MouseEvent) => {
            autoRotate = false
            const sx = e.clientX, sy = e.clientY, sr = [...rotation]
            const onMove = (m: MouseEvent) => {
                rotation[0] = sr[0] + (m.clientX - sx) * 0.35
                rotation[1] = Math.max(-85, Math.min(85, sr[1] - (m.clientY - sy) * 0.35))
                projection.rotate(rotation)
            }
            const onUp = () => {
                document.removeEventListener("mousemove", onMove)
                document.removeEventListener("mouseup", onUp)
                setTimeout(() => { autoRotate = true }, 10)
            }
            document.addEventListener("mousemove", onMove)
            document.addEventListener("mouseup", onUp)
        }
        canvas.addEventListener("mousedown", onMouseDown)

        fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json")
            .then(r => r.json())
            .then((data: any) => {
                landFeatures = data
                data.features.forEach((f: any) =>
                    generateDots(f).forEach(([lng, lat]) => allDots.push({ lng, lat }))
                )
            })
            .catch(() => {})

        return () => { timer.stop(); canvas.removeEventListener("mousedown", onMouseDown) }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", width: "100%", height: "100%", cursor: "grab" }}
        />
    )
}
