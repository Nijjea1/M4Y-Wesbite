/* Homepage - premium redesign (GSAP + Framer Motion + parallax) */

const { motion, useScroll, useTransform, useSpring, useMotionValue } = (window.Motion || {});

/* 3 PQRST complexes in a 1600×200 viewBox - midline at y=100 */
const ECG_PATH_LARGE =
  "M0,100 L100,100 " +
  "C114,100 120,68 130,68 C140,68 146,100 154,100 " +
  "L174,100 L182,116 L192,8 L202,168 L212,100 " +
  "L226,100 C240,100 250,60 266,60 C282,60 292,100 308,100 " +
  "L600,100 " +
  "C614,100 620,68 630,68 C640,68 646,100 654,100 " +
  "L674,100 L682,116 L692,8 L702,168 L712,100 " +
  "L726,100 C740,100 750,60 766,60 C782,60 792,100 808,100 " +
  "L1100,100 " +
  "C1114,100 1120,68 1130,68 C1140,68 1146,100 1154,100 " +
  "L1174,100 L1182,116 L1192,8 L1202,168 L1212,100 " +
  "L1226,100 C1240,100 1250,60 1266,60 C1282,60 1292,100 1308,100 " +
  "L1600,100";

/* ============================================================
   Motion primitives
   ============================================================ */

/* Top scroll progress bar */
function ScrollProgress() {
  if (!useScroll) return null;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="lp-progress" style={{ scaleX }} aria-hidden="true" />;
}

/* Magnetic hover - element follows the cursor slightly */
function Magnetic({ children, strength = 0.35, className = "", ...rest }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }
  function onLeave() { if (ref.current) ref.current.style.transform = "translate(0,0)"; }
  return (
    <span ref={ref} className={"magnetic " + className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform .35s cubic-bezier(.16,1,.3,1)" }} {...rest}>
      {children}
    </span>
  );
}

/* 3D tilt + cursor glow */
function Tilt({ children, max = 9, glow = true, className = "", style, ...rest }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    if (glow) { el.style.setProperty("--mx", px * 100 + "%"); el.style.setProperty("--my", py * 100 + "%"); }
  }
  function onLeave() { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"; }
  return (
    <div ref={ref} className={`tilt ${glow ? "glow-card" : ""} ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} style={style} {...rest}>
      {children}
    </div>
  );
}

/* Word-by-word kinetic heading; lines = [[{t,grad,italic}, ...], ...] */
function KineticHeading({ lines, className = "", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  let idx = 0;
  return (
    <h1 ref={ref} className={`kinetic ${shown ? "in" : ""} ${className}`} style={style}>
      {lines.map((line, li) => (
        <span className="line" key={li}>
          {line.map((tok, ti) => {
            const delay = (idx++) * 0.07;
            return (
              <span key={ti} className={tok.grad ? "word grad-word" : "word"}
                style={{ transitionDelay: `${delay}s`, marginRight: "0.26em", fontStyle: tok.italic ? "italic" : undefined, fontWeight: tok.italic ? 500 : undefined }}>
                {tok.t}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* Scroll-linked parallax wrapper (Framer) */
function Parallax({ children, speed = 0.18, className = "", style }) {
  const ref = useRef(null);
  if (!useScroll) return <div className={className} style={style}>{children}</div>;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * -70}px`, `${speed * 70}px`]);
  return <motion.div ref={ref} className={className} style={{ y, ...style }}>{children}</motion.div>;
}

