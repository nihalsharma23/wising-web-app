import { Composition } from "remotion";
import { Main } from "./Composition";
import "./style.css";

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="Scene"
                component={Main}
                durationInFrames={3600}
                fps={60}
                width={1920}
                height={1080}
            />
        </>
    );
};
