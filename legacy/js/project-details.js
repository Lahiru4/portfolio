const detailRoot = document.getElementById('project-detail');
const projectId = new URLSearchParams(window.location.search).get('id');
const project = projectsData.find((item) => item.id === projectId);

if (!project) {
    detailRoot.innerHTML = `
      <section class="mx-auto max-w-6xl px-6 py-24 md:px-12 lg:px-24">
        <p class="font-mono text-xs uppercase tracking-widest text-blue-300">Project not found</p>
        <h1 class="mt-4 font-display text-4xl font-bold">This case study is unavailable.</h1>
        <a href="index.html#projects" class="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-bold text-black">Back to projects</a>
      </section>`;
} else {
    document.title = project.title + ' | Project Case Study';
    const titleParts = project.title.split('|').map((part) => part.trim());
    const featureRows = project.features.map((feature, index) => {
        const separator = feature.indexOf(':');
        const title = separator > -1 ? feature.slice(0, separator).trim() : `Capability ${String(index + 1).padStart(2, '0')}`;
        const description = separator > -1 ? feature.slice(separator + 1).trim() : feature;
        const reverse = index % 2 === 1;
        return `
          <article class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div class="space-y-5 ${reverse ? 'lg:order-2' : ''}">
              <span class="font-display text-6xl font-black tracking-tighter text-white sm:text-8xl">${String(index + 1).padStart(2, '0')}</span>
              <h3 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">${title}</h3>
              <p class="text-base leading-relaxed text-gray-400 sm:text-lg">${description}</p>
            </div>
            <div class="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] p-8 ${reverse ? 'lg:order-1' : ''}">
              <div class="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div class="relative flex h-full w-full flex-col justify-between rounded-2xl border border-zinc-800 p-6 sm:p-8">
                <span class="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">${project.badge}</span>
                <div><i class="ph-duotone ph-circles-four text-5xl text-blue-300" aria-hidden="true"></i><p class="mt-5 font-display text-xl font-bold text-white">${title}</p><p class="mt-2 text-sm leading-relaxed text-zinc-400">${project.highlightTitle}</p></div>
                <span class="font-mono text-xs text-zinc-600">CAPABILITY / ${String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>
          </article>`;
    }).join('');

    const techCards = project.techGroups.flatMap((group) => group.items.map((item) => `
      <div class="flex items-center gap-4 rounded-2xl border border-gray-200 p-4">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-mono text-[10px] font-bold text-gray-400">${item.split(/[ .()/-]/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}</div>
        <div><span class="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">${group.label}</span><span class="mt-0.5 block text-sm font-bold">${item}</span></div>
      </div>`)).join('');

    detailRoot.innerHTML = `
      <header class="bg-black px-6 pb-8 pt-12 md:px-12 md:pt-16 lg:px-24">
        <div class="mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <a href="index.html#projects" class="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-white"><i class="ph-bold ph-arrow-left" aria-hidden="true"></i> All projects</a>
          <p class="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">${project.badge}</p>
          <h1 class="mb-6 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span class="block font-extrabold">${titleParts[0]}</span>
            ${titleParts[1] ? `<span class="mt-2 block font-medium italic text-gray-300">${titleParts.slice(1).join(' | ')}</span>` : ''}
          </h1>
          <p class="mb-10 max-w-3xl text-base font-medium leading-relaxed text-gray-400 sm:text-lg">${project.subtitle}</p>
          <div class="flex flex-wrap gap-3">${project.cardTags.slice(0, 5).map((tag) => `<span class="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold text-gray-300">${tag}</span>`).join('')}</div>
        </div>
      </header>

      ${project.image ? `<section class="w-full bg-black px-6 pb-16 md:px-12 lg:px-24"><div class="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111]"><img src="${project.image}" alt="${project.title} project preview" class="aspect-[21/9] w-full object-cover"></div></section>` : ''}

      <section class="bg-white px-6 py-20 text-black sm:py-24 md:px-12 lg:px-24">
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div class="lg:col-span-4"><h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Overview</h2></div>
          <div class="space-y-10 lg:col-span-8">
            <div class="space-y-5 text-base font-medium leading-relaxed text-gray-600 sm:text-lg"><p>${project.shortSummary}</p><p>${project.engineeringHighlight}</p></div>
            <div>
              <h3 class="mb-6 text-sm font-bold uppercase tracking-widest text-gray-400">Technologies used</h3>
              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">${techCards}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-black px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div class="mx-auto max-w-6xl space-y-24 lg:space-y-32">
          <div class="max-w-3xl"><p class="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">System capabilities</p><h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">Key features & workflows</h2></div>
          ${featureRows}
        </div>
      </section>

      <footer class="bg-white px-6 py-16 text-black md:px-12 lg:px-24">
        <div class="mx-auto flex max-w-6xl flex-col justify-between gap-8 border-b border-gray-200 pb-10 sm:flex-row sm:items-end">
          <div><p class="mb-3 font-mono text-xs uppercase tracking-widest text-gray-400">Want to know more?</p><h2 class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Let's talk about it.</h2></div>
          <a href="mailto:lahiruindusara04@gmail.com" class="inline-flex w-fit items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-gray-700">Get in touch <i class="ph-bold ph-arrow-up-right" aria-hidden="true"></i></a>
        </div>
        <div class="mx-auto flex max-w-6xl flex-col justify-between gap-3 pt-6 text-xs font-semibold text-gray-400 sm:flex-row"><a href="index.html#projects" class="text-black hover:text-gray-500">← Back to projects</a><span>© 2026 E.A.I. Indusara.</span></div>
      </footer>`;
}
