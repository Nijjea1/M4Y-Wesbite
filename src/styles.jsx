/* GlobalStyles — all CSS additions live here; index.html <style> block is read-only */

function GlobalStyles() {
  return (
    <style>{`
      /* ============================================================
         EXTRA ROOT TOKENS
         ============================================================ */
      :root {
        --cream-rgb: 251,249,244;
        --error: #dc2626;
        --surface: var(--paper);
      }

      /* ============================================================
         DARK MODE TOKEN OVERRIDES
         ============================================================ */
      [data-theme="dark"] {
        --cream-rgb: 10,20,16;
        --error: #f87171;

        /* ── Brand greens (vivid for dark surfaces) ── */
        --g900: #c8ecd8;     /* near-white green — text emphasis    */
        --g800: #56d47e;     /* vibrant primary action              */
        --g600: #43bd6a;     /* button hover / active               */
        --g500: #35a558;     /* focus rings, interactive accents    */
        --g300: #3d7a56;     /* large decorative text, subtle tint  */
        --g100: #132a1e;     /* very subtle bg tint                 */
        --g50:  #0c1913;     /* slight zebra tint (vs cream)        */

        /* ── Surfaces (2 distinct elevation levels) ── */
        --cream:  #0a1410;   /* base page background                */
        --paper:  #101c16;   /* card background (+1 elevation)      */

        /* ── Text ── */
        --ink:    #eaf5ee;   /* primary  — ~14:1 on cream           */
        --ink2:   #9ec5b0;   /* secondary — ~5.2:1 on cream         */
        --mute:   #5d8a73;   /* muted — ~3:1 on cream               */

        /* ── Borders ── */
        --line:   #182e22;   /* subtle separators                   */
        --line2:  #284c3a;   /* visible card borders                */

        /* ── Shadows — rich depth on dark ── */
        --sh-1: 0 1px 3px rgba(0,0,0,.5), 0 1px 2px rgba(0,0,0,.35);
        --sh-2: 0 6px 20px -8px rgba(0,0,0,.7), 0 2px 8px rgba(0,0,0,.45);
        --sh-3: 0 30px 60px -30px rgba(0,0,0,.85), 0 10px 24px -10px rgba(0,0,0,.55);
      }

      /* ============================================================
         DARK MODE — BASE ELEMENTS
         ============================================================ */
      [data-theme="dark"] body { background: var(--cream); color: var(--ink); }
      [data-theme="dark"] h1,
      [data-theme="dark"] h2,
      [data-theme="dark"] h3,
      [data-theme="dark"] h4 { color: var(--ink); }

      /* ── Cards ── */
      [data-theme="dark"] .card {
        background: var(--paper);
        border-color: var(--line2);
        box-shadow: var(--sh-1);
      }
      [data-theme="dark"] .card:hover {
        background: #142219;
        border-color: var(--g500);
        box-shadow: var(--sh-2);
      }

      /* ── Forms ── */
      [data-theme="dark"] input,
      [data-theme="dark"] select,
      [data-theme="dark"] textarea {
        background: #0d1814;
        border-color: var(--line2);
        color: var(--ink);
      }
      [data-theme="dark"] input::placeholder,
      [data-theme="dark"] textarea::placeholder { color: var(--mute); }
      [data-theme="dark"] .field input:focus,
      [data-theme="dark"] .field select:focus,
      [data-theme="dark"] .field textarea:focus {
        border-color: var(--g500);
        box-shadow: 0 0 0 4px rgba(53,165,88,.18);
      }
      [data-theme="dark"] .field label { color: var(--ink2); }

      /* ── Buttons ── */
      [data-theme="dark"] .btn-primary {
        background: var(--g800);
        color: #071009;
      }
      [data-theme="dark"] .btn-primary:hover {
        background: var(--g600);
        box-shadow: 0 8px 28px -8px rgba(86,212,126,.32);
      }
      [data-theme="dark"] .btn-ghost {
        border-color: var(--line2);
        color: var(--ink);
      }
      [data-theme="dark"] .btn-ghost:hover {
        background: var(--g100);
        border-color: var(--g500);
        color: var(--ink);
      }
      [data-theme="dark"] .btn-cream {
        background: var(--paper);
        color: var(--ink);
        border-color: var(--line2);
      }
      [data-theme="dark"] .btn-cream:hover {
        background: #142219;
        border-color: var(--g500);
      }

      /* ── Pills ── */
      [data-theme="dark"] .pill {
        background: rgba(20,44,32,.65);
        border-color: var(--line2);
        color: var(--ink2);
      }
      [data-theme="dark"] .pill.sage {
        background: rgba(53,165,88,.1);
        border-color: rgba(53,165,88,.24);
        color: var(--g800);
      }
      [data-theme="dark"] .pill.deep {
        background: var(--g800);
        border-color: var(--g800);
        color: #071009;
      }

      /* ── Eyebrow ── */
      [data-theme="dark"] .eyebrow { color: var(--g800); }
      [data-theme="dark"] .eyebrow::before { background: var(--g800); }

      /* ── Dividers ── */
      [data-theme="dark"] hr,
      [data-theme="dark"] .divider { border-color: var(--line); background: var(--line); }

      /* ── Hero backgrounds ── */
      [data-theme="dark"] .page-hero {
        background: linear-gradient(180deg, #0d2018, var(--cream));
      }
      [data-theme="dark"] .hero-bg {
        background:
          radial-gradient(65% 85% at 85% 8%, rgba(53,165,88,.16), transparent 60%),
          radial-gradient(45% 55% at 8% 90%, rgba(26,58,40,.3), transparent 55%),
          linear-gradient(180deg, #080f0c 0%, #060e09 100%);
      }
      [data-theme="dark"] .hero-grid { opacity: .13; filter: invert(1); }

      /* ── Tabs ── */
      [data-theme="dark"] .tabs {
        background: var(--paper);
        border-color: var(--line2);
      }
      [data-theme="dark"] .tab { color: var(--ink2); }
      [data-theme="dark"] .tab:hover {
        background: var(--g100);
        color: var(--ink);
      }
      [data-theme="dark"] .tab.active {
        background: var(--g800);
        color: #071009;
        font-weight: 700;
      }

      /* ── Placeholder imagery ── */
      [data-theme="dark"] .ph { border-color: var(--line2); }

      /* ── Ticker ── */
      [data-theme="dark"] .ticker {
        background: var(--paper);
        border-block-color: var(--line2);
      }

      /* ── Mobile menu ── */
      [data-theme="dark"] .mobile-menu-panel { background: var(--cream) !important; }

      /* ── Branch carousel fade edges ── */
      [data-theme="dark"] .branch-carousel::before {
        background: linear-gradient(90deg, var(--cream), transparent);
      }
      [data-theme="dark"] .branch-carousel::after {
        background: linear-gradient(270deg, var(--cream), transparent);
      }

      /* ── Branch hero ── */
      [data-theme="dark"] .branch-hero {
        background:
          radial-gradient(70% 90% at 85% 10%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 60%),
          linear-gradient(180deg, #0d1c14, var(--cream));
      }

      /* ── Branch badge ── */
      [data-theme="dark"] .branch-badge {
        background: color-mix(in oklab, var(--accent) 16%, var(--paper));
        border-color: color-mix(in oklab, var(--accent) 30%, var(--line2));
        color: var(--ink);
      }

      /* ── Booklet ── */
      [data-theme="dark"] .booklet-wrapper {
        border-color: var(--line2);
        box-shadow: var(--sh-3);
      }
      [data-theme="dark"] .booklet-left {
        background: linear-gradient(160deg, #0e2018, var(--paper));
        border-right-color: var(--line2) !important;
      }
      [data-theme="dark"] .booklet-right { background: var(--paper); }
      [data-theme="dark"] .booklet-nav { border-top-color: var(--line); }

      /* ── Publications ── */
      [data-theme="dark"] .publication-download-card {
        background: var(--paper);
        border-color: var(--line2);
      }
      [data-theme="dark"] .pub-icon-box {
        background: var(--g100);
        border-color: var(--line2);
        color: var(--g800);
      }

      /* ── Map ── */
      [data-theme="dark"] .map-outer {
        background: var(--paper);
        border-color: var(--line2);
      }
      [data-theme="dark"] .map-search-wrap { border-bottom-color: var(--line2); }
      [data-theme="dark"] .map-search-wrap input {
        background: #0d1814;
        border-color: var(--line2);
        color: var(--ink);
      }

      /* ── Instagram scroll ── */
      [data-theme="dark"] .ig-post-card {
        background: var(--paper);
        border-color: var(--line2);
      }

      /* ── Float badge (hero overlay chip) ── */
      [data-theme="dark"] .float-badge {
        background: rgba(15,28,22,.92);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        border-color: var(--line2);
        color: var(--ink);
      }

      /* ── EST badge ── */
      [data-theme="dark"] .est-badge {
        background: rgba(18,38,26,.8);
        color: var(--g900);
        border-color: var(--line2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      /* ── Footer ── */
      [data-theme="dark"] footer { background: #060c08; }

      /* ── Four-col grid line ── */
      [data-theme="dark"] .four-col-grid-line {
        background: var(--line2);
        border-color: var(--line2);
      }

      /* ── ImpactStats section — inline style uses var(--g900) which is near-white in dark ── */
      [data-theme="dark"] section[style*="var(--g900)"] {
        background: #0c1e15 !important;
      }

      /* ── Featured projects (always-dark section needs explicit dark-on-dark handling) ── */
      [data-theme="dark"] .featured-projects-section {
        background: #07120d;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
      }
      [data-theme="dark"] .featured-card {
        background: rgba(255,255,255,.055);
        border-color: rgba(255,255,255,.1);
      }
      [data-theme="dark"] .featured-card:hover {
        background: rgba(255,255,255,.1);
        border-color: rgba(86,212,126,.28);
      }

      /* ── Gradient word (section heading accent) ── */
      [data-theme="dark"] .grad-word {
        background: linear-gradient(120deg, var(--g800), var(--g900), var(--g600));
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      /* ── Aurora blobs — screen mode at low opacity so glow is atmospheric not blinding ── */
      [data-theme="dark"] .aurora { mix-blend-mode: screen; opacity: .1; }
      [data-theme="dark"] .aurora .blob { mix-blend-mode: screen; }

      /* ── Branch carousel cards — white bg needs dark flip ── */
      [data-theme="dark"] .branch-card {
        background: var(--paper);
        border-color: var(--line2);
      }
      [data-theme="dark"] .branch-card:hover {
        border-color: var(--g500);
        background: #142219;
      }

      /* ── CTA band primary button — white bg, needs dark text (g900 is now near-white) ── */
      [data-theme="dark"] .cta-band-content .btn:not(.btn-ghost) {
        color: #152e22 !important;
      }

      /* ── ECG track (slightly more visible in dark) ── */
      [data-theme="dark"] .ecg-track { opacity: .44; }

      /* ── Hero marquee ── */
      [data-theme="dark"] .hero-marquee-item { color: var(--g900); opacity: .52; }
      [data-theme="dark"] .hero-marquee-item .dot { background: var(--g800); }

      /* ── Scroll cue ── */
      [data-theme="dark"] .scroll-cue { color: var(--ink2); }
      [data-theme="dark"] .scroll-cue .mouse { border-color: var(--g500); }
      [data-theme="dark"] .scroll-cue .mouse::after { background: var(--g800); }

      /* ── KPI shimmer underline ── */
      [data-theme="dark"] .kpi-card::after {
        background: linear-gradient(90deg, var(--g800), var(--g600));
      }

      /* ── Selection color ── */
      [data-theme="dark"] ::selection {
        background: rgba(86,212,126,.22);
        color: var(--ink);
      }

      /* ── Scrollbar ── */
      [data-theme="dark"] ::-webkit-scrollbar-thumb { background: var(--line2); }
      [data-theme="dark"] ::-webkit-scrollbar-thumb:hover { background: var(--g500); }

      /* ── Theme toggle hover override ── */
      [data-theme="dark"] .theme-toggle-btn:hover {
        background: var(--g100);
        color: var(--g800);
        border-color: var(--g500);
      }

      /* ── Pharmacy4Youth upcoming event cards — hardcoded #fff bg breaks dark mode ── */
      [data-theme="dark"] .pharm-upcoming-card {
        background: var(--paper) !important;
        border-color: var(--line2) !important;
        box-shadow: var(--sh-2) !important;
      }
      [data-theme="dark"] .pharm-upcoming-card:hover {
        box-shadow: 0 16px 48px rgba(0,0,0,.55) !important;
      }
      [data-theme="dark"] .pharm-upcoming-pill {
        background: rgba(220,80,80,.18) !important;
        color: #f09090 !important;
      }
      [data-theme="dark"] .pharm-upcoming-orb {
        background: rgba(220,80,80,.12) !important;
      }
      [data-theme="dark"] .pharm-accent-text {
        color: #f09090 !important;
      }

      /* ── Chapters page: "National ecosystem" CTA card (inline bg uses var(--g900) which is near-white in dark) ── */
      [data-theme="dark"] .chapters-eco-card {
        background: #0c1f18 !important;
        border: 1px solid var(--line2);
      }
      [data-theme="dark"] .chapters-eco-label {
        color: var(--g800) !important;
      }
      /* Step 0 circle also uses var(--g900) ── */
      [data-theme="dark"] .chapters-step-primary {
        background: var(--g500) !important;
        border-color: var(--g100) !important;
      }

      /* ── Leaflet map — dark mode ── */
      [data-theme="dark"] .leaflet-container {
        background: #0a1410;
      }
      [data-theme="dark"] .leaflet-tile-pane {
        filter: invert(100%) hue-rotate(180deg) brightness(0.72) contrast(0.9) saturate(0.85);
      }
      /* Popup stays legible — dark bg, light text */
      [data-theme="dark"] .leaflet-popup-content-wrapper {
        background: var(--paper);
        color: var(--ink);
        box-shadow: var(--sh-2);
        border: 1px solid var(--line2);
      }
      [data-theme="dark"] .leaflet-popup-tip {
        background: var(--paper);
      }
      [data-theme="dark"] .leaflet-popup-content div {
        color: var(--ink) !important;
      }
      [data-theme="dark"] .leaflet-popup-content div + div {
        color: var(--ink2) !important;
      }
      [data-theme="dark"] .leaflet-control-zoom a {
        background: var(--paper);
        color: var(--ink);
        border-color: var(--line2);
      }
      [data-theme="dark"] .leaflet-control-zoom a:hover {
        background: var(--g100);
        color: var(--g800);
      }
      [data-theme="dark"] .leaflet-attribution-flag { display: none; }

      /* ============================================================
         BRANCH PAGE — DARK MODE CONTENT CARD OVERRIDE
         ============================================================ */
      [data-theme="dark"] .b-stats-4 > div,
      [data-theme="dark"] .b-content-card,
      [data-theme="dark"] .branch-content-section {
        background: var(--paper);
        border-color: var(--line2);
      }

      [data-theme="dark"] section.b-white-section { background: var(--paper) !important; }

      [data-theme="dark"] .branch-hero {
        background:
          radial-gradient(70% 90% at 85% 10%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 60%),
          linear-gradient(180deg, #0d1c14, var(--cream)) !important;
      }

      [data-theme="dark"] [data-branch="charity"] .card,
      [data-theme="dark"] [data-branch="dentistry"] .card {
        background: var(--paper);
        border-color: var(--line2);
      }

      /* ============================================================
         NAV — FROSTED GLASS
         ============================================================ */
      .nav-glass {
        background: rgba(251,249,244,.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--line);
      }
      [data-theme="dark"] .nav-glass {
        background: rgba(10,20,16,.94);
        border-bottom-color: rgba(255,255,255,.05);
        box-shadow: 0 1px 0 rgba(255,255,255,.04);
      }

      /* ============================================================
         SKIP LINK (accessibility)
         ============================================================ */
      .skip-link {
        position: absolute;
        top: -100%;
        left: 16px;
        padding: 12px 20px;
        background: var(--g900);
        color: #fff;
        border-radius: 0 0 8px 8px;
        font-weight: 700;
        font-size: 15px;
        z-index: 9999;
        transition: top .15s;
        text-decoration: none;
      }
      .skip-link:focus { top: 0; }

      /* ============================================================
         TOUCH & INTERACTION
         ============================================================ */
      .btn, .tab, .card a { touch-action: manipulation; }
      .mobile-menu-btn { min-width: 44px; min-height: 44px; }
      .theme-toggle-btn { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; }

      /* ============================================================
         REDUCED MOTION
         ============================================================ */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }

      /* ============================================================
         MOBILE RESPONSIVE OVERRIDES
         ============================================================ */

      /* SRP stats: 4→2→1 column */
      @media (max-width: 600px) {
        .srp-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
      }
      @media (max-width: 400px) {
        .srp-stats-grid { grid-template-columns: 1fr !important; }
      }

      /* Chapters map height on mobile */
      @media (max-width: 560px) {
        .leaflet-container { height: 300px !important; }
      }

      /* Programs tabs font on very small screens */
      @media (max-width: 480px) {
        .tabs .tab { font-size: 13px; padding: 8px 12px; }
      }

      /* PaperBooklet: stack on mobile */
      @media (max-width: 700px) {
        .booklet-wrapper { grid-template-columns: 1fr !important; }
        .booklet-left { border-right: none !important; border-bottom: 1px solid var(--line); }
      }

      /* Branches 2-col grid: single column on mobile */
      @media (max-width: 700px) {
        .branches-grid-2col { grid-template-columns: 1fr !important; }
      }

      /* Prevent iOS input zoom */
      @media (max-width: 767px) {
        input, select, textarea { font-size: 16px !important; }
      }

      /* Two-col-grid-sm collapses */
      @media (max-width: 560px) {
        .two-col-grid-sm { grid-template-columns: 1fr !important; }
        .two-col-grid-sm > [style*="span 2"] { grid-column: 1 !important; }
      }

      /* Footer grid single column on tiny screens */
      @media (max-width: 560px) {
        .footer-grid { grid-template-columns: 1fr !important; }
      }

      /* ============================================================
         MOBILE RESPONSIVE — COMPREHENSIVE FIXES
         All responsive overrides live here (not index.html)
         ============================================================ */

      /* ── Nav: always-opaque on mobile so it's never invisible ── */
      @media (max-width: 1200px) {
        .nav-glass {
          background: rgba(251,249,244,.99) !important;
          box-shadow: 0 1px 0 rgba(0,0,0,.07), 0 2px 8px rgba(0,0,0,.04);
        }
        [data-theme="dark"] .nav-glass {
          background: rgba(10,20,16,1) !important;
          box-shadow: 0 1px 0 rgba(255,255,255,.06), 0 2px 12px rgba(0,0,0,.4);
        }
        /* Hide Join Us from desktop nav-cta on mobile — it's in the drawer */
        .nav-cta > a { display: none; }
        .nav-cta .mobile-menu-btn { display: inline-flex !important; }
      }

      /* ── Hero: single-column ≤940px, collage hidden ── */
      @media (max-width: 940px) {
        section.hero {
          min-height: auto !important;
          padding: clamp(72px, 12vw, 100px) 0 clamp(40px, 8vw, 64px) !important;
          align-items: flex-start !important;
        }
        .hero-layout {
          grid-template-columns: 1fr !important;
          gap: 0 !important;
        }
        .hero-collage {
          display: none !important;
        }
        .hero-text-col {
          width: 100% !important;
          max-width: 680px;
        }
        .hero h1 { font-size: clamp(36px, 7vw, 56px) !important; }
        .hero p { max-width: 600px !important; }
        .hero-marquee { margin-top: 32px; }
        .ecg-monitor { display: none; }
        /* Contain hero within viewport width without clipping text */
        .hero-in { max-width: 100%; }
      }
      /* Extra tight on small phones */
      @media (max-width: 480px) {
        .hero h1 { font-size: clamp(32px, 9.5vw, 42px) !important; }
        .hero p { font-size: 16px !important; max-width: 100% !important; }
        .hero .est-badge { font-size: 9.5px; padding: 5px 11px; }
        .hero-marquee-item { font-size: 14px; }
        .scroll-cue { display: none; }
      }

      /* ── PageHero: collapse rightSlot to single column ≤860px ── */
      @media (max-width: 860px) {
        .page-hero-grid {
          grid-template-columns: 1fr !important;
          gap: 28px !important;
        }
        .page-hero { padding: clamp(64px,10vw,96px) 0 clamp(36px,6vw,56px); }
        .page-hero h1 { font-size: clamp(32px,7vw,52px) !important; }
        .page-hero p { font-size: 16px !important; max-width: 100% !important; }
      }
      @media (max-width: 560px) {
        /* Hide rightSlot images on small phones — too cramped below hero text */
        .page-hero-grid > *:last-child { display: none; }
      }

      /* ── Container padding on small screens ── */
      @media (max-width: 480px) {
        .container { padding: 0 16px; }
        .section { padding: 48px 0; }
      }

      /* ── WhatWeDo grid: 2-col on tablet, 1-col on mobile ── */
      @media (max-width: 760px) {
        .whatwedo-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      }
      @media (max-width: 1024px) and (min-width: 761px) {
        .whatwedo-grid { grid-template-columns: 1fr 1fr !important; }
      }

      /* ── Featured cards: full width on mobile ── */
      @media (max-width: 760px) {
        .featured-grid { grid-template-columns: 1fr !important; }
      }

      /* ── Stats grid: 2-col on mobile ── */
      @media (max-width: 760px) {
        .stats-grid { grid-template-columns: 1fr 1fr !important; }
      }
      @media (max-width: 360px) {
        .stats-grid { grid-template-columns: 1fr !important; }
      }

      /* ── SRP / programs grid: single column on mobile ── */
      @media (max-width: 760px) {
        .srp-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      }

      /* ── Events grid: 1-col on mobile ── */
      @media (max-width: 560px) {
        .events-grid { grid-template-columns: 1fr !important; }
      }

      /* ── Testimonials: 1-col on mobile ── */
      @media (max-width: 760px) {
        .testimonials-grid { grid-template-columns: 1fr !important; }
      }

      /* ── President card inner: stack on mobile ── */
      @media (max-width: 600px) {
        .president-card-inner {
          grid-template-columns: 1fr !important;
        }
        .president-card-inner > div:first-child { min-height: 220px; }
      }

      /* ── Contact layout: single column on mobile ── */
      @media (max-width: 760px) {
        .contact-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
      }

      /* ── Chapters start grid: single column on mobile ── */
      @media (max-width: 760px) {
        .chapters-start-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      }

      /* ── Branches grid: single column on mobile ── */
      @media (max-width: 600px) {
        .branches-grid-2col { grid-template-columns: 1fr !important; }
      }

      /* ── Four-col grid: 2-col on mobile ── */
      @media (max-width: 560px) {
        .four-col-grid { grid-template-columns: 1fr 1fr !important; }
      }

      /* ── About story grid: single column on mobile ── */
      @media (max-width: 760px) {
        .about-story-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
      }

      /* ── CTA band: stack on mobile ── */
      @media (max-width: 600px) {
        .cta-band-content {
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        .cta-band-content > div:last-child {
          justify-content: flex-start !important;
          flex-direction: column !important;
          align-items: stretch !important;
        }
        .cta-band-content .btn { text-align: center; justify-content: center; }
      }

      /* ── Footer: 2-col at tablet, 1-col at mobile ── */
      @media (max-width: 760px) {
        footer { padding: 48px 0 28px; margin-top: 40px; }
        .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
      }
      @media (max-width: 480px) {
        .footer-grid { grid-template-columns: 1fr; gap: 24px; }
        .footer-bottom { flex-direction: column; gap: 4px; font-size: 11px; }
      }

      /* ── Branch hero split: single column on mobile ── */
      @media (max-width: 760px) {
        .branch-hero-split {
          grid-template-columns: 1fr !important;
          min-height: auto !important;
        }
        .b-grid-hero { grid-template-columns: 1fr !important; gap: 24px !important; }
        .b-two-col-wide { grid-template-columns: 1fr !important; gap: 24px !important; }
        .b-grid-wide { grid-template-columns: 1fr !important; gap: 24px !important; }
        .branch-cta-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
      }

      /* ── Buttons: full width on very small screens where appropriate ── */
      @media (max-width: 400px) {
        .hero .btn-lg {
          padding: 14px 20px !important;
          font-size: 15px !important;
        }
      }

      /* ── Prevent global horizontal scroll ── */
      @media (max-width: 760px) {
        body, #root { overflow-x: hidden; max-width: 100vw; }
        .hero-marquee { overflow: hidden; }
      }

      /* ── Ticker: lighter padding on mobile ── */
      @media (max-width: 480px) {
        .ticker-track { gap: 32px; padding: 14px 0; }
      }

      /* ── SRP booklet: stack on mobile ── */
      @media (max-width: 560px) {
        .booklet-wrapper { grid-template-columns: 1fr !important; }
        .booklet-left { border-right: none !important; border-bottom: 1px solid var(--line); }
        .booklet-left, .booklet-right { padding: 24px; }
      }

      /* ============================================================
         MISC POLISH
         ============================================================ */
      /* Error/success states */
      .field-error { color: var(--error); font-size: 12.5px; margin-top: 4px; }

      /* Visually hidden utility */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }
    `}</style>
  );
}

Object.assign(window, { GlobalStyles });
