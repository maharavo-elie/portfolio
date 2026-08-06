import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Panel from '../components/Panel';
import Reveal from '../components/Reveal';
import {
  SiJavascript, SiReact, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPhp, SiLaravel,
  SiMysql, SiPostgresql, SiFirebase,
  SiGit, SiGithub,
} from 'react-icons/si';
import { DiHtml5, DiCss3, DiJava } from 'react-icons/di';
import { VscCode } from 'react-icons/vsc';

const skillCategories = [
  {
    file: "frontend.js",
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: DiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: DiCss3, color: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    file: "backend.php",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Java", icon: DiJava, color: "#f89820" },
    ],
  },
  {
    file: "database.sql",
    title: "Base de données",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    file: "tools.json",
    title: "Outils",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "VS Code", icon: VscCode, color: "#007ACC" },
    ],
  },
];

// Carte de compétences avec l'effet de tilt 3D et le spotlight réactif
function SkillCard({ category }) {
  const cardRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const quickLift = useRef(null);
  const quickMx = useRef(null);
  const quickMy = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    quickY.current = gsap.quickTo(card, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });
    quickX.current = gsap.quickTo(card, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    quickLift.current = gsap.quickTo(card, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
    quickMx.current = gsap.quickTo(card, "--mx", {
      duration: 0.3,
      ease: "power3.out",
    });
    quickMy.current = gsap.quickTo(card, "--my", {
      duration: 0.3,
      ease: "power3.out",
    });

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
      className="group relative h-full will-change-transform [transform-style:preserve-3d]"
    >
      {/* Spotlight réactif au survol */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background:
            "radial-gradient(200px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 15%, transparent), transparent 70%)",
        }}
      />

      <Panel filename={category.file} className="h-full flex flex-col">
        <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">
          {category.title}
        </h3>
        <ul className="space-y-2">
          {category.skills.map(({ name, icon: Icon, color }) => (
            <li
              key={name}
              className="group/item flex items-center gap-3 text-[var(--text-muted)] text-sm
                         px-2 py-1.5 rounded-md transition-all duration-200
                         hover:bg-white/5 hover:translate-x-1 hover:text-white cursor-default"
            >
              <Icon
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/item:scale-125"
                style={{ color }}
              />
              {name}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-mono text-[var(--accent)] text-sm">// compétences</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Technologies que j'utilise
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {skillCategories.map((category, i) => (
            <Reveal key={category.file} delay={i * 100} className="h-full">
              <SkillCard category={category} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}