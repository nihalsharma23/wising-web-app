export function SupportButton() {
    return (
        <div className="fixed bottom-8 md:bottom-12 right-6 md:right-8 z-50">
            <div className="backdrop-blur-[6px] content-stretch flex items-center justify-center p-px relative rounded-full shrink-0 size-10 cursor-pointer hover:scale-110 transition-transform">
                <div aria-hidden="true" className="absolute border border-[#1f1f1f] border-solid inset-0 pointer-events-none rounded-full" />
                <div className="relative">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
                        <div className="flex flex-col font-['Material_Symbols_Outlined:Thin',sans-serif] justify-center leading-[0] not-italic relative size-4 text-[16px] text-center text-white">
                            <p className="leading-[16px] whitespace-pre-wrap">contact_support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
