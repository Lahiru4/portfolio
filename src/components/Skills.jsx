const skillGroups = [
  {
    title: 'Programming Languages',
    caption: 'Strongly typed & high-concurrency',
    icon: 'ph-terminal-window',
    iconClass: 'bg-blue-50 text-blue-600',
    items: ['Java (Java 21)', 'Go (Golang)', 'TypeScript', 'Python', 'JavaScript (ES6+)', 'SQL'],
  },
  {
    title: 'Backend Engineering',
    caption: 'REST APIs, microservices & real-time',
    icon: 'ph-hard-drives',
    iconClass: 'bg-indigo-50 text-indigo-600',
    items: ['Spring Boot', 'Spring Security / JWT', 'Express.js', 'Gin (Go)', 'FastAPI & Pydantic', 'WebSockets / STOMP', 'Socket.IO'],
  },
  {
    title: 'Databases & Caching',
    caption: 'ACID transactions, locking & ORMs',
    icon: 'ph-database',
    iconClass: 'bg-emerald-50 text-emerald-600',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Firebase Firestore', 'Spring Data JPA', 'TypeORM', 'GORM'],
  },
  {
    title: 'Cloud & DevOps',
    caption: 'Deployment, storage & CI/CD',
    icon: 'ph-cloud-check',
    iconClass: 'bg-sky-50 text-sky-600',
    items: ['AWS (EC2, S3, Lambda, SES)', 'Google Cloud', 'Firebase (Auth, FCM, Storage)', 'Alibaba Cloud OSS', 'Docker', 'GitHub Actions & PM2', 'VPS Deployment'],
  },
  {
    title: 'Frontend, AI & Tooling',
    caption: 'UI frameworks, LLMs & document tools',
    icon: 'ph-sparkle',
    iconClass: 'bg-amber-50 text-amber-600',
    items: ['React.js', 'Tailwind CSS', 'Google Gemini API', 'spaCy NLP', 'Agora RTC', 'iText / ZXing / Puppeteer', 'Swagger / Postman'],
  },
  {
    title: 'Engineering Practices',
    caption: 'Collaboration & execution',
    icon: 'ph-users-three',
    iconClass: 'bg-purple-50 text-purple-600',
    items: ['Problem Solving', 'System Design', 'Attention to Detail', 'Project Management', 'Team Leadership', 'Quick Learner', 'Time Management'],
    plainText: true,
  },
];

// SKILLS & TECH STACK SECTION
export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-600">Technical Arsenal</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Skills & Technology Stack</h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Hands-on experience across multi-threaded backend services, relational & NoSQL databases, cloud deployments, and modern frontend interfaces.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.title} className="card-surface rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.iconClass}`}>
                  <i className={`ph-duotone ${group.icon} text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">{group.title}</h3>
                  <p className="text-xs text-slate-500">{group.caption}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className={`px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 ${group.plainText ? '' : 'font-mono '}text-xs font-medium text-slate-800`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
