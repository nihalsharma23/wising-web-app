import { useNavigate, Link } from "react-router-dom";
import { motion, useTransform, useScroll, AnimatePresence } from "motion/react";
import imgHeaderLogo from "../../assets/header_logo.png";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface HeaderProps {
    variant?: 'landing' | 'about';
}

export function Header({ variant = 'landing' }: HeaderProps) {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const isLanding = variant === 'landing';
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // "Join Waitlist" button in header fades in after scrolling 200–400px
    const buttonOpacity = useTransform(scrollY, [200, 400], [0, 1]);
    const buttonScale   = useTransform(scrollY, [200, 400], [0.8, 1]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

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
                        className="flex flex-col justify-center leading-[0] not-italic text-[15px] md:text-[19px] tracking-[6px] md:tracking-[12px] uppercase pl-2 chrome-silver-metallic h-[26px] md:h-[36px]"
                        style={{ paddingTop: '0.1rem' }}
                    >
                        <p className="leading-[20px] whitespace-pre-wrap font-['Cormorant_Garamond',serif] font-bold flex items-center pt-1">WISING</p>
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
                    <div className="flex items-center gap-6 shrink-0 h-full">
                        {isLanding ? (
                            <>
                                <div className="flex items-center h-full gap-6">
                                    <motion.button
                                        style={{ opacity: buttonOpacity, scale: buttonScale }}
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        className="hidden md:flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-white text-black text-[10px] font-['Montserrat',sans-serif] font-medium tracking-[2px] uppercase hover:bg-white/90 transition-colors"
                                    >
                                        Join Waitlist
                                    </motion.button>

                                    <Link to="/about" className="flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                                        <div className="flex flex-col font-['Manrope',sans-serif] font-medium justify-center leading-[0] not-italic text-white text-sm tracking-normal capitalize whitespace-nowrap">
                                            <p className="leading-[15px] whitespace-pre-wrap">About Us</p>
                                        </div>
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        <AnimatePresence>
                                            {isSearchOpen && (
                                                <motion.div
                                                    initial={{ width: 0, opacity: 0 }}
                                                    animate={{ width: 180, opacity: 1 }}
                                                    exit={{ width: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <input
                                                        ref={searchInputRef}
                                                        type="text"
                                                        placeholder="SEARCH"
                                                        className="bg-transparent border-0 border-b border-white text-white font-['Manrope',sans-serif] text-xs uppercase tracking-[0.2em] focus:ring-0 w-full pb-1 outline-none"
                                                        onBlur={() => setIsSearchOpen(false)}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <button 
                                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                                            className="text-white hover:text-[#14b8a6] transition-colors p-2"
                                        >
                                            {isSearchOpen ? <X size={18} /> : <Search size={18} />}
                                        </button>
                                    </div>
                                </div>
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
