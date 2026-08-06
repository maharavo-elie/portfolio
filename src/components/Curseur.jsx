import { useEffect, useRef, useState } from 'react';

export default function Curseur() {
  const dotRef = useRef(null);
  const viseurRef = useRef(null);
  const rotationRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [justLocked, setJustLocked] = useState(false);

  const [isVisible] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    if (!isVisible) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const viseur = { x: mouse.x, y: mouse.y };
    let rafId;
    let lockTimer;
    let angle = 0;
    let wasPointer = false;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
      }

      const target = e.target;
      const pointerNow =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a, button, [role="button"]') !== null;

      setIsPointer(pointerNow);
      if (pointerNow && !wasPointer) {
        setJustLocked(true);
        clearTimeout(lockTimer);
        lockTimer = setTimeout(() => setJustLocked(false), 220);
      }
      wasPointer = pointerNow;
    };

    const animate = () => {
      viseur.x += (mouse.x - viseur.x) * 0.2;
      viseur.y += (mouse.y - viseur.y) * 0.2;
      angle = (angle + 0.6) % 360;

      if (viseurRef.current) {
        viseurRef.current.style.transform =
          `translate(${viseur.x}px, ${viseur.y}px) translate(-50%, -50%)`;
      }
      if (rotationRef.current) {
        rotationRef.current.style.transform = `rotate(${angle}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      clearTimeout(lockTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const color = isPointer ? '#ff3b3b' : 'var(--accent)';
  const size = isPointer ? 36 : 48;

  return (
    <>
      {/* Point central plus épais et plus lumineux */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
                   w-2 h-2 rounded-full transition-colors duration-150"
        style={{ 
          backgroundColor: color, 
          boxShadow: `0 0 8px ${color}, 0 0 14px ${color}` 
        }}
      />

      {/* Groupe du viseur */}
      <div
        ref={viseurRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
                   transition-all duration-300 ease-out"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox="0 0 48 48" style={{ overflow: 'visible' }}>

          {/* Anneau pointillé rotatif plus épais */}
          <g ref={rotationRef} style={{ transformOrigin: '24px 24px' }}>
            <circle
              cx="24" cy="24" r="17"
              fill="none" stroke={color} strokeWidth="1.8"
              strokeDasharray="4 4" opacity="0.8"
            />
          </g>

          {/* Cercle central avec épaisseur 2px et drop-shadow appuyé */}
          <circle
            cx="24" cy="24" r={isPointer ? 6 : 9}
            fill="none" stroke={color} strokeWidth="2"
            className="transition-all duration-200"
            style={{ filter: `drop-shadow(0 0 5px ${color})` }}
          />

          {/* Flash / Onde de choc au lock plus épaisse */}
          {justLocked && (
            <circle
              cx="24" cy="24" r="17"
              fill="none" stroke={color} strokeWidth="2.5"
              opacity="0.9"
            >
              <animate attributeName="r" from="8" to="22" dur="0.22s" fill="freeze" />
              <animate attributeName="opacity" from="1" to="0" dur="0.22s" fill="freeze" />
            </circle>
          )}
        </svg>
      </div>
    </>
  );
}