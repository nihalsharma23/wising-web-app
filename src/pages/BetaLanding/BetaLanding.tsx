import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Badge } from '../../components/ui/badge';
import EarthGlobe from '../../components/ui/earth-globe';
import AnimatedText from '../../components/ui/animated-text';
import HeroText from '../../components/ui/hero-shutter-text';
import HoverBorderGradient from '../../components/ui/hover-border-gradient';
import { MagicText } from '../../components/ui/magic-text';
import FeatureSection from '../../components/ui/feature-section';
import StackFeatureSection from '../../components/ui/stack-feature-section';
import SolutionSection from '../../components/ui/solution-section';
import { BentoGrid } from '../../components/ui/bento-grid';
import { CpuArchitecture } from '../../components/ui/cpu-architecture';
import SkewCards from '../../components/ui/gradient-card-showcase';
import { PulsatingBeamSection } from '../../components/ui/PulsatingBeam';
import Starfield from '../../components/ui/Starfield';

import { FlickeringFooter } from '../../components/ui/flickering-footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ArrowRight } from 'lucide-react';
import { StickyCard } from '../../components/layout/StickyCard';

export function BetaLanding() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleJoinWaitlist = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        
        try {
            const formData = new FormData();
            formData.append("email", email);

            await fetch("https://script.google.com/macros/s/AKfycbw4jarZsUnoMMlGuEX8qvdXj7IAwxrNo5-SpROrQIGL01V3vBYYaxg44XMFneXSZ5Macg/exec", {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });
            
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
            setEmail('');
        } catch (error) {
            console.error("Error joining waitlist:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            setEmail('');
        }
    };

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <div className="bg-black font-['Manrope',sans-serif] min-h-screen text-white relative px-[15px]">
                <Starfield />
                <Header />
                {/* Anchor Wrapper for EarthGlobe (Hero + Section 2) */}
                <div className="relative w-full z-0 bg-transparent">
                    {/* Background Sticky Layer */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <EarthGlobe />
                    </div>
                    
                    {/* Foreground Content */}
                    <div className="relative w-full z-10 flex flex-col">
                        
                        {/* Hero Section */}
                        <main className="w-full flex flex-col items-center justify-center relative min-h-screen bg-transparent overflow-hidden">
                            {/* Hero Content */}
                            <div className="relative z-10 flex flex-col items-center text-center space-y-4 pt-16 px-4">
                                <AnimatedText 
                                    text="CROSS BORDER WEALTH" 
                                    className="font-['Cormorant_Garamond',serif] text-lg md:text-xl lg:text-2xl font-bold tracking-[0.3em] text-white mb-2"
                                    animationType="letters"
                                    staggerDelay={0.06}
                                    duration={0.8}
                                />
                                
                                <div className="mt-1">
                                    <AnimatedText 
                                        text="COMPLIANCE FIREWALL" 
                                        className="font-['Syne',sans-serif] text-[32px] md:text-[50px] lg:text-[74px] font-bold tracking-[0.1em] globe-color-shimmer"
                                        animationType="letters"
                                        staggerDelay={0.04}
                                        duration={0.8}
                                    />
                                </div>

                                <div className="mt-2">
                                    <AnimatedText 
                                        text="For Future Agents" 
                                        className="font-['Playfair_Display',serif] text-sm md:text-base lg:text-lg italic tracking-[0.5em] bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent uppercase"
                                        animationType="letters"
                                        staggerDelay={0.05}
                                        duration={0.8}
                                    />
                                </div>
                            </div>

                            {/* Spacer to maintain headline centering as it was previously */}
                            <div className="mt-12 w-full h-[100px] pointer-events-none invisible" />

                            {/* Actual Waitlist positioned at bottom */}
                            <div className="absolute bottom-[40px] left-0 w-full flex flex-col items-center z-20 px-4">
                                <form onSubmit={handleJoinWaitlist} className="w-full max-w-[304px] mx-auto relative group">
                                    {/* Shimmering Border Container */}
                                    <div
                                        className="absolute -inset-[1px] rounded-[16px] pointer-events-none opacity-70"
                                        style={{
                                            background: "linear-gradient(90deg, rgba(156, 163, 175, 0.3) 0%, rgba(209, 213, 219, 0.6) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(209, 213, 219, 0.6) 80%, rgba(156, 163, 175, 0.3) 100%)",
                                            backgroundSize: "200% auto",
                                            animation: "shimmer-move 4s linear infinite"
                                        }}
                                    />

                                    {/* Input Content */}
                                    <div className="bg-[#0b0b0b] relative rounded-tl-[16px] rounded-tr-[16px] w-full border border-b-0 border-[#1f1f1f]/0">
                                        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                                            <div className="relative w-full">
                                                <div className="bg-clip-padding content-stretch flex items-start justify-center overflow-clip px-5 md:px-6 py-4 md:py-5 relative rounded-[inherit] w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            disabled={status === 'loading'}
                                                            required
                                                            className="w-full bg-transparent border-none text-white text-xs tracking-[1px] font-['Manrope',sans-serif] placeholder:text-white/40 focus:ring-0 focus:outline-none disabled:opacity-50"
                                                            placeholder="Your Email ID Here."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="content-stretch flex gap-4 items-center justify-center overflow-clip py-[15px] relative rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_30px_-10px_rgba(255,255,255,0.05)] w-full cursor-pointer hover:shadow-[0px_10px_40px_-5px_rgba(255,255,255,0.1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed z-10 bg-white/10 backdrop-blur-xl border border-white/10"
                                    >
                                        <div className="absolute inset-0 opacity-30 rounded-bl-[16px] rounded-br-[16px]" />
                                        <div className="relative flex flex-col font-['Montserrat',sans-serif] font-medium justify-center leading-[0] text-xs text-white text-center tracking-[1.5px] uppercase">
                                            <p className="leading-[15px] whitespace-pre-wrap">{status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join the Waitlist'}</p>
                                        </div>
                                        {status !== 'loading' && status !== 'success' && (
                                            <div className="relative flex flex-col justify-center leading-[0] not-italic text-[10px] text-white text-center">
                                                <span className="material-symbols-outlined text-[10px] font-thin">arrow_forward_ios</span>
                                            </div>
                                        )}
                                    </button>
                                </form>

                                {/* No Commitments Text */}
                                <div className="mt-4 flex items-center justify-center gap-2">
                                    <div className="flex items-center justify-center w-2 h-2 rounded-full border-[0.4px] border-white/30">
                                        <svg
                                            width="6"
                                            height="6"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="text-[#C0C0C0]/80"
                                        >
                                            <path
                                                d="M2 5L4 7L8 3"
                                                stroke="currentColor"
                                                strokeWidth="0.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] font-['Manrope',sans-serif] text-white/60 tracking-[2px] uppercase font-normal">
                                        NO COMMITMENTS REQUIRED
                                    </span>
                                </div>
                            </div>
                        </main>

                        {/* Tracking/Value Prop Section 1 (Section 2 in User Request) */}
                        <section className="w-full flex items-center justify-start px-4 md:px-12 lg:px-24 min-h-screen bg-transparent pb-32">
                            <div className="max-w-2xl w-full text-left pl-0 md:pl-8">
                                <MagicText
                                    text="Wising Enforces real-time US (IRS), Indian Tax Law and FEMA Compliance on every agentic action. You get instant feedback. Your CAs, CPAs and Wealth Manager receive a Professional Brief about the action. Issues get fixed at the source. Everyone Moves Faster."
                                    wordClassName="text-xl md:text-2xl lg:text-[1.75rem] font-normal font-['Manrope',sans-serif] text-white"
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Section 3: Pulsating Beam */}
                <div className="w-full relative z-20 pt-[5px] pb-[5px]">
                    <PulsatingBeamSection />
                </div>

                {/* Section 4: The Problem / Feature Section */}
                <div className="w-full flex justify-center pt-[5px] pb-[5px] bg-transparent relative z-20">
                    <div className="w-full glass-navy-container rounded-[2.5rem]">
                        <FeatureSection />
                    </div>
                </div>

                {/* Section 5: Magic Text Reveal */}
                <div className="w-full flex justify-center pt-[5px] pb-[5px] bg-transparent relative z-20">
                    <div className="w-full glass-batman-container rounded-[2rem] px-8 md:px-12 py-12">
                        <MagicText
                            text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                            className="px-0"
                            wordClassName="text-[24px] md:text-[29px] lg:text-[33px] font-normal font-['Manrope',sans-serif]"
                            iconSizeClassName="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                        />
                    </div>
                </div>

                {/* Section 6: The Solution */}
                <div className="w-full flex justify-center pt-[5px] pb-[5px] bg-transparent relative z-20">
                    <div className="w-full glass-batman-container rounded-[3rem]">
                        <SolutionSection />
                    </div>
                </div>

                {/* Section 7: Bento Grid Features */}
                <div className="w-full flex justify-center pt-[5px] pb-[5px] bg-transparent relative z-20">
                    <div className="w-full glass-navy-container rounded-[3rem] py-8">
                        <BentoGrid />
                    </div>
                </div>

                {/* Section 8: Security / Zero Trust */}
                <div className="w-full flex justify-center pt-[5px] pb-32 bg-transparent relative z-20">
                    <div className="w-full glass-navy-container rounded-[3rem]">
                        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20 flex flex-col md:flex-row items-center gap-16">
                            {/* Left: Text */}
                            <div className="flex-1 space-y-12 z-10 w-full mb-10 md:mb-0">
                                <Badge variant="secondary" className="px-5 py-2.5 text-[14px] bg-black/50 border border-white/10 backdrop-blur-md text-white/90 rounded-full font-['Manrope',sans-serif] font-semibold tracking-wider w-max shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    Security Core
                                </Badge>
                                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-['Manrope',sans-serif] leading-[1.1] tracking-tight">
                                    Zero Trust Validation
                                </h2>
                                <p className="text-white/80 font-['Manrope',sans-serif] text-base md:text-lg leading-relaxed max-w-lg mt-6">
                                    Our core architecture assumes no entity is trustworthy by default. Wising integrates SASE to enforce least-privilege access, continuous microsegmentation, and strict verification—minimizing the attack surface and proactively preventing lateral movement across your resources.
                                </p>
                            </div>
                            {/* Right: Animation Container */}
                            <div className="flex-[1.5] w-full max-w-2xl md:max-w-4xl bg-black rounded-[2.5rem] border border-white/10 p-4 md:p-8 shadow-2xl flex items-center justify-center overflow-hidden">
                                <CpuArchitecture text="Zero Trust Security" className="w-full h-auto scale-110 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] opacity-95" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Section: High-Fidelity Footer — Restored to end */}
                <div className="relative z-30 w-full min-h-screen bg-black flex flex-col items-center justify-end rounded-t-[3rem] mt-[-2rem] border-t border-white/10 overflow-hidden">
                    <FlickeringFooter />
                </div>
            </div>
        </ReactLenis>
    );
}

export default BetaLanding;
