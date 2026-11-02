# DESIGN.md — Portfolio Update (ashelycole.dev)

> Instructions for Claude (or any coding agent) to update the portfolio site.
> Owner: Niwasiima Ashelycole · Version 2.0 · 2 November 2026

---

## 0. How to work on this

1. **Inspect the repo first.** Find where each section (Hero, Stats, About, Stack, Experience, Certifications, Projects, Find Me Online) is rendered and where its content lives. Do not assume file names.
2. **Keep the existing visual design.** Same fonts, colours, spacing, animations and component style. This is a content and structure update, not a redesign.
3. **Move content into typed data files** (see §6) before editing sections, so components only render data.
4. **Do not remove working features** (theme, animations, resume link, social links) unless this file says so.
5. **Verify** with the checklist in §8 before finishing: build passes, no console errors, every link opens, layout works at 375px.
6. If something here conflicts with the code, stop and ask rather than guessing.

---

## 1. Goals

- Bring the site in line with the November 2026 CV.
- Add newer projects and leadership roles.
- **Every project card links to a live demo and/or code.** (Biggest current gap: no card has links today.)
- Position the site for **full-stack web developer** roles.

---

## 2. Current state (as of 2 Nov 2026)

| Section | Current | Problem |
| --- | --- | --- |
| Hero | Title "SOFTWARE ENGINEER"; tag "Available for full-time opportunities" | Title differs from page title; tag conflicts with being a full-time student |
| Stats | 2+ years, 7+ projects, 10K+ hours | 10K hours is implausible; project count is outdated |
| About | Two generic paragraphs + closing line | Doesn't say what I build or for whom |
| Stack | 12 programming + 17 tools incl. CMD, MS Office, MS Access, PowerPoint | Missing Flutter, Django, FastAPI, LangGraph, Docker, AWS; low-signal tools |
| Experience | RENOA, GitHub (72nd), Akili (May 2026), Huawei ×2 | Missing roles; wrong rank and date; competition listed as job |
| Certifications | 10 cards | AWS badge missing; "Kuwaelimika" misspelled; duplicate HCIA-AI |
| Projects | 6 cards, problem line + tags only | **No links**; wrong tags; newer projects missing |
| Education | — | Missing |

---

## 3. Section specs

### 3.1 Hero

