import React from 'react';
import { motion } from 'framer-motion';

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

export default function SkewCards() {
  return (
    <div className="w-full min-h-[500px] h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-0 lg:pt-0">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 transition-all duration-300">
        {cards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="group relative w-full max-w-[340px] h-[380px] lg:h-[420px] transition-all duration-500 z-10"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[40px] w-[50%] h-full rounded-3xl transform skew-x-[12deg] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[40px] w-[50%] h-full rounded-3xl transform skew-x-[12deg] blur-[40px] transition-all duration-700 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)] opacity-40 group-hover:opacity-100"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Content Box */}
            <div className="absolute inset-0 z-20 p-8 lg:p-10 bg-[#0a0a0a]/90 border border-white/5 backdrop-blur-[15px] shadow-2xl rounded-3xl text-white transition-all duration-500 group-hover:translate-y-[-10px] flex flex-col items-start justify-center text-left">
              
              <h2 className="text-3xl lg:text-4xl mb-6 font-bold font-['Syne',sans-serif] tracking-tighter uppercase leading-none">
                {title}
              </h2>
              
              <p className="text-lg lg:text-xl text-white leading-relaxed font-['Manrope',sans-serif] font-medium tracking-tight">
                {desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
