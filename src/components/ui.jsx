import { Link } from 'react-router-dom';

export const container = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';

// ".../About me..." style section label.
export function SectionLabel({ children, className = '' }) {
  return <p className={`font-mono text-xs font-medium text-muted ${className}`}>.../{children}...</p>;
}

// Thin outline circle used as background decoration.
export function DecorCircle({ className = '' }) {
  return <span aria-hidden="true" className={`pointer-events-none absolute rounded-full border border-line ${className}`}></span>;
}

// "Java / Go / TypeScript" mono list where each item stays on one line.
export function SlashList({ items, className = '' }) {
  return (
    <p className={`font-mono text-xs leading-relaxed ${className}`}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={item}>
            {/* The slash stays on the same line as its item, so lines break after it. */}
            <span className="whitespace-nowrap">
              {item}
              {!last && <span className="opacity-50"> /</span>}
            </span>
            {!last && ' '}
          </span>
        );
      })}
    </p>
  );
}

const pillBase = 'inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium italic transition-colors';
const circleBase = 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors';

// Solid pill + round arrow button pair, as in "Projects (→)".
export function PillArrowLink({ to, href, children, onClick }) {
  const content = (
    <>
      <span className={`${pillBase} min-w-36 bg-invert text-invert-fg group-hover:opacity-85`}>{children}</span>
      <span className={`${circleBase} border-fg text-fg group-hover:bg-invert group-hover:text-invert-fg`} aria-hidden="true">
        <i className="ph-bold ph-arrow-right text-base"></i>
      </span>
    </>
  );
  const className = 'group inline-flex items-center gap-2';
  return to ? (
    <Link to={to} className={className} onClick={onClick}>{content}</Link>
  ) : (
    <a href={href} className={className} onClick={onClick}>{content}</a>
  );
}

// Small outlined pill, used for social links and tags.
export function OutlinePill({ href, icon, children, onClick, external = false }) {
  const className = 'inline-flex h-9 items-center gap-2 rounded-full border border-line px-4 text-xs italic text-muted transition-colors hover:border-fg hover:text-fg';
  const inner = (
    <>
      {icon && <i className={`${icon} text-sm not-italic`} aria-hidden="true"></i>}
      <span>{children}</span>
    </>
  );
  if (onClick) {
    return <button type="button" onClick={onClick} className={className}>{inner}</button>;
  }
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  );
}
