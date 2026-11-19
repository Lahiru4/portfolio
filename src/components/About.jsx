import { container, DecorCircle, SectionLabel, SlashList } from './ui.jsx';

const skillGroups = [
  { title: 'Programming Languages', items: ['Java (Java 21)', 'Go (Golang)', 'TypeScript', 'Python', 'JavaScript (ES6+)', 'SQL'] },
  { title: 'Backend Engineering', items: ['Spring Boot', 'Spring Security / JWT', 'Express.js', 'NestJS', 'Gin (Go)', 'FastAPI & Pydantic', 'WebSockets / STOMP', 'Socket.IO'] },
  { title: 'Databases & Caching', items: ['PostgreSQL', 'MySQL', 'Redis', 'Firebase Firestore', 'Spring Data JPA', 'TypeORM', 'GORM'] },
  { title: 'Cloud & DevOps', items: ['AWS (EC2, S3, Lambda, SES)', 'Google Cloud', 'Firebase (Auth, FCM, Storage)', 'Alibaba Cloud OSS', 'Docker', 'GitHub Actions & PM2', 'VPS Deployment'] },
  { title: 'Frontend, AI & Tooling', items: ['React.js', 'Tailwind CSS', 'Google Gemini API', 'spaCy NLP', 'Agora RTC', 'iText / ZXing / Puppeteer', 'Swagger / Postman'] },
  { title: 'Engineering Practices', items: ['Problem Solving', 'System Design', 'Attention to Detail', 'Project Management', 'Team Leadership', 'Quick Learner', 'Time Management'] },
];

const exploringTopics = ['IoT & connected devices', 'emerging technologies', 'software–hardware integration'];

// ABOUT & SKILLS SECTION
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24">
      <DecorCircle className="-right-24 top-1/2 hidden h-[30rem] w-[30rem] lg:block" />

      <div className={`${container} relative`}>
        {/* Intro */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <SectionLabel className="lg:col-span-4 lg:pt-1">About me</SectionLabel>
          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:col-span-8">
            Hello! I’m Lahiru, an <em className="text-fg">Associate Software Engineer</em> and final-year Computer Science &
            Software Engineering undergraduate. I architect <em className="text-fg">secure REST APIs</em>, transactional data
            systems, real-time applications and cloud deployments, with a focus on reliability, security and performance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Skill cards */}
          <div id="skills" className="lg:col-span-7">
            <h2 className="sr-only">Skills & Technology Stack</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skillGroups.map((group, index) => (
                <li
                  key={group.title}
                  className={`rounded-3xl border px-5 py-4 transition-colors ${
                    index === 0 || index === skillGroups.length - 1 ? 'sm:col-span-2 ' : ''
                  }${
                    index === 0
                      ? 'border-invert bg-invert text-invert-fg'
                      : 'border-line text-fg hover:border-invert hover:bg-invert hover:text-invert-fg'
                  }`}
                >
                  <h3 className="mb-2 text-sm font-medium">{group.title}</h3>
                  <SlashList items={group.items} />
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-md text-xs leading-relaxed text-muted">
              Currently exploring how <em className="text-fg">{exploringTopics.join(', ')}</em> can bring software into the physical world.
            </p>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:mr-0">
            <img
              src="/assets/indusara-engineering-portrait.jpeg"
              alt="Illustration of a software engineer working with code, systems, and data"
              className="relative aspect-[4/5] w-full rounded-3xl border border-line bg-white object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
