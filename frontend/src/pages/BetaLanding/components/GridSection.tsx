import { motion } from "motion/react";

export function GridSection() {
    const features = [
        { tag: "01 / System", title: "Unified Wealth", desc: "What if you could see everything you own\nin 10 seconds instead of logging into 15\napps? Connect brokers, exchanges, and\nwallets for your complete net worth, live\nF&O trades, and margins in one place." },
        { tag: "02 / Analysis", title: "Intelligence Layer", desc: "What if your portfolio could answer\nquestions like a human analyst? Ask\n\"How's my portfolio vs Nifty?\" in plain\nEnglish and get instant answers from your\nactual data." },
        { tag: "04 / Evolution", title: "Behavioural Mirror", desc: "What if someone showed you exactly\nwhich habits are draining your wealth? AI\ntracks every trade, spots panic sells and\nFOMO buys, then shows what each\npattern costs you." },
        { tag: "05 / Performance", title: "Performance Truth", desc: "What if you could know for certain if\nyou're beating the market or just riding\nluck? XIRR, weighted returns,\nbenchmarking against Nifty, S&P 500,\nBitcoin & 10+ indices to see what's\nactually working." },
        { tag: "06 / Content", title: "Context Feed", desc: "What if news came pre-filtered for what\nactually affects YOUR money? AI scans\nthousands of articles and surfaces only\nwhat hits your holdings. Own TCS? See\nInfosys earnings." },
        { tag: "07 / Vitality", title: "Health Metrics", desc: "What if you could measure your\nportfolio's health like your body's vitals?\nDiversification, volatility, concentration,\nbehavioral patterns. All from YOUR trades.\nSee it. Understand it." },
    ];

    return (
        <div className="relative bg-[#0a0a0a] w-full">
            <div className="content-stretch flex flex-col items-start pt-px relative w-full">
                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />

                {/* Grid */}
                <div className="relative w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative content-stretch flex flex-col gap-4 items-start p-8 md:p-10 lg:p-14"
                            >
                                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-b border-r border-solid inset-0 pointer-events-none" />

                                {/* Tag */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[10px] text-[rgba(153,153,153,0.5)] tracking-[3px] uppercase">
                                            <p className="leading-[15px] whitespace-pre-wrap">{feature.tag}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div
                                            className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-2xl tracking-[-0.6px] uppercase bg-clip-text"
                                            style={{
                                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                                WebkitTextFillColor: "transparent",
                                                backgroundSize: "200% auto",
                                                animation: "shimmer-move 8s linear infinite"
                                            }}
                                        >
                                            <p className="leading-[32px] whitespace-pre-wrap">{feature.title}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="max-w-[448px] relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] relative w-full">
                                        <div className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[26px] not-italic text-[#999] text-[16px] w-full whitespace-pre-wrap">
                                            {feature.desc}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
