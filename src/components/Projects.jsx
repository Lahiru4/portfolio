import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects.js';
import { useProjectStack } from './useProjectStack.js';

const visualStyles = {
  typescript: { icon: 'ph-heartbeat', accent: 'text-cyan-300', dot: 'bg-cyan-300', glow: 'bg-cyan-400/10' },
  java: { icon: 'ph-users-three', accent: 'text-orange-300', dot: 'bg-orange-300', glow: 'bg-orange-400/10' },
  python: { icon: 'ph-brain', accent: 'text-emerald-300', dot: 'bg-emerald-300', glow: 'bg-emerald-400/10' },
  go: { icon: 'ph-gavel', accent: 'text-violet-300', dot: 'bg-violet-300', glow: 'bg-violet-400/10' },
};

const pad = (value) => String(value).padStart(2, '0');

function ProjectVisual({ project, projectNumber, orderClass }) {
  const visual = visualStyles[project.category] || visualStyles.typescript;

  if (project.image) {
    return (
      <div className={`project-scroll-visual ${orderClass} relative aspect-[4/3] min-h-72 overflow-hidden rounded-xl shadow-[0_14px_36px_rgba(125,150,190,0.12)] sm:min-h-80`}>
        <img src={project.image} alt={`${project.title} project preview`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`project-scroll-visual ${orderClass} relative flex min-h-72 flex-col justify-between overflow-hidden border border-white/10 bg-slate-950 p-6 sm:min-h-80 sm:p-9`}>
      <div className={`pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full ${visual.glow} blur-3xl`}></div>
      <div className="relative flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
          <span className={`h-1.5 w-1.5 rounded-full ${visual.dot}`}></span>
          {project.badge}
        </span>
        <span className="font-mono text-xs text-slate-500">{projectNumber} / {pad(projectsData.length)}</span>
      </div>
      <div className="relative my-8 flex flex-1 flex-col justify-center">
        <div className={`mb-5 flex h-16 w-16 items-center justify-center border border-white/15 bg-white/[0.03] ${visual.accent}`}>
          <i className={`ph-duotone ${visual.icon} text-4xl`} aria-hidden="true"></i>
        </div>
        <h4 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">{project.highlightTitle}</h4>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.engineeringHighlight}</p>
      </div>
      <div className="relative flex flex-wrap gap-2">
        {project.cardTags.slice(0, 4).map((tag) => (
          <span key={tag} className="border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-300">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// FEATURED PROJECTS SECTION
export default function Projects() {
  const cardRefs = useRef([]);
  useProjectStack(cardRefs);

  return (
    <section id="projects" className="bg-black py-20 text-white sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div id="projects-section-heading" className="mb-14 text-center sm:mb-16">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Production Systems & Engineering Projects</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">Featured Engineering Projects</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
            A selection of production systems, backend architecture, and engineering decisions.
          </p>
        </div>

        {/* Alternating Project Showcase Rows */}
        <div id="projects-grid" className="flex flex-col gap-16 sm:gap-24">
          {projectsData.map((project, index) => {
            const even = index % 2 === 0;
            const projectNumber = pad(index + 1);
            const isLast = index === projectsData.length - 1;
            return (
              <article
                key={project.id}
                ref={(element) => { cardRefs.current[index] = element; }}
                className={`project-stack-card${isLast ? ' project-stack-card-last' : ''} grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16`}
                style={{ '--stack-order': index + 1 }}
              >
                <ProjectVisual project={project} projectNumber={projectNumber} orderClass={even ? 'md:order-1' : 'md:order-2'} />
                <div className={`project-scroll-copy ${even ? 'md:order-2' : 'md:order-1'} py-2`}>
                  <p className="mb-4 font-display text-4xl font-bold leading-none text-white sm:text-5xl">{projectNumber}</p>
                  <h3 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">{project.shortSummary}</p>
                  <Link to={`/projects/${encodeURIComponent(project.id)}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-300">
                    <span>View Case Details</span>
                    <i className="ph-bold ph-arrow-up-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
