import { useState, useEffect, useRef } from 'react';
import './IntroAnimation.css';

const STORY_LINES = [
  { text: "Your company knows things.", delay: 600 },
  { text: "Expertise built over years.", delay: 1500 },
  { text: "Buried in calls, docs, and heads.", delay: 2400 },
  { text: "Never reaching the people who need it.", delay: 3300 },
];

const REVEAL_START = 4800;

// Particle class for background
function Particle(canvas) {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.vx = (Math.random() - 0.5) * 0.3;
  this.vy = (Math.random() - 0.5) * 0.3;
  this.size = Math.random() * 1.5 + 0.5;
  this.alpha = Math.random() * 0.4 + 0.1;
  this.alphaDir = Math.random() > 0.5 ? 1 : -1;
}

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('idle'); // idle | lines | logo | reveal
  const [visibleLines, setVisibleLines] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 80 }, () => new Particle(canvas));
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha <= 0.05 || p.alpha >= 0.5) p.alphaDir *= -1;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
        ctx.fill();
      });
      // Draw subtle connecting lines
      particlesRef.current.forEach((p, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const q = particlesRef.current[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Story sequencing
  useEffect(() => {
    setPhase('lines');

    STORY_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Fade lines out, show logo
    setTimeout(() => {
      setVisibleLines('fade');
      setTimeout(() => {
        setLogoVisible(true);
      }, 400);
    }, REVEAL_START - 800);

    // Trigger reveal
    setTimeout(() => {
      setClosing(true);
      setTimeout(() => {
        onComplete();
      }, 900);
    }, REVEAL_START);
  }, []);

  return (
    <div className={`intro-overlay${closing ? ' intro-overlay--closing' : ''}`}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="intro-canvas" />

      {/* Gradient orbs */}
      <div className="intro-orb intro-orb--1" />
      <div className="intro-orb intro-orb--2" />
      <div className="intro-orb intro-orb--3" />

      {/* Story Lines */}
      <div className={`intro-lines${visibleLines === 'fade' ? ' intro-lines--fade' : ''}`}>
        {STORY_LINES.map((line, i) => (
          <div
            key={i}
            className={`intro-line${
              Array.isArray(visibleLines) && visibleLines.includes(i) ? ' intro-line--visible' : ''
            }${
              Array.isArray(visibleLines) && visibleLines.includes(i) && i < visibleLines[visibleLines.length - 1]
                ? ' intro-line--dim'
                : ''
            }`}
          >
            <span className="intro-line-bar" />
            <span className="intro-line-text">{line.text}</span>
          </div>
        ))}
      </div>

      {/* Logo Reveal */}
      <div className={`intro-logo${logoVisible ? ' intro-logo--visible' : ''}`}>
        <div className="intro-logo-mark">✦</div>
        <div className="intro-logo-word">byro<span>.</span></div>
        <div className="intro-logo-tag">The Reputation Workspace</div>
      </div>

      {/* Bottom progress bar */}
      <div className="intro-progress">
        <div className="intro-progress-bar" style={{ animationDuration: `${REVEAL_START}ms` }} />
      </div>
    </div>
  );
}
