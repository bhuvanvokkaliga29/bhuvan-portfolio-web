import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "hola"],
    answer: "Hey there! 👋 I'm BhuvanAI Assistant. Ask me about Bhuvan's skills, projects, experience, or how to get in touch!",
  },
  {
    keywords: ["skill", "tech", "stack", "language", "python", "react"],
    answer: "🛠️ Bhuvan is skilled in **Python, C++, JavaScript, React, Node.js, TensorFlow, PyTorch, OpenCV, YOLOv8, Flask, MongoDB, MySQL, Docker, AWS** and more!",
  },
  {
    keywords: ["project", "work", "built", "portfolio"],
    answer: "🚀 Notable projects:\n• **Loneix** – AI Loan Risk Intelligence\n• **Sanchara Vyuha** – Smart Bus Depot AI\n• **AI Fatigue Monitor** – Drowsiness detection\n• **Food Wastage Reduction** system\n• **RecyChain** – Smart Waste Management\n\nScroll up to the Projects section for details!",
  },
  {
    keywords: ["experience", "job", "intern", "company"],
    answer: "💼 Experience:\n• **Founder @ Webix.ai** (Jan 2026 – Present)\n• **Web Dev @ Trust Builders** (May 2024 – Present)\n• **Software Engineer @ Vibesholic Media** (Aug 2023 – Present)\n• **AI Intern @ Codec Technologies** (Aug–Sep 2025)",
  },
  {
    keywords: ["contact", "email", "phone", "reach", "hire", "hiring"],
    answer: "📬 Reach Bhuvan at:\n📧 hkbhuvan49@gmail.com\n📞 +91 9380095587\n💬 WhatsApp: wa.me/919380095587\n\nHe's open to freelance, collaboration & full-time roles!",
  },
  {
    keywords: ["resume", "cv"],
    answer: "📄 You can download Bhuvan's resume from the Hero section at the top of this page!",
  },
  {
    keywords: ["education", "college", "degree"],
    answer: "🎓 Bhuvan is pursuing B.E. in AI & ML at AMC Engineering College, Bengaluru.",
  },
  {
    keywords: ["achievement", "hackathon", "award"],
    answer: "🏆 1st Runner-Up at **IoTopia National Hackathon 2025** held at REVA University with Team Trust Builders!",
  },
  {
    keywords: ["webix", "founder", "startup"],
    answer: "🌐 Bhuvan is the **Founder of Webix.ai**, building intelligent AI solutions for real-world problems.",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
  return "🤔 I'm not sure about that. Try asking about Bhuvan's **skills**, **projects**, **experience**, or **contact info**!";
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! 👋 I'm **BhuvanAI Assistant**. Ask me anything about Bhuvan's skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg neon-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chatbot"
      >
        {open ? <X size={22} className="text-background" /> : <MessageCircle size={22} className="text-background" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] glass rounded-2xl border border-border flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="gradient-bg px-4 py-3 flex items-center gap-2">
              <span className="text-background font-heading font-bold text-sm">BhuvanAI Assistant 🤖</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[280px] max-h-[340px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs font-body leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "gradient-bg text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-xs font-body text-foreground border border-border focus:border-primary focus:outline-none"
              />
              <button
                onClick={send}
                className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center"
                aria-label="Send message"
              >
                <Send size={14} className="text-background" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
