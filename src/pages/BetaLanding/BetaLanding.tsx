import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SupportedIntegrationsSection } from './components/MarqueeIntegrations';
import { FeaturesSection } from './components/FeaturesSection';
import { GridSection } from './components/GridSection';
import { FoundingTeamSection } from './components/FoundingTeamSection';
import { Footer } from './components/Footer';
import { SEO } from '../../components/SEO';


import { NetworkCanvas } from '../../components/ui/NetworkCanvas';

export function BetaLanding() {
    return (
        <div
            className="content-stretch flex flex-col items-start relative size-full min-h-screen overflow-x-hidden select-none"
            onContextMenu={(e) => e.preventDefault()}
        >
            <SEO
                title="AI Wealth Intelligence Dashboard"
                description="Wising is the world's first AI-powered Wealth Intelligence Dashboard. Track net worth, analyze assets, and get personalized financial insights."
                canonical="https://wising.pro/"
            />
            {/* Animation rendered internally in lower section to ensure visibility on all screens */}
            <NetworkCanvas />
            <Header />

            <main className="w-full">
                <HeroSection />
                <SupportedIntegrationsSection />
                <FeaturesSection />
                <GridSection />
                <FoundingTeamSection />
            </main>

            <Footer />

        </div>
    );
}
