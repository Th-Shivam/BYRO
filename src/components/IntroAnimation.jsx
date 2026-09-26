import { useState } from 'react';
import './IntroAnimation.css';
import FolderFloat from './FolderFloat';
import { ArrowRight } from 'lucide-react';

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

  const handleSolutionClick = () => {
    if (step > 0) return;
    setStep(1);
    
    // Sequence after click
    setTimeout(() => setStep(2), 700);
    setTimeout(() => setStep(3), 1300);
    setTimeout(() => setStep(4), 2100);
    setTimeout(() => onComplete(), 3000);
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
          <div className="ia-folder-wrap ia-folder-wrap-0">
            <FolderFloat
              items={FOLDERS[0].items}
              label={FOLDERS[0].label}
              sublabel={FOLDERS[0].sublabel}
              defaultOpen={false}
              trigger="hover"
              folderColor={FOLDERS[0].color}
              frontColor={FOLDERS[0].front}
              paperColor="#ffffff"
              itemColor="#ffffff"
              itemTextColor="#18181b"
              labelColor="#ffffff"
              width={260}
              height={190}
              stagger={40}
            />
          </div>

          <div className="ia-folder-wrap ia-folder-wrap-1">
            <FolderFloat
              items={FOLDERS[1].items}
              label={FOLDERS[1].label}
              sublabel={FOLDERS[1].sublabel}
              defaultOpen={false}
              trigger="hover"
              folderColor={FOLDERS[1].color}
              frontColor={FOLDERS[1].front}
              paperColor="#ffffff"
              itemColor="#ffffff"
              itemTextColor="#18181b"
              labelColor="#ffffff"
              width={260}
              height={190}
              stagger={40}
            />
          </div>

          <div className="ia-folder-wrap ia-folder-wrap-2">
            <FolderFloat
              items={FOLDERS[2].items}
              label={FOLDERS[2].label}
              sublabel={FOLDERS[2].sublabel}
              defaultOpen={false}
              trigger="hover"
              folderColor={FOLDERS[2].color}
              frontColor={FOLDERS[2].front}
              paperColor="#ffffff"
              itemColor="#ffffff"
              itemTextColor="#18181b"
              labelColor="#ffffff"
              width={260}
              height={190}
              stagger={40}
            />
          </div>
        </div>

        <button className="ia-solution-btn" onClick={handleSolutionClick}>
          Go with this solution <ArrowRight size={18} />
        </button>
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
