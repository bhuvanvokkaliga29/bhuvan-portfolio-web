import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, ExternalLink } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

interface KnowledgeItem {
  keywords: string[];
  answer: string;
}

const structuredKnowledge: KnowledgeItem[] = [
  {
    keywords: ["hello", "hi", "hey", "hola", "greetings", "start"],
    answer:
      "👋 Hello! I am **Bhuvan's Digital Assistant**.\n\nI can answer questions regarding his **AI/ML & Agentic AI expertise**, **flagship projects** (AML Mule Detection, Sanchara Vyuha, PhishAI Guard), **hackathon achievements**, **leadership**, and **why he is excited about Wispr Flow's Growth Team**.\n\nFeel free to type a question or click any suggestion below!",
  },
  {
    keywords: ["who", "bhuvan", "about", "bio", "intro", "summary"],
    answer:
      "👤 **Bhuvan Gowda H K** is an AI/ML Engineer and Software Developer specializing in Machine Learning, Deep Learning, Agentic AI, Computer Vision, and full-stack software development.\n\n• **Education:** B.E. in Computer Science & Engineering (AI & ML) at AMC Engineering College, Bengaluru (2023–2027)\n• **Hands-On Experience:** 20+ real-world AI projects and 10+ national-level hackathons\n• **Leadership:** Developer Club Lead (300+ members) & Academics President (Dept. of CSE AI & ML)\n• **Industry Work:** Software Developer (Freelance) at Vibesholic Media (https://vibesholicmedia.com) (Aug 2025 – Present)\n• **Hackathons:** 1st Runner-Up at IoTopia National Hackathon 2025; Top Leaderboard in RBIH × IIT Delhi Fraud Prevention Challenge 2026.",
  },
  {
    keywords: ["project", "projects", "work", "built", "portfolio", "showcase"],
    answer:
      "🚀 **Featured Projects by Bhuvan**:\n\n1. **AML Mule Account Detection System** (RBIH × IIT Delhi 2026)\n   • 130+ behavioural, graph & transactional features\n   • **0.9819 AUC-ROC (Public)** / 0.9813 (Private) & 0.8247 F1 Score\n   • OOF-safe graph feature engineering & SHAP explainability\n\n2. **Sanchara Vyuha – Smart Bus Depot AI** (1st Runner-Up, IoTopia 2025)\n   • YOLOv8 passenger counting + LSTM demand forecasting\n   • Google Cloud live telemetry + dispatch & carbon emission tracking\n\n3. **PhishAI Guard – Multi-Agent Fraud Defense**\n   • 6-agent cooperative architecture (Agentic AI)\n   • Typosquatting, Shannon entropy, and DKIM/SPF/DMARC verification\n\n4. **AI Fatigue Monitoring System**\n   • Real-time driver drowsiness detection via OpenCV & EAR/MAR landmarks\n   • 95% accuracy with automated voice alerts\n\n5. **Loneix – AI Loan Risk Intelligence**\n   • End-to-end ML default prediction pipeline deployed to the web.",
  },
  {
    keywords: ["aml", "mule", "fraud", "rbih", "iit delhi"],
    answer:
      "🏦 **AML Mule Account Detection System**\n• **Challenge:** RBIH × IIT Delhi National Fraud Prevention Challenge 2026\n• **Architecture:** OOF-safe graph feature engineering, transactional temporal aggregations, XGBoost, LightGBM, and SHAP explainability.\n• **Metrics:** AUC-ROC of **0.9819 (Public)** / **0.9813 (Private)** and F1 Score of **0.8247 (Public)** / **0.8151 (Private)** on the national leaderboard.",
  },
  {
    keywords: ["sanchara", "vyuha", "bus", "iotopia", "depot"],
    answer:
      "🚌 **Sanchara Vyuha — AI Smart Bus Depot Management System**\n• **Award:** 🥈 1st Runner-Up at IoTopia National Hackathon 2025 (REVA University)\n• **Tech Stack:** YOLOv8 computer vision for passenger counts, LSTM for peak-hour surge forecasting, Google Cloud Platform live pipelines, and automated fleet dispatching with carbon tracking.",
  },
  {
    keywords: ["phish", "phishai", "agent", "agentic", "multi-agent", "cybersecurity"],
    answer:
      "🛡️ **PhishAI Guard — AI-Powered Phishing & Fraud Detection**\n• **Architecture:** 6-agent multi-agent architecture (Agentic AI) analyzing threats across email, URL, and transactional vectors.\n• **Methods:** Typosquatting detection, Shannon entropy analysis, DKIM/SPF/DMARC cryptographic validation, and weighted ensemble risk classification.",
  },
  {
    keywords: ["fatigue", "drowsiness", "driver", "ear", "mar", "opencv"],
    answer:
      "🚗 **AI Fatigue Monitoring System**\n• Real-time driver drowsiness and posture monitoring system.\n• Utilizes OpenCV facial landmark regression: Eye Aspect Ratio (EAR) for blink rate and Mouth Aspect Ratio (MAR) for yawn detection.\n• Delivers **95% detection accuracy** with automated voice warnings.",
  },
  {
    keywords: ["skill", "skills", "tech", "stack", "language", "python", "ml", "tools"],
    answer:
      "🛠️ **Technical Skills Overview**:\n\n• **Programming:** Python, C++, JavaScript, SQL, LaTeX\n• **AI/ML & Agentic AI:** Agentic AI, Multi-Agent Systems, Transformers, LLMs, PyTorch, TensorFlow, Scikit-learn, XGBoost, LightGBM, NLP\n• **Computer Vision:** OpenCV, YOLOv8, Object Detection, EAR/MAR Landmark Analysis\n• **Software Development:** React.js, Node.js, Express.js, Flask, REST APIs, DSA, OOP, Testing, Debugging & Validation\n• **Databases, Cloud & DevOps:** MySQL, MongoDB, AWS, Google Cloud Platform, Docker, Git, GitHub, CI/CD Fundamentals, Linux",
  },
  {
    keywords: ["hackathon", "achievement", "award", "awards", "competition", "winner"],
    answer:
      "🏆 **Key Achievements & Hackathons**:\n\n• 🥈 **1st Runner-Up** — IoTopia National Hackathon 2025 (REVA University) with Sanchara Vyuha\n• 📊 **Top National Leaderboard** — RBIH × IIT Delhi National Fraud Prevention Challenge 2026 (0.9819 AUC-ROC)\n• 🎯 **Finalist** — Tata Foundation Hackathon\n• 🚀 **10+ National Hackathons** attended across premier institutes (NIT Trichy, IIIT Bangalore)\n• 🔐 **CTF Participant** — Triada CTF '26 & PBCTF at Paytm office\n• 🌐 **Open-source contributor** across AI, cybersecurity, and developer utilities.",
  },
  {
    keywords: ["experience", "job", "career", "work experience", "vibesholic", "freelance"],
    answer:
      "💼 **Professional Experience**:\n\n1. **Software Developer (Freelance) — Vibesholic Media** (https://vibesholicmedia.com) (Aug 2025 – Present)\n   • Developing and maintaining the official company website.\n   • Engineering new UI features and performance improvements using React.js and Node.js.\n   • Managing deployment pipelines, bug validation, and reliability.\n\n2. **Lead, Developer Club | Academics President** — Dept. of CSE (AI & ML), AMC EC (2024 – Present)\n   • Leading 300+ member developer community, organizing hackathons, tech workshops, and student mentorship.",
  },
  {
    keywords: ["leadership", "club", "lead", "community", "president", "students"],
    answer:
      "👥 **Leadership & Community Impact**:\n\n• **Developer Club Lead (300+ Members):** Mentors student developers, organizes code sprints and hackathons, and manages core student teams.\n• **Academics President, Dept. of CSE (AI & ML):** Bridges communication between faculty and students on curriculum, exam logistics, and technical initiatives.",
  },
  {
    keywords: ["certification", "certifications", "certificate", "claude", "mcp", "ey", "deloitte", "aws"],
    answer:
      "📜 **Verified Certifications**:\n\n• Anthropic Claude & Model Context Protocol (MCP) Developer Certification\n• EY Technology Risk Virtual Job Simulation\n• Deloitte Data Analytics & Forensic Technology Virtual Experience\n• AWS Machine Learning & AI Fundamentals\n• IBM AI Fundamentals\n• Python & MySQL Programming",
  },
  {
    keywords: ["wispr", "wispr flow", "voice", "challenge", "hiring"],
    answer:
      "🎙️ **Why Bhuvan is Excited About Wispr Flow**:\n\n• **Voice as High-Bandwidth Interface:** Keyboards create cognitive bottlenecks. Voice dictation lets developers express architectural intent and ideas at the speed of thought.\n• **Accelerating AI Coding Tools:** By combining Wispr Flow's fast, accurate voice dictation with modern AI coding environments, Bhuvan experienced a 3x speedup in designing, testing, and shipping features.\n• **Natural Workflow Evolution:** Voice isn't just a gimmick—it's the friction-free interaction layer for the next decade of software engineering.",
  },
  {
    keywords: ["growth", "growth team", "hire", "recruiter", "why hire", "contribute"],
    answer:
      "📈 **How Bhuvan Contributes to Wispr Flow's Growth Team**:\n\n1. **High-Speed Technical Execution:** Able to prototype, test, and ship full-stack web and AI features rapidly without waiting for handoffs.\n2. **Community Building & Developer Evangelism:** Experienced in rallying 300+ developers, creating technical content, and running hackathons.\n3. **Product & Metric Orientation:** Driven by measurable metrics (e.g. 0.9819 AUC-ROC, 95% accuracy, user retention) rather than vanity outputs.\n4. **Authentic Voice Advocate:** Actively uses voice-first workflows to build real software and can communicate that value credibly to prospective users and developers.",
  },
  {
    keywords: ["github", "code", "repo", "repositories", "open source"],
    answer:
      "💻 **GitHub Repositories**:\nCheck out Bhuvan's open-source projects and code at:\n🔗 **[github.com/bhuvanvokkaliga29](https://github.com/bhuvanvokkaliga29)**\nKey repositories include `Sanchara-Vyuha-depo`, fraud detection pipelines, and full-stack web applications.",
  },
  {
    keywords: ["contact", "email", "phone", "whatsapp", "linkedin", "reach", "hire bhuvan"],
    answer:
      "📬 **Contact Information**:\n\n• **Email:** hkbhuvan49@gmail.com\n• **WhatsApp / Mobile:** +91 9380095587 ([wa.me/919380095587](https://wa.me/919380095587))\n• **LinkedIn:** [linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318](https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/)\n• **GitHub:** [github.com/bhuvanvokkaliga29](https://github.com/bhuvanvokkaliga29)\n\nAvailable for AI/ML engineering, software development, and growth-oriented roles!",
  },
  {
    keywords: ["education", "college", "degree", "cgpa", "marks"],
    answer:
      "🎓 **Academic Details**:\n• **Degree:** B.E. in Computer Science & Engineering (AI & ML)\n• **College:** AMC Engineering College, Bengaluru (VTU affiliated)\n• **Duration:** 2023 – 2027\n• Focused on practical application, hackathons, and real-world system architecture.",
  },
];

