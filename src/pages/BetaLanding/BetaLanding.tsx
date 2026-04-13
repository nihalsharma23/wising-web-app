import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import EarthGlobe from '../../components/ui/earth-globe';
import AnimatedText from '../../components/ui/animated-text';
import HeroText from '../../components/ui/hero-shutter-text';
import HoverBorderGradient from '../../components/ui/hover-border-gradient';
import { MagicText } from '../../components/ui/magic-text';
import FeatureSection from '../../components/ui/feature-section';
import StackFeatureSection from '../../components/ui/stack-feature-section';
import { CpuArchitecture } from '../../components/ui/cpu-architecture';
import SkewCards from '../../components/ui/gradient-card-showcase';
import CACPASection from '../../components/ui/CACPA';
import { ZeroTouchTrackingSection } from '../../components/ui/ZeroTouch';
import { FlickeringFooter } from '../../components/ui/flickering-footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ArrowRight } from 'lucide-react';
import { StickyCard } from '../../components/layout/StickyCard';

export function BetaLanding() {
    const [showEmailInput, setShowEmailInput] = useState(false);

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 2, smoothWheel: true, wheelMultiplier: 0.6 }}>
            <div className="bg-[#050505] font-['Syne',sans-serif] min-h-screen text-white relative">
                {/* Anchor Wrapper for EarthGlobe (Hero + Section 2) */}
                <div className="relative w-full z-0 bg-black">
                    {/* Background Sticky Layer */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <EarthGlobe />
                    </div>
                    
                    {/* Foreground Content */}
                    <div className="relative w-full z-10 flex flex-col">
                        <Header />
                        
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
                                        delay={0.5}
                                    />
                                </div>

                                <div className="mt-16 pt-8 pb-8 flex items-center justify-center min-h-[100px]">
                                    <AnimatePresence mode="wait">
                                        {!showEmailInput ? (
                                            <motion.div
                                                key="button"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <HoverBorderGradient
                                                    onClick={() => setShowEmailInput(true)}
                                                    className="bg-black text-white px-8 py-3 flex items-center space-x-2"
                                                >
                                                    <span className="font-['Manrope',sans-serif] tracking-wider uppercase text-sm">Join the waitlist</span>
                                                </HoverBorderGradient>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="input"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-center gap-2 w-full max-w-md mx-auto"
                                                onSubmit={(e) => { e.preventDefault(); alert("Thanks for joining!"); setShowEmailInput(false); }}
                                            >
                                                <input 
                                                    type="email" 
                                                    required
                                                    placeholder="Enter your email..." 
                                                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 font-['Manrope',sans-serif]"
                                                    autoFocus
                                                />
                                                <button 
                                                    type="submit"
                                                    className="bg-teal-500 hover:bg-teal-400 text-black rounded-full w-[46px] h-[46px] flex items-center justify-center font-semibold transition-colors flex-shrink-0"
                                                >
                                                    <ArrowRight size={20} />
                                                </button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
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

                {/* Section 3: The Problem / Feature Section */}
                <StickyCard index={0}>
                    <div className="w-full py-10 scale-95 transform-gpu origin-center">
                        <FeatureSection />
                    </div>
                </StickyCard>

                {/* Section 4: Magic Text Reveal 2 (Previously white bg) */}
                <StickyCard index={1}>
                    <div className="w-full flex justify-center px-4 md:px-12 lg:px-24">
                        <div className="max-w-5xl w-full py-12">
                            <MagicText
                                text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                            />
                        </div>
                    </div>
                </StickyCard>

                {/* Section 5: Stack Interface */}
                <StickyCard index={2}>
                    <div className="w-full py-12">
                        <StackFeatureSection />
                    </div>
                </StickyCard>

                {/* Section 6: Security / Zero Trust */}
                <StickyCard index={3}>
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

                {/* Section 7: Gradient Showcase Cards */}
                <StickyCard index={4}>
                    <div className="w-full h-full flex flex-col items-center justify-center py-10 scale-[0.85] origin-center">
                        <SkewCards />
                    </div>
                </StickyCard>

                {/* Section 9: Zero Touch Tracking Engine (Standalone Scroll Theater) */}
                <div className="w-full relative z-20">
                    <ZeroTouchTrackingSection />
                </div>

                {/* Final Section: High-Fidelity Footer */}
                <div className="relative z-30 w-full min-h-screen bg-black flex flex-col items-center justify-end rounded-t-[3rem] mt-[-2rem] border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <FlickeringFooter />
                </div>
            </div>
        </ReactLenis>
    );
}

export default BetaLanding;
