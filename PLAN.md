Outcome: a polished, editorial single-page site with smooth soft motion, plus dedicated deep-dive pages for her research and flagship work,
deployable to Vercel.

Decisions (confirmed with user)

- Structure: Single elegant scroll page + dedicated detail pages for research and 1–2 flagship items.
- Hero tone: Warm human headline + a crisp recruiter-legible sub-line.
- Stack: Next.js (App Router) + Tailwind + Framer Motion + Lenis + MDX, deploy on Vercel.
- Imagery: Tasteful placeholders now; real photos/screenshots swapped in later.

Non-goals

- No CMS, no auth, no backend. Static content only.
- No IIT Madras in Education.
- Not matching Satvik's metrics-heavy/terminal aesthetic.

---

Design system

Palette (warm paper, one human accent)
Paper #FBF8F2 warm cream background (never pure white)
Ink #1F1B16 warm near-black text (never pure #000)
Muted #6B635A secondary text, captions, dates
Hairline #E5DFD3 thin rules & dividers
Accent #C2693F terracotta — links, section numbers, underlines
Accent 2 #7E8B6B sage — sparingly: tags, hovers, sustainability cues
Exposed as CSS variables + Tailwind theme tokens.

Type

- Display/headlines: Fraunces (variable, soft + optical-size axes) via next/font.
- Body/UI: Inter for short text; Newsreader for long-form case-study reading.
- Reading column ~680px, body line-height 1.65, large type-scale jumps for magazine rhythm.

Editorial signatures

- Drop caps on About + each case-study opener.
- Pull quotes in large Fraunces italic, accent-colored.
- Margin/footnote annotations in the gutter.
- Numbered sections (01 / Research) with hairline rules.
- Colophon in footer ("Set in Fraunces & Inter. Built with Next.js.").
- Rotating multilingual greeting: Hello · नमस्ते · こんにちは · Hallo.
- Hand-drawn signature SVG near contact.

Soft motion

- Lenis smooth scroll; Framer Motion reveals.
- Enter: opacity 0→1, translateY 16px→0, blur 4px→0, 700ms cubic-bezier(0.16,1,0.3,1), staggered children.
- Hero headline reveals line-by-line behind a clip mask. Subtle image parallax.
- Full prefers-reduced-motion fallback via useReducedMotion() (instant, no transforms).

---

Tech stack & project structure

app/
layout.tsx # fonts, metadata, SmoothScroll provider
page.tsx # home — composes all sections
globals.css # tokens, base editorial styles
work/[slug]/page.tsx # MDX-driven detail pages (research + flagship work)
components/
Nav.tsx # minimal anchor nav (about · work · writing · hello)
Hero.tsx About.tsx Research.tsx Work.tsx Experience.tsx
Skills.tsx Education.tsx Achievements.tsx Leadership.tsx
Writing.tsx Now.tsx Contact.tsx Footer.tsx
SmoothScroll.tsx # Lenis provider
motion/Reveal.tsx # Framer Motion in-view wrapper (reduced-motion aware)
content/
work/federated-learning.mdx
work/on-the-move.mdx
work/kaushal-up.mdx
writing/\*.mdx
lib/
data.ts # typed résumé data: experience, skills, education, achievements, leadership
content.ts # MDX frontmatter loader for work/writing
public/
assets/ # placeholder images (typographic covers)
ishita-cv.pdf # downloadable résumé
tailwind.config.ts

- Structured lists (Experience, Skills, Education, Achievements, Leadership) live as typed objects in lib/data.ts.
- Long-form (Research deep-dive, project case studies, essays) live as MDX in content/, rendered via app/work/[slug]/page.tsx.

---

Information architecture (home scroll order)

Hero → About → 01 Research → 02 Selected Work → 03 Experience → Skills → Education → Achievements → Leadership & Community → Writing → Now → Say
hello + colophon

Detail pages (deep dives, linked from Research/Work):

- /work/federated-learning — research deep-dive (primary, for AI-research recruiters)
- /work/on-the-move — flagship iOS project
- /work/kaushal-up — impact/founder story

Hero copy options (warm line + clear sub-line)

- Headline: "I build technology that makes people feel seen."
- Sub-line: "AI researcher and designer working at the intersection of human-centered & sustainable machine learning. Founder of Kaushal Up."
- (Alt headline: "Curious about the why behind things.")

