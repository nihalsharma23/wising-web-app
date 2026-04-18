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
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ArrowRight } from 'lucide-react';

const BetaLanding = () => {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <div className="relative min-h-screen bg-black text-white selection:bg-teal-500/30 overflow-x-hidden">
                <Header variant="beta" />

                {/* --- CONTENT FLOW (Unified, Jet Black, No Containers, No Sections) --- */}
                <div className="relative w-full bg-black">
                    
                    {/* Hero Section */}
                    <main className="relative w-full h-screen flex flex-col items-center justify-center pt-20 px-4 md:px-0">
                        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 w-full flex flex-col items-center gap-12">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col items-center text-center max-w-5xl"
                            >
                                <HeroText 
                                    text="Wising Infrastructure"
                                    className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight mb-2"
                                />
                                <AnimatedText 
                                    text="Global wealth intelligence for cross-border ecosystems."
                                    className="text-lg md:text-2xl text-gray-400 font-['Manrope',sans-serif] mt-8"
                                />
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="w-full flex justify-center -mt-16 -mb-32 relative group"
                            >
                                <div className="absolute inset-0 bg-teal-500/5 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
                                <EarthGlobe 
                                    width={700}
                                    height={700}
                                    className="relative z-10"
                                />
                            </motion.div>

                            <div className="flex flex-col items-center gap-6 z-20 mt-12">
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="bg-black text-white flex items-center space-x-3 px-8 py-4 text-lg font-bold font-['Manrope',sans-serif] group overflow-hidden"
                                >
                                    <span className="relative z-10">Deploy Wising Infrastructure</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </HoverBorderGradient>

                                <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C0C0C0]/10 border border-[#C0C0C0]/20">
                                        <svg
                                            width="10"
                                            height="10"
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
                        </div>
                    </main>

                    {/* Passive Monitoring / Active Intelligence */}
                    <div className="w-full flex items-center justify-start px-4 md:px-12 lg:px-24 min-h-screen bg-black">
                        <div className="max-w-2xl w-full text-left">
                            <MagicText
                                text="Wising Enforces real-time US (IRS), Indian Tax Law and FEMA Compliance on every agentic action. You get instant feedback. Your CAs, CPAs and Wealth Manager receive a Professional Brief about the action. Issues get fixed at the source. Everyone Moves Faster."
                            />
                        </div>
                    </div>

                    {/* Pulsating Beam (Continuous flow) */}
                    <div className="w-full bg-black">
                        <PulsatingBeamSection />
                    </div>

                    {/* Feature Section (Problem) */}
                    <div className="w-full bg-black py-20">
                        <FeatureSection />
                    </div>

                    {/* Infrastructure Value */}
                    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24 bg-black">
                        <div className="max-w-5xl w-full">
                            <MagicText
                                text="Every Brokerage handles the same trades. [fidelity] [zerodha] [groww] [robinhood] [binance] The Difference is Infrastructure. Too many tools leave blind spots that trigger massive fines. Too many manual spreadsheets waste your time. Wising builds the right infrastructure - So every action is fast, legally sound and 100% compliant."
                            />
                        </div>
                    </div>

                    {/* Stack Interface */}
                    <div className="w-full bg-black py-20">
                        <StackFeatureSection />
                    </div>

                    {/* The Solution (Animated Graph) */}
                    <div className="w-full bg-black py-20">
                        <SolutionSection />
                    </div>

                    {/* Showcase Cards */}
                    <div className="w-full bg-black py-20">
                        <SkewCards />
                    </div>

                    {/* Zero Trust Validation */}
                    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-12 lg:px-24 bg-black">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                            <div className="flex-[1.2] space-y-12 z-10 w-full mb-10 md:mb-0">
                                <span className="px-4 py-1.5 text-sm bg-white/5 text-white border border-white/10 rounded-full font-['Manrope',sans-serif] w-max font-bold tracking-wide uppercase">
                                    Security Core
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-['Syne',sans-serif] leading-[1.1] tracking-tight">
                                    Zero Trust Validation
                                </h2>
                                <p className="text-gray-300 font-['Manrope',sans-serif] text-base md:text-lg leading-relaxed max-w-lg mt-6">
                                    Our core architecture assumes no entity is trustworthy by default. Wising integrates SASE to enforce least-privilege access, continuous microsegmentation, and strict verification—minimizing the attack surface and proactively preventing lateral movement across your resources.
                                </p>
                            </div>
                            <div className="flex-1 w-full max-w-xl md:max-w-2xl bg-black flex items-center justify-center">
                                <CpuArchitecture text="Zero Trust Security" className="w-full h-auto drop-shadow-2xl opacity-90" />
                            </div>
                        </div>
                    </div>

                    {/* Footer Container (Special Exception) */}
                    <div className="relative z-30 w-full min-h-screen bg-black flex flex-col items-center justify-end rounded-t-[3rem] mt-32 border-t border-white/10 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                        <FlickeringFooter />
                    </div>
                </div>
            </div>
        </ReactLenis>
    );
}

export default BetaLanding;
