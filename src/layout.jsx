/* Shell: nav and footer */

function Nav() {
  const { route } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, toggleDark] = useDarkMode();

  return (
    <header className="nav nav-glass">
      <div className="nav-in">
        <Link to="/" className="brandmark">
          <img className="brandmark-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={36} height={36} decoding="async" />
          <span>Medicine<span style={{color:"var(--g500)"}}>4</span>Youth</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {NAV.map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <div className="nav-cta" style={{marginLeft:"auto"}}>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <I.sun/> : <I.moon/>}
          </button>
          <Link to="/join" className="btn btn-sm btn-primary">Join Us</Link>
          <button onClick={() => setMobileOpen(true)} className="btn btn-sm btn-ghost mobile-menu-btn" aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="mobile-nav">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div id="mobile-nav" className="mobile-menu-panel" style={{position:"fixed", inset:0, background:"var(--cream)", zIndex:100, padding:"24px"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, marginBottom:24, paddingBottom:16, borderBottom:"1px solid var(--line)"}}>
            <Link to="/" className="brandmark" onClick={() => setMobileOpen(false)}>
              <img className="brandmark-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={36} height={36} decoding="async" />
              <span>Medicine<span style={{color:"var(--g500)"}}>4</span>Youth</span>
            </Link>
            <div style={{display:"flex", gap:8, alignItems:"center"}}>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleDark}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <I.sun/> : <I.moon/>}
              </button>
              <button type="button" onClick={() => setMobileOpen(false)} className="btn btn-sm btn-ghost" aria-label="Close menu" style={{display:"inline-flex", gap:6, alignItems:"center"}}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                Close
              </button>
            </div>
          </div>
          <div className="stack" style={{gap:4}}>
            {NAV.map(n => <Link key={n.to} to={n.to} onClick={()=>setMobileOpen(false)} style={{padding:"16px 4px", fontSize:20, fontWeight:700, borderBottom:"1px solid var(--line)", color:"var(--ink)", display:"flex", alignItems:"center"}}>{n.label}</Link>)}
          </div>
          <Link to="/join" className="btn btn-primary btn-lg" style={{marginTop:24, justifyContent:"center"}} onClick={()=>setMobileOpen(false)}>Join Us <I.arrow className="arr"/></Link>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="footer-grid container">
        <div className="stack" style={{gap:18}}>
          <Link to="/" className="brandmark brandmark--on-dark" style={{color:"#fff"}}>
            <img className="brandmark-logo brandmark-logo--footer" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={44} height={44} decoding="async" />
            <span>Medicine<span style={{color:"var(--g300)"}}>4</span>Youth</span>
          </Link>
          <p style={{color:"#c3d2c7", fontSize:14, maxWidth:320}}>
            A Canadian not-for-profit registered with the CRA, empowering students pursuing medicine and healthcare through mentorship, research, chapters, and community.
          </p>
          <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
            <a href="mailto:Presidents@medicine4youth.ca" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.mail aria-hidden="true"/> Email</a>
            <a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noopener noreferrer" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.inst/> Instagram<span className="sr-only"> (opens in new tab)</span></a>
            <a href="https://www.linkedin.com/company/medicine4youth/" target="_blank" rel="noopener noreferrer" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.link/> LinkedIn<span className="sr-only"> (opens in new tab)</span></a>
          </div>
        </div>
        <div className="stack" style={{gap:6}}>
          <h4 style={{marginBottom:8}}>Explore</h4>
          {NAV.slice(0,5).map(n => <Link key={n.to} to={n.to} style={{fontSize:14, padding:"5px 0"}}>{n.label}</Link>)}
        </div>
        <div className="stack" style={{gap:6}}>
          <h4 style={{marginBottom:8}}>Programs</h4>
          <Link to="/srp" style={{fontSize:14, padding:"5px 0"}}>Summer Research Program</Link>
          <Link to="/programs" style={{fontSize:14, padding:"5px 0"}}>Healthcare Bowl</Link>
          <Link to="/programs" style={{fontSize:14, padding:"5px 0"}}>Healthcare Horizons</Link>
          <Link to="/programs" style={{fontSize:14, padding:"5px 0"}}>Philippines Tutoring</Link>
          <Link to="/sponsors" style={{fontSize:14, padding:"5px 0"}}>Sponsor Perks</Link>
        </div>
        <div className="stack" style={{gap:6}}>
          <h4 style={{marginBottom:8}}>Branches</h4>
          {BRANCHES.map(b => b.externalUrl
            ? <a key={b.slug} href={b.externalUrl} target="_blank" rel="noreferrer" style={{fontSize:14, padding:"5px 0"}}>{b.name}</a>
            : <Link key={b.slug} to={"/branches/"+b.slug} style={{fontSize:14, padding:"5px 0"}}>{b.name}</Link>
          )}
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Medicine4Youth. CRA-registered Canadian not-for-profit · Not a U.S. 501(c) organization.</span>
        <span>Est. 2020 · Site v2.0</span>
      </div>
    </footer>
  );
}

/* Page hero shared */
function PageHero({ eyebrow, title, blurb, rightSlot }) {
  return (
    <section className="page-hero">
      <div className="hero-bg" style={{opacity:.8}}/>
      <div className="hero-grid"/>
      {/* Subtle right-side accent blob */}
      <div style={{position:"absolute",right:"-6%",top:"-10%",width:"38vw",height:"38vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(188,219,165,.28) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div className="container" style={{position:"relative", zIndex:1, display:"grid", gridTemplateColumns: rightSlot ? "1.35fr 1fr" : "1fr", gap:48, alignItems:"end"}}>
        <div className="stack" style={{gap:20}}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{fontSize:"clamp(38px,5vw,64px)"}}>{title}</h1>
          {blurb && <p style={{fontSize:18, color:"var(--ink2)", maxWidth:640, lineHeight:1.65}}>{blurb}</p>}
        </div>
        {rightSlot}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Footer, PageHero });
