import { SEO } from "../../components/SEO";

export function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0A0A0A] text-white">
            <SEO
                title="Wealth Dashboard"
                description="View your comprehensive wealth intelligence dashboard. Track assets, liabilities, and growth in one place."
                canonical="https://wising.app/dashboard"
            />
            <h1 className="text-3xl font-bold">Dashboard Coming Soon</h1>
        </div>
    );
}
