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

export default function Home() {
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

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
        );

      // 2. CORRECTION : Animation de flottement infinie fluide
      // Nous créons une animation distincte pour chaque bouton afin d'éviter le décalage (stagger) qui saccade ici.
      const boutons = ctaRef.current.children;
      
      Array.from(boutons).forEach((bouton, index) => {
          gsap.to(bouton, {
            y: -10, // Amplitude légèrement augmentée
            duration: 1.6,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            // On conserve un léger décalage dans le démarrage pour le style, mais SANS stagger sur l'animation repeat.
            delay: tl.duration() + (index * 0.2), 
          });
      });
    });

    return () => ctx.revert(); // Nettoyage propre
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full">

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

        <div ref={ctaRef} className="flex gap-4 mt-10 justify-end">
          {/* CORRECTION : Classes CSS */}
          <a
            href="#projects"
            // J'ai ajouté transition-transform pour l'exemple, mais assurez-vous 
            // de ne pas avoir de transition CSS sur la propriété 'y' (transform).
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
    </section>
  );
}