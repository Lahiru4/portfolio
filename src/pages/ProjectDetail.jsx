import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import { ProjectVisual } from '../components/Projects.jsx';
import { container, SlashList } from '../components/ui.jsx';
import { isAcademic, projectsData } from '../data/projects.js';

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

// Inverted card with the award photo beside what it was for.
function AwardCard({ award }) {
  return (
    <figure className="grid overflow-hidden rounded-3xl bg-invert text-invert-fg sm:grid-cols-[minmax(0,15rem)_1fr]">
      <img src={award.image} alt={award.alt} className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto" loading="lazy" />
      <figcaption className="flex flex-col justify-center gap-3 p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 font-mono text-xs opacity-70">
          <i className="ph-fill ph-trophy" aria-hidden="true"></i> {award.label}
        </p>
        <h3 className="font-mono text-xl font-bold leading-snug sm:text-2xl">{award.title}</h3>
        <p className="font-mono text-xs opacity-70">{award.event}</p>
        <p className="text-sm leading-relaxed opacity-80 sm:text-base">{award.text}</p>
      </figcaption>
    </figure>
  );
}

// Who the project was researched with, with a link to their site.
function ClientIntro({ client }) {
  return (
    <div className="mb-6 space-y-3">
      <p className="leading-relaxed text-muted">
        <a href={client.url} target="_blank" rel="noopener noreferrer" className="font-medium text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
          {client.name}
          <i className="ph ph-arrow-up-right ml-0.5 align-[-1px] text-sm" aria-hidden="true"></i>
        </a>{' '}
        {client.text}
      </p>
      {client.note && <p className="font-mono text-xs text-faint">{client.note}</p>}
    </div>
  );
}

// Two-column photo grid; with an odd number of photos the first one spans the full width.
// Each photo opens full size in a new tab.
function Gallery({ photos }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {photos.map((photo, index) => {
        const wide = index === 0 && photos.length % 2 === 1;
        return (
          <li key={photo.src} className={wide ? 'sm:col-span-2' : ''}>
            <figure>
              <a href={photo.src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-3xl border border-line" aria-label={`Open photo: ${photo.caption}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${wide ? 'aspect-[16/9]' : 'aspect-[3/2]'}`}
                  loading="lazy"
                />
              </a>
              <figcaption className="mt-2 px-1 font-mono text-xs text-muted">
                {pad(index + 1)} · {photo.caption}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

// One app screen in a simple window frame; opens full size in a new tab.
function ScreenShot({ screen }) {
  return (
    <figure>
      <a href={screen.src} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-2xl border border-line bg-surface" aria-label={`Open screen: ${screen.title}`}>
        <div className="flex h-8 items-center gap-1.5 border-b border-line px-3" aria-hidden="true">
          <span className="h-2 w-2 rounded-full border border-faint"></span>
          <span className="h-2 w-2 rounded-full border border-faint"></span>
          <span className="h-2 w-2 rounded-full border border-faint"></span>
          <span className="ml-2 truncate font-mono text-[11px] text-muted">{screen.title}</span>
        </div>
        <img src={screen.src} alt={screen.alt} className="block aspect-video w-full object-cover object-left-top transition-opacity group-hover:opacity-90" loading="lazy" />
      </a>
      <figcaption className="mt-2 px-1 text-xs leading-relaxed text-muted">{screen.caption}</figcaption>
    </figure>
  );
}

// App screens: the first one large, the rest in a two-column grid.
function Screens({ screens }) {
  const [first, ...rest] = screens.items;
  return (
    <div>
      <p className="mb-5 font-mono text-xs text-faint">{screens.note}</p>
      <ScreenShot screen={first} />
      {rest.length > 0 && (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((screen) => (
            <li key={screen.src}>
              <ScreenShot screen={screen} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
  // Campus projects live in their own block on the home page, so "back" goes there.
  const academic = isAcademic(project);
  const back = academic ? { to: '/#academic', label: 'Academic projects' } : { to: '/#projects', label: 'All projects' };

  return (
    <article>
      {/* Header */}
      <header className="pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Link to={back.to} className={`${backLink} mb-10`}>
          <i className="ph-bold ph-arrow-left" aria-hidden="true"></i> {back.label}
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
          {academic && (
            <div className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg">
              <dt className="sr-only">Project type</dt>
              <dd className="inline-flex items-center gap-1.5">
                <i className="ph ph-graduation-cap" aria-hidden="true"></i> Academic project
              </dd>
            </div>
          )}
          {project.award && (
            <div className="inline-flex items-center gap-2 rounded-full border border-fg px-4 py-2 text-fg">
              <dt className="sr-only">Award</dt>
              <dd className="inline-flex items-center gap-1.5">
                <i className="ph-fill ph-trophy" aria-hidden="true"></i> {project.award.label}
              </dd>
            </div>
          )}
        </dl>
      </header>

      <div className="mb-4 aspect-video overflow-hidden rounded-3xl border border-line">
        <ProjectVisual project={project} />
      </div>

      <Section title="Overview">
        <p className="text-base leading-relaxed text-fg sm:text-lg">{project.shortSummary}</p>
      </Section>

      {project.award && (
        <Section title="Recognition">
          <AwardCard award={project.award} />
        </Section>
      )}

      {(project.client || project.gallery) && (
        <Section title="Field research">
          {project.client && <ClientIntro client={project.client} />}
          {project.gallery && <Gallery photos={project.gallery} />}
        </Section>
      )}

      {project.screens && (
        <Section title="Interface">
          <Screens screens={project.screens} />
        </Section>
      )}

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
        <Link to={back.to} className={backLink}>
          <i className="ph-bold ph-arrow-left" aria-hidden="true"></i> {back.label}
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
  const project = projectsData.find((item) => item.id === id);
  // "Next project" stays within the same group: company projects or campus projects.
  const group = project ? projectsData.filter((item) => isAcademic(item) === isAcademic(project)) : [];
  const index = group.indexOf(project);
  const next = group.length > 1 ? group[(index + 1) % group.length] : null;

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
