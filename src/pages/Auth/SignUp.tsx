import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { NetworkCanvas } from '../../components/ui/NetworkCanvas';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sign up:', email);
        navigate('/dashboard');
    };

    return (
        <div className="dark min-h-screen flex flex-col relative overflow-hidden bg-[#0A0A0A] text-[#FFFFFF] font-['Inter'] selection:bg-white selection:text-black">
            <NetworkCanvas />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
                <Link to="/" className="absolute top-8 left-8 text-sm text-slate-grey hover:text-white transition-colors tracking-widest uppercase font-['Montserrat']">
                    Back to Home
                </Link>

                <div className="w-full max-w-md">
                    <div className="mb-10 text-center">
                        <h1
                            className="text-3xl md:text-4xl font-extralight mb-4 uppercase tracking-[0.2em] font-['Syne']"
                            style={{
                                background: 'linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 20%, rgba(255, 255, 255, 1) 50%, rgba(209, 213, 219, 0.8) 80%, rgba(156, 163, 175, 0.6) 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                animation: 'shimmer 8s linear infinite'
                            }}
                        >
                            Request Access
                        </h1>
                        <p className="text-xs tracking-[0.3em] font-medium uppercase text-slate-grey font-['Montserrat']">
                            Join the exclusive beta
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="group border border-divider-grey rounded-xl transition-all duration-500 overflow-hidden bg-white/[0.02] backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-none text-arctic-white px-6 py-4 text-xs tracking-[0.1em] placeholder:text-slate-grey/40 focus:ring-0 focus:outline-none"
                                placeholder="EMAIL ADDRESS"
                            />
                        </div>

                        <div className="group border border-divider-grey rounded-xl transition-all duration-500 overflow-hidden bg-white/[0.02] backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-none text-arctic-white px-6 py-4 text-xs tracking-[0.1em] placeholder:text-slate-grey/40 focus:ring-0 focus:outline-none"
                                placeholder="PASSWORD"
                            />
                        </div>
                        <div className="group border border-divider-grey rounded-xl transition-all duration-500 overflow-hidden bg-white/[0.02] backdrop-blur-sm hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-transparent border-none text-arctic-white px-6 py-4 text-xs tracking-[0.1em] placeholder:text-slate-grey/40 focus:ring-0 focus:outline-none"
                                placeholder="CONFIRM PASSWORD"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl flex items-center justify-center gap-3 group overflow-hidden relative transition-all duration-400 mt-8"
                            style={{
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #D1D5DB 50%, #9CA3AF 100%)',
                                boxShadow: '0 10px 30px -10px rgba(255,255,255,0.05)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(255,255,255,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(255,255,255,0.05)';
                            }}
                        >
                            <span className="relative z-10 text-black text-[10px] font-bold tracking-[0.3em] uppercase font-['Montserrat']">
                                Join the Beta
                            </span>
                            <span className="material-symbols-outlined relative z-10 text-black text-[14px] transition-transform group-hover:translate-x-1">
                                arrow_forward
                            </span>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-slate-grey tracking-widest uppercase font-['Montserrat']">
                            Already have access? <Link to="/signin" className="text-white hover:underline decoration-1 underline-offset-4">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
