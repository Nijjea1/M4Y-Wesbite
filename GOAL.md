# Medicine4Youth — Production Readiness Goal File

> **How to use:** Paste this file into a new Claude Code session to resume work.
> Claude will execute all open tasks in priority order, checking each off as it goes.

---

## HARD RULES — Read Before Touching Anything

1. **NEVER edit `index.html`** for any reason. All changes — CSS, meta tags, styles, scripts — must live in React `.jsx` files only.
2. **All CSS changes** go into `src/styles.jsx` as a `GlobalStyles` component that injects a `<style>` tag (see setup below).
3. **All SEO meta tags** are injected via a `MetaTags` React component using `useEffect` + `document.head` (see setup below).
4. **Never commit** to git unless the user explicitly asks.
5. **Never switch** to a build tool (Vite/Webpack) — the CDN + Babel setup is intentional.
6. **Never add** npm dependencies without asking the user first.
7. **Do not redesign** existing layouts — improve, polish, and fix. Preserve all existing animations.

---

## Project Context

**Project:** Medicine4Youth — a Canadian youth medical education nonprofit website.

**Stack (CDN-loaded, no build step):**
- React 18.3.1 (development build) loaded from unpkg CDN
- Babel standalone 7.29.0 for in-browser JSX transpilation
- Framer Motion 10.18.0 + GSAP 3.12.5 for animations
- Leaflet 1.9.4 (actually used — ChaptersPage renders a full interactive map)
- Custom hash-based router (`#/about`, `#/branches/dentistry`, etc.)
- Hosted on Vercel (static files), dev server: `npx serve . -l 3000`

**Key files — only edit these:**
- `src/primitives.jsx` — shared components: Button, Card, Reveal, Counter, PH, I (icons), FAQ, SectionHead, CTABand, Router, useDarkMode
- `src/layout.jsx` — Nav, Footer, PageHero
- `src/data.jsx` — all static data: BRANCHES, SPONSORS, CHAPTERS, EVENTS, PAPERS, NAV, SITE_PHOTOS, ORG_LOGO
- `src/home.jsx` — homepage (ECG animation, kinetic headlines, stats, etc.)
- `src/pages.jsx` — AboutPage, ProgramsPage, BranchesPage, SRPPage, SponsorsPage, ChaptersPage, ContactPage, PhilippinesSection, PaperBooklet
- `src/branches.jsx` — individual branch page template
- `src/app.jsx` — router switch, Error Boundary
- `src/styles.jsx` — **create this file** for all global CSS injection (does not exist yet)
- `sitemap.xml` — create at project root
- `robots.txt` — create at project root
- `vercel.json` — create/update at project root (not an HTML file, safe to edit)

**Existing design tokens (light mode, defined in index.html `<style>` — do not move them, only ADD new tokens via `src/styles.jsx`):**
- Colors: `--g900:#1f3a30` → `--g50:#F1FBE7`, `--cream`, `--paper`, `--ink`, `--ink2`, `--mute`, `--line`, `--line2`
- Fonts: `--f-display` (Roboto), `--f-body` (Nunito Sans), `--f-mono` (JetBrains Mono)
- Spacing: 8px grid, `--r-sm`, `--r`, `--r-lg`, `--r-xl`, `--sh-1`, `--sh-2`, `--sh-3`
- Component classes: `.btn`, `.card`, `.pill`, `.eyebrow`, `.hero`, `.tabs`, `.reveal`, `.stack`, `.grid`, `.container`, `.section`
- Dark mode toggle: `useDarkMode()` hook sets `document.documentElement.setAttribute("data-theme", "dark")` — already wired

---

## Dark Mode Design System (ui-ux-pro-max Guidelines)

The site already has a `[data-theme="dark"]` selector and a toggle. The dark mode tokens are **incomplete and broken**. All dark mode CSS must be added to `src/styles.jsx` as a `GlobalStyles` component.

### Complete Dark Mode Token Set

Add these tokens inside `[data-theme="dark"]` in `src/styles.jsx`:

