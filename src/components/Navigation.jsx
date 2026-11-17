import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const desktopLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Tech Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const mobileLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills & Tech Stack' },
  { id: 'projects', label: 'Featured Projects' },
  { id: 'experience', label: 'Experience & Education' },
  { id: 'contact', label: 'Contact & References' },
];

// Sticky Navigation Bar
export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const onHome = useLocation().pathname === '/';
  // Section anchors point back to the home page when rendered on other routes.
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-navigation sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" onClick={() => onHome && window.scrollTo({ top: 0 })} className="flex items-center gap-2.5 group focus:outline-hidden">
          <div className="flex flex-col">
            <span className="font-display font-bold text-slate-900 text-base leading-none tracking-tight">Lahiru Indusara</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {desktopLinks.map((link) => (
            <a key={link.id} href={sectionHref(link.id)} className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <a href="https://github.com/Lahiru4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 transition-colors">
            <i className="ph-fill ph-github-logo text-base"></i>
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
        >
          <i className={`ph ${menuOpen ? 'ph-x' : 'ph-list'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div id="mobile-menu" className={`${menuOpen ? '' : 'hidden '}md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2`}>
        {mobileLinks.map((link) => (
          <a key={link.id} href={sectionHref(link.id)} onClick={closeMenu} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
            {link.label}
          </a>
        ))}
        <div className="pt-2 flex items-center gap-2">
          <a href="https://github.com/Lahiru4" target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-700 bg-slate-100">
            <i className="ph-fill ph-github-logo text-base"></i> GitHub (@Lahiru4)
          </a>
          <a href={sectionHref('contact')} onClick={closeMenu} className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600">
            Contact Me
          </a>
        </div>
      </div>
    </header>
  );
}
