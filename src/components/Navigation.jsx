import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTheme, setTheme } from '../utils/theme.js';
import { container } from './ui.jsx';

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function ThemeToggle() {
  const [theme, setThemeState] = useState(getTheme);
  const next = theme === 'dark' ? 'light' : 'dark';

  const toggle = () => {
    setTheme(next);
    setThemeState(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg"
    >
      <i className={`ph ${theme === 'dark' ? 'ph-sun' : 'ph-moon'} text-lg`} aria-hidden="true"></i>
    </button>
  );
}

// Sticky Navigation Bar
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = useLocation().pathname === '/';
  // Section anchors point back to the home page when rendered on other routes.
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md no-print">
      <div className={`${container} flex h-16 items-center justify-between gap-6`}>
        {/* Brand */}
        <Link
          to="/"
          onClick={() => { closeMenu(); if (onHome) window.scrollTo({ top: 0 }); }}
          className="text-sm font-medium leading-tight text-fg"
        >
          Lahiru<br />Indusara
        </Link>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.id} href={sectionHref(link.id)} className="text-sm text-muted transition-colors hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg md:hidden"
          >
            <i className={`ph ${menuOpen ? 'ph-x' : 'ph-list'} text-lg`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav id="mobile-menu" aria-label="Mobile" className={`${menuOpen ? '' : 'hidden '}border-t border-line md:hidden`}>
        <div className={`${container} flex flex-col py-3`}>
          {links.map((link) => (
            <a key={link.id} href={sectionHref(link.id)} onClick={closeMenu} className="py-3 font-mono text-sm text-fg">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
