/* Primitive building blocks used across pages */
const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;

/* ---------- Dark Mode ---------- */
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("m4y-theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    try { localStorage.setItem("m4y-theme", isDark ? "dark" : "light"); } catch {}
  }, [isDark]);
  return [isDark, () => setIsDark(d => !d)];
}

/* ---------- Router ---------- */
const RouterCtx = createContext({ route: "/", go: () => {} });
function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (to) => { window.location.hash = to; window.scrollTo({ top: 0, behavior: "instant" }); };
  return <RouterCtx.Provider value={{ route, go }}>{children}</RouterCtx.Provider>;
}
function useRoute() { return useContext(RouterCtx); }
function Link({ to, children, className = "", ...rest }) {
  const { go, route } = useRoute();
  const active = route === to || (to !== "/" && route.startsWith(to));
  return (
    <a href={"#" + to}
       className={className + (active ? " active" : "")}
       onClick={(e) => { e.preventDefault(); go(to); }}
       {...rest}>{children}</a>
  );
}

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>{children}</Tag>;
}

/* ---------- Counter ---------- */
function Counter({ to = 100, suffix = "", duration = 1400 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

/* ---------- Placeholder or real photo ---------- */
function PH({ label = "image", src, alt, aspect = "4 / 3", variant = "", style, className = "" }) {
  const seed = encodeURIComponent(String(label).toLowerCase().replace(/\s+/g, "-"));
  const fallback = `https://picsum.photos/seed/${seed}/1200/900`;
  const imageUrl = src || fallback;
  const isPlaceholder = !src;
  return (
    <div className={`ph ${variant} ${className}`} style={{ position: "relative", overflow: "hidden", aspectRatio: aspect, ...style }}>
      <img
        src={imageUrl}
        alt={alt != null ? alt : label}
        loading="lazy"
        decoding="async"
        onError={e => { if (e.target.src !== fallback) e.target.src = fallback; }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {isPlaceholder && (
        <div
          className="mono"
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            background: "rgba(255,255,255,.78)",
            border: "1px solid var(--line2)",
            borderRadius: 8,
            padding: "5px 8px",
            fontSize: 10.5,
            color: "var(--g900)",
          }}
        >
          placeholder
        </div>
      )}
    </div>
  );
}

/* ---------- Icons (simple, geometric — all aria-hidden by default) ---------- */
const _ah = {"aria-hidden": true};
const I = {
  arrow:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  chat:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12a8 8 0 0 1-11.9 7l-4.1 1 1-4A8 8 0 1 1 21 12z"/></svg>,
  mail:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>,
  check:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12l5 5L20 7"/></svg>,
  play:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M8 5v14l11-7z"/></svg>,
  spark:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>,
  plus:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  minus:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  ext:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17 17 7M9 7h8v8"/></svg>,
  pin:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s-7-8-7-13a7 7 0 0 1 14 0c0 5-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  cal:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  brain:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 6a3 3 0 1 0-3 3v2a3 3 0 0 0 0 6 3 3 0 0 0 3 3V6zM16 6a3 3 0 1 1 3 3v2a3 3 0 0 1 0 6 3 3 0 0 1-3 3V6z"/></svg>,
  heart:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/></svg>,
  eye:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  flask:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 3h6M10 3v6L5 20a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-11V3"/></svg>,
  scalpel:    (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 21 14 10l4 4L7 25M14 10l4-8 4 4-4 8"/></svg>,
  tooth:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2c2 2 4 4 4 8 0 4-1 8-2 10s-2 2-2 2-1 0-2-2c-1-2-2-6-2-10 0-4 2-6 4-8z"/></svg>,
  capsules:   (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2.5a4 4 0 0 1 5.7 5.6L10.1 18.2a4 4 0 1 1-5.7-5.7L14.5 2.5z"/><path d="M8.4 8.4 15.6 15.6"/></svg>,
  circuit:    (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h.01M15 9h.01M12 12h.01M9 15h.01M15 15h.01"/><path d="M9 9v3M15 9v3M9 15v-3M15 15v-3"/></svg>,
  hands:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 11V9a2 2 0 0 1 2-2h1l3-3v12l-3-2H9a2 2 0 0 1-2-2z"/><path d="M11 13 9 22l3-2 2-7"/></svg>,
  run:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="14" cy="5" r="2"/><path d="M6 21l3-6 3 2 2-4 4 3M9 11l3-2"/></svg>,
  mind:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a6 6 0 0 0-6 6v2l-2 3 2 1v3a3 3 0 0 0 3 3h3v-5"/><path d="M12 3a6 6 0 0 1 6 6v2l2 3-2 1v3a3 3 0 0 1-3 3h-3"/></svg>,
  inst:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  link:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10v7M8 7.5v.01M12 17v-5a2 2 0 1 1 4 0v5M12 11.5a2 2 0 1 1 4 0"/></svg>,
  moon:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>,
  sun:        (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  globe:      (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  download:   (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  book:       (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  search:     (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  heart2:     (p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/></svg>,
  stethoscope:(p) => <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>,
};

/* Branch logo (PNG) or themed icon fallback. Use fill=true inside a tight layout so the mark scales edge-to-edge (cover in a circle). */
function BranchMark({ branch, size = 48, circle = true, fill = false, style = {}, className = "" }) {
  if (!branch) return null;
  const s = typeof size === "number" ? size : 48;
  const r = circle ? "50%" : 12;
  if (branch.logo) {
    if (fill) {
      const boxStyle = {
        width: "100%",
        maxWidth: s,
        aspectRatio: "1",
        margin: "0 auto",
        flexShrink: 0,
        ...style,
      };
      return (
        <div className={className} style={boxStyle}>
          <img
            src={branch.logo}
            alt={`${branch.name} logo`}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: r,
            }}
          />
        </div>
      );
    }
    return (
      <img
        src={branch.logo}
        alt={`${branch.name} logo`}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          width: s,
          height: s,
          objectFit: "contain",
          borderRadius: r,
          display: "block",
          flexShrink: 0,
          ...style,
        }}
      />
    );
  }
  const Ic = I[branch.icon];
  return (
    <div
      className={className}
      style={{
        width: s,
        height: s,
        borderRadius: r,
        background: "color-mix(in oklab, var(--accent) 18%, #fff)",
        border: "1px solid color-mix(in oklab, var(--accent) 30%, var(--line))",
        display: "grid",
        placeItems: "center",
        color: "var(--g900)",
        flexShrink: 0,
        ...style,
      }}
    >
      <Ic />
    </div>
  );
}

/* ---------- FAQ (accessible) ---------- */
function FAQ({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((it, i) => (
        <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
          <button
            id={"faq-btn-"+i}
            aria-expanded={open === i}
            aria-controls={"faq-panel-"+i}
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", textAlign: "left", gap: 16 }}
          >
            <span style={{ fontWeight: 700, fontFamily: "var(--f-display)", fontSize: 17, color: "var(--g900)", lineHeight: 1.3 }}>{it.q}</span>
            <span style={{ flexShrink: 0, color: "var(--g600)" }} aria-hidden="true">{open === i ? <I.minus /> : <I.plus />}</span>
          </button>
          <div
            id={"faq-panel-"+i}
            role="region"
            aria-labelledby={"faq-btn-"+i}
            style={{
              maxHeight: open === i ? 500 : 0,
              overflow: "hidden",
              transition: "max-height .38s cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div style={{ padding: "0 24px 24px", color: "var(--ink2)", fontSize: 15.5, lineHeight: 1.65 }}>{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Section title ---------- */
function SectionHead({ eyebrow, title, blurb, align = "left" }) {
  return (
    <div className="stack" style={{ alignItems: align === "center" ? "center" : "flex-start", textAlign: align, gap: 16, maxWidth: 780, margin: align === "center" ? "0 auto" : undefined }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 style={{ marginTop: 2 }}>{title}</h2>
      {blurb && <p style={{ fontSize: 17, color: "var(--ink2)", maxWidth: 680, lineHeight: 1.65 }}>{blurb}</p>}
    </div>
  );
}

/* ---------- CTA band ---------- */
function CTABand({ title = "Ready to start something meaningful?", sub = "Join Medicine4Youth as a member, apply to a chapter, or pitch a new branch.", primary = ["Become a Member", "/join"], secondary = ["Apply", "/join"] }) {
  return (
    <section className="section">
      <div className="container">
        <div style={{
          background: "linear-gradient(135deg, var(--g800), #25463b 60%, #1a3329)",
          borderRadius: "var(--r-xl)",
          padding: "clamp(40px, 6vw, 80px)",
          color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(221,247,205,.9), transparent 50%), radial-gradient(circle at 20% 80%, rgba(135,183,131,.7), transparent 50%)"
          }} />
          <div className="cta-band-content">
            <div className="stack" style={{ gap: 18 }}>
              <span className="eyebrow" style={{ color: "#BCDBA5" }}>Get involved</span>
              <h2 style={{ color: "#fff" }}>{title}</h2>
              <p style={{ fontSize: 17, color: "#d9e9d4", maxWidth: 520 }}>{sub}</p>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Link to={primary[1]} className="btn btn-lg" style={{ background: "#fff", color: "var(--g900)" }}>{primary[0]} <I.arrow className="arr" /></Link>
              <Link to={secondary[1]} className="btn btn-lg btn-ghost" style={{ color: "#fff", borderColor: "rgba(255,255,255,.35)" }}>{secondary[0]}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MetaTags — imperative document.head management ---------- */
const _LD_JSON_ID = "m4y-ld-json";
const _ORG_LD = {
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
};

function MetaTags({ title, description, ogImage, canonicalPath }) {
  useEffect(() => {
    const base = "https://medicine4youth.ca";
    const url  = base + (canonicalPath || "/");

    /* Title */
    document.title = title || "Medicine4Youth";

    /* Helper: upsert a <meta> tag */
    function setMeta(attr, attrVal, content) {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, attrVal); document.head.appendChild(el); }
      el.setAttribute("content", content);
    }

    /* Standard */
    setMeta("name", "description", description || "");

    /* Open Graph */
    setMeta("property", "og:title",       title || "");
    setMeta("property", "og:description", description || "");
    setMeta("property", "og:type",        "website");
    setMeta("property", "og:url",         url);
    setMeta("property", "og:image",       ogImage || "");
    setMeta("property", "og:site_name",   "Medicine4Youth");

    /* Twitter */
    setMeta("name", "twitter:card",        "summary_large_image");
    setMeta("name", "twitter:title",       title || "");
    setMeta("name", "twitter:description", description || "");
    setMeta("name", "twitter:image",       ogImage || "");

    /* Canonical */
    let canon = document.querySelector("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel","canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href", url);

    /* JSON-LD Organization (injected once) */
    if (!document.getElementById(_LD_JSON_ID)) {
      const s = document.createElement("script");
      s.id = _LD_JSON_ID;
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(_ORG_LD);
      document.head.appendChild(s);
    }
  }, [title, description, ogImage, canonicalPath]);

  return null;
}

Object.assign(window, { RouterProvider, useRoute, Link, Reveal, Counter, PH, I, BranchMark, FAQ, SectionHead, CTABand, useDarkMode, MetaTags });
