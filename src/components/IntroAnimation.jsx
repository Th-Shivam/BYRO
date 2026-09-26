import { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const STORY_LINES = [
  { text: 'Your company knows things.', delay: 450 },
  { text: 'Expertise built over years.', delay: 1200 },
  { text: 'Now it can move with you.', delay: 2050 },
];

const REVEAL_START = 4200;

function createParticle(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    size: Math.random() * 1.7 + 0.5,
    alpha: Math.random() * 0.35 + 0.12,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
  };
}

export default function IntroAnimation({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

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
      particlesRef.current = Array.from({ length: 54 }, () => createParticle({ width: window.innerWidth, height: window.innerHeight }));
    };
    resize();
    window.addEventListener('resize', resize);
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha += particle.alphaDir * 0.002;
        if (particle.alpha <= 0.08 || particle.alpha >= 0.42) particle.alphaDir *= -1;
        if (particle.x < -5) particle.x = window.innerWidth + 5;
        if (particle.x > window.innerWidth + 5) particle.x = -5;
        if (particle.y < -5) particle.y = window.innerHeight + 5;
        if (particle.y > window.innerHeight + 5) particle.y = -5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(119, 81, 161, ${particle.alpha})`;
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

  useEffect(() => {
    const timers = STORY_LINES.map((line, index) => setTimeout(() => {
      setVisibleLines((previous) => [...previous, index]);
    }, line.delay));
    const logoTimer = setTimeout(() => setLogoVisible(true), REVEAL_START - 750);
    const closeTimer = setTimeout(() => {
      setClosing(true);
      setTimeout(onComplete, 780);
    }, REVEAL_START);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(logoTimer);
      clearTimeout(closeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-overlay${closing ? ' intro-overlay--closing' : ''}`} aria-label="Loading BYRO">
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />
      <div className="intro-wash intro-wash--top" aria-hidden="true" />
      <div className="intro-wash intro-wash--bottom" aria-hidden="true" />
      <div className={`intro-lines${logoVisible ? ' intro-lines--fade' : ''}`}>
        {STORY_LINES.map((line, index) => (
          <div key={line.text} className={`intro-line${visibleLines.includes(index) ? ' intro-line--visible' : ''}${visibleLines.includes(index) && index < visibleLines[visibleLines.length - 1] ? ' intro-line--dim' : ''}`}>
            <span className="intro-line-number">0{index + 1}</span>
            <span className="intro-line-bar" />
            <span className="intro-line-text">{line.text}</span>
          </div>
        ))}
      </div>
      <div className={`intro-logo${logoVisible ? ' intro-logo--visible' : ''}`}>
        <div className="intro-logo-mark" aria-hidden="true">
          <span className="intro-logo-ring intro-logo-ring--outer" />
          <span className="intro-logo-ring intro-logo-ring--inner" />
          <span className="intro-logo-star">✦</span>
        </div>
        <div className="intro-logo-word">byro<span>.</span></div>
        <div className="intro-logo-tag">The reputation workspace</div>
      </div>
      <div className="intro-footer">
        <span>MADE FOR THE KNOWLEDGE-LED</span>
        <span className="intro-loader-status"><i /> Preparing your workspace</span>
      </div>
      <div className="intro-progress" aria-hidden="true"><div className="intro-progress-bar" /></div>
    </div>
  );
}
