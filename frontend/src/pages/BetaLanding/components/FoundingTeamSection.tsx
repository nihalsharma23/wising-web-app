import { motion } from "framer-motion";
import imgFounding1 from "../assets/founding_team_v2_1.png";
import imgFounding2 from "../assets/founding_team_v2_2.png";
import imgFounding3 from "../assets/founding_team_v2_3.png";
import imgFounding4 from "../assets/founding_team_v2_4.png";
import imgFounding5 from "../assets/founding_team_v2_5.png";
import imgFounding6 from "../assets/founding_team_v2_6.png";

export function FoundingTeamSection() {
    const logos = [
        { src: imgFounding1, alt: "Founding Team 1" },
        { src: imgFounding2, alt: "Founding Team 2" },
        { src: imgFounding3, alt: "Founding Team 3" },
        { src: imgFounding4, alt: "Founding Team 4" },
        { src: imgFounding5, alt: "Founding Team 5" },
        { src: imgFounding6, alt: "Founding Team 6" },
    ];

    const allLogos = [...logos, ...logos, ...logos]; // Triple for smoother infinite scroll

    return (
        <div className="relative bg-[#0a0a0a] w-full">
            <div className="content-stretch flex flex-col gap-12 md:gap-16 items-start overflow-clip pb-16 md:pb-24 pt-16 md:pt-24 relative w-full">
                <div aria-hidden="true" className="absolute border-[#1f1f1f] border-solid border-t inset-0 pointer-events-none" />

                {/* Title */}
                <div className="relative w-full px-4">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative w-full">
                        <div
                            className="bg-clip-text flex flex-col font-['Syne:Medium',sans-serif] font-medium justify-center leading-[0] text-sm text-center tracking-[11.2px] uppercase"
                            style={{
                                backgroundImage: "linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgb(255, 255, 255) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmer-move 8s linear infinite"
                            }}
                        >
                            <p className="leading-[21px] whitespace-pre-wrap">FOUNDING TEAM FROM:</p>
                        </div>
                    </div>
                </div>

                {/* Logo Marquee */}
                <div className="relative overflow-hidden w-full h-48 flex items-center">
                    <motion.div
                        className="flex gap-24 md:gap-32 items-center px-12"
                        animate={{
                            x: [0, "-50%"], // Move half way since we doubled the repetition? Actually need to calculate based on width.
                            // Simply moving -50% is standard for infinite scroll if content is doubled? 
                            // Here allLogos is 4x. So -25%? 
                            // Let's stick to standard translateX logic. 
                            // If we have 2 logos * 4 = 8 logos.
                            // We want to scroll 1 set (2 logos). So 1/4 = 25%.
                            // Or safer: scroll 100% of the *content*?
                            // Let's scroll -50% if we have 2 sets?
                            // Let's try -100% of a single set.
                            // With framer motion, x values are relative to element width. 
                            // If element width is massive...
                            // Let's just use the previous logic: x: [0, "-33.33%"] for 3 sets.
                            // content is 4 sets. 1 set is 25%.
                        }}
                        transition={{
                            x: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }}
                        style={{
                            width: "fit-content", // Ensure it takes width of content
                        }}
                    >
                        {/* We need enough items to fill screen width + scroll buffer */}
                        {allLogos.map((logo, i) => (
                            <div key={i} className="relative shrink-0 flex items-center justify-center">
                                {/* Display as-is, height constrained to fit marquee */}
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className={`${(logo.src === imgFounding3 || logo.src === imgFounding6) ? 'h-[80px]' : 'h-[50px]'} w-auto object-contain brightness-100`} // brightness-100 ensures original color
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
