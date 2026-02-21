import { motion } from "framer-motion";

export function BlinkingDot() {
    return (
        <motion.div
            className="absolute bg-[#a5f3fc] rounded-full size-[4px] -top-[2px] left-1/2 -translate-x-1/2"
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
            <div className="absolute bg-[rgba(255,255,255,0)] left-1/2 -translate-x-1/2 rounded-full shadow-[0px_0px_12px_2px_rgba(165,243,252,0.4)] size-[4px] top-0" />
        </motion.div>
    );
}
