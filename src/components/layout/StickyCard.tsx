import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StarBorder from '../ui/StarBorder';

interface StickyCardProps {
  children: React.ReactNode;
  index: number;
}

export function StickyCard({ children, index }: StickyCardProps) {
  const container = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of THIS specific card's relative wrapper.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start']
  });

  // Calculate the scale and visual effects based on how far this card is pushed back
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.4)"]);

  return (
    <div ref={container} className="h-screen w-full relative">
      <div 
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          style={{ scale, filter }}
          className="w-full h-full transform-origin-top relative"
        >
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
