import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">— SCENE NOT FOUND —</p>
      <h1 className="ink-italic mt-6 font-display text-display-3xl text-balance">
        That page is on the <em>cutting room floor.</em>
      </h1>
      <p className="mt-6 max-w-prose text-pretty text-ink-muted">
        Page moved, never existed, or is hiding behind a password. Try the index or the reel.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          data-cursor="view"
          className="rounded-full bg-accent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-bg"
        >
          Index
        </Link>
        <Link
          href="/work"
          data-cursor="view"
          className="rounded-full border border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em]"
        >
          The reel
        </Link>
      </div>
    </section>
  );
}
