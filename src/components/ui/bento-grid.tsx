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
    Calculator,
    Calendar,
    AlertTriangle,
    ChevronRight,
    ChevronLeft
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

const FtcCalculatorDiagram = () => (
    <div className="relative w-full h-full min-h-[180px] flex flex-col md:flex-row items-center justify-center gap-4 py-3 font-mono w-full">
           {/* Left Box: India Tax */}
           <motion.div 
               className="w-[130px] bg-[#050505] border border-emerald-500/30 rounded-xl p-3 text-center shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md shrink-0"
               animate={{ x: [0, -3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
               <div className="text-[8px] text-emerald-400/80 mb-1 font-bold tracking-widest">INDIA TAX (PAID)</div>
               <div className="text-[15px] text-emerald-300 font-bold">$12,500</div>
           </motion.div>

           {/* Flow Arrow 1 */}
           <motion.div 
               className="text-emerald-500/50 hidden md:block"
               animate={{ opacity: [0.2, 1, 0.2], x: [0, 5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
               <ChevronRight className="w-8 h-8" />
           </motion.div>
           
           {/* Output Box */}
           <motion.div 
               className="w-[210px] bg-[#050505] border border-purple-500/40 rounded-xl p-3.5 text-center shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md shrink-0 z-10"
               animate={{ scale: [1, 1.03, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           >
               <div className="text-[9px] text-purple-400 mb-2 font-bold tracking-widest">FTC APPLIED & RESIDUAL</div>
               <div className="flex justify-between text-[11px] mt-1 mb-1.5 px-2 text-white/60">
                  <span>Gross US Tax</span>
                  <span>$18,000</span>
               </div>
               <div className="flex justify-between text-[11px] mb-2.5 px-2 text-emerald-400/80">
                  <span>Foreign Tax Credit</span>
                  <span>-$12,500</span>
               </div>
               <div className="h-[1px] w-full bg-white/10 mb-2.5"></div>
               <div className="flex justify-between text-[15px] font-bold px-2 text-purple-300">
                  <span>Net US Payable</span>
                  <span>$5,500</span>
               </div>
           </motion.div>

           {/* Flow Arrow 2 */}
           <motion.div 
               className="text-blue-500/50 hidden md:block"
               animate={{ opacity: [0.2, 1, 0.2], x: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           >
               <ChevronLeft className="w-8 h-8" />
           </motion.div>

           {/* Right Box: US Tax */}
           <motion.div 
               className="w-[130px] bg-[#050505] border border-blue-500/30 rounded-xl p-3 text-center shadow-[0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-md shrink-0"
               animate={{ x: [0, 3, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           >
               <div className="text-[8px] text-blue-400/80 mb-1 font-bold tracking-widest">US TAX (LIAB)</div>
               <div className="text-[15px] text-blue-300 font-bold">$18,000</div>
           </motion.div>
    </div>
);

const AssetConflictDiagram = () => (
    <div className="relative w-full h-[220px] flex items-start justify-center overflow-visible pt-6 font-mono">
        <div className="w-full max-w-[250px] flex flex-col relative">
            {/* The scanning window */}
            <div className="w-full bg-[#050505] border border-white/10 rounded-xl shadow-xl overflow-hidden text-[10px] text-white/60">
                {/* Header */}
                <div className="w-full bg-white/5 px-3 py-2 flex items-center gap-1.5 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    <span className="ml-1 text-white/30 text-[8px] tracking-widest font-bold">PORTFOLIO_SCANNER</span>
                </div>
                {/* Content */}
                <div className="p-3 flex flex-col gap-2.5">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: [0, 1, 1, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.05, 0.95, 1] }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80" />
                        <span>AAPL &bull; Held: 420d</span>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: [0, 0, 1, 1, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.15, 0.95, 1] }}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500/80" />
                        <span>GOOG &bull; Held: 512d</span>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: [0, 0, 1, 1, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.25, 0.95, 1] }}
                        className="flex items-center gap-2 text-red-400 font-bold bg-red-500/10 -mx-3 px-3 py-1.5 border-l-2 border-red-500"
                    >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>AMZN &bull; Held: 450d</span>
                    </motion.div>
                </div>
            </div>

            {/* Conflict Details Tooltip (Appears after AMZN is flagged) */}
            <motion.div 
                className="absolute -right-2 top-[30%] w-[150px] bg-[#050505] border border-red-500/40 rounded-xl p-3 shadow-[0_0_20px_rgba(239,68,68,0.2)] backdrop-blur-md z-20"
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: [0, 0, 1, 1, 0], x: [-10, -10, 0, 0, -5], scale: [0.95, 0.95, 1, 1, 0.98] }}
                transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.4, 0.9, 1] }}
            >
                <div className="text-[9px] text-red-400 font-bold tracking-widest mb-2 border-b border-red-500/20 pb-1.5">RULE MISMATCH</div>
                <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-white/50">India Tax</span>
                    <span className="text-yellow-400 font-bold">STCG</span>
                </div>
                <div className="text-[8px] text-white/30 text-right mb-2.5 leading-none">{'< 24 months'}</div>
                
                <div className="flex justify-between items-center text-[11px] mb-1">
                    <span className="text-white/50">US Tax</span>
                    <span className="text-blue-400 font-bold">LTCG</span>
                </div>
                <div className="text-[8px] text-white/30 text-right leading-none">{'> 12 months'}</div>
            </motion.div>
        </div>
    </div>
);

const ComplianceCalendarDiagram = () => (
    <div className="relative w-full h-[220px] flex items-center justify-center overflow-visible py-4 font-mono w-full">
        <div className="relative w-full max-w-[500px] h-full flex flex-col justify-between">
            {/* Top Row: US Tax (Jan - Dec Calendar) */}
            <div className="flex items-end px-4 text-blue-400 h-14 relative w-full">
                {/* Connecting lines dropping down */}
                <motion.div className="absolute left-[15%] bottom-0 w-px h-[20px] bg-gradient-to-b from-blue-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
                <motion.div className="absolute left-[35%] bottom-0 w-px h-[20px] bg-gradient-to-b from-blue-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                <motion.div className="absolute left-[90%] bottom-0 w-px h-[20px] bg-gradient-to-b from-blue-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
                
                <div className="text-center absolute left-[15%] -translate-x-1/2 bottom-[26px] w-24">
                    <div className="text-[10px] font-bold">APR 15</div>
                    <div className="text-[8px] text-blue-300/70 tracking-wider mt-0.5">Form 1040</div>
                </div>
                <div className="text-center absolute left-[35%] -translate-x-1/2 bottom-[26px] w-24">
                    <div className="text-[10px] font-bold">JUN 15</div>
                    <div className="text-[8px] text-blue-300/70 tracking-wider mt-0.5">Q2 Est. Tax</div>
                </div>
                <div className="text-center absolute left-[90%] -translate-x-1/2 bottom-[26px] w-24">
                    <div className="text-[10px] font-bold">OCT 15</div>
                    <div className="text-[8px] text-blue-300/70 tracking-wider mt-0.5">FBAR & Ext</div>
                </div>
            </div>

            {/* Middle Row: The Unified Wising Timeline */}
            <div className="relative w-full h-[40px] flex items-center justify-center">
                {/* Base track */}
                <div className="absolute w-full h-[2px] bg-white/10 rounded-full" />
                {/* Glowing progress track */}
                <motion.div 
                    className="absolute left-0 h-[3px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Unified Dots */}
                {[15, 35, 55, 75, 90].map((left, idx) => (
                    <motion.div 
                        key={idx}
                        className="absolute w-3 h-3 rounded-full bg-[#050505] border-[2px] border-purple-400 z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
                        style={{ left: `${left}%` }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.4 }}
                    />
                ))}
            </div>

            {/* Bottom Row: India Tax (Apr - Mar FY) */}
            <div className="flex items-start px-4 text-emerald-400 h-14 relative w-full">
                {/* Connecting lines rising up */}
                <motion.div className="absolute left-[35%] top-0 w-px h-[20px] bg-gradient-to-t from-emerald-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
                <motion.div className="absolute left-[55%] top-0 w-px h-[20px] bg-gradient-to-t from-emerald-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                <motion.div className="absolute left-[75%] top-0 w-px h-[20px] bg-gradient-to-t from-emerald-500/80 to-transparent" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} />
                
                <div className="text-center absolute left-[35%] -translate-x-1/2 top-[26px] w-24">
                    <div className="text-[10px] font-bold">JUN 15</div>
                    <div className="text-[8px] text-emerald-300/70 tracking-wider mt-0.5">Q1 Advance</div>
                </div>
                <div className="text-center absolute left-[55%] -translate-x-1/2 top-[26px] w-24">
                    <div className="text-[10px] font-bold">JUL 31</div>
                    <div className="text-[8px] text-emerald-300/70 tracking-wider mt-0.5">ITR Filing</div>
                </div>
                <div className="text-center absolute left-[75%] -translate-x-1/2 top-[26px] w-24">
                    <div className="text-[10px] font-bold">SEP 15</div>
                    <div className="text-[8px] text-emerald-300/70 tracking-wider mt-0.5">Q2 Advance</div>
                </div>
            </div>
        </div>
    </div>
);

// --- BENTO GRID COMPONENT ---

const bentoItems: BentoItem[] = [
    {
        title: "Double Tax (FTC) Calculator",
        description: "Instantly calculate combined tax liabilities and Foreign Tax Credit (FTC) residuals across overlapping fiscal calendars.",
        icon: <Calculator className="w-4 h-4 text-white/70" />,
        status: "Real-time",
        tags: ["FTC", "Double Taxation", "Reconciliation"],
        component: <FtcCalculatorDiagram />,
        colSpan: 3,
    },
    {
        title: "Asset-Level Conflict Detection",
        description: "Different rules mean different tax treatment. Wising scans the portfolio and flags exact mismatches.",
        icon: <AlertTriangle className="w-4 h-4 text-white/70" />,
        status: "Active",
        tags: ["Capital Gains", "Mismatches", "DTAA"],
        component: <AssetConflictDiagram />,
        colSpan: 1,
    },
    {
        title: "Cross-Border Compliance Calendar",
        description: "India's fiscal year and the US calendar year don't line up. Wising automatically syncs overlapping deadlines into one unified timeline.",
        icon: <Calendar className="w-4 h-4 text-white/70" />,
        status: "Sync",
        tags: ["1040", "ITR", "FBAR", "Advance Tax"],
        component: <ComplianceCalendarDiagram />,
        colSpan: 2,
    },
];

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mx-auto">
            {bentoItems.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-[2rem] overflow-hidden transition-all duration-500",
                        "border border-white/5 bg-black backdrop-blur-3xl",
                        "hover:border-white/10 hover:shadow-[0_0_60px_rgba(255,255,255,0.02)]",
                        "hover:-translate-y-1 will-change-transform flex flex-col",
                        item.colSpan === 3 ? "md:col-span-3 min-h-[220px]" : item.colSpan === 2 ? "md:col-span-2 min-h-[180px]" : "col-span-1 min-h-[260px]"
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

                        {item.colSpan === 3 || item.colSpan === 2 ? (
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
