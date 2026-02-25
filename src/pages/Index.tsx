import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticlesBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
        <FooterSection />
      </main>
      <Chatbot />
    </div>
  );
};

export default Index;
