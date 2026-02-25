import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import projectLoneix from "@/assets/project-loneix.jpg";
import projectSanchara from "@/assets/project-sanchara.jpg";
import projectFatigue from "@/assets/project-fatigue.jpg";
import projectFood from "@/assets/project-food.jpg";
import projectWaste from "@/assets/project-waste.jpg";

const projects = [
  {
    title: "Loneix – AI Loan Risk Intelligence",
    image: projectLoneix,
    tags: ["ML", "Random Forest", "Web App"],
    description: "End-to-end ML pipeline for loan default prediction using Random Forest, with data preprocessing, feature engineering, and a deployed web interface.",
    features: ["ML model (Random Forest)", "Loan default prediction", "End-to-end ML pipeline", "Data preprocessing + feature engineering", "Deployed web interface"],
    link: "https://loneix-ai-insights.vercel.app/",
    featured: true,
  },
  {
    title: "Sanchara Vyuha – Smart Bus Depot AI",
    image: projectSanchara,
    tags: ["YOLOv8", "LSTM", "Sustainability"],
    description: "AI-powered bus depot system with passenger detection, demand forecasting, and scheduling optimization to reduce overcrowding and emissions.",
    features: ["YOLOv8 passenger detection", "LSTM demand forecasting", "Bus scheduling optimization", "CO₂ emission reduction", "Sustainability dashboard"],
    github: "https://github.com/bhuvanvokkaliga29/Sanchara-Vyuha-depo",
    featured: true,
  },
  {
    title: "AI Fatigue Monitor",
    image: projectFatigue,
    tags: ["OpenCV", "MediaPipe", "Safety"],
    description: "Real-time fatigue detection system using eye aspect ratio, yawn detection, head tilt tracking, and voice alerts with focus score analytics.",
    features: ["Drowsiness detection (EAR)", "Yawn detection (MAR)", "Head tilt tracking", "Voice + beep alerts", "Focus score analytics"],
    link: "https://youtu.be/TU1SvzB2lVE",
    featured: true,
  },
  {
    title: "Food Wastage Reduction & Donation",
    image: projectFood,
    tags: ["Social Impact", "Full Stack"],
    description: "Connects hotels to NGOs and needy people in real-time to reduce food wastage.",
    features: ["Real-time food sharing", "Hotel → NGO → People pipeline", "Impact tracking"],
    github: "https://github.com/bhuvanvokkaliga29/Food-Wastage-Reduction---Crackthon",
  },
  {
    title: "RecyChain – Smart Waste Management",
    image: projectWaste,
    tags: ["Blockchain", "IoT", "Green Tech"],
    description: "Smart tagging and decentralized recycling credits for sustainable waste management.",
    features: ["Smart tagging", "Decentralized credits", "Recycling tracking"],
    github: "https://github.com/bhuvanvokkaliga29/Smart-Waste-Chain",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onClick={() => setModalOpen(true)}
        className={`glass rounded-xl overflow-hidden cursor-pointer group hover:neon-glow transition-all duration-300 ${
          project.featured ? "md:col-span-1" : ""
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          {project.featured && (
            <span className="absolute top-3 right-3 gradient-bg text-xs font-body font-semibold px-2 py-1 rounded text-background">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-2">{project.title}</h3>
          <p className="text-xs text-muted-foreground font-body line-clamp-2 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-primary font-body">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-2xl max-w-lg w-full p-6 neon-glow max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-heading text-lg font-bold gradient-text">{project.title}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-muted-foreground font-body mb-4">{project.description}</p>
            <h4 className="font-heading text-xs font-semibold text-foreground mb-2">Key Features</h4>
            <ul className="space-y-1 mb-4">
              {project.features.map((f) => (
                <li key={f} className="text-xs text-muted-foreground font-body flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full gradient-bg flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="gradient-bg px-4 py-2 rounded-lg text-xs font-body font-semibold flex items-center gap-1 text-background">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="glass px-4 py-2 rounded-lg text-xs font-body font-semibold flex items-center gap-1 text-foreground hover:text-primary">
                  <Github size={14} /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 section-gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">Real-world AI solutions</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com/bhuvanvokkaliga29"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-lg font-body text-sm inline-flex items-center gap-2 text-foreground hover:neon-glow transition-all"
            >
              <Github size={16} /> View All on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
