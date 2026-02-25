import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { GeometricOverlay } from "../components/GeometricOverlay";

// Scene 5a: Unified Wealth — Dashboard icons merging into one
export const GridUnifiedWealth: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const icons = ["STOCKS", "CRYPTO", "F&O", "BONDS", "MUTUAL FUNDS"];

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(192,192,192,0.06) 0%, transparent 50%)" }} />
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">01/ System</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Unified Wealth
                    </MetallicText>
                </div>

                <div className="flex items-center gap-4">
                    {icons.map((icon, i) => {
                        const delay = i * 8;
                        const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
                        const mergeX = interpolate(s, [0, 1], [(i - 2) * 200, (i - 2) * 60]);
                        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                        return (
                            <div
                                key={i}
                                style={{ opacity, transform: `translateX(${mergeX}px)` }}
                                className="px-4 py-3 border border-[#333] rounded-lg bg-[#0f0f0f]"
                            >
                                <span className="font-['Manrope',sans-serif] text-[11px] text-[#888] tracking-[2px] uppercase">{icon}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Merge indicator */}
                <div style={{ opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    <div className="px-8 py-4 border border-[#444] rounded-xl bg-[#111]">
                        <span className="font-['Manrope',sans-serif] text-sm text-white tracking-[3px] uppercase">One Dashboard</span>
                    </div>
                </div>

                <p className="font-['Manrope',sans-serif] text-[15px] text-[#666] tracking-[1px] text-center max-w-[500px] leading-[1.6]"
                    style={{ opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    See everything you own in 10 seconds instead of logging into 15 apps.
                </p>
            </div>
        </AbsoluteFill>
    );
};

// Scene 5b: Intelligence Layer — AI chat bubble
export const GridIntelligenceLayer: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const questionOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const answerOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const questionSlide = spring({ frame: frame - 10, fps, config: { damping: 14 } });
    const answerSlide = spring({ frame: frame - 80, fps, config: { damping: 14 } });

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(100,149,237,0.06) 0%, transparent 50%)" }} />
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">02 Analysis</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Intelligence Layer
                    </MetallicText>
                </div>

                <div className="flex flex-col gap-4 w-[600px]">
                    {/* Question bubble */}
                    <div className="flex justify-end" style={{ opacity: questionOpacity, transform: `translateX(${interpolate(questionSlide, [0, 1], [100, 0])}px)` }}>
                        <div className="px-6 py-4 bg-[#1a1a2e] border border-[#333] rounded-2xl rounded-br-sm max-w-[400px]">
                            <p className="font-['Manrope',sans-serif] text-sm text-white tracking-[0.5px]">
                                How's my portfolio vs Nifty this quarter?
                            </p>
                        </div>
                    </div>

                    {/* Answer bubble */}
                    <div className="flex justify-start" style={{ opacity: answerOpacity, transform: `translateX(${interpolate(answerSlide, [0, 1], [-100, 0])}px)` }}>
                        <div className="px-6 py-4 bg-[#111] border border-[#2a2a2a] rounded-2xl rounded-bl-sm max-w-[450px]">
                            <p className="font-['Manrope',sans-serif] text-sm text-[#ccc] tracking-[0.5px] leading-[1.6]">
                                Your portfolio returned <span className="text-green-400">+12.4%</span> this quarter, outperforming Nifty 50 by <span className="text-green-400">+3.2%</span>. Top contributors: TCS (+18%), HDFC Bank (+15%).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Scene 5c: Behavioural Mirror — Trading patterns
export const GridBehaviouralMirror: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const patterns = [
        { label: "PANIC SELL", cost: "-₹42,000", color: "#ef4444", delay: 20 },
        { label: "FOMO BUY", cost: "-₹28,500", color: "#f97316", delay: 50 },
        { label: "OVERTRADING", cost: "-₹15,200", color: "#eab308", delay: 80 },
    ];

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(239,68,68,0.05) 0%, transparent 50%)" }} />
            <div className="flex flex-col items-center justify-center h-full gap-10">
                <div className="flex flex-col items-center gap-2">
                    <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[3px] uppercase text-[#666]">03/ Evaluation</p>
                    <MetallicText className="font-['Syne',sans-serif] text-4xl font-bold tracking-[4px] uppercase">
                        Behavioural Mirror
                    </MetallicText>
                </div>

                <div className="flex flex-col gap-4 w-[500px]">
                    {patterns.map((p, i) => {
                        const s = spring({ frame: frame - p.delay, fps, config: { damping: 14 } });
                        const x = interpolate(s, [0, 1], [-300, 0]);
                        const opacity = interpolate(frame, [p.delay, p.delay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                        return (
                            <div key={i} className="flex items-center justify-between px-6 py-4 bg-[#111] border border-[#222] rounded-xl" style={{ opacity, transform: `translateX(${x}px)` }}>
                                <span className="font-['Manrope',sans-serif] text-sm text-white tracking-[2px] uppercase">{p.label}</span>
                                <span className="font-['Manrope',sans-serif] text-sm tracking-[1px]" style={{ color: p.color }}>{p.cost}</span>
                            </div>
                        );
                    })}
                </div>

                <p className="font-['Manrope',sans-serif] text-[13px] text-[#666] tracking-[1px] text-center"
                    style={{ opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                    AI shows what each pattern costs you.
                </p>
            </div>
        </AbsoluteFill>
    );
};