```css
[data-theme="dark"] {
  /* Greens — inverted luminance, desaturated */
  --g900: #c8e6d0;
  --g800: #a8d5b5;
  --g600: #87b783;
  --g500: #6a9e6a;
  --g300: #3d6b4a;
  --g100: #1e3d28;
  --g50:  #162b1e;

  /* Surfaces */
  --cream:  #0e1912;   /* page background */
  --paper:  #141f18;   /* card background */

  /* Text */
  --ink:    #e8f5ee;   /* primary — 15:1 contrast on --cream */
  --ink2:   #9fbfa9;   /* secondary — 5.5:1 */
  --mute:   #5a7a64;   /* disabled/caption — 3.1:1 */

  /* Borders */
  --line:   #1e3028;
  --line2:  #263d30;

  /* Shadows — stronger on dark */
  --sh-1: 0 1px 3px rgba(0,0,0,.35), 0 1px 2px rgba(0,0,0,.25);
  --sh-2: 0 6px 18px -8px rgba(0,0,0,.55), 0 2px 6px rgba(0,0,0,.3);
  --sh-3: 0 30px 60px -30px rgba(0,0,0,.7), 0 10px 20px -10px rgba(0,0,0,.4);
}
```

### Dark Mode Component Rules

Apply these patterns when fixing dark mode in each component:

**Cards** — use `background: var(--paper)` not hardcoded `#fff`. Border: `1px solid var(--line)`.

**Nav** — background should be `var(--cream)` with `border-bottom: 1px solid var(--line)`. Logo and links use `var(--ink)`.

**Hero sections** — `.hero-bg` overlay uses `background: var(--g900)` at reduced opacity in dark mode. Text must hit `var(--ink)`.

**Forms / inputs** — `background: var(--paper)`, border `var(--line)`, text `var(--ink)`, placeholder `var(--mute)`. Focus ring: `2px solid var(--g500)`.

**CTABand** (dark green band) — already dark, but check that text contrast is `≥4.5:1` in dark mode too.

**Footer** — already dark green, no change needed. Verify link contrast.

**Pills** `.pill.sage` dark mode: `background: rgba(135,183,131,.12)`, border `rgba(135,183,131,.25)`, text `var(--g800)`.

**Pills** `.pill.deep` dark mode: `background: rgba(31,58,48,.4)`, border `rgba(135,183,131,.2)`, text `var(--g300)`.

**Buttons** `.btn-primary` dark mode: `background: var(--g500)`, text `var(--g900)` (dark on light green — readable).

**Buttons** `.btn-ghost` dark mode: border `var(--line2)`, text `var(--ink)`.

---

## Mobile Responsiveness System (ui-ux-pro-max Guidelines)

### Breakpoints (add to `src/styles.jsx`)

```css
/* Mobile-first breakpoints */
/* xs: 0–479px  (small phones) */
/* sm: 480–767px (large phones) */
/* md: 768–1023px (tablets) */
/* lg: 1024–1239px (small desktop) */
/* xl: 1240px+ (large desktop — matches --max: 1240px) */
```

### Touch & Spacing Rules

- **Minimum tap target:** 44×44px on all buttons, links, nav items, tab items
- **Touch spacing:** 8px minimum gap between adjacent touch targets
- **Mobile body font:** minimum 16px (avoids iOS auto-zoom on inputs)
- **Input height:** minimum 48px on mobile
- **Container padding:** `clamp(16px, 5vw, 28px)` on mobile, `28px` on desktop

### Known Mobile Issues to Fix

All fixes go in the relevant `.jsx` file using inline styles or JSX-injected CSS:

1. **Nav:** On mobile (`≤760px`), nav links are hidden and hamburger shows — this works. Fix: hamburger touch target must be `44×44px` minimum. Verify `setMobileOpen` button has padding to hit 44px.
2. **Hero headings:** `font-size: clamp(32px, 5vw, 64px)` — verify `clamp` floor is `32px` not smaller on the `ProgramsPage` and `BranchesPage` heroes.
3. **SRP stats grid:** `gridTemplateColumns: "repeat(4,1fr)"` — must collapse to `repeat(2,1fr)` at `≤600px` and `repeat(1,1fr)` at `≤400px`. Add responsive inline style or JSX media query.
4. **Two-col grids:** `.two-col-grid` breaks to 1 column at `≤760px` (already in CSS) — verify all instances are using this class and not hardcoded grids.
5. **PaperBooklet:** `.booklet-wrapper` grid — must stack vertically at `≤700px`. Verify `.booklet-left` and `.booklet-right` each get `width: 100%`.
6. **ContactPage:** `.contact-layout` grid must be single column at `≤760px`. Verify the form card doesn't overflow.
7. **BranchScrollSection:** The 3D scroll-tilt card — on mobile the `perspective` effect can cause visual glitches. Reduce `rotateX` range to `[8, 0]` on screens `≤600px`.
8. **Footer grid:** `.footer-grid` at `≤560px` — must be 1 column. Verify this is working.
9. **ChaptersMap:** The Leaflet map `height: 480px` — reduce to `height: 300px` at `≤560px` via JSX inline style using a `useWindowWidth` hook or a CSS class in `src/styles.jsx`.
10. **Programs tabs:** `.tabs` on mobile — ensure tab text doesn't overflow. Use `font-size: 13px` at `≤480px`.

