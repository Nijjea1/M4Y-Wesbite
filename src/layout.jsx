/* Shell: nav and footer */

function Nav() {
  const { route } = useRoute();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-in">
        <Link to="/" className="brandmark">
          <img className="brandmark-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={36} height={36} decoding="async" />
          <span>Medicine<span style={{color:"var(--g500)"}}>4</span>Youth</span>
        </Link>
        <nav className="nav-links">
          {NAV.map(n => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <div className="nav-cta" style={{marginLeft:"auto"}}>
          <Link to="/join" className="btn btn-sm btn-ghost">Join Us</Link>
          <button onClick={() => setMobileOpen(true)} className="btn btn-sm btn-ghost mobile-menu-btn" aria-label="Menu">☰</button>
        </div>
      </div>
      {mobileOpen && (
        <div style={{position:"fixed", inset:0, background:"#fff", zIndex:100, padding:"24px"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, marginBottom:24, paddingBottom:16, borderBottom:"1px solid var(--line)"}}>
            <Link to="/" className="brandmark" onClick={() => setMobileOpen(false)}>
              <img className="brandmark-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={36} height={36} decoding="async" />
              <span>Medicine<span style={{color:"var(--g500)"}}>4</span>Youth</span>
            </Link>
            <button type="button" onClick={() => setMobileOpen(false)} className="btn btn-sm btn-ghost" aria-label="Close menu">Close ✕</button>
          </div>
          <div className="stack" style={{gap:12}}>
            {NAV.map(n => <Link key={n.to} to={n.to} onClick={()=>setMobileOpen(false)} style={{padding:"14px 0", fontSize:22, fontWeight:700, borderBottom:"1px solid var(--line)"}}>{n.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container" style={{display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr 1fr", gap:48}}>
        <div className="stack" style={{gap:18}}>
          <Link to="/" className="brandmark brandmark--on-dark" style={{color:"#fff"}}>
            <img className="brandmark-logo brandmark-logo--footer" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={44} height={44} decoding="async" />
            <span>Medicine<span style={{color:"var(--g300)"}}>4</span>Youth</span>
          </Link>
          <p style={{color:"#c3d2c7", fontSize:14, maxWidth:320}}>
            A Canadian not-for-profit charity registered with the CRA, empowering students pursuing medicine and healthcare through mentorship, research, chapters, and community.
          </p>
          <div style={{display:"flex", gap:10}}>
            <a href="mailto:Presidents@medicine4youth.ca" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.mail/> Email</a>
            <a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.inst/> Instagram</a>
            <a href="https://www.linkedin.com/company/medicine4youth/" target="_blank" rel="noreferrer" className="pill" style={{background:"rgba(255,255,255,.06)", borderColor:"rgba(255,255,255,.15)", color:"#fff"}}><I.link/> LinkedIn</a>
          </div>
        </div>
        <div className="stack" style={{gap:10}}>
          <h4>Explore</h4>
          {NAV.slice(0,5).map(n => <Link key={n.to} to={n.to} style={{fontSize:14, padding:"4px 0"}}>{n.label}</Link>)}
        </div>
        <div className="stack" style={{gap:10}}>
          <h4>Programs</h4>
          <Link to="/srp" style={{fontSize:14, padding:"4px 0"}}>Summer Research Program (SRP)</Link>
          <Link to="/programs" style={{fontSize:14, padding:"4px 0"}}>Healthcare Bowl</Link>
          <Link to="/programs" style={{fontSize:14, padding:"4px 0"}}>Healthcare Horizons</Link>
          <Link to="/sponsors" style={{fontSize:14, padding:"4px 0"}}>Sponsor Perks</Link>
        </div>
        <div className="stack" style={{gap:10}}>
          <h4>Branches</h4>
          {BRANCHES.map(b => <Link key={b.slug} to={"/branches/"+b.slug} style={{fontSize:14, padding:"4px 0"}}>{b.name}</Link>)}
        </div>
      </div>
      <div className="container" style={{marginTop:48, paddingTop:24, borderTop:"1px solid rgba(255,255,255,.1)", display:"flex", justifyContent:"space-between", fontSize:12, color:"#8a9b90"}}>
        <span>© 2026 Medicine4Youth. CRA-registered Canadian charity · Not a U.S. 501(c) organization.</span>
        <span>Site system v1.0, scalable by design.</span>
      </div>
    </footer>
  );
}

/* Page hero shared */
function PageHero({ eyebrow, title, blurb, rightSlot }) {
  return (
    <section className="page-hero">
      <div className="container" style={{display:"grid", gridTemplateColumns: rightSlot ? "1.4fr 1fr" : "1fr", gap:40, alignItems:"end"}}>
        <div className="stack" style={{gap:18}}>
          <span className="eyebrow">{eyebrow}</span>
          <h1 style={{fontSize:"clamp(40px,5vw,68px)"}}>{title}</h1>
          {blurb && <p style={{fontSize:18, color:"var(--ink2)", maxWidth:680}}>{blurb}</p>}
        </div>
        {rightSlot}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Footer, PageHero });
