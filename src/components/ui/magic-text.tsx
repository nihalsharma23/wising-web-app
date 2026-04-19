"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
 
export interface MagicTextProps {
  text: string;
}

const contentMapping: Record<string, string> = {
  "[fidelity]": "https://cdn.brandfetch.io/idzIUUVEBm/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752030331882",
  "[zerodha]": "https://cdn.brandfetch.io/idZmHUWU0C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1772425942191",
  "[groww]": "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436",
  "[robinhood]": "https://cdn.brandfetch.io/id3WzK3p17/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1732603028282",
  "[binance]": "https://cdn.brandfetch.io/id-pjrLx_q/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768404023648"
};
 
interface WordProps {
  children: string;
  progress: any;
  range: number[];
}
 
const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const blurValue = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blurValue, (b) => `blur(${b}px)`);
 
  const isImageToken = typeof children === "string" && contentMapping[children];

  const content = isImageToken ? (
    <img src={contentMapping[children]} alt="icon" className="inline-block w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover align-middle border border-gray-200/20 shadow-lg mx-1" />
  ) : (
    children
  );

  return (
    <span className="relative mt-2 mr-3 text-2xl md:text-4xl lg:text-[3.5rem] font-bold font-['Syne',sans-serif] tracking-tighter leading-[1.1]">
      <span className="absolute opacity-10 blur-sm">{content}</span>
      <motion.span style={{ opacity, y, filter }} className="inline-block">{content}</motion.span>
    </span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);
 
  // Offset changed to make reveal slower (over a longer scroll distance).
  // "start 0.8" = starts revealing when top of container hits 80% of screen.
  // "start 0.3" = finishes revealing when top of container hits 30% of screen.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.3"],
  });
  
  const words = text.split(" ");
 
  return (
    <p ref={container} className="flex flex-wrap leading-relaxed p-4 justify-start max-w-full">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
 
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
