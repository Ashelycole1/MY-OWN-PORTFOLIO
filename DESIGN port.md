# DESIGN.md — ashelycole.dev Implementation Spec
### For: AI coding agent (Claude Code or similar)
### Repo: github.com/Ashelycole1/MY-OWN-PORTFOLIO
### Stack: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui

**Scope note:** This spec covers everything through content/interactivity/SEO. **AdSense integration is explicitly excluded from this pass** — do not add ad scripts, ad units, or AdSense-related config. Everything else, including the blog, is in scope.

**How to use this doc:** Each phase is a self-contained unit of work. Complete and verify one phase before starting the next. Don't skip ahead — later phases (especially the blog) assume the case-study data structures from Phase 2 exist.

---

## 0. Assumed repo structure (verify before starting)

```
app/            → routes (App Router)
components/     → shared UI components
lib/            → utilities, data fetchers, constants
public/         → static assets (images, icons)
types/          → shared TypeScript types
components.json → shadcn/ui config
```

If actual structure differs, adapt paths below accordingly but keep the same logical separation (data / components / routes).

---

## Phase 1 — Fixes & Foundation

**Goal:** Fix existing bugs, add technical SEO plumbing, no new features yet.

1. **Fix thumbnail bug**: 4 of 6 project cards currently render the Law Buddy image instead of their own. Locate the project data source (likely `lib/projects.ts` or similar) and:
   - Confirm each project object has a unique `thumbnail` path
   - Confirm the corresponding image file exists in `public/projects/thumbnail/`
   - For any project missing a real screenshot, use a placeholder clearly marked `TODO: replace with real screenshot` rather than silently reusing another project's image
2. **Add `app/sitemap.ts`** — Next.js native sitemap generation, include all static routes plus dynamically generated project and (once it exists) blog routes.
3. **Add `app/robots.ts`** — allow all crawlers, reference the sitemap.
4. **Per-page metadata** — every route should export its own `metadata` (title, description) via Next.js Metadata API, not just rely on the root layout default. Minimum: home, about, each project page, services, contact.
5. **Open Graph + Twitter Card images** — add `opengraph-image` and `twitter-image` file conventions (or dynamic `ImageResponse` generation) for home, each project, and later each blog post.
6. **JSON-LD structured data**:
   - `Person` schema on home/about (name: Niwasiima Ashelycole, jobTitle, worksFor: RENOA, sameAs: GitHub + LinkedIn URLs)
   - `SoftwareApplication` or `CreativeWork` schema per project page
7. **Hero copy update** — replace generic tagline with: *"Software Engineer building offline-first, multilingual, and financial-access tools for East Africa."* Sub-line referencing RENOA and Uganda/Kenya/Tanzania.
8. **Alt text audit** — every `<Image>` needs descriptive alt text, especially project thumbnails.

**Acceptance criteria:** No duplicate thumbnails, `sitemap.xml` and `robots.txt` resolve correctly, Lighthouse SEO score 95+, each page has unique title/description in page source.

---

## Phase 2 — Case Studies

**Goal:** Convert project cards from tag-lists into structured case studies.

1. Extend the project type (likely in `types/project.ts`) to support structured fields:

```typescript
interface Project {
  slug: string;
  name: string;
  thumbnail: string;
  problem: string;       // 1-2 sentences
  constraint: string;    // what made it hard
  build: string[];       // bullet list of what was built
  result?: string;       // metrics if available
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
}
```

2. Populate this for all 6 projects: Law Buddy, Rafiki, EcoFarm, DriveUG, Palg Drip, AccommodateMe. Priority order for writing quality content first: DriveUG, EcoFarm, Law Buddy (strongest regional story), then the rest.
3. Update `app/projects/[slug]/page.tsx` to render the new structure: Problem → Constraint → What I Built → Result → Stack → CTA buttons (Live / Code).
4. Update the project card component on the homepage/projects grid to show a one-line problem statement under the title, not just tech tags.

**Acceptance criteria:** Every project page shows problem/constraint/build/result sections; homepage cards show a one-line hook, not just tags.

---

## Phase 3 — Certifications Section

**Goal:** Add a certifications showcase, referenced from nav and homepage.

1. Create `types/certification.ts`:

```typescript
interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;           // e.g. "2026-03"
  badgeImage: string;      // path in public/certifications/
  verifyUrl?: string;
}
```

2. Create `lib/certifications.ts` (or `.json`) with entries for known credentials — at minimum: Huawei ICT Competition (Cloud Track) Regional Finalist & 3rd Prize, H.E.R. DAO Rust School Cohort 02 acceptance. Leave clear `// TODO: add remaining certifications` markers for entries not yet supplied.
3. Create `components/CertificationsGallery.tsx`:
   - Grid layout (responsive: 2 cols mobile, 3-4 cols desktop)
   - Each cert is a card with badge image, name, issuer, date
   - On hover: subtle lift/scale (Framer Motion `whileHover={{ y: -4, scale: 1.02 }}`)
   - On click: expand to show full details + verify link if present
4. Add a `Certifications` section to the homepage between Experience and Projects, and add "Certifications" to the main nav.

**Acceptance criteria:** Section renders, is keyboard-navigable, verify links open in new tab, no layout shift on load.

---

## Phase 4 — Interactive Project Cards

**Goal:** Make project cards richer without adding WebGL/3D overhead (keep bundle size and Core Web Vitals healthy — this is a portfolio being judged on performance too).

