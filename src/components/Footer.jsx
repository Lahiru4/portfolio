const footerLinks = [
  { href: '#about', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-black bg-white text-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2">
        {/* Navigation links */}
        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-6">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="w-max text-lg font-bold hover:underline hover:decoration-2 hover:underline-offset-4">{link.label}</a>
          ))}
        </nav>

        {/* Contact details and social links */}
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Let’s talk for<br />
            <span className="font-light italic">Something special</span>
          </h2>
          <div className="mt-2 text-lg">
            <a href="mailto:lahiruindusara04@gmail.com" className="block font-bold transition-colors hover:text-gray-600">lahiruindusara04@gmail.com</a>
            <a href="tel:+94787969637" className="block font-semibold text-gray-500 transition-colors hover:text-black">+94 78 796 9637</a>
          </div>

          <div className="mt-2 flex gap-4" aria-label="Social links">
            <a href="https://github.com/Lahiru4" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-12 w-12 items-center justify-center rounded-xs bg-black text-white transition-colors hover:bg-gray-800">
              <i className="ph-fill ph-github-logo text-xl" aria-hidden="true"></i>
            </a>
            <a href="https://www.linkedin.com/search/results/all/?keywords=Lahiru%20Indusara%20Edirisinha" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-xs border-2 border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white">
              <i className="ph-fill ph-linkedin-logo text-xl" aria-hidden="true"></i>
            </a>
            <a href="mailto:lahiruindusara04@gmail.com" aria-label="Email" className="flex h-12 w-12 items-center justify-center rounded-xs border-2 border-black bg-transparent text-black transition-colors hover:bg-black hover:text-white">
              <i className="ph-bold ph-envelope-simple text-xl" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black px-6 py-6 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm font-semibold md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-white text-[10px] font-extrabold text-black" aria-hidden="true">IE</span>
            <span>Personal Portfolio</span>
          </div>
          <p className="text-gray-400">© 2026 E.A.L. Indusara Edirisinha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
