import { useEffect, useRef } from "react";
import gsap from "gsap";

// Découpe un texte en spans pour animer lettre par lettre
function splitLetters(text) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

// Grille de points réactive à la souris, façon HUD/viseur
function ScanGrid({ panelRef }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let width, height, dots;

    const spacing = 28; // espace entre les points
    const radius = 140; // rayon d'influence de la souris
    const baseSize = 1.5;
    const maxSize = 4;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;

      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ x, y });
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "#4ade80";

      dots.forEach((dot) => {
        const dx = dot.x - mouseRef.current.x;
        const dy = dot.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / radius);

        const size = baseSize + (maxSize - baseSize) * influence;
        const opacity = 0.15 + 0.85 * influence;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          influence > 0.05
            ? `${accent}${Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0")}`
            : "rgba(255,255,255,0.12)";
        ctx.fill();

        // petit cercle "lock" autour des points proches, façon HUD
        if (influence > 0.5) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, size + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `${accent}55`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="hidden md:block relative w-full h-full min-h-[400px] opacity-0"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default function Home() {
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Timeline principale pour l'apparition
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          nameRef.current.querySelectorAll(".inline-block"),
          {
            opacity: 0,
            y: 60,
            scale: 0.4,
            rotateX: -90,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "back.out(3)",
            stagger: {
              each: 0.045,
              from: "center",
            },
          },
          "-=0.2"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          panelRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.6"
        );

      // 2. Animation de flottement infinie fluide sur les boutons
      // Une animation distincte par bouton pour éviter le décalage saccadé du stagger.
      const boutons = ctaRef.current.children;

      Array.from(boutons).forEach((bouton, index) => {
        gsap.to(bouton, {
          y: -10, // Amplitude légèrement augmentée
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          // On conserve un léger décalage dans le démarrage pour le style, mais SANS stagger sur l'animation repeat.
          delay: tl.duration() + index * 0.2,
        });
      });
    });

    return () => ctx.revert(); // Nettoyage propre
  }, []);

  return (
    <section id="home" className="min-h-[calc(100vh-5rem)] flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p
            ref={introRef}
            className="font-mono text-[var(--accent)] text-sm mb-4"
          >
            bonjour, je suis développeur
          </p>

          <h1
            ref={nameRef}
            className="text-6xl md:text-8xl font-bold leading-none [perspective:600px]"
          >
            {splitLetters("Maharavo")}
            <br />
            <span className="text-[var(--accent)]">
              {splitLetters("Elie")}
            </span>
          </h1>

          <p
            ref={taglineRef}
            className="mt-8 text-[var(--text-muted)] text-xl md:text-2xl max-w-2xl"
          >
            Je transforme des idées en applications web solides,
            du concept au déploiement.
          </p>

          <div ref={ctaRef} className="flex gap-4 mt-10">
            <a
              href="#projects"
              className="bg-[var(--accent)] text-[#04342c] font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 ease-out will-change-transform"
            >
              Voir mes projets
            </a>

            <a
              href="/cv.pdf"
              className="border border-[var(--border)] px-6 py-3 rounded-lg hover:border-[var(--accent)] transition-all duration-300 ease-out will-change-transform"
            >
              Télécharger le CV
            </a>
          </div>
        </div>

        <ScanGrid panelRef={panelRef} />
      </div>
    </section>
  );
}
