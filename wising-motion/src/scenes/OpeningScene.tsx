import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Typewriter } from "../components/Typewriter";
import { ParticleBurst } from "../components/ParticleBurst";
import { GeometricOverlay } from "../components/GeometricOverlay";

export const OpeningScene: React.FC = () => {
    const frame = useCurrentFrame();

    const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div style={{ opacity: bgOpacity }} className="absolute inset-0">
                <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(192,192,192,0.08) 0%, transparent 60%)" }} />
            </div>

            <ParticleBurst />

            {/* Decorative corner boxes */}
            <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080">
                <rect x="40" y="40" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="1800" y="40" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="40" y="960" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <rect x="1800" y="960" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <line x1="960" y1="30" x2="960" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="960" y1="960" x2="960" y2="1050" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </svg>

            <div className="flex items-center justify-center h-full px-20">
                <Typewriter
                    text="This Financial Year, We Will Start A New Era, With AI."
                    charFrames={2}
                    className="font-['Syne',sans-serif] text-5xl font-bold tracking-[8px] uppercase text-center leading-[1.4]"
                />
            </div>
        </AbsoluteFill>
    );
};
