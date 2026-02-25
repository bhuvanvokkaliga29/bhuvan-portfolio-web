import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming",
    icon: "💻",
    skills: [
      { name: "Python", level: 95, tag: "Primary" },
      { name: "C++", level: 88, tag: "DSA" },
      { name: "JavaScript", level: 90, tag: "Full-Stack" },
      { name: "C", level: 82, tag: "Systems" },
    ],
  },
  {
    title: "AI / ML",
    icon: "🧠",
    skills: [
      { name: "TensorFlow", level: 92, tag: "Deep Learning" },
      { name: "PyTorch", level: 90, tag: "Research" },
      { name: "Scikit-learn", level: 93, tag: "ML Pipelines" },
      { name: "NLP / Transformers", level: 88, tag: "LLM Apps" },
      { name: "LLMs & GenAI", level: 90, tag: "Cutting Edge" },
    ],
  },
  {
    title: "Computer Vision",
    icon: "👁️",
    skills: [
      { name: "YOLOv8 / YOLOv5", level: 92, tag: "Detection" },
      { name: "OpenCV", level: 94, tag: "Core" },
      { name: "MediaPipe", level: 90, tag: "Real-time" },
      { name: "Image Classification", level: 88, tag: "CNN" },
    ],
  },
  {
    title: "Web Development",
    icon: "🌐",
    skills: [
      { name: "React.js", level: 92, tag: "Frontend" },
      { name: "Node.js / Express", level: 88, tag: "Backend" },
      { name: "Flask", level: 85, tag: "ML APIs" },
      { name: "MongoDB / MySQL", level: 86, tag: "Databases" },
      { name: "Tailwind CSS", level: 93, tag: "Styling" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "⚙️",
    skills: [
      { name: "Git / GitHub", level: 95, tag: "Version Control" },
      { name: "Docker", level: 82, tag: "DevOps" },
      { name: "AWS / GCP", level: 80, tag: "Cloud" },
      { name: "Firebase", level: 85, tag: "BaaS" },
    ],
  },
  {
    title: "Core Concepts",
    icon: "📐",
    skills: [
      { name: "Deep Learning", level: 92, tag: "Neural Nets" },
      { name: "DSA", level: 85, tag: "Problem Solving" },
      { name: "OOP", level: 90, tag: "Design" },
      { name: "CI/CD", level: 82, tag: "Automation" },
    ],
  },
];

const levelLabel = (level: number) => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  return "Proficient";
};

const SkillBar = ({ name, level, tag, delay }: { name: string; level: number; tag: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center text-xs font-body">
        <span className="text-foreground">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{tag}</span>
          <span className="text-secondary font-semibold">{levelLabel(level)}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
          className="h-full rounded-full gradient-bg"
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">Technologies I work with</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className="glass rounded-xl p-6 hover:neon-glow transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-heading text-sm font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} tag={skill.tag} delay={si} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
