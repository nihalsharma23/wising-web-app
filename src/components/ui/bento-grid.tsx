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

const AgentAgnosticDiagram = () => (
    <div className="relative w-full h-[180px] flex items-center justify-center overflow-hidden py-4">
        <svg viewBox="0 0 240 160" className="w-full h-full max-w-[280px] drop-shadow-[0_0_20px_rgba(96,165,250,0.2)]">
            {/* Connecting lines */}
            {[
                "M 40 80 L 95 80",
                "M 200 80 L 145 80",
                "M 120 20 L 120 55",
                "M 120 140 L 120 105"
            ].map((d, i) => (
                <path key={`line-${i}`} d={d} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            ))}

            {/* Animated Pulses */}
            {[
                { path: "M 40 80 L 95 80", delay: "0s" },
                { path: "M 200 80 L 145 80", delay: "0.5s" },
                { path: "M 120 20 L 120 55", delay: "1s" },
                { path: "M 120 140 L 120 105", delay: "1.5s" }
            ].map((p, i) => (
                <circle key={`pulse-${i}`} r="2.5" fill="#60a5fa">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path={p.path} begin={p.delay} />
                </circle>
            ))}

            {/* Agent Nodes */}
            <g transform="translate(40, 80)">
                <circle r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" />
                <svg viewBox="0 0 24 24" x="-10" y="-10" width="20" height="20" fill="white" opacity="0.8">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829v-2.3324a.0757.0757 0 0 1 .0332-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66l-.1467-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0zM8.5692 4.1673a4.4802 4.4802 0 0 1 2.8764 1.0407l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813V15.465l-2.02-1.1686a.071.071 0 0 1-.038-.052V8.6618a4.504 4.504 0 0 1 4.4945-4.4945zm6.5413 5.434l-2.0533-1.1874 2.0533-1.1874V9.6013zm-3.6934-.5552-2.0533 1.1874-2.0533-1.1874 2.0533-1.1874 2.0533 1.1874zm-2.0533 3.562 2.0533 1.1874v-2.3748l-2.0533-1.1874v2.3748z"/>
                </svg>
            </g>
            <g transform="translate(200, 80)">
                <circle r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" />
                <image href="https://cdn.simpleicons.org/anthropic/white" x="-10" y="-10" width="20" height="20" opacity="0.8" />
            </g>
            <g transform="translate(120, 20)">
                <circle r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" />
                <image href="https://cdn.simpleicons.org/googlegemini/white" x="-10" y="-10" width="20" height="20" opacity="0.8" />
            </g>
            <g transform="translate(120, 140)">
                <circle r="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" />
                <image href="https://cdn.simpleicons.org/meta/white" x="-10" y="-10" width="20" height="20" opacity="0.8" />
            </g>

            {/* Central Engine (MCP) */}
            <g transform="translate(120, 80)">
                <motion.circle 
                    r="26" 
                    fill="rgba(96,165,250,0.1)" 
                    stroke="rgba(96,165,250,0.5)" 
                    strokeWidth="1.5"
                    animate={{ r: [24, 30, 24], strokeWidth: [1.5, 2.5, 1.5], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle r="18" fill="#050505" stroke="rgba(255,255,255,0.2)" />
                <text y="3.5" fontSize="10" fill="#60a5fa" textAnchor="middle" className="font-bold font-['Manrope',sans-serif] tracking-wider">MCP</text>
            </g>
        </svg>
    </div>
);

const LayeredInfrastructureDiagram = () => {
    return (
        <div className="relative w-full h-[220px] flex items-center justify-center overflow-visible py-3">
            
            <div className="relative w-full max-w-[280px] h-full flex flex-col z-10 scale-[1.05]">
                
                {/* 1. Raw LLM Node (Top) */}
                <div className="mx-auto w-36 bg-[#050505] border border-white/10 rounded-md px-2 py-1.5 flex items-center justify-center gap-2 z-20 shadow-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <span className="text-[8px] font-bold text-white/60 tracking-widest uppercase">Any LLM Agent</span>
                </div>

                {/* Gap 1: Hallucinations Falling */}
                <div className="flex-1 relative w-full pointer-events-none min-h-[30px]">
                    <motion.div 
                        className="absolute left-[15%] text-[7px] md:text-[7.5px] font-mono text-red-400/90 whitespace-nowrap"
                        animate={{ top: ["10%", "80%"], opacity: [0, 1, 0], x: [0, -10] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >
                        calc_tax(???)
                    </motion.div>
                    <motion.div 
                        className="absolute left-[50%] text-[7px] md:text-[7.5px] font-mono text-orange-400/90 whitespace-nowrap"
                        animate={{ top: ["0%", "90%"], opacity: [0, 1, 0], x: [0, 10] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                        "hallucinated_value"
                    </motion.div>
                    <motion.div 
                        className="absolute left-[35%] text-[7px] md:text-[7.5px] font-mono text-red-500/90 whitespace-nowrap"
                        animate={{ top: ["20%", "80%"], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    >
                        ! NaN
                    </motion.div>
                </div>

                {/* 2. Wising Infrastructure Layers (Middle) */}
                <div className="flex flex-col gap-1.5 w-full z-10 px-4">
                    {/* Layer 1 */}
                    <div className="w-full h-5 bg-[#0a0a0a] border border-blue-500/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.1)] overflow-hidden relative">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-[6.5px] font-bold text-blue-400 tracking-[0.2em] uppercase relative z-10">L1: Context & Intent Parsing</span>
                    </div>

                    {/* Layer 2 */}
                    <div className="w-full h-5 bg-[#0a0a0a] border border-purple-500/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.1)] overflow-hidden relative">
                         <motion.div 
                            className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"
                            animate={{ x: ["100%", "-100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                        <span className="text-[6.5px] font-bold text-purple-400 tracking-[0.2em] uppercase relative z-10">L2: Deterministic Tax Engine</span>
                    </div>

                    {/* Layer 3 */}
                    <div className="w-full h-5 bg-[#0a0a0a] border border-emerald-500/30 rounded flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.1)] overflow-hidden relative">
                         <motion.div 
                            className="absolute inset-0 bg-emerald-500/10"
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-[6.5px] font-bold text-emerald-400 tracking-[0.2em] uppercase relative z-10">L3: Zero Hallucination Filter</span>
                    </div>
                </div>

                {/* Gap 2: Verified Data Falling */}
                <div className="flex-1 relative w-full pointer-events-none min-h-[30px]">
                    <motion.div 
                        className="absolute left-[20%] text-[7px] md:text-[7.5px] font-mono text-emerald-400 whitespace-nowrap"
                        animate={{ top: ["10%", "80%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >
                        {`{tax_liability: $10k}`}
                    </motion.div>
                    <motion.div 
                        className="absolute left-[50%] text-[7px] md:text-[7.5px] font-mono text-emerald-400 whitespace-nowrap"
                        animate={{ top: ["0%", "90%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                    >
                        verified_execution()
                    </motion.div>
                </div>

                {/* 3. Wising Output Endpoint (Bottom) */}
                <div className="mx-auto w-48 bg-[#050505] border border-emerald-500/40 rounded px-2 py-2 flex items-center justify-center gap-1.5 z-20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[7.5px] font-bold text-emerald-400 tracking-widest uppercase">Deterministic Financial Output</span>
                </div>
            </div>
        </div>
    );
};

const ChatAlertAnimation = () => {
    return (
        <div className="relative w-full h-[240px] flex flex-col overflow-hidden py-3 px-4">
            {/* Header */}
            <div className="w-full border-b border-white/5 pb-2 mb-3 flex items-center gap-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                <span className="text-[8px] text-white/30 ml-1 font-mono uppercase tracking-wider">AI Advisor Chat</span>
            </div>

            {/* Chat Container */}
            <div className="flex-1 flex flex-col gap-2 relative">
                
                {/* 1. User Chat Bubble */}
                <motion.div 
                    className="self-end bg-blue-500/10 border border-blue-500/20 text-blue-100 text-[10px] px-3 py-2 rounded-xl rounded-tr-sm shadow-sm max-w-[90%] shrink-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 0] }}
                    transition={{ duration: 12, repeat: Infinity, times: [0, 0.05, 0.95, 1] }}
                >
                    Liquidate ₹5 Lakhs from my Nifty 50 Index Fund to bank account.
                </motion.div>

                {/* Overlapping Alerts Container */}
                <div className="relative flex-1 w-full mt-1">
                    
                    {/* 2. Agent Action Alert */}
                    <motion.div 
                        className="absolute top-0 left-0 flex items-center gap-1.5 text-yellow-400/80 text-[8px] font-mono px-1 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 1, 0, 0], y: [5, 5, 0, 0, -5, -5] }}
                        transition={{ duration: 12, repeat: Infinity, times: [0, 0.1, 0.15, 0.35, 0.4, 1] }}
                    >
                        <Activity className="w-3 h-3 shrink-0" />
                        [AGENT_ACTION] Preparing transaction payload...
                    </motion.div>

                    {/* 3. MCP Call Alert */}
                    <motion.div 
                        className="absolute top-0 left-0 bg-purple-500/5 border border-purple-500/20 px-2 py-1.5 rounded-md shadow-sm max-w-[95%] w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 1, 0, 0], y: [5, 5, 0, 0, -5, -5] }}
                        transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.4, 0.6, 0.65, 1] }}
                    >
                        <div className="flex items-center gap-1.5 text-purple-400 font-bold font-mono text-[8px]">
                            <Globe className="w-3 h-3 shrink-0" />
                            [MCP_CALL] wising.project_tax_impact
                        </div>
                        <div className="text-[7.5px] text-purple-200/70 font-mono mt-0.5 ml-4">
                            asset_id: "MF-NIFTY-01", action: "SELL", amt: 500k
                        </div>
                    </motion.div>

                    {/* 4. Wising Response Bubble */}
                    <motion.div 
                        className="absolute top-0 left-0 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl rounded-tl-sm shadow-sm max-w-[100%] w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, -5] }}
                        transition={{ duration: 12, repeat: Infinity, times: [0, 0.6, 0.65, 0.95, 1] }}
                    >
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wider text-[8px] mb-1">
                            <CheckCircle className="w-3 h-3 shrink-0" />
                            PRE-CHECK COMPLETED
                        </div>
                        <pre className="text-[8.5px] font-mono text-emerald-100/90 leading-relaxed">
{`{
  "projected_ltcg": 185000,
  "exemption_112A_remaining": 95000,
  "taxable_amount": 90000,
  "projected_tax_liability": 11250
}`}
                        </pre>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

// --- BENTO GRID COMPONENT ---

const bentoItems: BentoItem[] = [
    {
        title: "Infrastructure for AI native Tax Firms",
        description: "Enterprise-grade compliance infrastructure. Connect Your LLM. Go AI Native instantly. Zero Hallucinations.",
        icon: <Globe className="w-4 h-4 text-white/70" />,
        status: "Unified",
        tags: ["Infrastructure", "DeterministicEngine", "API"],
        component: <LayeredInfrastructureDiagram />,
        colSpan: 2,
    },
    {
        title: "Agent Agnostic",
        description: "Compliance Engine for any AI Agent. Connect MCP in your preferred model. Wising provides you the Deterministic Compliance Layer.",
        icon: <Clock className="w-4 h-4 text-white/70" />,
        status: "Auto",
        tags: ["LLM", "Agentic AI", "MCP"],
        component: <AgentAgnosticDiagram />,
    },
    {
        title: "Advisor Sync",
        description: "Share verified financial data securely with your CA, CPA, or Wealth Manager.",
        icon: <Users className="w-4 h-4 text-white/70" />,
        status: "Secure",
        tags: ["Chartered Accountant", "CPA", "Wealth Managers"],
        component: <AdvisorSyncDiagram />,
        colSpan: 2,
    },
    {
        title: "Compliance Engine MCP",
        description: "Pre Execution check between your AI agents, Financial Intent and Executions",
        icon: <Activity className="w-4 h-4 text-white/70" />,
        status: "AI",
        tags: ["Compliance Firewall", "MCP", "CLI", "API"],
        component: <ChatAlertAnimation />,
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
