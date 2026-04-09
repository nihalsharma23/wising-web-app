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
  // Transform opacities for the right side text so they only appear when the beam reaches the end
  const rightOpacity1 = useTransform(pathLengths[0], [0.9, 1], [0, 1]);
  const rightOpacity2 = useTransform(pathLengths[1], [0.9, 1], [0, 1]);
  const rightOpacity3 = useTransform(pathLengths[2], [0.9, 1], [0, 1]);
  const rightOpacity4 = useTransform(pathLengths[3], [0.9, 1], [0, 1]);

  const leftOpacity1 = useTransform(pathLengths[0], [0, 0.05], [0, 1]);
  const leftOpacity2 = useTransform(pathLengths[1], [0, 0.05], [0, 1]);
  const leftOpacity3 = useTransform(pathLengths[2], [0, 0.05], [0, 1]);
  const leftOpacity4 = useTransform(pathLengths[3], [0, 0.05], [0, 1]);

  return (
    <div className={cn("sticky relative top-0 flex flex-col items-center", className)}>
      {/* Title & Description Section - Clear of Graphics */}
      <div className="flex flex-col items-center justify-center text-center pt-24 pb-16 px-6 z-20">
         <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 font-['Syne',sans-serif] tracking-tighter mb-6">
          {title || `Zero Touch Tracking`}
         </h2>
         <p className="text-base md:text-xl font-normal text-neutral-400 max-w-2xl mx-auto font-['Manrope',sans-serif] leading-relaxed">
           {description ||
             `Connect your accounts once and let the engine take over. Wising passively monitors global regulatory changes to keep your data current.`}
         </p>
      </div>
      
      {/* SVG Engine Section - Centered with Gap */}
      <div className="w-full h-[1000px] relative flex items-center justify-center mt-12 bg-transparent overflow-visible">
        
        {/* US Jurisdiction Anchor */}
        <div className="absolute top-[150px] left-[5%] md:left-[10%] z-[80] flex flex-col items-start opacity-100 pointer-events-auto">
            <div className="w-16 h-16 bg-white shadow-2xl rounded-2xl flex items-center justify-center mb-4 border border-gray-100 p-2 transform hover:scale-110 transition-transform duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Seal_of_the_Internal_Revenue_Service.svg/512px-Seal_of_the_Internal_Revenue_Service.svg.png" alt="IRS" className="w-[80%] h-[80%] object-contain" />
            </div>
            <h3 className="text-white text-xl md:text-3xl font-bold font-['Syne',sans-serif] tracking-tighter">US Jurisdiction</h3>
        </div>

        {/* India Jurisdiction Anchor */}
        <div className="absolute top-[150px] right-[5%] md:right-[10%] z-[80] flex flex-col items-end text-right opacity-100 pointer-events-auto">
            <div className="w-16 h-16 bg-white shadow-2xl rounded-2xl flex items-center justify-center mb-4 border border-gray-100 p-2 transform hover:scale-110 transition-transform duration-300">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Income_Tax_Department_Logo.png/512px-Income_Tax_Department_Logo.png" alt="India Tax" className="w-[80%] h-[80%] object-contain" />
            </div>
            <h3 className="text-white text-xl md:text-3xl font-bold font-['Syne',sans-serif] tracking-tighter">India Jurisdiction</h3>
        </div>

        {/* Central Wising Logo Hub */}
        <div className="absolute z-[100] flex items-center justify-center transform translate-y-8 md:translate-y-12">
            <div className="relative group">
                {/* Glow Aura */}
                <div className="absolute -inset-12 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                {/* Clean Black Container */}
                <div className="relative z-10 w-24 h-24 md:w-44 md:h-44 bg-black border-2 border-white/10 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-6 md:p-10 overflow-hidden">
                    <img src="/src/assets/header_logo.png" alt="Wising Logo" className="w-full h-full object-contain relative z-20" />
                    
                    {/* Subtle internal shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                </div>
            </div>
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

          {/* Core Animating Paths */}
          {/* Path 1 (Bottom, y=663) */}
          <motion.path
            d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
            stroke="#FFB7C5"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLengths[0] }}
            transition={transition}
          />
          {/* Label Path 1 */}
          <motion.foreignObject x="40" y="625" width="300" height="40" style={{ opacity: leftOpacity1 }}>
             <p className="text-[#FFB7C5] font-['Manrope'] font-bold text-[15px]">FBAR Filed</p>
          </motion.foreignObject>
          <motion.foreignObject x="1100" y="625" width="300" height="40" style={{ opacity: rightOpacity1 }} className="text-right">
             <p className="text-[#FFB7C5] font-['Manrope'] font-bold text-[15px]">LRS Remittance Tracked ($145k/$250K)</p>
          </motion.foreignObject>

          {/* Path 2 (y=587.5) */}
          <motion.path
            d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
            stroke="#FFDDB7"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLengths[1] }}
            transition={transition}
          />
          {/* Label Path 2 */}
          <motion.foreignObject x="40" y="550" width="300" height="40" style={{ opacity: leftOpacity2 }}>
             <p className="text-[#FFDDB7] font-['Manrope'] font-bold text-[15px]">FORM 8621(PFIC) Optimized</p>
          </motion.foreignObject>
          <motion.foreignObject x="1100" y="550" width="300" height="40" style={{ opacity: rightOpacity2 }} className="text-right">
             <p className="text-[#FFDDB7] font-['Manrope'] font-bold text-[15px]">FEMA Residency : 120 Days</p>
          </motion.foreignObject>

          {/* Path 3 (y=514) */}
          <motion.path
            d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
            stroke="#B1C5FF"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLengths[2] }}
            transition={transition}
          />
          {/* Label Path 3 */}
          <motion.foreignObject x="40" y="475" width="300" height="40" style={{ opacity: leftOpacity3 }}>
             <p className="text-[#B1C5FF] font-['Manrope'] font-bold text-[15px]">FATCA Verified</p>
          </motion.foreignObject>
          <motion.foreignObject x="1100" y="475" width="300" height="40" style={{ opacity: rightOpacity3 }} className="text-right">
             <p className="text-[#B1C5FF] font-['Manrope'] font-bold text-[15px]">DTAA Relief Applied</p>
          </motion.foreignObject>

          {/* Path 4 (y=438) */}
          <motion.path
            d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
            stroke="#4FABFF"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLengths[3] }}
            transition={transition}
          />
          {/* Label Path 4 */}
          <motion.foreignObject x="40" y="400" width="300" height="40" style={{ opacity: leftOpacity4 }}>
             <p className="text-[#4FABFF] font-['Manrope'] font-bold text-[15px]">IRS Compliance : Pass</p>
          </motion.foreignObject>
          <motion.foreignObject x="1100" y="400" width="300" height="40" style={{ opacity: rightOpacity4 }} className="text-right">
             <p className="text-[#4FABFF] font-['Manrope'] font-bold text-[15px]">India Tax: Compliant</p>
          </motion.foreignObject>

          {/* Path 5 Background aesthetic (No labels, just glow wire) */}
          <motion.path
            d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
            stroke="#076EFF"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            style={{ pathLength: pathLengths[4] }}
            transition={transition}
          />
          
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
      </svg>

        {/* Removed duplicate long static paths for performance, added drop-shadow natively */}
      </div>
      <div className="h-[200px] w-full"></div> 
    </div>
  );
};
