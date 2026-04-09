"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface HeroTextProps {
  text?: string;
  className?: string;
}
export default function HeroText({
  text = "COMPLIANCE",
  className = "",
}: HeroTextProps) {
  const [count, setCount] = useState(0);
  const characters = text.split("");
  return (
    <div
      className={`relative flex flex-col items-center justify-center h-full w-full 
      bg-transparent transition-colors duration-700 ${className}`}
    >
      
      {/* Main Text Container */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            className="flex flex-wrap justify-center items-center w-full"
          >
            {characters.map((char, i) => (
              <div
                key={i}
                className="relative px-[0.1vw] overflow-hidden group"
              >
                {/* Main Character - Responsive sizing using vw */}
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                  className="text-[9.5vw] sm:text-[8vw] leading-none text-white tracking-tighter"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
                {/* Top Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[9.5vw] sm:text-[8vw] leading-none text-white z-10 pointer-events-none"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)", fontFamily: "'Inter', sans-serif" }}
                >
                  {char}
                </motion.span>
                {/* Middle Slice Layer */}
                <motion.span
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[9.5vw] sm:text-[8vw] leading-none text-white/80 z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)", fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {char}
                </motion.span>
                {/* Bottom Slice Layer */}
                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[9.5vw] sm:text-[8vw] leading-none text-white z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)", fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
}
