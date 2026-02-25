import { Github, Linkedin, Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center gap-4 mb-6">
          {[
            { icon: Github, href: "https://github.com/bhuvanvokkaliga29" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/bhuvan-gowda-h-k-4ba8b5318/" },
            { icon: Instagram, href: "https://www.instagram.com/webix.ai" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <p className="font-body text-sm text-muted-foreground mb-2">
          © 2026 Bhuvan Gowda H K
        </p>
        <p className="font-body text-xs text-muted-foreground">
          "Building AI for a smarter world 🌍"
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
