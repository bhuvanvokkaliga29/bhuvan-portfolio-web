import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy } from "lucide-react";
import fullBodyImg from "../footer.png.jpeg";

const Welcome = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const experiences = [
    { title: "Founder", company: "Webix.ai", period: "Jan 2026 – Present", description: "Building intelligent AI digital solutions for businesses." },
    { title: "Web Developer", company: "Trust Builders", period: "May 2024 – Present", description: "Leading frontend development with modern React tech." },
    { title: "Software Engineer", company: "Vibesholic Media", period: "Aug 2023 – Present", description: "Full design, hosting, and SEO optimization of official platforms." },
    { title: "AI Intern", company: "Codec Technologies India", period: "Aug 2025 – Sep 2025", description: "Worked on AI model engineering and data processing pipelines." }
  ];

  const skillCategories = [
    { title: "Programming", skills: ["Python", "C++", "JavaScript", "C"] },
    { title: "AI / ML", skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "LLMs & GenAI"] },
    { title: "Computer Vision", skills: ["YOLOv8", "OpenCV", "MediaPipe"] },
    { title: "Web Dev", skills: ["React.js", "Node.js", "Flask", "Tailwind CSS"] }
  ];

  const [isDesktop, setIsDesktop] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const bio = bioRef.current;
    const journey = journeyRef.current;
    const title = titleRef.current;

    if (!isDesktop) {
      // Clear any leftover GSAP inline styles so elements are visible on mobile
      if (bio) gsap.set(bio, { clearProps: "all" });
      if (journey) gsap.set(journey, { clearProps: "all" });
      if (title) gsap.set(title, { clearProps: "all" });
      return;
    }

    const section = sectionRef.current;
    const sticky = stickyRef.current;

    if (!section || !sticky || !title || !bio || !journey) return;

    // Pinning the screen for 200vh scroll (removed slide 3 testimonials)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: sticky,
        invalidateOnRefresh: true,
      }
    });

    // Step 1: Initial Reveal (Title fade & morph text zoom)
    tl.fromTo(title, { opacity: 0.1, scale: 0.85 }, { opacity: 0.18, scale: 1.05, duration: 1.5 });
    tl.fromTo(bio, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.5 }, "<");

    // Step 2: Transition to Slide 2 (Journey & Expertise)
    tl.to(bio, { opacity: 0, y: -60, duration: 1.5 });
    tl.to(title, { opacity: 0.03, y: -60, duration: 1.5 }, "<");
    tl.fromTo(journey, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 2 });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Reset inline styles on cleanup so mobile switch works
      if (bio) gsap.set(bio, { clearProps: "all" });
      if (journey) gsap.set(journey, { clearProps: "all" });
      if (title) gsap.set(title, { clearProps: "all" });
    };
  }, [isDesktop]);

  return (
    <div
      ref={sectionRef}
      id="about"
      className={`relative w-full bg-gradient-to-b from-zinc-50 via-zinc-100 to-white text-zinc-950 z-20 transition-all duration-500 ${
        isDesktop ? "h-[200vh]" : "h-auto py-12"
      }`}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Sticky Panel Container */}
      <div
        ref={stickyRef}
        className={`w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-16 ${
          isDesktop ? "h-screen sticky top-0 overflow-hidden" : "h-auto gap-12 relative"
        }`}
      >
        {/* Background typography watermark (WELCOME) */}
        {isDesktop && (
          <div
            ref={titleRef}
            className="absolute inset-0 flex items-center justify-center text-[28vw] font-black uppercase tracking-tighter text-zinc-800 pointer-events-none select-none opacity-15 z-0"
            style={{ transformOrigin: "top center" }}
          >
            WELCOME
          </div>
        )}

        {/* --- Slide 1: Split Screen Biography & Full Body Photo --- */}
        <div
          ref={bioRef}
          data-aos={!isDesktop ? "fade-up" : undefined}
          className={`${
            isDesktop
              ? "absolute inset-0 flex items-center justify-center max-w-7xl mx-auto px-4 z-10 w-full"
              : "relative w-full max-w-7xl mx-auto z-10 flex flex-col items-center"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center w-full">
            
            {/* Left Side: Full Body Image Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 h-[280px] sm:w-56 sm:h-[340px] md:w-80 md:h-[450px] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white bg-zinc-200">
                <img
                  src={fullBodyImg}
                  alt="Bhuvan Gowda Full Body Portrait"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Side: Biography Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
              <div>
                <span className="text-yellow-500 font-extrabold text-xs uppercase tracking-[0.25em] mb-2 block">
                  The Story So Far
                </span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                  Pursuing AI with Passion, <br />
                  Engineering with Purpose.
                </h2>
              </div>

              <div className="space-y-4 text-zinc-700 text-sm md:text-base leading-relaxed">
                <p>
                  It all started with a spark of curiosity — what if machines could think, see, learn, and automate complex tasks? That question led me deep into the world of <span className="text-zinc-950 font-extrabold underline decoration-yellow-400">Artificial Intelligence, Machine Learning & Automation</span> during my engineering journey at AMC Engineering College, Bengaluru.
                </p>
                <p>
                  Over 20+ projects, I've built deep learning models, computer vision pipelines, custom Large Language Model (LLM) agents, and intelligent automated workflows. That drive led me to found <span className="text-zinc-950 font-extrabold underline decoration-yellow-400">Webix.ai</span>, bringing advanced AI automation to real-world businesses.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* --- Slide 2: Journey & Expertise (Columnar Timeline & Skills) --- */}
        <div
          ref={journeyRef}
          data-aos={!isDesktop ? "fade-up" : undefined}
          data-aos-delay={!isDesktop ? "200" : undefined}
          className={`${
            isDesktop
              ? "absolute inset-0 w-full h-full flex flex-col justify-center items-center max-w-7xl mx-auto px-4 z-10 opacity-0 pointer-events-none"
              : "relative w-full max-w-7xl mx-auto z-10 flex flex-col items-center opacity-100 pointer-events-auto"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 w-full items-start">
            
            {/* Column 1: Journey Timeline (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-yellow-500 font-extrabold text-xs uppercase tracking-[0.2em]">
                  Timeline
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Professional Journey
                </h3>
              </div>

              <div className="relative pl-6 border-l-2 border-zinc-200 space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-zinc-900 border-4 border-white group-hover:bg-yellow-400 transition-colors" />
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-bold text-sm text-zinc-900">{exp.title}</h4>
                        <span className="text-[10px] bg-zinc-100 text-zinc-600 font-bold px-2 py-0.5 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-yellow-600 mb-1">{exp.company}</p>
                      <p className="text-xs text-zinc-500 leading-normal">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Expertise & Achievements (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-yellow-500 font-extrabold text-xs uppercase tracking-[0.2em]">
                  Skills
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 mt-1">
                  Technical Expertise
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                    <h4 className="font-extrabold text-xs text-zinc-900 uppercase tracking-wider mb-2 border-b border-zinc-100 pb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="text-[10px] bg-zinc-100 text-zinc-700 font-semibold px-2 py-1 rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hackathon Achievement highlight */}
              <div className="bg-zinc-900 text-white p-5 rounded-2xl shadow-lg border border-zinc-800 flex items-center gap-4 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <Trophy size={20} className="text-zinc-900 animate-bounce" />
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    HACKATHON WINNER
                  </span>
                  <h4 className="font-extrabold text-sm text-white">
                    🥈 1st Runner-Up IoTopia 2025
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-normal mt-0.5">
                    National Hackathon at REVA University | Team Trust Builders
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
