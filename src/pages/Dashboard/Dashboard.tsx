import { SEO } from "../../components/SEO";
import { seoConfig } from "../../config/seoData";

export function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
            <SEO {...seoConfig.dashboard} />
            <h1 className="text-3xl font-bold">Dashboard Coming Soon</h1>
        </div>
    );
}
