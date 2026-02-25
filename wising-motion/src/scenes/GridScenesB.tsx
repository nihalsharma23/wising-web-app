import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { GeometricOverlay } from "../components/GeometricOverlay";
import { evolvePath } from "@remotion/paths";

// Scene 5d: Performance Truth — Line chart racing against benchmarks
export const GridPerformanceTruth: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const portfolioPath = "M 100 350 L 200 310 L 300 330 L 400 280 L 500 260 L 600 200 L 700 180 L 800 120";
    const niftyPath = "M 100 350 L 200 330 L 300 340 L 400 310 L 500 300 L 600 270 L 700 260 L 800 220";
    const btcPath = "M 100 350 L 200 380 L 300 300 L 400 350 L 500 250 L 600 280 L 700 200 L 800 160";

    const progress = interpolate(frame, [30, 180], [0, 1], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp",
        easing: Easing.bezier(0.42, 0, 0.58, 1),
    });

    const p1 = evolvePath(progress, portfolioPath);
    const p2 = evolvePath(progress, niftyPath);
    const p3 = evolvePath(progress, btcPath);

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="flex flex-col items-center justify-center h-full gap-8">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">04 Performance</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Performance Truth
                    </MetallicText>
                </div>

                <svg width="900" height="400" viewBox="0 0 900 400">
                    {[100, 200, 300, 400].map((y) => (
                        <line key={y} x1="80" y1={y} x2="820" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}
                    <path d={portfolioPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeDasharray={p1.strokeDasharray} strokeDashoffset={p1.strokeDashoffset} />
                    <path d={niftyPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeDasharray={p2.strokeDasharray} strokeDashoffset={p2.strokeDashoffset} opacity={0.6} />
                    <path d={btcPath} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeDasharray={p3.strokeDasharray} strokeDashoffset={p3.strokeDashoffset} opacity={0.5} />
                </svg>

                <div className="flex gap-8" style={{ opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    <div className="flex items-center gap-2"><div className="w-3 h-[2px] bg-green-500" /><span className="font-['Manrope',sans-serif] text-[11px] text-[#888] tracking-[1px] uppercase">Your Portfolio</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-[2px] bg-blue-500 opacity-60" /><span className="font-['Manrope',sans-serif] text-[11px] text-[#888] tracking-[1px] uppercase">Nifty 50</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-[2px] bg-amber-500 opacity-50" /><span className="font-['Manrope',sans-serif] text-[11px] text-[#888] tracking-[1px] uppercase">Bitcoin</span></div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Scene 5e: Context Feed — News ticker filtering
export const GridContextFeed: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const articles = [
        { text: "Infosys Q3 Earnings Beat Estimates", relevant: true, delay: 10 },
        { text: "Global Oil Prices Rise 3%", relevant: false, delay: 30 },
        { text: "TCS Wins $500M Deal", relevant: true, delay: 50 },
        { text: "European Markets Close Mixed", relevant: false, delay: 70 },
        { text: "HDFC Bank Reports Strong NIM", relevant: true, delay: 90 },
        { text: "Crypto Market Sees Pullback", relevant: false, delay: 110 },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">05/ Content</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Context Feed
                    </MetallicText>
                </div>

                <div className="flex flex-col gap-3 w-[600px]">
                    {articles.map((a, i) => {
                        const s = spring({ frame: frame - a.delay, fps, config: { damping: 14 } });
                        const x = interpolate(s, [0, 1], [400, 0]);
                        const fadeOut = a.relevant ? 1 : interpolate(frame, [a.delay + 40, a.delay + 60], [1, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                        const opacity = interpolate(frame, [a.delay, a.delay + 10], [0, fadeOut], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                        return (
                            <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-lg" style={{
                                opacity,
                                transform: `translateX(${x}px)`,
                                backgroundColor: a.relevant ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                                borderLeft: a.relevant ? "2px solid rgba(16,185,129,0.5)" : "2px solid transparent",
                            }}>
                                <span className="font-['Manrope',sans-serif] text-sm text-[#ccc] tracking-[0.5px]">{a.text}</span>
                                {a.relevant && <span className="font-['Manrope',sans-serif] text-[10px] text-green-500 tracking-[1px] uppercase ml-auto">Relevant</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Scene 5f: Health Metrics — Radial gauges
export const GridHealthMetrics: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const metrics = [
        { label: "Diversification", value: 78, color: "#10b981", delay: 10 },
        { label: "Volatility", value: 35, color: "#f59e0b", delay: 30 },
        { label: "Concentration", value: 62, color: "#3b82f6", delay: 50 },
    ];

    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">06 Vitality</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Health Metrics
                    </MetallicText>
                </div>

                <div className="flex gap-16">
                    {metrics.map((m, i) => {
                        const progress = interpolate(frame, [m.delay, m.delay + 90], [0, m.value / 100], {
                            extrapolateLeft: "clamp", extrapolateRight: "clamp",
                            easing: Easing.bezier(0.42, 0, 0.58, 1),
                        });
                        const dashOffset = circumference * (1 - progress);
                        const opacity = interpolate(frame, [m.delay, m.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                        return (
                            <div key={i} className="flex flex-col items-center gap-4" style={{ opacity }}>
                                <svg width="150" height="150" viewBox="0 0 150 150">
                                    <circle cx="75" cy="75" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <circle
                                        cx="75" cy="75" r={radius}
                                        fill="none" stroke={m.color} strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                        transform="rotate(-90 75 75)"
                                        style={{ filter: `drop-shadow(0 0 6px ${m.color}40)` }}
                                    />
                                    <text x="75" y="80" textAnchor="middle" fill="white" fontSize="24" fontFamily="Syne, sans-serif" fontWeight="bold">
                                        {Math.round(progress * 100)}
                                    </text>
                                </svg>
                                <span className="font-['Manrope',sans-serif] text-[11px] text-[#888] tracking-[2px] uppercase">{m.label}</span>
                            </div>
                        );
                    })}
                </div>

                <p className="font-['Manrope',sans-serif] text-[13px] text-[#666] tracking-[1px] text-center"
                    style={{ opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    Measure your portfolio's health like your body's vitals.
                </p>
            </div>
        </AbsoluteFill>
    );
};
