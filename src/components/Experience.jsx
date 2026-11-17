const jobs = [
  {
    role: 'Associate Software Engineer',
    company: 'Boswin Group (Private) Limited',
    period: 'May 2025 – Present',
    initial: 'B',
    cardClass: 'border-white/25 bg-black hover:border-white/40',
    badgeClass: 'bg-blue-500/15 text-blue-300',
    paragraphs: ['Architecting and maintaining production backend platforms across healthcare telemedicine, enterprise HR & payroll, and real-time marketplaces.'],
    bullets: [
      'Implementing transactional booking workflows, role-based access control (RBAC), payment gateway integrations, and real-time WebSocket/Socket.IO communication layers.',
      'Managing cloud services and storage pipelines across AWS, Google Cloud, Firebase, and VPS environments.',
    ],
    location: 'Kollupitiya, Colombo',
    footerClass: 'text-slate-500',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Boswin Group (Private) Limited',
    period: 'Nov 2024 – Apr 2025',
    initial: 'B',
    cardClass: 'border-white/10 bg-[#29292c] hover:bg-[#303034]',
    badgeClass: 'bg-white/10 text-white',
    paragraphs: [
      'Completed intensive full-stack and backend engineering training while contributing to core REST API modules in Spring Boot, Node.js, and Python.',
      'Collaborated on database schema design, JWT authentication flows, automated PDF generation (payslips, QR ID cards, prescriptions), and API documentation via Swagger/OpenAPI.',
    ],
    location: 'Kollupitiya, Colombo',
    footerClass: 'text-slate-400',
  },
  {
    role: 'IT Assistant',
    company: 'Softlogic Holdings PLC',
    period: '2021',
    initial: 'S',
    cardClass: 'border-white/25 bg-black hover:border-white/40',
    badgeClass: 'bg-white/10 text-slate-300',
    paragraphs: ['Provided foundational IT operations support, system troubleshooting, and hardware/software assistance in an enterprise environment.'],
    note: 'Post O/L Industry Exposure',
    footerClass: 'text-slate-500',
  },
];

const education = [
  {
    school: 'ICBT Campus',
    status: 'Final year',
    degree: 'BSc (Hons) in Software Engineering',
    summary: 'Focused on software architecture, distributed backend systems, database engineering, cloud computing, and AI integration.',
  },
  {
    school: 'Institute of Software Engineering (IJSE)',
    status: 'Completed',
    degree: 'Graduate Diploma in Software Engineering (GDSE)',
    summary: 'Comprehensive industry-oriented software engineering curriculum covering Java, enterprise frameworks, relational databases, and full-stack software development.',
  },
];

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">{eyebrow}</span>
      <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
    </div>
  );
}

// EXPERIENCE & EDUCATION SECTION
export default function Experience() {
  return (
    <section id="experience" className="border-b border-white/10 bg-black py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">

          {/* Professional Experience */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Career Progression" title="Professional Experience" />

            <div className="space-y-5">
              {jobs.map((job) => (
                <article key={job.role} className={`rounded-xl border p-5 transition-colors sm:p-6 ${job.cardClass}`}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${job.badgeClass}`} aria-hidden="true">{job.initial}</span>
                      <div>
                        <h3 className="font-display text-base font-bold leading-snug text-white sm:text-lg">{job.role}</h3>
                        <p className="mt-0.5 text-sm font-medium text-slate-300">{job.company}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-slate-300 sm:text-sm">{job.period}</span>
                  </div>
                  {job.paragraphs.map((text, index) => (
                    <p key={index} className={`${index > 0 ? 'mt-2 ' : ''}text-sm leading-relaxed text-slate-300`}>{text}</p>
                  ))}
                  {job.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-400">
                      {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                  {job.location ? (
                    <p className={`mt-4 flex items-center gap-1.5 text-xs ${job.footerClass}`}><i className="ph ph-map-pin" aria-hidden="true"></i> {job.location}</p>
                  ) : (
                    <p className={`mt-4 text-xs ${job.footerClass}`}>{job.note}</p>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Academic Background" title="Education" />

            <div className="relative ml-2 space-y-9 border-l border-dashed border-white/25 pl-6 sm:pl-7">
              {education.map((item) => (
                <article key={item.school} className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-black bg-slate-400 ring-1 ring-white/50 sm:-left-[35px]" aria-hidden="true"></span>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-lg font-bold leading-snug text-white sm:text-xl">{item.school}</h3>
                    <span className="text-xs font-medium text-slate-400 sm:text-sm">{item.status}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-200 sm:text-base">{item.degree}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
