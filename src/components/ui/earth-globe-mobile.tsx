"use client";

import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useScroll, useVelocity, useMotionValueEvent, useSpring } from 'framer-motion';

interface EarthGlobeMobileProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function EarthGlobeMobile({ containerRef }: EarthGlobeMobileProps) {
  const globeEl = useRef<GlobeMethods>();
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState(600);

  // Track scroll within the parent sticky container
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  const cityLights = [
    { lat: 40.7128, lng: -74.0060, size: 0.15 },
    { lat: 51.5074, lng: -0.1278, size: 0.15 },
    { lat: 19.0760, lng: 72.8777, size: 0.15 },
    { lat: 1.3521, lng: 103.8198, size: 0.15 },
    { lat: 35.6762, lng: 139.6503, size: 0.15 },
    { lat: 37.7749, lng: -122.4194, size: 0.15 },
    { lat: 25.2048, lng: 55.2708, size: 0.15 },
    { lat: 22.3193, lng: 114.1694, size: 0.15 },
  ];

  useEffect(() => {
    const updateSize = () => setSize(Math.min(window.innerWidth * 1.6, 900));
    updateSize();
    window.addEventListener('resize', updateSize);
    setMounted(true);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (mounted && globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.5;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 3.0 }, 0);
    }
  }, [mounted]);

  // Speed up rotation as user scrolls
  useMotionValueEvent(smoothVelocity, "change", (v) => {
    if (!globeEl.current) return;
    const extra = Math.min(Math.abs(v) * 0.006, 12.0);
    globeEl.current.controls().autoRotateSpeed = 1.5 + extra;
  });

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex items-center justify-center mix-blend-screen">
      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#4e6699"
        atmosphereDayAlpha={0.2}
        showStars={false}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        width={size}
        height={size}
        pointsData={cityLights}
        pointAltitude={0.015}
        pointColor={() => "#fff6d9"}
        pointRadius="size"
        pointsMerge={true}
        rendererConfig={{ antialias: true, precision: 'highp', powerPreference: 'high-performance' }}
      />
    </div>
  );
}
