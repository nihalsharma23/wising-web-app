import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import avatar1 from "../../assets/founding_team_v2_1.png";
import avatar2 from "../../assets/founding_team_v2_2.png";
import avatar3 from "../../assets/founding_team_v2_3.png";

export function AboutUs() {
    return (
        <div className="min-h-screen bg-black flex flex-col font-['Syne',sans-serif]">
            <Header variant="about" />
            
            <main className="flex-grow pt-32 px-6 md:px-12 lg:px-24">
                <section className="max-w-6xl mx-auto mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Wising Intelligence
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-['Manrope',sans-serif] leading-relaxed">
                        We are building the infrastructure for the next generation of global wealth compliance. Our mission is to automate regulatory friction so capital moves without boundaries.
                    </p>
                </section>

                <article className="max-w-7xl mx-auto mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Profile Card Container */}
                        <div className="bg-zinc-950/50 border border-zinc-900 rounded-3xl p-8 hover:bg-zinc-900/50 transition-all duration-500 group">
                            <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/5]">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                                    alt="Founder" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Nihal Sharma</h3>
                            <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-4">Founder / Systems Architecture</p>
                            <div className="space-y-4 font-['Manrope',sans-serif]">
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Background</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Data-driven technologist specializing in distributed compliance engines and cross-border fintech infrastructure.
                                    </p>
                                </div>
                                <div>
                                    <span className="block text-[0.65rem] tracking-[0.2em] text-zinc-500 uppercase mb-2">Focus</span>
                                    <p className="text-[0.85rem] leading-[1.6] text-zinc-300 font-light">
                                        Automating US-India tax logic and FEMA regularity compliance through agentic data pipelines.
                                    </p>
                                </div>
                            </div>
                        </div>

                         {/* Add other placeholders as needed or leave as single focus for now */}
                    </div>
                </article>
            </main>

            <footer className="relative z-10 py-12 border-t border-zinc-900 text-center font-['Manrope',sans-serif]">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    WISING © {new Date().getFullYear()} — WISING INTELLIGENCE PRIVATE LIMITED
                </p>
            </footer>
        </div>
    );
}

export default AboutUs;
