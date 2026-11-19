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
      style={{ transform: 'scale(var(--card-scale, 1))', opacity: 'var(--card-opacity, 1)' }}
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

// Scroll-driven track: the project area pins below the header with every project laid out
// side by side (the next one peeks in on the right). As you scroll, the row slides left so
// each project in turn moves to the front; the others stay visible, slightly smaller and dimmer.
const HOLD = 0.3; // Share of each project's scroll distance where the row rests on it.
const SIDE_SCALE = 0.95; // Size of the projects that are not in front.
const SIDE_OPACITY = 0.6; // Opacity of the projects that are not in front.
const easeInOut = (value) => (value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2);
const clamp01 = (value) => Math.min(1, Math.max(0, value));

function useSlidingTrack(runwayRef, stageRef) {
  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    if (!runway || !stage) return undefined;

    const track = stage.querySelector(':scope > ol');
    const items = [...track.children];
    const last = items.length - 1;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pinTop = 0;
    let perCard = 1;
    let step = 0;
    let frame = 0;

    const layout = () => {
      // Pin centred in the space below the header; on short screens pin so the whole card stays visible.
      const headerHeight = document.querySelector('header')?.offsetHeight ?? 64;
      const stageHeight = stage.offsetHeight;
      const centred = headerHeight + (window.innerHeight - headerHeight - stageHeight) / 2;
      pinTop = Math.round(Math.min(Math.max(headerHeight + 16, centred), window.innerHeight - stageHeight - 16));
      perCard = Math.round(window.innerHeight * 0.8);
      // Distance between two neighbouring projects in the row (card width + gap).
      step = last > 0 ? items[1].offsetLeft - items[0].offsetLeft : 0;
      stage.style.top = `${pinTop}px`;
      // Scroll room: one screen-ish of scrolling per project after the first.
      runway.style.height = `${stageHeight + last * perCard}px`;
    };

    const progress = () => (pinTop - runway.getBoundingClientRect().top) / perCard;

    // Which project is in front, as a fractional index: 2 = third project, 2.5 = halfway to the fourth.
    // The row rests on each project for a moment, then eases over to the next.
    const trackPosition = (current) => {
      const clamped = Math.min(last, Math.max(0, current));
      if (reduceMotion.matches) return Math.round(clamped); // Jump between projects instead of sliding.
      const index = Math.floor(clamped);
      return index + easeInOut(clamp01((clamped - index - HOLD / 2) / (1 - HOLD)));
    };

    const update = () => {
      frame = 0;
      const position = trackPosition(progress());
      track.style.setProperty('--track-x', `${(-position * step).toFixed(1)}px`);

      items.forEach((item, index) => {
        // 1 = this project is in front, 0 = it is one or more places away.
        const focus = clamp01(1 - Math.abs(index - position));
        item.style.setProperty('--card-scale', (SIDE_SCALE + (1 - SIDE_SCALE) * focus).toFixed(4));
        item.style.setProperty('--card-opacity', (SIDE_OPACITY + (1 - SIDE_OPACITY) * focus).toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const relayout = () => {
      layout();
      requestUpdate();
    };

    // Keyboard users: tabbing into a project scrolls to the point where that project is in front.
    const onFocusIn = (event) => {
      const index = items.findIndex((item) => item.contains(event.target));
      if (index < 0) return;
      if (Math.abs(trackPosition(progress()) - index) < 0.01) return;
      const runwayTop = runway.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: runwayTop - pinTop + index * perCard, behavior: 'instant' });
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
  useSlidingTrack(runwayRef, stageRef);

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

      {/* The runway gives the scroll distance; the stage stays pinned while the row slides. */}
      <div ref={runwayRef} className="print:!h-auto">
        {/* overflow-x-clip trims the row at the screen edges without making the page scroll sideways. */}
        <div ref={stageRef} className="sticky top-20 overflow-x-clip print:static">
          {/* Projects sit side by side; each is a bit narrower than the container so the next one peeks in. */}
          <ol
            className={`${container} flex gap-5 md:gap-8 print:!transform-none print:flex-col print:gap-6`}
            style={{ transform: 'translateX(var(--track-x, 0px))' }}
          >
            {projectsData.map((project, index) => (
              <li key={project.id} className="w-[85%] flex-none print:w-full">
                <ProjectSlide project={project} index={index} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
