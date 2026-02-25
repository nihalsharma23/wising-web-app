import React from "react";
import { AbsoluteFill } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { GeometricOverlay } from "../components/GeometricOverlay";

export const HeroHeadlineScene: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(192,192,192,0.1) 0%, transparent 50%)" }} />

            {/* Decorative lines */}
            <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080">
                <line x1="200" y1="0" x2="200" y2="1080" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="1720" y1="0" x2="1720" y2="1080" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="540" x2="300" y2="540" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="1620" y1="540" x2="1920" y2="540" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </svg>

            <div className="flex flex-col items-center justify-center h-full gap-6">
                <MetallicText delay={0} className="font-['Syne',sans-serif] text-5xl font-normal tracking-[14px] uppercase text-center leading-[1.6]">
                    Pioneering AI Wealth
                </MetallicText>
                <MetallicText delay={20} className="font-['Syne',sans-serif] text-5xl font-normal tracking-[14px] uppercase text-center">
                    Intelligence
                </MetallicText>
                <MetallicText delay={60} className="font-['Syne',sans-serif] text-xl font-medium tracking-[7px] uppercase text-center mt-4">
                    Complete Wealth. One Intelligence.
                </MetallicText>
            </div>
        </AbsoluteFill>
    );
};
