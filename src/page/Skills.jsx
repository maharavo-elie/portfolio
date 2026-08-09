import { useRef } from 'react';
import gsap from 'gsap';
import Panel from '../components/Panel';
import Reveal from '../components/Reveal';
import {
  SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel,
  SiMysql, SiPostgresql, SiFirebase,
  SiGit, SiGithub,
} from 'react-icons/si';
import { DiHtml5, DiJava } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';

const skillCategories = [
  {
    title: "FRONTEND",
    skills: [
      { name: "React", category: "Frontend", desc: "Bibliothèque JS", icon: SiReact, color: "#61DAFB" },
      { name: "HTML5 / CSS3", category: "Frontend", desc: "Structure & style web", icon: DiHtml5, color: "#E34F26" },
      { name: "Tailwind CSS", category: "Frontend", desc: "Framework CSS utilitaire", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", category: "Frontend", desc: "Langage de programmation", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "BACKEND",
    skills: [
      { name: "Node.js", category: "Backend", desc: "Environnement JS serveur", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", category: "Backend", desc: "Framework web Node.js", icon: SiExpress, color: "#ffffff" },
      { name: "PHP", category: "Backend", desc: "Langage back-end web", icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", category: "Backend", desc: "Framework PHP moderne", icon: SiLaravel, color: "#FF2D20" },
      { name: "Java", category: "Backend", desc: "Langage orienté objet", icon: DiJava, color: "#f89820" },
    ],
  },
  {
    title: "BASE DE DONNÉES",
    skills: [
      { name: "MySQL", category: "Base de données", desc: "Gestion SGBD SQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", category: "Base de données", desc: "SGBD relationnel avancé", icon: SiPostgresql, color: "#4169E1" },
      { name: "Firebase", category: "Base de données", desc: "Plateforme BaaS", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "OUTILS",
    skills: [
      { name: "Git", category: "Outils", desc: "Gestion de versions", icon: SiGit, color: "#F05032" },
      { name: "GitHub", category: "Outils", desc: "Hébergement & collaboration", icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", category: "Outils", desc: "Éditeur de code principal", icon: VscCode, color: "#007ACC" },
    ],
  },
];

function SkillItem({ skill }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = ((y - centerY) / centerY) * -6;

    gsap.to(card, {
      rotationY: rotateY,
      rotationX: rotateX,
      y: -3,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto",
    });

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  const Icon = skill.icon;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full [perspective:1000px] cursor-pointer"
    >
      <div
        ref={cardRef}
        className="group relative h-full rounded-xl will-change-transform [transform-style:preserve-3d]"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background:
              "radial-gradient(150px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
          }}
        />

        <Panel className="h-full p-3.5 flex flex-col justify-between rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--accent)]/50 transition-colors duration-300 pointer-events-none">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="p-2 rounded-lg bg-white/5 flex items-center justify-center shrink-0"
                style={{ color: skill.color }}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-[var(--accent)] transition-colors">
                  {skill.name}
                </h4>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{skill.category}</p>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] mt-1 truncate">
              {skill.desc}
            </p>
          </div>

          <div className="w-full bg-white/10 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 group-hover:w-full w-1/3"
              style={{ backgroundColor: skill.color }}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <p className="font-mono text-[var(--accent)] text-xs tracking-wider">compétences</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Technologies que j'utilise
          </h2>
        </div>

        <div className="space-y-10">
          {skillCategories.map((cat, catIdx) => (
            <div key={cat.title} className="space-y-3">
              <h3 className="text-[11px] font-mono font-bold tracking-widest text-[var(--accent)] uppercase">
                {cat.title}
              </h3>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {cat.skills.map((skill, skillIdx) => (
                  <Reveal key={skill.name} delay={(catIdx * 100) + (skillIdx * 50)}>
                    <SkillItem skill={skill} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}