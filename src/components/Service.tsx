import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Shield, ShoppingCart, Layers, User, RefreshCw, Brain } from "lucide-react";

interface ServiceCard {
  title: string;
  tag: string;
  color: string;
  description: string;
  icon: any;
}

const Service = () => {
  const [activeColor, setActiveColor] = useState("#27272a"); // Default deep gray

  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const services: ServiceCard[] = [
    {
      title: "AI Automation & Data Engineering",
      tag: "AI & Data",
      color: "#1e1b4b", // Darker indigo/navy
      description: "Building automated workflows, intelligent agents, custom LLM pipelines, and scalable data architectures.",
      icon: Brain,
    },
    {
      title: "Business Website",
      tag: "Corporate",
      color: "#2e3f10", // Darker olive green
      description: "Corporate websites optimized for conversion and premium branding.",
      icon: Shield,
    },
    {
      title: "Admin Dashboard",
      tag: "SaaS",
      color: "#802300", // Darker orange-red
      description: "Advanced dashboards with analytics and data visualization.",
      icon: Monitor,
    },
    {
      title: "E-Commerce Store",
      tag: "Retail",
      color: "#050540", // Darker navy blue
      description: "Luxury online shopping experiences with seamless checkout.",
      icon: ShoppingCart,
    },
    {
      title: "Full Stack Web App",
      tag: "App",
      color: "#6b0000", // Darker crimson red
      description: "Scalable web applications with powerful backend systems.",
      icon: Layers,
    },
    {
      title: "Portfolio Website",
      tag: "Creative",
      color: "#6b5600", // Darker yellow-gold
      description: "High-end portfolio experiences for creators and agencies.",
      icon: User,
    },
    {
      title: "Website Redesign",
      tag: "Design",
      color: "#1c1c1e", // Deep zinc gray
      description: "Modern redesigns with immersive animations and premium UI.",
      icon: RefreshCw,
    },
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
    if (!isDesktop) return;

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !sticky || !cardsContainer) return;

    const cardElements = cardsContainer.querySelectorAll(".service-card-3d");
    const totalCards = cardElements.length;
    const spacingAngle = 0.35; // Angle gap between cards in radians (~20 deg)
    const radius = 700; // Radius of curvature

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentPosition = progress * (totalCards - 1);
          let closestIndex = 0;
          let minDiff = Infinity;

          cardElements.forEach((el, idx) => {
            const card = el as HTMLDivElement;
            const offset = idx - currentPosition;
            const angle = offset * spacingAngle;

            // Mathematical 3D curved half-circle calculations
            const x = Math.sin(angle) * radius;
            const y = radius - Math.cos(angle) * radius + 110;
            const z = -Math.abs(offset) * 80;

            const scale = 1 - Math.abs(offset) * 0.15;
            const opacity = 1 - Math.abs(offset) * 0.35;
            const rotZ = angle * (180 / Math.PI); // Follow curve angle

            // Update DOM directly for max scroll performance
            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: Math.max(0.2, scale),
              opacity: Math.max(0, opacity),
              rotationZ: rotZ,
              transformOrigin: "center center",
            });

            // Find closest card to active slot (center)
            const diff = Math.abs(offset);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = idx;
            }
          });

          // Set background color of closest card
          setActiveColor(services[closestIndex].color);
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDesktop]);

  // Mobile layout background switcher helper
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth <= 0) return;

    const progress = container.scrollLeft / scrollWidth;
    const idx = Math.min(
      services.length - 1,
      Math.max(0, Math.round(progress * (services.length - 1)))
    );
    setActiveColor(services[idx].color);
  };

  return (
    <section
      ref={sectionRef}
      id="service"
      className={`relative w-full transition-colors duration-1000 z-20 ${
        isDesktop ? "h-[600vh] overflow-hidden" : "h-auto py-12"
      }`}
      style={{ backgroundColor: activeColor }}
    >
      {/* Sticky Fullscreen Section */}
      <div
        ref={stickyRef}
        className={`w-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-16 ${
          isDesktop ? "h-screen sticky top-0 overflow-hidden" : "h-auto min-h-[80vh] relative"
        }`}
      >
        {/* Outlined Background typography watermark */}
        <h2 className="absolute inset-0 flex items-center justify-center text-[18vw] font-black uppercase tracking-tighter text-white/5 select-none pointer-events-none leading-none z-0">
          SERVICES
        </h2>

        {/* Title */}
        <div className={`text-center z-30 ${
          isDesktop ? "absolute top-24" : "relative pt-8 mb-6"
        }`}>
          <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-[0.2em]">
            What I Offer
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mt-1">
            My Services
          </h3>
        </div>

        {/* --- DESKTOP 3D CURVED CAROUSEL (Absolute Stack) --- */}
        <div
          ref={cardsContainerRef}
          className="hidden lg:flex items-center justify-center w-full h-[600px] relative z-10 mt-24"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          {services.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="service-card-3d absolute w-[380px] h-[450px] rounded-[36px] bg-zinc-950/40 border border-white/10 backdrop-blur-2xl p-8 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.5)] group overflow-hidden transition-shadow duration-300"
              >
                {/* Diagonal Gloss overlay highlight */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="space-y-6">
                  {/* Icon & Category Tag */}
                  <div className="flex justify-between items-center">
                    <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <IconComponent size={28} className="group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-yellow-400">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="border-t border-white/10 pt-6 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-400">
                  <span>Immersive UX</span>
                  <span className="text-yellow-400 flex items-center gap-1">
                    Get Quote <span className="text-sm font-light">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- MOBILE SNAP SLIDER (Swipe layout) --- */}
        <div
          onScroll={handleMobileScroll}
          className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar py-6 px-4 w-full z-10 relative"
        >
          {services.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="snap-center w-[80vw] h-[380px] rounded-[30px] bg-zinc-950/50 border border-white/10 backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl flex-shrink-0"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                      <IconComponent size={24} />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-yellow-400">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-zinc-400">
                  <span>Immersive UX</span>
                  <span className="text-yellow-400">Swipe →</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator for desktop */}
        <div className="hidden lg:block absolute bottom-12 text-center text-white/50 text-[10px] font-black uppercase tracking-[0.25em]">
          Scroll to rotate services
        </div>

      </div>
    </section>
  );
};

export default Service;