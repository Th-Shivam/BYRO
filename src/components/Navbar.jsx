import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-6 relative z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-1.5 cursor-pointer">
        <Sparkles className="w-5 h-5 text-[#8875ff] fill-[#8875ff]" />
        <span className="font-bold text-2xl tracking-tighter text-[#111]">
          byro.
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-600">
        <a href="#" className="hover:text-gray-900 transition-colors">Product</a>
        <a href="#" className="hover:text-gray-900 transition-colors">How it works</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Use cases</a>
        <a href="#" className="hover:text-gray-900 transition-colors">Resources</a>
      </nav>

      {/* Action CTA */}
      <div className="flex items-center">
        <button className="hidden sm:flex items-center justify-center px-5 py-2.5 rounded-full bg-[#111] text-white font-medium text-[15px] hover:bg-black transition-all gap-2 shadow-sm">
          <span>See BYRO in action</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
