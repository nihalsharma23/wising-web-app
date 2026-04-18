import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaserFlow from "./LaserFlow";

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
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-6">
        {/* --- CONTENT AREA (Direct Flow, No Container) --- */}
        
        <div className="w-full h-full relative flex flex-col items-center justify-center">
          
          {/* Technical Grid Background - More subtle */}
          <div className="absolute inset-0 opacity-[0.08]" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,51,102,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,51,102,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)'
            }} 
          />

          {/* Central Hub Axis Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/10 to-transparent z-0" />

          {/* --- MAIN CONTENT: HUB & JURISDICTIONS --- */}
          <div className="relative w-full h-full flex flex-col items-center justify-center z-10 px-4 md:px-20">
            
            <div className="w-full flex items-center justify-between">
              
              {/* --- LEFT: US JURISDICTION --- */}
              <motion.div 
                 className="flex flex-col items-start gap-6 z-20 pointer-events-auto relative px-6 py-8 rounded-[2rem] transition-all duration-300"
                 style={{
                   opacity: dashboardsOpacity,
                   scale: dashboardsScale,
                   background: useTransform(chargingGlow, [0, 1], ["rgba(2,2,2,0.95)", "rgba(0,31,63,0.1)"]),
                   border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(161,161,161,0.1)", "1px solid rgba(161,161,161,0.3)"]),
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
                      src="/internal-revenue-service-logo-png_seeklogo-479910.png" 
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

              {/* --- LEFT BEAM --- */}
              <motion.div 
                className="flex-1 h-20 relative flex items-center justify-end overflow-hidden"
                style={{ 
                  opacity: beamOpacity, 
                  clipPath: leftClipPath,
                  maskImage: 'linear-gradient(to left, transparent 2px, black 15px)',
                  WebkitMaskImage: 'linear-gradient(to left, transparent 2px, black 15px)'
                }}
              >
                <div className="w-[800px] h-full flex items-center justify-end pointer-events-none">
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

              {/* --- CENTRAL HUB --- */}
              <div className="relative z-50 flex items-center justify-center mx-1 md:mx-2 shrink-0">
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
                        duration: 4.4,
                        repeat: Infinity,
                        delay: i * 1.1,
                        ease: "linear"
                      }}
                    />
                  ))}
                  <div className="absolute w-[250px] h-[250px] bg-blue-900/25 blur-[90px] rounded-full" />
                </motion.div>

                {/* Import the logo properly */}
                <motion.div
                  style={{ opacity: logoOpacity, scale: logoScale }}
                  className="relative"
                >
                   {/* We rely on the parent import of logo if possible, but for consistency we use a standard div if img isn't passed */}
                   {/* In this version, we keep the img tag but ensure it's bare */}
                   <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
                    <img
                      src="/src/assets/header_logo.png"
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

              {/* --- RIGHT BEAM --- */}
              <motion.div 
                className="flex-1 h-20 relative flex items-center justify-start overflow-hidden"
                style={{ 
                  opacity: beamOpacity, 
                  clipPath: rightClipPath,
                  maskImage: 'linear-gradient(to right, transparent 2px, black 15px)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 2px, black 15px)'
                }}
              >
                <div className="w-[800px] h-full flex items-center justify-start pointer-events-none">
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
                   background: useTransform(chargingGlow, [0, 1], ["rgba(2,2,2,0.95)", "rgba(0,31,63,0.1)"]),
                   border: useTransform(chargingGlow, [0, 1], ["1px solid rgba(161,161,161,0.1)", "1px solid rgba(161,161,161,0.3)"]),
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
                      src="/Emblem_of_India_with_transparent_background.png" 
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
        </div>
      </div>
    </section>
  );
};

export default PulsatingBeamSection;