---

Section content (sourced from résumés; IITM removed)

About — first-person, from her own summary ("curious about the why…", "thoughtful, intuitive, human", "not waiting for perfect to start").
Establishes warmth + the AI/design/impact intersection.

01 Research (featured — top of work)

- Deakin University — Research Intern (Mar 2026 – present, Geelong). Topic TBD — placeholder for her to fill; current role, strong signal.
- Federated Learning in Modern Healthcare — under Dr. Sivashankar G., SRM (Nov 2024 – Apr 2025): privacy-preserving federated-learning pipeline
  in TensorFlow, 91% accuracy on decentralized datasets; explored communication-efficiency vs. data-security trade-offs. → links to
  /work/federated-learning.

02 Selected Work / Projects

- On The Move (iOS, Mar 2025) — Flask, Supabase, MapKit, UIKit, SwiftUI. Vehicle-pooling app for students/professors/professionals: safer,
  smarter, cheaper rides. → /work/on-the-move.
- Lawyer Up (Google Solution Challenge 2024, Feb 2024) — HTML/CSS/JS, Gemini-Pro, Google AI Studio. Legal chatbot improving access to legal
  information.
- Ask Your PDF (Gen AI, Nov 2023) — Python, Streamlit, GPT-3.5, Ada-2, FAISS, LangChain. Upload PDFs and chat with them in real time.

03 Experience

- iOS Developer Intern, Infosys (Apr–May 2025) — led a 10-member team to design & deploy a SwiftUI app; ran Agile SCRUM in Jira. (Part of the
  Apple × Infosys iOS Developer Program, selected from 1000+.)
- Mosaic Digital, HT Media (Jun–Jul 2024) — VCCEdge product dev, UI/UX, SEO, go-to-market.
- BAI Infosolutions (Jun–Jul 2023) — IT + content writing; UI/UX for TaxiVaxi; wrote "Bleisure Travel" blog.

Skills

- Programming: Python, Java, C, C++, Swift, JavaScript, HTML, CSS
- Libraries/Frameworks: TensorFlow, NumPy, Pandas, Matplotlib, React, Next.js, Tailwind, Bootstrap
- Databases: MySQL
- Design (highlighted): Figma, Excalidraw, Adobe Photoshop, Adobe Illustrator, Canva
- Tools: Git/GitHub, Jira, Notion
- Spoken: English (Fluent), Hindi (Native), German (Basic), Japanese (Basic)

Education (IITM excluded)

- SRM Institute of Science and Technology — BTech CSE, spec. in AI & ML (Aug 2022 – May 2026). CGPA 9.57. Founder's Scholarship (75% tuition).
- DPS R.K. Puram — Class XII (CBSE), 86.0%.
- DPS Rohini — Class X (CBSE), 95.2%.

Achievements & Certifications

- iOS Developer Program — Apple × Infosys (selected from 1000+).
- Pre-Incubation Program Cohort 3.0 — IIM Lucknow (ideation, design thinking, product, pitch, finance).
- Artificial Intelligence — IIT Kanpur (supervised/unsupervised ML, deep learning, neural nets).
- Full Stack Web Development — IIT Kanpur (MERN).
- United Nations Young Leaders Programme (SDGs, conference diplomacy, leadership).
- NPTEL: DSA & DAA, Python for Data Science, Programming in Java.
- BSAFE; Energy Within Environmental Constraints; UN Climate Change Pre-incubation Program Cohort 3.0.

Leadership & Community

- Kaushal Up Foundation — Founder (Jun 2024 – present): skill-based learning for underprivileged communities; free sessions (startup mentoring,
  finance, soft skills, music, sports, technical); events incl. book-donation drive, UN SDG Seminar, Start-Up Seminar, teaching drive.
  kaushalup.org → /work/kaushal-up.
