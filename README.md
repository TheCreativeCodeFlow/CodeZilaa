# CodeZilaa — Premium Placement Preparation & Visual Code Learning Platform

> **Engineered for learning, not just solving questions.**  
> CodeZilaa helps engineering students practice coding, visualize program execution line-by-line, improve problem-solving intuition, and master technical placements from a unified platform.

![CodeZilaa Hero](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15.0-0055FF?logo=framer)

---

## 🚀 Overview

**CodeZilaa** is a modern, premium placement preparation platform built for engineering students targeting FAANG and top-tier tech companies. Unlike traditional platforms that encourage pattern memorization, CodeZilaa focuses on **deep computational intuition** through interactive visual execution profiling, compiler analysis, and structured learning roadmaps.

### 🎯 Target Audience
- Engineering students (Tier-1 & Tier-2 colleges) preparing for campus placements
- Self-taught developers targeting FAANG/MAANG interviews
- College placement cells & computer science departments
- Competitive programmers seeking visual algorithm intuition

---

## ✨ Features Showcase

### 🏠 **Hero Section** (`src/components/Hero.tsx`, `src/components/hero/HeroInteractiveCode.tsx`)
- **Animated hero** with Framer Motion entrance animations
- **Interactive Binary Search Visualizer** — Live execution profiler showing:
  - Real-time code line highlighting
  - Variable state table with live memory values
  - Active call stack frames
  - Console output feed
  - Play/pause/reset controls with step scrubbing
- Trust indicators: 50K+ students, 120+ colleges, 94.2% placement rate

### 🎯 **Platform Capabilities** (`src/components/Features.tsx`)
| Feature | Description | Icon |
|---------|-------------|------|
| **Coding Practice** | 1,200+ curated FAANG/tech interview problems with test case evaluation | `Code` |
| **Multi-language Compiler** | Ultra-fast execution engine (C++, Java, Python, JavaScript) with memory profiling | `Terminal` |
| **Interactive Visualization** | Step-by-step pointer, recursion tree, stack frame, and array operation visualization | `Eye` |
| **Aptitude Preparation** | Quantitative, logical reasoning, verbal modules for campus placements | `Brain` |
| **Learning Roadmaps** | 5-stage structured paths: Syntax → Data Structures → Algorithms → Interview Prep → Placement Ready | `Compass` |
| **Progress Tracking** | Accuracy, streak, speed benchmarks, weakness diagnosis | `TrendingUp` |
| **Student Dashboard** | Daily goals, contests, saved solutions, company-wise prep | `LayoutDashboard` |
| **Profile & Admin Panel** | Verified student portfolio + placement officer analytics | `UserCheck` |

### 🔬 **Signature Visualization Engine** (`src/components/VisualizationShowcase.tsx`)
- **Interactive Bubble Sort Scrubber** — Apple-style product showcase panel
- **Playback Controls**: Play/pause, step forward/back, replay, speed control
- **Memory Heap Visualization**: Animated bars with color-coded states (comparing/swapping/sorted)
- **Synchronized Code Highlighting**: Line-by-line execution sync with memory state
- **Real-time Status Banner**: Contextual explanation at each execution step

### 🗺️ **Structured Learning Journey** (`src/components/LearningJourney.tsx`)
5-stage architectural roadmap with connecting timeline:
1. **Programming Fundamentals** — Syntax mastery, pointers, memory, OOP
2. **Data Structures** — Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Maps with visual memory layouts
3. **Advanced Algorithms** — DP, Greedy, Backtracking, Divide & Conquer
4. **Technical Interview Prep** — Mock coding rounds, system design primers, complexity analysis
5. **Placement Ready** — Verified badges, referral networks, campus drive success

### 📊 **Impact Statistics** (`src/components/Stats.tsx`)
- 50,000+ Students Trained
- 1,200+ Questions Curated
- 2.5M+ Code Visualizations Executed
- 500,000+ Hours Practiced
- 94.2% Placement Success Rate

