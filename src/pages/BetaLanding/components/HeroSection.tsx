import { useState } from 'react';
import { motion } from "motion/react";
import { SuccessModal } from '../../../components/ui/SuccessModal';
import { AnimatedBackground } from './AnimatedBackground';
import { imgImage } from '../imports/svg-rvsnx';
import imgImage1 from "../assets/adfcaf135cf274bec4ed10a218ab0f6e8d577b58.png";

// PLACEHOLDER: Replace this with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4jarZsUnoMMlGuEX8qvdXj7IAwxrNo5-SpROrQIGL01V3vBYYaxg44XMFneXSZ5Macg/exec';

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
            const now = new Date();
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    email,
                    timestamp: now.toLocaleTimeString(),
                    date: now.toLocaleDateString()
                })
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
            <div className="relative z-10 max-w-[1400px] w-full mx-auto transform translate-y-[-5vh]">
                <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20">
                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center w-full"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-clip-text font-['Syne',sans-serif] font-bold leading-[1.1] text-center tracking-[clamp(3px,0.8vw,6px)] uppercase whitespace-pre-wrap text-[clamp(1.6rem,6.1vw,61px)] px-4 m-0"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmer-move 8s linear infinite"
                            }}
                        >
                            Pioneering AI
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-clip-text font-['Syne',sans-serif] font-bold leading-[1.1] text-center tracking-[clamp(3px,0.8vw,6px)] uppercase whitespace-pre-wrap text-[clamp(1.6rem,6.1vw,61px)] px-4 m-0"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmer-move 8s linear infinite"
                            }}
                        >
                            Wealth Intelligence
                        </motion.h1>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center w-full"
                    >
                        <div
                            className="bg-clip-text flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[1.4] text-center tracking-[clamp(2px,0.5vw,4px)] uppercase text-[clamp(10px,1.5vw,13px)] px-4"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            <p className="whitespace-pre-wrap">Complete Control. One Intelligence.</p>
                        </div>
                    </motion.div>

                    {/* New Mission Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col items-center w-full max-w-[900px] mt-2 px-6"
                    >
                        <p className="font-['Manrope',sans-serif] font-normal text-[clamp(13.3px,1.4vw,17.1px)] text-[#999] text-center tracking-[0.5px] leading-[1.6]">
                            Elite financial oversight is no longer a luxury. Gain the AI-powered intelligence
                            of the top 1%—monitoring your wealth 24/7, spotting hidden opportunities,
                            and ensuring your money never rests. Connect your assets.
                            Start Wising up.
                        </p>
                    </motion.div>

                    {/* Email & Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col items-center w-full max-w-[448px] px-4"
                    >
                        <form onSubmit={handleSubmit} className="w-full relative group">
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
                            <div className="backdrop-blur-[2px] bg-[rgba(10,10,10,0.8)] relative rounded-tl-[16px] rounded-tr-[16px] w-full border border-b-0 border-[#1f1f1f]/0">
                                <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                                    <div className="relative w-full">
                                        <div className="bg-clip-padding content-stretch flex items-start justify-center overflow-clip px-6 md:px-8 py-5 md:py-6 relative rounded-[inherit] w-full">
                                            <div className="flex-1 min-w-0">
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    disabled={loading}
                                                    className="w-full bg-transparent border-none text-[#C0C0C0] text-sm tracking-[1.1px] font-['Inter:Regular',sans-serif] placeholder:text-[#C0C0C0]/50 focus:ring-0 focus:outline-none disabled:opacity-50 shimmer-text"
                                                    placeholder="Enter your Email ID here."
                                                    style={{
                                                        textShadow: "0 0 10px rgba(192, 192, 192, 0.3)"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="content-stretch flex gap-5 items-center justify-center overflow-clip py-5 relative rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_30px_-10px_rgba(255,255,255,0.05)] w-full cursor-pointer hover:shadow-[0px_10px_40px_-5px_rgba(255,255,255,0.1)] transition-shadow disabled:opacity-70 disabled:cursor-not-allowed z-10"
                                style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(209, 213, 219) 50%, rgb(156, 163, 175) 100%)" }}
                            >
                                <div className="absolute inset-0 opacity-30 rounded-bl-[16px] rounded-br-[16px]" />
                                <div className="relative flex flex-col font-['Montserrat',sans-serif] font-medium justify-center leading-[0] text-sm text-black text-center tracking-[5px] uppercase">
                                    <p className="leading-[15px] whitespace-pre-wrap">{loading ? 'Joining...' : 'Join the Waitlist'}</p>
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

                        {/* No Commitments Text */}
                        <div className="mt-4 flex items-center gap-2">
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
