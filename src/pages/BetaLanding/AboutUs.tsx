import { Header } from "../../components/layout/Header";
import { Linkedin } from "lucide-react";
import { SEO } from "../../components/SEO";
import { seoConfig } from "../../config/seoData";
import sarthakImg from "../../assets/sarthak-jalan.png";
import nihalImg from "../../assets/nihal-sharma.jpg";
import eyLogo from "../../assets/logos/ey.png";
import jioLogo from "../../assets/logos/jio.svg";
import hansrajLogo from "../../assets/logos/hansraj.svg";
import icaiLogo from "../../assets/logos/icai.svg";
import cgcLogo from "../../assets/logos/cgc.svg";
import Starfield from "../../components/ui/Starfield";

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export function AboutUs() {
    return (
        <div
            className="relative min-h-screen dark-gradient-bg text-white font-['Manrope',sans-serif] overflow-x-hidden selection:bg-cyan-500/30 select-none px-[15px]"
            onContextMenu={(e) => e.preventDefault()}
        >
            <Starfield />
            <SEO {...seoConfig.about} />
            {/* Background Glow Elements */}
            <div className="fixed -top-[10%] -left-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(19,164,236,0.08)_0%,rgba(19,164,236,0)_70%)] pointer-events-none z-0"></div>
            <div className="fixed -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(183,110,121,0.08)_0%,rgba(183,110,121,0)_70%)] pointer-events-none z-0"></div>

            {/* Main Header */}
            <Header variant="about" />

            {/* Page Title */}
            <section className="relative z-10 pt-32 pb-20 text-center">
                <h1 className="text-xs uppercase tracking-[0.5em] text-white/40 font-bold">About Us</h1>
            </section>

            {/* Founder Section */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-12">

                {/* Founder 1: SARTHAK JALAN */}
                <article className="glass-navy-container rounded-lg p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Profile Image & Socials */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
                            <div className="w-64 h-80 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden border border-zinc-800">
                                <img
                                    alt="Sarthak Jalan"
                                    className="w-full h-full object-cover"
                                    src={sarthakImg}
                                />
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/in/sarthak-jalan-392b5a17b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#0077b5] transition-colors group"
                                >
                                    <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="https://x.com/SarthakJ456"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-black transition-colors group"
                                >
                                    <XIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-3xl lg:text-5xl mb-12 uppercase tracking-[0.4em] font-light bg-gradient-to-br from-white via-[#a1a1a1] to-white bg-clip-text text-transparent">
                                SARTHAK JALAN
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Experience</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Chartered Accountant and Investment Banking Associate with experience of advising startups on $10M+ fundraises and auditing Multi national banks and brokers. 4 years optimizing Web3 portfolios and attention market product strategies.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Achievements</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Led $10M fundraising deals and achieved 70-75% investor introduction success rate, also headed Cyber security & System Audit of multinational brokers with market cap exceeding $200Bn & India’s top retail brokerage firms.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Career</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Ex- Associate- Investment Banking at Felix Investment Banking, ANB Global- Cybersecurity & System Audit for Brokers & Exchanges, Ex-EY- Statutory Audit for MNC Banks.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Education</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Chartered Accountant ICAI and B.Com (hons.) from Hansraj College, Delhi University
                                    </p>
                                </div>
                                <div className="md:col-span-2 pt-4 border-t border-zinc-900/50">
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-3">Previous Experience</span>
                                    <div className="flex items-center gap-6">
                                        <img src={eyLogo} alt="EY" className="h-6 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                                        <img src={icaiLogo} alt="ICAI" className="h-6 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                                        <img src={hansrajLogo} alt="Hansraj" className="h-6 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Founder 2: NIHAL SHARMA */}
                <article className="glass-navy-container rounded-lg p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Profile Image & Socials */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
                            <div className="w-64 h-80 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden border border-zinc-800">
                                <img
                                    alt="Nihal Sharma"
                                    className="w-full h-full object-cover object-top"
                                    src={nihalImg}
                                />
                            </div>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/in/nihalsharma120396"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#0077b5] transition-colors group"
                                >
                                    <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                                <a
                                    href="https://x.com/NiaalSharma"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-black transition-colors group"
                                >
                                    <XIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </a>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-3xl lg:text-5xl mb-12 uppercase tracking-[0.4em] font-light bg-gradient-to-br from-white via-[#a1a1a1] to-white bg-clip-text text-transparent">
                                NIHAL SHARMA
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Experience</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        5+ years in Product Management building AI- and Blockchain-driven Digital Transformation Platforms in Finance, Energy, and Customer Relationship Sectors, backed by a decade of startup leadership and execution at scale experiences.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Achievements</span>
                                    <ul className="text-[0.85rem] leading-[1.6] text-white/90 font-light list-disc pl-4 space-y-1">
                                        <li>Google Entrepreneur Winner (2017)</li>
                                        <li>Delivered 3X sales growth in B2B Markets through scalable digital strategy and product execution.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Career</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Former Project Manager at Reliance Jio Platforms and a Star Performer PM/BA at TechonDater Systems Pvt. Ltd.. Delivered 30+ End-to-End Mobile and Software Solutions.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-2">Education</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-white/90 font-light">
                                        Computer Science graduate from Chandigarh Group of Colleges, Punjab, with a strong grounding in AI, Data Science, and scalable system architecture.
                                    </p>
                                </div>
                                <div className="md:col-span-2 pt-4 border-t border-zinc-900/50">
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-white/50 uppercase mb-3">Previous Experience</span>
                                    <div className="flex items-center gap-0.5">
                                        <img src={jioLogo} alt="Reliance Jio" className="h-12 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                                        <img src={cgcLogo} alt="CGC" className="h-[49px] w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

            </main>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-zinc-900 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                    WISING © {new Date().getFullYear()} — WISING INTELLIGENCE PRIVATE LIMITED
                </p>
            </footer>
        </div>
    );
}

export default AboutUs;