- Ramanujan Mathematics Club, SRM — Student Coordinator (Aug 2023 – present): coordinated a 30+ team across multiple events.

  drive. kaushalup.org → /work/kaushal-up.
  - Ramanujan Mathematics Club, SRM — Student Coordinator (Aug 2023 – present): coordinated a 30+ team across multiple events.

  Writing — surfaces the published "Bleisure Travel" piece + space for future essays (MDX).

  Now — short "currently exploring" note (Deakin research, sustainability × AI) — uses her "figuring it out / not waiting for perfect" voice.

  Contact + colophon — email (ishitagoel250@gmail.com), LinkedIn, GitHub (IshitaGoel), downloadable CV; warm sign-off + signature SVG.

  Sustainability × AI thread

  Woven (not bolted on): a sage-accented tag/badge marks sustainability-relevant items — UN Climate pre-incubation, "Energy Within Environmental
  Constraints," UN Young Leaders/SDGs, the UN SDG Seminar, and Kaushal Up's social-impact work — and the hero sub-line + About + Now name the
  focus explicitly so recruiters see it immediately.

  ***

  Build steps
  1.  Scaffold Next.js (App Router, TS) + Tailwind; add Framer Motion, Lenis, MDX deps.
  2.  Wire design tokens (CSS vars + Tailwind theme); load Fraunces/Inter/Newsreader via next/font; base editorial styles in globals.css.
  3.  Build SmoothScroll.tsx (Lenis) + motion/Reveal.tsx (reduced-motion-aware) + Nav.tsx.
  4.  Populate lib/data.ts with the structured content above; build content.ts MDX loader.
  5.  Build sections in scroll order (Hero → … → Contact/Footer), composing them in app/page.tsx.
  6.  Build app/work/[slug]/page.tsx + the three MDX deep-dives (federated-learning, on-the-move, kaushal-up).
  7.  Apply motion (staggered reveals, hero line clip-reveal, image parallax).
  8.  Responsive pass (mobile-first: single column, scaled type, collapsed nav).
  9.  Accessibility: semantic landmarks, focus states, color-contrast check, reduced-motion verified, alt text on placeholders.
  10. SEO/meta: title, description, Open Graph; add public/ishita-cv.pdf + placeholder assets.
  11. npm run build clean; prep for Vercel deploy.

  ***

  Verification
  - npm run dev → walk the full scroll: every section renders with correct résumé content, no IIT Madras in Education, sustainability tags
    present.
  - Click through to all three /work/... detail pages; back-nav works.
  - Resize to mobile (375px) and tablet — layout holds, type scales, nav usable.
  - Toggle OS "reduce motion" → reveals become instant, no transforms/parallax.
  - Keyboard-tab the page → visible focus, logical order; links/CV download work.
  - npm run build succeeds with no type/lint errors; Lighthouse spot-check (a11y + performance) on the home route.

  Open items for Ishita (placeholders until provided)
  - Deakin research topic/blurb.
  - Headshot, project screenshots, NGO photos.
  - Final résumé PDF for download + any GitHub project links.

PROMPT 2

Ishita Goel Portfolio — Facelift v2 (Expressive Editorial)

Context

The v1 site is built and working (Next.js 16 + React 19 + Tailwind v4 + Framer Motion + Lenis + MDX), but it reads "too normal" — the warmth is
there, the wow isn't. This phase is a creative facelift to bring it to a top-1% level with real micro-interactions and showpiece motion, using
shadcn/ui primitives and 21st.dev component patterns alongside bespoke Framer Motion.

Decisions confirmed this session

- Direction: Expressive showpiece (bold, Awwwards-leaning).
- Signature interactions (all four): custom cursor + magnetic elements; cursor-following hover-preview images; scroll choreography; animated hero

* counters.

- Libraries: Blend — shadcn for accessible primitives, a few 21st.dev showpieces, hand-built Framer Motion for signature moments.
- Extras: paper↔ink dark mode, page transitions, intro preloader. (No command palette.)

Guiding principle — expressive but hers. Bold motion stays in her palette and type: warm aurora (terracotta/sage/cream), kinetic Fraunces, film
grain for warmth, springy-but-eased easing — never neon/cyber clichés. Motion must never block reading; content stays legible for research
recruiters.

Integrity guardrail. Counters use ONLY verifiable résumé facts (CGPA 9.57, 1000+ applicants, 91% research accuracy, 30+ team, 4 languages, est.
2024). No invented "people reached" numbers.

Non-goals: don't break SSG; don't regress accessibility; don't add a backend; keep IIT Madras excluded.

---

New dependencies

- next-themes — paper↔ink toggle with no-flash.
- shadcn/ui (Tailwind v4 support): npx shadcn@latest init, then add tooltip, accordion, hover-card (used selectively; signature interactions stay
  bespoke). shadcn pulls Radix + tw-animate-css.
