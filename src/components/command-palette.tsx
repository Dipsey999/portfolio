'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { caseStudies } from '@/content/case-studies';

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: 'Navigate' | 'Case Studies' | 'Action' | 'Easter Egg';
  perform: () => void;
  keywords?: string[];
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [easterMessage, setEasterMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const commands: Cmd[] = useMemo(
    () => [
      // Navigate
      { id: 'home', label: 'Index', hint: '/', group: 'Navigate', perform: () => router.push('/'), keywords: ['home', 'top'] },
      { id: 'work', label: 'Work', hint: '/work', group: 'Navigate', perform: () => router.push('/work') },
      { id: 'about', label: 'About', hint: '/about', group: 'Navigate', perform: () => router.push('/about') },

      // Case Studies
      ...caseStudies.map((c) => ({
        id: `cs-${c.slug}`,
        label: c.title,
        hint: c.company,
        group: 'Case Studies' as const,
        perform: () => router.push(`/work/${c.slug}`),
        keywords: [c.company, ...c.scope],
      })),

      // Action
      { id: 'mail', label: 'Email Jizan', hint: siteConfig.email, group: 'Action', perform: () => (window.location.href = `mailto:${siteConfig.email}`), keywords: ['contact', 'hire'] },
      { id: 'resume', label: 'Open résumé', hint: 'PDF', group: 'Action', perform: () => window.open('/resume.pdf', '_blank'), keywords: ['cv'] },
      { id: 'linkedin', label: 'LinkedIn', hint: '@jizan', group: 'Action', perform: () => window.open('https://www.linkedin.com/in/jizan/', '_blank') },
      { id: 'github', label: 'GitHub', hint: '@jizansanu', group: 'Action', perform: () => window.open('https://github.com/jizansanu/', '_blank') },
      { id: 'theme', label: 'Toggle theme (light · dark)', group: 'Action', perform: () => {
        const isLight = document.documentElement.classList.toggle('light');
        try { localStorage.setItem('theme', isLight ? 'light' : 'dark'); } catch {}
      }},
      { id: 'copy-mail', label: 'Copy email to clipboard', group: 'Action', perform: () => {
        navigator.clipboard?.writeText(siteConfig.email).then(() => setEasterMessage('Copied. Catch you in the inbox.'));
      }},

      // Easter eggs
      { id: 'play', label: '/play — coming soon (mini-game in progress)', group: 'Easter Egg', perform: () => setEasterMessage('Mini-game loading… just kidding. Pretend you saw something cool.'), keywords: ['game'] },
      { id: 'sing', label: '/sing — Jizan\'s other career', group: 'Easter Egg', perform: () => setEasterMessage('🎤 If music was the brief, Jizan would already be on the soundtrack.'), keywords: ['music'] },
      { id: 'recipe', label: '/recipe — chef mode', group: 'Easter Egg', perform: () => setEasterMessage('Designer by trade, would-be chef by night. The recipe is simple: less is more.'), keywords: ['food', 'chef'] },
      { id: 'gym', label: '/gym — discipline mode', group: 'Easter Egg', perform: () => setEasterMessage('Reps. Recovery. Rinse. Repeat. Same as design, really.'), keywords: ['fitness'] },
      { id: 'thanks', label: '/thanks', group: 'Easter Egg', perform: () => setEasterMessage('Thanks for poking around. Let\'s make something.'), keywords: ['credits'] },
    ],
    [router],
  );

  // Filter
  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query, commands]);

  const grouped = useMemo(() => {
    const map = new Map<Cmd['group'], Cmd[]>();
    for (const c of filtered) {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) {
        // Hot-keys for quick navigation when palette is closed
        if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName ?? '')) {
          e.preventDefault();
          setOpen(true);
          return;
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = filtered[activeIdx];
        if (cmd) {
          cmd.perform();
          if (cmd.group !== 'Easter Egg') close();
        }
      }
    };
    window.addEventListener('keydown', onKey);

    const onOpen = () => setOpen(true);
    window.addEventListener('palette:open', onOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen as EventListener);
    };
  }, [open, filtered, activeIdx]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Auto-clear easter message
  useEffect(() => {
    if (!easterMessage) return;
    const t = setTimeout(() => setEasterMessage(null), 3500);
    return () => clearTimeout(t);
  }, [easterMessage]);

  if (!open) return null;

  let runningIdx = -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[90] flex items-start justify-center bg-bg/70 px-4 pt-[15vh] backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-bg-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
            ⌘K
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work, jump to a page, or try /play, /sing…"
            className="w-full bg-transparent font-sans text-base text-ink outline-none placeholder:text-ink-subtle"
          />
          <kbd className="rounded border border-line bg-bg px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">
            esc
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {grouped.length === 0 && (
            <p className="px-3 py-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-subtle">
              No results — try /play
            </p>
          )}
          {grouped.map(([group, items]) => (
            <div key={group} className="mb-3">
              <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-subtle">
                {group}
              </p>
              <ul>
                {items.map((c) => {
                  runningIdx += 1;
                  const isActive = runningIdx === activeIdx;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onMouseEnter={(() => {
                          const captured = runningIdx;
                          return () => setActiveIdx(captured);
                        })()}
                        onClick={() => {
                          c.perform();
                          if (c.group !== 'Easter Egg') close();
                        }}
                        className={`flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left transition-colors ${
                          isActive ? 'bg-accent/10 text-ink' : 'text-ink-muted'
                        }`}
                      >
                        <span className="text-sm">{c.label}</span>
                        {c.hint && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                            {c.hint}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <span>↑↓ navigate · ↵ select</span>
          <span>{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {easterMessage && (
        <div className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-accent bg-bg px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          {easterMessage}
        </div>
      )}
    </div>
  );
}
