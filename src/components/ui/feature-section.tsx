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
  const headline = "Managing Global Wealth Means Guessing The Laws Every Time.";
  const bottomText = "Same Wealth. Better Protection.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section className="relative w-full pt-[5px] pb-32 px-4 bg-transparent text-white font-['Manrope',sans-serif]">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start gap-16">
        
        {/* LEFT SIDE - Content */}
        <div className="space-y-8 flex-1 order-2 md:order-1 pt-14">
          <Badge variant="secondary" className="px-6 py-2 text-[13px] bg-black text-white border border-white/20 rounded-full font-['Manrope',sans-serif] font-bold tracking-wider w-max">
            The Problem
          </Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight font-['Manrope',sans-serif] capitalize !text-white"
          >
            Managing Global Wealth Means Guessing The Laws Every Time.
          </motion.h2>
        </div>
 
        {/* RIGHT SIDE - Task Loop with Vertical Bar */}
        <div className="relative w-full max-w-sm flex-1 order-1 md:order-2 flex flex-col items-center pt-14">
          
          <div className="w-full max-w-xs mb-10">
            <Badge variant="secondary" className="px-6 py-2 text-[13px] bg-black text-white border border-white/20 rounded-full font-['Manrope',sans-serif] font-bold tracking-wider w-max break-words whitespace-normal text-left">
              Average Cost Of Manual Cross-Border Wealth
            </Badge>
          </div>
 
          <Card className="overflow-hidden glass-navy-container border-white/10 shadow-2xl rounded-[2rem] relative w-full h-[420px]">
            <CardContent className="relative h-full p-0 overflow-hidden">
              
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
                      className="flex items-center gap-3 px-5 py-3 border-b border-white/5 relative"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-500/10 w-10 h-10 rounded-xl flex items-center justify-center border border-red-500/20">
                            {task.icon}
                          </div>
                          <div className="font-['Manrope',sans-serif]">
                            <p className="text-sm font-semibold text-white tracking-wide">{task.title}</p>
                            <p className="text-[11px] font-medium text-red-500 mt-0.5">{task.subtitle}</p>
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
              <div className="absolute bottom-0 left-0 w-full bg-[#0a0a0a]/60 backdrop-blur-xl border-t border-white/10 p-5 z-20 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.6)]">
                 <div className="flex items-center gap-3 w-full">
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                      <ShieldCheck className="text-white/80 w-5 h-5 drop-shadow-md" />
                    </div>
                    <div>
                      <motion.p 
                        className="text-[15px] font-bold tracking-[0.2em] uppercase font-['Manrope',sans-serif] text-white"
                      >
                        With Wising
                      </motion.p>
                      <p className="text-[11px] font-bold text-white tracking-wider mt-0.5 font-['Manrope',sans-serif]">$0 Penalties + 100% Automation</p>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>
 
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-lg md:text-xl font-semibold !text-white font-['Manrope',sans-serif] tracking-tight mt-10 w-full z-30"
          >
            Same Wealth. Better Protection.
          </motion.p>
        </div>
 
      </div>
    </section>
  );
}
