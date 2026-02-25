import React from "react";
import { AbsoluteFill, Sequence, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { GeometricOverlay } from "../components/GeometricOverlay";

// ─── AGGREGATE SCENE ───────────────────────────────────────────
const brokers = [
    { name: "Zerodha", file: "zerodha.jpg" },
    { name: "Angel One", file: "angelone.png" },
    { name: "IBKR", file: "ibkr.jpg" },
    { name: "Groww", file: "groww.svg" },
    { name: "Robinhood", file: "robinhood.png" },
    { name: "Alpaca", file: "alpaca.svg" },
    { name: "Fidelity", file: "fidelity.jpg" },
];
const cryptos = [
    { name: "Binance", file: "binance.svg" },
    { name: "Coinbase", file: "coinbase.png" },
    { name: "Kraken", file: "kraken.svg" },
    { name: "CoinDCX", file: "coindcx.svg" },
    { name: "Hyperliquid", file: "hyperliquid.png" },
    { name: "Aster", file: "aster.svg" },
    { name: "Lighter", file: "lighter.jpg" },
];

import { staticFile } from "remotion";

const AggregateCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const renderRow = (items: typeof brokers, startDelay: number) => (
        <div className="flex items-center gap-5">
            {items.map((item, i) => {
                const s = spring({ frame: frame - (i * 6 + startDelay), fps, config: { damping: 14 } });
                const scale = interpolate(s, [0, 1], [0, 1]);
                const opacity = interpolate(frame, [i * 6 + startDelay, i * 6 + startDelay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                    <div key={i} className="flex flex-col items-center gap-1" style={{ opacity, transform: `scale(${scale})` }}>
                        <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center overflow-hidden">
                            <Img src={staticFile(item.file)} style={{ width: 32, height: 32, objectFit: "contain" }} />
                        </div>
                        <span className="font-['Manrope',sans-serif] text-[8px] text-[#666] tracking-[1px] uppercase">{item.name}</span>
                    </div>
                );
            })}
        </div>
    );

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(192,192,192,0.06) 0%, transparent 60%)" }} />

            <div className="flex flex-col items-center justify-center h-full gap-6 px-16">
                {/* Letter + Title */}
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="font-['Cormorant_Garamond',serif] text-[120px] leading-none"
                        style={{
                            backgroundImage: "linear-gradient(to bottom, white 30%, rgba(255,255,255,0.1))",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}
                    >
                        A
                    </div>
                    <MetallicText className="font-['Syne',sans-serif] text-3xl font-bold tracking-[10px] uppercase">
                        Aggregate
                    </MetallicText>
                </div>

                {/* Broker Logos Row */}
                <div className="flex flex-col items-center gap-3 mt-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#555]">Stock Brokers</p>
                    {renderRow(brokers, 10)}
                </div>

                {/* Crypto Logos Row */}
                <div className="flex flex-col items-center gap-3 mt-1">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#555]">Crypto Exchanges</p>
                    {renderRow(cryptos, 60)}
                </div>

                {/* Unification text */}
                <p className="font-['Manrope',sans-serif] text-sm text-[#888] text-center tracking-[0.5px] capitalize mt-2"
                    style={{ opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    Unified Custody Of Your Global Investment Footprint.
                </p>
            </div>
        </AbsoluteFill>
    );
};

// ─── ANALYZE SCENE ─────────────────────────────────────────────
const AnalyzeCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Candlestick data
    const candles = [
        { o: 280, c: 240, h: 220, l: 290, up: true },
        { o: 240, c: 260, h: 230, l: 270, up: false },
        { o: 260, c: 220, h: 200, l: 270, up: true },
        { o: 220, c: 250, h: 210, l: 260, up: false },
        { o: 250, c: 200, h: 185, l: 260, up: true },
        { o: 200, c: 230, h: 190, l: 240, up: false },
        { o: 230, c: 180, h: 165, l: 240, up: true },
        { o: 180, c: 210, h: 170, l: 220, up: false },
        { o: 210, c: 160, h: 145, l: 220, up: true },
        { o: 160, c: 140, h: 130, l: 170, up: true },
    ];

    const trendLine = "M 80 280 L 600 130";
    const maLine = "M 80 270 Q 200 260 300 230 Q 400 200 500 170 Q 550 155 600 140";

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)" }} />

            <div className="flex items-center justify-center h-full gap-12 px-16">
                {/* Left: Charts */}
                <div className="flex flex-col gap-4">
                    <svg width="680" height="350" viewBox="0 0 680 350">
                        {/* Grid */}
                        {[80, 150, 220, 290].map((y) => (
                            <line key={y} x1="60" y1={y} x2="640" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        ))}
                        {/* Y-axis labels */}
                        {["$200", "$180", "$160", "$140"].map((label, i) => (
                            <text key={i} x="45" y={85 + i * 70} fill="#444" fontSize="9" fontFamily="Manrope, sans-serif" textAnchor="end">{label}</text>
                        ))}
                        {/* Candlesticks */}
                        {candles.map((c, i) => {
                            const x = 100 + i * 55;
                            const delay = i * 5 + 10;
                            const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                            const bodyTop = Math.min(c.o, c.c);
                            const bodyH = Math.abs(c.o - c.c);
                            return (
                                <g key={i} opacity={opacity}>
                                    <line x1={x} y1={c.h} x2={x} y2={c.l} stroke={c.up ? "#10b981" : "#ef4444"} strokeWidth="1.5" />
                                    <rect x={x - 8} y={bodyTop} width={16} height={Math.max(bodyH, 4)} fill={c.up ? "#10b981" : "#ef4444"} rx="1" />
                                </g>
                            );
                        })}
                        {/* Trendline */}
                        <line x1="80" y1="280" x2="600" y2="130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 3"
                            style={{ opacity: interpolate(frame, [70, 100], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
                        {/* MA line */}
                        <path d={maLine} fill="none" stroke="#f59e0b" strokeWidth="1.5"
                            style={{ opacity: interpolate(frame, [80, 110], [0, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
                        {/* Labels */}
                        <text x="610" y="125" fill="#3b82f6" fontSize="9" fontFamily="Manrope" opacity={interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>TREND</text>
                        <text x="610" y="145" fill="#f59e0b" fontSize="9" fontFamily="Manrope" opacity={interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>MA(20)</text>
                    </svg>

                    {/* Indicators row */}
                    <div className="flex gap-4 ml-16" style={{ opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                        {[{ label: "RSI", value: "62.4", color: "#10b981" }, { label: "MACD", value: "+0.8", color: "#3b82f6" }, { label: "ADX", value: "28.1", color: "#f59e0b" }].map((ind, i) => (
                            <div key={i} className="px-4 py-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg flex items-center gap-2">
                                <span className="font-['Manrope',sans-serif] text-[9px] text-[#666] tracking-[1px] uppercase">{ind.label}</span>
                                <span className="font-['Syne',sans-serif] text-sm font-bold" style={{ color: ind.color }}>{ind.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Title */}
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="font-['Cormorant_Garamond',serif] text-[120px] leading-none"
                        style={{ backgroundImage: "linear-gradient(to bottom, white 30%, rgba(255,255,255,0.1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                        A
                    </div>
                    <MetallicText className="font-['Syne',sans-serif] text-3xl font-bold tracking-[10px] uppercase">
                        Analyze
                    </MetallicText>
                    <p className="font-['Manrope',sans-serif] text-sm text-[#888] text-center tracking-[0.5px] capitalize max-w-[280px] leading-[1.6]">
                        Advanced Portfolio Intelligence Powered By AI. Ask Questions. Get Answers.
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// ─── EVOLVE SCENE ──────────────────────────────────────────────
const EvolveCard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Neural network nodes
    const layers = [
        [{ x: 200, y: 250 }, { x: 200, y: 400 }, { x: 200, y: 550 }, { x: 200, y: 700 }],
        [{ x: 450, y: 300 }, { x: 450, y: 475 }, { x: 450, y: 650 }],
        [{ x: 700, y: 350 }, { x: 700, y: 525 }, { x: 700, y: 700 }],
        [{ x: 950, y: 400 }, { x: 950, y: 575 }],
        [{ x: 1150, y: 490 }],
    ];

    const allConnections: Array<{ from: { x: number; y: number }; to: { x: number; y: number }; delay: number }> = [];
    for (let l = 0; l < layers.length - 1; l++) {
        for (const fromNode of layers[l]) {
            for (const toNode of layers[l + 1]) {
                allConnections.push({ from: fromNode, to: toNode, delay: l * 15 + 20 });
            }
        }
    }

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)" }} />

            <div className="flex items-center justify-center h-full">
                {/* Neural network */}
                <svg width="1300" height="900" viewBox="0 0 1300 900" className="absolute left-[50px]">
                    {/* Connections */}
                    {allConnections.map((conn, i) => {
                        const opacity = interpolate(frame, [conn.delay, conn.delay + 20], [0, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                        const pulse = Math.sin((frame - conn.delay) * 0.08) * 0.1 + 0.15;
                        return (
                            <line key={`c${i}`} x1={conn.from.x} y1={conn.from.y} x2={conn.to.x} y2={conn.to.y}
                                stroke="#8b5cf6" strokeWidth="1" opacity={Math.max(opacity, 0) * (frame > conn.delay + 40 ? pulse / 0.15 : 1)} />
                        );
                    })}
                    {/* Nodes */}
                    {layers.map((layer, l) =>
                        layer.map((node, n) => {
                            const delay = l * 10 + 5;
                            const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
                            const r = interpolate(s, [0, 1], [0, 8]);
                            const glow = Math.sin((frame + l * 20 + n * 10) * 0.06) * 3 + 5;
                            return (
                                <g key={`n${l}-${n}`}>
                                    <circle cx={node.x} cy={node.y} r={r + glow * 0.5} fill="none" stroke="#8b5cf640" strokeWidth="1" />
                                    <circle cx={node.x} cy={node.y} r={r} fill="#8b5cf6" opacity={0.8} style={{ filter: `drop-shadow(0 0 ${glow}px rgba(139,92,246,0.5))` }} />
                                </g>
                            );
                        })
                    )}
                    {/* Labels */}
                    <text x="200" y="180" fill="#555" fontSize="10" fontFamily="Manrope" textAnchor="middle" letterSpacing="2">INPUT</text>
                    <text x="450" y="230" fill="#555" fontSize="10" fontFamily="Manrope" textAnchor="middle" letterSpacing="2">HIDDEN</text>
                    <text x="700" y="280" fill="#555" fontSize="10" fontFamily="Manrope" textAnchor="middle" letterSpacing="2">PROCESS</text>
                    <text x="950" y="330" fill="#555" fontSize="10" fontFamily="Manrope" textAnchor="middle" letterSpacing="2">REFINE</text>
                    <text x="1150" y="430" fill="#555" fontSize="10" fontFamily="Manrope" textAnchor="middle" letterSpacing="2">OUTPUT</text>
                </svg>

                {/* Title overlay */}
                <div className="absolute right-20 flex flex-col items-center gap-4">
                    <div
                        className="font-['Cormorant_Garamond',serif] text-[120px] leading-none"
                        style={{ backgroundImage: "linear-gradient(to bottom, white 30%, rgba(255,255,255,0.1))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                        E
                    </div>
                    <MetallicText className="font-['Syne',sans-serif] text-3xl font-bold tracking-[10px] uppercase">
                        Evolve
                    </MetallicText>
                    <p className="font-['Manrope',sans-serif] text-sm text-[#888] text-center tracking-[0.5px] capitalize max-w-[280px] leading-[1.6]">
                        AI Behavioral Analysis That Learns From Your Investment History.
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// ─── EXPORT ────────────────────────────────────────────────────
export const FeatureCardsScene: React.FC = () => {
    const CARD_DURATION = 180; // 3s each at 60fps
    const cards = [AggregateCard, AnalyzeCard, EvolveCard];

    return (
        <AbsoluteFill>
            {cards.map((Card, i) => (
                <Sequence key={i} from={i * CARD_DURATION} durationInFrames={CARD_DURATION}>
                    <Card />
                </Sequence>
            ))}
        </AbsoluteFill>
    );
};
