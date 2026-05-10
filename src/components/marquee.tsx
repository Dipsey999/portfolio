type Props = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className }: Props) {
  const sequence = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y border-line bg-surface-sunken/40 py-5 ${className ?? ''}`}
      aria-hidden
    >
      <div
        className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-micro-loose text-ink-muted"
        style={{ ['--width' as string]: '50%' }}
      >
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12">
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-ink-subtle" />
          </span>
        ))}
      </div>
    </div>
  );
}
