import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LaserFlow from "./LaserFlow";
import StarBorder from "./StarBorder";
import wisingLogo from "../../assets/header_logo.png";
import irsLogo from "../../assets/logos/irs-logo.png";
import secLogo from "../../assets/logos/sec-logo.png";
import itdLogo from "../../assets/logos/itd-logo.png";
import rbiLogo from "../../assets/logos/rbi-logo.png";

/**
 * Mobile Pulsating Beam — Container Width Cards
 * 
 * 1. Cards span full width of the StarBorder container.
 * 2. Subtle height increase (+1px effect).
 */
export const PulsatingBeamMobile = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Phases
  const logoOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const logoScale   = useTransform(scrollYProgress, [0, 0.05], [0.8, 1]);

  const beamOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
  const growthProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 100]);
  
  const topClip = useTransform(growthProgress, (v) => `inset(${100 - v}% 0 0 0)`);
  const btmClip = useTransform(growthProgress, (v) => `inset(0 0 ${100 - v}% 0)`);

  const dashOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const dashScale   = useTransform(scrollYProgress, [0.1, 0.25], [0.98, 1]);
  const glow        = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  return (
    <section
      className="h-[400vh] bg-black w-full relative z-30"
      ref={ref}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-2">
        <div className="w-full h-full max-h-[95vh] relative rounded-[2.5rem] bg-[#030712] border border-white/10">
          <StarBorder as="div" color="#001f3f" speed="8s" thickness={2} className="w-full h-full">

            <div className="relative w-full h-full flex flex-col items-center justify-between py-10 px-0 z-10">

              {/* ── US JURISDICTION CARD (Full Container Width) ── */}
              <motion.div
                className="w-full flex flex-col gap-3 rounded-none px-6 py-[1.4rem] z-20 border-y border-white/5"
                style={{
                  opacity: dashOpacity,
                  scale: dashScale,
                  background: useTransform(glow, [0, 1], ["rgba(0,0,0,1)", "rgba(10,10,10,0.95)"]),
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="w-full flex justify-start">
                   <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-white/70 uppercase">US JURISDICTION</span>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center gap-4 shrink-0">
                    <img src={irsLogo} alt="IRS" className="w-[50px] h-[50px] object-contain brightness-0 invert opacity-90" />
                    <img src={secLogo} alt="SEC" className="w-[50px] h-[50px] object-contain" />
                  </div>
                  <div className="flex flex-col gap-1.5 items-end flex-1 pl-4">
                    {["FBAR Filed", "Form 8621 Optimized", "FATCA Verified"].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 justify-end w-full">
                        <span className="text-white/90 font-['Manrope'] text-[11px] font-bold tracking-tight whitespace-nowrap">{text}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── TOP BEAM ── */}
              <motion.div
                className="flex-1 w-full flex items-center justify-center overflow-hidden relative min-h-[40px]"
                style={{
                  opacity: beamOpacity,
                  clipPath: topClip,
                  maskImage: 'linear-gradient(to top, transparent, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent, black 15%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  <LaserFlow
                    color="#004080"
                    width={400}
                    height={10}
                    direction="vertical"
                    flowSpeed={0.5}
                    flowStrength={1.2}
                    wispIntensity={2.0}
                  />
                </div>
              </motion.div>

              {/* ── CENTRAL HUB ── */}
              <div className="relative z-50 flex items-center justify-center flex-shrink-0">
                <motion.div style={{ opacity: logoOpacity, scale: logoScale }} className="relative">
                  <div className="relative z-10 w-[72px] h-[72px] flex items-center justify-center">
                    <img src={wisingLogo} alt="Wising" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,102,204,0.6)]" />
                  </div>
                </motion.div>
              </div>

              {/* ── BOTTOM BEAM ── */}
              <motion.div
                className="flex-1 w-full flex items-center justify-center overflow-hidden relative min-h-[40px]"
                style={{
                  opacity: beamOpacity,
                  clipPath: btmClip,
                  maskImage: 'linear-gradient(to bottom, transparent, black 15%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center pointer-events-none">
                  <LaserFlow
                    color="#004080"
                    width={400}
                    height={10}
                    direction="vertical"
                    flowSpeed={0.5}
                    flowStrength={1.2}
                    wispIntensity={2.0}
                  />
                </div>
              </motion.div>

              {/* ── INDIA JURISDICTION CARD (Full Container Width) ── */}
              <motion.div
                className="w-full flex flex-col gap-3 rounded-none px-6 py-[1.4rem] z-20 border-y border-white/5"
                style={{
                  opacity: dashOpacity,
                  scale: dashScale,
                  background: useTransform(glow, [0, 1], ["rgba(0,0,0,1)", "rgba(10,10,10,0.95)"]),
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="w-full flex justify-start">
                   <div className="px-3 py-1 rounded-full bg-black/50 border border-white/10">
                    <span className="text-[9px] font-bold tracking-[0.12em] text-white/70 uppercase">INDIAN JURISDICTION</span>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center gap-4 shrink-0">
                    <img src={itdLogo} alt="ITD" className="w-[50px] h-[50px] object-contain opacity-90" />
                    <img src={rbiLogo} alt="RBI" className="w-[62px] h-[62px] object-contain" />
                  </div>
                  <div className="flex flex-col gap-1.5 items-end flex-1 pl-4">
                    {["LRS Remittance Tracked", "FEMA Residency Verified", "DTAA Relief Applied"].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 justify-end w-full">
                        <span className="text-white/90 font-['Manrope'] text-[11px] font-bold tracking-tight whitespace-nowrap">{text}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </StarBorder>
        </div>
      </div>
    </section>
  );
};

export default PulsatingBeamMobile;
