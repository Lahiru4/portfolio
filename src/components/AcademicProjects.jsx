import { Link } from 'react-router-dom';
import { academicProjects } from '../data/projects.js';
import { ProjectVisual } from './Projects.jsx';
import { container, SectionLabel, SlashList } from './ui.jsx';

// One campus project: photo on the left, details on the right (stacked on phones).
function AcademicProjectCard({ project }) {
  const href = `/projects/${encodeURIComponent(project.id)}`;

  return (
    <article className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-line md:grid-cols-12">
      <Link to={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/10] overflow-hidden md:col-span-5 md:aspect-auto md:min-h-80">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
          <ProjectVisual project={project} />
        </div>
      </Link>

      <div className="flex flex-col gap-4 p-6 sm:p-8 md:col-span-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-xs text-muted">{project.badge}</p>
          <p className="font-mono text-xs text-muted">{project.year}</p>
        </div>

        <h3 className="font-mono text-2xl font-bold leading-tight tracking-tight text-fg md:text-3xl">
          <Link to={href} className="hover:underline hover:decoration-1 hover:underline-offset-4">{project.title}</Link>
        </h3>

        <div className="flex flex-wrap gap-2">
          <p className="inline-flex rounded-full bg-invert px-3 py-1 text-xs italic text-invert-fg">{project.role}</p>
          {project.award && (
            <p className="inline-flex items-center gap-1.5 rounded-full border border-fg px-3 py-1 text-xs text-fg">
              <i className="ph-fill ph-trophy" aria-hidden="true"></i> {project.award.label}
            </p>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.shortSummary}</p>

        <SlashList items={project.cardTags} className="text-muted" />

        <Link to={href} className="group/more inline-flex items-center gap-2 self-start pt-1" aria-label={`Read more about ${project.title}`}>
          <span className="inline-flex h-10 items-center rounded-full bg-invert px-5 text-xs font-medium italic text-invert-fg transition-opacity group-hover/more:opacity-85">Read more</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg text-fg transition-colors group-hover/more:bg-invert group-hover/more:text-invert-fg" aria-hidden="true">
            <i className="ph-bold ph-arrow-right"></i>
          </span>
        </Link>
      </div>
    </article>
  );
}

// ACADEMIC PROJECTS: campus work, kept apart from the company projects carousel.
// Sits straight after Experience (which ends with Education), so it has no top padding.
export default function AcademicProjects() {
  if (academicProjects.length === 0) return null;

  return (
    <section id="academic" className="pb-16 sm:pb-24">
      <div className={container}>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel>Campus projects</SectionLabel>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Team projects from my studies, built around <em className="text-fg">real business scenarios</em>.
            </p>
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tighter text-fg sm:text-6xl">Academic</h2>
        </div>

        <ul className="space-y-6">
          {academicProjects.map((project) => (
            <li key={project.id}>
              <AcademicProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