---

## Open Tasks (execute in order)

### SETUP — Create `src/styles.jsx` (do this first, everything else depends on it)

- [ ] **SETUP-1:** Create `src/styles.jsx` with a `GlobalStyles` component that renders a `<style>` tag. This component is mounted once in `src/app.jsx` inside `<RouterProvider>`, above `<Nav/>`. Structure:

```jsx
function GlobalStyles() {
  return (
    <style>{`
      /* === DARK MODE TOKENS === */
      [data-theme="dark"] { ... }

      /* === REDUCED MOTION === */
      @media (prefers-reduced-motion: reduce) { ... }

      /* === MOBILE RESPONSIVE FIXES === */
      @media (max-width: 600px) { ... }

      /* === SKIP LINK === */
      .skip-link { ... }
    `}</style>
  );
}
Object.assign(window, { GlobalStyles });
```

Then in `src/app.jsx`, add `<GlobalStyles/>` as the very first child of the returned JSX (before `<Nav/>`).

Also add `<script type="text/babel" src="./src/styles.jsx"></script>` in `index.html` — **this is the one and only exception** to the "never touch index.html" rule, done exactly once to wire up the new file. Place it immediately before `src/primitives.jsx`.

- [ ] **SETUP-2:** Add `id="main-content"` to the `<main>` element in `src/app.jsx`. Add a skip-to-main link as the very first element rendered (before `<Nav/>`):
```jsx
<a href="#main-content" className="skip-link">Skip to main content</a>
```
Style `.skip-link` in `GlobalStyles`:
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 12px 20px;
  background: var(--g900);
  color: #fff;
  border-radius: 0 0 8px 8px;
  font-weight: 700;
  z-index: 9999;
  transition: top .15s;
}
.skip-link:focus { top: 0; }
```

---

### P0 — Dark Mode (Critical — Many Pages Are Broken in Dark Mode)

All fixes go in the named React file using inline styles or additions to `GlobalStyles` in `src/styles.jsx`.

- [ ] **DM-1:** In `src/styles.jsx` `GlobalStyles`, add the complete dark mode token set from the "Dark Mode Design System" section above.

- [ ] **DM-2:** In `src/styles.jsx`, add dark mode overrides for base element classes:
```css
[data-theme="dark"] .card { background: var(--paper); border-color: var(--line); }
[data-theme="dark"] body { background: var(--cream); color: var(--ink); }
[data-theme="dark"] input,
[data-theme="dark"] select,
[data-theme="dark"] textarea {
  background: var(--paper);
  border-color: var(--line2);
  color: var(--ink);
}
[data-theme="dark"] input::placeholder { color: var(--mute); }
[data-theme="dark"] .btn-primary { background: var(--g500); color: #0e1912; }
[data-theme="dark"] .btn-ghost { border-color: var(--line2); color: var(--ink); }
[data-theme="dark"] .pill { background: rgba(135,183,131,.1); border-color: var(--line2); color: var(--g800); }
[data-theme="dark"] .pill.sage { background: rgba(135,183,131,.12); border-color: rgba(135,183,131,.22); color: var(--g800); }
[data-theme="dark"] .pill.deep { background: rgba(31,58,48,.5); border-color: rgba(135,183,131,.2); color: var(--g300); }
[data-theme="dark"] .eyebrow { color: var(--g600); }
[data-theme="dark"] hr, [data-theme="dark"] .divider { border-color: var(--line); }
```

- [ ] **DM-3:** Fix the Nav in `src/layout.jsx` for dark mode:
  - The `<header className="nav">` — confirm it uses `background: var(--cream)` and `border-bottom: 1px solid var(--line)` (these are CSS class styles; if hardcoded, override with inline style that reads the CSS var).
  - The mobile menu panel uses `background:"var(--cream)"` — already correct.
  - Nav links: ensure they read `color: var(--ink)` via their CSS class.

- [ ] **DM-4:** In `src/pages.jsx`, fix cards with hardcoded `background: "#fff"` — replace every instance with `background: "var(--paper)"`. Search for `background:"#fff"`, `background: "#fff"`, `background:"white"`, `backgroundColor:"#ffffff"`, `background:"#ffffff"`.

- [ ] **DM-5:** In `src/pages.jsx` and `src/branches.jsx`, fix all hardcoded text colors that won't work on dark backgrounds:
  - `color: "var(--ink2)"` — correct, keep
  - `color: "#121A16"` or `color: "#1f3a30"` — replace with `color: "var(--g900)"` (which is light in dark mode)
  - Any `color: "#c3d2c7"` inside green-background sections — keep (already on dark bg)
  - In `SRPPage` stats section (`background: "var(--g900)"` band) — this section has `color: "#ffffff"` text which is correct since the band is always dark.

- [ ] **DM-6:** In `src/pages.jsx` PaperBooklet component:
  - Left page: `background: "var(--paper)"` not hardcoded white
  - Right page: `background: "var(--paper)"`
  - Paper list buttons: `background: i===page ? "var(--g50)" : "transparent"` — in dark mode `var(--g50)` is `#162b1e`, which is correct.
  - Abstract box: `background: "var(--g50)"` — correct.

- [ ] **DM-7:** In `src/pages.jsx` SponsorsPage, the sponsor card logo area uses `background: "var(--g50)"` — correct. The sponsor card body uses `background: "#fff"` — change to `background: "var(--paper)"`.

- [ ] **DM-8:** In `src/pages.jsx` ContactPage, the form card uses `background` inherited from `.card` — should be fine if DM-2 is done. Check that all form field labels use `color: "var(--ink)"` and error messages use `color: "#dc2626"` (red — confirm this is legible on dark bg by also adding a dark mode override: `[data-theme="dark"] .field-error { color: #f87171; }`).

- [ ] **DM-9:** In `src/home.jsx`, audit the homepage for dark mode:
  - The ECG/hero section — uses deep green backgrounds, should be fine.
  - Any stat cards or feature cards using `background: "#fff"` or `background: "var(--paper)"` — ensure `var(--paper)` is used.
  - Kinetic headline text — must use `var(--ink)` not hardcoded dark color.
  - Any white/cream inline backgrounds need `var(--cream)` or `var(--paper)`.

- [ ] **DM-10:** In `src/branches.jsx` (branch page template), audit for dark mode:
  - Branch hero section — typically uses the branch accent color, fine.
  - Content sections with white cards — replace `background: "#fff"` with `var(--paper)`.
  - Stat boxes — same treatment.
  - Publications/event cards — same.

---

### P0 — SEO (All via React — No HTML Edits)

- [ ] **SEO-1:** In `src/primitives.jsx`, add a `MetaTags` component that uses `useEffect` to imperatively update `document.head`. It should accept `title`, `description`, `ogImage`, `canonicalPath` props. On mount and update, it sets:
  - `document.title`
  - `<meta name="description">` (create if missing, update content)
  - `<meta property="og:title">`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`
  - `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
  - `<link rel="canonical">` href = `https://medicine4youth.ca` + canonicalPath
  
  Export via `Object.assign(window, { MetaTags })`.

- [ ] **SEO-2:** In `src/app.jsx`, add a route-to-meta mapping object and render `<MetaTags>` at the top of the returned JSX (after `<GlobalStyles/>`) with the correct props for the current route. Use these values:
  - `/` → title: "Medicine4Youth | Student-Led Medical Education", description: "Medicine4Youth is a Canadian nonprofit empowering youth through accessible medical education, research programs, and specialty healthcare branches."
  - `/about` → title: "About | Medicine4Youth", description: "Learn about Medicine4Youth — a CRA-registered Canadian nonprofit founded by students, mentored by clinicians."
  - `/programs` → title: "Programs | Medicine4Youth", description: "Summer Research Program, Healthcare Bowl, Healthcare Horizons, and more — every M4Y program in one place."
  - `/branches` → title: "Branches | Medicine4Youth", description: "Nine specialty branches spanning neuroscience, dentistry, pharmacy, surgery, optometry, and more."
  - `/srp` → title: "Summer Research Program | Medicine4Youth", description: "A 12-week mentored research program with real outputs, a closing symposium, and a publication pipeline."
  - `/sponsors` → title: "Sponsors & Partners | Medicine4Youth", description: "Member discount codes and partner benefits from Medicine4Youth's sponsor network."
  - `/chapters` → title: "Chapters | Medicine4Youth", description: "23 university chapters across Canada. Find yours or start one at your institution."
  - `/contact` → title: "Join & Contact | Medicine4Youth", description: "Become a Medicine4Youth member, apply to a chapter, or get in touch with the team."
  - All → ogImage: `https://medicine4youth.ca/assets/medicine4youth-logo.png`

- [ ] **SEO-3:** Create `sitemap.xml` at project root listing all 8 canonical pages with `<loc>https://medicine4youth.ca/</loc>` etc. Use today's date as `<lastmod>`. Priority: home=1.0, main pages=0.8, subpages=0.6.

- [ ] **SEO-4:** Create `robots.txt` at project root:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://medicine4youth.ca/sitemap.xml
  ```

- [ ] **SEO-5:** In `src/primitives.jsx`, add JSON-LD Organization schema injection inside `MetaTags` via a `<script type="application/ld+json">` tag inserted into `document.head` on mount. Schema:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Medicine4Youth",
    "url": "https://medicine4youth.ca",
    "logo": "https://medicine4youth.ca/assets/medicine4youth-logo.png",
    "contactPoint": { "@type": "ContactPoint", "email": "Presidents@medicine4youth.ca" },
    "sameAs": [
      "https://www.instagram.com/medicine4youth/",
      "https://www.linkedin.com/company/medicine4youth/"
    ]
  }
  ```

---

### P0 — UI Polish (Visible Improvements Across All Pages)

These are the highest-impact visual fixes. All edits in the named `.jsx` file.

- [ ] **UI-1:** In `src/layout.jsx` Nav — ensure the `<header>` has a `backdrop-filter: blur(12px)` and `background: rgba(var(--cream-rgb), 0.88)` for a frosted glass effect. Since CSS vars can't be used in rgba directly, add a `--cream-rgb` token to `GlobalStyles`:
  ```css
  :root { --cream-rgb: 251,249,244; }
  [data-theme="dark"] { --cream-rgb: 14,25,18; }
  ```
  Then in Nav inline style: `background: "rgba(var(--cream-rgb), 0.92)"` — **wait, CSS vars don't interpolate into rgba in inline styles.** Instead, add a CSS class `.nav-glass` to `GlobalStyles`:
  ```css
  .nav-glass {
    background: rgba(251,249,244,.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
  }
  [data-theme="dark"] .nav-glass {
    background: rgba(14,25,18,.92);
  }
  ```
  Apply `className="nav nav-glass"` to the `<header>` in `src/layout.jsx`.

- [ ] **UI-2:** In `src/layout.jsx` Footer — the footer external links (Instagram, LinkedIn) are missing `target="_blank" rel="noopener noreferrer"` on the mail link. Add to the email `<a>` tag. Also add a visually-hidden screen reader hint "(opens in new tab)" to external links:
  ```jsx
  <span style={{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0,0,0,0)"}}>
    (opens in new tab)
  </span>
  ```

- [ ] **UI-3:** In `src/pages.jsx` ContactPage — replace the current CSV-download form submission with a real email submission using the `fetch` API to a Formspree endpoint. Implementation:
  - Change `handleSubmit` to async, fetch POST to `https://formspree.io/f/REPLACE_WITH_REAL_ID`
  - Add `const [submitting, setSubmitting] = useState(false)` and `const [error, setError] = useState(null)`
  - Submit button shows "Sending…" with `disabled` while `submitting`
  - On success: `setSubmitted(true)` — show existing success screen
  - On failure: `setError("Something went wrong. Please try again.")` — show error below button with `role="alert"`
  - Note for user: replace `REPLACE_WITH_REAL_ID` in the Formspree URL with your actual form ID from formspree.io

- [ ] **UI-4:** In `src/pages.jsx` ContactPage form — add client-side validation before submission:
  - First name: required, trim, min 2 chars
  - Last name: required, trim, min 2 chars  
  - Email: required, matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - School: optional
  - Add `const [errors, setErrors] = useState({})` 
  - Show inline error below each failing field: `<p role="alert" style={{color:"var(--error)",fontSize:12.5,marginTop:4}}>{errors.first}</p>`
  - Add `--error: #dc2626` to `:root` and `[data-theme="dark"] { --error: #f87171; }` in `GlobalStyles`

- [ ] **UI-5:** In `src/pages.jsx` Programs page tabs — upgrade to full accessible tab component:
  - Add `role="tablist"` to the tabs container div
  - Each tab: `role="tab"`, `aria-selected={filter===t}`, `id={"tab-"+t}`, `aria-controls={"panel-"+t}`
  - The events grid div: `role="tabpanel"`, `id={"panel-"+filter}`, `aria-labelledby={"tab-"+filter}`
  - Add keyboard handler: `onKeyDown` on tabs container — left/right arrow keys move focus and select tab

- [ ] **UI-6:** In `src/layout.jsx` Nav mobile menu button — add `aria-expanded={mobileOpen}` and `aria-controls="mobile-nav"`. Add `id="mobile-nav"` to the mobile panel div.

- [ ] **UI-7:** In `src/primitives.jsx` icons `I` object — add `aria-hidden="true"` to every SVG. These are purely decorative; screen readers should skip them. The icon wrappers that ARE labelled (like the close button in Nav) already have `aria-label` on the button, so the SVG inside should be `aria-hidden`.

---

### P1 — Accessibility

- [ ] **A11Y-1:** In `src/styles.jsx` `GlobalStyles`, add the global `prefers-reduced-motion` block:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

- [ ] **A11Y-2:** In `src/layout.jsx`, add `aria-label="Main navigation"` to the `<nav>` element and `aria-label="Site footer"` to the `<footer>` element.

- [ ] **A11Y-3:** In `src/primitives.jsx` `FAQ` component — the toggle button is missing `aria-expanded`. Add `aria-expanded={open === i}` to the `<button>` and `id={"faq-btn-"+i}`. Add `role="region"` and `aria-labelledby={"faq-btn-"+i}` to the collapsible `<div>`.

- [ ] **A11Y-4:** In `src/primitives.jsx` `PH` component — ensure `alt` is never undefined. If `alt` is explicitly passed as `""` (empty string), keep it empty (decorative). If `alt` is not passed and `label` is present, use `label` as the alt. Current logic is correct (`alt={alt != null ? alt : label}`) — verify it handles `alt=""` correctly without falling back to `label`.

---

### P1 — Mobile Responsiveness

All fixes in `src/styles.jsx` `GlobalStyles` or as inline style adjustments in the named component.

- [ ] **MOB-1:** In `src/styles.jsx`, add responsive overrides:
  ```css
  /* SRP stats — collapse from 4-col to 2-col to 1-col */
  @media (max-width: 600px) {
    .srp-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (max-width: 400px) {
    .srp-stats-grid { grid-template-columns: 1fr !important; }
  }
  ```
  In `src/pages.jsx` SRPPage, add `className="srp-stats-grid"` to the 4-column stats div.

- [ ] **MOB-2:** In `src/styles.jsx`, add:
  ```css
  /* Chapters map height */
  @media (max-width: 560px) {
    .leaflet-container { height: 300px !important; }
  }
  /* Programs tabs font shrink */
  @media (max-width: 480px) {
    .tabs .tab { font-size: 13px; padding: 8px 12px; }
  }
  /* PaperBooklet stack on mobile */
  @media (max-width: 700px) {
    .booklet-wrapper { grid-template-columns: 1fr !important; }
    .booklet-left { border-right: none !important; border-bottom: 1px solid var(--line); }
  }
  /* Nav mobile touch target */
  .mobile-menu-btn { min-width: 44px; min-height: 44px; }
  .theme-toggle-btn { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; }
  ```

- [ ] **MOB-3:** In `src/pages.jsx` `BranchScrollSection`, wrap the `rotateX` framer motion in a check: if `window.innerWidth <= 600`, use `rotate: [4, 0]` and `scale: [1.01, 1]` instead of `[14, 0]` and `[1.04, 1]`. Use a `useMemo` with a `window.innerWidth` check (no resize listener needed — it's set on first render).

- [ ] **MOB-4:** In `src/styles.jsx`, add touch-action optimization to all interactive elements:
  ```css
  .btn, .tab, .pill[role="button"], .card a { touch-action: manipulation; }
  ```

- [ ] **MOB-5:** In `src/pages.jsx` ContactPage, ensure form inputs have `font-size: 16px` minimum to prevent iOS auto-zoom. Add to `GlobalStyles`:
  ```css
  @media (max-width: 767px) {
    input, select, textarea { font-size: 16px !important; }
  }
  ```

---

### P2 — Error Handling

- [ ] **ERR-1:** In `src/app.jsx`, add a React Error Boundary class component above the router. Show fallback: centered M4Y logo + heading "Something went wrong." + paragraph "Please refresh the page." + a reload button. Use design system tokens in inline styles.

- [ ] **ERR-2:** The 404 fallback already exists in `src/app.jsx` (the `else page = <div>Page not found</div>` case). Upgrade it: add the `PageHero` eyebrow "404", title "Page not found.", blurb "The page you're looking for doesn't exist.", and a `<Link to="/" className="btn btn-primary">Back to home</Link>`.

---

### P2 — Security

- [ ] **SEC-1:** Create `vercel.json` at project root with security headers:
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ]
  }
  ```

---

### P3 — Cleanup & Polish

- [ ] **CLEAN-1:** In `src/app.jsx`, the BioEng4Youth `window.location.replace()` redirect — add a 600ms loading screen before it fires. Show centered M4Y logo + "Redirecting to BioEng4Youth…" text in a full-screen div using `var(--cream)` background and `var(--ink)` text.

- [ ] **CLEAN-2:** Delete `assets/branch-logos/psych.png` — orphaned file, no branch references it.

- [ ] **CLEAN-3:** In `src/layout.jsx` Footer, verify the copyright year is `2026` (already present as "© 2026"). Update `Site v1.0` → `Site v2.0` to reflect the dark mode overhaul.

- [ ] **CLEAN-4:** In `src/primitives.jsx`, the `CTABand` component renders `I.arrow` without `aria-hidden`. Add `aria-hidden="true"` to the arrow icon render call since it's decorative inside a labelled button.

---

## Definition of Done

A task is **done** when:
1. The file is saved
2. The change does not break any existing page in light mode OR dark mode
3. No new console errors are introduced
4. On a 375px wide viewport (small iPhone), no horizontal scroll appears

**Site is production ready** when all P0 tasks (SETUP, Dark Mode, SEO, UI Polish) and all P1 tasks are complete.

---

## Notes for Claude — Architecture Reminders

- **GlobalStyles** renders a literal `<style>` tag as a React element — this is a valid React pattern and how CSS-in-JS libraries work under the hood. It is NOT a hack.
- **MetaTags** uses `useEffect` to imperatively write to `document.head` — this is the standard pattern for meta tag management without React Helmet.
- The `Object.assign(window, {...})` at the bottom of each `.jsx` file is how components are shared between files in this no-build setup (no `import`/`export`). Always add new exported components to the `Object.assign` call at the bottom of their file.
- The `PH` component in `src/primitives.jsx` is a smart image component with fallback — always use it instead of bare `<img>` tags.
- The `Reveal` component wraps elements with IntersectionObserver-based scroll reveals — use it for any new content sections.
- Branch pages are generated from the `BRANCHES` array in `src/data.jsx` — to add/modify branch content, edit that array.
- `window.Motion` is how Framer Motion is accessed (`const { motion, useScroll, useTransform } = window.Motion || {}`). Always guard with `|| {}`.
- CSS class styles (`.card`, `.btn`, etc.) are defined in `index.html`'s `<style>` block and cannot be moved. Only ADD new CSS via `src/styles.jsx`. Do not duplicate existing class definitions.
