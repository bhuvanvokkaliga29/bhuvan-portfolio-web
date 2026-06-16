import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Projects from "@/components/Projects";
import Service from "@/components/Service";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden selection:bg-yellow-400 selection:text-zinc-950">
      
      {/* 1. Global Fixed Responsive Navbar */}
      <Navbar />

      {/* 2. Fullscreen Fixed Background Portfolio Hero Section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Portfolio />
      </div>

      {/* 3. Scrollable Content Overlay Layer (scrolls over portfolio with overlap effect) */}
      <div className="relative z-10 w-full mt-[100vh] bg-transparent shadow-[0_-20px_50px_rgba(9,9,11,0.8)]">
        
        {/* Hero Section */}
        <Hero />

        {/* Welcome Section */}
        <Welcome />

        {/* Projects Section */}
        <Projects />

        {/* Services Section */}
        <Service />

        {/* Contact Section */}
        <Contact />

        {/* Footer Section */}
        <Footer />
        
      </div>

      {/* 4. Interactive Chatbot Assistant (stays on top) */}
      <Chatbot />
      
    </div>
  );
};

export default Index;
