import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { ShimmerBorder } from "../components/ShimmerBorder";
import { GeometricOverlay } from "../components/GeometricOverlay";

// Scene 6: CTA
export const CTAScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const s = spring({ frame, fps, config: { damping: 12 } });
    const scale = interpolate(s, [0, 1], [0.8, 1]);
    const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
    const counterOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 40%)" }} />

            {/* Corner brackets */}
            <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080">
                <path d="M 60 60 L 60 120 M 60 60 L 120 60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
                <path d="M 1860 60 L 1860 120 M 1860 60 L 1800 60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
                <path d="M 60 1020 L 60 960 M 60 1020 L 120 1020" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
                <path d="M 1860 1020 L 1860 960 M 1860 1020 L 1800 1020" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            </svg>

            <div className="flex flex-col items-center justify-center h-full gap-8" style={{ opacity, transform: `scale(${scale})` }}>
                <ShimmerBorder className="w-[440px]">
                    <div className="flex flex-col items-center gap-0">
                        <div className="px-8 py-5 w-full">
                            <p className="font-['Manrope',sans-serif] text-sm text-[#C0C0C0]/50 tracking-[1px] text-center">
                                Enter your Email ID here.
                            </p>
                        </div>
                        <div className="w-full py-5 rounded-b-[16px] flex items-center justify-center gap-4"
                            style={{ backgroundImage: "linear-gradient(135deg, rgb(255,255,255) 0%, rgb(209,213,219) 50%, rgb(156,163,175) 100%)" }}>
                            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-black tracking-[5px] uppercase">Join the Waitlist</span>
                            <span className="text-black text-xs">›</span>
                        </div>
                    </div>
                </ShimmerBorder>

                <div style={{ opacity: counterOpacity }} className="flex flex-col items-center gap-2">
                    <p className="font-['Manrope',sans-serif] text-[11px] text-[#C0C0C0] tracking-[3px] uppercase">400+ members joined us</p>
                    <p className="font-['Manrope',sans-serif] text-[9px] text-[#C0C0C0]/50 tracking-[1px]">Free premium tier for early access members.</p>
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Scene 7: Closing
export const ClosingScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(192,192,192,0.12) 0%, transparent 50%)" }} />
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <MetallicText delay={0} className="font-['Syne',sans-serif] text-5xl font-normal tracking-[14px] uppercase text-center leading-[1.6]">
                    Complete Wealth.
                </MetallicText>
                <MetallicText delay={30} className="font-['Syne',sans-serif] text-5xl font-normal tracking-[14px] uppercase text-center">
                    One Intelligence.
                </MetallicText>
            </div>
        </AbsoluteFill>
    );
};

// Scene 8: Logo Outro — uses header logo (emblem + WISING text)
export const LogoOutroScene: React.FC = () => {
    const frame = useCurrentFrame();

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const fadeOut = interpolate(frame, [140, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="flex flex-col items-center justify-center h-full gap-6" style={{ opacity: opacity * fadeOut }}>
                <Img src={staticFile("header_logo.png")} style={{ height: 80, objectFit: "contain" }} />
                <p className="font-['Manrope',sans-serif] text-sm text-[#888] tracking-[4px] uppercase">wising.app</p>
            </div>
        </AbsoluteFill>
    );
};
