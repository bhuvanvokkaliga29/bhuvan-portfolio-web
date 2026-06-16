import { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, MessageSquare } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../portfolio.png.jpeg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageSquare,
      href: "https://wa.me/919380095587",
      glow: "hover:shadow-[0_0_20px_#25d366] hover:bg-[#25d366] hover:text-white hover:border-[#25d366]",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/webix.ai",
      glow: "hover:shadow-[0_0_20px_#e1306c] hover:bg-[#e1306c] hover:text-white hover:border-[#e1306c]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/",
      glow: "hover:shadow-[0_0_20px_#0077b5] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/bhuvanvokkaliga29",
      glow: "hover:shadow-[0_0_20px_#24292e] hover:bg-white hover:text-black hover:border-white",
    },
  ];

  const animatedWords = ["AI Specialist", "ML Engineer", "Automation Expert", "LLM Architect"];

  useEffect(() => {
    // 1. Text Roll Animation (Infinite loop)
    const words = wordsRef.current;
    if (words) {
      const items = words.children;
      const totalItems = items.length;
      
      const tl = gsap.timeline({ repeat: -1 });
      
      for (let i = 0; i < totalItems; i++) {
        tl.to(words, {
          yPercent: -25 * i,
          duration: 0.8,
          delay: 1.5,
          ease: "power3.inOut",
        });
      }
      // Reset back to 0 instantly
      tl.to(words, {
        yPercent: 0,
        duration: 0,
      });
    }

    // 2. GSAP ScrollTrigger for Parallax and Fades
    const container = containerRef.current;
    const leftText = leftRef.current;
    const rightImage = rightRef.current;

    if (container && leftText && rightImage) {
      // Create scroll-based timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: false,
        },
      });

      // Text translates up and fades out
      scrollTl.to(leftText, {
        y: -100,
        opacity: 0,
        ease: "none",
      }, 0);

      // Image translates down (parallax) and morphs (scales/fades) into Welcome background
      scrollTl.to("#hero-image-box", {
        scale: window.innerWidth >= 1024 ? 3.8 : 2.2,
        y: window.innerWidth >= 1024 ? 420 : 250,
        opacity: 0.12,
        ease: "none",
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen bg-white text-zinc-950 flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 md:px-16 overflow-hidden z-20"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Typography Content */}
        <div
          ref={leftRef}
          className="lg:col-span-7 flex flex-col justify-center text-left space-y-6"
        >
          <div className="space-y-2">
            <span className="text-sm font-black uppercase tracking-[0.25em] text-yellow-500">
              AI / ML & Automation Specialist
            </span>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7vw] font-black uppercase tracking-tighter leading-[0.95] text-zinc-900">
              Hello, I'm <br />
              <span className="text-transparent text-stroke-yellow select-none">
                Bhuvan Gowda
              </span>
            </h1>
          </div>

          {/* Vertical Word Roll Container */}
          <div className="flex items-center text-2xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
            <span className="mr-3">A Professional</span>
            <div className="h-[1.3em] overflow-hidden relative inline-block text-yellow-500 min-w-[200px]">
              <div ref={wordsRef} className="flex flex-col">
                {animatedWords.map((word) => (
                  <span key={word} className="leading-[1.3] h-[1.3em] block">
                    {word}
                  </span>
                ))}
                {/* Clone first word at the end for seamless wrapping */}
                <span className="leading-[1.3] h-[1.3em] block">
                  {animatedWords[0]}
                </span>
              </div>
            </div>
          </div>

          <p className="text-zinc-600 text-base md:text-lg max-w-xl leading-relaxed">
            Passionate AI & Machine Learning Engineer crafting intelligent agents, custom LLM pipelines, automated workflows, and premium interactive digital experiences.
          </p>

          {/* Social Icons with Platform-Specific Glow */}
          <div className="flex flex-wrap gap-4 pt-4">
            {socialLinks.map(({ name, icon: Icon, href, glow }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 transition-all duration-300 ${glow} hover:scale-105 active:scale-95`}
                title={name}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Hero Image Container */}
        <div
          ref={rightRef}
          className="lg:col-span-5 flex justify-center lg:justify-end animate-gpu"
        >
          <div id="hero-image-box" className="relative w-72 h-96 sm:w-80 sm:h-[420px] md:w-96 md:h-[480px] lg:w-[400px] lg:h-[520px] rounded-[36px] overflow-hidden shadow-2xl border border-zinc-200/50 bg-zinc-50 origin-top">
            <img
              src={heroImg}
              alt="Bhuvan Gowda Creative Hero"
              className="w-full h-full object-cover"
            />
            
            {/* Absolute badge overlay */}
            <div className="absolute bottom-6 left-6 glassmorphism-light text-white px-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Founder @ Webix.ai
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
