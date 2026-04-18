import * as React from "react";
import { motion } from "framer-motion";
import wisingLogo from "../../assets/header_logo.png";
import { Badge } from "./badge";

export default function SolutionSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto py-12 px-6 md:px-12 flex flex-col lg:flex-row items-start justify-between gap-12 z-20">
      
      {/* Left Column: Text */}
      <div className="flex-1 flex flex-col items-start gap-8">
        <Badge variant="secondary" className="px-3 py-1 text-xs bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-full font-['Manrope',sans-serif] uppercase tracking-wider w-max">
          The Solution
        </Badge>
        
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] tracking-tight font-['Manrope',sans-serif] bg-[length:200%_auto] bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #a1a1a1 25%, #ffffff 50%, #a1a1a1 75%, #ffffff 100%)',
          }}
          animate={{ backgroundPosition: ['0% center', '200% center'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          One compliance engine that pre-clears your trades tax liability across every account you own.
        </motion.h2>
      </div>

      {/* Right Column: Animated Graph */}
      <div className="flex-[1.5] w-full relative h-[450px] mt-12 lg:mt-0 bg-transparent overflow-visible">
        
        {/* SVG for lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-10" 
          viewBox="0 0 1000 450" 
          preserveAspectRatio="none"
        >
          <defs>
            {/* Brighter Silver Shimmer Gradients */}
            <linearGradient id="silver-shimmer-v" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#888" />
              <stop offset="50%" stopColor="#fff" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>

            <linearGradient id="silver-shimmer-h" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#888" />
              <stop offset="50%" stopColor="#fff" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>
            
            <filter id="svg-glow-silver" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blurred" />
              <feComponentTransfer in="blurred" result="boosted">
                <feFuncA type="linear" slope="1.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="boosted" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background faint lines (starts from 0 to align with top node) */}
          <g stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none">
            <path d="M 500,0 L 500,160" />
            <path d="M 500,220 L 500,310" />
            <path d="M 150,310 L 850,310" />
            <path d="M 150,310 L 150,400" />
            <path d="M 383,310 L 383,400" />
            <path d="M 617,310 L 617,400" />
            <path d="M 850,310 L 850,400" />
          </g>

          {/* Animated active lines (starts from 0) */}
          <g strokeWidth="3" fill="none" filter="url(#svg-glow-silver)" strokeLinecap="round">
            <motion.path 
              d="M 500,0 L 500,160" 
              stroke="url(#silver-shimmer-v)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <motion.path 
              d="M 500,220 L 500,310" 
              stroke="url(#silver-shimmer-v)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
            />
            
            <motion.path 
              d="M 500,310 L 150,310" 
              stroke="url(#silver-shimmer-h)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 1.6, ease: "easeOut" }}
            />
            
            <motion.path 
              d="M 500,310 L 850,310" 
              stroke="url(#silver-shimmer-h)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 1.6, ease: "easeOut" }}
            />
            
            {[150, 383, 617, 850].map((x, i) => (
              <motion.path 
                key={i}
                d={`M ${x},310 L ${x},400`}
                stroke="url(#silver-shimmer-v)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.3, delay: 2.0 + (i * 0.1), ease: "easeIn" }}
              />
            ))}
          </g>
        </svg>

        {/* HTML Overlay Nodes */}
        {/* Top Node - Aligned to top-0 of its column */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 px-5 py-2.5 bg-[#050505] border border-white/30 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] z-20"
          style={{ top: "0" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white font-['Manrope',sans-serif] font-bold text-xs md:text-sm tracking-widest uppercase whitespace-nowrap">
            Your Global Portfolio
          </span>
        </motion.div>

        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center px-4"
          style={{ top: "190px", marginTop: "-30px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-blue-900/40 blur-3xl rounded-full scale-150 pointer-events-none" />
          <img src={wisingLogo} alt="Wising" className="relative w-16 md:w-20 h-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
        </motion.div>

        {[
          { label: "IRS Compliance", left: "15%" },
          { label: "FEMA Guardrails", left: "38.3%" },
          { label: "Income Tax", left: "61.7%" },
          { label: "FBAR (8621)", left: "85%" }
        ].map((node, i) => (
          <motion.div
            key={i}
            className="absolute -translate-x-1/2 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg z-20"
            style={{ left: node.left, top: "400px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 2.3 + (i * 0.1) }}
          >
            <span className="text-white font-['Manrope',sans-serif] text-[10px] md:text-xs font-bold whitespace-nowrap uppercase tracking-widest">
              {node.label}
            </span>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
