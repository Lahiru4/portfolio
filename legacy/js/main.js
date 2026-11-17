// Render projects as alternating showcase rows.
function renderProjects() {
    const grid = document.getElementById('projects-grid');

    const visualStyles = {
        typescript: {icon: 'ph-heartbeat', accent: 'text-cyan-300', glow: 'bg-cyan-400/10'},
        java: {icon: 'ph-users-three', accent: 'text-orange-300', glow: 'bg-orange-400/10'},
        python: {icon: 'ph-brain', accent: 'text-emerald-300', glow: 'bg-emerald-400/10'},
        go: {icon: 'ph-gavel', accent: 'text-violet-300', glow: 'bg-violet-400/10'}
    };

    grid.innerHTML = projectsData.map((project, index) => {
        const visual = visualStyles[project.category] || visualStyles.typescript;
        const visualOrder = index % 2 === 0 ? 'md:order-1' : 'md:order-2';
        const contentOrder = index % 2 === 0 ? 'md:order-2' : 'md:order-1';
        const projectNumber = String(index + 1).padStart(2, '0');
        const accentBackground = visual.accent.replace('text-', 'bg-');
        const projectVisual = project.image
            ? '<div class="project-scroll-visual ' + visualOrder + ' relative aspect-[4/3] min-h-72 overflow-hidden rounded-xl shadow-[0_14px_36px_rgba(125,150,190,0.12)] sm:min-h-80">' +
                '<img src="' + project.image + '" alt="' + project.title + ' project preview" class="absolute inset-0 h-full w-full object-cover" loading="lazy">' +
              '</div>'
            : '<div class="project-scroll-visual ' + visualOrder + ' relative flex min-h-72 flex-col justify-between overflow-hidden border border-white/10 bg-slate-950 p-6 sm:min-h-80 sm:p-9">' +
                '<div class="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full ' + visual.glow + ' blur-3xl"></div>' +
                '<div class="relative flex items-center justify-between gap-4">' +
                '<span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">' +
                '<span class="h-1.5 w-1.5 rounded-full ' + accentBackground + '"></span>' +
                project.badge +
                '</span>' +
                '<span class="font-mono text-xs text-slate-500">' + projectNumber + ' / ' + String(projectsData.length).padStart(2, '0') + '</span>' +
                '</div>' +
                '<div class="relative my-8 flex flex-1 flex-col justify-center">' +
                '<div class="mb-5 flex h-16 w-16 items-center justify-center border border-white/15 bg-white/[0.03] ' + visual.accent + '">' +
                '<i class="ph-duotone ' + visual.icon + ' text-4xl" aria-hidden="true"></i>' +
                '</div>' +
                '<h4 class="font-display text-xl font-bold leading-snug text-white sm:text-2xl">' + project.highlightTitle + '</h4>' +
                '<p class="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">' + project.engineeringHighlight + '</p>' +
                '</div>' +
                '<div class="relative flex flex-wrap gap-2">' +
                project.cardTags.slice(0, 4).map(tag =>
                    '<span class="border border-white/10 px-2.5 py-1 text-[11px] font-mono text-slate-300">' + tag + '</span>'
                ).join('') +
                '</div>' +
              '</div>';

        const stackClass = index === projectsData.length - 1 ? ' project-stack-card-last' : '';
        return '<article class="project-stack-card' + stackClass + ' grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16" style="--stack-order:' + (index + 1) + '">' +
            projectVisual +
            '<div class="project-scroll-copy ' + contentOrder + ' py-2">' +
            '<p class="mb-4 font-display text-4xl font-bold leading-none text-white sm:text-5xl">' + projectNumber + '</p>' +
            '<h3 class="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">' + project.title + '</h3>' +
            '<p class="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">' + project.shortSummary + '</p>' +
            '<a href="project-details.html?id=' + encodeURIComponent(project.id) + '" class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-300">' +
            '<span>View Case Details</span>' +
            '<i class="ph-bold ph-arrow-up-right" aria-hidden="true"></i>' +
            '</a>' +
            '</div>' +
            '</article>';
    }).join('');

    const projectCards = [...grid.querySelectorAll('.project-stack-card')];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stackFrame = 0;

    const updateProjectStack = () => {
        stackFrame = 0;
        if (reduceMotion.matches) return;

        projectCards.forEach((card, index) => {
            const nextCard = projectCards[index + 1];
            const stickyTop = parseFloat(window.getComputedStyle(card).top) || 64;
            const animationStart = stickyTop + 240;
            const nextTop = nextCard ? nextCard.getBoundingClientRect().top : animationStart;
            const stackProgress = Math.max(0, Math.min(1, (animationStart - nextTop) / (animationStart - stickyTop)));
            const scale = 1 - stackProgress * 0.045;
            const blur = stackProgress * 5;
            const opacity = 1 - stackProgress;
            card.style.setProperty('--stack-scale', scale.toFixed(3));
            card.style.setProperty('--stack-blur', blur.toFixed(2) + 'px');
            card.style.setProperty('--stack-opacity', opacity.toFixed(3));
        });
    };

    const requestProjectStackUpdate = () => {
        if (!stackFrame) stackFrame = window.requestAnimationFrame(updateProjectStack);
    };

    window.addEventListener('scroll', requestProjectStackUpdate, {passive: true});
    window.addEventListener('resize', requestProjectStackUpdate);
    reduceMotion.addEventListener?.('change', requestProjectStackUpdate);
    requestProjectStackUpdate();
}