- 21st.dev: adapt patterns for the aurora/shader background, marquee, and text-shimmer; prefer hand-authoring the equivalent for control, falling
  back to npx shadcn add <21st-url> only if it integrates cleanly.
- (framer-motion, lenis already installed; native @next/swc-darwin-arm64 already present.)

---

Design-system changes — app/globals.css

1.  Restructure tokens for runtime theming. Move raw values into :root (light) and .dark (ink) CSS vars, then map them via @theme inline {
    --color-paper: var(--paper); ... } so Tailwind utilities respond to theme at runtime. Add @custom-variant dark (&:where(.dark, .dark \*));.

- Ink theme: bg #16130F/#1B1916, text #FBF8F2, accent terracotta brightened (#D98050), sage #9AA882, hairline #332E27.

2.  Film-grain overlay: fixed, pointer-events-none layer (SVG feTurbulence or tiled PNG) at low opacity; slightly stronger in dark.
3.  Cursor: @media (pointer: fine) → \* { cursor: none } when custom cursor active; keep native cursor on touch.
4.  Add keyframes/utilities: marquee, kinetic headline (variable-font weight transition), clip-reveal helper.
5.  Keep existing .prose-editorial, drop-cap, link-underline.

---

New building blocks (components/)

- cursor/CustomCursor.tsx — pointer-following dot via useMotionValue+useSpring; morphs (scale/label like "view"/"open") over [data-cursor]
  elements; mix-blend optional. Disabled on touch + reduced-motion.
- cursor/Magnetic.tsx — wrapper translating child toward pointer within a radius (spring). Applied to hero CTAs, nav CV, contact links, theme
  toggle.
- cursor/HoverPreview.tsx (+ context provider) — single floating image that follows the cursor; rows register a cover on hover with
  clip-path/scale reveal. Off on touch/reduced-motion.
- motion/ScrollProgress.tsx — top progress rail (useScroll → scaleX), accent-colored.
- motion/ClipReveal.tsx — clip-path: inset() wipe on in-view (images/section openers).
- motion/Counter.tsx — animates 0→value when in view; respects reduced-motion (shows final value).
- HeroBackdrop.tsx — warm animated mesh-gradient blobs (terracotta/sage/cream, blurred, slow drift) + grain; CSS/Framer, transform/opacity only.
  Optional 21st.dev shader behind a flag; default to mesh for performance.
- Preloader.tsx — first-load only (sessionStorage guard): cream panel, rotating greeting (Hello·नमस्ते·こんにちは·Hallo), curtain wipe-up into
  hero; locks scroll briefly; skipped on reduced-motion.
- ThemeToggle.tsx — animated sun/moon or paper/ink swatch (next-themes).
- Marquee.tsx — slow skills/tools marquee, pause-on-hover.
- Providers.tsx — ThemeProvider (next-themes) wrapper.
- shadcn ui/tooltip.tsx, ui/accordion.tsx, ui/hover-card.tsx (restyled to editorial tokens).
- app/template.tsx — route-change transition (Framer fade/slide-up via AnimatePresence/template remount).

---

Section-by-section upgrades

- Hero (Hero.tsx): HeroBackdrop aurora+grain; kinetic headline (char/word stagger + Fraunces variable-weight wave on hover); magnetic CTAs with
  data-cursor; scroll-linked parallax on backdrop.
- By the numbers (new small band after About): real-stat Counters (9.57 · 1000+ · 91% · 30+ · 4 · 2024). Honest labels.
- Research (Research.tsx) & Work (Work.tsx): wire HoverPreview (placeholder covers in Fraunces+gradient until real images), card tilt + accent
  glow on hover, ClipReveal, data-cursor="view". Work becomes a pinned horizontal-scroll track (vertical scroll → x translate) with a mobile
  fallback to vertical stack.
- Skills (Skills.tsx): Marquee of tools + shadcn Tooltip on chips + magnetic lift.
- Achievements (Achievements.tsx): animated reveal grid; optionally shadcn Accordion to group certs; keep sage sustainability markers.
- Contact/Footer (Contact.tsx, Footer.tsx): giant "Ishita" wordmark that reacts to cursor (parallax/skew); magnetic links; keep signature
  flourish.
