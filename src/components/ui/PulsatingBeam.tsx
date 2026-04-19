import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaserFlow from "./LaserFlow";

import StarBorder from "./StarBorder";
import wisingLogo from "../../assets/header_logo.png";
import irsLogo from "../../assets/logos/irs-logo.png";
import indiaEmblem from "../../assets/logos/india-emblem.png";

export const PulsatingBeamSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  // Phase 1: Wising Logo Hub appears (0 → 0.15)
  const logoOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  const beamOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  // Phase 2: Beams shoot towards containers (0.20 → 0.65)
  const leftBeamClip = useTransform(scrollYProgress, [0.20, 0.65], [0, 100]);
  const leftClipPath = useTransform(leftBeamClip, (v) => `inset(0 0 0 ${100 - v}%)`);
  
  const rightBeamClip = useTransform(scrollYProgress, [0.20, 0.65], [0, 100]);
  const rightClipPath = useTransform(rightBeamClip, (v) => `inset(0 ${100 - v}% 0 0)`);

  // Phase 3: Dashboards reveal ONLY AFTER beams reach (0.70 → 0.90)
  const dashboardsOpacity = useTransform(scrollYProgress, [0.70, 0.85], [0, 1]);
  const dashboardsScale = useTransform(scrollYProgress, [0.75, 0.90], [0.95, 1]);
  // Phase 4: Charging Glow stabilization (0.90 → 1.00)
  const chargingGlow = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

  return (
    <section
      className="h-[300vh] bg-[#020202] w-full relative overflow-clip"
      ref={ref}
    >
      <div className="sticky top-[80px] h-[calc(100vh-90px)] w-full flex items-center justify-center px-2 md:px-6 pb-2">
        
        {/* --- GLASSMOPRHISM CONTAINER --- */}
        <div className="w-full h-full relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-[#020202]/95 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(255,255,255,0.05)] ring-1 ring-white/5 flex flex-col items-center justify-center">
          
          <StarBorder as="div" color="#001f3f" speed="8s" thickness={3} className="w-full h-full">
            {/* Top Edge Corner Shine highlights */}
            <div className="absolute top-0 left-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 -top-[50px] h-[100px] w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

            {/* Technical Grid Background */}
            <div className="absolute inset-0 opacity-[0.12]" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,51,102,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,51,102,0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
              }} 
            />

            {/* Technical Labeling on Beams Axis */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent z-0" />

            {/* --- MAIN CONTENT: FLEX ROW FOR AUTO-ALIGNMENT --- */}
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10 px-4 md:px-20">
              
              <div className="w-full flex items-center justify-between">
                
                {/* --- LEFT: US JURISDICTION --- */}
                <motion.div 
                   className="flex flex-col items-start gap-6 z-20 pointer-events-auto relative px-6 py-8 rounded-[2rem] transition-all duration-300"
                   style={{
                     opacity: dashboardsOpacity,
                     scale: dashboardsScale,
                     background: useTransform(chargingGlow, [0, 1], ["rgba(2,2,2,0.95)", "rgba(0,31,63,0.2)"]),
                     border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(161,161,161,0.15)", "1px solid rgba(161,161,161,0.5)"]),
                   }}
                >

                  <div className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-lg mb-2 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                     <motion.span 
                       className="text-[12px] font-extrabold tracking-[0.3em] uppercase font-['Manrope',sans-serif] bg-[length:200%_auto] bg-clip-text text-transparent"
                       style={{
                         backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #a1a1a1 25%, #ffffff 50%, #a1a1a1 75%, #ffffff 100%)',
                       }}
                       animate={{ backgroundPosition: ['0% center', '200% center'] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     >
                       US Jurisdiction
                     </motion.span>
                  </div>

                  <div className="flex flex-col items-start gap-3">
                    <div className="w-14 h-14 bg-white/[0.03] rounded-xl border border-white/10 p-2 backdrop-blur-md flex items-center justify-center">
                      <img 
                        src={irsLogo} 
                        alt="IRS" 
                        className="w-full h-full object-contain filter brightness-0 invert" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/90 font-['Manrope',sans-serif] text-[11px] font-bold tracking-wider uppercase">Internal Revenue Service</span>
                      <span className="text-slate-500 text-[9px] uppercase tracking-widest leading-none mt-0.5">Federal Agency</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 mt-2">
                    {[ "FBAR FILED", "FORM 8621 OPTIMIZED", "FATCA VERIFIED" ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          style={{ boxShadow: "0 0 12px #0066cc" }} 
                        />
                        <span className="text-slate-200 font-['Manrope',sans-serif] text-xs font-bold tracking-wider uppercase">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* --- LEFT BEAM CONTAINER --- */}
                <motion.div 
                  className="flex-1 h-20 relative flex items-center justify-end overflow-hidden"
                  style={{ 
                    opacity: beamOpacity, 
                    clipPath: leftClipPath,
                    // Use a mask to ensure the beam fades out perfectly at the container edge
                    maskImage: 'linear-gradient(to left, transparent 2px, black 15px)',
                    WebkitMaskImage: 'linear-gradient(to left, transparent 2px, black 15px)'
                  }}
                >
                  <div className="w-[800px] h-full flex items-center justify-end pointer-events-none pr-0">
                    <LaserFlow
                      color="#0066cc"
                      width={800}  
                      height={6} // Sleeker thickness
                      direction="horizontal"
                      flowSpeed={0.5}
                      flowStrength={1.5}
                      sharpEnds={true}
                      wispIntensity={2.5}
                    />
                  </div>
                </motion.div>

                {/* --- CENTRAL HUB --- */}
                <div className="relative z-50 flex items-center justify-center mx-1 md:mx-2 shrink-0">
                  {/* Ripple Effect Glow */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: logoOpacity }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border border-blue-600/20 rounded-full"
                        initial={{ width: 100, height: 100, opacity: 0.5 }}
                        animate={{
                          width: [100, 500],
                          height: [100, 500],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 4.4, // 2x Slower
                          repeat: Infinity,
                          delay: i * 1.1, // 2x Slower
                          ease: "linear"
                        }}
                      />
                    ))}
                    <div className="absolute w-[250px] h-[250px] bg-blue-900/25 blur-[90px] rounded-full" />
                  </motion.div>

                  {/* Wising Logo */}
                  <motion.div
                    style={{ opacity: logoOpacity, scale: logoScale }}
                    className="relative"
                  >
                    <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                      <img
                        src={wisingLogo}
                        alt="Wising"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(0,102,204,0.8)]"
                      />
                    </div>
                    <motion.div
                      className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full"
                      animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>

                {/* --- RIGHT BEAM CONTAINER --- */}
                <motion.div 
                  className="flex-1 h-20 relative flex items-center justify-start overflow-hidden"
                  style={{ 
                    opacity: beamOpacity, 
                    clipPath: rightClipPath,
                    // Use a mask to ensure the beam fades out perfectly at the container edge
                    maskImage: 'linear-gradient(to right, transparent 2px, black 15px)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 2px, black 15px)'
                  }}
                >
                  <div className="w-[800px] h-full flex items-center justify-start pointer-events-none pl-0">
                    <LaserFlow
                      color="#0066cc"
                      width={800} 
                      height={6}
                      direction="horizontal"
                      flowSpeed={0.5}
                      flowStrength={1.5}
                      sharpEnds={true}
                      wispIntensity={2.5}
                    />
                  </div>
                </motion.div>

                {/* --- RIGHT: INDIA JURISDICTION --- */}
                <motion.div 
                  className="flex flex-col items-end gap-6 z-20 pointer-events-auto text-right relative px-6 py-8 rounded-[2rem] transition-all duration-300"
                  style={{
                    opacity: dashboardsOpacity,
                    scale: dashboardsScale,
                    background: useTransform(chargingGlow, [0, 1], ["rgba(2,2,2,0.95)", "rgba(0,31,63,0.2)"]),
                    border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(161,161,161,0.15)", "1px solid rgba(161,161,161,0.5)"]),
                  }}
                >

                  <div className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-lg mb-2 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                     <motion.span 
                       className="text-[12px] font-extrabold tracking-[0.3em] uppercase font-['Manrope',sans-serif] bg-[length:200%_auto] bg-clip-text text-transparent"
                       style={{
                         backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #a1a1a1 25%, #ffffff 50%, #a1a1a1 75%, #ffffff 100%)',
                       }}
                       animate={{ backgroundPosition: ['0% center', '200% center'] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     >
                       Indian Jurisdiction
                     </motion.span>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="w-12 h-14 bg-white/[0.03] rounded-xl border border-white/10 p-2 backdrop-blur-md flex items-center justify-center">
                      <img 
                        src={indiaEmblem} 
                        alt="ITD" 
                       className="w-full h-full object-contain filter brightness-125 grayscale" 
                      />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-white/90 font-['Manrope',sans-serif] text-[11px] font-bold tracking-wider uppercase">Income Tax Department</span>
                      <span className="text-slate-500 text-[9px] uppercase tracking-widest leading-none mt-0.5">Government of India</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 items-end mt-2">
                    {[ "LRS Remittance Tracked", "FEMA RESIDENCY VERIFIED", "DTAA Relief Applied" ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 justify-end">
                        <span className="text-slate-200 font-['Manrope',sans-serif] text-xs font-bold tracking-wider uppercase">{text}</span>
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          style={{ boxShadow: "0 0 12px #0066cc" }} 
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

            </div>
          </StarBorder>
        </div>
      </div>
    </section>
  );
};

export default PulsatingBeamSection;
