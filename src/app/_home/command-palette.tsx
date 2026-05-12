'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './command-palette.module.css';

type Group = 'Navigate' | 'Action' | 'Easter Egg';
type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: Group;
  perform: () => void;
  keywords?: string[];
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [easterMessage, setEasterMessage] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  const close = () => {
    setOpen(false);
    setQuery('');
    setActiveIdx(0);
  };

  const commands: Cmd[] = useMemo(
    () => [
      // Navigate
      { id: 'nav-home', label: 'Index', hint: '/', group: 'Navigate', perform: () => router.push('/') },
      { id: 'nav-projects', label: 'Projects', hint: '/all-projects', group: 'Navigate', perform: () => router.push('/all-projects/') },
      { id: 'nav-journal', label: 'Journal', hint: '/journal', group: 'Navigate', perform: () => router.push('/journal/'), keywords: ['journal', 'case studies', 'notes', 'writing', 'archive'] },
      { id: 'nav-ai-craft', label: 'AI-craft notes', hint: '/ai-craft', group: 'Navigate', perform: () => router.push('/ai-craft/'), keywords: ['ai craft', 'notes', 'design ai', 'agentic', 'trust contract', 'pov'] },
      { id: 'nav-about', label: 'About', hint: '/about-me', group: 'Navigate', perform: () => router.push('/about-me/') },
      { id: 'nav-recotap', label: 'Recotap chapter', hint: '/recotap', group: 'Navigate', perform: () => router.push('/recotap/'), keywords: ['recotap', 'adradar', 'adninja', 'abm'] },
      { id: 'nav-recotap-cs', label: 'Recotap — case study', hint: '/recotap/improving-the-platform', group: 'Navigate', perform: () => router.push('/recotap/improving-the-platform/'), keywords: ['recotap', 'case study', 'abm', 'platform'] },
      { id: 'nav-adradar-cs', label: 'AdRadar — case study', hint: '/adradar/the-affordable-abm-copilot', group: 'Navigate', perform: () => router.push('/adradar/the-affordable-abm-copilot/'), keywords: ['adradar', 'ads', 'ai agents', 'abm', 'case study'] },
      { id: 'nav-adninja-cs', label: 'AdNinja — case study', hint: '/adninja/inside-the-ad-canvas', group: 'Navigate', perform: () => router.push('/adninja/inside-the-ad-canvas/'), keywords: ['adninja', 'ad canvas', 'recoai', 'editor', 'case study'] },
      { id: 'nav-fullstack-cs', label: 'Full-Stack ABM — case study', hint: '/full-stack-abm/hook-before-the-look', group: 'Navigate', perform: () => router.push('/full-stack-abm/hook-before-the-look/'), keywords: ['full-stack', 'full stack', 'abm', 'service', 'triggers', 'winning ads', 'case study'] },
      { id: 'nav-hiresense', label: 'HireSense AI chapter', hint: '/hiresense', group: 'Navigate', perform: () => router.push('/hiresense/'), keywords: ['hiresense', 'hiretap', 'compsense', 'ai', 'hiring'] },
      { id: 'nav-ziroh', label: 'Ziroh Labs chapter', hint: '/ziroh', group: 'Navigate', perform: () => router.push('/ziroh/'), keywords: ['ziroh', 'zunu', 'drive', 'mail', 'privacy'] },
      { id: 'ext-hiresense', label: 'HireSense — visit live site', hint: 'hiresense.ai ↗', group: 'Action', perform: () => window.open('https://www.hiresense.ai/', '_blank'), keywords: ['hiresense'] },
      { id: 'ext-recotap', label: 'Recotap — visit live site', hint: 'recotap.com ↗', group: 'Action', perform: () => window.open('https://www.recotap.com/', '_blank'), keywords: ['recotap'] },
      { id: 'ext-adradar', label: 'AdRadar — visit live site', hint: 'adradar.app ↗', group: 'Action', perform: () => window.open('https://www.adradar.app/', '_blank'), keywords: ['adradar', 'ad', 'ads'] },

      // Action
      { id: 'act-mail', label: 'Email Jizan', hint: 'jizan.ux@gmail.com', group: 'Action', perform: () => (window.location.href = 'mailto:jizan.ux@gmail.com'), keywords: ['contact', 'hire'] },
      { id: 'act-resume', label: 'Open résumé', hint: 'PDF ↗', group: 'Action', perform: () => window.open('/resume.pdf', '_blank'), keywords: ['cv'] },
      { id: 'act-linkedin', label: 'LinkedIn', hint: '@jizan ↗', group: 'Action', perform: () => window.open('https://www.linkedin.com/in/jizan/', '_blank') },
      { id: 'act-medium', label: 'Medium', hint: '@jizansanu ↗', group: 'Action', perform: () => window.open('https://medium.com/@jizansanu', '_blank') },
      { id: 'act-dribbble', label: 'Dribbble', hint: '@jizansanu ↗', group: 'Action', perform: () => window.open('https://dribbble.com/jizansanu', '_blank') },
      { id: 'act-github', label: 'GitHub', hint: '@jizansanu ↗', group: 'Action', perform: () => window.open('https://github.com/jizansanu/', '_blank') },
      {
        id: 'act-copy',
        label: 'Copy email to clipboard',
        group: 'Action',
        perform: () => {
          navigator.clipboard?.writeText('jizan.ux@gmail.com');
          setEasterMessage('Copied. Catch you in the inbox.');
        },
        keywords: ['email'],
      },
      {
        id: 'act-theme',
        label: 'Toggle theme — Particles ↔ Aurora',
        group: 'Action',
        perform: () => window.dispatchEvent(new CustomEvent('jizan:theme:toggle')),
        keywords: ['theme', 'mode', 'particles', 'aurora', 'iridescent'],
      },

      // Easter eggs — designed to make recruiters smile
      { id: 'egg-sing', label: '/sing — Jizan’s other career', group: 'Easter Egg', perform: () => setEasterMessage('🎤 If music was the brief, Jizan would already be on the soundtrack.'), keywords: ['music'] },
      { id: 'egg-recipe', label: '/recipe — chef mode', group: 'Easter Egg', perform: () => setEasterMessage('Designer by trade, would-be chef by night. Recipe: less is more.'), keywords: ['food', 'cook'] },
      { id: 'egg-gym', label: '/gym — discipline mode', group: 'Easter Egg', perform: () => setEasterMessage('Reps. Recovery. Rinse. Repeat. Same as design, really.'), keywords: ['fitness'] },
      { id: 'egg-thanks', label: '/thanks', group: 'Easter Egg', perform: () => setEasterMessage('Thanks for poking around. Let’s make something.'), keywords: ['credits'] },
    ],
    [router],
  );

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
    const map = new Map<Group, Cmd[]>();
    for (const c of filtered) {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => setActiveIdx(0), [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setOpen(true);
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
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
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
      className={s.shell}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={s.panel} data-cursor="hover">
        <div className={s.header}>
          <span className={s.kbd}>{isMac ? '⌘' : 'Ctrl'}K</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search work, jump anywhere, or try /sing, /recipe…"
            className={s.input}
          />
          <span className={s.kbd}>esc</span>
        </div>

        <div className={s.results}>
          {grouped.length === 0 && <p className={s.empty}>No results — try /play.</p>}
          {grouped.map(([group, items]) => (
            <div key={group} className={s.group}>
              <p className={s.groupLabel}>{group}</p>
              <ul>
                {items.map((c) => {
                  runningIdx += 1;
                  const captured = runningIdx;
                  const isActive = captured === activeIdx;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIdx(captured)}
                        onClick={() => {
                          c.perform();
                          if (c.group !== 'Easter Egg') close();
                        }}
                        className={`${s.row} ${isActive ? s.rowActive : ''}`}
                      >
                        <span>{c.label}</span>
                        {c.hint && <span className={s.hint}>{c.hint}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className={s.footer}>
          <span>↑↓ navigate · ↵ select</span>
          <span>{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
        </div>
      </div>

      {easterMessage && <div className={s.toast}>{easterMessage}</div>}
    </div>
  );
}
