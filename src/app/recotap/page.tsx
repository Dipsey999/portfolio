'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import s from '../_home/home.module.css';
import r from '../_home/chapter.module.css';
import { PageShell } from '../_home/page-shell';
import { Reveal } from '../_home/reveal';
import { MagneticCta } from '../_home/magnetic-cta';
import { ProjectCard, type ProjectCardItem } from '../_home/project-card';

const ACCENT = '#5CF0A4';

const PROJECTS: ProjectCardItem[] = [
  {
    href: '/recotap/improving-the-platform/',
    company: 'The Platform',
    title: 'Recotap — the flagship ABM platform.',
    meta: 'B2B SaaS · Live · Lead Designer · Case Study',
    art: '/images/recotap-img.png',
    artBg: 'linear-gradient(140deg, #1a3324 0%, #0d1c14 60%, #0d1c14 100%)',
    accent: '#5CF0A4',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/adradar/the-affordable-abm-copilot/',
    company: 'AdRadar',
    title: 'The agentic-AI ABM copilot, priced for small B2B teams.',
    meta: 'Case study · Live · Lead Designer',
    art: '/images/recotap-cs-1.png',
    artBg: 'linear-gradient(140deg, #14233a 0%, #0c1422 60%, #0c1422 100%)',
    accent: '#5C8DFF',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/adninja/inside-the-ad-canvas/',
    company: 'AdNinja',
    title: 'A co-pilot, not a Canva — the in-workflow ad canvas.',
    meta: 'Case study · Inside Recotap · Solo Designer',
    art: '/images/adninja-img.png',
    artBg: 'linear-gradient(140deg, #3a2e10 0%, #1f1808 60%, #1f1808 100%)',
    accent: '#F3D768',
    cursor: 'open',
    action: 'Open →',
  },
  {
    href: '/full-stack-abm/hook-before-the-look/',
    company: 'Full-Stack ABM Services',
    title: 'Hook before the look — winning ads, end to end.',
    meta: 'Case study · 40+ clients in 90 days · Lead Designer',
    art: '/images/orchastration-img.png',
    artBg: 'linear-gradient(140deg, #2a1f4a 0%, #16112a 60%, #16112a 100%)',
    accent: '#A78BFF',
    cursor: 'open',
    action: 'Open →',
  },
];

