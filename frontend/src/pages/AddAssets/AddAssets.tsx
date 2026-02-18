
import React, { useState } from 'react';

export const AddAssets = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedBroker, setSelectedBroker] = useState<{ name: string, logo: string } | null>(null);

    const getBrokerInstructions = (brokerName: string) => {
        switch (brokerName) {
            case "Zerodha":
                return [
                    "Log in to the Kite Connect Developer portal at developers.kite.trade.",
                    "Create a new app to get your 'API Key' and 'API Secret'.",
                    "Enter the credentials below to sync your portfolio."
                ];
            case "Angel One":
                return [
                    "Visit smartapi.angelbroking.com and sign up/login.",
                    "Create a new Trading API app.",
                    "Copy your 'API Key' from the dashboard."
                ];
            case "Interactive Brokers":
                return [
                    "Open TWS or IB Gateway software on your desktop.",
                    "Go to Global Configuration > API > Settings.",
                    "Enable 'Enable ActiveX and Socket Clients'.",
                    "Enter your Account ID and ensure port matches (usually 7496 or 7497)."
                ];
            case "Groww":
                return [
                    "Request API access through the Groww Developer Portal.",
                    "Alternatively, check Profile > Settings > Trading APIs.",
                    "Copy your Access Token or API Key."
                ];
            case "Robinhood":
                return [
                    "Go to Account > Settings > API Credentials.",
                    "Click 'Create New Key' and follow the verification steps.",
                    "Copy the generated API Key."
                ];
            case "Alpaca":
                return [
                    "Log in to your Alpaca Dashboard.",
                    "Look for the 'API Keys' section on the right sidebar.",
                    "Click 'Generate New Keys' to get your Key ID and Secret Key."
                ];
            case "Fidelity":
                return [
                    "Fidelity requires third-party integration access.",
                    "Please ensure you have enabled 'Fidelity Access' or similar permissions.",
                    "Enter your verified client identifier if available."
                ];
            default:
                return ["Follow the broker's official API documentation to get your credentials."];
        }
    };

    const brokers = [
        { name: "Zerodha", logo: "https://cdn.brandfetch.io/idZmHUWU0C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1764611260736" },
        { name: "Angel One", logo: "https://cdn.brandfetch.io/idDA95rr8l/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1708491167649" },
        { name: "Interactive Brokers", logo: "https://cdn.brandfetch.io/idcABCQwX-/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667570681287" },
        { name: "Groww", logo: "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436" },
        { name: "Robinhood", logo: "https://cdn.brandfetch.io/id3WzK3p17/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1732603028282" },
        { name: "Alpaca", logo: "https://cdn.brandfetch.io/id3ddNjt-I/theme/light/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668081387533" },
        { name: "Fidelity", logo: "https://cdn.brandfetch.io/idzIUUVEBm/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752030331882" }
    ];

    const handleNext = () => {
        if (startIndex < brokers.length - 4) {
            setStartIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prev => prev - 1);
        }
    };
    return (
        <div className="bg-background-dark text-white font-display antialiased min-h-screen overflow-hidden">
            <div className="fixed inset-0 z-0 blur-xl brightness-50 pointer-events-none scale-105">
                <header className="w-full pt-10 px-6 md:px-12 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 relative h-8 w-8">
                            <div className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full opacity-80 translate-y-3"></div>
                            <div className="absolute top-0 left-3 w-3 h-3 bg-white rounded-full opacity-90 translate-y-1"></div>
                            <div className="absolute top-3 left-1.5 w-3 h-3 bg-white rounded-full opacity-100 translate-y-2"></div>
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">Wising</span>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto mt-20 px-6 md:px-12">
                    <div className="mb-12">
                        <h2 className="text-text-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-60">Portfolio Valuation</h2>
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl md:text-7xl font-extrabold tracking-tighter metallic-text">₹ 7,24,50,000</span>
                            <span className="text-emerald-500 font-bold text-lg">+12.4%</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
                        <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
                        <div className="h-64 rounded-2xl bg-white/5 border border-white/10"></div>
                    </div>
                </main>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm">
                <div className="glass-modal w-full max-w-4xl max-h-[92vh] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col relative">
                    <div className="pt-5 md:pt-6 px-6 md:px-12 pb-4 md:pb-5 text-center border-b border-white/5 bg-white/[0.01]">

                        <h1 className="shimmer-header text-base md:text-2xl lg:text-3xl font-extrabold uppercase tracking-[0.15em] md:tracking-[0.25em] mb-1.5 leading-tight">Add Assets & Liabilities</h1>
                        <p className="text-text-secondary text-[8px] md:text-[10px] tracking-[0.2em] uppercase opacity-60 font-['Syne']">High-Fidelity Portfolio Integration</p>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-2">
                        <div className="space-y-0">
                            {/* Stock Brokers */}
                            <div className="list-item-border group">
                                <input className="peer sr-only" type="radio" name="asset_category" id="cat-stocks" defaultChecked />
                                <label className="item-header flex items-center justify-between py-4 md:py-5 cursor-pointer text-text-secondary hover:text-white transition-all" htmlFor="cat-stocks">
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <span className="text-[10px] md:text-xs font-mono opacity-40">01/</span>
                                        <span className="text-base md:text-lg font-medium tracking-wide shimmer-header">Stock Brokers</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="glow-indicator opacity-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-opacity"></div>
                                        <span className="material-symbols-outlined text-xl transform transition-transform group-peer-checked:rotate-180">expand_more</span>
                                    </div>
                                </label>
                                <div className="expanded-content max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 relative group/slider">
                                        <label className="block text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold mb-6 md:mb-8 text-center md:text-left">Link Your Brokerage</label>

                                        <div className="relative">
                                            {/* Slider Controls */}
                                            {startIndex > 0 && (
                                                <button
                                                    onClick={handlePrev}
                                                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all backdrop-blur-sm"
                                                >
                                                    <span className="material-symbols-outlined text-white text-sm">chevron_left</span>
                                                </button>
                                            )}

                                            {startIndex < brokers.length - 4 && (
                                                <button
                                                    onClick={handleNext}
                                                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-black/80 transition-all backdrop-blur-sm"
                                                >
                                                    <span className="material-symbols-outlined text-white text-sm">chevron_right</span>
                                                </button>
                                            )}

                                            {/* Slider Content */}
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                                {brokers.slice(startIndex, startIndex + 4).map((broker, index) => (
                                                    <div key={index} className="flex flex-col items-center gap-3 md:gap-4 group/broker">
                                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center p-3 hover:border-white/30 transition-all">
                                                            <img src={broker.logo} alt={broker.name} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300" />
                                                        </div>
                                                        <span className="text-blue-900 uppercase tracking-widest text-[10px] font-bold">{broker.name}</span>
                                                        <button
                                                            onClick={() => setSelectedBroker(broker)}
                                                            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all"
                                                        >
                                                            Connect
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Crypto Assets (Active by default for demo or toggles via radio) */}
                            <div className="list-item-border group">
                                <input className="peer sr-only" type="radio" name="asset_category" id="cat-crypto" />
                                <label className="item-header flex items-center justify-between py-4 md:py-5 cursor-pointer text-text-secondary hover:text-white transition-all" htmlFor="cat-crypto">
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <span className="text-[10px] md:text-xs font-mono opacity-40">02/</span>
                                        <span className="text-base md:text-lg font-medium tracking-wide shimmer-header">Crypto Assets</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="glow-indicator opacity-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-opacity"></div>
                                        <span className="material-symbols-outlined text-xl transform transition-transform group-peer-checked:rotate-180">expand_more</span>
                                    </div>
                                </label>
                                <div className="expanded-content max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                                    <div className="space-y-6 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-6">
                                        <div className="space-y-4">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Select Exchange</label>
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <div className="relative flex-1">
                                                    <select className="w-full bg-white/[0.04] border-white/10 border rounded-xl focus:border-white focus:ring-0 text-white font-medium text-sm py-3 md:py-3.5 pl-6 pr-10 transition-colors appearance-none cursor-pointer">
                                                        <option value="" disabled selected className="bg-neutral-900 text-white">Choose a global exchange</option>
                                                        <option value="binance" className="bg-neutral-900 text-white">Binance</option>
                                                        <option value="coinbase" className="bg-neutral-900 text-white">Coinbase</option>
                                                        <option value="kraken" className="bg-neutral-900 text-white">Kraken</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                                        <span className="material-symbols-outlined text-lg text-white/40">expand_more</span>
                                                    </div>
                                                </div>
                                                <button className="px-6 md:px-8 py-3.5 md:py-0 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all whitespace-nowrap w-full md:w-[170px] flex items-center justify-center">Link Account</button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Add Wallet</label>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <div className="relative flex-1 w-full">
                                                        <input
                                                            type="text"
                                                            placeholder="Paste your wallet address (ETH, BTC, SOL, BSC, POLY...)"
                                                            className="w-full bg-white/[0.04] border-white/10 border rounded-xl focus:border-white focus:ring-0 text-white font-medium text-sm py-3 md:py-3.5 px-6 transition-colors placeholder:text-white/20"
                                                        />
                                                    </div>
                                                    <button className="px-6 md:px-8 py-3.5 md:py-0 bg-blue-950/40 text-blue-400 text-[10px] font-['Syne'] font-medium uppercase tracking-widest rounded-xl border border-blue-500/30 hover:bg-blue-900/40 transition-all whitespace-nowrap flex items-center justify-center gap-2 backdrop-blur-sm w-full md:w-[170px]">
                                                        <span>TRACK WALLET</span>
                                                        <span className="material-symbols-outlined text-sm opacity-70">chevron_right</span>
                                                    </button>
                                                </div>
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 font-['Syne']">
                                                    <p className="text-[10px] text-white/70 italic font-normal tracking-wide">Track any valid public address directly without connecting private keys.</p>
                                                    <p className="text-[10px] text-blue-500/80 font-medium tracking-widest uppercase whitespace-nowrap">SUPPORT FOR <span className="font-sans">50+</span> BLOCKCHAIN NETWORKS GLOBALLY</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Commodities */}
                            <div className="list-item-border group">
                                <input className="peer sr-only" type="radio" name="asset_category" id="cat-commodities" />
                                <label className="item-header flex items-center justify-between py-4 md:py-5 cursor-pointer text-text-secondary hover:text-white transition-all" htmlFor="cat-commodities">
                                    <div className="flex items-center gap-4 md:gap-8">
                                        <span className="text-[10px] md:text-xs font-mono opacity-40">03/</span>
                                        <span className="text-base md:text-lg font-medium tracking-wide shimmer-header">Commodities</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="glow-indicator opacity-0 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-opacity"></div>
                                        <span className="material-symbols-outlined text-xl transform transition-transform group-peer-checked:rotate-180">expand_more</span>
                                    </div>
                                </label>
                            </div>

                            {/* Coming Soon Items */}

                        </div>
                    </div>
                    <footer className="w-full bg-black/80 md:bg-black/60 backdrop-blur-xl border-t border-white/10 px-6 md:px-12 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
                        <div className="hidden md:block">
                            <p className="text-text-secondary text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Copyright 2026 Wising Pvt. Ltd.</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-6 md:px-10 py-2.5 md:py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-all border border-white/5 hover:border-white/10">
                                Cancel
                            </button>
                            <button className="flex-1 md:flex-none px-8 md:px-12 py-2.5 md:py-2.5 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] active:scale-95">
                                Continue
                            </button>
                        </div>
                        <div className="md:hidden">
                            <p className="text-text-secondary text-[8px] font-bold uppercase tracking-[0.15em] opacity-30 text-center">© 2026 Wising Pvt. Ltd.</p>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Broker Connection Modal */}
            {
                selectedBroker && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedBroker(null)}
                        />
                        <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-modal animate-in fade-in zoom-in duration-200">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between relative">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center p-2 border border-white/10">
                                        <img src={selectedBroker.logo} alt={selectedBroker.name} className="w-full h-full object-contain opacity-90" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white shimmer-header">Instructions</h3>
                                        <p className="text-xs text-white/40 font-['Syne'] uppercase tracking-widest">Connect {selectedBroker.name}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedBroker(null)}
                                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
                                        <p className="text-blue-200/80 text-sm leading-relaxed">
                                            It's very easy, don't panic! Follow these simple steps to connect your {selectedBroker.name} account and sync your portfolio.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-medium text-white/80">Steps to connect:</h4>
                                        <ul className="space-y-2">
                                            {getBrokerInstructions(selectedBroker.name).map((step, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-white/60 items-start">
                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white/40 mt-0.5 border border-white/5">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="leading-relaxed">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-white/60 uppercase tracking-widest">API Key / ID</label>
                                            <input
                                                type="text"
                                                placeholder={`Enter your ${selectedBroker.name} API Key`}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-white/60 uppercase tracking-widest">API Secret</label>
                                            <input
                                                type="password"
                                                placeholder="Enter API Secret (if applicable)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full h-[42px] bg-[#1E293B] hover:bg-[#253248] text-[#60A5FA] border border-[#3B82F6]/30 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
                                        <span>ADD BROKER</span>
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
