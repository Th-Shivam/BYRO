import { useEffect, useState } from 'react';
import './IntroAnimation.css';
import FolderFloat from './FolderFloat';

const FOLDERS = [
  {
    id: 'company',
    label: "Company Knowledge",
    sublabel: "Scattered docs",
    items: ["Hidden in wikis", "Lost in Slack", "Outdated PDFs", "Siloed info"],
    color: "#6e6874",
    front: "#5a5360",
  },
  {
    id: 'interview',
    label: "Interviews",
    sublabel: "Unused insights",
    items: ["Unread transcripts", "Forgotten quotes", "Lost context", "No search"],
    color: "#8863bb",
    front: "#7751a1",
  },
  {
    id: 'client',
    label: "Client Conversations",
    sublabel: "Trust gaps",
    items: ["Unanswered questions", "Missed proof", "Slow replies", "Lost trust"],
    color: "#a49ba9",
    front: "#8c8393",
  }
];

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0);
  /*
    step 0 → initial (folders fading in)
    step 1 → folders fading out
    step 2 → byro solution in
    step 3 → byro tagline in
    step 4 → closing overlay
  */

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 3800), // wait for folders to open and be read
      setTimeout(() => setStep(2), 4400),
      setTimeout(() => setStep(3), 5000),
      setTimeout(() => setStep(4), 5800),
      setTimeout(() => onComplete(), 6700),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const closing = step >= 4;

  return (
    <div className={`ia-overlay${closing ? ' ia-overlay--out' : ''}`} aria-label="Loading BYRO">
      
      {/* ── Scattered Folders ─────────────────────────────────── */}
      <div className={`ia-folders ${step >= 1 ? 'ia-folders--out' : ''}`}>
        <div className="ia-folders-title">Knowledge is scattered.</div>
        <div className="ia-folders-container">
          {FOLDERS.map((f, i) => (
            <div key={f.id} className={`ia-folder-wrap ia-folder-wrap-${i}`}>
              <FolderFloat
                items={f.items}
                label={f.label}
                sublabel={f.sublabel}
                defaultOpen={true}
                trigger="none"
                folderColor={f.color}
                frontColor={f.front}
                paperColor="#ffffff"
                itemColor="#ffffff"
                itemTextColor="#18181b"
                labelColor="#ffffff"
                width={190}
                height={140}
                stagger={40}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Solution reveal ───────────────────────────── */}
      <div className={`ia-solution${step >= 2 ? ' ia-solution--in' : ''}`}>
        <div className={`ia-byro${step >= 2 ? ' in' : ''}`}>
          <span className="ia-byro-word">byro</span>
          <span className="ia-byro-dot">.</span>
        </div>
        <p className={`ia-byro-tag${step >= 3 ? ' in' : ''}`}>
          The reputation workspace
        </p>
      </div>

      {/* ── Subtle grid overlay (matches hero) ────────────── */}
      <div className="ia-grid" aria-hidden="true" />
    </div>
  );
}
