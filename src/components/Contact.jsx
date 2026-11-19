import { useEffect, useRef, useState } from 'react';
import { container, DecorCircle, OutlinePill, SectionLabel } from './ui.jsx';

const suggestedPrompts = [
  { label: 'Projects', prompt: 'Tell me about your projects' },
  { label: 'Experience', prompt: 'What experience do you have?' },
  { label: 'Contact', prompt: 'How can I contact you?' },
];

// Portfolio Assistant Chat (local portfolio-guidance responses)
function getAssistantReply(message) {
  const query = message.toLowerCase();
  if (query.includes('project') || query.includes('built') || query.includes('my work') || query.includes('your work')) {
    return 'Indusara has worked on telemedicine, HR and payroll, food ordering and reservations, multilingual healthcare AI, and real-time auction systems. Explore the Projects section for the case studies.';
  }
  if (query.includes('experience') || query.includes('job') || query.includes('work history')) {
    return 'Indusara is an Associate Software Engineer at Boswin Group, with previous software engineering internship and IT assistant experience. See the Work section for details.';
  }
  if (query.includes('skill') || query.includes('technology') || query.includes('stack')) {
    return 'His main technologies include Java and Spring Boot, Go, TypeScript with Node.js and NestJS, Python and FastAPI, plus PostgreSQL, MySQL, Redis, and cloud platforms. The About section has the full stack.';
  }
  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('reach')) {
    return 'You can reach Indusara at lahiruindusara04@gmail.com or call +94 78 796 9637. The contact links are on this page.';
  }
  return 'I can help you explore Indusara’s projects, experience, and technical skills. Try one of the suggested topics, or contact him directly at lahiruindusara04@gmail.com.';
}

function ChatMessage({ sender, text }) {
  if (sender === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[88%] rounded-2xl rounded-br-md bg-invert px-4 py-3 text-sm leading-relaxed text-invert-fg">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex max-w-[88%] items-start gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center text-fg" aria-hidden="true"><i className="ph ph-sparkle"></i></span>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function AssistantChat() {
  const [messages, setMessages] = useState([
    { id: 0, sender: 'assistant', text: 'Hi! I can help you find out about Indusara’s projects, experience, and skills. What would you like to know?' },
  ]);
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);
  const nextId = useRef(1);

  useEffect(() => {
    const log = messagesRef.current;
    if (log && messages.length > 1) log.scrollTop = log.scrollHeight;
  }, [messages]);

  const addMessage = (sender, text) => {
    const id = nextId.current++;
    setMessages((current) => [...current, { id, sender, text }]);
  };

  const submitMessage = (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    addMessage('user', trimmedMessage);
    setInput('');
    window.setTimeout(() => addMessage('assistant', getAssistantReply(trimmedMessage)), 350);
  };

  return (
    <section className="flex h-full min-h-[480px] flex-col rounded-3xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="assistant-title">
      <header className="flex items-center gap-3 border-b border-line pb-4">
        <div className="min-w-0 flex-1">
          <h3 id="assistant-title" className="font-mono text-base font-bold text-fg">Portfolio Assistant</h3>
          <p className="text-xs text-muted">Ask me about my work and experience</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"></span> Ready
        </span>
      </header>

      <div ref={messagesRef} className="flex max-h-80 min-h-60 flex-1 flex-col gap-5 overflow-y-auto py-5" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message) => <ChatMessage key={message.id} sender={message.sender} text={message.text} />)}
      </div>

      <div className="flex flex-wrap gap-2 pb-3">
        {suggestedPrompts.map(({ label, prompt }) => (
          <button key={label} type="button" onClick={() => submitMessage(prompt)} className="rounded-full border border-line px-3 py-1.5 text-xs italic text-muted transition-colors hover:border-fg hover:text-fg">
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitMessage(input);
        }}
        className="flex items-center gap-2 rounded-full border border-line py-1 pl-4 pr-1 focus-within:border-fg"
      >
        <label htmlFor="assistant-chat-input" className="sr-only">Message the portfolio assistant</label>
        <input
          id="assistant-chat-input"
          type="text"
          autoComplete="off"
          required
          placeholder="Ask me anything..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-fg outline-hidden placeholder:text-faint"
        />
        <button type="submit" aria-label="Send message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-invert text-invert-fg transition-opacity hover:opacity-85">
          <i className="ph-bold ph-arrow-up text-base" aria-hidden="true"></i>
        </button>
      </form>
    </section>
  );
}

// CONTACT SECTION
export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <DecorCircle className="-bottom-56 -left-64 hidden h-[30rem] w-[30rem] lg:block" />

      <div className={`${container} relative`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Direct contact */}
          <div className="flex flex-col justify-center gap-8 lg:col-span-6">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-4 font-mono text-5xl font-bold leading-none tracking-tighter text-fg sm:text-7xl">
                Let’s talk
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                I build scalable backend and full-stack software. Reach out to discuss <em className="text-fg">a role, a project, or an idea</em> you’d like to bring to life.
              </p>
            </div>

            <div className="space-y-1">
              <a href="mailto:lahiruindusara04@gmail.com" className="block w-fit break-all font-mono text-lg font-medium text-fg underline-offset-4 hover:underline sm:text-xl">
                lahiruindusara04@gmail.com
              </a>
              <a href="tel:+94787969637" className="block w-fit font-mono text-lg font-medium text-fg underline-offset-4 hover:underline sm:text-xl">
                +94 78 796 9637
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              <OutlinePill href="https://github.com/Lahiru4" icon="ph-fill ph-github-logo" external>GitHub</OutlinePill>
              <OutlinePill href="https://www.linkedin.com/search/results/all/?keywords=Lahiru%20Indusara%20Edirisinha" icon="ph-fill ph-linkedin-logo" external>LinkedIn</OutlinePill>
            </div>
          </div>

          {/* Portfolio Assistant Chat */}
          <div className="lg:col-span-6 no-print">
            <AssistantChat />
          </div>
        </div>
      </div>
    </section>
  );
}
