import { container, SectionLabel } from './ui.jsx';

const jobs = [
  {
    role: 'Associate Software Engineer',
    company: 'Boswin Group (Private) Limited',
    period: 'May 2025 – Present',
    start: '2025-05',
    focus: 'Backend platforms · Healthcare, HR & marketplaces',
    paragraphs: ['Architecting and maintaining production backend platforms across healthcare telemedicine, enterprise HR & payroll, and real-time marketplaces.'],
    bullets: [
      'Implementing transactional booking workflows, role-based access control (RBAC), payment gateway integrations, and real-time WebSocket/Socket.IO communication layers.',
      'Managing cloud services and storage pipelines across AWS, Google Cloud, Firebase, and VPS environments.',
    ],
    location: 'Kollupitiya, Colombo',
  },
  {
    role: 'Software Engineering Intern',
    company: 'Boswin Group (Private) Limited',
    period: 'Nov 2024 – Apr 2025',
    start: '2024-11',
    end: '2025-04',
    focus: 'REST APIs · Spring Boot, Node.js & Python',
    paragraphs: [
      'Completed intensive full-stack and backend engineering training while contributing to core REST API modules in Spring Boot, Node.js, and Python.',
      'Collaborated on database schema design, JWT authentication flows, automated PDF generation (payslips, QR ID cards, prescriptions), and API documentation via Swagger/OpenAPI.',
    ],
    location: 'Kollupitiya, Colombo',
  },
  {
    role: 'IT Assistant',
    company: 'Softlogic Holdings PLC',
    period: '2021',
    focus: 'IT operations support',
    paragraphs: ['Provided foundational IT operations support, system troubleshooting, and hardware/software assistance in an enterprise environment.'],
    note: 'Post O/L Industry Exposure',
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

// Software engineering experience is counted from the start of the internship.
const CAREER_START = '2024-11';

// Inclusive month count between two "YYYY-MM" values; a missing end means the current month.
function monthsBetween(start, end) {
  const now = new Date();
  const [startYear, startMonth] = start.split('-').map(Number);
  const [endYear, endMonth] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
}

function formatDuration(months) {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} month${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}

// One expandable table row: a summary line that inverts on hover, details below.
function Row({ when, sub, title, detail, defaultOpen = false, children }) {
  return (
    <details open={defaultOpen} className="group/item border-b border-line">
      <summary className="group/row grid list-none grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-1 py-5 transition-colors hover:bg-invert hover:text-invert-fg sm:px-4 md:grid-cols-12">
        <div className="col-start-1 md:col-span-2 md:col-start-auto">
          <p className="text-sm">{when}</p>
          {sub && <p className="text-xs text-muted group-hover/row:text-invert-fg/70">{sub}</p>}
        </div>
        <p className="col-start-1 text-sm md:col-span-4 md:col-start-auto">{title}</p>
        <p className="col-start-1 font-mono text-sm md:col-span-5 md:col-start-auto">{detail}</p>
        <span className="col-start-2 row-span-3 row-start-1 flex justify-end md:col-span-1 md:col-start-auto md:row-span-1 md:row-start-auto" aria-hidden="true">
          <i className="ph ph-plus text-lg transition-transform group-open/item:rotate-45"></i>
        </span>
      </summary>
      <div className="px-1 pb-6 pt-1 sm:px-4 md:grid md:grid-cols-12 md:gap-x-4">
        <div className="space-y-2 text-sm leading-relaxed text-muted md:col-span-9 md:col-start-3">{children}</div>
      </div>
    </details>
  );
}

// EXPERIENCE & EDUCATION SECTION
export default function Experience() {
  const totalExperience = formatDuration(monthsBetween(CAREER_START));

  return (
    <section id="experience" className="py-16 sm:py-24">
      <div className={container}>
        {/* Work */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel>Experience</SectionLabel>
          <h2 className="font-mono text-6xl font-bold tracking-tighter text-fg sm:text-8xl">Work</h2>
        </div>

        <div className="border-t border-line">
          {jobs.map((job, index) => (
            <Row
              key={job.role}
              when={job.period}
              sub={job.start ? formatDuration(monthsBetween(job.start, job.end)) : job.note}
              title={job.company}
              detail={job.role}
              defaultOpen={index === 0}
            >
              <p className="font-mono text-xs text-fg">{job.focus}</p>
              {job.paragraphs.map((text) => <p key={text}>{text}</p>)}
              {job.bullets && (
                <ul className="list-disc space-y-1.5 pl-5">
                  {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
              {job.location && (
                <p className="flex items-center gap-1.5 pt-1 text-xs"><i className="ph ph-map-pin" aria-hidden="true"></i> {job.location}</p>
              )}
            </Row>
          ))}
        </div>

        <p className="mt-6 text-right text-sm text-muted">
          Software engineering experience<br />
          <em className="text-fg">{totalExperience}</em>
        </p>

        {/* Education */}
        <div className="mb-8 mt-20 flex flex-col gap-4 sm:mb-10 sm:mt-28 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel>Academic background</SectionLabel>
          <h2 className="font-mono text-4xl font-bold tracking-tighter text-fg sm:text-6xl">Education</h2>
        </div>

        <div className="border-t border-line">
          {education.map((item) => (
            <Row key={item.school} when={item.status} title={item.school} detail={item.degree}>
              <p>{item.summary}</p>
            </Row>
          ))}
        </div>
      </div>
    </section>
  );
}
