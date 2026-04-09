import * as React from "react";
import { Card, CardContent } from "./card"; 
import { Badge } from "./badge";
import { motion } from "framer-motion";
import { AlertTriangle, DollarSign, FileText, Activity, ShieldCheck } from "lucide-react";

const tasks = [
  { title: "Undetected PFIC", subtitle: "$5,000+", icon: <AlertTriangle className="text-red-500 w-5 h-5 flex-shrink-0" /> },
  { title: "IRS/FEMA FINES", subtitle: "$10,000+", icon: <DollarSign className="text-red-500 w-5 h-5 flex-shrink-0" /> },
  { title: "The 'Double Tax' Trap", subtitle: "$8,500/Yr", icon: <FileText className="text-red-500 w-5 h-5 flex-shrink-0" /> },
  { title: "DIY Spread Sheets", subtitle: "100+hrs/Yr", icon: <Activity className="text-red-500 w-5 h-5 flex-shrink-0" /> },
];

export default function FeatureSection() {
  return (
    <section className="relative w-full py-32 px-4 bg-black text-white font-['Syne',sans-serif]">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start gap-16">
        
        {/* LEFT SIDE - Content */}
        <div className="space-y-6 flex-1 order-2 md:order-1">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-white/10 text-white hover:bg-white/20 border-0 rounded-full font-['Manrope',sans-serif] w-max">
            The Problem
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight font-['Manrope',sans-serif] capitalize">
            Managing Global Wealth Means Guessing The Laws Every Time.
          </h2>
        </div>

        {/* RIGHT SIDE - Task Loop with Vertical Bar */}
        <div className="relative w-full max-w-md flex-1 order-1 md:order-2 flex flex-col items-center">
          
          <div className="w-full max-w-sm mb-4">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm bg-white/10 text-white hover:bg-white/20 border-0 rounded-full font-['Manrope',sans-serif] w-max break-words whitespace-normal text-left">
              Average Cost of Manual Cross-Border Wealth
            </Badge>
          </div>

          <Card className="overflow-hidden bg-[#111111]/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl relative w-full max-w-sm">
            <CardContent className="relative h-[400px] p-0 overflow-hidden">
              
              {/* Scrollable Container */}
              <div className="relative h-full overflow-hidden pb-[80px]">
                {/* Motion list */}
                <motion.div
                  className="flex flex-col absolute w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                  }}
                >
                  {[...tasks, ...tasks].map((task, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-6 py-[18px] border-b border-white/5 relative"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-red-500/20">
                            {task.icon}
                          </div>
                          <div className="font-['Manrope',sans-serif]">
                            <p className="text-base font-semibold text-white tracking-wide">{task.title}</p>
                            <p className="text-sm font-medium text-red-500 mt-0.5">{task.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Fade effect top */}
                <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#111111] to-transparent pointer-events-none z-10" />
              </div>

              {/* Sticky bottom bar inside card */}
              <div className="absolute bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-teal-500/30 p-5 z-20 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)]">
                 <div className="flex items-center gap-4 w-full">
                    <div className="bg-teal-500/20 w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center border border-teal-500/40">
                      <ShieldCheck className="text-teal-400 w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[17px] font-bold text-white tracking-wide font-['Syne',sans-serif]">With Wising</p>
                      <p className="text-[14px] font-light text-green-400 tracking-wider mt-0.5 font-['Manrope',sans-serif]">$0 Penalties + 100% Automation</p>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xl md:text-2xl font-semibold text-white font-['Manrope',sans-serif] tracking-tight mt-6">
            Same Wealth. Better Protection.
          </p>
        </div>

      </div>
    </section>
  );
}
