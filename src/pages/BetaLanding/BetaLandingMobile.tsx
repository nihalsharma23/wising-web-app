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
                <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0 flex items-center justify-center">
                    <EarthGlobeMobile containerRef={globeStickyRef} />
                </div>

                {/* Content floats on top — pulls back up over the globe via negative margin */}
                <div className="absolute inset-0 z-10 flex flex-col">

                    {/* ── HERO SECTION (100vh) ── */}
                    <section className="w-full h-screen flex flex-col items-center justify-center px-4 relative">

                        {/* Headline — centered vertically + horizontally */}
                        <div className="flex flex-col items-center text-center gap-3">
                            <AnimatedText
                                text="CROSS BORDER WEALTH"
                                className="font-['Cormorant_Garamond',serif] text-[1.1rem] font-bold tracking-[0.3em] text-white mb-2"
                                animationType="letters"
                                staggerDelay={0.06}
                                duration={0.8}
                            />

                            {/* Two lines so text fits the mobile viewport */}
                            <div className="flex flex-col items-center">
                                <h1 className="font-['Syne',sans-serif] text-[2.8rem] leading-[0.95] font-bold tracking-[0.01em] globe-color-shimmer text-center">
                                    COMPLIANCE
                                </h1>
                                <h1 className="font-['Syne',sans-serif] text-[2.8rem] leading-[0.95] font-bold tracking-[0.01em] globe-color-shimmer text-center">
                                    FIREWALL
                                </h1>
                            </div>

                            <AnimatedText
                                text="For Future Agents"
                                className="font-['Playfair_Display',serif] text-sm italic tracking-[0.3em] bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent uppercase"
                                animationType="letters"
                                staggerDelay={0.05}
                                duration={0.8}
                            />
                        </div>

                        {/* Waitlist form — pinned to bottom of hero */}
                        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center px-6">
                            <form onSubmit={handleJoinWaitlist} className="w-full max-w-[280px] mx-auto relative">
                                <div
                                    className="absolute -inset-[1px] rounded-[12px] pointer-events-none opacity-70"
                                    style={{
                                        background: "linear-gradient(90deg, rgba(156,163,175,0.3) 0%, rgba(255,255,255,0.8) 50%, rgba(156,163,175,0.3) 100%)",
                                        backgroundSize: "200% auto",
                                        animation: "shimmer-move 4s linear infinite"
                                    }}
                                />
                                <div className="bg-[#0b0b0b] relative rounded-tl-[12px] rounded-tr-[12px] w-full">
                                    <div className="flex items-center px-4 py-3 w-full">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={status === 'loading'}
                                            required
                                            className="w-full bg-transparent border-none text-white text-[13px] tracking-wide font-['Manrope',sans-serif] placeholder:text-white/40 focus:ring-0 focus:outline-none"
                                            placeholder="Your Email ID"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="flex gap-2 items-center justify-center py-3 rounded-bl-[12px] rounded-br-[12px] w-full font-['Montserrat',sans-serif] font-bold text-[11px] text-black tracking-[2px] uppercase cursor-pointer disabled:opacity-70"
                                    style={{ backgroundImage: "linear-gradient(135deg,#fff 0%,#d1d5db 50%,#9ca3af 100%)" }}
                                >
                                    {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined! ✓' : 'Join Waitlist →'}
                                </button>
                            </form>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg width="4" height="4" viewBox="0 0 10 10" fill="none" className="text-white/60">
                                        <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-[9px] text-white/50 tracking-[1.5px] uppercase">NO COMMITMENTS REQUIRED</span>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 2: Magic Text (100vh, globe still visible behind) ── */}
                    <section className="w-full h-screen flex items-center justify-start px-5">
                        <div className="max-w-lg w-full">
                            <MagicText
                                text="Wising Enforces real-time US (IRS), Indian Tax Law and FEMA Compliance on every agentic action. You get instant feedback. Your CAs, CPAs and Wealth Manager receive a Professional Brief about the action. Issues get fixed at the source. Everyone Moves Faster."
                                wordClassName="text-[1.2rem] leading-[1.45] font-medium font-['Manrope',sans-serif] text-white"
                                margin="-80px"
                            />
                        </div>
                    </section>

                </div>
            </div>
            {/* ═══ END GLOBE STICKY ZONE ═══ */}

            {/* Section 3: Pulsating Beam — has its own 300vh + sticky inside */}
            <PulsatingBeamMobile />

            {/* Section 4: The Problem / Feature Section (Unsticked) */}
            <div className="w-full py-8 px-2 bg-black flex flex-col items-center justify-center relative z-20">
                <FeatureSection />
            </div>

            {/* Section 5: Magic Text Reveal 2 */}
            <div className="w-full flex justify-center py-8 bg-transparent relative z-20">
                <div className="w-full bg-black px-6 py-10">
                    <MagicText
                        text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                        className="px-0"
                        wordClassName="text-[20px] font-normal font-['Manrope',sans-serif] leading-relaxed"
                        iconSizeClassName="w-8 h-8"
                        margin="-100px"
                    />
                </div>
            </div>

            {/* Section 6: The Solution */}
            <div className="w-full flex justify-center py-6 bg-transparent relative z-20">
                <div className="w-full bg-[#050505] rounded-[2.5rem] border border-white/5 p-4">
                    <SolutionSection />
                </div>
            </div>

            {/* Section 7: Bento Grid Features */}
            <div className="w-full flex justify-center py-4 bg-transparent relative z-20">
                <div className="w-full">
                    <BentoGrid />
                </div>
            </div>

            {/* Section 8: Zero Trust */}
            <div className="w-full px-4 py-12 bg-[#050505] relative z-20 mt-4">
                <div className="flex flex-col items-center text-center gap-10">
                    <div className="w-full flex flex-col items-center space-y-6">
                        <span className="px-4 py-1.5 text-[11px] bg-black text-white border border-white/20 rounded-full font-['Manrope',sans-serif] font-bold tracking-wide">
                            Security Core
                        </span>
                        <MagicText
                            text="Zero Trust Validation"
                            className="px-0 flex justify-center"
                            wordClassName="text-3xl font-bold font-['Manrope',sans-serif] leading-[1.1] tracking-tight !text-white"
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
                        className="w-full bg-black rounded-[1.5rem] border border-white/10 p-6 flex items-center justify-center"
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
            <div className="relative z-30 w-full bg-black rounded-t-[2rem] border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <FlickeringFooter />
            </div>
        </div>
    );
}

export default BetaLandingMobile;
