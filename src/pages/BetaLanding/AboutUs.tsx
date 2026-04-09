import { Header } from '../../components/layout/Header';

export function AboutUs() {
    return (
        <div className="min-h-screen bg-black flex flex-col font-['Syne',sans-serif]">
            <Header variant="about" />
            <main className="flex-grow flex items-center justify-center pt-24 px-4 text-white">
                <h1 className="text-4xl text-white">About Us</h1>
            </main>
        </div>
    );
}

export default AboutUs;
