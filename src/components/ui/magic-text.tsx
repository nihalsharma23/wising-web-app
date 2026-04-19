"use client" 

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 
export interface MagicTextProps {
  text: string;
  className?: string; // For the outer paragraph
  wordClassName?: string; // For each word span
  iconSizeClassName?: string; // Optional custom icon size
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
  wordClassName?: string;
  iconSizeClassName?: string;
}
  
const Word: React.FC<WordProps> = ({ children, progress, range, wordClassName, iconSizeClassName }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const blurValue = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blurValue, (b) => `blur(${b}px)`);
 
  const isImageToken = typeof children === "string" && contentMapping[children];

  const content = isImageToken ? (
    <img 
      src={contentMapping[children]} 
      alt="icon" 
      className={cn("inline-block rounded-full object-cover align-middle border border-gray-200/20 shadow-lg mx-1", 
         iconSizeClassName || "w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
      )} 
    />
  ) : (
    children
  );

  return (
    <span className={cn("relative mt-2 mr-2 leading-tight", wordClassName)}>
      <span className="absolute opacity-10 blur-sm">{content}</span>
      <motion.span style={{ opacity, y, filter }} className="inline-block">{content}</motion.span>
    </span>
  );
};
 
export const MagicText: React.FC<MagicTextProps> = ({ text, className, wordClassName, iconSizeClassName }) => {
  const container = useRef(null);
 
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.3"],
  });
  
  const words = text.split(" ");
 
  return (
    <p ref={container} className={cn("flex flex-wrap leading-relaxed p-4 justify-start max-w-full", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
 
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            wordClassName={wordClassName}
            iconSizeClassName={iconSizeClassName}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};
