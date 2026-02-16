import { Header } from "./components/Header";
// I will use the remote URLs from the provided HTML for now as I don't have local portraits.

export function AboutUs() {
    return (
        <div className="relative min-h-screen bg-[#050505] text-white font-['Manrope',sans-serif] overflow-x-hidden selection:bg-cyan-500/30">
            {/* Background Glow Elements */}
            <div className="fixed -top-[10%] -left-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(19,164,236,0.08)_0%,rgba(19,164,236,0)_70%)] pointer-events-none z-0"></div>
            <div className="fixed -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(183,110,121,0.08)_0%,rgba(183,110,121,0)_70%)] pointer-events-none z-0"></div>

            {/* Main Header */}
            <Header />

            {/* Page Title */}
            <section className="relative z-10 pt-32 pb-20 text-center">
                <h1 className="text-xs uppercase tracking-[0.5em] text-zinc-500 font-medium">About Us</h1>
            </section>

            {/* Founder Section */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-12">

                {/* Founder 1: SARTHAK JALAN */}
                <article className="bg-[#0a0a0a]/40 border border-zinc-900 rounded-lg p-8 lg:p-12 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Profile Image & Socials */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
                            <div className="w-64 h-80 grayscale overflow-hidden border border-zinc-800">
                                {/* Using the image from the provided HTML as placeholder */}
                                <img
                                    alt="Sarthak Jalan"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG1HLQokknvUBwsdBawVio3EeeRcdvWvI_BObrSWvD2LI3rjjqL3rKOHgOrXtt69rzAgG-Vy6110wnAxvpUbPnFZqpm_VMDFb-o4uZDvIXwLG47pih_k_sh53pnuCOFQ_Xs8si7R6-sXO1meQ8PL-wzgI6E8tcJyqIWxVk9h-mEJTP35DBSSq-qcy3u8v14Zi6fq4KgSKN19YfW6w42JJICz6qzHKnO29cuhu1bsjhieB_r_kDAsvVxDvCF6tcGWW8Ceb8Ru9jXHM0"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <a className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#13a4ec] transition-colors" href="#">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
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
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Experience</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Focuses on the intersection of fintech and regulatory compliance. Built Wising's global operational framework.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Achievements</span>
                                    <ul className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light list-disc pl-4 space-y-1">
                                        <li>Forbes 30 Under 30 - Finance</li>
                                        <li>Featured Speaker at World Economic Forum 2025</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Career</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Strategic Operations lead at Jio Financial. Spearheaded market expansion strategies in SE Asia.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Education</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        MBA from London School of Economics. BA in Economics and Finance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Founder 2: NIHAL SHARMA */}
                <article className="bg-[#0a0a0a]/40 border border-zinc-900 rounded-lg p-8 lg:p-12 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Profile Image & Socials */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
                            <div className="w-64 h-80 grayscale overflow-hidden border border-zinc-800">
                                <img
                                    alt="Nihal Sharma"
                                    className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9RdMsaZJH6MHmQc_hZZqeItsYFnIt_mRMGgb2ZCBitHZ6W7h2oWZSQ78ILmMBcISp_Fx2-B1BtPr7qACKDaeOsKh5W22oiZhFK49hTQWE6oIuWuRrN9bz4qhJzjLLQ_HWiBRcMlDyGa16xXCTLujtXeirruEHFA5TNWnzwRP1Ye9lHTZGo1nM1Fql-45gAvykBR1pr-xJUrwS2r0yf39QYBgG62vlxWoQiIBQI8Upo02Ww9RoolbPxBtAIbQ_tdJoLfnF3bKvOvdG"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <a className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#13a4ec] transition-colors" href="#">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
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
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Experience</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        5+ years in Product Management building AI- and Blockchain-driven Digital Transformation Platforms in Finance, Energy, and Customer Relationship Sectors, backed by a decade of startup leadership and execution at scale experiences.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Achievements</span>
                                    <ul className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light list-disc pl-4 space-y-1">
                                        <li>Google Entrepreneur Winner (2017)</li>
                                        <li>Delivered 3X sales growth in B2B Markets through scalable digital strategy and product execution.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Career</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Former Project Manager at Reliance Jio Platforms and a Star Performer PM/BA at TechonDater Systems Pvt. Ltd.. Delivered 30+ End-to-End Mobile and Software Solutions.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Education</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Computer Science graduate from Chandigarh Group of Colleges, Punjab, with a strong grounding in AI, Data Science, and scalable system architecture.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Founder 3: DIVANSHU BANSAL */}
                <article className="bg-[#0a0a0a]/40 border border-zinc-900 rounded-lg p-8 lg:p-12 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* Profile Image & Socials */}
                        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
                            <div className="w-64 h-80 grayscale overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                                {/* Placeholder for Divanshu Bansal */}
                                <div className="text-zinc-700 font-['Syne'] text-6xl opacity-50">DB</div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <div className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center opacity-40"></div>
                                <a className="w-8 h-8 bg-zinc-800 rounded-sm flex items-center justify-center hover:bg-[#13a4ec] transition-colors" href="#">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                </a>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="w-full lg:w-2/3">
                            <h2 className="text-3xl lg:text-5xl mb-12 uppercase tracking-[0.4em] font-light bg-gradient-to-br from-white via-[#a1a1a1] to-white bg-clip-text text-transparent">
                                DIVANSHU BANSAL
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Experience</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        5+ years of experience building scalable systems across cross-functional roles. Designed solution architectures from MVPs to enterprise-scale platforms for global clients including US Bank and Toyota Motors.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Achievements</span>
                                    <ul className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light list-disc pl-4 space-y-1">
                                        <li>Best Performer on US Bank project; Developer of the Quarter at Toyota Motors.</li>
                                        <li>Recognized as a core engineering contributor and high-impact problem solver.</li>
                                    </ul>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Career</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Ex-Wipro Software Engineer; currently Senior Software Engineer at Coforge. Delivered mission-critical solutions with strong ownership and execution excellence.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Education</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Computer Science graduate with specialization in Software and Data Engineering.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

            </main>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-zinc-900 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    WISING © 2026 — WISING INTELLIGENCE PRIVATE LIMITED
                </p>
            </footer>
        </div>
    );
}
