import { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const STORY_LINES = [
  { text: 'Your company knows things.', delay: 450 },
  { text: 'Expertise built over years.', delay: 1250 },
  { text: 'Now it can move with you.', delay: 2150 },
];

const REVEAL_START = 4400;

/* ── Particle factory ──────────────────────────────────────────── */
function createParticle(w, h) {
  const hue = 260 + Math.random() * 40; // purple range
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    size: Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.4 + 0.08,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    hue,
  };
}

export default function IntroAnimation({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  /* ── Canvas particles ──────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particlesRef.current = Array.from({ length: 80 }, () =>
        createParticle(window.innerWidth, window.innerHeight),
      );
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha <= 0.05 || p.alpha >= 0.48) p.alphaDir *= -1;
        if (p.x < -5) p.x = window.innerWidth + 5;
        if (p.x > window.innerWidth + 5) p.x = -5;
        if (p.y < -5) p.y = window.innerHeight + 5;
        if (p.y > window.innerHeight + 5) p.y = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 65%, 70%, ${p.alpha})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Sequence timers ───────────────────────────────────────────── */
  useEffect(() => {
    const timers = STORY_LINES.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay),
    );

    const logoTimer = setTimeout(() => setLogoVisible(true), REVEAL_START - 800);
    const closeTimer = setTimeout(() => {
      setClosing(true);
      setTimeout(onComplete, 900);
    }, REVEAL_START);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(logoTimer);
      clearTimeout(closeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`intro-overlay${closing ? ' intro-overlay--closing' : ''}`}
      aria-label="Loading BYRO"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />

      {/* Ambient background blobs */}
      <div className="intro-wash intro-wash--tl" aria-hidden="true" />
      <div className="intro-wash intro-wash--br" aria-hidden="true" />
      <div className="intro-wash intro-wash--center" aria-hidden="true" />

      {/* Subtle grid overlay */}
      <div className="intro-grid" aria-hidden="true" />

      {/* Scanlines */}
      <div className="intro-scanlines" aria-hidden="true" />

      {/* Story lines */}
      <div className={`intro-lines${logoVisible ? ' intro-lines--fade' : ''}`}>
        {STORY_LINES.map((line, index) => {
          const isVisible = visibleLines.includes(index);
          const isDim = isVisible && index < visibleLines[visibleLines.length - 1];
          return (
            <div
              key={line.text}
              className={`intro-line${isVisible ? ' intro-line--visible' : ''}${isDim ? ' intro-line--dim' : ''}`}
            >
              <span className="intro-line-number">0{index + 1}</span>
              <span className="intro-line-bar" />
              <span className="intro-line-text">{line.text}</span>
            </div>
          );
        })}
      </div>

      {/* Logo reveal */}
      <div className={`intro-logo${logoVisible ? ' intro-logo--visible' : ''}`}>
        <div className="intro-logo-mark" aria-hidden="true">
          <span className="intro-logo-ring intro-logo-ring--outer" />
          <span className="intro-logo-ring intro-logo-ring--mid" />
          <span className="intro-logo-ring intro-logo-ring--inner" />
          <span className="intro-logo-orbit" />
          <span className="intro-logo-star">✦</span>
        </div>
        <div className="intro-logo-word">
          byro<span>.</span>
        </div>
        <div className="intro-logo-tag">The reputation workspace</div>
      </div>

      {/* Footer */}
      <div className="intro-footer">
        <span>MADE FOR THE KNOWLEDGE-LED</span>
        <span className="intro-loader-status">
          <i /> Preparing your workspace
        </span>
      </div>

      {/* Progress bar */}
      <div className="intro-progress" aria-hidden="true">
        <div className="intro-progress-bar" />
      </div>
    </div>
  );
}
