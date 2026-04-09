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
 
  const isImageToken = typeof children === "string" && contentMapping[children];

  const content = isImageToken ? (
    <img src={contentMapping[children]} alt="icon" className="inline-block w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full object-cover align-middle border border-gray-200/20 shadow-lg mx-1" />
  ) : (
    children
  );

  return (
    <span className="relative mt-[12px] mr-2 text-2xl md:text-3xl lg:text-4xl font-semibold font-['Manrope',sans-serif] tracking-tight">
      <span className="absolute opacity-20">{content}</span>
      <motion.span style={{ opacity: opacity }}>{content}</motion.span>
    </span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
  
  const words = text.split(" ");
 
  return (
    <p ref={container} className="flex flex-wrap leading-snug p-4 justify-center">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
 
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