/* GSAP batched scroll reveal for any .g-reveal element */
function useGsapReveals() {
  React.useLayoutEffect(() => {
    const g = window.gsap, ST = window.ScrollTrigger;
    const els = Array.from(document.querySelectorAll(".g-reveal"));
    if (!g || !ST || !els.length) return;
    g.set(els, { opacity: 0, y: 42 });
    const batch = ST.batch(".g-reveal", {
      start: "top 90%",
      once: true,
      onEnter: (b) => g.to(b, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });
    ST.refresh();
    const safety = setTimeout(() => {
      els.forEach((e) => { if (parseFloat(getComputedStyle(e).opacity) < 0.05) g.to(e, { opacity: 1, y: 0, duration: 0.4 }); });
    }, 4500);
    return () => {
      clearTimeout(safety);
      (batch || []).forEach((b) => b && b.kill && b.kill());
    };
  }, []);
}

/* ============================================================
   ECG hero line (kept, gradient-enhanced)
   ============================================================ */
function ECGLine({ hovered, cursor }) {
  const [bpm, setBpm] = useState(72);
  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(() => setBpm(68 + Math.floor(Math.random() * 8)), 900);
    return () => clearInterval(id);
  }, [hovered]);
  const color = hovered ? "#3a8a62" : "var(--g600)";
  const strokeW = hovered ? 2.4 : 1.6;
  return (
    <div className="ecg-hero-container">
      <div className={"ecg-track" + (hovered ? " ecg-hovered" : "")} style={{ animationDuration: hovered ? "14s" : "36s" }}>
        {[0, 1].map((k) => (
          <svg key={k} viewBox="0 0 1600 200" width="1600" height="320" preserveAspectRatio="none" style={{ flexShrink: 0, display: "block" }}>
            <path d={ECG_PATH_LARGE} stroke={color} strokeWidth={strokeW} fill="none" vectorEffect="non-scaling-stroke" style={{ transition: "stroke .4s ease, stroke-width .3s ease" }} />
          </svg>
        ))}
      </div>
      {hovered && cursor && (
        <>
          <div className="ecg-spotlight" style={{ left: cursor.x, top: cursor.y }} />
          <div className="ecg-monitor">
            <div className="ecg-monitor-bpm">{bpm}</div>
            <div className="ecg-monitor-label">BPM · Sinus Rhythm</div>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Scroll-linked parallax for the hero layers
  const scrollData = useScroll ? useScroll({ target: heroRef, offset: ["start start", "end start"] }) : { scrollYProgress: null };
  const sp = scrollData.scrollYProgress;
  const photoBigY = sp ? useTransform(sp, [0, 1], ["0px", "120px"]) : 0;
  const photoSmY = sp ? useTransform(sp, [0, 1], ["0px", "60px"]) : 0;
  const photoTinyY = sp ? useTransform(sp, [0, 1], ["0px", "180px"]) : 0;
  const textY = sp ? useTransform(sp, [0, 1], ["0px", "70px"]) : 0;
  const heroFade = sp ? useTransform(sp, [0, 0.85], [1, 0]) : 1;

  function onMouseMove(e) {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
    setTilt({ x: (e.clientX - (r.left + r.width / 2)) / r.width, y: (e.clientY - (r.top + r.height / 2)) / r.height });
  }

  const M = motion ? motion.div : "div";

  return (
    <section className="hero" ref={heroRef}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove} style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>

      {/* Animated aurora background */}
      <div className="aurora" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      </div>
      <div className="hero-bg" />
      <div className="hero-grid" />
      <ECGLine hovered={hovered} cursor={cursor} />

      <M className="container hero-in" style={{ position: "relative", zIndex: 2, opacity: heroFade }}>
        <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "center" }}>

          {/* Left - copy */}
          <M style={motion ? { y: textY } : undefined}>
            <div className="stack" style={{ gap: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <img className="hero-brand-logo" src={ORG_LOGO} alt="Medicine4Youth official logo" width={56} height={56} decoding="async" />
                <div className="est-badge">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--g500)", display: "inline-block" }} />
                  Est. 2020
                </div>
              </div>
              <span className="eyebrow">CRA-registered Canadian not-for-profit</span>

              <KineticHeading
                lines={[
                  [{ t: "Empowering" }, { t: "the" }, { t: "next" }],
                  [{ t: "generation" }, { t: "of" }],
                  [{ t: "healthcare", grad: true, italic: true }, { t: "leaders." }],
                ]}
              />

              <p style={{ fontSize: 18, color: "var(--ink2)", maxWidth: 580 }}>
                Medicine4Youth is a student-led not-for-profit connecting aspiring medical, research, and
                allied-health students with mentorship, education, and a national community of chapters and branches.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
                <Magnetic>
                  <Link to="/join" className="btn btn-lg btn-primary" style={{ padding: "16px 28px" }}>Become a Member <I.arrow className="arr" /></Link>
                </Magnetic>
                <Magnetic>
                  <Link to="/branches" className="btn btn-lg btn-ghost" style={{ padding: "16px 24px" }}>Explore Branches</Link>
                </Magnetic>
              </div>

              <div style={{ display: "flex", gap: 34, marginTop: 6, flexWrap: "wrap", color: "var(--mute)", fontSize: 12.5 }}>
                <span>Registered with the Canada Revenue Agency</span>
                <span>University chapters across Canada</span>
              </div>
            </div>
          </M>

          {/* Right - parallax photo collage with mouse tilt */}
          <div className="hero-collage" style={{ position: "relative", minHeight: 500, perspective: 1200 }}>
            <div style={{ position: "absolute", right: 0, top: 20, width: "92%", height: "78%", borderRadius: 24, background: "linear-gradient(180deg,#e7f4d8,#dff0cd)", border: "1px solid #d4e8bf" }} />

            {/* Main photo - scroll parallax (outer) + mouse tilt (inner) */}
            <M style={motion ? { y: photoBigY, position: "absolute", right: 22, top: 0, width: "66%", zIndex: 3 } : { position: "absolute", right: 22, top: 0, width: "66%", zIndex: 3 }}>
              <div style={{ transform: `translate3d(${tilt.x * -22}px, ${tilt.y * -18}px, 0)`, transition: "transform .25s ease-out" }}>
                <div className="hero-photo">
                  <PH label="Student conducting mentored laboratory research" src={SITE_PHOTOS.heroMain} aspect="4/5" style={{ borderRadius: 22 }} />
                </div>
                <div className="float-badge" style={{ left: 14, top: 14, display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3a8a62", boxShadow: "0 0 0 4px rgba(58,138,98,.18)" }} />
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g900)" }}>Live research · SRP '25</span>
                </div>
              </div>
            </M>

            {/* Secondary photo */}
            <M style={motion ? { y: photoSmY, position: "absolute", left: 0, bottom: 50, width: "48%", zIndex: 4 } : { position: "absolute", left: 0, bottom: 50, width: "48%", zIndex: 4 }}>
              <div className="hero-photo" style={{ transform: `translate3d(${tilt.x * 26}px, ${tilt.y * 20}px, 0)`, transition: "transform .25s ease-out" }}>
                <PH label="Chapter members hosting a campus bake sale fundraiser" src={SITE_PHOTOS.heroCommunity} aspect="4/3" style={{ borderRadius: 18 }} />
              </div>
            </M>

            {/* Small photo + counter badge */}
            <M style={motion ? { y: photoTinyY, position: "absolute", right: 34, bottom: 0, width: "34%", zIndex: 5 } : { position: "absolute", right: 34, bottom: 0, width: "34%", zIndex: 5 }}>
              <div style={{ transform: `translate3d(${tilt.x * 34}px, ${tilt.y * 26}px, 0)`, transition: "transform .25s ease-out" }}>
                <div className="hero-photo">
                  <PH label="Medicine4Youth leaders collaborating" src={SITE_PHOTOS.heroLeaders} aspect="4/5" style={{ borderRadius: 18 }} />
                </div>
                <div className="float-badge" style={{ right: -18, bottom: 24, display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: 22, color: "var(--g900)", lineHeight: 1 }}>23</span>
                  <span style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".04em" }}>chapters</span>
                </div>
              </div>
            </M>
          </div>
        </div>

        {/* Hero marquee of branches */}
        <div className="hero-marquee">
          <div className="hero-marquee-track">
            {[...BRANCHES, ...BRANCHES].map((b, i) => (
              <span className="hero-marquee-item" key={i}><span className="dot" />{b.name}</span>
            ))}
          </div>
        </div>
      </M>

      <div className="scroll-cue"><div className="mouse" />Scroll</div>
    </section>
  );
}

