import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Tagline */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              byro<span className="text-purple-400">.</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-sm">
            The Reputation Workspace for expert-led B2B teams. Turning scattered company knowledge into evidence-backed LinkedIn content.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-8 text-xs font-medium text-gray-300">
          <a href="#product" className="hover:text-purple-400 transition-colors">Product</a>
          <a href="#reputation" className="hover:text-purple-400 transition-colors">Reputation Briefs</a>
          <a href="#evidence" className="hover:text-purple-400 transition-colors">Evidence Engine</a>
          <a href="#team" className="hover:text-purple-400 transition-colors">Security & Permissions</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-600">
          © {new Date().getFullYear()} Byro Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
