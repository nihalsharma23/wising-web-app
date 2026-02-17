import { useState } from 'react';
import { motion } from "motion/react";
import { SuccessModal } from '../../../components/ui/SuccessModal';
import { AnimatedBackground } from './AnimatedBackground';
import { imgImage } from '../imports/svg-rvsnx';
import imgImage1 from "../assets/adfcaf135cf274bec4ed10a218ab0f6e8d577b58.png";

// PLACEHOLDER: Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMH1IUxwV3zoSKALvb_Fqq5Q4Ojlf-auTABTkOoZxPGosanRx3UNT4pPJOjJZfODS2PQ/exec';

export function HeroSection() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setLoading(true);

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams({ email })
            });

            setShowModal(true);
            setEmail('');

        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
            {/* Success Modal Integration */}
            <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />

            {/* Background Image Mask */}
            {/* Background Image Mask Removed */}

            {/* Animated Background */}
            <AnimatedBackground />

            {/* Hero Content - Centered */}
            <div className="relative z-10 max-w-[1400px] w-full mx-auto">
                <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 py-12 md:py-16 lg:py-20">
                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center w-full"
                    >
                        <div
                            className="bg-clip-text flex flex-col font-['Syne',sans-serif] font-normal justify-center leading-[1.6] text-center tracking-[15.4px] uppercase whitespace-pre-wrap text-3xl sm:text-4xl md:text-5xl lg:text-[44px] px-4"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmer-move 8s linear infinite"
                            }}
                        >
                            <p className="mb-0">Pioneering AI Wealth</p>
                            <p>Intelligence</p>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center w-full"
                    >
                        <div
                            className="bg-clip-text flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] text-center tracking-[7.8px] uppercase text-xs sm:text-[13px] px-4"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            <p className="leading-[19.5px] whitespace-pre-wrap">Complete Wealth. One Intelligence.</p>
                        </div>
                    </motion.div>

                    {/* Email & Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center w-full max-w-[448px] px-4"
                    >
                        <form onSubmit={handleSubmit} className="w-full">
                            {/* Input */}
                            <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.02)] relative rounded-tl-[16px] rounded-tr-[16px] w-full">
                                <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-full">
                                    <div className="relative w-full">
                                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center overflow-clip px-6 md:px-8 py-5 md:py-6 relative rounded-[inherit] w-full">
                                            <div className="flex-1 min-w-0">
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={loading}
                                                    className="w-full bg-transparent border-none text-white text-[11px] tracking-[1.1px] font-['Inter:Regular',sans-serif] placeholder:text-[rgba(153,153,153,0.4)] focus:ring-0 focus:outline-none disabled:opacity-50"
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="content-stretch flex gap-5 items-center justify-center overflow-clip py-5 relative rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_30px_-10px_rgba(255,255,255,0.05)] w-full cursor-pointer hover:shadow-[0px_10px_40px_-5px_rgba(255,255,255,0.1)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(209, 213, 219) 50%, rgb(156, 163, 175) 100%)" }}
                            >
                                <div className="absolute inset-0 opacity-30 rounded-bl-[16px] rounded-br-[16px]" />
                                <div className="relative flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-[10px] text-black text-center tracking-[5px] uppercase">
                                    <p className="leading-[15px] whitespace-pre-wrap">{loading ? 'Joining...' : 'Join the Beta'}</p>
                                </div>
                                {!loading && (
                                    <div className="relative flex flex-col justify-center leading-[0] not-italic text-[12px] text-black text-center">
                                        <span className="material-symbols-outlined text-[12px] font-thin">arrow_forward_ios</span>
                                    </div>
                                )}
                            </button>

                            {error && (
                                <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2">
                                    <span className="text-red-400 text-[10px] tracking-wider uppercase font-medium bg-red-900/20 px-3 py-1 rounded-full border border-red-900/50">
                                        {error}
                                    </span>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
