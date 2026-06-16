import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navLinks = ["Home", "About", "Portfolio", "Service", "Contact"];

  // 1. Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && !isOpen) {
          setShowNavbar(false); // Hide scrolling down
        } else {
          setShowNavbar(true); // Show scrolling up
        }
      } else {
        setShowNavbar(true); // Show at the top
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  // 2. GSAP Intro Animations
  useEffect(() => {
    // Fade in logo from left
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );

    // Nav links stagger animation
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll(".nav-link");
      gsap.fromTo(
        links,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // 3. GSAP Mobile Menu Animations
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-link",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [isOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-500 bg-transparent py-6 px-6 md:px-12 flex justify-between items-center ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo (Renamed to bhuvan.web) */}
        <div ref={logoRef} className="flex items-center">
          <a
            href="#home"
            className="text-2xl font-black uppercase tracking-widest text-white hover:text-yellow-400 hover:glow-yellow transition-all duration-300 select-none"
          >
            Bhuvan<span className="text-yellow-400 font-extrabold">.web</span>
          </a>
        </div>

        {/* Desktop Menu links */}
        <nav
          ref={linksRef}
          className="hidden md:flex items-center gap-8 glassmorphism px-8 py-3 rounded-full border border-white/5 backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link relative text-sm font-semibold tracking-wider uppercase text-white/80 hover:text-white transition-colors duration-300 group py-1"
            >
              {link}
              {/* Expand Underline on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Button & Hamburger (Changed to Let's Talk link) */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:glow-yellow hover:scale-105 transition-all duration-300 active:scale-95"
          >
            Let's Talk <ArrowRight size={12} />
          </a>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full glassmorphism text-white border border-white/10"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 z-45 bg-zinc-950/95 backdrop-blur-3xl transition-opacity duration-500 flex flex-col justify-center items-center ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navigation links */}
        <nav className="flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="mobile-link text-3xl font-black uppercase tracking-widest text-white hover:text-yellow-400 hover:scale-110 transition-all duration-300"
            >
              {link}
            </a>
          ))}

          {/* Let's Talk CTA in Mobile Menu */}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mobile-link mt-8 bg-yellow-400 text-zinc-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:glow-yellow"
          >
            Let's Talk <ArrowRight size={14} />
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
