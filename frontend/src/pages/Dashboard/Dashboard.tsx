
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
import imgHeaderLogo from '../BetaLanding/assets/header_logo.png';
import { AddAssets } from '../AddAssets/AddAssets';
import './Dashboard.css';

// ─── Helper: interpolate between two numeric strings ─────────────────────────
function useNumericTransform(
    progress: MotionValue<number>,
    inputRange: [number, number],
    outputRange: [number, number]
): MotionValue<number> {
    return useTransform(progress, inputRange, outputRange);
}

export function Dashboard() {
    // ── Live ticker ───────────────────────────────────────────────────────
    const INITIAL_VAL = 72450000;
    const [valuation, setValuation] = useState(INITIAL_VAL);
    const [changeValue, setChangeValue] = useState(124500);
    const [changePercent, setChangePct] = useState(1.75);
    const [isPositive, setIsPositive] = useState(true);

    useEffect(() => {
        const id = setInterval(() => {
            setValuation(prev => {
                const next = Math.floor(prev + Math.random() * 200000 - 100000);
                const diff = next - INITIAL_VAL;
                setChangeValue(Math.abs(diff));
                setChangePct(Math.abs((diff / INITIAL_VAL) * 100));
                setIsPositive(diff >= 0);
                return next;
            });
        }, 1000);
        return () => clearInterval(id);
    }, []);

    // ── Scroll-linked animation ────────────────────────────────────────────
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Header solidifies
    const headerBg = useTransform(scrollYProgress, [0.1, 0.55], ['rgba(5,5,5,0)', 'rgba(5,5,5,0.92)']);
    const headerBlur = useTransform(scrollYProgress, [0.1, 0.55], ['blur(0px)', 'blur(24px)']);

    // Hero content fades out
    const heroOpacity = useTransform(scrollYProgress, [0.25, 0.60], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0.25, 0.60], [1, 0.90]);
    const heroY = useTransform(scrollYProgress, [0.25, 0.60], [0, -30]);

    // Sticky bar fades in
    const stickyOpacity = useTransform(scrollYProgress, [0.62, 0.82], [0, 1]);
    const stickyY = useTransform(scrollYProgress, [0.62, 0.82], [12, 0]);

    // Metrics shrink/move animation
    // We want the hero metrics to move towards the sticky bar position
    // Hero metrics are roughly at the center-bottom of the viewport
    const metricsOpacity = useTransform(scrollYProgress, [0.4, 0.65], [1, 0]);
    const metricsScale = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.5]);
    const metricsY = useTransform(scrollYProgress, [0.4, 0.7], [0, -100]);

    // ── UI state ───────────────────────────────────────────────────────────
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);

    // ── Market comparison pills ────────────────────────────────────────────
    const [pills, setPills] = useState({
        nifty50: true, sensex: false, nasdaq: false, sp500: false,
        dow: false, nikkei: false, ukx: false,
        btc: true, eth: false, sol: false,
        gold: true, silver: false,
    });
    const togglePill = (k: keyof typeof pills) =>
        setPills(p => ({ ...p, [k]: !p[k] }));

    const tc = isPositive ? '#22C55E' : '#ef4444';

    return (
        <div className="relative w-full bg-[#050505] text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
            <div className="aurora-bg" />

            {/* ════════════════════════════════════════════════════════════
                HEADER — fixed, no logo (logo is a separate floating element)
                Structure: [hamburger-gap | gap-fill | search + connect + avatar]
            ════════════════════════════════════════════════════════════ */}
            <motion.header
                style={{ backgroundColor: headerBg, backdropFilter: headerBlur }}
                className="fixed top-0 left-0 right-0 z-[50] border-b border-white/[0.04]"
            >
                <div className="w-full h-16 flex items-center px-5 gap-4">
                    {/* Left gap: room for hamburger nav + breathing space for the animated logo */}
                    <div className="flex-1" />

                    {/* Right actions: search · connect · avatar */}
                    <div className="flex items-center gap-3 shrink-0">

                        {/* Search */}
                        <div className="flex items-center gap-1">
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.input
                                        key="search"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 180, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        type="text"
                                        placeholder="Search assets…"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white outline-none placeholder:text-white/25"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    />
                                )}
                            </AnimatePresence>
                            <button
                                onClick={() => setIsSearchOpen(v => !v)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
                                aria-label="Search"
                            >
                                <span className="material-symbols-outlined font-light" style={{ fontSize: '18px' }}>
                                    {isSearchOpen ? 'close' : 'search'}
                                </span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/8 hidden sm:block" />

                        {/* Connect — original btn-connect-metallic */}
                        <button
                            onClick={() => setIsAddAssetOpen(true)}
                            className="hidden sm:flex btn-connect-metallic items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer group"
                            aria-label="Connect broker"
                        >
                            <span className="material-symbols-outlined text-black font-bold" style={{ fontSize: '15px' }}>link</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">Connect</span>
                        </button>

                        {/* Divider */}
                        <div className="h-5 w-px bg-white/8 hidden sm:block" />

                        {/* Avatar */}
                        <button className="relative flex items-center justify-center cursor-pointer" aria-label="User profile">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-300">
                                <img
                                    alt="User avatar"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZyZE2UMc5MUM8Ro6tFeaX1HITl05tm_N2WvcGBSK-burTiSEVc7PjWLr-RuFaKNJnDSBdzb9oxDNA1ey_3sDVem5_HN8kosvhworHlLAMBJ1tlHTHemX4eDUKHuBYXu4GSAGmSey4EDNqdwxjD_j5PxTtHsapV3pxGIkInjcRZev46uNzBgE5BfXtrP21FCZwdpjo8pkcZzGPpJ0hrDLuDqrJcqhbclyjmjIMondhOKKuVpjfQFHk8Le4dROH-RDJNWz9H6bKOXw"
                                />
                            </div>
                            {/* Online dot */}
                            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#22C55E] border border-[#050505]" />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* ════════════════════════════════════════════════════════════
                FLOATING LOGO — starts at viewport center, animates to header-left
                z-60 so it floats above the header when centred.
            ════════════════════════════════════════════════════════════ */}
            <motion.div
                style={{ top: '18px', left: '5.5rem', scale: 0.8 }}
                className="fixed z-[60] flex items-center gap-3 cursor-pointer pointer-events-auto select-none"
                onClick={() => { }}
            >
                <img src={imgHeaderLogo} alt="Wising" className="h-8 w-auto object-contain" />
                <div className="shimmer-header font-[Aboreto] text-[15px] tracking-[12px] uppercase leading-none pt-0.5">
                    WISING
                </div>
            </motion.div>

            {/* ════════════════════════════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative w-full min-h-screen flex flex-col items-center justify-center pt-16 pb-0 px-6 overflow-hidden"
            >
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="text-center w-full max-w-5xl mx-auto flex flex-col items-center"
                >
                    {/* Label */}
                    <p className="shimmer-header text-[11px] font-bold tracking-[0.45em] uppercase mb-8 opacity-70">
                        Portfolio Valuation
                    </p>

                    {/* Big valuation — metallic, no glow */}
                    <h1 className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] metallic-text font-light tracking-tight leading-none flex items-center">
                        <span>₹</span>{valuation.toLocaleString()}
                    </h1>

                    {/* Change */}
                    <div className="flex items-center gap-2 mt-5 text-sm font-light tracking-wide" style={{ color: tc }}>
                        <span className="material-symbols-outlined text-sm">{isPositive ? 'north' : 'south'}</span>
                        <span>
                            {isPositive ? '+' : '-'} ₹{changeValue.toLocaleString()}
                            &nbsp;({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                        </span>
                    </div>

                    {/* 5-col metric grid — Refined with breathing room */}
                    <motion.div
                        style={{ opacity: metricsOpacity, scale: metricsScale, y: metricsY }}
                        className="w-full border-t border-white/5 mt-24 pt-12 max-w-[1600px] mx-auto px-8 md:px-16 lg:px-24"
                    >
                        <div className="grid grid-cols-5 w-full gap-6 md:gap-10 lg:gap-16">
                            {[
                                { label: 'Portfolio\nHealth', value: <><span>8.5</span><span className="text-white/20 text-[10px]">/10</span></> },
                                { label: 'Personality\nType', value: 'Balanced' },
                                { label: 'XIRR', value: '24.5%' },
                                { label: 'Sharpe\nRatio', value: '1.8' },
                                {
                                    label: 'Win\nRate',
                                    value: (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5 shrink-0 -rotate-90" viewBox="0 0 36 36">
                                                <path fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                <path fill="none" stroke="white" strokeWidth="2" strokeDasharray="65, 100"
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                            </svg>
                                            <span>65%</span>
                                        </div>
                                    )
                                },
                            ].map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex flex-col items-center justify-center gap-8 px-2 md:px-6 ${i < 4 ? 'border-r border-white/5' : ''}`}
                                >
                                    <span
                                        className="shimmer-header text-[7px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.15em] text-center leading-[1.4] whitespace-nowrap"
                                        style={{ minHeight: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        {m.label.replace('\n', ' ')}
                                    </span>
                                    <span className="text-base md:text-xl lg:text-2xl font-light text-white tracking-tight text-center">
                                        {m.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Scroll hint */}
                    <div className="mt-14 flex flex-col items-center gap-1 opacity-20 animate-bounce">
                        <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
                        <span className="text-[8px] uppercase tracking-[0.35em]">Scroll</span>
                    </div>
                </motion.div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                STICKY PORTFOLIO BAR
                Single line: [₹Valuation + change] on LEFT | [metric pills] on RIGHT
                Visible only after hero exits (controlled by stickyOpacity)
            ════════════════════════════════════════════════════════════ */}
            <div className="sticky top-16 z-[40]">
                <motion.div
                    style={{ opacity: stickyOpacity, y: stickyY }}
                    className="w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.04] px-6 sm:px-10"
                >
                    <div className="flex items-center h-14 justify-between gap-4">
                        {/* LEFT: valuation */}
                        <div className="flex items-center gap-3 shrink-0 min-w-0">
                            <span className="hidden md:block text-[8px] font-bold uppercase tracking-[0.35em] text-white/30 whitespace-nowrap">
                                Portfolio
                            </span>
                            <span className="text-lg sm:text-xl font-light tracking-tight metallic-text leading-none whitespace-nowrap">
                                ₹{valuation.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-sm font-bold" style={{ color: tc, fontSize: '14px' }}>
                                    {isPositive ? 'north_east' : 'south_east'}
                                </span>
                                <span className="text-xs font-bold" style={{ color: tc }}>
                                    {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>

                        {/* RIGHT: metric pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                            {[
                                { label: 'Health', value: '8.5' },
                                { label: 'Type', value: 'Balanced' },
                                { label: 'XIRR', value: '24.5%' },
                                { label: 'Sharpe', value: '1.8' },
                                { label: 'Win Rate', value: '65%' },
                            ].map(m => (
                                <div key={m.label} className="metric-card-refined flex-shrink-0 text-center px-3 py-1.5">
                                    <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1 whitespace-nowrap">{m.label}</span>
                                    <span className="block text-sm font-semibold whitespace-nowrap">{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ════════════════════════════════════════════════════════════
                DASHBOARD SCROLLABLE CONTENT
            ════════════════════════════════════════════════════════════ */}
            <main className="w-full px-6 sm:px-10 pt-12 pb-24">

                {/* Row 1 — Historical Performance (col-8) + P&L Status (col-4) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-stretch">

                    {/* Historical Performance */}
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                            <div>
                                <h3 className="shimmer-header text-xs lg:text-sm font-bold mb-1">Historical Performance</h3>
                                <p className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Global Portfolio Trend Line</p>
                            </div>
                            <div className="flex gap-5 text-[9px] font-bold tracking-widest uppercase text-white/30">
                                {['1M', '3M', '1Y', 'ALL'].map(t => (
                                    <button key={t}
                                        className="hover:text-white transition-colors"
                                        style={t === '1Y' ? { color: 'white', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '1px' } : {}}
                                    >{t}</button>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel rounded-3xl p-6 lg:p-10 flex-1 flex items-center" style={{ minHeight: 440 }}>
                            <svg className="w-full" style={{ height: 360 }} preserveAspectRatio="none" viewBox="0 0 1000 360">
                                <defs>
                                    <linearGradient id="pgGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                                        <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                                        <stop offset="65%" stopColor="#22C55E" stopOpacity="0.06" />
                                        <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {[90, 180, 270].map(y => (
                                    <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
                                ))}
                                <path d="M0,320 Q100,295 200,310 T400,256 T600,202 T800,108 T1000,72 V360 H0 Z" fill="url(#pgGrad)" />
                                <path d="M0,320 Q100,295 200,310 T400,256 T600,202 T800,108 T1000,72"
                                    fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round"
                                    style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.4))' }} />
                                <circle cx="800" cy="108" r="5" fill="#22C55E" className="animate-pulse" />
                            </svg>
                        </div>
                    </div>

                    {/* P&L Status */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="mb-6">
                            <h3 className="shimmer-header text-xs lg:text-sm font-bold mb-1">Profit &amp; Loss Status</h3>
                            <p className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Realized &amp; Unrealized Gains</p>
                        </div>
                        <div className="flex-1 flex flex-col gap-4" style={{ minHeight: 440 }}>
                            {[
                                { label: 'Realized P&L', value: '+₹30.3 L', color: '#22C55E', size: 'text-4xl lg:text-5xl', border: 'border-white/5', bg: 'bg-white/[0.02]' },
                                { label: 'Unrealized P&L', value: '+₹1.07 Cr', color: '#22C55E', size: 'text-4xl lg:text-5xl', border: 'border-white/5', bg: 'bg-white/[0.02]' },
                                { label: 'Combined Net P&L', value: '+₹1.37 Cr', color: undefined, size: 'text-5xl lg:text-6xl metallic-text tracking-tighter', border: 'border-white/10', bg: 'bg-white/[0.04]' },
                            ].map(card => (
                                <div key={card.label}
                                    className={`flex-1 flex flex-col justify-center p-6 lg:p-7 rounded-3xl border ${card.border} ${card.bg}`}
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/35 mb-3 block">{card.label}</span>
                                    <span className={`pl-value-refined ${card.size} font-light leading-none`}
                                        style={card.color ? { color: card.color } : {}}
                                    >{card.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Row 2 — Weighted Returns (col-8) + Asset Allocation (col-4) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-stretch">

                    {/* Weighted Returns scatter */}
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="mb-6">
                            <h3 className="shimmer-header text-xs lg:text-sm font-bold mb-1">Weighted Returns</h3>
                            <p className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Time vs Money Weighted Analysis</p>
                        </div>
                        <div className="glass-panel rounded-3xl p-6 lg:p-10 flex-1 relative" style={{ minHeight: 480 }}>
                            <div className="absolute inset-10 lg:inset-14 border-l border-b border-white/8">
                                {[
                                    { bottom: '20%', left: '15%', color: '#A5D8FF', size: 'w-2 h-2', op: 0.6 },
                                    { bottom: '40%', left: '35%', color: '#A5D8FF', size: 'w-3 h-3', op: 1 },
                                    { bottom: '55%', left: '50%', color: '#E0BFB8', size: 'w-2 h-2', op: 1 },
                                    { bottom: '75%', left: '65%', color: 'white', size: 'w-3 h-3', op: 1 },
                                    { bottom: '85%', left: '85%', color: '#A5D8FF', size: 'w-2 h-2', op: 0.8 },
                                ].map((d, i) => (
                                    <div key={i} className={`absolute ${d.size} rounded-full`}
                                        style={{
                                            bottom: d.bottom, left: d.left, backgroundColor: d.color, opacity: d.op,
                                            boxShadow: `0 0 12px ${d.color}`
                                        }} />
                                ))}
                                <svg className="w-full h-full opacity-8" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeDasharray="2 2" strokeWidth="0.8" />
                                </svg>
                                <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-[0.2em] uppercase text-white/20 whitespace-nowrap">Time Weighted (%)</p>
                                <p className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-bold tracking-[0.2em] uppercase text-white/20 whitespace-nowrap">Money Weighted (%)</p>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-4">
                                {[{ color: '#A5D8FF', label: 'Portfolio' }, { color: '#E0BFB8', label: 'Benchmark' }].map(l => (
                                    <div key={l.label} className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: l.color }} />
                                        <span className="text-[7px] font-bold tracking-widest text-white/25 uppercase">{l.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Asset Allocation donut */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="mb-6">
                            <h3 className="shimmer-header text-xs lg:text-sm font-bold mb-1">Asset Allocation</h3>
                            <p className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Asset Distribution Insights</p>
                        </div>
                        <div className="glass-panel rounded-3xl p-7 lg:p-9 flex flex-col flex-1" style={{ minHeight: 480 }}>
                            <div className="flex-1 flex items-center justify-center py-2">
                                <div className="relative w-48 h-48 lg:w-52 lg:h-52 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        {[
                                            { color: '#3730a3', da: '100 138.48', off: '0' },
                                            { color: '#0f766e', da: '50 188.74', off: '-100' },
                                            { color: '#1e293b', da: '35 203.74', off: '-150' },
                                            { color: '#4b5563', da: '25 213.74', off: '-185' },
                                            { color: '#E0BFB8', da: '15 223.74', off: '-210' },
                                            { color: '#f97316', da: '10 228.74', off: '-225' },
                                            { color: '#A5D8FF', da: '4 234.74', off: '-235' },
                                        ].map((s, i) => (
                                            <circle key={i} className="sector-slice cursor-pointer" cx="50" cy="50" r="38"
                                                fill="transparent" stroke={s.color}
                                                strokeDasharray={s.da} strokeDashoffset={s.off} strokeWidth="14" />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">Primary</span>
                                        <span className="text-base lg:text-lg font-black tracking-tight metallic-text">Equity</span>
                                        <span className="text-[11px] font-bold text-[#22C55E]">42%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-4 mt-2">
                                {[
                                    { color: '#3730a3', label: 'Equity', pct: '42%' },
                                    { color: '#0f766e', label: 'Crypto', pct: '21%' },
                                    { color: '#1e293b', label: 'Commodities', pct: '15%' },
                                    { color: '#4b5563', label: 'Collectibles', pct: '10%' },
                                    { color: '#E0BFB8', label: 'VC / PE', pct: '6%' },
                                    { color: '#f97316', label: 'Auto', pct: '4%' },
                                ].map((l, i) => (
                                    <div key={i} className="legend-item flex items-center gap-2.5 cursor-default">
                                        <div className="legend-dot w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                                        <div className="flex flex-col">
                                            <span className="legend-text text-[9px] text-white/35 uppercase tracking-[0.15em] leading-none mb-1 font-medium transition-colors">{l.label}</span>
                                            <span className="text-[14px] font-bold text-white/90">{l.pct}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 3 — Advanced Market Comparison (full width) */}
                <div className="mt-4">
                    <div className="mb-8">
                        <h3 className="shimmer-header text-xs lg:text-sm font-bold mb-1">Advanced Market Comparison</h3>
                        <p className="text-[9px] text-white/30 tracking-[0.25em] uppercase">Multi-Asset Correlation Overlay</p>
                    </div>
                    <div className="glass-panel rounded-3xl p-6 lg:p-10 flex flex-col gap-8">

                        {/* Pill rows */}
                        <div className="space-y-5">
                            {[
                                {
                                    cat: 'Equity', items: [
                                        { id: 'nifty50', label: 'Nifty 50', type: 'rose-gold-pill' },
                                        { id: 'sensex', label: 'Sensex', type: 'rose-gold-pill' },
                                        { id: 'nasdaq', label: 'NASDAQ', type: 'orange-pill' },
                                        { id: 'sp500', label: 'S&P 500', type: 'orange-pill' },
                                        { id: 'dow', label: 'Dow Jones', type: 'rose-gold-pill' },
                                        { id: 'nikkei', label: 'Nikkei 225', type: 'ice-blue-pill' },
                                        { id: 'ukx', label: 'UKX', type: 'silver-pill' },
                                    ]
                                },
                                {
                                    cat: 'Crypto', items: [
                                        { id: 'btc', label: 'BTC', type: 'ice-blue-pill' },
                                        { id: 'eth', label: 'ETH', type: 'ice-blue-pill' },
                                        { id: 'sol', label: 'SOL', type: 'ice-blue-pill' },
                                    ]
                                },
                                {
                                    cat: 'Commodities', items: [
                                        { id: 'gold', label: 'Gold', type: 'emerald-pill' },
                                        { id: 'silver', label: 'Silver', type: 'silver-pill' },
                                    ]
                                },
                            ].map(row => (
                                <div key={row.cat} className="flex flex-col lg:flex-row lg:items-center gap-4 border-b border-white/5 pb-5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 lg:w-36 shrink-0">{row.cat}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {row.items.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => togglePill(item.id as keyof typeof pills)}
                                                className="pill-toggle-label"
                                                data-checked={pills[item.id as keyof typeof pills]}
                                                data-pill={item.type}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="relative">
                            <div className="flex gap-3" style={{ height: 'clamp(260px, 35vw, 520px)' }}>
                                <div className="flex flex-col justify-between text-[7px] lg:text-[8px] font-bold text-white/20 uppercase tracking-widest pr-2 border-r border-white/5">
                                    {['8.0 Cr', '6.5 Cr', '5.0 Cr', '3.5 Cr', '2.0 Cr', '0'].map(v => <span key={v}>{v}</span>)}
                                </div>
                                <div className="flex-1 relative">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
                                        <defs>
                                            <linearGradient id="mcGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                                                <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {[0, 80, 160, 240, 320].map(y => (
                                            <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="white" strokeOpacity="0.03" strokeWidth="0.5" />
                                        ))}
                                        <path d="M0,340 Q150,320 300,280 T600,200 T1000,120 V400 H0 Z" fill="url(#mcGrad)" />
                                        <path d="M0,340 Q150,320 300,280 T600,200 T1000,120"
                                            fill="none" stroke="white" strokeWidth="3"
                                            style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.35))' }} />
                                        <path d="M0,360 Q150,370 300,340 T600,280 T1000,240" fill="none" stroke="#E0BFB8" strokeOpacity="0.8" strokeWidth="2" />
                                        <path d="M0,380 Q150,350 300,310 T600,180 T1000,60" fill="none" stroke="#A5D8FF" strokeOpacity="0.8" strokeWidth="2" />
                                        <path d="M0,350 Q150,340 300,345 T600,330 T1000,310" fill="none" stroke="#10b981" strokeOpacity="0.8" strokeWidth="2" />
                                    </svg>
                                    <div className="absolute -bottom-7 left-0 right-0 flex justify-between text-[7px] font-bold text-white/25 uppercase tracking-[0.25em]">
                                        {['Jan 25', 'Apr 25', 'Jul 25', 'Oct 25'].map(l => <span key={l}>{l}</span>)}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between text-[7px] lg:text-[8px] font-bold text-white/20 uppercase tracking-widest pl-2 border-l border-white/5">
                                    {['+60%', '+45%', '+30%', '+15%', '0%'].map(v => <span key={v}>{v}</span>)}
                                    <span style={{ color: '#ef4444' }}>-15%</span>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
                                {[
                                    { color: 'white', label: 'Your Portfolio', sub: 'Primary Axis (Val)' },
                                    { color: '#E0BFB8', label: 'Nifty 50', sub: '+18.2% Return' },
                                    { color: '#A5D8FF', label: 'Bitcoin', sub: '+54.8% Return' },
                                    { color: '#10b981', label: 'Gold', sub: '+8.4% Return' },
                                ].map((l, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                                        <div>
                                            <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: l.color }}>{l.label}</p>
                                            <p className="text-[7px] text-white/35 uppercase tracking-widest">{l.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ════════════════════════════════════════════════════════════
                Add Asset Modal
            ════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {isAddAssetOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 backdrop-blur-md"
                    >
                        <div className="min-h-screen w-full relative">
                            <AddAssets onClose={() => setIsAddAssetOpen(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
