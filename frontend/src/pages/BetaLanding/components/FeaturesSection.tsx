import { FeatureCard } from "./FeatureCard";
import imgVerticalDivider from "../assets/3965968a54d96f86eec9b5d01bd3dc4af3e13878.png";

export function FeaturesSection() {
    return (
        <div className="relative bg-[#0a0a0a] w-full overflow-clip px-4 md:px-12 lg:px-48 py-20 md:py-28 lg:py-32">
            {/* Vertical Divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 top-0 w-px hidden md:block">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgVerticalDivider} />
                <div className="absolute bg-[rgba(255,255,255,0)] bottom-0 left-1/2 -translate-x-1/2 shadow-[0px_0px_15px_1px_rgba(165,243,252,0.1)] top-0 w-px" />
            </div>

            <div className="max-w-[896px] relative w-full mx-auto">
                <div className="content-stretch flex flex-col gap-64 items-start w-full">
                    <FeatureCard
                        letter="A"
                        title="Aggregate"
                        description="Unified custody of your
global investment footprint."
                    />
                    <FeatureCard
                        letter="A"
                        title="Analyze"
                        description="Advanced portfolio intelligence powered
by AI. Ask questions. Get answers.
Understand your data."
                    />
                    <FeatureCard
                        letter="E"
                        title="Evolve"
                        description="AI behavioral analysis that learns from
your investment history and shows
patterns you've repeated"
                        hasBottomDot={true}
                    />
                </div>
            </div>
        </div>
    );
}
