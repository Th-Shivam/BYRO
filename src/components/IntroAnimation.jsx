import { useEffect, useState } from 'react';
import './IntroAnimation.css';

/*
  Animation flow
  ──────────────
  0 ms         : overlay mounts, background visible
  200 ms       : problem cards slide in (left / right / bottom)
  1 400 ms     : cards settle — pause at center
  2 200 ms     : "The solution?" label fades in
  2 700 ms     : byro wordmark scales in
  3 500 ms     : tagline appears
  4 400 ms     : everything fades + overlay wipes away
  5 200 ms     : onComplete fires
*/

const PROBLEMS = [
  { id: 'left',   dir: 'left',   emoji: '📚', text: "Knowledge trapped in people\u2019s heads" },
  { id: 'right',  dir: 'right',  emoji: '🔁', text: 'Expertise lost when experts leave' },
  { id: 'bottom', dir: 'bottom', emoji: '🤝', text: 'Trust gaps in every client conversation' },
];

export default function IntroAnimation({ onComplete }) {
  const [step, setStep] = useState(0);
  /*
    step 0 → waiting
    step 1 → cards flying in
    step 2 → solution label
    step 3 → byro word
    step 4 → tagline
    step 5 → closing
  */

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 2700),
      setTimeout(() => setStep(4), 3500),
      setTimeout(() => setStep(5), 4400),
      setTimeout(() => onComplete(), 5300),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const closing = step >= 5;

  return (
    <div className={`ia-overlay${closing ? ' ia-overlay--out' : ''}`} aria-label="Loading BYRO">
      {/* ── Problem cards ─────────────────────────────────── */}
      <div className="ia-stage">
        {PROBLEMS.map((p) => (
          <div
            key={p.id}
            className={`ia-card ia-card--${p.dir}${step >= 1 ? ' ia-card--in' : ''}`}
          >
            <span className="ia-card-emoji">{p.emoji}</span>
            <span className="ia-card-text">{p.text}</span>
          </div>
        ))}

        {/* ── Solution reveal ───────────────────────────── */}
        <div className={`ia-solution${step >= 2 ? ' ia-solution--in' : ''}`}>
          <p className={`ia-solution-label${step >= 2 ? ' in' : ''}`}>The solution?</p>

          <div className={`ia-byro${step >= 3 ? ' in' : ''}`}>
            <span className="ia-byro-word">byro</span>
            <span className="ia-byro-dot">.</span>
          </div>

          <p className={`ia-byro-tag${step >= 4 ? ' in' : ''}`}>
            The reputation workspace
          </p>
        </div>
      </div>

      {/* ── Subtle grid overlay (matches hero) ────────────── */}
      <div className="ia-grid" aria-hidden="true" />
    </div>
  );
}
