import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    title: "Founder",
    company: "Webix.ai",
    period: "Jan 2026 – Present",
    icon: "🧠",
    description: "Founded Webix.ai to build intelligent digital solutions, combining AI/ML with full-stack development to deliver impactful products for businesses.",
  },
  {
    title: "Web Developer",
    company: "Trust Builders",
    period: "May 2024 – Present",
    icon: "💻",
    description: "Building responsive web applications and digital experiences. Leading frontend development with React.js and modern web technologies.",
  },
  {
    title: "Software Engineer",
    company: "Vibesholic Media",
    period: "Aug 2023 – Present",
    icon: "🎬",
    description: "Full design, development, hosting, and SEO optimization of the company's official website and digital platforms.",
  },
  {
    title: "AI Intern",
    company: "Codec Technologies India",
    period: "Aug 2025 – Sep 2025",
    icon: "🤖",
    description: "Worked on AI/ML projects including model development, data processing, and deploying machine learning solutions.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">My professional journey</p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 gradient-bg opacity-30" />

            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative pl-16 cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                >
                  {/* Dot */}
                  <div className="absolute left-4 top-2 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-xs">
                    {exp.icon}
                  </div>

                  <div className="glass rounded-xl p-5 hover:neon-glow transition-shadow duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        {exp.title} <span className="text-primary">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs text-muted-foreground font-body">{exp.period}</span>
                    </div>
                    <motion.div
                      initial={false}
                      animate={{ height: expandedIndex === i ? "auto" : 0, opacity: expandedIndex === i ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                    <p className="text-xs text-primary mt-1 font-body">
                      {expandedIndex === i ? "Click to collapse" : "Click to expand"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
