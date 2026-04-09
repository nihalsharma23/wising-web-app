"use client"

import * as React from "react"
import { motion } from "framer-motion"

const avatars = [
  {
    id: 'ca',
    title: 'Your CA',
    img: 'https://img.icons8.com/color/512/businessman.png',
    message: 'Some anomaly detected in your current cross border transaction.',
    delay: 0,
  },
  {
    id: 'cpa',
    title: 'Your CPA',
    img: 'https://img.icons8.com/color/512/businesswoman.png',
    message: 'I have rectified your Cross border transaction.',
    delay: 4,
  },
  {
    id: 'wm',
    title: 'Your Wealth Manager',
    img: 'https://img.icons8.com/color/512/manager.png',
    message: 'Ahh! You have added a new asset to your portfolio.',
    delay: 8,
  }
];

export default function CACPASection() {
  return (
    <section className="bg-white text-black py-32 px-4 md:px-12 lg:px-24 border-t border-gray-200 z-20 relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-['Syne',sans-serif] text-center mb-12 tracking-tight text-gray-900">
          Active Sync
        </h2>

        {/* Animated Avatar Box */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-y-[10rem] gap-x-12 md:gap-x-24 pt-[8rem] mb-16 w-full">
          
          {/* Connection Lines */}
          <div className="hidden md:block absolute bottom-[60px] left-[25%] right-[25%] h-0 border-b-[3px] border-dashed border-teal-500/40 z-0"></div>
          <div className="md:hidden absolute top-[25%] bottom-[25%] left-1/2 -translate-x-1/2 w-0 border-l-[3px] border-dashed border-teal-500/40 z-0"></div>
          
          {/* Avatars */}
          {avatars.map((avatar) => (
            <div key={avatar.id} className="relative flex flex-col items-center w-full md:w-56 z-10">
              
              {/* Chat Bubble animated sequence */}
              <motion.div
                className="absolute bottom-[110%] mb-4 w-[280px] bg-gray-50 border border-gray-200 text-gray-900 p-5 rounded-3xl shadow-xl z-20 text-sm font-['Manrope',sans-serif] text-center font-medium"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [-10, 0, 0, 10],   // Enter from top, settle, exit dropping down
                  scale: [0.95, 1, 1, 0.95]
                }}
                transition={{
                  duration: 4, 
                  times: [0, 0.1, 0.9, 1], // Fade in fast, hold for 80%, fade out fast
                  repeat: Infinity,
                  repeatDelay: 8, 
                  delay: avatar.delay
                }}
              >
                {/* Tail for bubble */}
                <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-50 border-b border-r border-gray-200 transform rotate-45"></div>
                {avatar.message}
              </motion.div>

              <h3 className="text-lg font-extrabold font-['Manrope',sans-serif] mb-5 text-gray-900 tracking-wide">{avatar.title}</h3>
              
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 transition-transform hover:scale-105 duration-300 ring-4 ring-teal-500/10 bg-gray-50">
                <img src={avatar.img} alt={avatar.title} className="w-full h-full object-cover transition-all duration-500 p-2" />
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 font-['Manrope',sans-serif] text-[18px] md:text-xl text-center max-w-3xl leading-relaxed mt-10">
          Share verified financial data securely with your CA, CPA or your Wealth Manager. Everyone on the same page without manual back-and-forth information sharing.
        </p>
      </div>
    </section>
  )
}
