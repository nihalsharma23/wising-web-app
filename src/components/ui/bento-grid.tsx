"use client";

import React, { useState, useEffect } from "react";
import { cn } from "./utils";
import { motion, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    Video,
    Globe,
    Users,
    Activity,
    LineChart,
    ShieldCheck,
    ChevronRight
} from "lucide-react";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    component?: React.ReactNode;
}

// --- DIAGRAM COMPONENTS ---

const AdvisorSyncDiagram = () => (
    <div className="relative w-full h-full min-h-[140px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 150" className="w-full h-full max-w-[200px] drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            <motion.path
                d="M 100 30 L 50 110 L 150 110 Z"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
            />
            {[
                "M 100 30 L 50 110",
                "M 50 110 L 150 110",
                "M 150 110 L 100 30"
            ].map((d, i) => (
                <motion.circle key={i} r="3" fill="#fff">
                    <animateMotion dur={`${2 + i}s`} repeatCount="indefinite" path={d} />
                </motion.circle>
            ))}
            <g transform="translate(100, 30)">
                <circle r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" />
                <text y="26" fontSize="10" fill="#fff" textAnchor="middle" className="font-bold font-['Manrope',sans-serif]">YOU</text>
            </g>
            <g transform="translate(50, 110)">
                <circle r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" />
                <text y="26" fontSize="10" fill="#fff" textAnchor="middle" className="font-bold font-['Manrope',sans-serif]">CA</text>
            </g>
            <g transform="translate(150, 110)">
                <circle r="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" />
                <text y="26" fontSize="10" fill="#fff" textAnchor="middle" className="font-bold font-['Manrope',sans-serif]">CPA</text>
            </g>
        </svg>
    </div>
);

const DataPipelinesDiagram = () => (
    <div className="relative w-full h-[60px] flex flex-col justify-around px-4">
        {[0, 1, 2].map((i) => (
            <div key={i} className="relative w-full h-[1.25px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    animate={{ left: ["-100%", "200%"] }}
                    transition={{ duration: 1.5 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                />
            </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <Activity className="w-10 h-10 text-white" />
        </div>
    </div>
);

const NetworthTicker = () => {
    const [count, setCount] = useState(1245890);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + Math.floor(Math.random() * 500));
        }, 800);
        return () => clearInterval(interval);
    }, []);
    const springValue = useSpring(count, { stiffness: 60, damping: 25 });
    const displayValue = useTransform(springValue, (v) => 
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
    );
    return (
        <div className="relative w-full h-full min-h-[120px] flex flex-col items-center justify-center bg-white/5 rounded-[1.5rem] border border-white/5 overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
             <motion.span className="text-2xl lg:text-3xl font-bold font-['Manrope',sans-serif] bg-gradient-to-b from-[#ffffff] via-[#d1d5db] to-[#9ca3af] bg-clip-text text-transparent tracking-tighter tabular-nums">
                {displayValue}
             </motion.span>
             <div className="flex items-center gap-2 mt-2 opacity-30">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white">Live Pipeline</p>
             </div>
        </div>
    );
};

const NeuralBrainDiagram = () => (
    <div className="relative w-full h-[120px] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-400/30 drop-shadow-[0_0_15px_rgba(96,165,250,0.15)]">
            <path 
                d="M50 20 C30 20 15 35 15 55 C15 75 30 85 50 85 C70 85 85 75 85 55 C85 35 70 20 50 20 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                strokeDasharray="2 2"
            />
            {[...Array(12)].map((_, i) => (
                <motion.circle
                    key={i}
                    r={1.2 + Math.random()}
                    cx={25 + Math.random() * 50}
                    cy={25 + Math.random() * 50}
                    fill="#60a5fa"
                    animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
            ))}
            <motion.path
                d="M30 40 Q50 50 70 40 M30 60 Q50 50 70 60 M50 25 V75"
                fill="none"
                stroke="rgba(96, 165, 250, 0.4)"
                strokeWidth="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    </div>
);

// --- BENTO GRID COMPONENT ---

const bentoItems: BentoItem[] = [
    {
        title: "Advisor Sync",
        description: "Share verified financial data securely with your CA, CPA, or Wealth Manager.",
        icon: <Users className="w-4 h-4 text-white/70" />,
        status: "Secure",
        tags: ["Collaboration", "Tax"],
        component: <AdvisorSyncDiagram />,
        colSpan: 2,
    },
    {
        title: "Zero Touch",
        description: "Passively monitors regulatory changes to keep data concurrent.",
        icon: <Clock className="w-4 h-4 text-white/70" />,
        status: "Auto",
        tags: ["Passive", "API"],
        component: <DataPipelinesDiagram />,
    },
    {
        title: "Total Global View",
        description: "See your global accounts side by side. No more logging into multiple portals.",
        icon: <Globe className="w-4 h-4 text-white/70" />,
        status: "Unified",
        tags: ["Multi-Currency", "Live"],
        component: <NetworthTicker />,
        colSpan: 2,
    },
    {
        title: "Behavioural Insights",
        description: "Identify trading blindspots and stop hidden taxes damage.",
        icon: <Activity className="w-4 h-4 text-white/70" />,
        status: "AI",
        tags: ["Optimization", "Tax"],
        component: <NeuralBrainDiagram />,
    },
];

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
            {bentoItems.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-[2rem] overflow-hidden transition-all duration-500",
                        "border border-white/5 bg-black backdrop-blur-3xl",
                        "hover:border-white/10 hover:shadow-[0_0_60px_rgba(255,255,255,0.02)]",
                        "hover:-translate-y-1 will-change-transform flex flex-col",
                        item.colSpan === 2 ? "md:col-span-2 min-h-[180px]" : "col-span-1 min-h-[260px]"
                    )}
                >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />

                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-500">
                                {item.icon}
                            </div>
                            <span className="text-[8px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-white/40">
                                {item.status}
                            </span>
                        </div>

                        {item.colSpan === 2 ? (
                            <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                                <div className="flex-[0.8] space-y-3">
                                    <h3 className="font-bold text-white tracking-tight text-[22px] md:text-[26px] font-['Manrope',sans-serif] leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-[13px] md:text-[14px] text-white/40 leading-relaxed font-['Manrope',sans-serif] font-medium">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-3 pt-1">
                                        {item.tags?.map((tag, i) => (
                                            <span key={i} className="text-[8px] font-bold tracking-widest text-white/20 uppercase">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 w-full flex justify-center">
                                    {item.component}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <div className="flex-1 flex items-center justify-center py-2">
                                    {item.component}
                                </div>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-white tracking-tight text-[18px] md:text-[20px] font-['Manrope',sans-serif]">
                                        {item.title}
                                    </h3>
                                    <p className="text-[12px] md:text-[13px] text-white/40 leading-relaxed font-['Manrope',sans-serif] font-medium">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-1">
                                        <div className="flex gap-3">
                                            {item.tags?.map((tag, i) => (
                                                <span key={i} className="text-[8px] font-bold tracking-widest text-white/15 uppercase">#{tag}</span>
                                            ))}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-white/15 group-hover:text-white/60 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
