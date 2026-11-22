// Project case studies, written from each project's source code, docs and the CV.
// `role` and `contribution` describe my part in each project.
export const projectsData = [
    {
        id: 'medadvisor',
        image: '/assets/medadvisor-project.jpeg',
        badge: 'Telemedicine Platform Backend',
        title: 'MedAdvisor | Telemedicine Backend',
        role: 'Backend Developer',
        year: '2025 – 2026',
        contribution: 'Developed the backend that connects doctor discovery, bookings, payments, video consultations and digital prescriptions.',
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
        image: '/assets/hr-payroll-project.jpeg',
        badge: 'Enterprise ERP & HR System',
        title: 'HR & Payroll Management System',
        role: 'Full-Stack Developer · Team Lead',
        year: '2025 – 2026',
        contribution: 'Led the development team and built across the whole stack: the Spring Boot REST API and the React + TypeScript web app for administrators and employees.',
        subtitle: 'Full-stack HR platform: a Java 21 & Spring Boot API and a React + TypeScript web app covering employees, attendance, leave, payroll, recruitment, projects, and reporting.',
        shortSummary: 'Multi-tenant capable enterprise HR system supporting company administrators, employees, granular permission roles, and super administrators with automated payroll calculation and PDF document generation.',
        highlightTitle: 'Cross-Module Payroll Engine & Dual-DataSource Architecture',
        engineeringHighlight: 'The payroll engine coordinates multiple domain modules—combining department schedules, company holidays, geo-fenced attendance logs, and approved leaves to compute exact working days, loss-of-pay deductions, and EPF contributions before generating monthly salaries. Uses separate MySQL data sources for primary and HR records, plus transactional compensation logic in recruitment that automatically cleans up uploaded CV files if database persistence fails.',
        features: [
            'Company Administration & Auth: Multi-branch/department setup, company branding/seals, email/phone/Google OAuth2 sign-in, OTP verification, and JWT access/refresh tokens.',
            'Employee Lifecycle & QR ID Cards: Onboarding, document management, termination workflows, and printable PDF employee ID cards with QR codes (iText & ZXing).',
            'Attendance & Geo-Fencing: Clock-in/out tracking with optional branch radius validation, manual corrections, and scheduled cron jobs for automatic absence marking.',
            'Leave Management: Full-day, half-day, and short-leave policies with automated monthly/yearly balance renewals and carryover rules.',
            'Payroll & WebSocket Confirmations: Bulk/individual salary generation, employee salary confirmation/rejection workflows streamed over WebSocket/STOMP, and branded PDF payslips.',
            'Recruitment, Projects & Dashboards: Job postings with duplicate-check CV uploads, team project/task state boards, and FCM push/SMS/Email notifications.',
            'React Web App: Admin and employee portals with Leaflet branch maps for geo-fences, drag-and-drop task boards, an org-chart tree, Recharts dashboards, rich-text job posts, and PDF/Excel exports.'
        ],
        techGroups: [
            {label: 'Backend & Security', items: ['Java 21', 'Spring Boot', 'Spring MVC', 'Spring Security', 'JWT']},
            {
                label: 'Persistence & Messaging',
                items: ['Spring Data JPA', 'Dual MySQL DataSources', 'WebSocket / STOMP', 'Firebase Storage & FCM']
            },
            {label: 'Documents & Testing', items: ['iText PDF', 'ZXing QR', 'OpenAPI / Swagger UI', 'Maven', 'JUnit 5']},
            {
                label: 'Frontend',
                items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Ant Design', 'Zustand', 'SockJS / STOMP', 'Leaflet', 'Recharts']
            }
        ],
        cardTags: ['Java 21', 'Spring Boot', 'Spring Security', 'MySQL', 'WebSockets', 'React', 'TypeScript', 'Tailwind CSS']
    },
    {
        id: 'foodie',
        image: null,
        // Shown in place of an image on the project card.
        snippet: [
            ['POST /user-orders', '201'],
            ['sripay ▸ payment', 'PAID'],
            ['event ▸ order desk', 'ORDER_CREATED'],
            ['NEW → ACCEPTED → PREPARING → READY', '']
        ],
        badge: 'Food Ordering & Reservations Platform',
        title: 'Foodie | Restaurant Ordering Backend',
        role: 'Backend Developer',
        year: '2026',
        contribution: 'Built the backend: customer ordering and payments, venue and outlet management, the admin portal APIs, and the realtime order alerts.',
        subtitle: 'NestJS & TypeScript backend on Firebase for food ordering, delivery, dine-in and table reservations across multi-outlet restaurant venues.',
        shortSummary: 'Customers order pickup, delivery or dine-in, book tables, pay through SriPay and follow their order live. Venue owners and staff manage menus, offers and incoming orders, while platform admins run the marketplace from a live dashboard.',
        highlightTitle: 'Exactly-Once Paid-Order Events & Realtime Order Desk',
        engineeringHighlight: 'Every path that can mark an order as paid—the confirm call, an order read, the SriPay webhook, or a 5-minute scheduled sweep—goes through one resolver. Inside a single Firestore transaction it assigns the daily order number, moves the order to NEW, and writes an ORDER_CREATED event with a deterministic id, so a retried transaction never creates a second alert. A WebSocket gateway on Cloud Run watches those events per outlet and pushes them to paired Order Desk desktop apps, replaying the last 24 hours of unhandled orders when a device reconnects.',
        features: [
            'Four Order Types: Pickup, delivery with distance-based fees, dine-in, and table reservations, with a persistent cart, packages, coupons, and multi-outlet offers.',
            'SriPay Payments & Sign-In: Checkout sessions, verified webhooks, automatic refunds when an outlet rejects an order, and sign-in from inside the SriPay Mini Program.',
            'Live Order Tracking: Server-Sent Event streams keep customers, outlet staff, and the admin dashboard current without polling, and FCM pushes cover every status change.',
            'Venue & Outlet Management: Menus, size-based item pricing, bar items, gallery photos, opening hours, and table availability search for each outlet.',
            'Roles, 2FA & Device Pairing: Venue owners and members with per-outlet permissions, two-factor login, and one-time pairing codes for Order Desk devices.',
            'Hardened API: Per-IP rate limits with stricter budgets on auth routes, security headers (HSTS, CSP, nosniff), Cloud Tasks notification queues, and Jest test coverage.'
        ],
        techGroups: [
            {label: 'Backend Core', items: ['Node.js 22', 'TypeScript', 'NestJS 11', 'class-validator']},
            {label: 'Data & Real-Time', items: ['Firebase Firestore', 'FireORM', 'Server-Sent Events', 'WebSockets']},
            {
                label: 'Cloud & Integrations',
                items: ['Firebase Cloud Functions', 'Google Cloud Run', 'Google Cloud Tasks', 'SriPay Gateway', 'Firebase Cloud Messaging', 'Docker', 'Jest']
            }
        ],
        cardTags: ['TypeScript', 'NestJS', 'Firestore', 'Cloud Functions', 'Cloud Run', 'SSE', 'WebSockets', 'SriPay']
    },
    {
        id: 'gem-auction',
        image: '/assets/gem-auction-project.jpeg',
        badge: 'Real-Time Bidding & Marketplace',
        title: 'Gem Auction REST API',
        role: 'Backend Developer',
        year: '2026',
        contribution: 'Developed the full backend in Go—every API the buyer, seller and admin apps use, from bidding and livestreams to payments, shipping and analytics.',
        subtitle: 'High-concurrency Go backend for a gemstone auction marketplace, with real-time WebSocket bidding, livestreamed auction events, payments, and international shipping.',
        shortSummary: 'A low-latency gemstone marketplace where verified sellers list stones, buyers bid live while watching the auction stream, and administrators manage approvals, orders, settlements, and refunds.',
        highlightTitle: 'Race-Free Real-Time Bidding Engine in Go',
        engineeringHighlight: 'Each bid is written inside a PostgreSQL transaction that locks the auction row (SELECT ... FOR UPDATE through GORM), so bids placed at the same moment are ordered correctly and always checked against the current highest bid, the auction status, and its end time. Once committed, the new top bid is broadcast to everyone in the auction room over WebSockets. Auto-bid plans outbid on a buyer’s behalf up to their limit, and voided transactions recalculate the top bid and notify the room.',
        features: [
            'Multi-Role Marketplace Modules: Dedicated workflows and RBAC for bidders/buyers, gemstone sellers, and platform administrators, with seller approval and storefronts.',
            'Real-Time WebSocket Bidding: Live bid placement, instant outbid notifications, auto-bid plans, bid-history charts, and synchronized auction countdowns.',
            'Livestream Auction Events: A Go WebSocket hub relays the host’s audio and video to viewers with live viewer counts alongside the bidding room.',
            'Payments, Settlements & Refunds: SriPay IPG checkout, Alipay+ and Mastercard gateway payments, settlement fees, and voids/refunds protected by an admin security passcode.',
            'Orders, Shipping & Media: FedEx shipping integration, insurance in order totals, invoice emails, and gem images and lab certificates on Alibaba Cloud OSS.',
            'Analytics & Operations: Product impression/click tracking rolled up every 5 minutes into CTR reports, PostgreSQL backup and restore, and CI with architecture and route tests.'
        ],
        techGroups: [
            {label: 'Language & Framework', items: ['Go (Golang)', 'Gin Web Framework', 'Gorilla WebSocket']},
            {label: 'Database', items: ['PostgreSQL', 'GORM']},
            {
                label: 'Integrations',
                items: ['SriPay IPG', 'Alipay+', 'Mastercard Gateway', 'FedEx API', 'Alibaba Cloud OSS', 'Google OAuth']
            },
            {label: 'Delivery', items: ['GitHub Actions', 'Nginx', 'Alibaba Cloud']}
        ],
        cardTags: ['Go (Golang)', 'Gin', 'GORM', 'PostgreSQL', 'WebSockets', 'Livestream', 'RBAC']
    },
    {
        id: 'docadvisor-ai',
        image: '/assets/docadvisor-ai-project.jpeg',
        badge: 'Multilingual Healthcare AI Agent',
        title: 'DocAdvisor AI Agent',
        role: 'AI Agent & Backend Developer',
        year: '2026',
        contribution: 'Developed the AI agent and its FastAPI backend: the Gemini triage flow, voice pipeline, booking integration, and encrypted history.',
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
        id: 'cic-agri-banana',
        // Campus projects are listed under Education, apart from the company projects carousel.
        category: 'academic',
        image: '/assets/cic-field-visit-packhouse.jpg',
        badge: 'Agri-Business Management System',
        title: 'CIC Agri Banana | Plantation Management System',
        role: 'Team Project · Developer',
        year: '2023',
        // Shown as a pill on the project card and the case study header.
        award: {
            label: "1st Place · Innovesta '23",
            title: 'Award for Innovative Software Solution',
            event: "Innovesta '23 · Institute of Software Engineering (IJSE)",
            text: 'Our team took 1st place at Innovesta ’23, the IJSE software project competition, and received the Award for Innovative Software Solution for this system.',
            image: '/assets/cic-innovesta-award.jpg',
            alt: "Glass Innovesta '23 trophy from IJSE reading Award for Innovative Software Solution, on a table at the awards ceremony"
        },
        // Real business the project was researched with, plus photos from the field visit.
        client: {
            name: 'CIC Holdings PLC',
            url: 'https://www.cic.lk/',
            text: 'CIC Holdings is a Sri Lankan conglomerate founded in 1964, working across crop solutions, agri produce, livestock, health care and industrial solutions. Its agri produce business grows bananas on 75 acres in Hingurakgoda and Pelwehera and supplies supermarkets such as Keells and Cargills. We visited CIC’s farm, walked through the plantation and pack house, and spoke with farm staff to understand how the business runs before designing the system.',
            note: 'Academic team project built around CIC’s real business scenario; not a commissioned CIC product.'
        },
        gallery: [
            {
                src: '/assets/cic-field-visit-farm-tour.jpg',
                alt: 'Students riding through the CIC farm on a tractor-drawn trailer, with coconut palms on both sides',
                caption: 'Touring the farm on the estate’s tractor trailer'
            },
            {
                src: '/assets/cic-field-visit-briefing.jpg',
                alt: 'A CIC farm officer explaining operations to a group of students in white shirts',
                caption: 'Farm staff walking us through daily operations'
            }
        ],
        contribution: 'Took part in the field research at CIC and developed the JavaFX desktop application and its MySQL database with the team.',
        subtitle: 'JavaFX desktop system for a banana plantation, built after a field visit to CIC to manage land blocks, planting, fertilizer, harvests, stock, orders and profit.',
        shortSummary: 'Our team visited CIC’s farm, studied how its banana plantation runs, and built a desktop system for that real business scenario. Managers, crop harvesters and financial officers each get their own dashboard to record field work and track harvest, stock, costs and profit. It won 1st place at IJSE Innovesta ’23.',
        highlightTitle: 'Block-Level Profit Analysis from Field to Sale',
        engineeringHighlight: 'Every record in the system is tied to a land block, just as the farm manages its plantation. When a harvest is entered, the app subtracts wastage to get the sellable harvest and stores it with the price per kg. A multi-table MySQL query then joins blocks, harvests, stock and customer orders to work out each block’s profit: sold quantity × price per kg, minus plant, fertilizer, salary and additional costs. The result is plotted as a per-block profit chart, so the manager can see which part of the plantation earns the most.',
        features: [
            'Role-Based Dashboards: Sign-up and login for three account types (Manager, Crop Harvester and Financial Officer), each opening its own dashboard.',
            'Land Block Management: Register plantation blocks with their area and field notes, and record which plants are planted in each block.',
            'Fertilizer Tracking: Log fertilizer applied to each block with amount and cost, summarised by fertilizer type.',
            'Harvest & Wastage: Record each block’s harvest, wastage and price per kg; the app calculates the sellable harvest and per-block totals.',
            'Stock & Customer Orders: Keep daily stock records and take customer orders that draw stock down, with a full order history.',
            'Charts & Profit Reports: Bar, line, pie and stacked bar charts for harvest by block, wastage, stock, expenses and per-block profit.'
        ],
        techGroups: [
            {label: 'Desktop App', items: ['Java', 'JavaFX', 'FXML', 'JavaFX CSS']},
            {label: 'UI Components', items: ['JFoenix (Material Design)', 'AnimateFX', 'JavaFX Charts']},
            {label: 'Data', items: ['MySQL', 'JDBC (MySQL Connector/J)']},
            {label: 'Research & Tools', items: ['On-site field visit', 'Requirements gathering', 'IntelliJ IDEA', 'Git']}
        ],
        cardTags: ['Java', 'JavaFX', 'JFoenix', 'MySQL', 'JDBC', 'Field Research']
    }
];

export const isAcademic = (project) => project.category === 'academic';
// Company projects, shown in the Projects carousel.
export const workProjects = projectsData.filter((project) => !isAcademic(project));
// Campus projects, shown under Education.
export const academicProjects = projectsData.filter(isAcademic);
