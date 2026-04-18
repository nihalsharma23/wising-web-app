import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import EarthGlobe from '../../components/ui/earth-globe';
import AnimatedText from '../../components/ui/animated-text';
import HeroText from '../../components/ui/hero-shutter-text';
import HoverBorderGradient from '../../components/ui/hover-border-gradient';
import { MagicText } from '../../components/ui/magic-text';
import FeatureSection from '../../components/ui/feature-section';
import StackFeatureSection from '../../components/ui/stack-feature-section';
import SolutionSection from '../../components/ui/solution-section';
import { CpuArchitecture } from '../../components/ui/cpu-architecture';
import SkewCards from '../../components/ui/gradient-card-showcase';
import { PulsatingBeamSection } from '../../components/ui/PulsatingBeam';

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
        }
    };

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 2, smoothWheel: true, wheelMultiplier: 0.6 }}>
            <div className="bg-[#050505] font-['Syne',sans-serif] min-h-screen text-white relative">
                <Header />
                {/* Anchor Wrapper for EarthGlobe (Hero + Section 2) */}
                <div className="relative w-full z-0 bg-black">
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
                                    className="font-['Raleway'] text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-100 via-gray-400 to-gray-600 bg-clip-text text-transparent mb-2"
                                    animationType="letters"
                                    staggerDelay={0.06}
                                    duration={0.8}
                                />
                                
                                <div className="mt-4">
                                    <AnimatedText 
                                        text="COMPLIANCE FIREWALL" 
                                        className="font-['Syne'] text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.4em] bg-gradient-to-b from-gray-100 via-gray-400 to-gray-600 bg-clip-text text-transparent"
                                        animationType="letters"
                                        staggerDelay={0.04}
                                        duration={0.8}
                                    />
                                </div>
                            </div>

                            {/* Spacer to maintain headline centering as it was previously */}
                            <div className="mt-12 w-full h-[100px] pointer-events-none invisible" />

                            {/* Actual Waitlist positioned at bottom */}
                            <div className="absolute bottom-[40px] left-0 w-full flex flex-col items-center z-20 px-4">
                                <form onSubmit={handleJoinWaitlist} className="w-full max-w-[380px] mx-auto relative group">
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
                                                <div className="bg-clip-padding content-stretch flex items-start justify-center overflow-clip px-6 md:px-8 py-5 md:py-6 relative rounded-[inherit] w-full">
                                                    <div className="flex-1 min-w-0">
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            disabled={status === 'loading'}
                                                            required
                                                            className="w-full bg-transparent border-none text-[#C0C0C0] text-sm tracking-[1.1px] font-['Manrope',sans-serif] placeholder:text-[#C0C0C0]/50 focus:ring-0 focus:outline-none disabled:opacity-50"
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
                                        className="content-stretch flex gap-5 items-center justify-center overflow-clip py-5 relative rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_30px_-10px_rgba(255,255,255,0.05)] w-full cursor-pointer hover:shadow-[0px_10px_40px_-5px_rgba(255,255,255,0.1)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed z-10"
                                        style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(209, 213, 219) 50%, rgb(156, 163, 175) 100%)" }}
                                    >
                                        <div className="absolute inset-0 opacity-30 rounded-bl-[16px] rounded-br-[16px]" />
                                        <div className="relative flex flex-col font-['Montserrat',sans-serif] font-medium justify-center leading-[0] text-sm text-black text-center tracking-[5px] uppercase">
                                            <p className="leading-[15px] whitespace-pre-wrap">{status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join the Waitlist'}</p>
                                        </div>
                                        {status !== 'loading' && status !== 'success' && (
                                            <div className="relative flex flex-col justify-center leading-[0] not-italic text-[12px] text-black text-center">
                                                <span className="material-symbols-outlined text-[12px] font-thin">arrow_forward_ios</span>
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
                                    <span className="text-[10px] font-['Manrope',sans-serif] text-[#C0C0C0]/80 tracking-[2px] uppercase font-normal">
                                        NO COMMITMENTS REQUIRED
                                    </span>
                                </div>
                            </div>
                        </main>

                        {/* Tracking/Value Prop Section 1 (Merged directly into flow, no StickyCard) */}
                        <section className="w-full flex items-center justify-start px-4 md:px-12 lg:px-24 min-h-screen bg-transparent pb-32">
                            <div className="max-w-2xl w-full text-left pl-0 md:pl-8">
                                <MagicText
                                    text="Wising Enforces real-time US (IRS), Indian Tax Law and FEMA Compliance on every agentic action. You get instant feedback. Your CAs, CPAs and Wealth Manager receive a Professional Brief about the action. Issues get fixed at the source. Everyone Moves Faster."
                                />
                            </div>
                        </section>
                    </div>
                </div>

                {/* Section 3: Pulsating Beam */}
                <div className="w-full relative z-20">
                    <PulsatingBeamSection />
                </div>

                {/* Section 4: The Problem / Feature Section */}
                <StickyCard index={0}>
                    <div className="w-full pt-0">
                        <FeatureSection />
                    </div>
                </StickyCard>

                {/* Section 4: Magic Text Reveal 2 (Previously white bg) */}
                <StickyCard index={1}>
                    <div className="w-full flex justify-center px-4 md:px-12 lg:px-24 pt-0">
                        <div className="max-w-5xl w-full">
                            <MagicText
                                text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                            />
                        </div>
                    </div>
                </StickyCard>

                {/* Section 5: Stack Interface */}
                <StickyCard index={2}>
                    <div className="w-full pt-0">
                        <StackFeatureSection />
                    </div>
                </StickyCard>

                {/* Section 6: The Solution (Animated Graph) */}
                <StickyCard index={3}>
                    <div className="w-full pt-0 bg-[#020202]">
                        <SolutionSection />
                    </div>
                </StickyCard>

                {/* Section 7: Gradient Showcase Cards */}
                <StickyCard index={4}>
                    <div className="w-full h-full flex items-center justify-center">
                        <SkewCards />
                    </div>
                </StickyCard>

                {/* Section 8: Security / Zero Trust - MOVED TO END */}
                <StickyCard index={5}>
                    <div className="w-full px-4 md:px-12 lg:px-24 py-16">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                            {/* Left: Text */}
                            <div className="flex-[1.2] space-y-12 z-10 w-full mb-10 md:mb-0">
                                <span className="px-4 py-1.5 text-sm bg-white/10 text-white border-0 rounded-full font-['Manrope',sans-serif] w-max font-bold tracking-wide uppercase">
                                    Security Core
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-['Syne',sans-serif] leading-[1.1] tracking-tight">
                                    Zero Trust Validation
                                </h2>
                                <p className="text-gray-300 font-['Manrope',sans-serif] text-base md:text-lg leading-relaxed max-w-lg mt-6">
                                    Our core architecture assumes no entity is trustworthy by default. Wising integrates SASE to enforce least-privilege access, continuous microsegmentation, and strict verification—minimizing the attack surface and proactively preventing lateral movement across your resources.
                                </p>
                            </div>
                            <div className="flex-1 w-full max-w-xl md:max-w-2xl bg-transparent rounded-[2rem] border border-white/10 p-6 md:p-12 shadow-[0_0_80px_rgba(20,184,166,0.05)] flex items-center justify-center">
                                <CpuArchitecture text="Zero Trust Security" className="w-full h-auto drop-shadow-2xl opacity-90" />
                            </div>
                        </div>
                    </div>
                </StickyCard>

                {/* Final Section: High-Fidelity Footer — Restored to end */}
                <div className="relative z-30 w-full min-h-screen bg-black flex flex-col items-center justify-end rounded-t-[3rem] mt-[-2rem] border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <FlickeringFooter />
                </div>
            </div>
        </ReactLenis>
    );
}

export default BetaLanding;