/* ============================================================
   FEATURED PROJECTS
   ============================================================ */
function FeaturedProjects() {
  const projects = [
    { tag: "Hackathon", tagAccent: true, title: "Bioengineering Hackathon", subtitle: "Biohacks",
      desc: "Our flagship bioengineering hackathon brings students together to design and prototype solutions to real-world health challenges - hardware, software, and everything in between. Teams pitch to a panel of clinicians and engineers for prizes and mentorship.",
      cta: "Visit Biohacks", href: "https://bio-eng4-youth-ijat.vercel.app/", external: true,
      stat1: ["48h", "Hackathon"], stat2: ["Teams", "Multi-discipline"], color: "rgba(16,80,104,.85)", accent: "#3ec8f0" },
    { tag: "Branch", tagAccent: false, title: "Charity4Youth", subtitle: "Charity4Youth",
      desc: "Community engagement, advocacy, and tangible social impact. Charity4Youth mobilizes our members to lead fundraisers, volunteer initiatives, and outreach programs that serve underserved populations across Canada.",
      cta: "Explore the branch", href: "/branches/charity", external: false,
      stat1: ["Local", "Chapters"], stat2: ["Fundraisers", "& Drives"], color: "rgba(120,30,30,.8)", accent: "#f4a0a0" },
    { tag: "Upcoming", tagAccent: false, title: "SRP Research Symposium", subtitle: "Annual Symposium · Aug 2026",
      desc: "The closing showcase for our Summer Research Program cohort. Scholars present their mentored research through posters and lightning talks to an audience of clinicians, faculty, and peers - then move into the M4Y publication pipeline.",
      cta: "Learn about SRP", href: "/srp", external: false,
      stat1: ["Aug 22", "2026"], stat2: ["Hybrid", "Event"], color: "rgba(30,60,45,.9)", accent: "#a8dba0" },
  ];
  return (
    <section className="featured-projects-section">
      <div className="container">
        <div className="g-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 44 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--g300)" }}>Major endeavors</span>
            <h2 style={{ color: "#fff", marginTop: 12 }}>What we're building <span className="grad-word">right now.</span></h2>
          </div>
          <Magnetic><Link to="/programs" className="btn btn-ghost" style={{ color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>All programs <I.arrow className="arr" /></Link></Magnetic>
        </div>
        <div className="featured-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {projects.map((p, i) => (
            <Tilt key={i} max={7} glow={false} className="g-reveal featured-card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ height: 160, background: p.color, display: "flex", alignItems: "flex-end", padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: p.accent, opacity: .15 }} />
                <div style={{ position: "absolute", bottom: -30, left: -30, width: 160, height: 160, borderRadius: "50%", border: `1px solid ${p.accent}`, opacity: .2 }} />
                <span className={`featured-card-badge${p.tagAccent ? " accent" : ""}`}>{p.tag}</span>
              </div>
              <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", marginBottom: 6 }}>{p.subtitle}</div>
                  <h3 style={{ color: "#fff", fontSize: "clamp(18px,1.6vw,22px)", lineHeight: 1.15 }}>{p.title}</h3>
                </div>
                <p style={{ color: "rgba(255,255,255,.62)", fontSize: 14, lineHeight: 1.58, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.1)" }}>
                  {[p.stat1, p.stat2].map(([a, b], si) => (
                    <div key={si}>
                      <div style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: 20, color: "#fff", lineHeight: 1 }}>{a}</div>
                      <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.45)", marginTop: 5 }}>{b}</div>
                    </div>
                  ))}
                </div>
                <div style={{ paddingTop: 4 }}>
                  {p.external ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>{p.cta} <I.ext /></a>
                  ) : (
                    <Link to={p.href} className="btn btn-ghost btn-sm" style={{ color: "rgba(255,255,255,.8)", borderColor: "rgba(255,255,255,.2)" }}>{p.cta} <I.arrow className="arr" /></Link>
                  )}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   IMPACT STATS
   ============================================================ */
