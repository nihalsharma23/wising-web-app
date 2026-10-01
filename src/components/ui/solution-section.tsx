import * as React from "react";
import { Badge } from "./badge";
import { MagicText } from "./magic-text";
import { motion } from 'framer-motion';
import RadialOrbitalTimeline, { TimelineItem } from "./radial-orbital-timeline";
import { GlobeCdn } from "./cobe-globe-cdn";
import LaserFlow from "./LaserFlow";

const cards = [
  {
    title: 'UNIFIED DATA INTAKE',
    desc: "Simply enter the client's raw India and US financial facts once. Wising's engine takes over from there, eliminating the need to keep separate, fragmented spreadsheets lined up by hand.",
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    title: 'SIMULTANEOUS COMPUTATION',
    desc: 'Our engine computes taxes for both countries simultaneously while applying relevant tax treaties. It instantly flags cross-border conflicts, double taxation risks, and handles complex foreign tax credits.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    title: 'UNIFIED DASHBOARD',
    desc: "Wising acts as your continuous monitor, instantly flagging exactly what needs to be filed and when in both countries, freeing you to focus on high-level strategy rather than manual reconciliation.",
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

const timelineData: TimelineItem[] = [
  { id: 1, title: "Client Intake", brokerName: "Client Intake", logoUrl: "", iconName: "FileText", portfolioValue: "2,450", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 2, title: "Data Normalization", brokerName: "Data Normalization", logoUrl: "", iconName: "Database", portfolioValue: "1,900", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 3, title: "Dual Tax Engine", brokerName: "Dual Tax Engine", logoUrl: "", iconName: "Cpu", portfolioValue: "4,100", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 4, title: "Conflict Analyzer", brokerName: "Conflict Analyzer", logoUrl: "", iconName: "AlertTriangle", portfolioValue: "1,200", status: "pending", energy: 100, date: "Active", content: "" },
  { id: 5, title: "Monitoring", brokerName: "Monitoring", logoUrl: "", iconName: "LayoutDashboard", portfolioValue: "3,780", status: "pending", energy: 100, date: "Active", content: "" }
];

export default function SolutionSection() {
  return (
    <section className="relative w-full pt-8 pb-20 px-2 md:px-12 lg:px-24 flex flex-col gap-16 z-20">
      
      {/* HEADER PART */}
      <div className="flex flex-col items-center text-center gap-4">
        <Badge variant="secondary" className="px-5 py-2.5 text-[14px] bg-black/50 border border-white/10 backdrop-blur-md text-white/90 rounded-full font-['Manrope',sans-serif] font-semibold tracking-wider w-max mx-auto mb-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          The Solution
        </Badge>
        <MagicText 
          text="We built the ultimate cross-border tax engine. Wising automates the entire backend of your engagement by seamlessly reconciling tax codes and treaties. By eliminating the fragmented, manual workflows that cap your capacity, Wising cuts prep time by 50% to help your firm overcome stagnant profit margins. Double your client capacity and unlock new revenue growth, freeing you to focus on high-level tax strategy."
          className="justify-center"
          wordClassName="text-xl md:text-2xl lg:text-[2.25rem] font-medium leading-[1.3] tracking-tight font-['Manrope',sans-serif] text-white/90"
        />
      </div>

      {/* TWO COLUMN CONTENT PART */}
      {/* TWO COLUMN CONTENT PART */}
      <div className="flex flex-col items-center justify-center gap-12 lg:gap-20 relative z-10">
        {cards.map((card, idx) => {
          const { title, desc, gradientFrom, gradientTo } = card;

          return (
            <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full max-w-[1200px] ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* LEFT COLUMN: The Content Card */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`group relative ${idx === 2 ? "flex-[0.8]" : "flex-[1]"} w-full max-w-[420px] min-h-[280px] md:min-h-[320px] transition-all duration-500 z-10`}
              >
                {/* Skewed gradient panels */}
                <span
                  className="absolute top-[10%] left-[30px] w-[50%] h-[80%] rounded-3xl transform skew-x-[12deg] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] z-0"
                  style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                    opacity: 0.6
                  }}
                />
                <span
                  className="absolute top-[10%] left-[30px] w-[50%] h-[80%] rounded-3xl transform skew-x-[12deg] blur-[40px] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-30px)] opacity-20 group-hover:opacity-60 z-0"
                  style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                />

                {/* Content Box */}
                <div className="relative z-20 w-full h-full min-h-[280px] md:min-h-[320px] p-8 glass-navy-container border-white/5 shadow-2xl rounded-3xl text-white transition-all duration-500 group-hover:translate-y-[-10px] flex flex-col items-start justify-center text-left">
                  <h2 className="text-2xl lg:text-3xl mb-4 font-bold font-['Manrope',sans-serif] tracking-[0.1em] uppercase leading-none text-white">
                    {title}
                  </h2>
                  <p className="text-base lg:text-lg text-white/90 leading-relaxed font-['Manrope',sans-serif] font-medium tracking-tight">
                    {desc}
                  </p>
                </div>
              </motion.div>

              {/* RIGHT COLUMN: The Visual Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`${idx === 2 ? "flex-[1.4]" : "flex-[1]"} w-full flex justify-center relative z-10`}
              >
                {/* Vertical Connecting Line */}
                {idx < cards.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-1/2 left-1/2 w-[2px] bg-gradient-to-b from-white/20 via-white/5 to-white/20 -z-10 h-[calc(100%+3rem)] lg:h-[calc(100%+4rem)]" 
                    style={{ transform: 'translateX(-50%)' }} 
                  />
                )}
                {idx === 0 ? (
                  // Step 1: Data Intake Flow
                  <div className="w-full max-w-[530px] h-[375px] md:h-[420px] bg-black border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center">
                     <RadialOrbitalTimeline timelineData={timelineData} />
                  </div>
                ) : idx === 1 ? (
                  // Step 2: Conflict Flagging Globe
                  <div className="w-full max-w-[530px] h-[375px] md:h-[420px] bg-black border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center p-4">
                     <div className="w-full max-w-sm">
                        <GlobeCdn />
                     </div>
                  </div>
                ) : idx === 2 ? (
                  // Step 3: Dashboard GIF - Larger width, aspect ratio preserved
                  <div className="w-full max-w-[700px] h-auto aspect-[16/10] bg-[#0c0c14] border border-white/10 shadow-2xl rounded-3xl overflow-hidden relative group flex items-center justify-center p-0">
                     <img src="/monitorwalkthroughv2.gif" alt="Wising Dashboard Proof of Concept" className="w-full h-full object-contain" />
                  </div>
                ) : null}
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
