import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const ShimmerBorder: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => {
    const frame = useCurrentFrame();

    const shimmerPos = interpolate(frame, [0, 120], [0, 200], {
        extrapolateRight: "extend",
    });

    return (
        <div className={`relative ${className}`}>
            <div
                className="absolute -inset-[1px] rounded-[16px] pointer-events-none opacity-70"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(156,163,175,0.3) 0%, rgba(209,213,219,0.6) 20%, rgba(255,255,255,0.8) 50%, rgba(209,213,219,0.6) 80%, rgba(156,163,175,0.3) 100%)",
                    backgroundSize: "200% auto",
                    backgroundPosition: `${shimmerPos}% center`,
                }}
            />
            <div className="relative bg-[rgba(10,10,10,0.9)] rounded-[16px]">
                {children}
            </div>
        </div>
    );
};
