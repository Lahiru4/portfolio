import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation.jsx';
import { projectsData } from '../data/projects.js';

const pad = (value) => String(value).padStart(2, '0');

function splitFeature(feature, index) {
  const separator = feature.indexOf(':');
  return {
    title: separator > -1 ? feature.slice(0, separator).trim() : `Capability ${pad(index + 1)}`,
    description: separator > -1 ? feature.slice(separator + 1).trim() : feature,
  };
}

const initials = (item) => item.split(/[ .()/-]/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-12 lg:px-24">
      <p className="font-mono text-xs uppercase tracking-widest text-blue-300">Project not found</p>
      <h1 className="mt-4 font-display text-4xl font-bold">This case study is unavailable.</h1>
      <Link to="/#projects" className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold text-black">Back to projects</Link>
    </section>
  );
}

function FeatureRow({ feature, index, project }) {
  const { title, description } = splitFeature(feature, index);
  const reverse = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`space-y-5 ${reverse ? 'lg:order-2' : ''}`}>
        <span className="font-display text-6xl font-black tracking-tighter text-white sm:text-8xl">{pad(index + 1)}</span>
        <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h3>
        <p className="text-base leading-relaxed text-gray-400 sm:text-lg">{description}</p>
      </div>
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] p-8 ${reverse ? 'lg:order-1' : ''}`}>
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="relative flex h-full w-full flex-col justify-between rounded-2xl border border-zinc-800 p-6 sm:p-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{project.badge}</span>
          <div>
            <i className="ph-duotone ph-circles-four text-5xl text-blue-300" aria-hidden="true"></i>
            <p className="mt-5 font-display text-xl font-bold text-white">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.highlightTitle}</p>
          </div>
          <span className="font-mono text-xs text-zinc-600">CAPABILITY / {pad(index + 1)}</span>
        </div>
      </div>
    </article>
  );
}

function CaseStudy({ project }) {
  const titleParts = project.title.split('|').map((part) => part.trim());

  return (
    <>
      <header className="bg-black px-6 pb-8 pt-12 md:px-12 md:pt-16 lg:px-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <Link to="/#projects" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"><i className="ph-bold ph-arrow-left" aria-hidden="true"></i> All projects</Link>
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">{project.badge}</p>
          <h1 className="mb-6 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block font-extrabold">{titleParts[0]}</span>
            {titleParts[1] && <span className="mt-2 block font-medium italic text-gray-300">{titleParts.slice(1).join(' | ')}</span>}
          </h1>
          <p className="mb-10 max-w-3xl text-base font-medium leading-relaxed text-gray-400 sm:text-lg">{project.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            {project.cardTags.slice(0, 5).map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold text-gray-300">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {project.image && (
        <section className="w-full bg-black px-6 pb-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111]">
            <img src={project.image} alt={`${project.title} project preview`} className="aspect-[21/9] w-full object-cover" />
          </div>
        </section>
      )}

      <section className="bg-white px-6 py-20 text-black sm:py-24 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4"><h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Overview</h2></div>
          <div className="space-y-10 lg:col-span-8">
            <div className="space-y-5 text-base font-medium leading-relaxed text-gray-600 sm:text-lg">
              <p>{project.shortSummary}</p>
              <p>{project.engineeringHighlight}</p>
            </div>
            <div>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Technologies used</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.techGroups.flatMap((group) => group.items.map((item) => (
                  <div key={`${group.label}-${item}`} className="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-mono text-[10px] font-bold text-gray-400">{initials(item)}</div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">{group.label}</span>
                      <span className="mt-0.5 block text-sm font-bold">{item}</span>
                    </div>
                  </div>
                )))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-6xl space-y-24 lg:space-y-32">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">System capabilities</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">Key features & workflows</h2>
          </div>
          {project.features.map((feature, index) => (
            <FeatureRow key={feature} feature={feature} index={index} project={project} />
          ))}
        </div>
      </section>

      <footer className="bg-white px-6 py-16 text-black md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 border-b border-gray-200 pb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-400">Want to know more?</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Let's talk about it.</h2>
          </div>
          <a href="mailto:lahiruindusara04@gmail.com" className="inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-gray-700">Get in touch <i className="ph-bold ph-arrow-up-right" aria-hidden="true"></i></a>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 pt-6 text-xs font-semibold text-gray-400 sm:flex-row">
          <Link to="/#projects" className="text-black hover:text-gray-500">← Back to projects</Link>
          <span>© 2026 E.A.I. Indusara.</span>
        </div>
      </footer>
    </>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((item) => item.id === id);

  useEffect(() => {
    document.title = project ? `${project.title} | Project Case Study` : 'Project Case Study | Lahiru Indusara';
    window.scrollTo({ top: 0 });
  }, [project]);

  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-white selection:text-black">
      <Navigation />
      <main>{project ? <CaseStudy project={project} /> : <NotFound />}</main>
    </div>
  );
}
