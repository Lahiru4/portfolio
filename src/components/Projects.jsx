import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects.js';
import { container, DecorCircle, SectionLabel, SlashList } from './ui.jsx';

const pad = (value) => String(value).padStart(2, '0');

// Project image, or a small terminal-style panel for projects without one.
export function ProjectVisual({ project, className = '' }) {
  if (project.image) {
    return <img src={project.image} alt={`${project.title} preview`} className={`h-full w-full object-cover ${className}`} loading="lazy" />;
  }

  return (
    <div className={`flex h-full w-full flex-col justify-between gap-8 bg-invert p-6 text-invert-fg sm:p-8 ${className}`}>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full border border-current opacity-60"></span>
        <span className="h-2.5 w-2.5 rounded-full border border-current opacity-60"></span>
        <span className="h-2.5 w-2.5 rounded-full border border-current opacity-60"></span>
      </div>
      <div>
        <p className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">{project.title.split('|')[0].trim()}</p>
        <p className="mt-1 text-sm italic opacity-70">{project.badge}</p>
      </div>
      {project.snippet && (
        <ul className="space-y-2 font-mono text-[11px] sm:text-xs" aria-hidden="true">
          {project.snippet.map(([command, result]) => (
            <li key={command} className="flex flex-wrap justify-between gap-x-4 border-t border-current/20 pt-2">
              <span>{command}</span>
              {result && <span className="opacity-60">{result}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// One project "slide": an open editorial layout (no card box) with a big outlined number,
// the project details on the left and a framed visual on the right.
function ProjectSlide({ project, index }) {
  const href = `/projects/${encodeURIComponent(project.id)}`;

  return (
    <article
      className="group relative grid h-full grid-cols-1 content-center items-center gap-6 bg-bg md:grid-cols-12 md:gap-12 print:!transform-none print:!opacity-100"
      style={{ transform: 'translateX(var(--card-x, 0px)) scale(var(--card-scale, 1))', opacity: 'var(--card-opacity, 1)' }}
    >
      {/* Details */}
      <div className="flex flex-col gap-4 md:col-span-5 md:gap-5">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
          <p className="font-mono leading-none">
            <span className="text-5xl font-extrabold tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--fg)] md:text-7xl">{pad(index + 1)}</span>
            <span className="ml-2 text-xs text-muted">/ {pad(projectsData.length)}</span>
          </p>
          <span className="pb-1 font-mono text-xs text-muted">{project.year}</span>
        </div>

        <h3 className="font-mono text-2xl font-bold leading-tight tracking-tight text-fg md:text-3xl">
          <Link to={href} className="hover:underline hover:decoration-1 hover:underline-offset-4">{project.title}</Link>
        </h3>

        <p className="inline-flex self-start rounded-full bg-invert px-3 py-1 text-xs italic text-invert-fg">{project.role}</p>

        <p className="line-clamp-4 text-sm leading-relaxed text-muted md:line-clamp-none">{project.shortSummary}</p>

        <SlashList items={project.cardTags} className="text-muted" />

        <Link to={href} className="group/more inline-flex items-center gap-2 self-start pt-1" aria-label={`Read more about ${project.title}`}>
          <span className="inline-flex h-10 items-center rounded-full bg-invert px-5 text-xs font-medium italic text-invert-fg transition-opacity group-hover/more:opacity-85">Read more</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg text-fg transition-colors group-hover/more:bg-invert group-hover/more:text-invert-fg" aria-hidden="true">
            <i className="ph-bold ph-arrow-right"></i>
          </span>
        </Link>
      </div>

      {/* Visual (shown first on phones) */}
      <div className="relative order-first md:order-none md:col-span-7">
        <DecorCircle className="-bottom-10 -left-10 hidden h-44 w-44 md:block" />
        <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-surface md:aspect-[4/3]">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
            <ProjectVisual project={project} />
          </div>
          {project.image && (
            <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/85 px-3 py-1 text-[11px] italic text-fg backdrop-blur-sm sm:left-4 sm:top-4">
              {project.badge}
            </span>
          )}
        </Link>
      </div>
    </article>
  );
}

// Scroll-driven slides: the project area pins below the header and, as you scroll,
// each next project slides in from the right while the previous one drifts left and fades.
const ENTER_START = 0.15; // Pause before a card starts sliding in (share of one card's scroll distance).
const ENTER_LENGTH = 0.7; // Share of the scroll distance the slide itself takes.
const easeOut = (value) => 1 - (1 - value) ** 3;
const clamp01 = (value) => Math.min(1, Math.max(0, value));

function useSlideInCards(runwayRef, stageRef) {
  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    if (!runway || !stage) return undefined;

    const items = [...stage.querySelectorAll(':scope > ol > li')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pinTop = 0;
    let perCard = 1;
    let frame = 0;

    const layout = () => {
      // Pin centred in the space below the header; on short screens pin so the whole card stays visible.
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 64;
      const stageHeight = stage.offsetHeight;
      const centred = headerHeight + (window.innerHeight - headerHeight - stageHeight) / 2;
      pinTop = Math.round(Math.min(Math.max(headerHeight + 16, centred), window.innerHeight - stageHeight - 16));
      perCard = Math.round(window.innerHeight * 0.8);
      stage.style.top = `${pinTop}px`;
      // Scroll room: one screen-ish of scrolling per card after the first.
      runway.style.height = `${stageHeight + (items.length - 1) * perCard}px`;
    };

    const progress = () => (pinTop - runway.getBoundingClientRect().top) / perCard;

    const update = () => {
      frame = 0;
      const current = progress();
      // 0 = waiting off-screen on the right, 1 = fully in place.
      const arrived = items.map((_, index) =>
        index === 0 ? 1 : easeOut(clamp01((current - (index - 1) - ENTER_START) / ENTER_LENGTH)),
      );

      items.forEach((item, index) => {
        // How much the next project has replaced this one: 0 = in front, 1 = fully replaced.
        const covered = Math.min(1, arrived[index + 1] ?? 0);
        let x = 0;
        let scale = 1;
        let opacity = 1 - covered;
        if (reduceMotion.matches) {
          opacity *= arrived[index]; // Cross-fade instead of sliding.
        } else {
          x = (1 - arrived[index]) * window.innerWidth - covered * 0.2 * item.offsetWidth;
          scale = 1 - covered * 0.06;
        }
        item.style.setProperty('--card-x', `${x.toFixed(1)}px`);
        item.style.setProperty('--card-scale', scale.toFixed(4));
        item.style.setProperty('--card-opacity', opacity.toFixed(3));
        // Only the project in front catches clicks.
        item.style.pointerEvents = arrived[index] < 0.5 || covered > 0.5 ? 'none' : '';
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const relayout = () => {
      layout();
      requestUpdate();
    };

    // Keyboard users: tabbing into a card scrolls to the point where that card is on top.
    const onFocusIn = (event) => {
      const index = items.findIndex((item) => item.contains(event.target));
      if (index < 0) return;
      const current = progress();
      const onTopFrom = index === 0 ? -Infinity : index - 1 + ENTER_START + ENTER_LENGTH;
      if (current >= onTopFrom && current <= index + ENTER_START) return;
      const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: runwayTop - pinTop + Math.max(0, index - 0.1) * perCard, behavior: 'instant' });
    };

    relayout();
    document.fonts?.ready.then(relayout);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', relayout);
    reduceMotion.addEventListener?.('change', requestUpdate);
    stage.addEventListener('focusin', onFocusIn);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', relayout);
      reduceMotion.removeEventListener?.('change', requestUpdate);
      stage.removeEventListener('focusin', onFocusIn);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [runwayRef, stageRef]);
}

// PROJECTS SECTION
export default function Projects() {
  const runwayRef = useRef(null);
  const stageRef = useRef(null);
  useSlideInCards(runwayRef, stageRef);

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className={container}>
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Projects</SectionLabel>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Production systems I’ve built and shipped: <em className="text-fg">backend architecture</em>, real-time features and the engineering decisions behind them.
            </p>
          </div>
          <h2 className="font-mono text-5xl font-bold tracking-tighter text-fg sm:text-7xl">Projects</h2>
        </div>
      </div>

      {/* The runway gives the scroll distance; the stage stays pinned while the cards slide in. */}
      <div ref={runwayRef} className="print:!h-auto">
        {/* overflow-x-clip hides cards waiting off-screen without making the page scroll sideways. */}
        <div ref={stageRef} className="sticky top-20 overflow-x-clip print:static">
          {/* All cards share one grid cell, so they sit on top of each other at the same size. */}
          <ol className={`${container} grid print:flex print:flex-col print:gap-6`}>
            {projectsData.map((project, index) => (
              <li key={project.id} className="col-start-1 row-start-1">
                <ProjectSlide project={project} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
