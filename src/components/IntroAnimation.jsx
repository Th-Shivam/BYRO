import { useState, useEffect, useRef } from 'react';
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
  },
  {
    id: 'emails',
    label: "Emails & Threads",
    sublabel: "Buried decisions",
    items: ["Lost attachments", "Buried context", "No history", "Forward chains"],
    color: "#92899b",
    front: "#7d7486",
  }
];

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0);
  const [openedCount, setOpenedCount] = useState(0);
  const openedSet = useRef(new Set());
  
  const handleOpenChange = (isOpen, id) => {
    if (isOpen) {
      openedSet.current.add(id);
      const count = openedSet.current.size;
      setOpenedCount(count);
      
      if (count === FOLDERS.length && step === 0) {
        // All folders opened! Wait a moment, then auto-advance
        setStep(1);
        setTimeout(() => setStep(2), 700);
        setTimeout(() => setStep(3), 1300);
        setTimeout(() => setStep(4), 2100);
        setTimeout(() => onComplete(), 3000);
      }
    }
  };

  const closing = step >= 4;

  return (
    <div className={`ia-overlay${closing ? ' ia-overlay--out' : ''}`} aria-label="Loading BYRO">
      
      {/* ── Scattered Folders ─────────────────────────────────── */}
      <div className={`ia-folders ${step >= 1 ? 'ia-folders--out' : ''}`}>
        
        <div className="ia-folders-layout">
          {/* Center text */}
          <div className="ia-folders-title-center">
            Knowledge is scattered.
          </div>

          {/* Scattered Folders (Hover to open) */}
          {FOLDERS.map((f, i) => (
            <div key={f.id} className={`ia-folder-wrap ia-folder-wrap-${i}`}>
              <FolderFloat
                items={f.items}
                label={f.label}
                sublabel={f.sublabel}
                defaultOpen={false}
                trigger="hover"
                stayOpen={true}
                onOpenChange={(isOpen) => handleOpenChange(isOpen, f.id)}
                folderColor={f.color}
                frontColor={f.front}
                paperColor="#ffffff"
                itemColor="#ffffff"
                itemTextColor="#18181b"
                labelColor="#ffffff"
                width={260}
                height={190}
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
