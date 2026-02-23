import { motion } from "motion/react";

// Marquee Component for Supported Integrations
function MarqueeIntegrations() {
    const rawIntegrations = [
        "Interactive Brokers", "Robinhood", "Alpaca", "Charles Schwab", "Fidelity",
        "Groww", "Zerodha", "Angel One", "Binance", "Coinbase", "Kraken", "CoinDCX", "Bybit",
        "+5 Brokers", "On Chain Tracking"
    ];

    // Double the list to create seamless loop
    const integrations = [...rawIntegrations, ...rawIntegrations];

    return (
        <div className="relative overflow-hidden w-full h-[40px] flex items-center">
            <motion.div
                className="flex gap-14 items-center whitespace-nowrap"
                animate={{
                    x: "-50%",
                }}
                transition={{
                    duration: 40, // Slower duration for longer list
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    width: "fit-content",
                }}
            >
                {integrations.map((name, i) => (
                    <div key={i} className="flex flex-col font-['Inter:Light',sans-serif] font-light justify-center leading-[0] not-italic text-[#999] text-[16px] tracking-[4.8px] uppercase whitespace-nowrap">
                        <p className="leading-[24px]">{name}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Supported Integrations Section
export function SupportedIntegrationsSection() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-[#0a0a0a] w-full"
        >
            <div className="content-stretch flex flex-col gap-5 items-start overflow-clip pb-6 pt-6 md:pt-7 relative w-full">
                {/* Title */}
                <div className="relative w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full px-4">
                        <div
                            className="bg-clip-text flex flex-col font-['Syne:Medium',sans-serif] font-medium justify-center leading-[0] text-center tracking-[9.8px] uppercase text-sm px-4"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmer-move 8s linear infinite"
                            }}
                        >
                            <p className="leading-[21px] whitespace-pre-wrap">Supported Integrations</p>
                        </div>
                    </div>
                </div>

                {/* Marquee */}
                <MarqueeIntegrations />
            </div>
            <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />
        </motion.div>
    );
}
