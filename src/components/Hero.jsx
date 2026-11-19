import { useToast } from '../context/ToastContext.jsx';
import { copyToClipboard } from '../utils/clipboard.js';
import { container, DecorCircle, OutlinePill, PillArrowLink } from './ui.jsx';

const headline = 'font-mono font-bold leading-[0.95] tracking-tighter text-fg text-[clamp(3rem,9.5vw,7.25rem)]';

// HERO SECTION
export default function Hero() {
  const showToast = useToast();

  const copyEmail = async () => {
    const copied = await copyToClipboard('lahiruindusara04@gmail.com');
    showToast(copied ? 'Email address copied!' : 'Copy failed. Please copy manually.');
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <DecorCircle className="-right-48 -top-56 h-[32rem] w-[32rem] sm:-right-32 sm:h-[38rem] sm:w-[38rem]" />

      <div className={`${container} relative pb-16 pt-14 sm:pb-24 sm:pt-24`}>
        <h1 className="sr-only">E.A.L Indusara Edirisinha, Associate Software Engineer</h1>

        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[1fr_auto] lg:gap-x-10 lg:gap-y-4">
          <p aria-hidden="true" className={`${headline} order-1 lg:order-none lg:col-start-1 lg:row-start-1`}>Software</p>

          <div className="order-4 flex items-center lg:order-none lg:col-start-2 lg:row-start-1 lg:justify-end">
            <PillArrowLink href="#projects">Projects</PillArrowLink>
          </div>

          <p className="order-3 max-w-md text-base leading-relaxed text-muted lg:order-none lg:col-start-1 lg:row-start-2 lg:self-end lg:pb-3">
            Hello, I’m <span className="font-medium text-fg">E.A.L Indusara Edirisinha</span>. My goal is to build{' '}
            <em className="text-fg">scalable, high-concurrency backends</em>, <em className="text-fg">real-time systems</em> and{' '}
            <em className="text-fg">AI-enabled platforms</em> that stay reliable in production.
          </p>

          <p aria-hidden="true" className={`${headline} order-2 sm:text-right lg:order-none lg:col-start-2 lg:row-start-2`}>Engineer</p>
        </div>

        {/* Social links */}
        <div className="mt-12 flex flex-wrap items-center gap-2 sm:mt-16 sm:justify-center sm:gap-3 no-print">
          <OutlinePill href="https://github.com/Lahiru4" icon="ph-fill ph-github-logo" external>GitHub</OutlinePill>
          <OutlinePill href="https://www.linkedin.com/search/results/all/?keywords=Lahiru%20Indusara%20Edirisinha" icon="ph-fill ph-linkedin-logo" external>LinkedIn</OutlinePill>
          <OutlinePill onClick={copyEmail} icon="ph ph-envelope-simple">Copy email</OutlinePill>
          <OutlinePill href="tel:+94787969637" icon="ph ph-phone">+94 78 796 9637</OutlinePill>
        </div>
      </div>
    </section>
  );
}
