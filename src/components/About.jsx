import { useToast } from '../context/ToastContext.jsx';
import { copyToClipboard } from '../utils/clipboard.js';

const iconButton = 'inline-flex h-10 w-10 items-center justify-center rounded-sm border-2 border-slate-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
const lightButton = `${iconButton} bg-white text-slate-900 hover:bg-slate-900 hover:text-white`;

const exploringTopics = ['IoT & Connected Devices', 'Emerging Technologies', 'Software–Hardware Integration'];

// HERO SECTION
export default function About() {
  const showToast = useToast();

  const copyEmail = async () => {
    const copied = await copyToClipboard('lahiruindusara04@gmail.com');
    showToast(copied ? 'Email address copied!' : 'Copy failed. Please copy manually.');
  };

  return (
    <section id="about" className="relative bg-white border-b border-slate-200/80 pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Intro & Bio */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-[1.15]">
                <span className="block">Hello I’am <strong className="font-bold">E.A.L Indusara</strong></span>
                <span className="name-outline block font-bold" aria-label="Edirisinha">Edirisinha</span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-slate-600 pt-1">
                Building scalable, high-concurrency backends, real-time systems & AI-enabled platforms.
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-600 text-sm sm:text-sm leading-relaxed max-w-2xl">
              Final-year Computer Science & Software Engineering undergraduate with hands-on industry experience as an <strong className="font-semibold text-slate-900">Associate Software Engineer</strong>. Experienced in architecting secure REST APIs, transactional data systems, real-time applications, and cloud deployments, with a focus on reliability, security, and performance.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1 no-print">
              <a href="#projects" aria-label="Explore case studies" title="Explore case studies" className={`${iconButton} bg-slate-900 text-white hover:bg-white hover:text-slate-900`}>
                <i className="ph-bold ph-code-block text-lg" aria-hidden="true"></i>
              </a>
              <a href="https://github.com/Lahiru4" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile" title="GitHub" className={lightButton}>
                <i className="ph-fill ph-github-logo text-lg" aria-hidden="true"></i>
              </a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=Lahiru%20Indusara%20Edirisinha" target="_blank" rel="noopener noreferrer" aria-label="Find me on LinkedIn" title="LinkedIn" className={lightButton}>
                <i className="ph-fill ph-linkedin-logo text-lg" aria-hidden="true"></i>
              </a>
              <button type="button" onClick={copyEmail} aria-label="Copy email address" title="Copy email address" className={lightButton}>
                <i className="ph ph-envelope-simple text-lg" aria-hidden="true"></i>
              </button>
            </div>

            {/* Future Focus */}
            <div className="max-w-xl border-t border-slate-200/80 pt-5">
              <h2 className="font-display text-sm font-semibold text-slate-900">What I’m Exploring</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Interested in exploring how emerging technologies, IoT, and connected devices can bring software into the physical world.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {exploringTopics.map((topic, index) => (
                  <div key={topic} className={`border-b border-slate-200 pb-2${index === exploringTopics.length - 1 ? ' sm:col-span-2' : ''}`}>
                    <span className="font-display text-base font-semibold tracking-tight text-slate-900 sm:text-lg">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img
              src="/assets/indusara-engineering-portrait.jpeg"
              alt="Illustration of a software engineer working with code, systems, and data"
              className="w-full max-w-lg h-auto lg:scale-105"
              loading="eager"
              fetchPriority="high"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
