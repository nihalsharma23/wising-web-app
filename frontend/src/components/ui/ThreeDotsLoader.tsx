
import { motion } from 'framer-motion';

export function ThreeDotsLoader() {
    return (
        <div className="flex items-center justify-center p-2">
            <motion.div
                className="flex items-center justify-center"
                initial="initial"
                animate="animate"
            >
                {/* Container for the dots */}
                <motion.div
                    className="flex gap-1"
                    variants={{
                        initial: { gap: 4 },
                        animate: {
                            gap: [4, 0, 0, 4],
                            transition: {
                                duration: 3,
                                times: [0, 0.3, 0.7, 1],
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[#C0C0C0] shadow-[0_0_4px_rgba(192,192,192,0.8)]"
                            variants={{
                                initial: { rotate: 0, opacity: 1, scale: 1 },
                                animate: {
                                    rotate: i === 1 ? [0, 180, 360, 360] : 0, // Rotating effect when coalesced
                                    opacity: [1, 0.8, 0.8, 1],
                                    scale: [1, 0.8, 0.8, 1],
                                    transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
