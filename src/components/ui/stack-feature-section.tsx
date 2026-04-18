import * as React from "react";
import wisingLogo from "../../assets/header_logo.png";

const iconConfigs = [
  { img: "https://cdn.brandfetch.io/id-pjrLx_q/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1768404023648" },
  { img: "https://cdn.brandfetch.io/idzIUUVEBm/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1752030331882" },
  { img: "https://cdn.brandfetch.io/id3WzK3p17/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1732603028282" },
  { img: "https://cdn.brandfetch.io/idZmHUWU0C/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1772425942191" },
  { img: "https://cdn.brandfetch.io/id02rL-aAO/theme/dark/icon.svg?c=1bxid64Mup7aczewSAYMX&t=1767861092436" },
  { img: "https://cdn.brandfetch.io/idwDWo4ONQ/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1684846249499" },
  { img: "https://cdn.brandfetch.io/idqhjfYVWp/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1767805038314" },
  { img: "https://cdn.brandfetch.io/idwaPsWkO2/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1768330266012" }
];

export default function StackFeatureSection() {
  const orbitStructure = [
    { count: 3, offset: 0 },
    { count: 3, offset: 3 },
    { count: 2, offset: 6 }
  ];

  return (
    <section className="relative w-full h-[35rem] overflow-hidden flex flex-col items-center justify-start pt-16 z-20">
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      {/* Top Header */}
      <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center gap-4 z-30 px-6 mt-4 md:mt-8">
        <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white font-['Manrope',sans-serif] tracking-tight">
          Integrate Every Interface.
        </h1>
        <p className="text-gray-400 font-['Manrope',sans-serif] text-base md:text-lg text-center leading-relaxed max-w-2xl">
          Connect your favorite brokerage logic effortlessly. Wising scales with the tools you already rely on.
        </p>
      </div>

      {/* Bottom Orbit Animation */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] flex items-center justify-center">
          
          {/* Raw Wising Logo at Center */}
          <div className="absolute z-20 -translate-y-[4rem] md:-translate-y-[5.5rem] flex flex-col items-center justify-center">
            {/* Navy Blue Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-16 md:h-24 bg-blue-900/80 blur-2xl rounded-full pointer-events-none"></div>
            <img src={wisingLogo} alt="Wising" className="relative w-20 md:w-28 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
          </div>

          {/* Generate Orbits */}
          {orbitStructure.map((orbit, orbitIdx) => {
            const size = `${16 + 6 * (orbitIdx + 1)}rem`; 
            const angleStep = (2 * Math.PI) / orbit.count;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  animation: `orbit-spin ${30 + orbitIdx * 15}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbit.offset, orbit.offset + orbit.count)
                   .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute flex items-center justify-center overflow-hidden"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          width: "3rem",
                          height: "3rem"
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
