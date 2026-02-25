import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Rocket, FileText, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const roles = [
  "AI Engineer",
  "LLM Developer",
  "Computer Vision Engineer",
  "Full Stack Developer",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.substring(0, text.length + 1));
          if (text.length + 1 === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setText(currentRole.substring(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const stats = [
    "20+ Real-World Projects",
    "1st Runner-Up National Hackathon",
    "Founder @ Webix.ai",
    "AI/ML + Full Stack Engineer",
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4"
          >
            Welcome to my universe
          </motion.p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold mb-4 leading-tight">
            <span className="gradient-text">Bhuvan Gowda</span>
            <br />
            <span className="text-foreground text-3xl sm:text-4xl md:text-5xl">H K</span>
          </h1>

          <div className="h-10 md:h-12 mb-6 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-display text-secondary">
              {text}
            </span>
            <span className="ml-1 w-0.5 h-6 md:h-8 bg-secondary animate-pulse" />
          </div>

          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
            "Building intelligent AI systems that solve real-world problems and create sustainable impact."
          </p>

          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-full px-4 py-2 text-xs md:text-sm font-body text-foreground neon-glow"
              >
                ✔ {stat}
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="#projects"
              className="gradient-bg px-6 py-3 rounded-lg font-body font-semibold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity text-background"
            >
              <Rocket size={16} /> View Projects
            </a>
            <a
              href="#contact"
              className="glass px-6 py-3 rounded-lg font-body font-semibold text-sm flex items-center gap-2 hover:bg-muted/50 transition-colors text-foreground neon-glow"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-4">
            {[
              { icon: Github, href: "https://github.com/bhuvanvokkaliga29" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/" },
              { icon: Instagram, href: "https://www.instagram.com/webix.ai" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:neon-glow transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
