import { useNavigate, Link } from "react-router-dom";
import { motion, useTransform, useScroll, AnimatePresence, useMotionValueEvent } from "motion/react";
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // "Join Waitlist" button in header fades in after scrolling 200–400px
    const buttonOpacity = useTransform(scrollY, [200, 400], [0, 1]);
    const buttonScale   = useTransform(scrollY, [200, 400], [0.8, 1]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-[999] flex justify-center pointer-events-none">
            <motion.div
                initial={false}
                animate={{
                    width: isScrolled ? "92%" : "100%",
                    y: isScrolled ? 16 : 0, 
                    borderRadius: isScrolled ? "100px" : "0px",
                    backgroundColor: isScrolled ? "rgba(3, 7, 18, 0.6)" : "rgba(3, 7, 18, 0.2)",
                    borderWidth: isScrolled ? "1px" : "0px",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: isScrolled ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ backdropFilter: 'blur(16px)' }}
                className="pointer-events-auto h-16 max-w-7xl flex items-center px-6 md:px-10 gap-4"
            >
                {/* Logo Section */}
                <div 
                    className="flex items-center cursor-pointer select-none shrink-0"
                    onClick={() => navigate('/')}
                >
                    <img
                        src={imgHeaderLogo}
                        alt="Wising Logo"
                        className="h-[29px] md:h-[37px] w-auto object-contain brightness-[1.15]"
                    />
                    <div className="flex flex-col justify-center leading-[0] not-italic text-[15px] md:text-[18px] tracking-[4px] md:tracking-[8px] uppercase pl-2 text-white h-[29px] md:h-[37px]">
                        <p className="leading-[20px] whitespace-pre-wrap font-['Cormorant_Garamond',serif] font-bold flex items-center pt-1">WISING</p>
                    </div>
                </div>

                <div className="flex-1" />

                {/* Navigation Links */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0 h-full">
                    {isLanding ? (
                        <>
                            <div className="flex items-center h-full gap-3 md:gap-6">
                                <motion.button
                                    style={{ opacity: buttonOpacity, scale: buttonScale }}
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="hidden md:flex items-center justify-center px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-[10px] font-['Manrope',sans-serif] font-bold tracking-[0.5px] uppercase hover:bg-white/20 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                >
                                    Join Waitlist
                                </motion.button>

                                <Link to="/blog" className={`content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity ${isScrolled ? 'hidden md:flex' : 'flex'}`}>
                                    <div className="flex flex-col font-['Manrope',sans-serif] font-medium justify-center leading-[0] not-italic text-white text-sm tracking-normal capitalize whitespace-nowrap">
                                        <p className="leading-[15px] whitespace-pre-wrap">Blog</p>
                                    </div>
                                </Link>

                                <Link to="/about" className={`content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity ${isScrolled ? 'hidden md:flex' : 'flex'}`}>
                                    <div className="flex flex-col font-['Manrope',sans-serif] font-medium justify-center leading-[0] not-italic text-white text-sm tracking-normal capitalize whitespace-nowrap">
                                        <p className="leading-[15px] whitespace-pre-wrap">About Us</p>
                                    </div>
                                </Link>

                                <div className="flex items-center gap-2">
                                    <AnimatePresence>
                                        {isSearchOpen && (
                                            <motion.div
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: 140, opacity: 1 }}
                                                exit={{ width: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <input
                                                    ref={searchInputRef}
                                                    type="text"
                                                    placeholder="SEARCH"
                                                    className="bg-transparent border-0 border-b border-white/30 text-white font-['Manrope',sans-serif] text-[10px] uppercase tracking-[0.2em] focus:ring-0 w-full pb-1 outline-none focus:border-white transition-colors"
                                                    onBlur={() => setIsSearchOpen(false)}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <button 
                                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                                        className="text-white/70 hover:text-[#14b8a6] transition-colors p-2"
                                    >
                                        {isSearchOpen ? <X size={16} /> : <Search size={16} />}
                                    </button>
                                </div>

                                {/* Mobile Hamburger Button (Only shows when scrolled) */}
                                {isScrolled && (
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-[1001] relative ml-1"
                                    >
                                        <motion.div
                                            animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                                            className="w-5 h-[1.5px] bg-white absolute rounded-full"
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.div
                                            animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
                                            className="w-5 h-[1.5px] bg-white absolute rounded-full"
                                            transition={{ duration: 0.3 }}
                                        />
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/" className="flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="flex flex-col font-['Manrope',sans-serif] font-bold justify-center leading-[0] not-italic text-white/60 text-[10px] tracking-[4px] uppercase">
                                <p className="leading-[15px] whitespace-pre-wrap">← Back</p>
                            </div>
                        </Link>
                    )}
                </div>
            </motion.div>

            {/* Mobile Glassmorphic Slider Menu */}
            <AnimatePresence>
                {isMenuOpen && isScrolled && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-[280px] bg-black/80 backdrop-blur-2xl border-l border-white/10 z-[1000] flex flex-col pt-24 px-8 md:hidden pointer-events-auto shadow-2xl"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col gap-8 mt-4">
                                <Link 
                                    to="/blog" 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className="text-white text-xl font-['Manrope',sans-serif] font-medium tracking-wide hover:text-emerald-400 transition-colors"
                                >
                                    Blog
                                </Link>
                                <Link 
                                    to="/about" 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className="text-white text-xl font-['Manrope',sans-serif] font-medium tracking-wide hover:text-emerald-400 transition-colors"
                                >
                                    About Us
                                </Link>
                                <div className="w-full h-[1px] bg-white/10 mt-4" />
                            </div>

                            <div className="mt-auto pb-12">
                                <div className="text-white/40 text-[10px] uppercase tracking-[2px] font-['Manrope',sans-serif] leading-relaxed">
                                    © WISING INTELLIGENCE PVT. LTD - 2026
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
