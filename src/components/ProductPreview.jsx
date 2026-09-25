import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, MessageSquare, ArrowRight, 
  UserCheck, ShieldCheck, FileText, Send, 
  Check, Lock, ExternalLink, HelpCircle
} from 'lucide-react';

const LinkedInIcon = ({ className = "w-4 h-4 text-blue-600" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);
import rookMascot from '../../images/rook-mascot.png';

export default function ProductPreview({ activeTab, setActiveTab }) {
  const [selectedEvidenceLine, setSelectedEvidenceLine] = useState(3);
  const [mascotBubble, setMascotBubble] = useState("I recommend what to say next! ✦");

  const tabs = [
    { id: 'hero', label: 'Product Overview' },
    { id: 'reputation', label: 'Reputation Map' },
    { id: 'work', label: 'Evidence Editor (Work)' },
    { id: 'team', label: 'Team & Permissions' },
  ];

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      {/* Tab Switcher Controls */}
      <div className="flex items-center justify-center mb-6 overflow-x-auto py-2">
        <div className="inline-flex p-1.5 rounded-2xl bg-white border border-purple-100 shadow-md backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-950 text-white shadow-sm'
                  : 'text-gray-600 hover:text-purple-950 hover:bg-purple-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product App Frame Container */}
      <div className="relative bg-white rounded-3xl border border-purple-200/80 shadow-2xl shadow-purple-950/10 overflow-visible transition-all">
        
        {/* ROOK MASCOT PLACED AT THE TOP-RIGHT CORNER */}
        <div 
          className="absolute -top-12 -right-4 sm:-top-16 sm:-right-8 md:-top-20 md:-right-10 z-40 flex flex-col items-end group cursor-pointer"
          onClick={() => {
            const bubbles = [
              "Every post has real proof! ✦",
              "Human author stays in total control! 🛡️",
              "No generic AI writing here! 🧠",
              "I recommend what to say next! ✦"
            ];
            setMascotBubble(bubbles[Math.floor(Math.random() * bubbles.length)]);
          }}
        >
          {/* Speech Bubble */}
          <div className="relative mb-2 px-3.5 py-1.5 rounded-2xl bg-purple-950 text-purple-100 text-xs font-medium shadow-xl border border-purple-700/50 backdrop-blur-md group-hover:scale-105 transition-transform animate-bounce">
            <span>{mascotBubble}</span>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-purple-950 rotate-45 border-r border-b border-purple-700/50" />
          </div>

          {/* Rook Image */}
          <div className="relative w-28 sm:w-36 md:w-44 animate-float drop-shadow-2xl">
            <img 
              src={rookMascot} 
              alt="Byro Mascot - Monocle Rook" 
              className="w-full h-auto object-contain hover:rotate-3 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Mock Browser Header Bar */}
        <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-200/80 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-medium text-gray-400 font-mono">app.byro.so</span>
          </div>

          {/* App Top Menu */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1.5 text-purple-900 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Byro Workspace
            </span>
            <span>Reputation Briefs</span>
            <span>Ask Byro</span>
          </div>
        </div>

        {/* TAB 1: PRODUCT OVERVIEW */}
        {activeTab === 'hero' && (
          <div className="p-6 sm:p-10 bg-gradient-to-b from-purple-50/30 to-white min-h-[500px]">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
                  <span>Recommendation System</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                  Choose what to say next.
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Byro recommends one post or response because it connects the active goal to evidence your team supplied. You can accept it, redirect it or leave it for later.
                </p>
                <div className="pt-2 flex flex-col gap-3 text-sm text-gray-700 font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Evidence attached to every statement</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Human author remains in 100% control</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Direct LinkedIn workflow integration</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-white rounded-2xl border border-purple-100 shadow-xl p-5 text-left">
                {/* Embedded Mini Work Snapshot */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn post draft</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[11px] font-semibold">Draft</span>
                </div>

                <div className="py-4 space-y-3">
                  <h4 className="text-xl font-serif font-semibold text-gray-900">
                    The proof should travel with the story.
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    As teams grow, something subtle happens: the insights that once shaped every decision start to get lost. Not because people stop caring, but because knowledge lives in conversations...
                  </p>
                </div>

                {/* Evidence Card Snippet */}
                <div className="bg-purple-50/70 rounded-xl p-3.5 border border-purple-100 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-200 flex items-center justify-center text-purple-900 shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between font-semibold text-purple-950">
                      <span>Founder interview (00:48)</span>
                      <span className="text-[10px] text-purple-700">Confirmed by Fathin</span>
                    </div>
                    <p className="text-gray-600 italic">
                      "Knowledge lives in conversations, documents, and heads — not where work happens."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REPUTATION MAP VIEW */}
        {activeTab === 'reputation' && (
          <div className="p-6 sm:p-10 bg-gray-50/50 min-h-[520px] text-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-950">Reputation</h3>
                <p className="text-xs text-gray-500">What people increasingly associate with Fathin Dos.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-700 shadow-2xs">
                  Reputation Map
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
                  Insights Active
                </span>
              </div>
            </div>

            {/* Central Node Visual */}
            <div className="relative my-8 py-10 flex items-center justify-center min-h-[280px]">
              {/* Central Avatar */}
              <div className="relative z-10 w-20 h-20 rounded-full border-4 border-purple-200 shadow-xl overflow-hidden bg-purple-900 flex items-center justify-center text-white font-bold text-xl">
                <span>FD</span>
              </div>

              {/* Connecting Node 1 - Top Left */}
              <div className="absolute top-2 left-6 sm:left-16 bg-white p-4 rounded-xl border border-purple-100 shadow-md max-w-xs space-y-1">
                <div className="flex items-center gap-2">
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[11px] text-gray-500 font-medium">Founder interview</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Founder-led content</div>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Strong</span>
              </div>

              {/* Connecting Node 2 - Top Right */}
              <div className="absolute top-2 right-6 sm:right-16 bg-white p-4 rounded-xl border border-purple-100 shadow-md max-w-xs space-y-1">
                <div className="flex items-center gap-2">
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[11px] text-gray-500 font-medium">Founder-led article</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Building Byro</div>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Strong</span>
              </div>

              {/* Connecting Node 3 - Bottom Left */}
              <div className="absolute bottom-2 left-6 sm:left-16 bg-white p-4 rounded-xl border border-purple-100 shadow-md max-w-xs space-y-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-[11px] text-gray-500 font-medium">DACH buyer questions</span>
                </div>
                <div className="font-bold text-sm text-gray-900">B2B positioning</div>
                <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">Growing</span>
              </div>

              {/* Connecting Node 4 - Bottom Right */}
              <div className="absolute bottom-2 right-6 sm:right-16 bg-white p-4 rounded-xl border border-purple-100 shadow-md max-w-xs space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] text-gray-500 font-medium">Engagement pattern</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Building in public</div>
                <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">Growing</span>
              </div>
            </div>

            {/* Signal Emerging Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-purple-950 text-white flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[11px] text-purple-300 font-medium uppercase tracking-wider">A new signal is emerging</span>
                <div className="text-sm font-semibold text-white">Concrete consequence → stronger recognition</div>
              </div>
              <button 
                onClick={() => setActiveTab('work')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Review signal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: WORK EVIDENCE EDITOR VIEW */}
        {activeTab === 'work' && (
          <div className="p-6 sm:p-8 bg-white text-left">
            {/* Top Reputation Brief Bar */}
            <div className="mb-6 p-3.5 rounded-xl bg-purple-50 border border-purple-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-purple-950 font-medium">
                <span className="px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-bold text-[10px]">Reputation brief</span>
                <span>Expertise should compound, not disappear.</span>
                <span className="text-purple-400">•</span>
                <span className="text-gray-600">For founder-led B2B teams expanding into new markets</span>
              </div>
              <span className="text-purple-700 font-semibold cursor-pointer hover:underline">Change brief</span>
            </div>

            {/* Split Editor and Evidence Drawer */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left Main Article Editor */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <LinkedInIcon className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-900">LinkedIn post</span>
                    <span>• Fathin Dos</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">Draft Saved</span>
                </div>

                <h2 className="text-3xl font-serif font-bold text-gray-950 leading-tight">
                  The proof should travel with the story.
                </h2>

                {/* Paragraphs with Line Number Annotations */}
                <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-sans">
                  <div className="flex items-start gap-3 group">
                    <p className="flex-1">
                      As teams grow, something subtle happens: the insights that once shaped every decision start to get lost. Not because people stop caring, but because knowledge lives in conversations, documents, and heads — not where the work happens.
                    </p>
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold flex items-center justify-center shrink-0">1</span>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <p className="flex-1">
                      We've seen it in our own customer conversations. Teams scale headcount, but the context that made them effective doesn't scale with them.
                    </p>
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold flex items-center justify-center shrink-0">2</span>
                  </div>

                  <div 
                    onClick={() => setSelectedEvidenceLine(3)}
                    className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/80 border border-purple-200 cursor-pointer transition-all"
                  >
                    <p className="flex-1 text-purple-950 font-medium">
                      The result isn't just slower decisions. It's new hires re-learning old lessons, duplicated work, and confidence that quietly erodes. Expertise doesn't disappear all at once — it fades, one handoff at a time.
                    </p>
                    <span className="w-6 h-6 rounded-full bg-purple-900 text-white text-xs font-semibold flex items-center justify-center shrink-0 shadow-xs">3</span>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <p className="flex-1">
                      We built Byro to change that. By turning real conversations and proof into a shared reputation layer, teams can move into new markets without leaving their best thinking behind.
                    </p>
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold flex items-center justify-center shrink-0">4</span>
                  </div>
                </div>

                {/* Action Buttons Toolbar */}
                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700">Tag team</button>
                    <button className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700">Attach image</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-purple-100 text-purple-900 text-xs font-semibold hover:bg-purple-200">Send for review</button>
                    <button className="px-4 py-2 rounded-xl bg-gray-950 text-white text-xs font-semibold hover:bg-purple-950">Add to queue</button>
                  </div>
                </div>
              </div>

              {/* Right Evidence Sidebar Drawer */}
              <div className="md:col-span-5 bg-purple-50/50 rounded-2xl border border-purple-100 p-4 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
                  <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">Source Evidence (Line 3)</span>
                  <span className="text-[11px] text-purple-700 font-semibold cursor-pointer">View original transcript</span>
                </div>

                {/* Source Audio Quote Card */}
                <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-purple-950">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      <span>Founder interview</span>
                    </div>
                    <span className="text-purple-600 font-mono text-[11px]">00:48</span>
                  </div>
                  <p className="text-xs text-gray-700 italic leading-relaxed bg-gray-50 p-2.5 rounded-lg">
                    "The result isn't just slower decisions. It's new hires re-learning old lessons, duplicated work, and confidence that quietly erodes."
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirmed by Fathin (Author)</span>
                  </div>
                </div>

                {/* Reviewer Comment */}
                <div className="bg-white rounded-xl p-3.5 border border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-gray-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[10px] flex items-center justify-center">M</span>
                      Maya (Editor)
                    </span>
                    <span className="text-[10px] text-gray-400">Today at 10:18</span>
                  </div>
                  <p className="text-gray-600">
                    This is strong. Can we make the market-expansion consequence more concrete?
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px]">
                    <span className="text-purple-900 font-semibold cursor-pointer">Resolve</span>
                    <span className="text-gray-500 cursor-pointer hover:text-gray-800">Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TEAM & PERMISSIONS VIEW */}
        {activeTab === 'team' && (
          <div className="p-6 sm:p-10 bg-white text-left min-h-[500px] space-y-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-950">Team & Publishing Permissions</h3>
                <p className="text-xs text-gray-500">The workspace is shared. Personal LinkedIn permission is not.</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-purple-950 text-white text-xs font-semibold hover:bg-purple-900 transition-colors">
                + Invite teammate
              </button>
            </div>

            {/* People List */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-purple-900 text-white font-bold text-sm flex items-center justify-center">
                    FD
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Connected</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Fathin Dos</div>
                <div className="text-xs text-gray-500">Owner · Can sync approved posts</div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-white font-bold text-sm flex items-center justify-center">
                    MC
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Connected</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Maya Chen</div>
                <div className="text-xs text-gray-500">Editor · Can sync her own posts</div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-gray-400 text-white font-bold text-sm flex items-center justify-center">
                    JK
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Not Connected</span>
                </div>
                <div className="font-bold text-sm text-gray-900">Jonas Keller</div>
                <div className="text-xs text-gray-500">Reviewer · Copy & open fallback</div>
              </div>
            </div>

            {/* Security Guarantee Callout */}
            <div className="p-4 rounded-2xl bg-purple-950 text-purple-100 flex items-center gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-purple-300 shrink-0" />
              <span>
                <strong>Strict Author Control:</strong> Every person connects their own account. Workspace owners cannot silently publish as another team member.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
