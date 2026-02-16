import { Link } from "react-router-dom";
import imgHeaderLogo from "../assets/header_logo.png";

// Header Component with Logo
export function Header() {
    return (
        <div className="absolute content-stretch flex items-center justify-between left-0 px-6 md:px-10 py-6 right-0 top-0 z-50">
            {/* Logo + WISING */}
            <div className="content-stretch flex flex-col items-start relative">
                <Link to="/" className="content-stretch flex gap-4 md:gap-6 items-center relative cursor-pointer hover:opacity-80 transition-opacity">
                    {/* Logo */}
                    <img
                        src={imgHeaderLogo}
                        alt="Wising Logo"
                        className="h-16 md:h-20 w-auto object-contain"
                    />

                    {/* WISING Text */}
                    <div className="flex flex-col font-['Montserrat:Semi_Bold',sans-serif] justify-center leading-[0] not-italic text-[#999] text-[24px] tracking-[16px] uppercase pl-1">
                        <p className="leading-[32px] whitespace-pre-wrap font-[Aboreto] flex items-center pt-2">WISING</p>
                    </div>
                </Link>
            </div>

            {/* About Us Link (Top Right) */}
            <div className="content-stretch flex h-10 items-center px-4 relative">
                <Link to="/about" className="content-stretch flex flex-col h-10 items-end justify-center py-3 relative cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="flex flex-col font-['Syne',sans-serif] font-medium justify-center leading-[0] not-italic text-[#999] text-xs tracking-[4px] uppercase">
                        <p className="leading-[15px] whitespace-pre-wrap">About Us</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
