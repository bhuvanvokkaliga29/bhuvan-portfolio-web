# ORIGINAL BACKUP INFORMATION

**Date:** November 4, 2026
**Commit Hash (HEAD before Wispr changes):** `640692e243639754c399f73d6ce33b94df1421e3`
**Backup Branch Created:** `backup/original-portfolio-before-wispr`
**Full External Copy Location:** `C:\Users\HP\Desktop\bhuvan-portfolio-web-backup-before-wispr\`

---

## Git State at Backup Time
- Branch: `main` (backed up to `backup/original-portfolio-before-wispr`)
- Working tree: clean
- Remote: `https://github.com/bhuvanvokkaliga29/bhuvan-portfolio-web.git`

## Preserved Structure & Assets
- Source code in `src/` (including all components: `Hero.tsx`, `Welcome.tsx`, `Portfolio.tsx`, `Projects.tsx`, `Service.tsx`, `Contact.tsx`, `Footer.tsx`, `Navbar.tsx`, `Chatbot.tsx`, `ui/*`)
- Assets in `src/assets/` (`hero-bg.jpg`, `project-*.jpg`)
- Static assets in `src/` (`hero.png.jpeg`, `footer.png.jpeg`, `portfolio.png.jpeg`)
- Public files in `public/`
- Build configs: `vite.config.ts`, `tailwind.config.ts`, `tsconfig*.json`, `package.json`, `package-lock.json`

## Recovery Procedure
If any issue occurs and full rollback is desired:
1. Revert using git branch:
   ```bash
   git reset --hard backup/original-portfolio-before-wispr
   ```
2. Or restore from the physical backup directory:
   ```bash
   robocopy C:\Users\HP\Desktop\bhuvan-portfolio-web-backup-before-wispr . /E
   ```
