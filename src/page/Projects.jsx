import Panel from '../components/Panel';
import Reveal from '../components/Reveal';

const projects = [
  {
    id: 1,
    file: "gestion-caisse.php",
    title: "Gestion de caisse d'église",
    description: "Application de gestion financière pour église, avec suivi des entrées, dépenses et solde en temps réel.",
    technologies: ["Laravel", "React", "MySQL"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    file: "prets-bancaires.jsx",
    title: "Gestion de prêts bancaires",
    description: "SPA de gestion de prêts avec authentification, CRUD complet et synthèses graphiques.",
    technologies: ["React", "PHP", "MySQL"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    file: "portfolio.jsx",
    title: "Portfolio personnel",
    description: "Ce portfolio, développé avec React, Vite et Tailwind CSS.",
    technologies: ["React", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-mono text-[var(--accent)] text-sm">// projets</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Quelques réalisations
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <Panel filename={project.file}>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-[var(--text-muted)] text-sm mt-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-2.5 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className="flex-1 text-center border border-[var(--border)] hover:border-[var(--accent)] hover:scale-105 active:scale-95 py-2.5 rounded-lg text-sm transition-all">
                    GitHub
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className="flex-1 text-center bg-[var(--accent)] text-[#04342c] font-medium hover:scale-105 active:scale-95 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all">
                    Démo
                  </a>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
