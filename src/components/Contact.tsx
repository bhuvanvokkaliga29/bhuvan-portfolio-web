import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Instagram, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const socialPlatforms = [
    { name: "WhatsApp", icon: MessageSquare, url: "https://wa.me/919380095587" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/webix.ai" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/" },
    { name: "GitHub", icon: Github, url: "https://github.com/bhuvanvokkaliga29" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pin contact section so the footer slides over it
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Input Validation
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!form.message.trim()) {
      toast.error("Message is required");
      return;
    }

    // Formatted portfolio inquiry message
    const formattedText = `*New Portfolio Inquiry*%0A%0A*Name:* ${encodeURIComponent(
      form.name.trim()
    )}%0A*Email:* ${encodeURIComponent(
      form.email.trim() || "Not provided"
    )}%0A*Message:* ${encodeURIComponent(form.message.trim())}`;

    // WhatsApp integration
    const whatsappUrl = `https://wa.me/919380095587?text=${formattedText}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Opening WhatsApp to send your inquiry!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#0a0a0a] rounded-t-[40px] text-white flex flex-col justify-center items-center py-24 px-6 md:px-16 overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/5"
    >
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center text-[25vw] font-black text-white opacity-[0.02] tracking-tighter select-none pointer-events-none">
        CONNECT
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12 z-10 relative">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-[0.25em]">
            Collaboration
          </span>
          <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tight text-white leading-none mt-2">
            Let's Talk
          </h2>
        </div>

        {/* Form & Social Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 w-full items-center">
          
          {/* Left: Social links description */}
          <div className="md:col-span-5 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold uppercase tracking-wide text-zinc-300">
              Have an idea?
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              I'm open to freelance work, startup engineering roles, or just chatting about artificial intelligence. Reach out via the form, or ping me on social channels.
            </p>

            {/* Glowing social icons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {socialPlatforms.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center text-white bg-transparent hover:bg-white hover:text-black hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-500"
                  title={name}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Glassmorphism form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 w-full bg-zinc-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl space-y-5 shadow-2xl"
          >
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="What should I call you?"
                className="w-full bg-zinc-950/50 rounded-2xl px-4 py-3.5 text-sm text-white border border-white/10 focus:border-white/50 focus:outline-none transition-colors placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="How can I email you back?"
                className="w-full bg-zinc-950/50 rounded-2xl px-4 py-3.5 text-sm text-white border border-white/10 focus:border-white/50 focus:outline-none transition-colors placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                Your Message
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or inquiry..."
                className="w-full bg-zinc-950/50 rounded-2xl px-4 py-3.5 text-sm text-white border border-white/10 focus:border-white/50 focus:outline-none transition-colors resize-none placeholder-zinc-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-extrabold uppercase tracking-[0.2em] text-xs py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
            >
              <Send size={12} /> Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
