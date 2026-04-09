import { useNavigate, Link } from "react-router-dom";
import { motion, useTransform, useScroll } from "motion/react";
import imgHeaderLogo from "../../assets/header_logo.png";

interface HeaderProps {
    variant?: 'landing' | 'about';
}

export function Header({ variant = 'landing' }: HeaderProps) {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const isLanding = variant === 'landing';

    // "Join Waitlist" button in header fades in after scrolling 200–400px
    const buttonOpacity = useTransform(scrollY, [200, 400], [0, 1]);
    const buttonScale   = useTransform(scrollY, [200, 400], [0.8, 1]);

    return (
        <>
            {/* Logo — slides in on mount */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="fixed z-[1000] top-[14px] left-6 md:left-10 flex items-center cursor-pointer pointer-events-auto select-none"
                onClick={() => navigate('/')}
            >
                <div className="flex items-center" style={{ gap: '0.1rem' }}>
                    <img
                        src={imgHeaderLogo}
                        alt="Wising Logo"
                        className="h-[26px] md:h-[36px] w-auto object-contain brightness-[1.15]"
                    />
                    <div
                        className="flex flex-col justify-center leading-[0] not-italic text-[14px] md:text-[18px] tracking-[6px] md:tracking-[12px] uppercase pl-2 chrome-silver-metallic h-[26px] md:h-[36px]"
                        style={{ paddingTop: '0.1rem' }}
                    >
                        <p className="leading-[20px] whitespace-pre-wrap font-['Cormorant_Garamond',serif] font-medium flex items-center pt-1">WISING</p>
                    </div>
                </div>
            </motion.div>

            {/* Header bar — always solid black, never reactive */}
            <header
                style={{ backgroundColor: '#050505', backdropFilter: 'blur(24px)' }}
                className="fixed top-0 left-0 right-0 z-[999] border-b border-white/[0.04]"
            >
                <div className="w-full h-16 flex items-center px-6 md:px-10 gap-4">
                    <div className="flex-1" />
                    <div className="flex items-center gap-6 shrink-0">
                        {isLanding ? (
                            <>
                                <motion.button
                                    style={{ opacity: buttonOpacity, scale: buttonScale }}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="hidden md:flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-white text-black text-[10px] font-['Montserrat',sans-serif] font-medium tracking-[2px] uppercase hover:bg-white/90 transition-colors"
                                >
                                    Join Waitlist
                                </motion.button>
                                <button className="flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                                    <div className="flex flex-col font-['Manrope',sans-serif] font-medium justify-center leading-[0] not-italic text-white text-sm tracking-normal capitalize whitespace-nowrap">
                                        <p className="leading-[15px] whitespace-pre-wrap">Search</p>
                                    </div>
                                </button>
                                <Link to="/about" className="flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                                    <div className="flex flex-col font-['Manrope',sans-serif] font-medium justify-center leading-[0] not-italic text-white text-sm tracking-normal capitalize whitespace-nowrap">
                                        <p className="leading-[15px] whitespace-pre-wrap">About Us</p>
                                    </div>
                                </Link>
                                <button className="flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-transparent text-[#14b8a6] text-[12px] font-['Manrope',sans-serif] font-medium tracking-[1px] hover:bg-white/5 transition-colors">
                                    Login/Signup
                                </button>
                            </>
                        ) : (
                            <Link to="/" className="flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] not-italic text-[#999] text-xs tracking-[4px] uppercase">
                                    <p className="leading-[15px] whitespace-pre-wrap">← Back</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
