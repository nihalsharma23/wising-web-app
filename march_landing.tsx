import { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SEO } from '../../components/SEO';
import { NetworkCanvas } from '../../components/ui/NetworkCanvas';
import { seoConfig } from '../../config/seoData';

const SupportedIntegrationsSection = lazy(() => import('./components/MarqueeIntegrations').then(m => ({ default: m.SupportedIntegrationsSection })));
const FeaturesSection = lazy(() => import('./components/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const GridSection = lazy(() => import('./components/GridSection').then(m => ({ default: m.GridSection })));
const FoundingTeamSection = lazy(() => import('./components/FoundingTeamSection').then(m => ({ default: m.FoundingTeamSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export function BetaLanding() {
    useLayoutEffect(() => {
        // Disable browser's automatic scroll restoration to prevent jumping
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        
        // Force the page to start at the absolute top immediately
        window.scrollTo(0, 0);
        
        return () => {
            // Re-enable on cleanup if navigating away (optional, but good practice)
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    useEffect(() => {
        // Double-check scroll position after mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="content-stretch flex flex-col items-start relative size-full min-h-screen overflow-x-hidden select-none mesh-gradient-bg"
            onContextMenu={(e) => e.preventDefault()}
        >
            <SEO {...seoConfig.landing} />
            {/* Animation rendered internally in lower section to ensure visibility on all screens */}
            <NetworkCanvas />
            <Header />

            <main className="w-full">
                <HeroSection />
                <Suspense fallback={<div className="h-96" />}>
                    <SupportedIntegrationsSection />
                    <FeaturesSection />
                    <GridSection />
                    <FoundingTeamSection />
                    <Footer />
                </Suspense>
            </main>

        </motion.div>
    );
}
