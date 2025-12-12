import React from 'react';
import { Book } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* --- Main Background Layers --- */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/title-page.png"
          alt="Campaign Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent opacity-30 z-10"></div>
        <div className="absolute -inset-[50%] bg-[radial-gradient(circle,rgba(220,220,220,0.15)_0%,transparent_60%)] animate-fog opacity-20 z-20"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto mt-16">
        <div className="flex items-center justify-center gap-4 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <div className="animate-pulse-slow flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
            <span className="text-orange-400 font-title tracking-[0.4em] text-xs md:text-sm uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">
              A Severed Realms Campaign
            </span>
            <div className="h-px w-12 bg-orange-500 shadow-[0_0_8px_#f97316]"></div>
          </div>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-title font-black text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl mb-8 tracking-tighter leading-[0.9] opacity-0 animate-[slideUp_1s_ease-out_0.5s_forwards]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #f5f5f4 0%, #c2410c 25%, #c2410c 75%, #000000 100%)",
          }}
        >
          A DIRGE TO
          <br />
          THE FALSEBLOOD
        </h1>

        <p className="text-stone-400 max-w-2xl mx-auto text-lg md:text-2xl font-serif-text italic mb-12 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
          "A severed existence is a wound that festers."
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
          <button
            onClick={() => navigate('/tome')}
            className="group relative px-8 py-4 bg-orange-950/50 hover:bg-orange-900/60 text-orange-100 border border-orange-800/60 overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-orange-600/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative font-title tracking-[0.2em] uppercase text-sm font-bold flex items-center gap-2">
              <Book size={16} /> Read the Tome
            </span>
          </button>

          <button
            onClick={() => navigate('/grimoire')}
            className="px-8 py-4 text-stone-500 hover:text-orange-600 font-title tracking-[0.2em] uppercase text-sm border-b border-transparent hover:border-orange-800 transition-all"
          >
            Enter the Archives
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
