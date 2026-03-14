
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="relative content-stretch flex flex-col gap-4 items-start p-[clamp(2.5rem,5vw,5rem)]"
                            >
                                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-b border-r border-solid inset-0 pointer-events-none" />

                                {/* Tag */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div
                                            className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[10px] text-zinc-400 text-center tracking-[3px] uppercase"
                                        >
                                            <p className="leading-[15px] whitespace-pre-wrap">{feature.tag}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="relative w-full">
                                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                                        <div
                                            className="flex flex-col font-['Montserrat:Bold',sans-serif] font-bold justify-center leading-[0] text-3xl tracking-[-0.6px] uppercase text-zinc-100"
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
