import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Portfolio Contact*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email)}%0A*Message:* ${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/919380095587?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">Let's build something amazing together</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 neon-glow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <Phone size={16} className="text-background" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Phone</p>
                    <a href="tel:9380095587" className="text-sm font-body text-foreground hover:text-primary transition-colors">
                      +91 9380095587
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                    <Mail size={16} className="text-background" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-body">Email</p>
                    <a href="mailto:hkbhuvan49@gmail.com" className="text-sm font-body text-foreground hover:text-primary transition-colors">
                      hkbhuvan49@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919380095587"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 flex items-center gap-3 hover:neon-glow transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <MessageCircle size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-body text-foreground font-semibold">WhatsApp Quick Chat</p>
                  <p className="text-xs text-muted-foreground font-body">Available for freelance & collaboration</p>
                </div>
              </a>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-body block mb-1">Name</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm font-body text-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-body block mb-1">Email</label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm font-body text-foreground border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-body block mb-1">Message</label>
                <textarea
                  required
                  maxLength={1000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm font-body text-foreground border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-bg py-3 rounded-lg font-body font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-background"
              >
                <Send size={14} /> Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
