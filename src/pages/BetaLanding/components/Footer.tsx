import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] relative w-full">
            <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />
            <div className="content-stretch flex flex-col items-start pb-10 md:pb-12 pt-10 md:pt-12 px-6 md:px-16 lg:px-24 relative w-full gap-12">
                {/* Trust & Security Block */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-y border-white/[0.03]">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[18px]">verified_user</span>
                            <span className="text-[10px] font-['Manrope',sans-serif] text-[#999] tracking-[2px] uppercase whitespace-nowrap">SSL Secured</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[18px]">lock</span>
                            <span className="text-[10px] font-['Manrope',sans-serif] text-[#999] tracking-[2px] uppercase whitespace-nowrap">Non-custodial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[18px]">visibility_off</span>
                            <span className="text-[10px] font-['Manrope',sans-serif] text-[#999] tracking-[2px] uppercase whitespace-nowrap">No Data Sold</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[18px]">payments</span>
                            <span className="text-[10px] font-['Manrope',sans-serif] text-[#999] tracking-[2px] uppercase whitespace-nowrap">No Payment Required</span>
                        </div>
                    </div>

                    {/* Trusted Logo / Badge */}
                    <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg bg-white/[0.02]">
                        <span className="material-symbols-outlined text-white/40" style={{ fontSize: '24px' }}>security</span>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold tracking-widest uppercase chrome-silver-metallic">Wising</span>
                            <span className="text-[8px] font-medium text-[#22C55E] tracking-widest uppercase leading-none">Trusted</span>
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
                        <div className="content-stretch flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-center relative w-full text-center md:text-left">
                            <div className="content-stretch flex flex-col items-start relative">
                                <div className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[10px] tracking-[10px] uppercase chrome-silver-metallic">
                                    <p className="leading-[1.5] whitespace-pre-wrap font-bold">wising</p>
                                </div>
                            </div>
                            <div className="content-stretch flex flex-col items-start relative flex-1">
                                <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic text-[9px] text-[rgba(153,153,153,0.4)] tracking-[2.7px] uppercase">
                                    <p className="leading-[1.5] whitespace-pre-wrap">WISING © 2026 — Wising Intelligence Private Limited</p>
                                </div>
                            </div>
                            <div className="content-stretch flex flex-col items-start relative">
                                <Link to="mailto:info@wising.app" className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic text-[9px] text-[rgba(153,153,153,0.4)] tracking-[2.7px] uppercase hover:text-white transition-colors">
                                    <p className="leading-[1.5] whitespace-pre-wrap">Contact Us : info@wising.app</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
