import React from "react";
import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

const getTypedText = ({
    frame,
    fullText,
    pauseAfter,
    charFrames,
    pauseFrames,
}: {
    frame: number;
    fullText: string;
    pauseAfter: string;
    charFrames: number;
    pauseFrames: number;
}): string => {
    const pauseIndex = fullText.indexOf(pauseAfter);
    const preLen =
        pauseIndex >= 0 ? pauseIndex + pauseAfter.length : fullText.length;

    let typedChars = 0;
    if (frame < preLen * charFrames) {
        typedChars = Math.floor(frame / charFrames);
    } else if (frame < preLen * charFrames + pauseFrames) {
        typedChars = preLen;
    } else {
        const postPhase = frame - preLen * charFrames - pauseFrames;
        typedChars = Math.min(
            fullText.length,
            preLen + Math.floor(postPhase / charFrames),
        );
    }
    return fullText.slice(0, typedChars);
};

const Cursor: React.FC<{
    frame: number;
    blinkFrames: number;
    symbol?: string;
}> = ({ frame, blinkFrames, symbol = "\u258C" }) => {
    const opacity = interpolate(
        frame % blinkFrames,
        [0, blinkFrames / 2, blinkFrames],
        [1, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

    return <span style={{ opacity }}>{symbol}</span>;
};

export const Typewriter: React.FC<{
    text: string;
    pauseAfter?: string;
    charFrames?: number;
    pauseFrames?: number;
    className?: string;
}> = ({
    text,
    pauseAfter = "",
    charFrames = 2,
    pauseFrames = 30,
    className = "",
}) => {
        const frame = useCurrentFrame();

        const typedText = getTypedText({
            frame,
            fullText: text,
            pauseAfter: pauseAfter,
            charFrames: charFrames,
            pauseFrames,
        });

        return (
            <div className={className}>
                <span>{typedText}</span>
                <Cursor frame={frame} blinkFrames={16} />
            </div>
        );
    };
