import Profil from '../assets/profil.png';
import Panel from '../components/Panel';
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Partie gauche */}
        <div>
          <p className="font-mono text-[var(--accent)] text-sm mb-4">
            // bonjour, je suis développeur
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Maharavo
            <br />
            <span className="text-[var(--accent)]">Elie</span>
          </h1>

          <p className="mt-6 text-[var(--text-muted)] text-lg max-w-md">
            Développeur Full Stack. Je construis des applications web
            concrètes — de la gestion de caisse aux plateformes de prêts —
            avec React, Laravel et MySQL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#projects"
              className="text-center bg-[var(--accent)] text-[#04342c] font-medium px-6 py-3 rounded-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all"
            >
              Voir mes projets
            </a>

            <a
              href="/cv.pdf"
              className="text-center border border-[var(--border)] px-6 py-3 rounded-lg hover:border-[var(--accent)] hover:scale-105 active:scale-95 transition-all"
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
                className="w-40 h-40 rounded-lg object-cover border border-[var(--border)] mb-6"
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
