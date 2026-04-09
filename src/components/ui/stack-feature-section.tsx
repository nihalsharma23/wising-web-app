import * as React from "react";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import wisingLogo from "../../assets/header_logo.png";

const iconConfigs = [
  { img: "https://cdn.brandfetch.io/id-pjrLx_q/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768404023648" },
  { img: "https://cdn.brandfetch.io/idzIUUVEBm/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752030331882" },
  { img: "https://cdn.brandfetch.io/id3WzK3p17/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1732603028282" },
  { img: "https://cdn.brandfetch.io/idZmHUWU0C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1772425942191" },
  { img: "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436" },
  { img: "https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1684846249499" },
  { img: "https://cdn.brandfetch.io/idqhjfYVWp/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1767805038314" },
  { img: "https://cdn.brandfetch.io/idwaPsWkO2/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1768330266012" },
  { img: "https://cdn.brandfetch.io/idcABCQwX-/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667570681287" },
  { img: "https://cdn.brandfetch.io/id3ddNjt-I/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667774930198" }
];

export default function StackFeatureSection() {
  const orbitCount = 4;
  const orbitGap = 8;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="relative w-full max-w-7xl mx-auto my-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between h-auto md:h-[40rem] border border-white/10 bg-[#0a0a0a] overflow-hidden rounded-[2.5rem] z-20 shadow-2xl">
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Left side: Heading and Text */}
      <div className="w-full md:w-[45%] z-10 py-16 md:py-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white font-['Syne',sans-serif] leading-[1.1] tracking-tight">
          Integrate Every Interface
        </h1>
        <p className="text-gray-400 font-['Manrope',sans-serif] text-lg mb-10 max-w-md leading-relaxed">
          Connect your favorite brokerage logic effortlessly. Wising scales with the tools you already rely on to handle real-time cross border tracking seamlessly.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-full px-8 py-6 text-base font-['Manrope',sans-serif]">
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-['Manrope',sans-serif]">
            View Directory
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation */}
      <div className="relative w-full md:w-[55%] h-[25rem] md:h-full flex items-center justify-center md:justify-start overflow-hidden mt-10 md:mt-0">
        <div className="relative w-[40rem] h-[40rem] md:w-[50rem] md:h-[50rem] md:translate-x-[30%] flex items-center justify-center">
          
          {/* Center Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#111] shadow-[0_0_50px_rgba(20,184,166,0.2)] flex items-center justify-center border border-white/10 z-10 relative">
            <img src={wisingLogo} alt="Wising" className="w-[60%] h-[60%] object-contain" />
            <div className="absolute inset-0 bg-teal-400 blur-2xl opacity-20 rounded-full pointer-events-none"></div>
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${14 + orbitGap * (orbitIdx + 1)}rem`; 
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-white/10"
                style={{
                  width: size,
                  height: size,
                  animation: `orbit-spin ${20 + orbitIdx * 10}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-[#1a1a1a] border border-white/10 rounded-full p-1.5 shadow-2xl flex items-center justify-center overflow-hidden"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          width: "3.5rem",
                          height: "3.5rem"
                        }}
                      >
                        <img
                          src={cfg.img}
                          alt="broker icon"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
