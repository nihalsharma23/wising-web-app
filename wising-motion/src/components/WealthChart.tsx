import React from "react";
import {
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    Easing,
} from "remotion";
import { evolvePath } from "@remotion/paths";

export const WealthChart: React.FC<{
    className?: string;
}> = ({ className = "" }) => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // Simple wealth growth path
    const path = "M 50 400 L 150 350 L 250 380 L 350 300 L 450 320 L 550 200 L 650 250 L 750 100";

    const progress = interpolate(frame, [30, 90], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.42, 0, 0.58, 1),
    });

    const { strokeDasharray, strokeDashoffset } = evolvePath(progress, path);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <svg width="800" height="500" viewBox="0 0 800 500" className="overflow-visible">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <line
                        key={i}
                        x1="0"
                        y1={i * 100}
                        x2="800"
                        y2={i * 100}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="1"
                    />
                ))}

                {/* Animated Path */}
                <path
                    d={path}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        filter: 'drop-shadow(0 0 10px rgba(192, 192, 192, 0.5))'
                    }}
                />

                {/* Gradient Definition */}
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0.6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
