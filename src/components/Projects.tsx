import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, X, Folder } from "lucide-react";

import projectLoneix from "../assets/project-loneix.jpg";
import projectSanchara from "../assets/project-sanchara.jpg";
import projectFatigue from "../assets/project-fatigue.jpg";
import projectFood from "../assets/project-food.jpg";
import projectWaste from "../assets/project-waste.jpg";

interface Project {
  title: string;
  image: string;
  tags: string[];
  description: string;
  features: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
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

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    
    if (!isDesktop) return;

    const section = sectionRef.current;
    const folderFront = folderFrontRef.current;
    const folder = folderRef.current;
    const cards = cardsContainerRef.current?.querySelectorAll(".project-card-3d");

    if (!section || !folderFront || !folder || !cards) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(folderFront, {
      rotationX: -130,
      duration: 1.5,
      ease: "power2.inOut",
    });

    tl.fromTo(
      cards,
      {
        y: 200,
        scale: 0.2,
        opacity: 0,
        rotationZ: () => gsap.utils.random(-15, 15),
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotationZ: 0,
        stagger: 0.2,
        duration: 2,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );

    tl.to(folder, {
      opacity: 0.15,
      scale: 0.8,
      y: 100,
      duration: 1.5,
    }, "-=1.5");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen bg-[#f7f6f2] text-zinc-900 py-24 px-6 md:px-16 overflow-hidden z-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f4c400] opacity-[0.08] blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center text-[22vw] font-black uppercase tracking-tighter text-zinc-400/5 select-none pointer-events-none">
        My Work
      </div>

      <div ref={containerRef} className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 z-30">
          <span className="text-[#f4c400] font-extrabold text-xs uppercase tracking-[0.2em]">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mt-1">
            Featured Projects
          </h2>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center w-full min-h-[50vh] relative">
          
          <div
            ref={folderRef}
            className="w-[480px] h-[320px] relative z-10 flex items-center justify-center pointer-events-none mb-12"
            style={{ perspective: "2000px" }}
          >
            <div className="absolute inset-0 bg-[#f4c400] rounded-b-[32px] rounded-tr-[32px] shadow-2xl flex items-end justify-center pb-6 border border-yellow-500/10">
              <div className="w-28 h-6 bg-yellow-600/20 rounded-md flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-yellow-900">
                AI / ML ARCHIVE
              </div>
            </div>

            <div
              ref={folderFrontRef}
              className="absolute inset-0 bg-yellow-500 rounded-b-[32px] border-t-2 border-yellow-400/30 shadow-2xl flex items-center justify-center"
              style={{
                transformOrigin: "bottom center",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="flex flex-col items-center gap-2 text-yellow-900/60">
                <Folder size={64} className="stroke-[1.5]" />
                <span className="text-xs font-black tracking-widest uppercase">Open Folder</span>
              </div>
            </div>
          </div>

          <div
            ref={cardsContainerRef}
            className="grid grid-cols-3 gap-8 w-full z-25 relative mt-6"
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                onClick={() => setActiveProject(project)}
                className="project-card-3d bg-white p-6 rounded-[28px] border border-zinc-200/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  <div className="h-40 rounded-2xl overflow-hidden mb-4 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-bold uppercase tracking-wider">Click to Explore</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-lg text-zinc-900 leading-snug mb-2 group-hover:text-yellow-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="w-full lg:hidden overflow-hidden relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar py-8 px-4 w-full">
            {projects.map((project, idx) => (
              <div
                key={idx}
                onClick={() => setActiveProject(project)}
                className="snap-center w-[85vw] sm:w-[50vw] bg-white p-6 rounded-[28px] border border-zinc-200/50 shadow-md flex-shrink-0 flex flex-col justify-between min-h-[380px]"
              >
                <div>
                  <div className="h-44 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-extrabold text-lg text-zinc-900 leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-black uppercase tracking-wider bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mt-4">
            Swipe left / right to browse
          </p>
        </div>

      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xl relative overflow-hidden animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900 mb-4">
              {activeProject.title}
            </h3>

            <div className="h-56 rounded-2xl overflow-hidden mb-6">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              {activeProject.description}
            </p>

            <div className="mb-6">
              <h4 className="font-extrabold text-xs text-zinc-950 uppercase tracking-wider mb-2">
                Key Features
              </h4>
              <ul className="space-y-2">
                {activeProject.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-zinc-500 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#f4c400] rounded-full mt-1.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Github size={14} /> GitHub Link
                </a>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;