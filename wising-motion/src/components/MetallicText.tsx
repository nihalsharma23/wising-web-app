import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const MetallicText: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const opacity = interpolate(frame, [delay, delay + 30], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const y = interpolate(frame, [delay, delay + 30], [40, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const shimmerPos = interpolate(frame, [0, 240], [0, 200], {
        extrapolateRight: "extend",
    });

    return (
        <div
            className={className}
            style={{
                opacity,
                transform: `translateY(${y}px)`,
                backgroundImage:
                    "linear-gradient(90deg, rgba(156,163,175,0.6) 0%, rgba(209,213,219,0.8) 20%, rgb(255,255,255) 50%, rgba(209,213,219,0.8) 80%, rgba(156,163,175,0.6) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% auto",
                backgroundPosition: `${shimmerPos}% center`,
            }}
        >
            {children}
        </div>
    );
};