- **Title:** `FULL STACK DEVELOPER`
- **Intro:** `I'm Niwasiima Ashelycole. I build and ship web apps for East Africa, from offline-first systems and mobile money flows to AI agents. Co-Founder and CTO at RENOA.`
- **Status tag:** `Open to developer roles and contracts`
- **Buttons:** `View Projects` (scrolls to #projects), `Let's Talk` (mailto), `Resume` (new PDF)

### 3.2 Stats

| Value | Label |
| --- | --- |
| 2+ | Years building |
| 13+ | Projects shipped |
| 63rd | GitHub contributor in Uganda |

### 3.3 About

Three short paragraphs:

1. I'm a full-stack web developer in Kampala. I design databases and APIs and build responsive interfaces, with a growing focus on AI features.
2. I build for East African realities: unreliable internet, local languages, mobile money and community trust.
3. I lead technical delivery at RENOA and train young developers at Akili Za Kesho Ventures.

Keep the existing closing line: "I don't always have a solution, but I know how to find one."

### 3.4 Stack (grouped)

| Group | Items |
| --- | --- |
| Frontend | React, Next.js, TypeScript, Tailwind CSS, Flutter |
| Backend | Node.js, Django, FastAPI, REST APIs |
| Data | PostgreSQL, MySQL, Supabase, Firebase, MongoDB |
| AI | LangChain, LangGraph, MCP, LLM APIs |
| Cloud & DevOps | Git, GitHub, Docker, Vercel, Netlify, AWS, Kubernetes |
| Tools | Clerk, Figma, VS Code, Cursor, Claude Code |

**Remove:** CMD, MS Office, MS Access, PowerPoint, C, Bash (keep Bash only if a project uses it).

### 3.5 Experience

Newest first. Each entry: title, org, dates, tag badge, two bullets.

```ts
export const experience: Experience[] = [
  {
    title: "Co-Founder & Chief Technology Officer",
    org: "RENOA",
    location: "Kampala, Uganda",
    start: "2026-04",
    tag: "work",
    bullets: [
      "Lead technical delivery for a six-person founding team building web apps, agentic AI and gamified systems.",
      "Own architecture, code review and deployment for studio and client products.",
    ],
  },
  {
    title: "Technical Trainer",
    org: "Akili Za Kesho Ventures",
    location: "Kampala, Uganda",
    start: "2026-04", // April, NOT May
    tag: "volunteer",
    bullets: [
      "Train interns on practical development skills, GitHub workflows and responsible AI use.",
      "Deliver hands-on capacity-building sessions for local youth.",
    ],
  },
  {
    title: "AWS Student Builder Group Leader",
    org: "Cavendish University Uganda",
    start: "2026",
    tag: "leadership",
    bullets: ["Lead the campus AWS student builder community; AWS SBG Leader badge issued October 2026."],
  },
  {
    title: "Technical Programs Coordinator, Projects & Innovation",
    org: "IEEE Student Branch, Cavendish University Uganda",
    start: "2026",
    tag: "leadership",
    bullets: [
      "Coordinate student projects, hackathons and innovation challenges.",
      "Helped organise IEEE Day Uganda 2026.",
    ],
  },
  {
    title: "PR & Partnerships Officer",
    org: "CUUCSA (Computer Students' Association)",
    start: "2026",
    tag: "leadership",
    bullets: ["Manage partnerships and public communication for the association."],
  },
  {
    title: "Active Open-Source Contributor",
    org: "GitHub",
    start: "2026-05",
    tag: "community",
    bullets: ["Ranked 63rd among Uganda's open-source contributors on committers.top."],
  },
  {
    title: "Freelance Web Developer",
    org: "Self-employed",
    location: "Kampala, Uganda",
    start: "2025-08",
    tag: "freelance",
    bullets: [
      "Build and deliver websites and web apps for clients, with documented design and upgrade plans.",
      "Completed technical assessments for a booking site and an e-commerce site.",
    ],
  },
];
```

**Remove** both Huawei ICT Competition entries from Experience; they move to Recognition (§3.7).

### 3.6 Education (new section)

- Bachelor of Software Engineering — Cavendish University Uganda — expected January 2029

### 3.7 Recognition (new section)

- 3rd Prize, Southern Africa Regional Huawei ICT Competition, Cloud Track (2026)
- Selected for UCC Testbed Hackathon 2026 (1 of 40)
- GopherCon Africa 2026 delegate, Nairobi (1 of 15 from Uganda)
- Eco Farm showcased at the 4th National Appropriate Technologies Expo
- Organised a Chainlink Web3 meetup at Cavendish University Uganda

### 3.8 Projects

**Card anatomy:** number, title, one-line problem, stack tags, `Solo` / `Team · <role>` badge, **Live** and **Code** buttons (render only the ones that exist; open in new tab with `rel="noopener noreferrer"`).

**Featured (large cards, this order):**

```ts
export const projects: Project[] = [
  {
    slug: "lawbuddy", title: "Law Buddy", featured: true, order: 1, team: false,
    problem: "Ugandans struggle to find and understand their constitutional rights.",
    summary: "AI legal assistant that answers strictly from Uganda's 1995 Constitution, with a library, chat and article comparison.",
    tags: ["Flutter", "Dart", "LLM"],           // NOT React
    live: "https://uglawbuddy.vercel.app",
    repo: "https://github.com/Ashelycole1/LAWBUDDY",
  },
  {
    slug: "auditlogs", title: "AUDITLOGS", featured: true, order: 2, team: false,
    problem: "Internal audit teams track queries in spreadsheets and email with weak accountability.",
    summary: "Role-based audit query follow-up system with assignment, approval workflow and full change logging.",
    tags: ["Django", "React", "PostgreSQL", "Docker"],
    live: "https://auditlog.ashelycole.dev",
    repo: "https://github.com/Ashelycole1/AUDITLOGS",
    // DO NOT name the client anywhere. Say "an internal audit function in Uganda".
  },
  {
    slug: "mdaad-now", title: "Mdaad Now", featured: true, order: 3, team: true, role: "Backend Developer",
    problem: "Aid workers in conflict zones lose connectivity when coordination matters most.",
    summary: "Offline-first PWA for crisis response, aid mapping and emergency coordination.",
    tags: ["React", "Leaflet", "PWA", "Node.js"],
    live: "https://mdaad-now.vercel.app",
    repo: "https://github.com/evansrwothomio20-web/Mdaad-Now",
  },
  {
    slug: "agrimoist-ai", title: "AgriMoist AI", featured: true, order: 4, team: true, role: "Built the core agent",
    problem: "Extension officers in Karamoja can't reach every farmer with timely advice.",
    summary: "AI advisory agent with an extension-officer approval gate and USSD and web channels.",
    tags: ["Python", "FastAPI", "LangGraph", "MCP"],
    live: "https://agri-moist-ai.onrender.com",
    repo: "https://github.com/VictoriaMirembe/Agri-moist-AI",
  },
  {
    slug: "esms", title: "ESMS", featured: true, order: 5, team: true, role: "Full Stack Developer & Architect",
    problem: "Universities run admissions, fees, academics and staff on disconnected tools.",
    summary: "Multi-tenant university management system with UGX fees, mobile money, admissions and staff workflows.",
    tags: ["Next.js", "TypeScript", "Supabase", "Clerk"],
    live: "https://esms-beta.vercel.app",
    repo: "https://github.com/EGABO-TECH/ESMS",
  },
  {
    slug: "ecofarm", title: "Eco Farm", featured: true, order: 6, team: false,
    problem: "Farmers lack one place for markets, advice and crop tracking in their own language.",
    summary: "Marketplace, community, chat, alerts and farm tracking in six Ugandan languages.",
    tags: ["Next.js", "Supabase", "PostgreSQL"],   // verify; NOT LangChain/MiniPay unless the repo uses them
    live: "https://ecofarmug.vercel.app",
    repo: "https://github.com/Ashelycole1/Ecofarm",
  },
```

**More projects (compact cards):**

```ts
  {
    slug: "e-vote", title: "e-Vote", featured: false, order: 7, team: true, role: "Lead Developer",
    problem: "Elections can't depend on always-online voting where internet is unreliable.",
    summary: "Offline-first voting with anonymous cryptographic receipts.",
    tags: ["Next.js", "TypeScript", "Supabase", "Clerk", "PWA"],
    live: "https://e-vote-self.vercel.app",
  },
  {
    slug: "the-bookworm", title: "The Bookworm", featured: false, order: 8, team: false,
    problem: "Readers need a simple way to discover, buy and download books.",
    summary: "Digital bookstore PWA with search, cart, checkout and secure downloads via signed URLs.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Cloudflare R2"],
    live: "https://the-book-worm.app",
    repo: "https://github.com/Ashelycole1/thebookworm",
  },
  {
    slug: "pottrust", title: "PotTrust", featured: false, order: 9, team: false,
    problem: "Savings groups depend on trust, and one person's records are easy to dispute.",
    summary: "Role-based SACCO app for pots, contributions, loans and trust scores.",
    tags: ["React", "Vite", "Supabase"],
    live: "https://pottrust.vercel.app",
    repo: "https://github.com/Ashelycole1/POTTRUST",
  },
  {
    slug: "driveug", title: "DriveUG", featured: false, order: 10, team: false,
    problem: "Renters and car owners lacked a secure, local peer-to-peer rental platform.",
    summary: "Peer-to-peer car rental marketplace with a mobile money roadmap.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    live: "https://driveug.vercel.app",
  },
  {
    slug: "rafiki", title: "Rafiki", featured: false, order: 11, team: false,
    problem: "Youth lacked career guidance in their own languages.",
    summary: "Bilingual career readiness app, built and deployed live in one afternoon.",
    tags: ["React", "Next.js", "Tailwind CSS"],
    live: "https://rafikiapp.vercel.app",
  },
  {
    slug: "accommodateme", title: "AccommodateMe", featured: false, order: 12, team: false,
    problem: "Students found verified accommodation listings tedious and fragmented.",
    summary: "Student housing site with verified listings, a filterable gallery and booking.",
    tags: ["HTML", "CSS", "JavaScript"],          // NOT Next.js/React
    live: "https://accomodateme.vercel.app",
    repo: "https://github.com/Ashelycole1/ACCOMODATE-ME",
  },
  {
    slug: "palg-drip", title: "Palg Drip", featured: false, order: 13, team: false,
    problem: "Local merchants needed simple e-commerce with a cart and local payments.",
    summary: "E-commerce storefront with shopping cart and localized payments.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    live: "https://palgdrip.vercel.app",
  },
];
```

### 3.9 Certifications

Card: issuer, name, date, optional **Verify** link.

```ts
export const certifications: Certification[] = [
  { issuer: "AWS Community", name: "AWS Student Builder Group Leader Badge", date: "October 2026" }, // NEW
  { issuer: "Huawei", name: "HCIA-AI V4.0 (incl. Colombia Training Program)", date: "October 2025" }, // merged
  { issuer: "Huawei", name: "HCIA-Cloud Computing V5.5", date: "October 2025" },
  { issuer: "Huawei", name: "HCIA-Cloud Service V3.5", date: "October 2025" },
  { issuer: "IBM", name: "Systems Analysis Essentials", date: "March 2026" },
  { issuer: "The Linux Foundation", name: "Introduction to Kubernetes (LFS158)" },
  { issuer: "Cyfrin Updraft", name: "Blockchain Basics", date: "July 2026" },
  { issuer: "AfriLabs", name: "Digital Entrepreneurship Skills", date: "March 2025" },
  { issuer: "Coursera", name: "Everyday Excel", date: "September 2025" },
  { issuer: "Kuelimika Kwa Afrika", name: "TODO: certificate name" }, // spelling fixed (was "Kuwaelimika")
];
```

### 3.10 Contact

- Keep: GitHub, LinkedIn, Email, TikTok, X, YouTube.
- Add phone: `+256 767 024 153` (tel: link).
- Replace `/Niwasiima_Ashelycole_CV_2026.pdf` with the November 2026 CV (owner will supply the file; keep the same path or update the link).

### 3.11 SEO

- `<title>`: `Niwasiima Ashelycole — Full Stack Developer`
- Meta description: `Niwasiima Ashelycole, full stack web developer in Kampala building offline-first, AI and mobile money products for East Africa.`
- Open Graph title, description and image.
- JSON-LD `Person` with `jobTitle`, `url`, and `sameAs` (GitHub, LinkedIn).

---

## 4. Page order

1. Hero + Stats
2. **Projects** (moved up)
3. Experience
4. Recognition (new)
5. Stack
6. Certifications
7. Education (new)
8. About
9. Find Me Online

---

## 5. Design rules

- Reuse existing components and tokens; no new fonts or colours.
- Experience tag badges: small pill; `work`, `freelance`, `volunteer`, `leadership`, `community`.
- Project grid: 1 column < 640px, 2 columns ≥ 768px, 3 columns ≥ 1024px (featured may span wider).
- Team badge text: `Team · <role>`; solo badge: `Solo`.
- Buttons: Live (primary), Code (secondary/outline). Hide a button if its URL is missing.
- Accessible: alt text on images, visible focus states, WCAG AA contrast in both themes.

---

## 6. Types

```ts
export type Experience = {
  title: string;
  org: string;
  location?: string;
  start: string;         // "YYYY" or "YYYY-MM"
  end?: string;          // omit = Present
  tag: "work" | "freelance" | "volunteer" | "leadership" | "community";
  bullets: string[];
};

export type Project = {
  slug: string;
  title: string;
  problem: string;
  summary: string;
  tags: string[];
  team: boolean;
  role?: string;         // required when team = true
  live?: string;
  repo?: string;
  featured: boolean;
  order: number;
};

export type Certification = {
  issuer: string;
  name: string;
  date?: string;
  verifyUrl?: string;
};
```

Suggested location: `content/` or `data/` (match the repo's existing convention).

---

## 7. Content rules

- **Never name the AUDITLOGS client.**
- Akili Za Kesho starts **April 2026** everywhere.
- Freelance starts **August 2025**.
- GitHub rank is **63rd**.
- Spell it **Kuelimika Kwa Afrika**.
- Team projects must show my role.
- Don't invent metrics, users or outcomes not stated here.

---

## 8. Done checklist

- [ ] Content moved to typed data files
- [ ] Hero, stats, About and Stack updated
- [ ] Experience rebuilt; Huawei moved to Recognition
- [ ] Education and Recognition sections added
- [ ] All 13 projects present with correct tags, roles and links
- [ ] Certifications cleaned up; AWS badge added; spelling fixed
- [ ] Phone added; resume link points to the new CV
- [ ] SEO metadata and JSON-LD added
- [ ] `npm run build` passes with no type errors
- [ ] No console errors
- [ ] Every Live and Code link opens the right page
- [ ] Checked at 375px, 768px and 1280px, light and dark

## 9. Open items (ask the owner)

- Certificate name for the Kuelimika Kwa Afrika card
- Screenshots for featured projects
- Verify links for certifications (if available)
