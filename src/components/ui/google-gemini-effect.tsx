"use client";
import { cn } from "./utils";
import { motion, MotionValue, useTransform } from "framer-motion";
import React from "react";

const transition = {
  duration: 0,
  ease: "linear",
};

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  // Transform opacities for the labels so they only appear when the beam reaches the end
  const rightOpacity1 = useTransform(pathLengths[0], [0.95, 1], [0, 1]);
  const rightOpacity2 = useTransform(pathLengths[1], [0.95, 1], [0, 1]);
  const rightOpacity3 = useTransform(pathLengths[2], [0.95, 1], [0, 1]);
  const rightOpacity4 = useTransform(pathLengths[3], [0.95, 1], [0, 1]);

  const leftOpacity1 = useTransform(pathLengths[0], [0.95, 1], [0, 1]);
  const leftOpacity2 = useTransform(pathLengths[1], [0.95, 1], [0, 1]);
  const leftOpacity3 = useTransform(pathLengths[2], [0.95, 1], [0, 1]);
  const leftOpacity4 = useTransform(pathLengths[3], [0.95, 1], [0, 1]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use the average progress across paths to drive the global mask expansion
  // We want the mask to expand from the center (720) outward.
  const maskX = useTransform(pathLengths[2], [0, 1], [720, 0]);
  const maskWidth = useTransform(pathLengths[2], [0, 1], [0, 1440]);

  return (
    <div className={cn("sticky relative top-0 flex flex-col items-center", className)}>
      {/* SVG Engine Section - Focused on Jurisdictions */}
      <div className="w-full h-[900px] relative flex items-center justify-center mt-0 bg-transparent overflow-visible">
        
        {/* US Jurisdiction Anchor - Fixed Image & Scale */}
        <div className="absolute top-[340px] left-[2%] md:left-[4%] z-[80] opacity-100 pointer-events-auto">
            <div className="flex items-center gap-6 bg-black/50 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[2rem] shadow-[0_0_60px_rgba(16,185,129,0.15)] transition-all hover:border-emerald-500/40 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-emerald-500/20 p-1.5 overflow-hidden shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    <img src="https://www.irs.gov/pub/irs-utl/irs_seal_blue_gold.png" alt="IRS" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col items-start pr-2">
                    <h3 className="text-white text-xl md:text-2xl font-bold font-['Manrope',sans-serif] tracking-[0.25em] uppercase leading-none">US JURISDICTION</h3>
                    <div className="flex flex-col items-start gap-1 mt-3">
                        <span className="text-emerald-400 text-[12px] font-bold tracking-[0.3em] uppercase opacity-90">INTERNAL REVENUE SERVICE</span>
                    </div>
                </div>
            </div>
        </div>

        {/* India Jurisdiction Anchor - Fixed Image & Scale */}
        <div className="absolute top-[340px] right-[2%] md:right-[4%] z-[80] opacity-100 pointer-events-auto">
            <div className="flex items-center flex-row-reverse gap-6 bg-black/50 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[2rem] shadow-[0_0_60px_rgba(16,185,129,0.15)] transition-all hover:border-emerald-500/40 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-2 border-emerald-500/20 p-1.5 overflow-hidden shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    <img src="https://www.incometaxindia.gov.in/_layouts/15/IncometaxIndia/Images/logo.png" alt="India Tax" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col items-end pl-2">
                    <h3 className="text-white text-xl md:text-2xl font-bold font-['Manrope',sans-serif] tracking-[0.25em] uppercase text-right leading-none">INDIA JURISDICTION</h3>
                    <div className="flex flex-col items-end gap-1 mt-3">
                        <span className="text-emerald-400 text-[12px] font-bold tracking-[0.3em] uppercase opacity-90">INCOME TAX DEPARTMENT</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Central Wising Logo Hub - Balanced Scale */}
        <div className="absolute z-[100] flex items-center justify-center transform translate-y-8 md:translate-y-12">
            <motion.div 
                className="relative"
                animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))", "drop-shadow(0 0 45px rgba(16, 185, 129, 0.6))", "drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))"]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <img 
                    src="/src/assets/header_logo.png" 
                    alt="Wising Logo" 
                    className="w-24 h-24 md:w-40 md:h-40 object-contain relative z-20"
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/assets/header_logo.png";
                    }}
                />
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </motion.div>
        </div>

        <svg
          width="1440"
          height="890"
          viewBox="0 0 1440 890"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute w-full h-full pointer-events-none z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outward Mask Definition */}
          <defs>
            <mask id="outwardMask">
              <motion.rect 
                style={{ x: maskX, width: maskWidth }}
                y="0" 
                height="890" 
                fill="white" 
              />
            </mask>
            <filter id="emeraldGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core Animating Paths Grouped with Mask */}
          <g mask="url(#outwardMask)" filter="url(#emeraldGlow)">
            <motion.path
              d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
              stroke="#059669"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 1 }}
              animate={{ strokeOpacity: [0.5, 1, 0.5], strokeWidth: [4, 5, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
              stroke="#10b981"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 1 }}
              animate={{ strokeOpacity: [0.5, 1, 0.5], strokeWidth: [4, 5, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path
              d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
              stroke="#34d399"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 1 }}
              animate={{ strokeOpacity: [0.4, 0.9, 0.4], strokeWidth: [4, 6, 4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
              stroke="#6ee7b7"
              strokeWidth="4"
              fill="none"
              initial={{ pathLength: 1 }}
              animate={{ strokeOpacity: [0.5, 1, 0.5], strokeWidth: [4, 5, 4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </g>

          {/* Labels - Enlarged & High Clarity */}
          {!isMobile && (
            <>
              <motion.foreignObject x="40" y="625" width="400" height="50" style={{ opacity: leftOpacity1 }}>
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">FBAR Filed</p>
              </motion.foreignObject>
              <motion.foreignObject x="1000" y="625" width="400" height="50" style={{ opacity: rightOpacity1 }} className="text-right">
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">LRS Remittance Tracked</p>
              </motion.foreignObject>

              <motion.foreignObject x="40" y="550" width="400" height="50" style={{ opacity: leftOpacity2 }}>
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">PFIC Optimized</p>
              </motion.foreignObject>
              <motion.foreignObject x="1000" y="550" width="400" height="50" style={{ opacity: rightOpacity2 }} className="text-right">
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">FEMA Residency Active</p>
              </motion.foreignObject>

              <motion.foreignObject x="40" y="475" width="400" height="50" style={{ opacity: leftOpacity3 }}>
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">FATCA Verified</p>
              </motion.foreignObject>
              <motion.foreignObject x="1000" y="475" width="400" height="50" style={{ opacity: rightOpacity3 }} className="text-right">
                 <p className="text-white font-['Manrope'] font-bold text-[22px] tracking-wide">DTAA Relief Applied</p>
              </motion.foreignObject>

              <motion.foreignObject x="40" y="400" width="400" height="50" style={{ opacity: leftOpacity4 }}>
                 <p className="text-white font-['Manrope'] font-bold text-[21px] tracking-wide">IRS Compliance: PASS</p>
              </motion.foreignObject>
              <motion.foreignObject x="1000" y="400" width="400" height="50" style={{ opacity: rightOpacity4 }} className="text-right">
                 <p className="text-white font-['Manrope'] font-bold text-[21px] tracking-wide">India Tax: COMPLIANT</p>
              </motion.foreignObject>
            </>
          )}
        </svg>
      </div>
      <div className="h-[200px] w-full"></div> 
    </div>
  );
};
