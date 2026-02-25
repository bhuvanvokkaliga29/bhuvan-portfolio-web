import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 section-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">The story so far...</p>

          <div className="glass rounded-2xl p-8 md:p-12 neon-glow space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>
              It all started with a spark of curiosity — what if machines could think, see, and understand?
              That question led me deep into the world of <span className="text-primary font-semibold">Artificial Intelligence & Machine Learning</span> during
              my engineering journey at AMC Engineering College, Bengaluru.
            </p>
            <p>
              What began as fascination quickly became obsession. I dove into deep learning architectures,
              trained computer vision models to detect real-world objects, built NLP pipelines that understand language,
              and developed full-stack applications that bring AI to production.
            </p>
            <p>
              With <span className="text-secondary font-semibold">20+ real-world projects</span> under my belt — from
              AI-powered loan risk prediction to smart bus depot optimization — I've learned that the best technology
              is the one that solves real problems for real people.
            </p>
            <p>
              That belief led me to found <span className="text-primary font-semibold">Webix.ai</span>, where we build
              intelligent digital solutions. My goal? To work at the intersection of AI and product engineering —
              whether at a top tech company like Google, Microsoft, or Amazon, or at an impactful startup pushing boundaries.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              {["AI/ML", "Deep Learning", "Computer Vision", "NLP", "Full-Stack", "LLMs", "Generative AI"].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-accent text-primary font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
