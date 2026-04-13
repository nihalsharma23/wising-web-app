import React from 'react';

const cards = [
  {
    title: 'SYNC ONCE',
    desc: 'Connect Your Assets and Liabilities in a Click. Instantly Map Your Global Financial Ecosystem.',
    gradientFrom: '#ffbc00',
    gradientTo: '#ff0058',
  },
  {
    title: 'AUTO ENFORCE',
    desc: 'Apply Heavy-duty Compliance Rules. Instantly Check Every Cross-Border Legal Rate.',
    gradientFrom: '#03a9f4',
    gradientTo: '#ff0058',
  },
  {
    title: 'LIVE PROJECT',
    desc: 'Get a Clean, Automated Dashboard. Always See Your Estimated Tax Position.',
    gradientFrom: '#4dff03',
    gradientTo: '#00d0ff',
  },
];

export default function SkewCards() {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap py-24 bg-transparent min-h-screen">
        {cards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
          <div
            key={idx}
            className="group relative w-[320px] h-[420px] m-[40px_30px] transition-all duration-500 z-10"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[50px] w-[50%] h-full rounded-2xl transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-80px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[50px] w-[50%] h-full rounded-2xl transform skew-x-[15deg] blur-[40px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-80px)] opacity-60 group-hover:opacity-100"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs for corners */}
            <span className="pointer-events-none absolute inset-0 z-10 hidden sm:block">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-xl opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-300 animate-blob group-hover:top-[-40px] group-hover:left-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-xl opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-40px] group-hover:right-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100" />
            </span>

            {/* Content Box */}
            <div className="absolute inset-0 z-20 left-0 p-[40px_30px] bg-[#111111]/80 border border-white/5 backdrop-blur-[12px] shadow-2xl rounded-2xl text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[50px_40px] flex flex-col h-full">
              <h2 className="text-3xl mb-4 font-bold font-['Syne',sans-serif] tracking-tight">{title}</h2>
              <p className="text-base text-gray-300 leading-relaxed font-['Manrope',sans-serif]">{desc}</p>
              <a
                href="#"
                className="mt-auto inline-block text-[15px] font-bold text-black bg-white px-6 py-3 rounded-full hover:bg-black hover:text-white hover:border hover:border-white transition-all w-max font-['Manrope',sans-serif]"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 3s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1.5s; }
      `}</style>
    </>
  );
}
