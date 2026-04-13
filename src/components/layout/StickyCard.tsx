import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyCardProps {
  children: React.ReactNode;
  index: number;
}

export function StickyCard({ children, index }: StickyCardProps) {
  const container = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of THIS specific card's relative wrapper.
  // It starts when the top of the container hits the top of the viewport
  // and ends when the bottom of the container hits the top of the viewport 
  // (which is exactly when the next card's top hits the viewport).
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  });

  // Calculate the scale and visual effects based on how far this card is pushed back
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  // Calculate top padding so they visually stack over each other
  const topOffset = `calc(1rem + ${index * 10}px)`;

  return (
    <div ref={container} className="h-screen w-full relative">
      <div 
        className="sticky top-[80px] h-[calc(100vh-90px)] w-full flex items-center justify-center px-2 md:px-6 pb-2"
      >
        <motion.div 
          style={{ scale, filter }}
          className="w-full h-full transform-origin-top relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-[#020202]/95 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(255,255,255,0.05)] ring-1 ring-white/5"
        >
          {/* Top Edge Corner Shine highlights */}
          <div className="absolute top-0 left-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 -top-[50px] h-[100px] w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="w-full h-full overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
             <div className="min-h-full flex flex-col items-center justify-center">
                 {children}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
