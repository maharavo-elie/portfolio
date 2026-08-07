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

  // Rouge vif néon ultra contrasté
  const color = isPointer ? '#ff0033' : 'var(--accent)';
  const size = isPointer ? 36 : 48;

  return (
    <>
      {/* Point central : suppression du mix-blend au hover pour garder un vrai rouge vif et néon */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full transition-colors duration-150 ${
          isPointer ? '' : 'mix-blend-difference'
        }`}
        style={{ 
          backgroundColor: color, 
          boxShadow: isPointer 
            ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}` 
            : `0 0 8px ${color}, 0 0 14px ${color}`
        }}
      />

      {/* Groupe du viseur */}
      <div
        ref={viseurRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isPointer ? '' : 'mix-blend-difference'
        }`}
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox="0 0 48 48" style={{ overflow: 'visible' }}>

          {/* Anneau pointillé rotatif */}
          <g ref={rotationRef} style={{ transformOrigin: '24px 24px' }}>
            <circle
              cx="24" cy="24" r="17"
              fill="none" stroke={color} strokeWidth={isPointer ? "2.2" : "1.8"}
              strokeDasharray="4 4" opacity={isPointer ? "1" : "0.8"}
            />
          </g>

          {/* Cercle central renforcé avec contour blanc sous-jacent si rouge */}
          {isPointer && (
            <circle
              cx="24" cy="24" r={6}
              fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.3"
            />
          )}
          <circle
            cx="24" cy="24" r={isPointer ? 6 : 9}
            fill={isPointer ? "rgba(255, 0, 51, 0.15)" : "none"} 
            stroke={color} strokeWidth={isPointer ? "2.5" : "2"}
            className="transition-all duration-200"
            style={{ 
              filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 12px ${color})` 
            }}
          />

          {/* Onde de choc au lock */}
          {justLocked && (
            <circle
              cx="24" cy="24" r="17"
              fill="none" stroke={color} strokeWidth="3"
              opacity="1"
            >
              <animate attributeName="r" from="8" to="24" dur="0.22s" fill="freeze" />
              <animate attributeName="opacity" from="1" to="0" dur="0.22s" fill="freeze" />
            </circle>
          )}
        </svg>
      </div>
    </>
  );
}