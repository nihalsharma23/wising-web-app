
import { useState } from 'react';

export function AIChat() {
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 laptop:bottom-12 laptop:right-12 z-[100]">
            <button
                onClick={() => setIsAiChatOpen(!isAiChatOpen)}
                className="size-14 laptop:size-16 bg-white text-black rounded-full flex items-center justify-center cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-all duration-300 group active:scale-95"
            >
                <span className="material-symbols-outlined text-2xl laptop:text-3xl font-light">auto_awesome</span>
            </button>

            <div
                className={`hidden absolute bottom-20 laptop:bottom-24 right-0 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-2xl flex-col overflow-hidden backdrop-blur-3xl ${isAiChatOpen ? '!flex' : ''}`}
                id="ai-chat-window"
            >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        <div className="size-2 rounded-full bg-white animate-pulse"></div>
                        <div>
                            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Wising AI</h4>
                            <span className="text-[8px] text-[#94a3b8] font-semibold uppercase tracking-widest">Deep Insight Mode</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAiChatOpen(false)}
                        className="cursor-pointer text-[#94a3b8] hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl font-light">close</span>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    <div className="flex gap-5">
                        <div className="max-w-full space-y-4">
                            <div className="text-[9px] text-[#94a3b8] font-bold uppercase tracking-widest">Wising Core</div>
                            <div className="text-sm text-white/80 leading-relaxed font-light">
                                Portfolio equilibrium achieved. Analysis suggests a rebalancing of index components to hedge against current Q4 volatility projections.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <div className="relative">
                        <input
                            className="w-full bg-transparent border-0 border-b border-white/10 py-4 text-sm focus:ring-0 focus:border-white transition-all placeholder:text-white/20 font-light text-white"
                            placeholder="Ask about market correlations..."
                            type="text"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-all">
                            <span className="material-symbols-outlined text-xl font-light">north_east</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
