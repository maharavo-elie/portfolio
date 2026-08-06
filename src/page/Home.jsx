import Profil from '../assets/profil.png';
import Panel from '../components/Panel';
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
  const panelRef = useRef(null);
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. La ligne "// bonjour, je suis développeur" fade + slide
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        // 2. Le nom s'affiche lettre par lettre, avec plus de peps
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
        // 3. Description
        .fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        // 4. Boutons
        .fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        )
        // 5. Panel de droite
        .fromTo(
          panelRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 },
          "-=0.5"
        );

      // 6. Flottement continu des boutons, une fois qu'ils sont apparus
      gsap.to(ctaRef.current.children, {
        y: -8,
        duration: 1.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        delay: tl.duration(),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Partie gauche */}
        <div>
          <p
            ref={introRef}
            className="font-mono text-[var(--accent)] text-sm mb-4"
          >
             bonjour, je suis développeur
          </p>

          <h1
            ref={nameRef}
            className="text-5xl md:text-6xl font-bold leading-tight [perspective:600px]"
          >
            {splitLetters("Maharavo")}
            <br />
            <span className="text-[var(--accent)]">
              {splitLetters("Elie")}
            </span>
          </h1>

          <p
            ref={descRef}
            className="mt-6 text-[var(--text-muted)] text-lg max-w-md"
          >
            Développeur Full Stack. Je construis des applications web
            concrètes — de la gestion de caisse aux plateformes de prêts —
            avec React, Laravel et MySQL.
          </p>

          <div ref={ctaRef} className="flex gap-4 mt-8">
            <a
              href="#projects"
              className="bg-[var(--accent)] text-[#04342c] font-medium px-6 py-3 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition"
            >
              Voir mes projets
            </a>

            <a
              href="/cv.pdf"
              className="border border-[var(--border)] px-6 py-3 rounded-lg hover:border-[var(--accent)] hover:-translate-y-0.5 transition"
            >
              Télécharger le CV
            </a>
          </div>
        </div>

        {/* Partie droite */}
        <div ref={panelRef}>
          <Panel filename="profil.json">
            <div className="flex flex-col items-center text-center">
              <img
                src={Profil}
                alt="Profil"
                className="w-60 h-60 rounded-lg object-cover border border-[var(--border)] mb-6"
              />

              <div className="w-full font-mono text-sm text-left space-y-2">
                <p><span className="text-[var(--text-muted)]">"nom"</span>: <span className="text-[var(--accent)]">"Maharavo Elie"</span>,</p>
                <p><span className="text-[var(--text-muted)]">"role"</span>: <span className="text-[var(--accent-2)]">"Full Stack Dev"</span>,</p>
                <p><span className="text-[var(--text-muted)]">"stack"</span>: [<span className="text-[var(--accent-2)]">"React"</span>, <span className="text-[var(--accent-2)]">"Laravel"</span>, <span className="text-[var(--accent-2)]">"MySQL"</span>],</p>
                <p><span className="text-[var(--text-muted)]">"lieu"</span>: <span className="text-[var(--accent-2)]">"Madagascar"</span></p>
              </div>
            </div>
          </Panel>
        </div>

      </div>
    </section>
  );
}
