import { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

/* ─── Constants ─────────────────────────────────────────────── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$&?!><{}[]';

const LINES = [
  'Your company knows things.',
  'Expertise built over years.',
  'Now it can move with you.',
];

// when each line starts scrambling (ms)
const LINE_DELAYS = [300, 1100, 1900];
const LOGO_AT    = 3200;   // switch to logo phase
const EXIT_AT    = 4900;   // start closing
const DONE_AFTER = 1000;   // ms after exit → onComplete

/* ─── ScrambleLine ──────────────────────────────────────────── */
function ScrambleLine({ text, active }) {
  const [display, setDisplay] = useState(() =>
    text.split('').map((c) => ({
      ch: c === ' ' ? '\u00A0' : '\u00A0',
      locked: c === ' ',
    })),
  );

  useEffect(() => {
    if (!active) return undefined;

    const chars = text.split('');
    let lockedIdx = 0;

    // seed initial scramble
    setDisplay(
      chars.map((c) => ({
        ch:
          c === ' '
            ? '\u00A0'
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        locked: c === ' ',
      })),
    );

    // fast redraw of unlocked chars
    const scramId = setInterval(() => {
      setDisplay((prev) =>
        prev.map((item) =>
          item.locked
            ? item
            : {
                ch: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
                locked: false,
              },
        ),
      );
    }, 32);

    // lock one character at a time
    const lockId = setInterval(() => {
      if (lockedIdx >= chars.length) {
        clearInterval(scramId);
        clearInterval(lockId);
        return;
      }
      const i = lockedIdx;
      lockedIdx += 1;
      setDisplay((prev) => {
        const next = [...prev];
        next[i] = { ch: chars[i] === ' ' ? '\u00A0' : chars[i], locked: true };
        return next;
      });
    }, 52);

    return () => {
      clearInterval(scramId);
      clearInterval(lockId);
    };
  }, [active, text]);

  return (
    <span className="sl-text" aria-label={text}>
      {display.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={i} className={`sl-ch${item.locked ? ' sl-on' : ' sl-off'}`}>
          {item.ch}
        </span>
      ))}
    </span>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function IntroAnimation({ onComplete }) {
  const [tick, setTick]               = useState(0);
  const [lineActive, setLineActive]   = useState([false, false, false]);
  const [phase, setPhase]             = useState('scan');   // 'scan' | 'logo'
  const [logoOn, setLogoOn]           = useState([false, false, false, false, false]);
  const [tagOn, setTagOn]             = useState(false);
  const [closing, setClosing]         = useState(false);
  const timerIds = useRef([]);

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timerIds.current.push(id);
    return id;
  };

  useEffect(() => {
    const tickId = setInterval(() => setTick((t) => (t + 1) % 1000), 50);

    /* activate scramble lines */
    LINE_DELAYS.forEach((delay, i) =>
      later(
        () => setLineActive((prev) => { const n = [...prev]; n[i] = true; return n; }),
        delay,
      ),
    );

    /* logo phase */
    later(() => {
      setPhase('logo');
      'byro.'.split('').forEach((_, i) =>
        later(
          () => setLogoOn((prev) => { const n = [...prev]; n[i] = true; return n; }),
          i * 130,
        ),
      );
      later(() => setTagOn(true), 700);
    }, LOGO_AT);

    /* exit */
    later(() => {
      setClosing(true);
      later(onComplete, DONE_AFTER);
    }, EXIT_AT);

    return () => {
      clearInterval(tickId);
      timerIds.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`ia-root${closing ? ' ia-closing' : ''}`}
      aria-label="Loading BYRO"
    >
      {/* Ambient scan beam */}
      <div className="ia-beam" aria-hidden="true" />

      {/* HUD corners */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <span key={pos} className={`ia-corner ia-${pos}`} aria-hidden="true" />
      ))}

      {/* Top HUD bar */}
      <div className="ia-hud-top" aria-hidden="true">
        <span className="ia-hud-id">BYRO / INIT</span>
        <span className="ia-hud-frame">[{String(tick).padStart(3, '0')}]</span>
      </div>

      {/* ── Body ── */}
      <div className="ia-body">
        {/* Scramble lines */}
        <div className={`ia-lines${phase === 'logo' ? ' ia-lines--out' : ''}`}>
          {LINES.map((text, i) => (
            <div key={text} className="ia-line-row">
              <span className="ia-line-num">0{i + 1}</span>
              <span className="ia-line-bar" />
              <ScrambleLine text={text} active={lineActive[i]} />
            </div>
          ))}
        </div>

        {/* Logo wordmark */}
        <div
          className={`ia-logo${phase === 'logo' ? ' ia-logo--in' : ''}`}
          aria-label="byro."
        >
          <div className="ia-wordmark">
            {'byro.'.split('').map((ch, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span
                key={i}
                className={`ia-wm-ch${logoOn[i] ? ' on' : ''}${ch === '.' ? ' dot' : ''}`}
              >
                {ch}
              </span>
            ))}
          </div>
          <p className={`ia-tag${tagOn ? ' on' : ''}`}>The reputation workspace</p>
          <div className={`ia-rule${tagOn ? ' on' : ''}`} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="ia-bottom" aria-hidden="true">
        <div className="ia-progress">
          <div className="ia-progress-fill" />
        </div>
        <div className="ia-status">
          <span className="ia-dot" />
          Preparing workspace
        </div>
      </div>
    </div>
  );
}
