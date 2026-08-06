import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "#home", label: "accueil" },
  { href: "#skills", label: "compétences" },
  { href: "#projects", label: "projets" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur relative">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <h1 className="font-mono text-lg text-[var(--text)]">
          <span className="text-[var(--accent)]">elie</span>.dev
        </h1>

        {/* Liens desktop */}
        <ul className="hidden md:flex gap-8 font-mono text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0
                after:bg-[var(--accent)] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden text-[var(--text)]"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Menu mobile déroulant, en superposition */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)]
        transition-all duration-300 ease-in-out origin-top ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4 font-mono text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[var(--text-muted)] hover:text-[var(--accent)] hover:pl-2 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