const suggestedChips = [
  "Who is Bhuvan?",
  "Featured Projects",
  "Why Wispr Flow?",
  "Growth Team Fit",
  "Hackathon Wins",
  "Contact Info",
];

function getStructuredResponse(input: string): string {
  const clean = input.toLowerCase().trim();
  if (!clean) return "Please ask a question about Bhuvan's work, projects, or background!";

  for (const item of structuredKnowledge) {
    if (item.keywords.some((kw) => clean.includes(kw))) {
      return item.answer;
    }
  }

  return (
    "🤔 I don't have verified information on that specific query.\n\n" +
    "You can ask me about:\n" +
    "• Bhuvan's **flagship projects** (AML Mule Detection, Sanchara Vyuha, PhishAI Guard)\n" +
    "• His **technical skills** & **certifications**\n" +
    "• His **leadership** of the 300+ member Developer Club\n" +
    "• **Why he is excited about Wispr Flow** & the Growth Team\n" +
    "• His **contact details** and GitHub!"
  );
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Hi! I'm **Bhuvan's AI Assistant**.\n\nAsk me about Bhuvan's **AI/ML projects**, **hackathons**, **leadership**, or **why he's building with Wispr Flow**!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendQuery = (userQuery: string) => {
    const trimmed = userQuery.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    // Simulate realistic interactive latency
    setTimeout(() => {
      const botReply = getStructuredResponse(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center shadow-2xl hover:bg-yellow-300 transition-colors border-2 border-zinc-950/20"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
        title="Chat with Bhuvan's AI Assistant"
      >
        {open ? <X size={22} className="text-zinc-950" /> : <MessageCircle size={24} className="text-zinc-950" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] max-h-[540px] bg-zinc-950/95 backdrop-blur-2xl rounded-3xl border border-zinc-800 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white"
          >
            {/* Header */}
            <div className="bg-zinc-900/90 px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-zinc-950 font-black text-xs">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    BhuvanAI Assistant
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-medium">
                    Wispr Flow Challenge Candidate Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[260px] max-h-[320px] text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line shadow-sm ${msg.role === "user"
                        ? "bg-yellow-400 text-zinc-950 font-semibold"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-200"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendQuery(chip)}
                  disabled={isTyping}
                  className="whitespace-nowrap bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-[10px] text-zinc-300 hover:text-yellow-400 font-semibold px-2.5 py-1 rounded-full border border-zinc-700/60 transition-all flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendQuery(input)}
                placeholder="Ask about projects, Wispr Flow, skills..."
                className="flex-1 bg-zinc-900 rounded-xl px-3.5 py-2.5 text-xs text-white border border-zinc-800 focus:border-yellow-400/80 focus:outline-none placeholder-zinc-500 transition-colors"
              />
              <button
                onClick={() => handleSendQuery(input)}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
