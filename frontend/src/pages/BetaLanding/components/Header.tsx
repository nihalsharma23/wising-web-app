import { useState } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import imgHeaderLogo from "../assets/header_logo.png";

interface HeaderProps {
    variant?: 'landing' | 'about';
}

export function Header({ variant = 'landing' }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="absolute content-stretch flex items-center justify-between left-0 px-6 md:px-10 py-6 right-0 top-0 z-50">
                {/* Logo + WISING */}
                <div className="content-stretch flex flex-col items-start relative z-50">
                    <Link to="/" className="content-stretch flex gap-4 md:gap-6 items-center relative cursor-pointer hover:opacity-80 transition-opacity">
                        {/* Logo */}
                        <img
                            src={imgHeaderLogo}
                            alt="Wising Logo"
                            className="h-16 md:h-20 w-auto object-contain"
                        />

                        {/* WISING Text */}
                        <div className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[#999] text-[24px] tracking-[16px] uppercase pl-1">
                            <p className="leading-[32px] whitespace-pre-wrap font-[Aboreto] flex items-center pt-2">WISING</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation Link (Top Right) */}
                <div className="content-stretch flex h-10 items-center px-4 relative z-50">
                    {variant === 'landing' ? (
                        <>
                            {/* Desktop "About Us" Link */}
                            <Link to="/about" className="hidden md:flex content-stretch flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] not-italic text-[#999] text-xs tracking-[4px] uppercase">
                                    <p className="leading-[15px] whitespace-pre-wrap">About Us</p>
                                </div>
                            </Link>

                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={toggleMenu}
                                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-2 relative cursor-pointer z-50"
                                aria-label="Toggle Menu"
                            >
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-[2px] bg-[#999] block"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-[2px] bg-[#999] block"
                                />
                            </button>
                        </>
                    ) : (
                        <Link to="/" className="content-stretch flex flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] not-italic text-[#999] text-xs tracking-[4px] uppercase">
                                <p className="leading-[15px] whitespace-pre-wrap">← Back</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/98 z-40 flex items-center justify-center md:hidden"
                    >
                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] not-italic text-[#999] text-2xl tracking-[8px] uppercase hover:text-white transition-colors"
                        >
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.4 }}
                            >
                                About Us
                            </motion.p>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
