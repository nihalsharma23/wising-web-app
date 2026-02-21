import { motion } from "framer-motion";
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
            <div className="content-stretch flex flex-col items-start pb-10 md:pb-14 relative">
                <div className="content-stretch flex flex-col items-center relative">
                    <div
                        className="bg-clip-text bg-gradient-to-b flex flex-col font-['Cormorant_Garamond',serif] from-[30%] from-white justify-center leading-[0] not-italic text-center to-[rgba(255,255,255,0.1)] tracking-[-3.2px] text-7xl md:text-9xl lg:text-[160px]"
                        style={{ WebkitTextFillColor: "transparent" }}
                    >
                        <p className="leading-[128px] whitespace-pre-wrap">{letter}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="content-stretch flex flex-col gap-8 md:gap-10 items-start max-w-[672px] relative px-4">
                <div className="content-stretch flex flex-col items-center relative w-full">
                    <div
                        className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-sm text-center tracking-[11.2px] uppercase bg-clip-text"
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                            WebkitTextFillColor: "transparent",
                            backgroundSize: "200% auto",
                            animation: "shimmer-move 8s linear infinite"
                        }}
                    >
                        <p className="leading-[21px] whitespace-pre-wrap">{title}</p>
                    </div>
                </div>
                <div className="content-stretch flex flex-col items-center opacity-80 relative w-full">
                    <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[40px] not-italic text-[#999] text-2xl md:text-3xl lg:text-[36px] text-center tracking-[-0.9px] whitespace-pre-wrap">
                        {description}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