### 🎓 **Pedagogical Philosophy** (`src/components/WhyCodeZilaa.tsx`)
| Principle | Description |
|-----------|-------------|
| **Understand Every Line** | Inspect variable mutation and call stacks in real-time |
| **Build Algorithmic Logic** | Develop mental models for pointers, recursion, DP state transitions |
| **Learn Visually, Retain Longer** | Visual learners absorb concepts 4× faster |
| **Stay Consistent with Streaks** | Gamified daily challenges for momentum |
| **Track Precise Improvement** | Diagnostic reports on speed bottlenecks, runtime bugs, accuracy growth |
| **Become Confidently Interview-Ready** | Simulated pressure with real company tags & time limits |

### 💬 **Student Testimonials** (`src/components/Testimonials.tsx`)
Verified alumni from IIT Bombay, BITS Pilani, NIT Trichy placed at Google, Amazon, Atlassian

### 💰 **Pricing Tiers** (`src/components/Pricing.tsx`)
| Plan | Price | Target | Key Features |
|------|-------|--------|--------------|
| **Free Developer** | ₹0/forever | Beginners | 300+ problems, standard compiler, basic profiler, community forums |
| **Placement Pro** ⭐ | ₹499/month | Serious aspirants | 1,200+ questions, unlimited visualizations, FAANG sheets, aptitude/system design, mock interviews |
| **Campus Enterprise** | Custom | Universities | Bulk licensing, placement officer portal, automated contests, dedicated support |

### 🎯 **Call to Action** (`src/components/CTA.tsx`)
Dual CTA: "Start Learning Now" + "Explore Interactive Engine" with ambient glow effects

### 🦶 **Footer** (`src/components/Footer.tsx`)
- Product links, Company info, Legal pages
- Social links: GitHub, Twitter, LinkedIn, YouTube
- Brand identity with gradient logo

---

## 🏗️ Technical Architecture

### Stack
| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js | 15.1.0 (App Router) |
| **Runtime** | React | 19.0.0 |
| **Language** | TypeScript | 5.7.2 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **Animations** | Framer Motion | 11.15.0 |
| **Icons** | Lucide React | 0.469.0 |
| **Utilities** | clsx, tailwind-merge | 2.1.1, 2.6.0 |

### Project Structure
```
CodeZilaa/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles, CSS variables, utilities
│   │   ├── layout.tsx           # Root layout with metadata & SEO
│   │   └── page.tsx             # Homepage composition
│   ├── components/
│   │   ├── ui/
│   │   │   └── BackgroundEffects.tsx   # Ambient background animations
│   │   ├── hero/
│   │   │   └── HeroInteractiveCode.tsx # Binary search execution profiler
│   │   ├── Hero.tsx                    # Landing hero with interactive demo
│   │   ├── Features.tsx                # 8-capability feature grid
│   │   ├── VisualizationShowcase.tsx   # Interactive bubble sort scrubber
│   │   ├── LearningJourney.tsx         # 5-stage curriculum timeline
│   │   ├── Stats.tsx                   # Animated counter statistics
│   │   ├── WhyCodeZilaa.tsx            # 6-pillar pedagogical philosophy
│   │   ├── Testimonials.tsx            # Student success stories
│   │   ├── Pricing.tsx                 # 3-tier pricing cards
│   │   ├── CTA.tsx                     # Conversion section
│   │   ├── Navbar.tsx                  # Navigation with glassmorphism
│   │   └── Footer.tsx                  # Site footer
│   └── components/hero/
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.mjs
└── postcss.config.js
```

### Design System (globals.css)
- **Dark theme**: `#090909` base with cyan/indigo/amber accent gradients
- **Glassmorphism**: `.glass-panel` utility with backdrop blur
- **Custom scrollbar**: Themed dark scrollbar
- **Selection styling**: Cyan accent selection
- **Typography**: Inter font, monospace for code/numbers
- **Gradient text utilities**: `.accent-gradient-text`, `.text-gradient`

---

## 📈 Work Progress & Development Timeline

### ✅ Phase 1: Foundation & Core Layout (Complete)
- [x] Next.js 15 + TypeScript + Tailwind CSS project setup
- [x] Root layout with metadata, SEO, Open Graph
- [x] Global CSS with design system utilities
- [x] Responsive Navbar with glassmorphism backdrop
- [x] Footer with brand, product links, company info, legal

