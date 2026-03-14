import { motion } from "motion/react";
import { BlinkingDot } from "./BlinkingDot";

export function FeatureCard({ letter, title, description, hasTopDot = true, hasBottomDot = false }: {
    letter: string;
    title: string;
    description: string;
    hasTopDot?: boolean;
    hasBottomDot?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="content-stretch flex flex-col items-center relative w-full"
        >
            {/* Blinking Dot(s) */}
            <div className="relative">
                {hasTopDot && <BlinkingDot />}
                {hasBottomDot && (
                    <motion.div
                        className="absolute bg-[#a5f3fc] rounded-full size-[4px] bottom-[2px] left-1/2 -translate-x-1/2"
                        animate={{
                            opacity: [1, 0.3, 1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-1/2 -translate-x-1/2 rounded-full shadow-[0px_0px_12px_2px_rgba(165,243,252,0.4)] size-[4px]" />
                    </motion.div>
                )}
            </div>

            {/* Letter */}
            <div className="content-stretch flex flex-col items-start pb-6 md:pb-10 lg:pb-14 relative">
                <div className="content-stretch flex flex-col items-center relative">
                    <div
                        className="bg-clip-text bg-gradient-to-b flex flex-col font-['Cormorant_Garamond',serif] from-[30%] from-white justify-center leading-[0] not-italic text-center to-[rgba(255,255,255,0.1)] tracking-[-3.2px] text-[clamp(80px,15vw,160px)]"
                        style={{ WebkitTextFillColor: "transparent" }}
                    >
                        <p className="leading-[1] whitespace-pre-wrap">{letter}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="content-stretch flex flex-col gap-6 md:gap-8 lg:gap-10 items-start max-w-[800px] relative px-4">
                <div className="content-stretch flex flex-col items-center relative w-full">
                    <div
                        className="flex flex-col font-['Syne',sans-serif] font-bold justify-center leading-[1.2] text-[clamp(1.5rem,3vw,2rem)] text-zinc-100 text-center tracking-[clamp(5px,1vw,11.2px)] uppercase"
                    >
                        <p className="whitespace-pre-wrap">{title}</p>
                    </div>
                </div>
                <div className="content-stretch flex flex-col items-center relative w-full">
                    <div className="flex flex-col font-['Inter',sans-serif] font-light justify-center leading-[1.6] not-italic text-zinc-400 text-[clamp(16px,2vw,22px)] text-center tracking-[0.5px] whitespace-pre-wrap capitalize">
                        {description}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
