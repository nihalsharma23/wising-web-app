import { isMobile } from 'react-device-detect';
import BetaLandingWeb from './BetaLandingWeb';
import BetaLandingMobile from './BetaLandingMobile';
import { useEffect, useState } from 'react';

export const BetaLanding = () => {
    const [isActuallyMobile, setIsActuallyMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsActuallyMobile(isMobile || window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isActuallyMobile ? <BetaLandingMobile /> : <BetaLandingWeb />;
};

export default BetaLanding;
