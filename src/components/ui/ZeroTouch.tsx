"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "./google-gemini-effect";

export function ZeroTouchTrackingSection() {
  const ref = React.useRef(null);
  
  // Create scroll boundary triggers
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      className="h-[600vh] bg-transparent w-full relative overflow-clip border-t border-white/5 pt-0"
      ref={ref}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-0 pb-12">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
    </section>
  );
}
