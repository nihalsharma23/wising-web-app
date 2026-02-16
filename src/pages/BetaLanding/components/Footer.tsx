export function Footer() {
    return (
        <div className="bg-[#0a0a0a] relative w-full">
            <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />
            <div className="content-stretch flex flex-col items-start pb-6 md:pb-8 pt-6 md:pt-8 px-6 md:px-16 relative w-full">
                <div className="relative w-full">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
                        <div className="content-stretch flex flex-col md:flex-row gap-4 md:gap-12 items-start md:items-center relative w-full">
                            <div className="content-stretch flex flex-col items-start relative">
                                <div className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[#999] text-[9px] tracking-[9px] uppercase">
                                    <p className="leading-[13.5px] whitespace-pre-wrap">wising</p>
                                </div>
                            </div>
                            <div className="content-stretch flex flex-col items-start relative flex-1">
                                <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic text-[9px] text-[rgba(153,153,153,0.4)] tracking-[2.7px] uppercase">
                                    <p className="leading-[13.5px] whitespace-pre-wrap">WISING © 2026 — Wising Intelligence Private Limited</p>
                                </div>
                            </div>
                            <div className="content-stretch flex flex-col items-start relative">
                                <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic text-[9px] text-[rgba(153,153,153,0.4)] tracking-[2.7px] uppercase">
                                    <p className="leading-[13.5px] whitespace-pre-wrap">Contact Us : info@wising.pro</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
