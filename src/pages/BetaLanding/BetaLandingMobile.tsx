import React, { useRef, useState } from 'react';
import { Header } from '../../components/layout/Header';
import EarthGlobeMobile from '../../components/ui/earth-globe-mobile';
import AnimatedText from '../../components/ui/animated-text';
import { MagicText } from '../../components/ui/magic-text';
import FeatureSection from '../../components/ui/feature-section';
import SolutionSection from '../../components/ui/solution-section';
import { BentoGrid } from '../../components/ui/bento-grid';
import { CpuArchitecture } from '../../components/ui/cpu-architecture';
import { PulsatingBeamMobile } from '../../components/ui/PulsatingBeamMobile';
import Starfield from '../../components/ui/Starfield';
import { FlickeringFooter } from '../../components/ui/flickering-footer';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BetaLandingMobile() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    // ref spans Hero + Section 2 — globe sticks inside this
    const globeStickyRef = useRef<HTMLDivElement>(null);

    const handleJoinWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        try {
            const formData = new FormData();
            formData.append("email", email);
            await fetch("https://script.google.com/macros/s/AKfycbw4jarZsUnoMMlGuEX8qvdXj7IAwxrNo5-SpROrQIGL01V3vBYYaxg44XMFneXSZ5Macg/exec", {
                method: "POST", body: formData, mode: "no-cors"
            });
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            setEmail('');
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            setEmail('');
        }
    };

    return (
        <div className="dark-gradient-bg font-['Manrope',sans-serif] min-h-screen text-white relative">
            <Starfield />
            <Header />

            {/* ═══════════════════════════════════════════════════
                GLOBE STICKY ZONE — spans Hero + Section 2
                The globe sticks inside this container.
                Content layers on top with z-index.
            ════════════════════════════════════════════════════ */}
            <div ref={globeStickyRef} className="relative" style={{ height: '200vh' }}>

                {/* Globe: sticky inside this container */}
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden pointer-events-none z-0 flex items-center justify-center">
                    <EarthGlobeMobile containerRef={globeStickyRef} />
                </div>

                {/* Content floats on top — pulls back up over the globe via negative margin */}
                <div className="absolute inset-0 z-10 flex flex-col">

                    {/* ── HERO SECTION (100vh) ── */}
                    <section className="w-full h-[100svh] flex flex-col items-center justify-center px-4 relative overflow-hidden">

                        {/* Headline — centered vertically + horizontally */}
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-16 px-4">
                            <AnimatedText 
                                text="CROSS-BORDER" 
                                className="font-['Cormorant_Garamond',serif] text-lg font-bold tracking-[0.3em] text-white mb-2"
                                animationType="letters"
                                staggerDelay={0.06}
                                duration={0.8}
                            />
                            
                            <div className="mt-1 flex flex-col items-center">
                                <AnimatedText 
                                    text="TAX CONFLICT" 
                                    className="font-['Syne',sans-serif] text-[36px] leading-[1.1] font-bold tracking-[0.1em] globe-color-shimmer"
                                    animationType="letters"
                                    staggerDelay={0.04}
                                    duration={0.8}
                                />
                                <AnimatedText 
                                    text="DETECTION" 
                                    className="font-['Syne',sans-serif] text-[36px] leading-[1.1] font-bold tracking-[0.1em] globe-color-shimmer"
                                    animationType="letters"
                                    staggerDelay={0.04}
                                    duration={0.8}
                                />
                            </div>

                            <div className="mt-2">
                                <AnimatedText 
                                    text="For Tax Professionals." 
                                    className="font-['Playfair_Display',serif] text-xs italic tracking-[0.3em] bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent uppercase"
                                    animationType="letters"
                                    staggerDelay={0.05}
                                    duration={0.8}
                                />
                            </div>
                        </div>

                        {/* Waitlist form — small and horizontal */}
                        <div className="absolute bottom-[40px] left-0 w-full flex flex-col items-center z-20 px-4">
                            <form onSubmit={handleJoinWaitlist} className="w-full max-w-[320px] mx-auto relative group">
                                {/* Shimmering Border Container */}
                                <div
                                    className="absolute -inset-[1px] rounded-[100px] pointer-events-none opacity-70"
                                    style={{
                                        background: "linear-gradient(90deg, rgba(156, 163, 175, 0.3) 0%, rgba(209, 213, 219, 0.6) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(209, 213, 219, 0.6) 80%, rgba(156, 163, 175, 0.3) 100%)",
                                        backgroundSize: "200% auto",
                                        animation: "shimmer-move 4s linear infinite"
                                    }}
                                />

                                {/* Horizontal Input + Button Container */}
                                <div className="bg-[#0b0b0b] relative rounded-[100px] w-full flex items-center p-1 shadow-[0px_10px_30px_-10px_rgba(255,255,255,0.05)]">
                                    <div className="flex-1 px-4 min-w-0">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={status === 'loading'}
                                            required
                                            className="w-full bg-transparent border-none text-white text-[11px] tracking-[1px] font-['Manrope',sans-serif] placeholder:text-white/40 focus:ring-0 focus:outline-none disabled:opacity-50"
                                            placeholder="Your Email ID"
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="flex-shrink-0 flex gap-2 items-center justify-center px-4 py-2.5 rounded-[100px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed z-10"
                                        style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(209, 213, 219) 50%, rgb(156, 163, 175) 100%)" }}
                                    >
                                        <p className="font-['Montserrat',sans-serif] font-bold leading-[1] text-[9px] text-black tracking-[2px] uppercase">
                                            {status === 'loading' ? 'JOINING...' : status === 'success' ? 'JOINED!' : 'JOIN'}
                                        </p>
                                    </button>
                                </div>
                            </form>

                            {/* No Commitments Text */}
                            <div className="mt-4 flex items-center justify-center gap-2">
                                <div className="flex items-center justify-center w-1.5 h-1.5 rounded-full border-[0.4px] border-white/30">
                                    <svg width="4" height="4" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C0C0C0]/80">
                                        <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-[8px] font-['Manrope',sans-serif] text-white/60 tracking-[2px] uppercase font-normal">
                                    NO COMMITMENTS REQUIRED
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 2: Magic Text (100vh, globe still visible behind) ── */}
                    <section className="w-full h-[100svh] flex items-center justify-start px-5 pb-20">
                        <div className="max-w-full w-full">
                            <MagicText
                                text="Income that is fully compliant in one country can easily trigger overlapping liabilities in another. Often, this gets missed until a return is already filed. Wising checks multiple tax codes against the same facts and shows you exactly where the overlap happens, with the math behind it. One monitor for your entire client book, not isolated spreadsheets for every jurisdiction."
                                wordClassName="text-[1.25rem] leading-[1.4] font-medium font-['Manrope',sans-serif] text-white"
                            />
                        </div>
                    </section>

                </div>
            </div>
            {/* ═══ END GLOBE STICKY ZONE ═══ */}

            {/* Section 3: Pulsating Beam — has its own sticky/scroll inside */}
            <PulsatingBeamMobile />

            {/* Section 4: The Problem / Feature Section (Unsticked) */}
            <div className="w-full py-12 px-2 bg-black flex flex-col items-center justify-center relative z-20 rounded-[2rem]">
                <FeatureSection />
            </div>

            {/* Section 5: The Solution */}
            <div className="w-full flex justify-center py-6 px-3 bg-transparent relative z-20">
                <div className="w-full bg-[#050505] rounded-[2rem] border border-white/5 py-8">
                    <SolutionSection />
                </div>
            </div>

            {/* Section 6: Bento Grid Features */}
            <div className="w-full flex justify-center py-4 px-3 bg-transparent relative z-20">
                <div className="w-full">
                    <BentoGrid />
                </div>
            </div>

            {/* Section 7: Zero Trust */}
            <div className="w-full px-5 py-16 bg-[#050505] relative z-20 rounded-[2rem] border border-white/5 mx-2 my-6" style={{ width: 'calc(100% - 16px)' }}>
                <div className="flex flex-col items-center text-center gap-10">
                    <div className="w-full flex flex-col items-center space-y-6">
                        <span className="px-4 py-1.5 text-[11px] bg-black text-white border border-white/20 rounded-full font-['Manrope',sans-serif] font-bold tracking-wide">
                            Security Core
                        </span>
                        <MagicText
                            text="Zero Trust Validation"
                            className="px-0 flex justify-center"
                            wordClassName="text-3xl font-bold font-['Manrope',sans-serif] leading-[1.1] tracking-tight !text-white text-center"
                        />
                        <p className="text-white/80 font-['Manrope',sans-serif] text-sm leading-relaxed px-2">
                            Our core architecture assumes no entity is trustworthy by default. Wising integrates SASE to enforce least-privilege access, continuous microsegmentation, and strict verification—minimizing the attack surface and proactively preventing lateral movement across your resources.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full bg-black rounded-[1.5rem] border border-white/10 p-4 md:p-6 flex items-center justify-center"
                    >
                        <CpuArchitecture text="Zero Trust Security" className="w-full h-auto drop-shadow-xl" />
                    </motion.div>
                </div>
                <div className="w-full flex justify-center mt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-8 py-4 bg-white text-black font-bold font-['Manrope',sans-serif] text-sm rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    >
                        Join the waitlist <ArrowUp className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <div className="relative z-30 w-full bg-black rounded-t-[2rem] border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)] mt-4">
                <FlickeringFooter />
            </div>
        </div>
    );
}

export default BetaLandingMobile;