1. **Hover-reveal preview**: on hover, swap the static thumbnail for a second image or short muted looping video (`<video autoPlay muted loop>` lazy-loaded) showing the app in use. Use Framer Motion `AnimatePresence` for the crossfade.
2. **Expandable case study**: clicking "Details" opens a modal/drawer (use shadcn/ui `Dialog` or `Sheet`, already available per `components.json`) showing the full case-study content from Phase 2 without navigating away from the grid.
3. **Live embedded demo**: for projects with public deployments (DriveUG, EcoFarm), add a "Try it live" button that opens the deployed app in a lightbox `<iframe>` (with a fallback "Open in new tab" link, since some hosts block iframe embedding via `X-Frame-Options`).
4. **Process docs**: if a project has supplementary docs (e.g. Velour Salon's DESIGN.md/UPGRADE_PLAN.md-style writeups), add a small collapsible "Process" section linking/rendering them.

**Performance constraint:** Lazy-load all video/iframe content — nothing heavy should load until the card is hovered/clicked. Re-run Lighthouse after this phase; performance score should not regress below 85.

**Acceptance criteria:** Hover preview works on desktop, gracefully degrades to tap-to-reveal on touch devices, modal is accessible (focus trap, Esc to close), no Lighthouse performance regression.

---

## Phase 5 — Interactive Social Cards

**Goal:** Replace the current flat social links with an interactive fanned card layout (reference: attached screenshot — overlapping rotated cards for each platform, centered on a profile photo, straightening/spreading on hover).

1. Create `components/SocialCardStack.tsx`:
   - Each platform (GitHub, LinkedIn, Email/Gmail, WhatsApp if used, plus any others) is a card with brand-colored background, icon, and label
   - Default state: cards fanned/overlapping with slight rotation (alternating positive/negative degrees), profile photo centered in front
   - Hover/interaction: the hovered card straightens and lifts (`rotate: 0, y: -12, scale: 1.05`), others stay fanned — use Framer Motion `whileHover` per card
   - On mobile: fallback to a simple horizontal scroll or stacked list (the fan effect needs cursor hover — don't force a broken touch equivalent, provide a clean simplified layout instead)
   - Each card links out via `<a target="_blank" rel="noopener noreferrer">`
2. Data-drive this from `lib/socials.ts`:

```typescript
interface SocialLink {
  platform: string;
  url: string;
  icon: string;       // icon component reference
  brandColor: string; // hex, for card background
}
```

3. Populate with: GitHub (Ashelycole1), LinkedIn, Email (coleniwasiima@gmail.com), TikTok (@buildwithcole1), X (@ashelycole01), YouTube (@Buildwithcole1).
4. **Live GitHub stats (optional enhancement)**: the GitHub card can fetch public repo/follower count client-side via `https://api.github.com/users/Ashelycole1` (no auth required for public data, but respect GitHub's unauthenticated rate limit — cache the response, don't fetch on every render). Do not attempt live counts for TikTok/X/YouTube — no free public API for that; keep those as static animated cards.

**Acceptance criteria:** Fan animation is smooth (60fps, GPU-accelerated transforms only — `transform`/`opacity`, not layout-triggering properties), works on desktop hover, has a sane non-hover mobile fallback, all links functional.

---

## Phase 6 — Blog

**Goal:** Add `/blog` as the SEO and future-monetization engine. This is the prerequisite for AdSense later, even though AdSense itself isn't in this pass.

1. **Routing**: `app/blog/page.tsx` (index/listing) and `app/blog/[slug]/page.tsx` (individual post). Use MDX (`@next/mdx` or `next-mdx-remote`) so posts can include code blocks and embedded components.
2. **Content source**: local MDX files under `content/blog/*.mdx` with frontmatter:

```yaml
---
title: "Building EcoFarm: Multilingual Agri-Tech for Ugandan Farmers"
date: "2026-08-01"
excerpt: "How EcoFarm supports five Ugandan languages beyond English..."
tags: ["nextjs", "supabase", "agritech", "uganda"]
coverImage: "/blog/ecofarm-cover.png"
---
```

3. **Blog index page**: card grid, most recent first, showing cover image, title, excerpt, date, tags. Add tag filtering if practical.
4. **Blog post page**: rendered MDX content, `Article` JSON-LD schema, OG image generation per post, reading-time estimate, related-posts section (match by tag).
5. **First posts to draft** (content only, not code — flag these as content tasks for the site owner, not agent-generated copy): Velour Salon case study writeup, EcoFarm build log, Vercel free-tier policy post, Huawei ICT Competition writeup, Chainlink meetup recap. The agent should scaffold the MDX files with frontmatter and a content placeholder, not invent the actual post body.
6. **Sitemap update**: extend `app/sitemap.ts` from Phase 1 to include all blog post routes dynamically.
7. **Distribution hook**: add simple share buttons (copy link, share to X) on each post — ties back into the existing TikTok/X/YouTube presence for distribution.

**Acceptance criteria:** `/blog` lists posts correctly, individual posts render MDX with proper typography, each post has unique metadata + OG image + JSON-LD, sitemap includes blog routes, Lighthouse SEO 95+ on blog pages.

---

## Explicitly out of scope for this pass
- AdSense script/config/ad units — do not add
- Backlink outreach, keyword tracking setup — these are manual/ongoing tasks, not code
- Actual blog post prose beyond the first scaffolded placeholders — content is written by the site owner or drafted separately

---

## Suggested execution order for the agent
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6, each as a separate reviewable change (commit/PR per phase). Don't combine phases into one giant diff — smaller reviewable units reduce risk of an unwanted regression slipping through unnoticed.
