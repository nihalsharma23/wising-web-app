import React from "react";
import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

const PARTICLE_COUNT = 40;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    angle: (i / PARTICLE_COUNT) * Math.PI * 2,
    distance: 100 + Math.random() * 400,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 15,
    opacity: 0.3 + Math.random() * 0.7,
}));

export const ParticleBurst: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {particles.map((p, i) => {
                const progress = spring({
                    frame: frame - p.delay,
                    fps,
                    config: { damping: 50, stiffness: 80 },
                });

                const x = Math.cos(p.angle) * p.distance * progress;
                const y = Math.sin(p.angle) * p.distance * progress;
                const opacity = interpolate(progress, [0, 0.3, 1], [0, p.opacity, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                });

                return (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            width: p.size,
                            height: p.size,
                            borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.8)",
                            boxShadow: "0 0 8px rgba(192,192,192,0.5)",
                            transform: `translate(${x}px, ${y}px)`,
                            opacity,
                        }}
                    />
                );
            })}
        </div>
    );
};
