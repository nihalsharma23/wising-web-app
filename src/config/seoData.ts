export interface SEOData {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    structuredData?: any;
}

export const seoConfig = {
    landing: {
        title: "Agentic AI Wealth Intelligence | Master Your Assets",
        description: "Experience the world's first Agentic AI Wealth Intelligence platform. Aggregate assets, talk to your data, and optimize your portfolio with hyper-personalized AI insights.",
        keywords: "agentic ai wealth management, ai portfolio optimization, hyper-personalization wealth management, tracking net worth, wising intelligence",
        canonical: "https://wising.app/",
        ogImage: "https://wising.app/og-main.png",
        structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Wising",
            "description": "Agentic AI Wealth Intelligence Platform",
            "url": "https://wising.app/",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "author": {
                "@type": "Organization",
                "name": "Wising Intelligence Private Limited"
            }
        }
    },
    about: {
        title: "Our Mission | Democratizing Elite Wealth Intelligence",
        description: "Meet the team building the future of AI wealth management. Wising is democratizing the financial intelligence of the top 1% for everyone.",
        keywords: "wising mission, sarthak jalan, nihal sharma, divanshu bansal, financial democratizing, ai wealth team",
        canonical: "https://wising.app/about",
        structuredData: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wising Intelligence Private Limited",
            "url": "https://wising.app/about",
            "logo": "https://wising.app/logo.png",
            "founder": [
                { "@type": "Person", "name": "Sarthak Jalan", "jobTitle": "Co-Founder" },
                { "@type": "Person", "name": "Nihal Sharma", "jobTitle": "Co-Founder" },
                { "@type": "Person", "name": "Divanshu Bansal", "jobTitle": "Co-Founder" }
            ]
        }
    },
    dashboard: {
        title: "Wealth Dashboard | My Intelligence Feed",
        description: "Your unified wealth command center. Monitor live F&O trades, asset allocation, and AI performance vitals in real-time.",
        keywords: "ai wealth dashboard, live portfolio tracking, fno trades monitor, asset allocation ai",
        canonical: "https://wising.app/dashboard"
    }
};
