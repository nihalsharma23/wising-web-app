import React from "react";
import {
    AbsoluteFill,
    Sequence,
} from "remotion";

import { OpeningScene } from "./scenes/OpeningScene";
import { LogoRevealScene } from "./scenes/LogoRevealScene";
import { HeroHeadlineScene } from "./scenes/HeroHeadlineScene";
import { FeatureCardsScene } from "./scenes/FeatureCardsScene";
import { GridUnifiedWealth, GridIntelligenceLayer, GridBehaviouralMirror } from "./scenes/GridScenesA";
import { GridPerformanceTruth, GridContextFeed, GridHealthMetrics } from "./scenes/GridScenesB";
import { CTAScene, ClosingScene, LogoOutroScene } from "./scenes/FinalScenes";

// 60 FPS — All durations in frames
const FPS = 60;

const scenes = [
    { component: OpeningScene, start: 0 * FPS, duration: 6 * FPS },  // 0s-6s
    { component: LogoRevealScene, start: 6 * FPS, duration: 4 * FPS },  // 6s-10s
    { component: HeroHeadlineScene, start: 10 * FPS, duration: 6 * FPS },  // 10s-16s
    { component: FeatureCardsScene, start: 16 * FPS, duration: 9 * FPS },  // 16s-25s
    { component: GridUnifiedWealth, start: 25 * FPS, duration: 4 * FPS },  // 25s-29s
    { component: GridIntelligenceLayer, start: 29 * FPS, duration: 4 * FPS },  // 29s-33s
    { component: GridBehaviouralMirror, start: 33 * FPS, duration: 4 * FPS },  // 33s-37s
    { component: GridPerformanceTruth, start: 37 * FPS, duration: 4 * FPS },  // 37s-41s
    { component: GridContextFeed, start: 41 * FPS, duration: 4 * FPS },  // 41s-45s
    { component: GridHealthMetrics, start: 45 * FPS, duration: 4 * FPS },  // 45s-49s
    { component: CTAScene, start: 49 * FPS, duration: 4 * FPS },  // 49s-53s
    { component: ClosingScene, start: 53 * FPS, duration: 4 * FPS },  // 53s-57s
    { component: LogoOutroScene, start: 57 * FPS, duration: 3 * FPS },  // 57s-60s
];

export const Main: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#050505" }}>
            {scenes.map((scene, i) => {
                const SceneComponent = scene.component;
                return (
                    <Sequence
                        key={i}
                        from={scene.start}
                        durationInFrames={scene.duration}
                    >
                        <SceneComponent />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
