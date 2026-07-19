export default function Panel({ filename, className = "", children }) {
  return (
    <div
      className={`rounded-xl bg-[var(--surface)] border border-[var(--border)]
      hover:border-[var(--accent)] hover:scale-[1.03] hover:-translate-y-1
      transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#e05353]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-2)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
        <span className="font-mono text-xs text-[var(--text-muted)] ml-2">
          {filename}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
