import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import portfolioImg from "../portfolio.png.jpeg";

const bgColors = [
  { name: "yellow", val: "#f4c400" },
  { name: "red", val: "#ef4444" },
  { name: "green", val: "#22c55e" },
  { name: "purple", val: "#a855f7" },
  { name: "rose", val: "#f43f5e" },
  { name: "orange", val: "#f97316" },
];

const Portfolio = () => {
  const [bgColor, setBgColor] = useState("#f4c400"); // default yellow
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  
  const [isDesktop, setIsDesktop] = useState(true);
  const [scannerPos, setScannerPos] = useState({ x: -500, y: -500 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  // Check desktop view on mount/resize
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Handle mouse/touch moves and resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    // Set initial size and positions
    updateDimensions();
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setScannerPos({ x: centerX - 140, y: centerY - 140 });

    // GSAP quickTo for buttery smooth tracking
    const quickX = gsap.quickTo(scannerRef.current, "left", {
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        const xVal = gsap.getProperty(scannerRef.current, "left") as number;
        setScannerPos(prev => ({ ...prev, x: xVal }));
      }
    });

    const quickY = gsap.quickTo(scannerRef.current, "top", {
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        const yVal = gsap.getProperty(scannerRef.current, "top") as number;
        setScannerPos(prev => ({ ...prev, y: yVal }));
      }
    });

    // Auto-move wandering animation variables for mobile
    let autoMoveTween: gsap.core.Tween | null = null;
    let resumeTimeout: NodeJS.Timeout | null = null;
    let isUserInteracting = false;

    const startAutoMove = () => {
      if (isUserInteracting) return;
      const currentRect = container.getBoundingClientRect();
      const maxX = currentRect.width - 280;
      const maxY = currentRect.height - 280;

      const moveToRandom = () => {
        if (isUserInteracting) return;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        const duration = 2.5 + Math.random() * 2; // Slow, smooth cinematic drift

        autoMoveTween = gsap.to(scannerRef.current, {
          left: randomX,
          top: randomY,
          duration: duration,
          ease: "sine.inOut",
          onUpdate: () => {
            const xVal = gsap.getProperty(scannerRef.current, "left") as number;
            const yVal = gsap.getProperty(scannerRef.current, "top") as number;
            setScannerPos({ x: xVal, y: yVal });
          },
          onComplete: moveToRandom,
        });
      };
      
      moveToRandom();
    };

    const stopAutoMove = () => {
      if (autoMoveTween) {
        autoMoveTween.kill();
        autoMoveTween = null;
      }
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }
    };

    // Initial run for mobile auto-movement
    if (!isDesktop) {
      setTimeout(startAutoMove, 100);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      quickX(relativeX - 140);
      quickY(relativeY - 140);
    };

    // Touch Event Handlers
    const handleTouchStart = (e: TouchEvent) => {
      isUserInteracting = true;
      stopAutoMove();
      handleTouchMove(e);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const relativeX = touch.clientX - rect.left;
      const relativeY = touch.clientY - rect.top;
      
      quickX(relativeX - 140);
      quickY(relativeY - 140);
    };

    const handleTouchEnd = () => {
      isUserInteracting = false;
      resumeTimeout = setTimeout(() => {
        startAutoMove();
      }, 1500);
    };

    window.addEventListener("resize", updateDimensions);
    
    if (isDesktop) {
      container.addEventListener("mousemove", handleMouseMove);
    } else {
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: true });
      container.addEventListener("touchend", handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener("resize", updateDimensions);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      stopAutoMove();
    };
  }, [isDesktop]);

  // Compute CSS clip-path inset values for the sharp layer
  const rightInset = dimensions.width - (scannerPos.x + 280);
  const bottomInset = dimensions.height - (scannerPos.y + 280);

  const clipPathStyle: React.CSSProperties = {
    clipPath: `inset(${scannerPos.y}px ${rightInset}px ${bottomInset}px ${scannerPos.x}px round 24px)`,
    WebkitClipPath: `inset(${scannerPos.y}px ${rightInset}px ${bottomInset}px ${scannerPos.x}px round 24px)`,
  };

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 select-none ${
        isDesktop ? "touch-none" : ""
      }`}
      style={{
        backgroundColor: bgColor,
        cursor: isDesktop ? "crosshair" : "default",
      }}
    >
      {/* --- LAYER 1: BASE FULLY BLURRED LAYER (Blurred background + blurred half-body photo) --- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none filter blur-[4px] brightness-[0.85] z-0">
        {/* Large Background Text */}
        <h2 className="absolute inset-0 flex items-center justify-center text-[11vw] font-black tracking-tighter text-white opacity-80 leading-none">
          P<span className="text-stroke">O</span>RTF<span className="text-stroke">O</span>LIO
        </h2>

        {/* Center Portfolio Image (Half Body Image) */}
        <div className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-3xl overflow-hidden shadow-2xl scale-95 border border-white/20">
          <img
            src={portfolioImg}
            alt="Bhuvan Gowda Portfolio Blur"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- LAYER 2: SHARP LAYER OVERLAY (Visible only inside the moving scanner area) --- */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 transition-[clip-path] duration-75"
        style={clipPathStyle}
      >
        {/* Large Background Text */}
        <h2 className="absolute inset-0 flex items-center justify-center text-[11vw] font-black tracking-tighter text-white opacity-95 leading-none">
          P<span className="text-stroke">O</span>RTF<span className="text-stroke">O</span>LIO
        </h2>

        {/* Center Portfolio Image (Sharp) */}
        <div className="relative w-80 h-96 md:w-96 md:h-[480px] rounded-3xl overflow-hidden shadow-2xl scale-95 border border-white/20">
          <img
            src={portfolioImg}
            alt="Bhuvan Gowda Portfolio Sharp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- LAYER 3: SCANNER CROP BOX OVERLAY (Tracks cursor, handles border styling) --- */}
      <div
        ref={scannerRef}
        className="absolute w-[280px] h-[280px] rounded-3xl pointer-events-none z-20 shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-white/15 flex items-center justify-center"
        style={{
          left: `${scannerPos.x}px`,
          top: `${scannerPos.y}px`,
        }}
      >
        {/* Marching Ants Border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <rect
            x="2"
            y="2"
            width="276"
            height="276"
            rx="22"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            className="marching-ants"
          />
        </svg>

        {/* 3D Corner Handles */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-[4px] border-l-[4px] border-blue-500 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-[4px] border-r-[4px] border-blue-500 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-[4px] border-l-[4px] border-blue-500 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-[4px] border-r-[4px] border-blue-500 rounded-br-xl" />

        {/* Scanner Indicator Grid */}
        <div className="w-[85%] h-[85%] border border-blue-500/10 grid grid-cols-3 grid-rows-3 pointer-events-none">
          <div className="border-r border-b border-blue-500/10" />
          <div className="border-r border-b border-blue-500/10" />
          <div className="border-b border-blue-500/10" />
          <div className="border-r border-b border-blue-500/10" />
          <div className="border-r border-b border-blue-500/10" />
          <div className="border-b border-blue-500/10" />
          <div className="border-r border-blue-500/10" />
          <div className="border-r border-blue-500/10" />
          <div className="" />
        </div>
      </div>

      {/* --- LAYER 4: COLOR SELECTOR --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
          SELECT PALETTE
        </span>
        <div className="flex gap-4 p-3 bg-zinc-950/70 backdrop-blur-md rounded-full border border-white/5 shadow-2xl">
          {bgColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setBgColor(color.val)}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                bgColor === color.val
                  ? "border-white scale-125 glow-neon-white"
                  : "border-transparent hover:scale-110"
              }`}
              style={{ backgroundColor: color.val }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
