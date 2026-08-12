import { useRef, useEffect } from "react";
import gsap from "gsap";
import Panel from '../components/Panel';
import Reveal from '../components/Reveal';
import {
  SiReact,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiTailwindcss,
} from "react-icons/si";

const techIcons = {
  React: SiReact,
  Laravel: SiLaravel,
  MySQL: SiMysql,
  PHP: SiPhp,
  "Tailwind CSS": SiTailwindcss,
};

const projects = [
  {
    id: 1,
    file: "gestion-caisse.php",
    title: "Gestion de caisse d'église",
    description: "Application de gestion financière pour église, avec suivi des entrées, dépenses et solde en temps réel.",
    technologies: ["Laravel", "React", "MySQL"],
    github: "https://github.com/maharavo-elie/laravel",
    demo: "#",
  },
  {
    id: 2,
    file: "prets-bancaires.jsx",
    title: "Gestion de prêts bancaires",
    description: "SPA de gestion de prêts avec authentification, CRUD complet et synthèses graphiques.",
    technologies: ["React", "PHP", "MySQL"],
    github: "https://github.com/maharavo-elie/Jsx",
    demo: "#",
  },
  {
    id: 3,
    file: "portfolio.jsx",
    title: "Portfolio personnel",
    description: "Ce portfolio, développé avec React, Vite et Tailwind CSS.",
    technologies: ["React", "Tailwind CSS"],
    github: "https://github.com/maharavo-elie/portfolio",
    demo: "#",
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const quickLift = useRef(null);
  const quickMx = useRef(null);
  const quickMy = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    quickY.current = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    quickX.current = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    quickLift.current = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3.out" });
    quickMx.current = gsap.quickTo(card, "--mx", { duration: 0.3, ease: "power3.out" });
    quickMy.current = gsap.quickTo(card, "--my", { duration: 0.3, ease: "power3.out" });

    gsap.set(card, { transformPerspective: 800, transformOrigin: "center" });
  }, []);

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((y - centerY) / centerY) * -8;

    quickY.current?.(rotateY);
    quickX.current?.(rotateX);
    quickLift.current?.(-6);
    quickMx.current?.(x);
    quickMy.current?.(y);
  }

  function handleMouseLeave() {
    quickY.current?.(0);
    quickX.current?.(0);
    quickLift.current?.(0);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative will-change-transform [transform-style:preserve-3d]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(200px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
        }}
      />

      <Panel filename={project.file}>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="text-[var(--text-muted)] text-sm mt-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.technologies.map((tech) => {
            const Icon = techIcons[tech];
            return (
              <span
                key={tech}
                className="group font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all hover:bg-[var(--accent)]/20 hover:scale-110"
              >
                {Icon && <Icon className="text-sm transition-transform duration-300 group-hover:rotate-12" />}
                {tech}
              </span>
            );
          })}
        </div>

        <div className="flex gap-3 mt-6">
          {project.github && project.github !== "#" ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 text-center border border-[var(--border)] hover:border-[var(--accent)] hover:scale-105 active:scale-95 py-2.5 rounded-lg text-sm transition-all">
              GitHub
            </a>
          ) : (
            <span className="flex-1 text-center border border-[var(--border)]/40 text-[var(--text-muted)] py-2.5 rounded-lg text-sm cursor-not-allowed opacity-50">
              GitHub
            </span>
          )}

          {project.demo && project.demo !== "#" ? (
            <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 text-center bg-[var(--accent)] text-[#04342c] font-medium hover:scale-105 active:scale-95 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all">
              Démo
            </a>
          ) : (
            <span className="flex-1 text-center bg-[var(--accent)]/30 text-[#04342c]/50 font-medium py-2.5 rounded-lg text-sm cursor-not-allowed">
              Démo
            </span>
          )}
        </div>
      </Panel>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-[var(--accent)] text-sm">projets</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Quelques réalisations</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}