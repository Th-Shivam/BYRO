import React from 'react';
import { Target, ShieldCheck, FileCheck2, Sparkles, MessageSquareQuote, Lock } from 'lucide-react';
import featureDawn from '../../images/byro-feature-forest-dawn.webp';
import featureDusk from '../../images/byro-feature-forest-dusk.webp';
import featureBirch from '../../images/byro-feature-forest-birch.webp';

export default function FeatureGrid() {
  const features = [
    {
      icon: <Target className="w-5 h-5 text-purple-600" />,
      tag: "Goal-First Architecture",
      title: "Content decision system, not just an AI writer",
      description: "First, set a reputation goal — like 'In the next 60 days, what should the market know us for?' Byro recommends what to say based on that goal.",
      image: featureDawn,
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-purple-600" />,
      tag: "Evidence Verification",
      title: "Proof attached behind every claim",
      description: "Every post and response links directly to interviews, customer proof notes, product insights, or buyer conversations. Full auditability for every sentence.",
      image: featureDusk,
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      tag: "Author Control",
      title: "Human author retains 100% final approval",
      description: "Team members can review and comment, but the named author edits, approves, and triggers publishing. Byro never posts automatically to your personal profile.",
      image: featureBirch,
    },
  ];

  return (
    <section className="py-20 px-6 bg-white border-t border-purple-100">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            Why Byro Is Different
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-950 tracking-tight">
            Connect scattered knowledge to <span className="font-serif italic font-normal text-purple-900">trusted publishing</span>.
          </h2>
          <p className="text-gray-600 text-lg">
            Traditional AI writers invent claims out of nowhere. Byro anchors every post in verified company expertise and holds authors accountable.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="group relative bg-byro-grid rounded-3xl border border-purple-200/80 overflow-hidden p-6 hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4 z-10 relative">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="text-xs font-semibold text-purple-800 tracking-wide uppercase">
                  {feature.tag}
                </span>
                <h3 className="text-xl font-bold text-gray-950 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Ambient Forest Image Backdrop */}
              <div className="mt-8 rounded-2xl overflow-hidden h-40 relative group-hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-gray-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-left max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to turn company expertise into trusted reputation?
            </h3>
            <p className="text-purple-200 text-sm">
              Join expert-led B2B founders and leaders using Byro to compound their category authority on LinkedIn.
            </p>
          </div>
          <button className="px-6 py-3.5 rounded-full bg-white text-purple-950 font-semibold text-sm hover:bg-purple-100 transition-colors shrink-0 shadow-lg cursor-pointer">
            Get started with Byro
          </button>
        </div>

      </div>
    </section>
  );
}
