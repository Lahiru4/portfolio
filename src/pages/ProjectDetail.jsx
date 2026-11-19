import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import { ProjectVisual } from '../components/Projects.jsx';
import { container, SlashList } from '../components/ui.jsx';
import { projectsData } from '../data/projects.js';

const pad = (value) => String(value).padStart(2, '0');

// "Title: description" -> { title, description }
function splitFeature(feature) {
  const i = feature.indexOf(':');
  return i > -1
    ? { title: feature.slice(0, i).trim(), description: feature.slice(i + 1).trim() }
    : { title: '', description: feature };
}

// Label on the left, content on the right (stacked on small screens).
function Section({ title, children }) {
  return (
    <section className="grid gap-5 border-t border-line py-10 md:grid-cols-12 md:gap-8 sm:py-12">
      <h2 className="font-mono text-xs font-medium text-muted md:col-span-3 md:pt-1">.../{title}...</h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

const backLink = 'inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg';

function NotFound() {
  return (
    <div className="py-24">
      <h1 className="font-mono text-3xl font-bold tracking-tight">Project not found</h1>
      <Link to="/#projects" className={`${backLink} mt-6`}>
        <i className="ph-bold ph-arrow-left" aria-hidden="true"></i> Back to projects
      </Link>
    </div>
  );
}

function CaseStudy({ project, next }) {
  return (
    <article>
      {/* Header */}
      <header className="pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Link to="/#projects" className={`${backLink} mb-10`}>
          <i className="ph-bold ph-arrow-left" aria-hidden="true"></i> All projects
        </Link>
        <p className="mb-4 font-mono text-xs text-muted">{project.badge}</p>
        <h1 className="max-w-4xl font-mono text-3xl font-bold leading-tight tracking-tighter text-fg sm:text-5xl lg:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{project.subtitle}</p>

        <dl className="mt-8 flex flex-wrap gap-2 text-xs">
          <div className="inline-flex items-center gap-2 rounded-full bg-invert px-4 py-2 text-invert-fg">
            <dt className="sr-only">My role</dt>
            <dd className="italic">{project.role}</dd>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg">
            <dt className="sr-only">Year</dt>
            <dd className="font-mono">{project.year}</dd>
          </div>
        </dl>
      </header>

      <div className="mb-4 aspect-video overflow-hidden rounded-3xl border border-line">
        <ProjectVisual project={project} />
      </div>

      <Section title="Overview">
        <p className="text-base leading-relaxed text-fg sm:text-lg">{project.shortSummary}</p>
      </Section>

      <Section title="My role">
        <p className="leading-relaxed text-muted">
          <span className="font-medium text-fg">{project.role}.</span> {project.contribution}
        </p>
      </Section>

      <Section title="Engineering highlight">
        <div className="rounded-3xl bg-invert p-6 text-invert-fg sm:p-8">
          <h3 className="font-mono text-lg font-bold leading-snug sm:text-xl">{project.highlightTitle}</h3>
          <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">{project.engineeringHighlight}</p>
        </div>
      </Section>

      <Section title="Key features">
        <ol className="grid gap-3 sm:grid-cols-2">
          {project.features.map((feature, index) => {
            const { title, description } = splitFeature(feature);
            return (
              <li key={feature} className="rounded-3xl border border-line p-5">
                <span className="font-mono text-xs text-muted">{pad(index + 1)}</span>
                {title && <h3 className="mt-2 font-medium text-fg">{title}</h3>}
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section title="Tech stack">
        <dl className="divide-y divide-line border-y border-line">
          {project.techGroups.map((group) => (
            <div key={group.label} className="gap-6 py-4 sm:flex">
              <dt className="mb-2 text-sm text-fg sm:mb-0 sm:w-48 sm:shrink-0">{group.label}</dt>
              <dd><SlashList items={group.items} className="text-muted" /></dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Footer navigation */}
      <footer className="flex flex-col gap-6 border-t border-line py-10 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/#projects" className={backLink}>
          <i className="ph-bold ph-arrow-left" aria-hidden="true"></i> All projects
        </Link>
        {next && (
          <Link to={`/projects/${encodeURIComponent(next.id)}`} className="group text-left sm:text-right">
            <span className="block font-mono text-xs text-muted">Next project</span>
            <span className="mt-1 inline-flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-fg group-hover:underline group-hover:underline-offset-4">
              {next.title} <i className="ph-bold ph-arrow-right" aria-hidden="true"></i>
            </span>
          </Link>
        )}
      </footer>
    </article>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const index = projectsData.findIndex((item) => item.id === id);
  const project = projectsData[index];
  const next = project && projectsData.length > 1 ? projectsData[(index + 1) % projectsData.length] : null;

  useEffect(() => {
    document.title = project ? `${project.title} | Case Study` : 'Project not found | Lahiru Indusara';
    window.scrollTo({ top: 0 });
  }, [project]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className={container}>
        {project ? <CaseStudy project={project} next={next} /> : <NotFound />}
      </main>
    </div>
  );
}
