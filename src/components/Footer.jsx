import { container } from './ui.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className={`${container} flex flex-col gap-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between`}>
        <p>© {new Date().getFullYear()} E.A.L. Indusara Edirisinha. All rights reserved.</p>
        <a href="#top" className="inline-flex items-center gap-1.5 font-mono transition-colors hover:text-fg no-print">
          Back to top <i className="ph ph-arrow-up" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
}
