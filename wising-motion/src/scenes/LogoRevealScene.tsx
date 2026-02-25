import React from "react";
import { AbsoluteFill, Img, spring, useCurrentFrame, useVideoConfig, staticFile, interpolate } from "remotion";
import { MetallicText } from "../components/MetallicText";
import { GeometricOverlay } from "../components/GeometricOverlay";

export const LogoRevealScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
    const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
    const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            <GeometricOverlay />
            <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(circle at center, rgba(192,192,192,0.08) 0%, transparent 50%)" }}
            />
            <div className="flex flex-col items-center justify-center h-full gap-6">
                {/* Header logo (contains both emblem + "WISING" text) */}
                <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }}>
                    <Img src={staticFile("header_logo.png")} style={{ height: 100, objectFit: "contain" }} />
                </div>
                <div style={{ opacity: textOpacity }}>
                    <p className="font-['Manrope',sans-serif] text-xl tracking-[6px] text-[#999] uppercase">
                        AI Wealth Partner
                    </p>
                </div>
            </div>
        </AbsoluteFill>
    );
};
