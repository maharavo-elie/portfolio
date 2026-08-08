import Profil from '../assets/elie.png';
import Panel from '../components/Panel';
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const panelRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      ).fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Titre centré au-dessus des deux colonnes */}
        <div className="text-center mb-12">
          <p className="font-mono text-[var(--accent)] text-sm">à propos</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Colonne Gauche : Photo & Carte de Profil */}
          <div ref={panelRef}>
            <Panel filename="profil.json">
              <div className="flex flex-col items-center text-center">
                <img
                  src={Profil}
                  alt="Profil"
                  className="w-60 h-60 rounded-lg object-cover border border-[var(--border)] mb-6"
                />

                <div className="w-full font-mono text-sm text-left space-y-2">
                  <p>
                    <span className="text-[var(--text-muted)]">"nom"</span>:{" "}
                    <span className="text-[var(--accent)]">"Maharavo Elie"</span>,
                  </p>
                  <p>
                    <span className="text-[var(--text-muted)]">"role"</span>:{" "}
                    <span className="text-[var(--accent-2)]">"Étudiant & Dev Full Stack"</span>,
                  </p>
                  <p>
                    <span className="text-[var(--text-muted)]">"stack"</span>: [
                    <span className="text-[var(--accent-2)]">"React"</span>,{" "}
                    <span className="text-[var(--accent-2)]">"Laravel"</span>,{" "}
                    <span className="text-[var(--accent-2)]">"MySQL"</span>],
                  </p>
                  <p>
                    <span className="text-[var(--text-muted)]">"lieu"</span>:{" "}
                    <span className="text-[var(--accent-2)]">"Madagascar"</span>
                  </p>
                </div>
              </div>
            </Panel>
          </div>

          {/* Colonne Droite : Présentation sur les études à l'ENI */}
          <div ref={descRef}>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              Actuellement étudiant en <span className="text-[var(--accent)]">2ᵉ année</span> à l'École Nationale d'Informatique (ENI)
            </h1>

            <p className="text-[var(--text-muted)] text-lg max-w-md leading-relaxed">
              Je me passionne pour le développement Full Stack. À travers mes études et mes projets personnels, je construis des applications web concrètes — de la gestion de caisse aux plateformes de prêts — avec React, Laravel et MySQL.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}