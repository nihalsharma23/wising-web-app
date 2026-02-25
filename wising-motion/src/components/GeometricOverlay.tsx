import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Floating geometric shapes: triangles, squares, circles, diamonds
 * overlaid on scenes for visual richness.
 */

interface Shape {
    type: "triangle" | "square" | "diamond" | "circle" | "line";
    x: number;
    y: number;
    size: number;
    rotation: number;
    rotSpeed: number;
    opacity: number;
    delay: number;
    color: string;
}

const SHAPES: Shape[] = [
    { type: "triangle", x: 80, y: 120, size: 30, rotation: 0, rotSpeed: 0.8, opacity: 0.08, delay: 0, color: "#fff" },
    { type: "square", x: 1800, y: 200, size: 20, rotation: 45, rotSpeed: -0.5, opacity: 0.06, delay: 5, color: "#fff" },
    { type: "diamond", x: 200, y: 900, size: 24, rotation: 0, rotSpeed: 0.6, opacity: 0.07, delay: 10, color: "#fff" },
    { type: "circle", x: 1700, y: 850, size: 16, rotation: 0, rotSpeed: 0, opacity: 0.05, delay: 8, color: "#fff" },
    { type: "triangle", x: 1600, y: 100, size: 22, rotation: 180, rotSpeed: -0.7, opacity: 0.06, delay: 3, color: "#fff" },
    { type: "line", x: 100, y: 500, size: 60, rotation: 30, rotSpeed: 0.3, opacity: 0.04, delay: 12, color: "#fff" },
    { type: "square", x: 300, y: 80, size: 14, rotation: 20, rotSpeed: 1.0, opacity: 0.05, delay: 7, color: "#fff" },
    { type: "diamond", x: 1500, y: 600, size: 18, rotation: 0, rotSpeed: -0.4, opacity: 0.06, delay: 15, color: "#fff" },
    { type: "circle", x: 400, y: 950, size: 12, rotation: 0, rotSpeed: 0, opacity: 0.04, delay: 2, color: "#fff" },
    { type: "triangle", x: 900, y: 50, size: 26, rotation: 90, rotSpeed: 0.5, opacity: 0.05, delay: 9, color: "#fff" },
    { type: "line", x: 1850, y: 500, size: 80, rotation: -45, rotSpeed: 0.2, opacity: 0.03, delay: 4, color: "#fff" },
    { type: "square", x: 1100, y: 980, size: 18, rotation: 15, rotSpeed: -0.6, opacity: 0.05, delay: 11, color: "#fff" },
];

const renderShape = (s: Shape, rot: number) => {
    switch (s.type) {
        case "triangle":
            return (
                <polygon
                    points={`${s.size / 2},0 0,${s.size} ${s.size},${s.size}`}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1"
                />
            );
        case "square":
            return <rect width={s.size} height={s.size} fill="none" stroke={s.color} strokeWidth="1" />;
        case "diamond":
            return (
                <polygon
                    points={`${s.size / 2},0 ${s.size},${s.size / 2} ${s.size / 2},${s.size} 0,${s.size / 2}`}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1"
                />
            );
        case "circle":
            return <circle cx={s.size / 2} cy={s.size / 2} r={s.size / 2} fill="none" stroke={s.color} strokeWidth="1" />;
        case "line":
            return <line x1="0" y1="0" x2={s.size} y2="0" stroke={s.color} strokeWidth="1" />;
        default:
            return null;
    }
};

export const GeometricOverlay: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
            <svg width="1920" height="1080" viewBox="0 0 1920 1080">
                {SHAPES.map((s, i) => {
                    const floatY = Math.sin((frame + s.delay * 10) * 0.02) * 8;
                    const rot = s.rotation + frame * s.rotSpeed;
                    const fadeIn = interpolate(frame, [s.delay, s.delay + 30], [0, s.opacity], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                    });

                    return (
                        <g
                            key={i}
                            transform={`translate(${s.x}, ${s.y + floatY}) rotate(${rot}, ${s.size / 2}, ${s.size / 2})`}
                            opacity={fadeIn}
                        >
                            {renderShape(s, rot)}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
