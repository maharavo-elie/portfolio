import Panel from '../components/Panel';
import Reveal from '../components/Reveal';

const skillCategories = [
  { file: "frontend.js", title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"] },
  { file: "backend.php", title: "Backend", skills: ["Node.js", "Express.js", "PHP", "Laravel"] },
  { file: "database.sql", title: "Base de données", skills: ["MySQL", "MongoDB", "Firebase"] },
  { file: "tools.json", title: "Outils", skills: ["Git", "GitHub", "VS Code", "Figma"] },
];

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <Reveal key={category.file} delay={i * 100}>
              <Panel filename={category.file}>
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
