// Complete Project Data from User's Project Summaries & CV
export const projectsData = [
    {
        id: 'medadvisor',
        category: 'typescript',
        image: '/assets/medadvisor-project.jpeg',
        badge: 'Telemedicine Platform Backend',
        title: 'MedAdvisor | Telemedicine Backend',
        subtitle: 'TypeScript backend connecting doctor discovery, appointment booking, online payments, video consultations, and digital prescriptions.',
        shortSummary: 'Unifies the steps before, during, and after an online consultation into one backend. Supports both scheduled doctor slot consultations and capacity-based ticket counseling with live video and chat.',
        highlightTitle: 'Two-Stage Ticket Reservation with Row-Level Locking',
        engineeringHighlight: 'A ticket booking has two distinct stages. First, the backend reserves a ticket using a PostgreSQL transaction and a row lock (SELECT ... FOR UPDATE), which prevents competing requests from claiming the same ticket. After the Seylan Bank payment gateway confirms the booking, the backend creates the consultation record. When the patient joins the Agora video session, the backend verifies ticket ownership and payment confirmation before connecting them with an available doctor.',
        features: [
            'Doctor Discovery & Scheduling: Browse specialties, doctor profiles, verified reviews, and available slots; doctors publish availability and reschedule bookings.',
            'Two Ways to Access Care: Scheduled consultations reserve a specific doctor’s slot, while ticket-based counseling uses capacity windows to join an available doctor.',
            'Payments & Doctor Payouts: Integrated with the Seylan Bank payment gateway for checkout, tracking platform fees, discounts, doctor wallets, and withdrawal requests.',
            'Real-Time Video & Messaging: Agora powers live video calls; Socket.IO drives live chat updates, typing indicators, and read receipts with Redis caching.',
            'Digital Consultation Records: Doctors manage notes, reports, and prescription drafts, generating downloadable PDFs for prescriptions and lab orders via Puppeteer & Alibaba Cloud OSS signed URLs.',
            'Platform Operations & RBAC: Role and permission checks govern doctor verification, review moderation, FCM push reminders, and automatic cancellation of expired bookings.'
        ],
        techGroups: [
            {label: 'Backend Core', items: ['Node.js', 'TypeScript', 'Express.js']},
            {label: 'Data & Caching', items: ['PostgreSQL', 'TypeORM', 'Redis']},
            {label: 'Real-Time & Video', items: ['Socket.IO', 'Agora RTC']},
            {
                label: 'Payments & Cloud',
                items: ['Seylan Bank Gateway', 'Alibaba Cloud OSS', 'AWS SES', 'Firebase Cloud Messaging', 'Puppeteer', 'GitHub Actions', 'PM2']
            }
        ],
        cardTags: ['TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.IO', 'Agora', 'Alibaba OSS']
    },
    {
        id: 'hr-payroll',
        category: 'java',
        image: '/assets/hr-payroll-project.jpeg',
        badge: 'Enterprise ERP & HR API',
        title: 'HR & Payroll Management REST API',
        subtitle: 'Java 21 & Spring Boot backend connecting employee administration, attendance, leave, payroll, recruitment, project planning, and reporting.',
        shortSummary: 'Multi-tenant capable enterprise HR backend supporting company administrators, employees, granular permission roles, and super administrators with automated payroll calculation and PDF document generation.',
        highlightTitle: 'Cross-Module Payroll Engine & Dual-DataSource Architecture',
        engineeringHighlight: 'The payroll engine coordinates multiple domain modules—combining department schedules, company holidays, geo-fenced attendance logs, and approved leaves to compute exact working days, loss-of-pay deductions, and EPF contributions before generating monthly salaries. Uses separate MySQL data sources for primary and HR records, plus transactional compensation logic in recruitment that automatically cleans up uploaded CV files if database persistence fails.',
        features: [
            'Company Administration & Auth: Multi-branch/department setup, company branding/seals, email/phone/Google OAuth2 sign-in, OTP verification, and JWT access/refresh tokens.',
            'Employee Lifecycle & QR ID Cards: Onboarding, document management, termination workflows, and printable PDF employee ID cards with QR codes (iText & ZXing).',
            'Attendance & Geo-Fencing: Clock-in/out tracking with optional branch radius validation, manual corrections, and scheduled cron jobs for automatic absence marking.',
            'Leave Management: Full-day, half-day, and short-leave policies with automated monthly/yearly balance renewals and carryover rules.',
            'Payroll & WebSocket Confirmations: Bulk/individual salary generation, employee salary confirmation/rejection workflows streamed over WebSocket/STOMP, and branded PDF payslips.',
            'Recruitment, Projects & Dashboards: Job postings with duplicate-check CV uploads, team project/task state boards, and FCM push/SMS/Email notifications.'
        ],
        techGroups: [
            {label: 'Backend & Security', items: ['Java 21', 'Spring Boot', 'Spring MVC', 'Spring Security', 'JWT']},
            {
                label: 'Persistence & Messaging',
                items: ['Spring Data JPA', 'Dual MySQL DataSources', 'WebSocket / STOMP', 'Firebase Storage & FCM']
            },
            {label: 'Documents & Testing', items: ['iText PDF', 'ZXing QR', 'OpenAPI / Swagger UI', 'Maven', 'JUnit 5']}
        ],
        cardTags: ['Java 21', 'Spring Boot', 'Spring Security', 'MySQL', 'WebSockets', 'iText PDF', 'ZXing', 'JUnit 5']
    },
    {
        id: 'docadvisor-ai',
        category: 'python',
        image: '/assets/docadvisor-ai-project.jpeg',
        badge: 'Multilingual Healthcare AI Agent',
        title: 'DocAdvisor AI Agent',
        subtitle: 'Multilingual voice and text assistant (English, Sinhala, Tamil) for symptom triage and real-time doctor appointment booking.',
        shortSummary: 'Helps patients describe symptoms by voice or text in their preferred language, answers focused follow-up questions, identifies appropriate medical specialties, and books appointments directly via the DocAdvisor API.',
        highlightTitle: 'Decoupled LLM Triage & AES-256-GCM Encrypted State',
        engineeringHighlight: 'Separates probabilistic language understanding from deterministic booking state. Google Gemini interprets multilingual symptom descriptions, asks follow-up questions, and flags urgent-care red flags, while the FastAPI backend deterministically tracks selected doctors/slots, verifies patient JWTs, streams structured UI cards over WebSockets, and encrypts saved conversation histories using AES-256-GCM before storing in Firebase Firestore.',
        features: [
            'Multilingual Symptom Triage: Supports English, Sinhala, and Tamil via voice or text, asking context-aware follow-up questions and flagging emergency red flags.',
            'Live Doctor & Slot Discovery: Queries the DocAdvisor REST API by specialty or doctor name and filters out inactive or already-booked time slots.',
            'Confirmed Appointment Booking: Guides patients through explicit review and confirmation before submitting bookings and returning payment links.',
            'Voice & Text Pipeline: Supports browser microphone input, speech transcription, spoken audio replies, and low-latency card rendering.',
            'Encrypted Conversation History: Authenticated patients can view and delete past sessions stored with AES-256-GCM encryption in Firestore.'
        ],
        techGroups: [
            {label: 'AI & Backend', items: ['Python', 'FastAPI', 'Pydantic', 'Google Gemini', 'spaCy NLP']},
            {label: 'Real-Time & Security', items: ['WebSockets', 'JWT Verification', 'AES-256-GCM Encryption']},
            {
                label: 'Integrations & UI',
                items: ['DocAdvisor REST API', 'Firebase Firestore', 'HTML5 / CSS3 / JavaScript']
            }
        ],
        cardTags: ['Python', 'FastAPI', 'Google Gemini', 'WebSockets', 'AES-256-GCM', 'Firestore', 'NLP']
    },
    {
        id: 'gem-auction',
        category: 'go',
        image: '/assets/gem-auction-project.jpeg',
        badge: 'Real-Time Bidding & Marketplace',
        title: 'Gem Auction REST API',
        subtitle: 'High-concurrency backend auction marketplace built with Go, Gin, GORM, and PostgreSQL with real-time WebSocket bidding and livestream support.',
        shortSummary: 'Engineered a low-latency gemstone auction platform enabling buyers, sellers, and administrators to participate in live bidding rooms, manage gemstone media/certifications, and process secure payments.',
        highlightTitle: 'Concurrent Real-Time Bidding Engine in Go',
        engineeringHighlight: 'Leverages Go goroutines and WebSockets to broadcast real-time bid updates across active auction rooms with minimal latency, while utilizing GORM and PostgreSQL transactions to guarantee bid ordering, reserve price validation, and role-based access control across buyers, verified sellers, and platform administrators.',
        features: [
            'Multi-Role Marketplace Modules: Dedicated workflows and RBAC for bidders/buyers, gemstone sellers, and platform administrators.',
            'Real-Time WebSocket Bidding: Live bid placement, instant outbid notifications, and synchronized auction countdowns.',
            'Livestream Auction Integration: Supports live video streaming sessions alongside real-time bidding rooms.',
            'Payments & Media Storage: Integrated payment gateway workflows and cloud media storage for high-resolution gem imagery and laboratory certificates.'
        ],
        techGroups: [
            {label: 'Language & Framework', items: ['Go (Golang)', 'Gin Web Framework']},
            {label: 'Database & Real-Time', items: ['PostgreSQL', 'GORM', 'WebSockets']},
            {
                label: 'Security & Features',
                items: ['JWT & RBAC', 'Payment Integration', 'Livestream Support', 'Media Storage']
            }
        ],
        cardTags: ['Go (Golang)', 'Gin', 'GORM', 'PostgreSQL', 'WebSockets', 'Livestream', 'RBAC']
    }
];