### ✅ Phase 2: Hero & Interactive Demo (Complete)
- [x] Hero section with animated entrance (Framer Motion)
- [x] Trust indicators with animated counters
- [x] **HeroInteractiveCode** — Binary Search live execution profiler:
  - [x] Code view with line-by-line highlighting
  - [x] Variable state table with live updates
  - [x] Call stack visualization
  - [x] Console output feed
  - [x] Play/pause/reset controls with step counter

### ✅ Phase 3: Feature Showcase (Complete)
- [x] **Features** — 8-capability grid with hover animations
- [x] **VisualizationShowcase** — Apple-style interactive Bubble Sort:
  - [x] Playback controls (play/pause/step/replay)
  - [x] Memory heap bar chart with spring animations
  - [x] Synchronized code highlighting
  - [x] Status banner with contextual explanations
- [x] **LearningJourney** — 5-stage roadmap with connecting timeline

### ✅ Phase 4: Social Proof & Conversion (Complete)
- [x] **Stats** — Animated counter grid with gradient numbers
- [x] **WhyCodeZilaa** — 6-pillar philosophy cards
- [x] **Testimonials** — 3 verified alumni cards with avatars
- [x] **Pricing** — 3-tier cards with feature lists, popular badge
- [x] **CTA** — Dual-action conversion section with ambient glows

### 🚧 Phase 5: Backend & Platform Features (Planned)
- [ ] Authentication (NextAuth.js + Prisma + PostgreSQL)
- [ ] User dashboard with progress tracking
- [ ] Problem set CRUD + test case runner
- [ ] Multi-language compiler service (Judge0 / custom)
- [ ] Visualization engine API (AST parsing, step generation)
- [ ] Campus admin analytics portal
- [ ] Payment integration (Razorpay/Stripe)

### 🚧 Phase 6: Content & Scale (Planned)
- [ ] 1,200+ curated problems with company tags
- [ ] Video explanations for top 200 problems
- [ ] Aptitude modules (Quant, LR, Verbal)
- [ ] System design primer course
- [ ] Mobile app (React Native / Expo)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17+
- pnpm (recommended) or npm/yarn

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/CodeZilaa.git
cd CodeZilaa

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts
```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

---

## 🎨 Customization

### Theme Colors (globals.css)
```css
:root {
  --background: 9 9 9;           /* #090909 */
  --foreground: 243 244 246;     /* #f3f4f6 */
  --accent-cyan: 6 182 212;      /* #06b6d4 */
  --accent-indigo: 99 102 241;   /* #6366f1 */
  --accent-amber: 245 158 11;    /* #f59e0b */
}
```

### Tailwind Config (tailwind.config.js)
Extend with custom colors, fonts, animations as needed.

---

## 📱 Responsive Breakpoints
| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

All components use mobile-first responsive design.

---

## ♿ Accessibility
- Semantic HTML5 landmarks (`<main>`, `<section>`, `<nav>`, `<footer>`)
- Focus-visible outlines for keyboard navigation
- ARIA labels on interactive icons
- Sufficient color contrast (WCAG AA)
- Reduced motion support via `prefers-reduced-motion`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
# Auto-detects Next.js, deploys on push
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 Contact & Links

- **Website**: [codezilaa.com](https://codezilaa.com)
- **GitHub**: [github.com/yourusername/CodeZilaa](https://github.com/yourusername/CodeZilaa)
- **Twitter**: [@CodeZilaa](https://twitter.com/CodeZilaa)
- **LinkedIn**: [CodeZilaa](https://linkedin.com/company/codezilaa)
- **Email**: hello@codezilaa.com

---

## 🙏 Acknowledgments

- **Next.js Team** — For the incredible App Router
- **Framer Motion** — For buttery-smooth animations
- **Tailwind CSS** — For utility-first styling excellence
- **Lucide** — For beautiful, consistent icons
- **Vercel** — For seamless deployment platform

---

<div align="center">

**Built with precision for ambitious developers.**  
*Engineered by the CodeZilaa Team.*

</div>