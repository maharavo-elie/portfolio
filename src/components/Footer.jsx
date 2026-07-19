export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex justify-between px-6 py-6 font-mono text-xs text-[var(--text-muted)]">
        <span>© {new Date().getFullYear()} elie.dev</span>
        <span>$ built with react + vite</span>
      </div>
    </footer>
  );
}
