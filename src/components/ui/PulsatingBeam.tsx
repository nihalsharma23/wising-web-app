import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaserFlow from "./LaserFlow";

import StarBorder from "./StarBorder";
import wisingLogo from "../../assets/header_logo.png";
import irsLogo from "../../assets/logos/irs-logo.png";
import secLogo from "../../assets/logos/sec-logo.png";
import itdLogo from "../../assets/logos/itd-logo.png";
import rbiLogo from "../../assets/logos/rbi-logo.png";
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
      className="h-[300vh] bg-transparent w-full relative overflow-clip"
      ref={ref}
    >
      <div className="sticky top-[80px] h-[calc(100vh-90px)] w-full flex items-center justify-center px-2 md:px-6 pb-2">
        
        {/* --- NO CONTAINER --- */}
        <div className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center">
          
          <StarBorder as="div" color="#001f3f" speed="8s" thickness={3} className="w-full h-full">

            {/* --- MAIN CONTENT: FLEX ROW FOR AUTO-ALIGNMENT --- */}
            <div className="relative w-full h-full flex flex-col items-center justify-center z-10 px-4 md:px-20">
              
              <div className="w-full flex items-center justify-between">
                
                {/* --- LEFT: US JURISDICTION --- */}
                <motion.div 
                   className="flex flex-col items-start gap-6 z-20 pointer-events-auto relative px-10 py-10 rounded-[2rem] transition-all duration-300 min-w-[340px]"
                   style={{
                     opacity: dashboardsOpacity,
                     scale: dashboardsScale,
                     background: useTransform(chargingGlow, [0, 1], ["rgba(0, 0, 0, 0.95)", "rgba(10, 10, 10, 0.8)"]),
                     border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(255, 255, 255, 0.05)", "1px solid rgba(255, 255, 255, 0.1)"]),
                     backdropBlur: "20px"
                   }}
                >

                   <div className="px-5 py-2.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                       <motion.span 
                        className="text-[14px] font-bold tracking-[0.2em] uppercase bg-[length:200%_auto] bg-clip-text text-transparent"
                        style={{
                          backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #a1a1a1 25%, #ffffff 50%, #a1a1a1 75%, #ffffff 100%)',
                        }}
                        animate={{ backgroundPosition: ['0% center', '200% center'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        US JURISDICTION
                      </motion.span>
                   </div>

                  <div className="flex items-center gap-4 mt-2">
                    <img 
                      src={irsLogo} 
                      alt="IRS" 
                      className="w-[110px] h-[110px] object-contain filter brightness-0 invert opacity-90" 
                    />
                    <img 
                      src={secLogo} 
                      alt="SEC" 
                      className="w-[110px] h-[110px] object-contain filter grayscale(1) invert(1)" 
                    />
                  </div>

                  <div className="flex flex-col gap-3.5 mt-2">
                    {[ "FBAR Filed", "Form 8621 Optimized", "FATCA Verified" ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <motion.div 
                          className="w-1.5 h-1.5 rounded-full bg-blue-500" 
                          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} 
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                          style={{ boxShadow: "0 0 12px #0066cc" }} 
                        />
                        <span className="text-white/90 font-['Manrope',sans-serif] text-[13px] font-bold tracking-wider capitalize">{text}</span>
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
                      color="#004080"
                      width={800}  
                      height={12} // Increased thickness
                      direction="horizontal"
                      flowSpeed={0.5}
                      flowStrength={1.2}
                      sharpEnds={true}
                      wispIntensity={2.0}
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
                        className="absolute border border-slate-500/10 rounded-full"
                        initial={{ width: 100, height: 100, opacity: 0.3 }}
                        animate={{
                          width: [100, 500],
                          height: [100, 500],
                          opacity: [0.3, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: i * 1.25,
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
                      color="#004080"
                      width={800} 
                      height={12}
                      direction="horizontal"
                      flowSpeed={0.5}
                      flowStrength={1.2}
                      sharpEnds={true}
                      wispIntensity={2.0}
                    />
                  </div>
                </motion.div>

                {/* --- RIGHT: INDIA JURISDICTION --- */}
                <motion.div 
                  className="flex flex-col items-end gap-6 z-20 pointer-events-auto text-right relative px-10 py-10 rounded-[2rem] transition-all duration-300 min-w-[340px]"
                  style={{
                    opacity: dashboardsOpacity,
                    scale: dashboardsScale,
                    background: useTransform(chargingGlow, [0, 1], ["rgba(0, 0, 0, 0.95)", "rgba(10, 10, 10, 0.8)"]),
                    border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(255, 255, 255, 0.05)", "1px solid rgba(255, 255, 255, 0.1)"]),
                    backdropBlur: "20px"
                  }}
                >

                   <div className="px-5 py-2.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                       <motion.span 
                        className="text-[14px] font-bold tracking-[0.2em] uppercase bg-[length:200%_auto] bg-clip-text text-transparent"
                        style={{
                          backgroundImage: 'linear-gradient(110deg, #ffffff 0%, #a1a1a1 25%, #ffffff 50%, #a1a1a1 75%, #ffffff 100%)',
                        }}
                        animate={{ backgroundPosition: ['0% center', '200% center'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        INDIAN JURISDICTION
                      </motion.span>
                   </div>

                  <div className="flex items-center justify-end gap-4 mt-2">
                    <img 
                      src={itdLogo} 
                      alt="Income Tax" 
                      className="w-[110px] h-[110px] object-contain opacity-90" 
                    />
                    <img 
                      src={rbiLogo} 
                      alt="RBI" 
                      className="w-[132px] h-[132px] object-contain" 
                    />
                  </div>

                  <div className="flex flex-col gap-3.5 items-end mt-2">
                    {[ "LRS Remittance Tracked", "FEMA Residency Verified", "DTAA Relief Applied" ].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 justify-end">
                        <span className="text-white/90 font-['Manrope',sans-serif] text-[13px] font-bold tracking-wider capitalize">{text}</span>
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
