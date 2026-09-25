import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import rookMascot from '../../images/rook-mascot.png';
import byroWork from '../../images/byro-work.png'; // Using this for the bottom mockup

export default function HeroSection() {
  return (
    <section className="relative pt-20 pb-0 px-6 flex flex-col items-center justify-start text-center">
      {/* Category Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-10">
        <Sparkles className="w-3 h-3 text-[#8875ff] fill-transparent" />
        <span>The Reputation Workspace for Expert-Led B2B Teams</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-[72px] font-bold tracking-tight text-[#111] leading-[1.05] max-w-[800px] mb-8">
        Turn company<br/>
        expertise<br/>
        into <span className="font-serif italic font-normal text-[#6b4c9a] bg-[#f3edfd] px-5 py-1 rounded-full inline-block transform -translate-y-1">
          trusted content
        </span><br/>
        and conversations.
      </h1>

      {/* Subtitle */}
      <p className="text-[17px] text-gray-500 max-w-[640px] font-normal leading-[1.6] mb-12">
        Byro connects interviews, customer proof and product knowledge to the goals your team cares about. It recommends what to say next, shows the evidence behind it and keeps the named author in control.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-24 relative z-20">
        <button className="px-6 py-3.5 rounded-full bg-[#111] text-white font-medium text-[15px] hover:bg-black transition-all flex items-center gap-2 shadow-sm">
          <span>See BYRO in action</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button className="px-6 py-3.5 rounded-full bg-white border border-gray-200 text-gray-800 font-medium text-[15px] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#f3edfd] flex items-center justify-center text-[#6b4c9a]">
            <Play className="w-3 h-3 fill-[#6b4c9a] ml-0.5" />
          </div>
          <span>How it works</span>
        </button>
      </div>

      {/* Product Mockup & Mascot */}
      <div className="relative w-full max-w-[1000px] mt-4">
        {/* Mascot */}
        <div className="absolute -top-[140px] right-[40px] z-30">
          <img 
            src={rookMascot} 
            alt="Byro Mascot" 
            className="w-[180px] h-auto drop-shadow-xl"
          />
        </div>

        {/* Mockup Container */}
        <div className="relative w-full rounded-t-[24px] border border-gray-200 border-b-0 shadow-2xl overflow-hidden bg-white">
          {/* We use byro-work.png as it matches the mockup shown in the design */}
           <img 
            src={byroWork} 
            alt="Byro Workspace Mockup" 
            className="w-full h-auto object-cover object-top"
            style={{ maxHeight: '500px' }}
          />
        </div>
      </div>
    </section>
  );
}
