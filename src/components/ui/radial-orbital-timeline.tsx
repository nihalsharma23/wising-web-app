"use client";
import React, { useState, useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import imgHeaderLogo from "../../assets/header_logo.png";

export interface TimelineItem {
  id: number;
  title: string;
  brokerName: string;
  logoUrl: string;
  portfolioValue: string;
  date: string;
  content: string;
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  
  // Animation States
  const [animatedNodeStatus, setAnimatedNodeStatus] = useState<Record<number, "pending" | "in-progress" | "completed">>({});
  const [animatedEnergy, setAnimatedEnergy] = useState<Record<number, number>>({});
  const [portfolioVisible, setPortfolioVisible] = useState<Record<number, boolean>>({});
  const [currentAutoIndex, setCurrentAutoIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  
  const centerOffset = { x: 0, y: 0 };
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!isAnimating || timelineData.length === 0) return;

    let energyInterval: NodeJS.Timeout;
    let isCancelled = false;

    const runSequence = async () => {
      const nodeIndex = currentAutoIndex;
      const item = timelineData[nodeIndex];
      const nodeId = item.id;

      // 1. Rotate to top (270 deg)
      const targetAngle = 270 - (nodeIndex / timelineData.length) * 360;
      setRotationAngle(targetAngle);
      
      await new Promise(r => setTimeout(r, 1000));
      if (isCancelled || !mountedRef.current) return;

      // 2. Open card
      setExpandedItems({ [nodeId]: true });
      
      // Initialize states
      setAnimatedNodeStatus(prev => ({ ...prev, [nodeId]: 'pending' }));
      setAnimatedEnergy(prev => ({ ...prev, [nodeId]: 0 }));
      setPortfolioVisible(prev => ({ ...prev, [nodeId]: false }));

      await new Promise(r => setTimeout(r, 800));
      if (isCancelled || !mountedRef.current) return;

      // 3. Status sequence & Energy
      setAnimatedNodeStatus(prev => ({ ...prev, [nodeId]: 'in-progress' }));
      
      const energyStart = Date.now();
      energyInterval = setInterval(() => {
         if (isCancelled || !mountedRef.current) {
            clearInterval(energyInterval);
            return;
         }
         const elapsed = Date.now() - energyStart;
         const progress = Math.min(100, (elapsed / 2000) * 100);
         setAnimatedEnergy(prev => ({ ...prev, [nodeId]: progress }));
         
         if (progress >= 100) clearInterval(energyInterval);
      }, 50);

      await new Promise(r => setTimeout(r, 2000));
      if (isCancelled || !mountedRef.current) return;

      // Ensure 100%
      setAnimatedEnergy(prev => ({ ...prev, [nodeId]: 100 }));

      // 4. Status connected & reveal portfolio
      setAnimatedNodeStatus(prev => ({ ...prev, [nodeId]: 'completed' }));
      setPortfolioVisible(prev => ({ ...prev, [nodeId]: true }));

      // 5. Hold for 1500ms
      await new Promise(r => setTimeout(r, 1500));
      if (isCancelled || !mountedRef.current) return;

      // 6. Close card
      setExpandedItems({});
      await new Promise(r => setTimeout(r, 400));
      if (isCancelled || !mountedRef.current) return;

      // Move to next node
      setCurrentAutoIndex((prev) => (prev + 1) % timelineData.length);
    };

    runSequence();

    return () => {
      isCancelled = true;
      if (energyInterval) clearInterval(energyInterval);
    };
  }, [currentAutoIndex, isAnimating, timelineData]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 160; // Adjusted for placeholder size (from 200)
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusDisplay = (status: "completed" | "in-progress" | "pending") => {
    switch (status) {
      case "pending": return { label: "Pending", style: "text-white/60 bg-black/40 border-white/20" };
      case "in-progress": return { label: "Retrieving Data", style: "text-yellow-300 bg-yellow-900/30 border-yellow-400/40 animate-pulse" };
      case "completed": return { label: "Connected", style: "text-green-400 bg-green-900/30 border-green-400/50" };
    }
  };

  const getCurrencySymbol = (brokerName: string) => {
    const usBrokers = ["Interactive Brokers", "Fidelity", "Robinhood"];
    return usBrokers.some(b => brokerName.toLowerCase().includes(b.toLowerCase())) ? "$" : "₹";
  };

  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-transparent overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-all duration-1000"
          style={{ perspective: "1000px" }}
        >
          {/* Center Logo - Navy Blue Glow (No Container) */}
          <div className="absolute w-28 h-28 flex items-center justify-center z-20">
            <div className="absolute inset-2 bg-[#001f3f] opacity-80 blur-[24px] rounded-full pointer-events-none"></div>
            <img src={imgHeaderLogo} alt="Wising" className="relative w-full h-full object-contain z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" />
          </div>

          <div className="absolute w-80 h-80 rounded-full border border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const currentStatus = animatedNodeStatus[item.id] || "pending";
            const currentEnergy = animatedEnergy[item.id] || 0;
            const isVisibleValuation = portfolioVisible[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            const statusDisplay = getStatusDisplay(currentStatus);
            
            let energyLabel = "Connecting...";
            if (currentEnergy >= 40 && currentEnergy < 85) energyLabel = "Retrieving Data...";
            else if (currentEnergy >= 85) energyLabel = "Connected";

            const energyColor = currentEnergy >= 85 ? "from-green-400 to-emerald-500" : "from-blue-500 to-purple-500";

            return (
              <div
                key={item.id}
                className="absolute transition-all duration-[1000ms] ease-in-out"
                style={nodeStyle}
              >
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center bg-black/80
                  border-2 transition-all duration-300 transform overflow-hidden
                  ${isExpanded ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] ring-2 ring-white/60 scale-150" : "border-white/40"}
                `}
                >
                  <img src={item.logoUrl} alt={item.brokerName} className="w-full h-full object-cover rounded-full" />
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-2xl shadow-black overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader className="pb-1">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 py-0.5 text-[10px] ${statusDisplay.style}`}>
                          {statusDisplay.label}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/50">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-1 font-['Manrope',sans-serif] text-white">{item.brokerName}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80 pb-3">
                      <p className="opacity-60 text-[11px] leading-tight mb-2">Establishing secure connection and retrieving global assets.</p>

                      <div className="mt-2 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] mb-2 text-white/70">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            {energyLabel}
                          </span>
                          <span className="font-mono">{Math.floor(currentEnergy)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${energyColor} transition-all duration-100 ease-linear`}
                            style={{ width: `${currentEnergy}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 overflow-hidden h-[60px] relative">
                         <h4 className="text-[10px] uppercase tracking-wider font-medium text-white/50 mb-1">
                            Portfolio Synced
                         </h4>
                         <div className={`transition-all duration-400 ${isVisibleValuation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                            <div className="text-2xl font-mono font-bold text-green-400">
                               {getCurrencySymbol(item.brokerName)}{item.portfolioValue}
                            </div>
                            <div className="text-[9px] text-white/40 mt-0.5">Total Account Value</div>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
