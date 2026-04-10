import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { GlobePulse } from '../../components/ui/cobe-globe-pulse';
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

export function BetaLanding() {
    const [showEmailInput, setShowEmailInput] = useState(false);

    return (
        <ReactLenis root>
        <div className="bg-black font-['Syne',sans-serif]">
            <Header />
            <main className="min-h-screen w-full flex flex-col items-center justify-center pt-24 px-4 overflow-hidden relative">
                
                {/* Background Globe that scales behind the text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 mix-blend-screen">
                    <div className="w-[800px] h-[800px] max-w-[100vw] max-h-[100vw]">
                        <GlobePulse speed={0.005} />
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <AnimatedText 
                        text="CROSS-BORDER WEALTH" 
                        className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-2"
                        animationType="letters"
                        staggerDelay={0.06}
                        duration={0.8}
                    />
                    
                    <div className="h-[20vw] md:h-[150px] w-full max-w-4xl pt-4">
                        <HeroText text="Compliance" className="h-full" />
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

            {/* Scroll-Revealed Text Section */}
            <div className="bg-white text-black relative flex flex-col items-center justify-center pb-[8rem] pt-[12rem] px-4 md:px-12 lg:px-24 z-20">
                <div className="max-w-5xl w-full">
                    <MagicText
                        text="Wising Enforces real-time US (IRS), Indian Tax Law and FEMA Compliance on every agentic action. You get instant feedback. Your CAs, CPAs and Wealth Manager receive a Professional Brief about the action. Issues get fixed at the source. Everyone Moves Faster."
                    />
                </div>
            </div>

            {/* Section 3: The Problem */}
            <FeatureSection />

            {/* Section 4: Magic Text Reveal 2 */}
            <div className="bg-white text-black relative flex flex-col items-center justify-center pb-[8rem] pt-[12rem] px-4 md:px-12 lg:px-24 z-20 overflow-hidden">
                <div className="max-w-5xl w-full">
                    <MagicText
                        text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                    />
                </div>
            </div>

            {/* Section 5: Stack Interface */}
            <div className="bg-black relative py-12 z-20 overflow-hidden">
                <StackFeatureSection />
            </div>

            {/* Section 6: Security / Zero Trust */}
            <div className="bg-[#050505] text-white relative py-10 px-4 md:px-12 lg:px-24 z-20 overflow-hidden border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    {/* Left: Text */}
                    <div className="flex-[1.2] space-y-12 z-10 w-full mb-10 md:mb-0">
                        <span className="px-4 py-1.5 text-sm bg-white/10 text-white border-0 rounded-full font-['Manrope',sans-serif] w-max font-bold tracking-wide uppercase">
                            Security Core
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-['Syne',sans-serif] leading-[1.1] tracking-tight">
                            Zero Trust Validation
                        </h2>
                        <p className="text-gray-400 font-['Manrope',sans-serif] text-base md:text-lg leading-relaxed max-w-lg mt-6">
                            Our core architecture assumes no entity is trustworthy by default. Wising integrates SASE to enforce least-privilege access, continuous microsegmentation, and strict verification—minimizing the attack surface and proactively preventing lateral movement across your resources.
                        </p>
                    </div>
                    {/* Right: SVG CPU Animation */}
                    <div className="flex-1 w-full max-w-xl md:max-w-2xl bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-6 md:p-12 shadow-[0_0_80px_rgba(20,184,166,0.05)] flex items-center justify-center">
                        <CpuArchitecture text="Zero Trust Security" className="w-full h-auto drop-shadow-2xl opacity-90" />
                    </div>
                </div>
            </div>

            {/* Section 7: Gradient Showcase Cards */}
            <div className="relative z-20 border-t border-white/5 overflow-hidden">
                <SkewCards />
            </div>

            {/* Section 8: CA/CPA Advisor Sync (White Background) */}
            <CACPASection />

            {/* Section 9: Zero Touch Tracking Engine */}
            <ZeroTouchTrackingSection />

            {/* Final Section: High-Fidelity Footer */}
            <FlickeringFooter />
        </div>
        </ReactLenis>
    )
}

export default BetaLanding;
