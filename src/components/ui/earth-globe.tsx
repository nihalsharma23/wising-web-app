"use client";

import React, { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { motion, useScroll, useTransform, useVelocity, useMotionValueEvent, useSpring } from 'framer-motion';

export default function EarthGlobe() {
  const globeEl = useRef<GlobeMethods>();
  const [mounted, setMounted] = React.useState(false);

  // Hook into page scroll
  const { scrollYProgress, scrollY } = useScroll();
  
  // Create a smoothed velocity
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Calculate dynamic properties mapping 0-100vh raw scroll roughly to progress [0, 0.15]
  // In a long scrolling lenis page, we can assume Hero -> Section 2 happens within the first 10-15% of scroll,
  // or more accurately in raw pixels. Let's map pixels for robust transitions.
  const scrollRange = typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1200;
  
  const scale = useTransform(scrollY, [0, scrollRange], [1.2, 0.8]);
  const xTranslate = useTransform(scrollY, [0, scrollRange], ["0vw", "25vw"]);
  
  // Brightness: start dim in hero (0.4), become bright (1.2) when moving aside.
  const brightness = useTransform(scrollY, [0, scrollRange / 2, scrollRange], [0.4, 0.8, 1.2]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && globeEl.current) {
      // Set initial state
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      
      // Default view
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
    }
  }, [mounted]);

  // Dynamically update rotation speed based on scroll velocity
  useMotionValueEvent(smoothVelocity, "change", (latestVelocity) => {
    if (!globeEl.current) return;
    
    // Base speed = 0.5. Add velocity-based extra speed. 
    // latestVelocity is typically in pixels per second.
    const extraSpeed = Math.min(Math.abs(latestVelocity) * 0.003, 5.0);
    
    // Determine scroll direction to spin specifically, or just spin faster in one direction
    const direction = latestVelocity > 0 ? 1 : -1;
    // By multiplying by direction we make it physically feel linked to scroll wheel
    // but the request is just "rotate earth faster", so absolute is also fine. Let's keep it spinning in normal direction (positive)
    
    globeEl.current.controls().autoRotateSpeed = 0.5 + extraSpeed;
  });

  if (!mounted) return null; // No fallback background square here since it's a fixed overlay

  return (
    <div className="sticky top-0 w-full h-screen pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
        <motion.div 
            className="w-[800px] h-[800px] max-w-[100vw] max-h-[100vw] mix-blend-screen"
            style={{ 
                scale,
                x: xTranslate,
                filter
            }}
        >
            <Globe
                ref={globeEl}
                backgroundColor="rgba(0,0,0,0)"
                showAtmosphere={true}
                atmosphereColor="#3a445e"
                atmosphereDayAlpha={0.1}
                showStars={true}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                width={800} // lock internal canvas size otherwise it flexes with window
                height={800}
            />
        </motion.div>
    </div>
  );
}