export default function RecotapPage() {
  return (
    <PageShell>
      <div style={{ ['--chapter-accent' as string]: ACCENT } as CSSProperties}>
        {/* Hero */}
        <section className={s.hero}>
          <div className={s.container}>
            <Reveal>
              <p className={r.breadcrumb}>
                <Link href="/" data-cursor="view">Home</Link>
                <span className={r.sep}>/</span>
                <span className={r.now}>Recotap</span>
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className={s.name} aria-label="Recotap">
                <span className={s.nameLine}>
                  {Array.from('Recotap').map((c, i) => (
                    <span
                      key={i}
                      className={s.nameLetter}
                      style={{ ['--letter-i' as string]: String(i) } as CSSProperties}
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className={r.brand}>
                <span className={r.brandLogo}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/recotap-logo.svg" alt="" />
                </span>
                <span className={r.brandText}>
                  <em>Live</em> · Lead Product Designer · 2024 — Now
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <p className={r.lede}>
                <strong>The full Recotap chapter.</strong> The platform, the satellite
                products, and the service layer underneath — all designed and shipped
                under one roof. I lead design across product, marketing, and brand,
                and I write the front-end that ships them.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className={r.contextRow}>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Span</p>
                  <p className={r.contextValue}>4 surfaces</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Tenure</p>
                  <p className={r.contextValue}>2 years +</p>
                </div>
                <div className={r.contextCell}>
                  <p className={r.contextLabel}>Role</p>
                  <p className={r.contextValue}>Lead Designer</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <div className={s.ctaRow}>
                <MagneticCta href="https://www.recotap.com/" external className={s.ctaPrimary}>
                  Visit recotap.com <span className={s.arrow}>↗</span>
                </MagneticCta>
                <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaGhost}>
                  Get in touch
                </MagneticCta>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Recognition — Startup Singam Season 2 */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 02 — Recognition</p>
                  <span className={r.pressPill}>Sun TV · Startup Singam · Season 2</span>
                  <h2 className={s.sectionTitle}>
                    ₹5 crore won.{' '}
                    <em className={r.chapterAccent}>
                      First AI startup to win the season.
                    </em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  <strong>AdRadar</strong> — the real-time competitive
                  ad-intelligence product I lead design on — was selected from
                  a national field at Sun TV&apos;s Startup Singam Season 2
                  and walked away with the season&apos;s ₹5 crore (₹50M) grand
                  prize. The first AI-native startup to win the show. The
                  full episode is embedded below.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={r.videoWrap}>
                <iframe
                  className={r.videoFrame}
                  src="https://www.youtube.com/embed/iRXmm0nvsYE"
                  title="Recotap on Startup Singam Season 2 — full episode"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <p className={r.videoCaption}>
                Full episode · Recotap on Startup Singam Season 2 · Sun TV
              </p>
            </Reveal>
          </div>
        </section>

        {/* Impact — by the numbers */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 03 — Impact</p>
                  <h2 className={s.sectionTitle}>
                    Design that{' '}
                    <em className={r.chapterAccent}>compounded into customers.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  The design pass that started with the platform redesign
                  carried through onboarding, the customer journey, and the
                  Full-Stack ABM service offering I designed end-to-end —
                  and the customer count followed.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div className={r.statRow}>
                <div className={r.statCell}>
                  <p className={r.statValue}>60+</p>
                  <p className={r.statLabel}>
                    customers live on the Recotap platform — across B2B SaaS,
                    services, and enterprise.
                  </p>
                </div>
                <div className={r.statCell}>
                  <p className={r.statValue}>45+</p>
                  <p className={r.statLabel}>
                    more in the pipeline for the Full-Stack ABM service — the
                    end-to-end customer journey I designed for our outbound
                    motion.
                  </p>
                </div>
                <div className={r.statCell}>
                  <p className={r.statValue}>1</p>
                  <p className={r.statLabel}>
                    designer leading product, marketing, and brand
                    end-to-end — with engineering as the multiplier.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Surface area cards */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 04 — Where I design at Recotap</p>
                  <h2 className={s.sectionTitle}>
                    Four surfaces.{' '}
                    <em className={r.chapterAccent}>One designer.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  Three live products and the service layer that wraps them
                  — every card below is a real surface I lead, end-to-end.
                  One design language across all four. Two are public; two
                  are internal or by request.
                </p>
              </header>
            </Reveal>
            <div className={r.projectGrid2}>
              {PROJECTS.map((p, i) => (
                <ProjectCard project={p} index={i} key={p.href} />
              ))}
            </div>
          </div>
        </section>

        {/* Logos I designed */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 05 — Logos</p>
                  <h2 className={s.sectionTitle}>
                    I designed both marks.{' '}
                    <em className={r.chapterAccent}>Recotap and AdRadar.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  Two products. Two visual identities. Same hand. I
                  refreshed the Recotap mark for the platform&apos;s
                  2024 redesign, and drew the AdRadar mark from a
                  blank canvas in 2025 — every curve, every weight,
                  every variant.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 20,
                  marginTop: 28,
                }}
              >
                {/* Recotap logo card */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 40,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(40, 169, 224, 0.10) 0%, rgba(40, 169, 224, 0.02) 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 280,
                    gap: 28,
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 8px',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/recotap-logo.svg"
                      alt="Recotap"
                      style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block' }}
                    />
                  </div>
                  <div
                    style={{
                      paddingTop: 22,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>Recotap</span>
                      <span style={{ fontSize: 12, opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 700, color: '#28A9E0' }}>Redesign · 2024</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, opacity: 0.78 }}>
                      Kept the spirit of the original chat-bubble target — sharpened
                      the wordmark for in-feed legibility and tuned the blue for
                      higher contrast on the platform&apos;s dark surfaces.
                    </p>
                  </div>
                </div>

                {/* AdRadar logo card */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 40,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(229, 91, 91, 0.10) 0%, rgba(229, 91, 91, 0.02) 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: 280,
                    gap: 28,
                  }}
                >
                  <div
                    style={{
                      flex: '1 1 auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '24px 8px',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/adradar-logo.png"
                      alt="adRadar"
                      style={{ width: '100%', maxWidth: 340, height: 'auto', display: 'block' }}
                    />
                  </div>
                  <div
                    style={{
                      paddingTop: 22,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>AdRadar</span>
                      <span style={{ fontSize: 12, opacity: 0.55, letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 700, color: '#E55B5B' }}>New mark · 2025</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, opacity: 0.78 }}>
                      Drawn from scratch — a coral radar with a cursor wedge,
                      pairing visual signal with the product&apos;s signal-led
                      story. Shipped in three weights for product, marketing,
                      and favicon use.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Websites I built */}
        <section className={s.section}>
          <div className={s.container}>
            <Reveal>
              <header className={s.sectionHead}>
                <div>
                  <p className={s.sectionLabel}>§ 06 — Websites</p>
                  <h2 className={s.sectionTitle}>
                    I built both marketing sites.{' '}
                    <em className={r.chapterAccent}>Webflow and Angular.</em>
                  </h2>
                </div>
                <p className={s.sectionLede}>
                  Same designer, two stacks — chosen deliberately.
                  Recotap lives on <strong>Webflow</strong> for
                  design-to-publish speed and a CMS the marketing team
                  could own. AdRadar is a <strong>hand-coded Angular
                  app</strong> — a custom SPA with motion and
                  interactions the product surface deserved. Click
                  either screenshot below to visit the live site.
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  gap: 24,
                  marginTop: 28,
                }}
              >
                {/* Recotap site card — in iPad mockup */}
                <a
                  href="https://www.recotap.com/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 28,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(40, 169, 224, 0.10) 0%, rgba(40, 169, 224, 0.02) 100%)',
                    color: 'inherit',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    gap: 24,
                  }}
                >
                  {/* iPad device mockup */}
                  <div
                    style={{
                      background: '#0a0a0c',
                      padding: 14,
                      borderRadius: 30,
                      border: '1px solid #1d1d22',
                      boxShadow:
                        '0 28px 70px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)',
                      position: 'relative',
                    }}
                  >
                    {/* Camera dot */}
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        background: '#2c2c30',
                        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.10)',
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/recotap-ipad.png"
                      alt="recotap.com — homepage on iPad"
                      loading="lazy"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        display: 'block',
                        borderRadius: 18,
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                    />
                  </div>
                  {/* Card meta */}
                  <div style={{ padding: '0 4px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>recotap.com</span>
                      <span style={{ fontSize: 11, opacity: 0.55, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700, color: '#28A9E0' }}>Designed &amp; built · Webflow</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, opacity: 0.78 }}>
                      Marketing site, blog, and CMS — all in Webflow. One
                      designer-developer, no handoffs. Visit{' '}
                      <span style={{ color: '#28A9E0', fontWeight: 600 }}>recotap.com ↗</span>
                    </p>
                  </div>
                </a>

                {/* AdRadar site card — in iPad mockup */}
                <a
                  href="https://www.adradar.app/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 28,
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.10)',
                    background:
                      'linear-gradient(140deg, rgba(229, 91, 91, 0.10) 0%, rgba(229, 91, 91, 0.02) 100%)',
                    color: 'inherit',
                    textDecoration: 'none',
                    overflow: 'hidden',
                    gap: 24,
                  }}
                >
                  {/* iPad device mockup */}
                  <div
                    style={{
                      background: '#0a0a0c',
                      padding: 14,
                      borderRadius: 30,
                      border: '1px solid #1d1d22',
                      boxShadow:
                        '0 28px 70px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)',
                      position: 'relative',
                    }}
                  >
                    {/* Camera dot */}
                    <span
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        background: '#2c2c30',
                        boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.10)',
                      }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/adradar-ipad.png"
                      alt="adradar.app — homepage on iPad"
                      loading="lazy"
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        display: 'block',
                        borderRadius: 18,
                        objectFit: 'cover',
                        objectPosition: 'top',
                      }}
                    />
                  </div>
                  {/* Card meta */}
                  <div style={{ padding: '0 4px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>adradar.app</span>
                      <span style={{ fontSize: 11, opacity: 0.55, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 700, color: '#E55B5B' }}>Hand-coded · Angular</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, opacity: 0.78 }}>
                      Custom Angular SPA — no template, no page builder.
                      Hand-coded animations, hand-tuned type, hand-built
                      from a blank repo. Visit{' '}
                      <span style={{ color: '#E55B5B', fontWeight: 600 }}>adradar.app ↗</span>
                    </p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA closer */}
        <section className={s.cta}>
          <div className={s.container}>
            <Reveal>
              <p className={s.sectionLabel}>§ 07 — Want the case studies?</p>
              <h2 className={s.ctaTitle}>
                I&apos;ll walk you through it. <em>Live.</em>
              </h2>
              <MagneticCta href="mailto:jizan.ux@gmail.com" external className={s.ctaButton}>
                Email me <span className={s.arrow}>→</span>
              </MagneticCta>
            </Reveal>
          </div>
        </section>

        <div className={s.container}>
          <div className={s.outro}>
            <Link href="/" className={r.back} data-cursor="view">
              ← Back to index
            </Link>
            <span>© {new Date().getFullYear()} Mohammed Jizan K · Bengaluru, IN</span>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
