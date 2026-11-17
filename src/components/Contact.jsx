import { useEffect, useRef, useState } from 'react';

const suggestedPrompts = [
  { label: 'Projects', prompt: 'Tell me about your projects' },
  { label: 'Experience', prompt: 'What experience do you have?' },
  { label: 'Contact', prompt: 'How can I contact you?' },
];

// Portfolio Assistant Chat (local portfolio-guidance responses)
function getAssistantReply(message) {
  const query = message.toLowerCase();
  if (query.includes('project') || query.includes('built') || query.includes('my work') || query.includes('your work')) {
    return 'Indusara has worked on telemedicine, HR and payroll, multilingual healthcare AI, and real-time auction systems. Explore the Featured Projects section for the case studies.';
  }
  if (query.includes('experience') || query.includes('job') || query.includes('work history')) {
    return 'Indusara is an Associate Software Engineer at Boswin Group, with previous software engineering internship and IT assistant experience. See the Professional Experience section for details.';
  }
  if (query.includes('skill') || query.includes('technology') || query.includes('stack')) {
    return 'His main technologies include Java and Spring Boot, Go, TypeScript and Node.js, Python and FastAPI, plus PostgreSQL, MySQL, Redis, and cloud platforms. The Skills section has the full stack.';
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
        <p className="max-w-[88%] rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-xs">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex max-w-[88%] items-end gap-2">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center text-blue-600" aria-hidden="true"><i className="ph ph-sparkle"></i></span>
      <p className="text-sm leading-relaxed text-slate-600">{text}</p>
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
    <section className="flex min-h-[520px] flex-col" aria-labelledby="assistant-title">
      <header className="flex items-center gap-3 pb-5">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center text-blue-600">
          <i className="ph ph-sparkle text-2xl" aria-hidden="true"></i>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" aria-hidden="true"></span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 id="assistant-title" className="font-display text-xl font-bold text-slate-900">Portfolio Assistant</h3>
          <p className="text-xs text-slate-500">Ask me about my work and experience</p>
        </div>
        <span className="text-xs font-medium text-emerald-700">Ready</span>
      </header>

      <div ref={messagesRef} className="flex min-h-72 flex-1 flex-col gap-5 overflow-y-auto py-6" role="log" aria-live="polite" aria-relevant="additions">
        {messages.map((message) => <ChatMessage key={message.id} sender={message.sender} text={message.text} />)}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 py-3">
        {suggestedPrompts.map(({ label, prompt }) => (
          <button key={label} type="button" onClick={() => submitMessage(prompt)} className="border-b border-slate-200 py-1 text-xs font-medium text-slate-500 transition-colors hover:border-blue-600 hover:text-blue-600">
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitMessage(input);
        }}
        className="flex items-center gap-3 border-b border-slate-300 py-3 focus-within:border-blue-600"
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
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-slate-900 outline-hidden placeholder:text-slate-400"
        />
        <button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center text-blue-600 transition-colors hover:text-blue-800">
          <i className="ph-bold ph-paper-plane-tilt text-lg" aria-hidden="true"></i>
        </button>
      </form>
    </section>
  );
}

// CONTACT SECTION
export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left 6 Cols: Direct Contact */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-8 sm:gap-10">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-900">
                Let’s <span className="contact-outline-word">talk</span> for<br />
                Something special
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                I build scalable backend and full-stack software. Reach out to discuss a role, a project, or an idea you’d like to bring to life.
              </p>
            </div>

            <div className="space-y-2">
              <a href="mailto:lahiruindusara04@gmail.com" className="block w-fit text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-blue-600 sm:text-xl">
                lahiruindusara04@gmail.com
              </a>
              <a href="tel:+94787969637" className="block w-fit text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-blue-600 sm:text-xl">
                +94 78 796 9637
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-500">
              <a href="https://github.com/Lahiru4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-blue-600">
                <i className="ph-fill ph-github-logo text-base" aria-hidden="true"></i> GitHub
              </a>
              <a href="https://www.linkedin.com/search/results/all/?keywords=Lahiru%20Indusara%20Edirisinha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-blue-600">
                <i className="ph-fill ph-linkedin-logo text-base" aria-hidden="true"></i> LinkedIn
              </a>
            </div>
          </div>

          {/* Right 6 Cols: Portfolio Assistant Chat */}
          <div className="lg:col-span-6 no-print">
            <AssistantChat />
          </div>

        </div>
      </div>
    </section>
  );
}
