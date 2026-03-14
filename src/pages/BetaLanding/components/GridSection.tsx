import { motion } from 'motion/react';

export function GridSection() {
    const features = [
        { tag: "01/ Command", title: "Master Your Assets", desc: "Connect every account in 10 seconds. See your complete net worth and live trades in one unified, master feed." },
        { tag: "02/ Insights", title: "Talk To Your Data", desc: "Ask questions in plain English. Get instant, pro-level analysis from your actual data without the complex jargon." },
        { tag: "03/ Habit", title: "Unmask Your Patterns", desc: "Identify the behaviors draining your wealth. Spot panic sells and FOMO buys before they cost you another trade." },
        { tag: "04/ Intelligence", title: "Filter The Noise", desc: "Only see news that hits your portfolio. AI filters thousands of articles to surface what actually impacts your money." },
        { tag: "05/ Taxation", title: "Simplify Global Taxes", desc: "Navigate cross-border complexities with ease. Use the Causal Chain Explorer to effortlessly identify and claim Tax credits, optimizing your global wealth." },
        { tag: "06/ Vitals", title: "Read Your Health", desc: "Measure your financial health daily. Monitor diversification, volatility, and concentration with professional precision." },
    ];

    return (
        <div className="relative bg-[#0a0a0a] w-full">
            <div className="content-stretch flex flex-col items-start pt-px relative w-full">
                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />

                {/* Grid */}
                <div className="relative w-full">
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
                    >
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                                }}
                                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                                className="relative content-stretch flex flex-col gap-4 items-start p-[clamp(2.5rem,5vw,5rem)] group cursor-default"
                            >
                                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-b border-r border-solid inset-0 pointer-events-none group-hover:border-white/20 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Tag */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div
                                            className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[10px] text-[#14b8a6] text-center tracking-[4px] uppercase transition-colors"
                                        >
                                            <p className="leading-[15px] whitespace-pre-wrap">{feature.tag}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div
                                            className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-3xl tracking-tight uppercase text-zinc-100 group-hover:text-white transition-colors"
                                        >
                                            <p className="leading-[32px] whitespace-pre-wrap">{feature.title}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="max-w-[448px] relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] relative w-full">
                                        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[26px] not-italic text-zinc-500 text-[16px] w-full whitespace-pre-wrap group-hover:text-zinc-400 transition-colors">
                                            {feature.desc}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
