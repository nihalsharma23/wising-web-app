import * as React from "react";
import { Badge } from "./badge";
import { MagicText } from "./magic-text";
import { motion } from 'framer-motion';
import RadialOrbitalTimeline, { TimelineItem } from "./radial-orbital-timeline";
import { GlobeCdn } from "./cobe-globe-cdn";
import WisingMacOSDemo from "./wising-macos-dashboard";

const cards = [
  {
    title: 'SYNC ONCE',
    desc: 'Connect your assets and liabilities in a click. Instantly map your global financial ecosystem with zero manual input.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    title: 'AUTO ENFORCE',
    desc: 'Apply heavy-duty compliance rules. Instantly check every cross-border legal rate and law automatically in real-time.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    title: 'LIVE PROJECT',
    desc: 'Get a clean, automated dashboard. Always see your estimated tax position across all global jurisdictions at a glance.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

const timelineData: TimelineItem[] = [
  { id: 1, title: "Zerodha", brokerName: "Zerodha", logoUrl: "https://cdn.brandfetch.io/idZmHUWU0C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1772425942191", portfolioValue: "14,250", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 2, title: "Groww", brokerName: "Groww", logoUrl: "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436", portfolioValue: "8,900", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 3, title: "Robinhood", brokerName: "Robinhood", logoUrl: "https://cdn.brandfetch.io/id3WzK3p17/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1732603028282", portfolioValue: "22,100", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 4, title: "Fidelity", brokerName: "Fidelity", logoUrl: "https://cdn.brandfetch.io/idzIUUVEBm/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752030331882", portfolioValue: "45,400", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 5, title: "Binance", brokerName: "Binance", logoUrl: "https://cdn.brandfetch.io/id-pjrLx_q/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768404023648", portfolioValue: "31,780", status: "pending", energy: 100, date: "Active", content: "" }
];

export default function SolutionSection() {
  return (
    <section className="relative w-full pt-8 pb-20 px-6 md:px-12 lg:px-24 flex flex-col gap-16 z-20">
      
      {/* HEADER PART */}
      <div className="flex flex-col items-center text-center gap-4">
        <Badge variant="secondary" className="px-5 py-2.5 text-[14px] bg-black/50 border border-white/10 backdrop-blur-md text-white/90 rounded-full font-['Manrope',sans-serif] font-semibold tracking-wider w-max mx-auto mb-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          The Solution
        </Badge>
        <MagicText 
          text="One Compliance Engine That Pre-Clears Your Trades Tax Liability Across Every Account You Own."
          className="justify-center"
          wordClassName="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] tracking-tight font-['Manrope',sans-serif] text-white"
        />
      </div>

      {/* TWO COLUMN CONTENT PART */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-12 lg:gap-16">
        {cards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-center">
            
            {/* LEFT COLUMN: The Content Card (Now Narrower) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative flex-[1] w-full max-w-[420px] h-[280px] md:h-[320px] transition-all duration-500 z-10"
            >
              {/* Skewed gradient panels - Shortened Height */}
              <span
                className="absolute top-[10%] left-[30px] w-[50%] h-[80%] rounded-3xl transform skew-x-[12deg] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)]"
                style={{
                  background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                  opacity: 0.6
                }}
              />
              <span
                className="absolute top-[10%] left-[30px] w-[50%] h-[80%] rounded-3xl transform skew-x-[12deg] blur-[40px] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] opacity-20 group-hover:opacity-60"
                style={{
                  background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                }}
              />

              {/* Content Box */}
              <div className="absolute inset-0 z-20 p-8 glass-navy-container border-white/5 shadow-2xl rounded-3xl text-white transition-all duration-500 group-hover:translate-y-[-10px] flex flex-col items-start justify-center text-left">
                <h2 className="text-2xl lg:text-3xl mb-4 font-bold font-['Manrope',sans-serif] tracking-[0.1em] uppercase leading-none">
                  {title}
                </h2>
                <p className="text-base lg:text-lg text-white/90 leading-relaxed font-['Manrope',sans-serif] font-medium tracking-tight">
                  {desc}
                </p>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: The Diagram Placeholder Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${idx === 0 ? "flex-[1]" : "flex-[0.9]"} w-full flex justify-center relative z-10`}
            >
              {/* Vertical Connecting Line (Draws down to next card) */}
              {idx < cards.length - 1 && (
                <div 
                  className="hidden md:block absolute top-1/2 left-1/2 w-[2px] bg-gradient-to-b from-white/20 via-white/5 to-white/20 -z-10 h-[calc(100%+3rem)] lg:h-[calc(100%+4rem)]" 
                  style={{ transform: 'translateX(-50%)' }} 
                />
              )}
              {idx === 0 ? (
                // Placeholder 1: Fully Automated Orbital Timeline (Larger size)
                <div className="w-full max-w-[530px] h-[375px] md:h-[420px] bg-black border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center">
                   <RadialOrbitalTimeline timelineData={timelineData} />
                </div>
              ) : idx === 1 ? (
                // Placeholder 2: Globe CDN Animation
                <div className="w-full max-w-[530px] h-[375px] md:h-[420px] bg-black border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center p-4">
                   <div className="w-full max-w-sm">
                      <GlobeCdn />
                   </div>
                </div>
              ) : idx === 2 ? (
                // Placeholder 3: MacOS Dashboard Demo
                <div className="w-full max-w-[530px] h-[375px] md:h-[420px] bg-black border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center p-0">
                   <div className="w-full h-full flex items-center justify-center">
                      <WisingMacOSDemo />
                   </div>
                </div>
              ) : (
                // Other Placeholders: Keep them as empty blueprints
                <div className="w-full max-w-[360px] h-[280px] md:h-[320px] bg-black border border-white/10 shadow-2xl rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                   
                   <div className="relative flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <div className="w-20 h-20 rounded-full border border-white/20 border-dashed animate-[spin_20s_linear_infinite]" />
                      <div className="absolute w-12 h-12 rounded-full border border-white/30 border-dashed animate-[spin_10s_linear_infinite_reverse]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 bg-white/50 rounded-full blur-[1px]" />
                      </div>
                   </div>
                   
                   <p className="mt-8 font-['Manrope',sans-serif] text-[10px] uppercase tracking-[0.6em] font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                      Placeholder {idx + 1}
                   </p>
                </div>
              )}
            </motion.div>

          </div>
        ))}
      </div>
    </section>
  );
}
