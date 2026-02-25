import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, MapPin, Calendar, Users } from "lucide-react";

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 section-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-center text-muted-foreground font-body mb-12 text-sm">Milestones & recognition</p>

          {/* Main achievement card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-10 neon-glow text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-bg mb-6">
              <Trophy className="text-background" size={28} />
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
              🥈 1st Runner-Up
            </h3>
            <p className="font-display text-lg text-primary mb-6">IoTopia National Hackathon 2025</p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground font-body">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                REVA University
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-secondary" />
                Sept 12–13, 2025
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-primary" />
                Team: Trust Builders
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
