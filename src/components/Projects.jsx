import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects.js';
import { container, SectionLabel, SlashList } from './ui.jsx';

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

function ProjectCard({ project, index }) {
  const href = `/projects/${encodeURIComponent(project.id)}`;

  return (
    <article className="group grid overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-line-strong md:grid-cols-2">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-80">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <ProjectVisual project={project} />
        </div>
      </Link>

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
          <span>{pad(index + 1)} / {pad(projectsData.length)}</span>
          <span>{project.year}</span>
        </div>

        <div>
          <h3 className="font-mono text-xl font-bold leading-snug tracking-tight text-fg sm:text-2xl">
            <Link to={href} className="hover:underline hover:decoration-1 hover:underline-offset-4">{project.title}</Link>
          </h3>
          <p className="mt-3 inline-flex rounded-full border border-line px-3 py-1 text-xs italic text-fg">{project.role}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.shortSummary}</p>

        <SlashList items={project.cardTags} className="text-muted" />

        <Link to={href} className="mt-auto inline-flex items-center gap-2 self-start pt-2" aria-label={`Read more about ${project.title}`}>
          <span className="inline-flex h-10 items-center rounded-full bg-invert px-5 text-xs font-medium italic text-invert-fg">Read more</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg text-fg" aria-hidden="true">
            <i className="ph-bold ph-arrow-right"></i>
          </span>
        </Link>
      </div>
    </article>
  );
}

// PROJECTS SECTION
export default function Projects() {
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

        <div className="flex flex-col gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
