import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-center justify-center text-center">
      <p className="micro-label">404</p>
      <h1 className="mt-6 font-display text-display-2xl text-balance">
        Lost in the system.
      </h1>
      <p className="mt-6 max-w-prose text-pretty text-ink-muted">
        The page you’re looking for moved, never existed, or is hiding behind a
        password. Try the index, the work archive, or get in touch.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-micro-loose text-surface"
        >
          Index
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-micro-loose"
        >
          See work
        </Link>
      </div>
    </section>
  );
}
