import { Heart, Star, Compass } from "lucide-react";
import footerImg from "../portfolio.png.jpeg";

const Footer = () => {
  const marqueeTexts = [
    "CREATIVE DEVELOPER • AI ENGINEER • LLM DEVELOPER • PROBLEM SOLVER • ",
    "WEBIX.AI FOUNDER • COMPUTER VISION ENGINEER • FULL STACK DEVELOPER • ",
    "BUILDING INTELLIGENT SYSTEMS • HACKATHON WINNER • RESEARCHER • ",
    "DESIGNING DIGITAL EXPERIENCES • INNOVATING AUTOMATION • CREATING IMPACT • ",
  ];

  return (
    <footer className="relative w-full bg-[#f4c400] text-zinc-950 pt-24 pb-8 overflow-hidden z-35 border-t border-yellow-500/10">
      
      {/* --- LAYER 1: MULTIPLE LAYERED SCROLLING TEXT MARQUEES (Low Opacity Backdrop) --- */}
      <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none select-none opacity-[0.06] z-0">
        <div className="animate-marquee-left text-[6vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          {marqueeTexts[0]}{marqueeTexts[0]}
        </div>
        <div className="animate-marquee-right text-[6vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          {marqueeTexts[1]}{marqueeTexts[1]}
        </div>
        <div className="animate-marquee-left text-[6vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          {marqueeTexts[2]}{marqueeTexts[2]}
        </div>
        <div className="animate-marquee-right text-[6vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none">
          {marqueeTexts[3]}{marqueeTexts[3]}
        </div>
      </div>

      {/* --- LAYER 2: INTERACTIVE CONTENT LAYER --- */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center gap-12 relative z-10">
        
        {/* Floating Profile Image & CTA Buttons */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-zinc-950/20 floating hover:scale-105 transition-transform duration-500 bg-zinc-900">
            <img
              src={footerImg}
              alt="Bhuvan Gowda Footer Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-sm font-bold uppercase tracking-widest text-zinc-900/60 max-w-xs">
            Let's build the next generation of intelligent software together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {/* Blue Follow Button */}
            <a
              href="https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-3.5 rounded-full hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <Compass size={14} className="animate-spin" /> Follow Me
            </a>

            {/* WhatsApp CTA Button */}
            <a
              href="https://wa.me/919380095587"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#22c05b] text-white font-black uppercase tracking-[0.2em] text-xs px-8 py-3.5 rounded-full shadow-md hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Branding & Logo Block */}
        <div className="text-center mt-6">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-zinc-950 leading-none">
            BHUVAN<span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">.WEB</span>
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-900/40 mt-2">
            Building AI for a smarter world
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {["Home", "About", "Portfolio", "Service", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900/60 hover:text-zinc-950 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-zinc-950/10 rounded-full" />

        {/* Bottom Legal / Copyright info */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest text-zinc-900/40 uppercase">
          <div className="flex items-center gap-1.5 justify-center">
            <span>© 2026 Bhuvan Gowda H K.</span>
            <span>Crafted with</span>
            <Heart size={10} className="text-red-600 fill-red-600 animate-pulse" />
          </div>

          <div className="flex gap-6">
            <a href="#home" className="hover:text-zinc-950 transition-colors">
              Back To Top ↑
            </a>
            <a
              href="https://github.com/bhuvanvokkaliga29"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-950 transition-colors flex items-center gap-1"
            >
              <Star size={10} /> Github
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