// Clipboard Helper (Iframe Safe)
function copyToClipboard(text, message) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast(message || 'Copied to clipboard!');
    } catch (err) {
        showToast('Copy failed. Please copy manually.');
    }
    document.body.removeChild(textarea);
}

// Toast Notification Helper
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-lg border border-slate-700 transition-all duration-300';
    toast.innerHTML = `
                <i class="ph-fill ph-check-circle text-emerald-400 text-base"></i>
                <span>${message}</span>
            `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileIcon = document.getElementById('mobile-menu-icon');

mobileBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileIcon.className = 'ph ph-x text-2xl';
    } else {
        mobileMenu.classList.add('hidden');
        mobileIcon.className = 'ph ph-list text-2xl';
    }
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileIcon.className = 'ph ph-list text-2xl';
    });
});

// Portfolio Assistant Chat (local portfolio-guidance responses)
const assistantChatForm = document.getElementById('assistant-chat-form');
const assistantChatInput = document.getElementById('assistant-chat-input');
const assistantChatMessages = document.getElementById('assistant-chat-messages');

function addAssistantChatMessage(message, sender) {
    const row = document.createElement('div');
    const bubble = document.createElement('p');
    bubble.className = sender === 'user'
        ? 'max-w-[88%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm'
        : 'max-w-[88%] text-sm leading-relaxed text-slate-600';
    bubble.textContent = message;

    if (sender === 'user') {
        row.className = 'flex justify-end';
        row.appendChild(bubble);
    } else {
        row.className = 'flex max-w-[88%] items-end gap-2';
        const avatar = document.createElement('span');
        avatar.className = 'flex h-7 w-7 shrink-0 items-center justify-center text-blue-600';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.innerHTML = '<i class="ph ph-sparkle"></i>';
        row.append(avatar, bubble);
    }

    assistantChatMessages.appendChild(row);
    assistantChatMessages.scrollTop = assistantChatMessages.scrollHeight;
}

function getAssistantReply(message) {
    const query = message.toLowerCase();
    if (query.includes('project') || query.includes('built') || query.includes('my work') || query.includes('your work')) {
        return 'Indusara has worked on telemedicine, HR and payroll, multilingual healthcare AI, and real-time auction systems. Explore the Featured Projects section for the case studies.';
    }
    if (query.includes('experience') || query.includes('job') || query.includes('work history')) {
        return 'Indusara is an Associate Software Engineer at Boswin Group, with previous software engineering internship and IT assistant experience. See the Professional Experience section for details.';
    }
    if (query.includes('skill') || query.includes('technology') || query.includes('stack')) {
        return 'His main technologies include Java and Spring Boot, Go, TypeScript and Node.js, Python and FastAPI, plus PostgreSQL, MySQL, Redis, and cloud platforms. The Skills section has the full stack.';
    }
    if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
        return 'You can reach Indusara at lahiruindusara04@gmail.com or call +94 78 796 9637. The contact links are on this page.';
    }
    return 'I can help you explore Indusara’s projects, experience, and technical skills. Try one of the suggested topics, or contact him directly at lahiruindusara04@gmail.com.';
}

function submitAssistantChatMessage(message) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    addAssistantChatMessage(trimmedMessage, 'user');
    assistantChatInput.value = '';
    window.setTimeout(() => {
        addAssistantChatMessage(getAssistantReply(trimmedMessage), 'assistant');
    }, 350);
}

assistantChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitAssistantChatMessage(assistantChatInput.value);
});

document.querySelectorAll('.assistant-prompt').forEach((button) => {
    button.addEventListener('click', () => submitAssistantChatMessage(button.dataset.prompt));
});

// Components are loaded before this script, so initialize immediately.
renderProjects();