- Nav (Nav.tsx): add ThemeToggle, magnetic CV, scroll-spy active link, ScrollProgress rail.
- Case-study pages (app/work/[slug]/page.tsx): page-transition entry, ClipReveal on the header, cursor "back" affordance.

---

Page-level wiring — app/layout.tsx

Wrap in Providers (ThemeProvider, suppressHydrationWarning on <html>); mount CustomCursor, ScrollProgress, Preloader, grain overlay; keep
SmoothScroll + Nav.

---

Accessibility & performance guardrails (must-hold)

- Every effect gated by prefers-reduced-motion (cursor, magnetic, hover-preview, backdrop drift, preloader, horizontal scroll, counters → all
  degrade to static/instant).
- Custom cursor, magnetic, hover-preview disabled on touch (pointer: coarse); horizontal work-scroll → vertical stack on small screens.
- Transform/opacity-only animations; will-change sparingly; lazy-mount backdrop; pause offscreen.
- Maintain visible focus-visible rings; preloader and transitions must not trap keyboard focus; toggle reachable.
- Keep pages static (SSG); all effects are client components.
  - Transform/opacity-only animations; will-change sparingly; lazy-mount backdrop; pause offscreen.
  - Maintain visible focus-visible rings; preloader and transitions must not trap keyboard focus; toggle reachable.
  - Keep pages static (SSG); all effects are client components.

  ***

  Files

  Add: components/cursor/{CustomCursor,Magnetic,HoverPreview}.tsx, components/motion/{ScrollProgress,ClipReveal,Counter}.tsx,
  components/{HeroBackdrop,Preloader,ThemeToggle,Marquee,Providers,Stats}.tsx, components/ui/{tooltip,accordion,hover-card}.tsx,
  app/template.tsx.
  Modify: app/globals.css, app/layout.tsx, lib/data.ts (add cover per project/research + stats array),
  components/{Hero,Nav,Research,Work,Skills,Achievements,Contact,Footer}.tsx, app/work/[slug]/page.tsx.

  ***

  Build steps
  1.  Install next-themes; run npx shadcn@latest init and add tooltip accordion hover-card (retry / sandbox-disabled if TLS flakes).
  2.  Refactor globals.css tokens for dark mode (:root/.dark + @theme inline + @custom-variant dark); add grain, cursor-none, marquee/kinetic
      utilities.
  3.  Providers + layout wiring (theme, cursor, progress, preloader, grain).
  4.  Build core interaction primitives: CustomCursor, Magnetic, HoverPreview, ScrollProgress, ClipReveal, Counter.
  5.  Upgrade Hero (backdrop, kinetic type, magnetic) + add Stats band.
  6.  Upgrade Research/Work (hover-preview, tilt, horizontal pinned scroll + mobile fallback), Skills (marquee+tooltip), Achievements,
      Contact/Footer wordmark, Nav (toggle, scroll-spy).
  7.  Preloader + app/template.tsx page transitions.
  8.  Reduced-motion + touch + keyboard guardrail pass across every new effect.
  9.  npm run build clean; serve and verify.

  ***

  Verification
  - npm run build clean (TS/lint); SSG routes still prerender.
  - Serve and walk: cursor morphs over links; magnetic pull on CTAs; hover a project → preview image floats and tracks cursor; scroll progress
    rail fills; Work scrolls horizontally while pinned; counters tick to real values; footer wordmark reacts.
  - Dark mode: toggle flips paper↔ink with no flash on reload; contrast holds in both.
  - Page transition plays navigating Home → /work/... and back.
  - Preloader shows once per session (not on every route change).
  - Reduced-motion ON: cursor/preview/backdrop/preloader/horizontal-scroll/counters all degrade; content fully readable.
  - Touch emulation: custom cursor off, work-scroll vertical, previews off.
  - Keyboard: focus rings visible, toggle reachable, no focus trap; 375px mobile layout holds.

  Open items / placeholders
  - Hover-preview + project covers use designed placeholders (Fraunces + gradient) until real screenshots/headshot arrive.
  - Deakin research blurb still TBD; public/ishita-cv.pdf currently her existing résumé.
  - Default hero backdrop = CSS mesh-gradient (perf-safe); swap to a 21st.dev shader later if she wants more drama.