function ImpactStats() {
  const stats = [
    { n: 23, s: "", l: "University chapters", sub: "Across Canada", icon: "pin" },
    { n: 10, s: "", l: "Specialty branches", sub: "Neuro · Psych · Dent · Pharm · BioEng · Optom · Charity · Endopath · Rehab · Surg", icon: "spark" },
    { n: 62, s: "+", l: "SRP scholars", sub: "Over summer cohorts", icon: "flask" },
    { n: 40, s: "+", l: "Events hosted", sub: "Panels, workshops, competitions", icon: "cal" },
  ];
  return (
    <section style={{ background: "var(--g900)", paddingBlock: "clamp(48px,6vw,72px)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {stats.map(({ n, s, l, sub, icon }, i) => {
            const Ic = I[icon];
            return (
              <Reveal key={i} delay={i * 60}>
                <div style={{
                  padding: "clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,.1)" : "none",
                  display: "flex", flexDirection: "column", gap: 18,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
                    color: "var(--g300)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Ic style={{ width: 22, height: 22 }} />
                  </div>
                  <div style={{
                    fontFamily: "var(--f-display)", fontWeight: 900,
                    fontSize: "clamp(38px,4.5vw,58px)", color: "#ffffff",
                    lineHeight: 1, letterSpacing: "-.02em",
                  }}>
                    <Counter to={n} />{s}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,.92)" }}>{l}</div>
                    <div style={{ fontSize: 13, color: "#c3d2c7", marginTop: 5, lineHeight: 1.5 }}>{sub}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WHAT WE DO
   ============================================================ */
function WhatWeDo() {
  const items = [
    { i: "spark", t: "Mentorship", d: "1-to-1 and cohort-based mentorship pairing students with clinicians and senior mentees across Canada." },
    { i: "flask", t: "Research", d: "Our Summer Research Program places students in mentored research with real, portfolio-worthy output." },
    { i: "pin", t: "Chapters", d: "Local post-secondary chapters run events, fundraisers, and workshops under the M4Y umbrella." },
    { i: "cal", t: "Programs & Events", d: "The Healthcare Bowl, Healthcare Horizons, the Philippines tutoring project, and more - all on one page." },
  ];
  return (
    <section className="section" style={{ background: "var(--paper)", borderBlock: "1px solid var(--line)" }}>
      <div className="container">
        <div className="whatwedo-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 60, alignItems: "start" }}>
          <div className="g-reveal">
            <SectionHead eyebrow="What we do" title="Four pillars, one ecosystem." blurb="We build the scaffolding students need to turn curiosity into a career in medicine - end to end." />
          </div>
          <div className="grid two-col-grid" style={{ gap: 20 }}>
            {items.map((it, i) => {
              const Ic = I[it.i];
              return (
                <Tilt key={i} max={8} className="g-reveal card" style={{ padding: "36px 32px" }}>
                  <div className="tilt-inner">
                    <div style={{ width: 54, height: 54, borderRadius: 16, background: "linear-gradient(135deg, var(--g100), var(--g50))", display: "grid", placeItems: "center", color: "var(--g700)", marginBottom: 26, border: "1px solid var(--g300)", flexShrink: 0 }}><Ic /></div>
                    <h3 style={{ fontSize: 20, marginBottom: 12, lineHeight: 1.2 }}>{it.t}</h3>
                    <p style={{ color: "var(--ink2)", fontSize: 15, lineHeight: 1.65 }}>{it.d}</p>
                  </div>
                </Tilt>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BRANCHES SHOWCASE
   ============================================================ */
function BranchCardLink({ b, className, style, children }) {
  if (b.externalUrl) return <a href={b.externalUrl} target="_blank" rel="noreferrer" className={className} data-branch={b.slug} style={style}>{children}</a>;
  return <Link to={"/branches/" + b.slug} className={className} data-branch={b.slug} style={style}>{children}</Link>;
}

function BranchesShowcase() {
  const loopedBranches = [...BRANCHES, ...BRANCHES];
  return (
    <section className="section" style={{ background: "var(--g50)" }}>
      <div className="container">
        <div className="g-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 32, flexWrap: "wrap" }}>
          <SectionHead eyebrow="Specialty branches" title="Ten branches. One connected organization." blurb="Each branch runs its own events, mentorship, and research threads under one scalable brand system." />
          <Magnetic><Link to="/branches" className="btn btn-ghost">All branches <I.arrow className="arr" /></Link></Magnetic>
        </div>
        <div className="branch-carousel" style={{ marginTop: 40 }}>
          <div className="branch-carousel-track">
            {loopedBranches.map((b, i) => (
              <div key={`${b.slug}-${i}`} className="branch-carousel-item">
                <BranchCardLink b={b} className="card branch-card glow-card" style={{ display: "block", padding: "32px 30px", height: "100%", minHeight: 260 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <BranchMark branch={b} size={56} />
                    <I.arrow style={{ opacity: 0.5 }} />
                  </div>
                  <h3 style={{ marginTop: 24, fontSize: 26, lineHeight: 1.1 }}>{b.name}</h3>
                  <p style={{ color: "var(--ink2)", fontSize: 15, marginTop: 10, maxWidth: 340, lineHeight: 1.6 }}>{b.tagline}</p>
                  <div style={{ marginTop: 22, height: 1, background: "var(--line)" }} />
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--mute)" }}>
                    <span>{b.past.length} past events</span>
                    <span>{b.future.length} upcoming</span>
                  </div>
                </BranchCardLink>
              </div>
            ))}
          </div>
        </div>
        <div className="branch-carousel-mobile" style={{ marginTop: 28 }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
            {BRANCHES.map((b, i) => (
              <Reveal key={b.slug} delay={i * 55}>
                <BranchCardLink b={b} className="card" style={{ display: "block", padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <BranchMark branch={b} size={52} />
                    <I.arrow />
                  </div>
                  <h3 style={{ marginTop: 22, fontSize: 22 }}>{b.name}</h3>
                  <p style={{ color: "var(--ink2)", fontSize: 14, marginTop: 8 }}>{b.tagline}</p>
                  <div style={{ marginTop: 20, height: 1, background: "var(--line)" }} />
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--mute)" }}>
                    <span>{b.past.length} past events</span>
                    <span>{b.future.length} upcoming</span>
                  </div>
                </BranchCardLink>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EVENTS PREVIEW
   ============================================================ */
function EventsPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="g-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 32, flexWrap: "wrap" }}>
          <SectionHead eyebrow="Flagship programs" title="What's on the calendar." />
          <Magnetic><Link to="/programs" className="btn btn-ghost">View all programs <I.arrow className="arr" /></Link></Magnetic>
        </div>
        <div className="grid events-grid" style={{ gridTemplateColumns: "1.3fr 1fr 1fr", gap: 16, marginTop: 36 }}>
          {EVENTS.slice(0, 3).map((e, i) => (
            <Tilt key={i} max={6} glow={false} className="g-reveal card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ overflow: "hidden" }}>
                <Parallax speed={0.12}>
                  <PH label={e.t} src={e.photo} aspect={i === 0 ? "16/11" : "16/9"} variant={i === 0 ? "dark" : i === 1 ? "sage" : ""} />
                </Parallax>
              </div>
              <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className={"pill " + (e.tag === "Coming Soon" ? "deep" : "sage")}>{e.tag}</span>
                  <span className="mono" style={{ color: "var(--mute)" }}>{e.date}</span>
                </div>
                <h3 style={{ fontSize: 20, marginTop: 2 }}>{e.t}</h3>
                <p style={{ fontSize: 14.5, color: "var(--ink2)", lineHeight: 1.6 }}>{e.blurb}</p>
                <div style={{ marginTop: "auto", display: "flex", gap: 8, fontSize: 12.5, color: "var(--mute)", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--line)" }}><I.pin /> {e.loc}</div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SRP SPOTLIGHT
   ============================================================ */
function SRPSpotlight() {
  return (
    <section className="section" style={{ background: "var(--paper)", borderBlock: "1px solid var(--line)" }}>
      <div className="container">
        <div className="srp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ position: "relative" }}>
              <Parallax speed={0.16}>
                <div className="hero-photo">
                  <PH label="Summer Research Program scholars and lab work" src={SITE_PHOTOS.srpSpotlight} aspect="4/5" variant="dark" style={{ borderRadius: 18 }} />
                </div>
              </Parallax>
              <div className="card float-badge" style={{ position: "absolute", right: -20, top: -20, padding: "14px 18px" }}>
                <div className="mono" style={{ color: "var(--mute)" }}>Cohort '25</div>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 900, color: "var(--g900)", lineHeight: 1, marginTop: 4 }}>62 <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink2)" }}>scholars</span></div>
              </div>
              <div className="card float-badge" style={{ position: "absolute", left: -24, bottom: 40, padding: "14px 18px", display: "flex", gap: 10, alignItems: "center" }}>
                <I.flask />
                <div>
                  <div style={{ fontSize: 12, color: "var(--mute)" }}>Output</div>
                  <div style={{ fontWeight: 800, color: "var(--g900)", fontSize: 14 }}>40+ student posters</div>
                </div>
              </div>
            </div>
          </div>
          <div className="stack g-reveal" style={{ gap: 22 }}>
            <span className="eyebrow">SRP · Flagship research</span>
            <h2>Summer <span className="grad-word">Research</span> Program</h2>
            <p style={{ fontSize: 17, color: "var(--ink2)" }}>
              Our flagship program places students in mentored research with clinicians and PIs across Canada, culminating in a symposium, a peer-reviewed M4Y publication, and a portfolio that actually opens doors.
            </p>
            <div className="grid two-col-grid-sm" style={{ gap: 14, marginTop: 10 }}>
              {[["12 weeks", "Structured curriculum"], ["62+", "Students placed"], ["1:1", "Mentor pairings"], ["Symposium", "Closing showcase"]].map(([a, b], i) => (
                <div key={i} className="glow-card" style={{ padding: "20px 22px", border: "1px solid var(--line)", borderRadius: 14, background: "var(--cream)" }}>
                  <div style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: 24, color: "var(--g900)", lineHeight: 1.1 }}>{a}</div>
                  <div style={{ color: "var(--mute)", fontSize: 13, marginTop: 4 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Magnetic><Link to="/srp" className="btn btn-primary">Learn about SRP <I.arrow className="arr" /></Link></Magnetic>
              <Magnetic><Link to="/srp" className="btn btn-ghost">See past papers</Link></Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INSTAGRAM FEED
   ============================================================ */
function InstagramFeed() {
  const posts = [
    { src: SITE_PHOTOS.heroCommunity, likes: 312, caption: "Our Windsor chapter running a bake sale fundraiser for the community 🍰", tag: "Community" },
    { src: SITE_PHOTOS.srpSpotlight, likes: 284, caption: "SRP scholars presenting at the 2025 Research Symposium 🔬", tag: "Research" },
    { src: SITE_PHOTOS.aboutTeam, likes: 198, caption: "McMaster chapter team photo - proud of everyone showing up 💚", tag: "Chapter" },
    { src: SITE_PHOTOS.aboutPrograms, likes: 241, caption: "Workshop day with our Healthcare Horizons panel guests 📚", tag: "Events" },
    { src: SITE_PHOTOS.srpHeroWide, likes: 376, caption: "Clinical skills training with our partners at IMSF 🩺", tag: "Programs" },
    { src: SITE_PHOTOS.srpHeroPoster, likes: 159, caption: "Lab hands-on with SRP mentors - science is fun when it's real 🧬", tag: "SRP" },
    { src: SITE_PHOTOS.heroLeaders, likes: 203, caption: "Behind the scenes with the M4Y leadership team 🤝", tag: "Team" },
    { src: SITE_PHOTOS.eventsFeaturedBowl, likes: 322, caption: "Healthcare Bowl team collaboration - case season is heating up 📋", tag: "Bowl" },
  ];
  return (
    <section className="section ig-section">
      <div className="container" style={{ marginBottom: 28 }}>
        <div className="g-reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
          <SectionHead eyebrow="@medicine4youth" title="The community in motion." blurb="Follow along on Instagram for chapter events, SRP updates, and behind-the-scenes moments." />
          <Magnetic><a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="btn btn-ghost"><I.inst /> Follow us</a></Magnetic>
        </div>
      </div>
      <div className="ig-scroll-outer">
        <div className="ig-scroll-track">
          {posts.map((p, i) => (
            <a key={i} href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="ig-post-card glow-card" style={{ textDecoration: "none" }}>
              <PH label={p.caption} src={p.src} aspect="1/1" style={{ borderRadius: 0, borderBottom: "1px solid var(--line)" }} />
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span className="pill sage" style={{ fontSize: 11, padding: "5px 10px" }}>{p.tag}</span>
                  <div style={{ display: "flex", gap: 5, alignItems: "center", color: "var(--mute)", fontSize: 12 }}><I.heart2 style={{ color: "#e0575a" }} /> {p.likes}</div>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SPONSORS TICKER
   ============================================================ */
function SponsorsTicker() {
  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="container">
        <div className="g-reveal" style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Partner ecosystem</span>
          <h3 style={{ marginTop: 10, fontSize: 22, color: "var(--ink2)", fontWeight: 500, fontFamily: "var(--f-body)", letterSpacing: 0 }}>
            Backed by leading prep, admissions, and community organizations.
          </h3>
        </div>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <span key={i} style={{ fontFamily: "var(--f-display)", fontWeight: 900, fontSize: 24, color: "var(--g900)", opacity: .55, letterSpacing: "-0.02em" }}>
              {s.name}<span style={{ color: "var(--g500)", margin: "0 0 0 48px" }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container" style={{ textAlign: "center", marginTop: 28 }}>
        <Link to="/sponsors" className="link-underline" style={{ color: "var(--g800)", fontSize: 14 }}>See all partners & member discounts →</Link>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
function Testimonials() {
  const quotes = [
    { q: "M4Y turned a summer of 'what do I even do' into my first real research poster and a mentor I still text.", n: "Amara O.", r: "Grade 12 · Toronto" },
    { q: "Starting a chapter was way less daunting than I expected. The playbook is solid and the central team actually shows up.", n: "Devon R.", r: "Chapter Lead · McMaster" },
    { q: "I was choosing between pre-med and engineering. NeuroPsych4Youth is the reason I'm doing both.", n: "Lena K.", r: "1st year · McGill" },
  ];
  return (
    <section className="section" style={{ background: "var(--g100)" }}>
      <div className="container">
        <div className="g-reveal"><SectionHead eyebrow="From the community" title="What students actually say." align="center" /></div>
        <div className="grid testimonials-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 44 }}>
          {quotes.map((t, i) => (
            <Tilt key={i} max={8} className="g-reveal card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="tilt-inner" style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
                <div style={{ fontFamily: "var(--f-display)", fontSize: 60, lineHeight: 0.6, color: "var(--g500)", marginBottom: 4 }}>"</div>
                <p style={{ fontSize: 16.5, color: "var(--ink)", lineHeight: 1.6 }}>{t.q}</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--g300), var(--g500))", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "var(--g900)" }}>{t.n}</div>
                    <div style={{ fontSize: 12.5, color: "var(--mute)", marginTop: 2 }}>{t.r}</div>
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOMEPAGE
   ============================================================ */
function HomePage() {
  useGsapReveals();
  return (
    <>
      <ScrollProgress />
      <Hero />
      <FeaturedProjects />
      <ImpactStats />
      <WhatWeDo />
      <BranchesShowcase />
      <EventsPreview />
      <SRPSpotlight />
      <InstagramFeed />
      <SponsorsTicker />
      <Testimonials />
      <CTABand />
    </>
  );
}

Object.assign(window, { HomePage });
