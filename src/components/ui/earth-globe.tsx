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
  const brightness = useTransform(scrollY, [0, scrollRange / 2, scrollRange], [0.7, 0.9, 1.2]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  // City lights data for major financial hubs
  const cityLights = [
    { lat: 40.7128, lng: -74.0060, size: 0.15 }, // NY
    { lat: 51.5074, lng: -0.1278, size: 0.15 }, // London
    { lat: 19.0760, lng: 72.8777, size: 0.15 }, // Mumbai
    { lat: 1.3521, lng: 103.8198, size: 0.15 }, // Singapore
    { lat: 35.6762, lng: 139.6503, size: 0.15 }, // Tokyo
    { lat: 37.7749, lng: -122.4194, size: 0.15 }, // SF
    { lat: 25.2048, lng: 55.2708, size: 0.15 }, // Dubai
    { lat: 22.3193, lng: 114.1694, size: 0.15 }, // HK
    { lat: -33.8688, lng: 151.2093, size: 0.15 }, // Sydney
    { lat: 48.8566, lng: 2.3522, size: 0.15 }, // Paris
    { lat: 55.7558, lng: 37.6173, size: 0.15 }, // Moscow
    { lat: 30.0444, lng: 31.2357, size: 0.15 }, // Cairo
    { lat: -26.2041, lng: 28.0473, size: 0.15 }, // Johannesburg
    { lat: -34.6037, lng: -58.3816, size: 0.15 }, // Buenos Aires
  ];

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
    
    const extraSpeed = Math.min(Math.abs(latestVelocity) * 0.003, 5.0);
    globeEl.current.controls().autoRotateSpeed = 0.5 + extraSpeed;
  });

  if (!mounted) return null;

  return (
    <div className="sticky top-0 w-full h-screen pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
        <motion.div 
            className="w-[1024px] h-[1024px] max-w-[100vw] max-h-[100vw] mix-blend-screen"
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
                atmosphereColor="#4e6699"
                atmosphereDayAlpha={0.2}
                showStars={true}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                width={1024}
                height={1024}
                pointsData={cityLights}
                pointAltitude={0.015}
                pointColor={() => "#fff6d9"}
                pointRadius="size"
                pointsMerge={true}
                rendererConfig={{
                  antialias: true,
                  precision: 'highp',
                  powerPreference: 'high-performance'
                }}
            />
        </motion.div>
    </div>
  );
}
