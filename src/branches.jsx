/* Branch template, parameterized by slug */

function BranchMotif({ motif }) {
  const common = { position:"absolute", inset:0, pointerEvents:"none", opacity:.35 };
  if (motif === "neural-net") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        <g stroke="var(--accent)" strokeWidth="1" fill="none" opacity=".7">
          {Array.from({length:20}).map((_,i)=><circle key={i} cx={60+i*36} cy={200+Math.sin(i)*60} r="4" fill="var(--accent)"/>)}
          {Array.from({length:20}).map((_,i)=><line key={i} x1={60+i*36} y1={200+Math.sin(i)*60} x2={60+(i+1)*36} y2={200+Math.sin(i+1)*60}/>)}
        </g>
      </svg>
    );
  }
  if (motif === "wave") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {[0,1,2,3].map(i => <path key={i} d={`M0 ${120+i*40} Q200 ${80+i*40} 400 ${120+i*40} T800 ${120+i*40}`} stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity=".5"/>)}
      </svg>
    );
  }
  if (motif === "orbit") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {[60,120,180,240].map(r => <ellipse key={r} cx="400" cy="200" rx={r*2} ry={r} stroke="var(--accent)" strokeWidth="1" fill="none" opacity=".4"/>)}
      </svg>
    );
  }
  if (motif === "editorial") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {Array.from({length:8}).map((_,i)=><line key={i} x1="0" y1={50+i*50} x2="800" y2={50+i*50} stroke="var(--accent)" strokeWidth=".6" opacity=".4"/>)}
      </svg>
    );
  }
  if (motif === "strata") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {Array.from({length:12}).map((_,i)=><rect key={i} x={i*70} y={0} width="40" height="400" fill="var(--accent)" opacity={0.04+i*0.02}/>)}
      </svg>
    );
  }
  if (motif === "concentric") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {[40,80,120,160,200,240].map(r => <circle key={r} cx="680" cy="80" r={r} stroke="var(--accent)" strokeWidth="1" fill="none" opacity=".45"/>)}
      </svg>
    );
  }
  if (motif === "arc") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {[0, 1, 2, 3].map(i => (
          <path key={i} d={`M ${80 + i * 180} 340 Q ${200 + i * 180} ${120 + i * 30} ${320 + i * 180} 340`} stroke="var(--accent)" strokeWidth="1.2" fill="none" opacity={0.35 + i * 0.08}/>
        ))}
      </svg>
    );
  }
  if (motif === "hearts") {
    return (
      <svg style={common} viewBox="0 0 800 400" preserveAspectRatio="none">
        {[[120, 120], [380, 200], [620, 100]].map(([cx, cy], i) => (
          <path key={i} d={`M ${cx} ${cy + 12} C ${cx - 28} ${cy - 20} ${cx - 40} ${cy + 24} ${cx} ${cy + 52} C ${cx + 40} ${cy + 24} ${cx + 28} ${cy - 20} ${cx} ${cy + 12}`} fill="var(--accent)" opacity={0.12 + i * 0.06}/>
        ))}
      </svg>
    );
  }
  return null;
}

/* ── Optometry4Youth count-up stat ── */
function O4YStat({ value, label, prefix, suffix, accentColor }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const startTime = performance.now();
        const end = parseInt(value, 10);
        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(ease * end));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign:"center", padding:"32px 20px" }}>
      <div style={{
        fontSize:"clamp(42px,5vw,64px)",
        fontWeight:800,
        fontFamily:"var(--f-display)",
        color: accentColor || "var(--accent)",
        lineHeight:1,
        letterSpacing:"-0.02em",
      }}>
        {prefix || ""}{count.toLocaleString()}{suffix || ""}
      </div>
      <div style={{ fontSize:13, color:"var(--ink2)", marginTop:10, fontWeight:500, letterSpacing:".06em", textTransform:"uppercase" }}>{label}</div>
    </div>
  );
}

/* ── Optometry logo with coin-spin on mount ── */
function OptomLogo({ src }) {
  React.useEffect(() => {
    if (document.getElementById("o4y-coin-spin")) return;
    const s = document.createElement("style");
    s.id = "o4y-coin-spin";
    s.textContent = `
      @keyframes o4yCoinSpin {
        0%   { transform: rotateY(1800deg) scale(0.8); opacity: 0; }
        8%   { opacity: 1; }
        100% { transform: rotateY(0deg)    scale(1);   opacity: 1; }
      }
    `;
    document.head.appendChild(s);
  }, []);
  return (
    <img
      src={src}
      alt="Optometry4Youth logo"
      style={{
        width: "min(88%,320px)",
        height: "min(88%,320px)",
        objectFit: "contain",
        animation: "o4yCoinSpin 1.8s cubic-bezier(0.12,0.8,0.32,1) forwards",
      }}
    />
  );
}

/* ── Optometry4Youth full page ── */
function OptomPage({ b }) {
  const TEAL = "#509090";
  const TEAL_LIGHT = "#e8f3f3";
  const TEAL_DARK = "#2d6060";

  const stats = [
    { value:350, label:"Students Reached", suffix:"+" },
    { value:2,   label:"Events Hosted" },
    { value:3,   label:"Partner Schools", suffix:"+" },
    { value:1,   label:"Newsletter Issues", suffix:"+" },
  ];

  return (
    <div data-branch={b.slug}>

      {/* ── Hero ── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(135deg, ${TEAL_DARK} 0%, ${TEAL} 50%, #6fb3b3 100%)`,
        minHeight:520,
        display:"grid", placeItems:"center",
        paddingBlock:"clamp(72px,10vw,120px)",
      }}>
        {/* Decorative concentric rings */}
        <svg style={{position:"absolute", right:"-5%", top:"-20%", width:"55%", opacity:.15, pointerEvents:"none"}} viewBox="0 0 500 500">
          {[60,110,160,215,270,330].map(r=><circle key={r} cx="420" cy="120" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
        </svg>
        {/* Light scatter dots */}
        <svg style={{position:"absolute", left:"5%", bottom:"10%", opacity:.12, pointerEvents:"none"}} width="180" height="180" viewBox="0 0 180 180">
          {Array.from({length:18}).map((_,i)=><circle key={i} cx={(i%6)*30+15} cy={Math.floor(i/6)*30+15} r="3" fill="#fff"/>)}
        </svg>

        <div className="container b-grid-hero" style={{position:"relative"}}>
          <div className="stack" style={{gap:24, color:"#fff"}}>
            <span style={{
              display:"inline-flex", alignItems:"center", gap:10,
              background:"rgba(255,255,255,.15)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.25)",
              borderRadius:999, padding:"6px 16px 6px 8px",
              fontSize:13, fontWeight:600, letterSpacing:".04em", width:"fit-content",
            }}>
              <BranchMark branch={b} size={28} circle={false} style={{borderRadius:8}}/>
              Optometry4Youth · M4Y Branch
            </span>
            <h1 style={{fontSize:"clamp(40px,5.5vw,72px)", color:"#fff", lineHeight:.95}}>
              Optometry<br/>
              <span style={{opacity:.7}}>4Youth</span>
            </h1>
            <p style={{fontSize:18, color:"rgba(255,255,255,.8)", maxWidth:520, lineHeight:1.6}}>{b.tagline}</p>
            <div style={{display:"flex", gap:12, marginTop:8, flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-primary" style={{background:"#fff", color:TEAL_DARK, border:"none", fontWeight:700}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-ghost" style={{color:"#fff", border:"1px solid rgba(255,255,255,.35)"}}>All branches</Link>
            </div>
          </div>

          <div style={{display:"grid", placeItems:"center"}}>
            {b.logo ? <OptomLogo src={b.logo}/> : <I.eye style={{width:80, height:80, color:"rgba(255,255,255,.8)"}}/>}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section style={{background:"var(--paper)", borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div className="b-stats-4">
            {stats.map((s, i) => (
              <div key={i} style={{
                borderRight: i < stats.length - 1 ? "1px solid var(--line)" : "none",
              }}>
                <O4YStat {...s}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + Mission ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
        <div className="container two-col-grid" style={{gap:48}}>
          <Reveal>
            <div className="card" style={{padding:"clamp(28px,4vw,44px)", height:"100%", display:"flex", flexDirection:"column", gap:16}}>
              <span className="eyebrow">About</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)", lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:16, color:"var(--ink2)", lineHeight:1.75, marginTop:4}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              padding:"clamp(28px,4vw,44px)",
              background:`linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)`,
              borderRadius:"var(--r-lg)",
              height:"100%", display:"flex", flexDirection:"column", gap:16, color:"#fff",
              position:"relative", overflow:"hidden",
            }}>
              <svg style={{position:"absolute",top:"-30%",right:"-10%",opacity:.15,pointerEvents:"none"}} width="260" height="260" viewBox="0 0 260 260">
                {[40,80,120].map(r=><circle key={r} cx="220" cy="60" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
              </svg>
              <span style={{fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", opacity:.65}}>Our Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)", lineHeight:1.15, color:"#fff"}}>Why it matters.</h2>
              <p style={{fontSize:17, color:"rgba(255,255,255,.85)", lineHeight:1.7, fontWeight:450}}>{b.mission}</p>
              <Link to="/join" className="btn" style={{
                marginTop:"auto", alignSelf:"flex-start",
                background:"rgba(255,255,255,.18)", color:"#fff",
                border:"1px solid rgba(255,255,255,.3)", backdropFilter:"blur(4px)",
              }}>
                Get involved <I.arrow className="arr"/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Past Events (alternating layout) ── */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)", background:"var(--g50)", borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <Reveal>
              <div style={{marginBottom:32}}>
                <span className="eyebrow">Past Events</span>
                <h2 style={{fontSize:"clamp(28px,3vw,42px)", marginTop:10}}>What we've done.</h2>
              </div>
            </Reveal>
            <div style={{display:"flex", flexDirection:"column", gap:24}}>
              {b.past.map((e, i) => (
                <Reveal key={i} delay={i*80}>
                  <div className="b-event-row" style={{
                    display:"grid",
                    gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr",
                    gap:0, borderRadius:"var(--r-lg)", overflow:"hidden",
                    boxShadow:"var(--sh-1)", background:"var(--surface)",
                    border:"1px solid var(--line)",
                    minHeight:280,
                  }}>
                    {/* Image side */}
                    <div style={{
                      order: i % 2 === 0 ? 0 : 1,
                      position:"relative", overflow:"hidden", minHeight:240,
                    }}>
                      <PH
                        label={e.t}
                        src={e.img || null}
                        style={{
                          position:"absolute", inset:0,
                          width:"100%", height:"100%",
                          borderRadius:0,
                          transition:"transform .5s ease",
                          objectPosition: e.imgPos || "center center",
                        }}
                      />
                      <div style={{
                        position:"absolute", inset:0,
                        background:"linear-gradient(135deg, rgba(45,96,96,.3), transparent)",
                      }}/>
                    </div>
                    {/* Text side */}
                    <div style={{
                      order: i % 2 === 0 ? 1 : 0,
                      padding:"clamp(28px,4vw,48px)",
                      display:"flex", flexDirection:"column", justifyContent:"center", gap:14,
                    }}>
                      <span className="pill" style={{alignSelf:"flex-start", fontSize:11}}>Past Event</span>
                      <h3 style={{fontSize:"clamp(20px,2.2vw,28px)", lineHeight:1.2}}>{e.t}</h3>
                      <p style={{fontSize:15, color:"var(--ink2)", lineHeight:1.7}}>{e.d}</p>
                      <div style={{
                        width:40, height:3, borderRadius:2,
                        background:`linear-gradient(90deg, ${TEAL}, ${TEAL_DARK})`,
                        marginTop:4,
                      }}/>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Ghana Eyeglasses Drive Impact ── */}
      <section style={{
        background:`linear-gradient(135deg, ${TEAL_DARK} 0%, #1d4545 100%)`,
        paddingBlock:"clamp(64px,8vw,96px)",
        position:"relative", overflow:"hidden",
      }}>
        {/* BG decoration */}
        <svg style={{position:"absolute",right:"-4%",top:"-20%",opacity:.08,pointerEvents:"none"}} width="480" height="480" viewBox="0 0 480 480">
          {[60,120,180,240,300,360].map(r=><circle key={r} cx="440" cy="80" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
        </svg>
        <div style={{position:"absolute",left:"5%",bottom:"-10%",opacity:.06,pointerEvents:"none"}}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            {Array.from({length:16}).map((_,i)=><circle key={i} cx={(i%4)*48+24} cy={Math.floor(i/4)*48+24} r="4" fill="#fff"/>)}
          </svg>
        </div>

        <div className="container" style={{position:"relative"}}>
          <Reveal>
            <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:32}}>
              <div style={{
                width:40, height:40, borderRadius:10,
                background:"rgba(255,255,255,.15)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <I.globe style={{color:"#fff", width:18, height:18}}/>
              </div>
              <span style={{fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,255,255,.55)"}}>Community Outreach · Ghana</span>
            </div>
          </Reveal>

          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center"}}>
            {/* Left: headline + body */}
            <Reveal>
              <div style={{display:"flex", flexDirection:"column", gap:20, color:"#fff"}}>
                <h2 style={{fontSize:"clamp(32px,4vw,56px)", color:"#fff", lineHeight:1, letterSpacing:"-.02em"}}>
                  100+ pairs.<br/>
                  <span style={{opacity:.65}}>One country.</span>
                </h2>
                <p style={{fontSize:17, color:"rgba(255,255,255,.78)", lineHeight:1.75, maxWidth:440}}>
                  O4Y ran a cross-campus eyeglasses drive, placing donation boxes at 6 Canadian universities. Every pair collected was sent through Foundation Glasses to the St. Ignatius Eye Centre in Ghana, where clear vision changes educational outcomes and daily life.
                </p>
                <p style={{fontSize:14, color:"rgba(255,255,255,.45)", lineHeight:1.6}}>
                  In partnership with Foundation Glasses and St. Ignatius Eye Centre, Sunyani, Ghana.
                </p>
              </div>
            </Reveal>

            {/* Right: stat cards */}
            <Reveal delay={100}>
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
                {[
                  { value:"100+", label:"Pairs Collected" },
                  { value:"6",    label:"Campuses" },
                  { value:"1",    label:"Country Reached" },
                  { value:"1",    label:"Eye Centre Supported" },
                ].map((s,i) => (
                  <div key={i} style={{
                    background:"rgba(255,255,255,.1)",
                    border:"1px solid rgba(255,255,255,.15)",
                    borderRadius:16, padding:"24px 20px",
                    backdropFilter:"blur(8px)",
                    display:"flex", flexDirection:"column", gap:6,
                  }}>
                    <span style={{fontSize:"clamp(28px,3vw,40px)", fontWeight:900, color:"#fff", letterSpacing:"-.02em", lineHeight:1}}>{s.value}</span>
                    <span style={{fontSize:12, fontWeight:600, color:"rgba(255,255,255,.55)", letterSpacing:".06em", textTransform:"uppercase"}}>{s.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Current Initiatives ── */}
      {b.initiatives && b.initiatives.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
          <div className="container">
            <Reveal>
              <div style={{marginBottom:32}}>
                <span className="eyebrow">Initiatives</span>
                <h2 style={{fontSize:"clamp(28px,3vw,42px)", marginTop:10}}>What we're building.</h2>
              </div>
            </Reveal>
            <div className="two-col-grid" style={{alignItems:"start"}}>
              {b.initiatives.map((ini, i) => {
                const Ic = I[ini.icon] || I.eye;
                const accentColors = [TEAL, "#4a7d8a", "#3d6b78", "#508080"];
                const ac = accentColors[i % accentColors.length];
                return (
                  <Reveal key={i} delay={i * 70}>
                    <div style={{
                      borderRadius:"var(--r-lg)", overflow:"hidden",
                      border:"1px solid var(--line)", background:"var(--surface)",
                      boxShadow:"var(--sh-1)",
                      display:"flex", flexDirection:"column",
                      transition:"box-shadow .25s, transform .25s",
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--sh-2)";e.currentTarget.style.transform="translateY(-3px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      {/* Colored header strip */}
                      <div style={{
                        padding:"20px 24px",
                        background:`linear-gradient(135deg, ${ac}, ${ac}cc)`,
                        display:"flex", alignItems:"center", justifyContent:"space-between",
                      }}>
                        <div style={{
                          width:44, height:44, borderRadius:12,
                          background:"rgba(255,255,255,.2)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff",
                        }}>
                          <Ic/>
                        </div>
                        <span style={{
                          fontSize:11, fontWeight:700, letterSpacing:".08em",
                          textTransform:"uppercase", color:"rgba(255,255,255,.85)",
                          background:"rgba(255,255,255,.15)",
                          padding:"4px 10px", borderRadius:999,
                        }}>{ini.tag}</span>
                      </div>
                      {/* Body */}
                      <div style={{padding:"22px 24px 24px", flex:1, display:"flex", flexDirection:"column", gap:10}}>
                        <h3 style={{fontSize:18}}>{ini.t}</h3>
                        <p style={{color:"var(--ink2)", fontSize:14, lineHeight:1.65}}>{ini.d}</p>
                        {ini.href && (
                          <a href={ini.href} target="_blank" rel="noreferrer"
                            className="btn btn-ghost btn-sm"
                            style={{marginTop:"auto", alignSelf:"flex-start"}}>
                            <I.ext/> View Issues
                          </a>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Focus Forward Newsletter ── */}
      <section style={{background:TEAL_DARK, paddingBlock:"clamp(64px,8vw,100px)", position:"relative", overflow:"hidden"}}>
        {/* BG decoration */}
        <svg style={{position:"absolute",right:0,top:0,opacity:.1,pointerEvents:"none"}} width="420" height="420" viewBox="0 0 420 420">
          {[60,110,160,210,260,310].map(r=><circle key={r} cx="420" cy="0" r={r} stroke="#fff" strokeWidth="1" fill="none"/>)}
        </svg>
        <svg style={{position:"absolute",left:"-5%",bottom:"-20%",opacity:.07,pointerEvents:"none"}} width="300" height="300" viewBox="0 0 300 300">
          {Array.from({length:25}).map((_,i)=><circle key={i} cx={(i%5)*56+28} cy={Math.floor(i/5)*56+28} r="4" fill="#fff"/>)}
        </svg>

        <div className="container" style={{position:"relative"}}>
          <div className="b-two-col-wide">
            {/* Text side */}
            <Reveal>
              <div style={{color:"#fff", display:"flex", flexDirection:"column", gap:20}}>
                <div style={{display:"flex", alignItems:"center", gap:12}}>
                  <div style={{
                    width:44, height:44, borderRadius:12,
                    background:"rgba(255,255,255,.15)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    <I.book/>
                  </div>
                  <span style={{fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", opacity:.65}}>Publications · Vol. 1</span>
                </div>
                <h2 style={{fontSize:"clamp(32px,4vw,52px)", color:"#fff", lineHeight:1.05}}>Focus Forward</h2>
                <p style={{fontSize:16, color:"rgba(255,255,255,.75)", lineHeight:1.75}}>
                  O4Y's monthly newsletter highlighting recent discoveries in optometry, eye health and care. Each issue covers ocular disease spotlights, OAT prep guidance, school admissions insights, and career features from practicing optometrists.
                </p>
                <div style={{
                  display:"flex", gap:10, fontSize:13, color:"rgba(255,255,255,.6)",
                  fontFamily:"var(--f-mono)", letterSpacing:".05em",
                }}>
                  <span>Monthly</span>
                  <span>·</span>
                  <span>Issue 01 · March 2026</span>
                </div>
                <div style={{display:"flex", gap:12, flexWrap:"wrap", marginTop:4}}>
                  <a href="https://drive.google.com/drive/folders/1HvsfKJZmo66vvsRiTf5Pk8WxOCp5i44Q?usp=sharing"
                    target="_blank" rel="noreferrer"
                    className="btn"
                    style={{background:"#fff", color:TEAL_DARK, fontWeight:700, border:"none"}}>
                    <I.ext/> Read the Newsletter
                  </a>
                  <a href="https://drive.google.com/drive/folders/1HvsfKJZmo66vvsRiTf5Pk8WxOCp5i44Q?usp=sharing"
                    target="_blank" rel="noreferrer"
                    className="btn btn-ghost"
                    style={{color:"#fff", borderColor:"rgba(255,255,255,.3)"}}>
                    <I.download/> Download PDF
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Newsletter preview card */}
            <Reveal delay={80}>
              <div style={{
                borderRadius:"var(--r-xl)", overflow:"hidden",
                boxShadow:"0 24px 64px rgba(0,0,0,.35)",
                aspectRatio:"3/4",
                position:"relative",
                background:"#3d6b78",
              }}>
                <PH
                  label="Focus Forward - Issue 01"
                  src="./assets/optom/focus-forward.webp"
                  style={{position:"absolute", inset:0, width:"100%", height:"100%", borderRadius:0}}
                />
                {/* Glass overlay at bottom */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0,
                  padding:"28px 24px",
                  background:"linear-gradient(to top, rgba(45,96,96,.95) 0%, transparent 100%)",
                }}>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.5)", marginBottom:8}}>
                    Focus Forward
                  </div>
                  <div style={{color:"#fff", fontSize:19, fontWeight:700, lineHeight:1.2}}>Issue 01 - March 2026</div>
                  <div style={{color:"rgba(255,255,255,.6)", fontSize:13, marginTop:4}}>Eye Health · OAT Prep · Admissions</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
          <div className="container">
            <Reveal>
              <div style={{marginBottom:32}}>
                <span className="eyebrow">Upcoming</span>
                <h2 style={{fontSize:"clamp(28px,3vw,42px)", marginTop:10}}>What's next.</h2>
              </div>
            </Reveal>
            <div className="two-col-grid" style={{alignItems:"start"}}>
              {b.future.map((e, i) => (
                <Reveal key={i} delay={i*70}>
                  <div style={{
                    borderRadius:"var(--r-lg)", overflow:"hidden",
                    border:"1px solid var(--line)", background:"var(--surface)",
                    padding:"32px 36px",
                    display:"flex", flexDirection:"column", gap:14,
                    boxShadow:"var(--sh-1)",
                    position:"relative",
                    transition:"box-shadow .25s, transform .25s",
                  }}
                    onMouseEnter={e2=>{e2.currentTarget.style.boxShadow="var(--sh-2)";e2.currentTarget.style.transform="translateY(-3px)"}}
                    onMouseLeave={e2=>{e2.currentTarget.style.boxShadow="var(--sh-1)";e2.currentTarget.style.transform="translateY(0)"}}
                  >
                    {/* Accent bar */}
                    <div style={{
                      position:"absolute", top:0, left:0, right:0, height:3,
                      background:`linear-gradient(90deg, ${TEAL}, ${TEAL_DARK})`,
                    }}/>
                    <span className="pill deep" style={{alignSelf:"flex-start", fontSize:11}}>Upcoming</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,22px)"}}>{e.t}</h3>
                    <p style={{fontSize:14, color:"var(--ink2)", lineHeight:1.65}}>{e.d}</p>
                    <div style={{
                      fontFamily:"var(--f-mono)", fontSize:12,
                      color:TEAL, fontWeight:700,
                      letterSpacing:".04em", marginTop:4,
                    }}>{e.when}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingTop:"clamp(24px,3vw,40px)", paddingBottom:"clamp(40px,5vw,64px)"}}>
        <div className="container">
          <Reveal>
            <div className="branch-cta-grid" style={{
              borderRadius:"var(--r-xl)", overflow:"hidden",
              background:`linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)`,
              padding:"clamp(40px,6vw,72px)",
              position:"relative",
            }}>
              <svg style={{position:"absolute",right:0,top:0,opacity:.12,pointerEvents:"none"}} width="320" height="320" viewBox="0 0 320 320">
                {[50,100,150,200].map(r=><circle key={r} cx="320" cy="0" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
              </svg>
              <div style={{color:"#fff"}}>
                <span style={{fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", opacity:.6}}>Get Involved</span>
                <h2 style={{fontSize:"clamp(26px,3vw,40px)", color:"#fff", marginTop:12}}>Join Optometry4Youth.</h2>
                <p style={{fontSize:16, color:"rgba(255,255,255,.75)", marginTop:12, maxWidth:460, lineHeight:1.6}}>
                  Members receive branch-specific mentorship, event invites, optometry shadowing opportunities, and access to the Focus Forward newsletter.
                </p>
              </div>
              <div style={{display:"flex", gap:12, justifyContent:"flex-end", flexWrap:"wrap", position:"relative"}}>
                <Link to="/join" className="btn btn-lg"
                  style={{background:"#fff", color:TEAL_DARK, fontWeight:700, border:"none"}}>
                  Join the Branch <I.arrow className="arr"/>
                </Link>
                <Link to="/branches" className="btn btn-lg btn-ghost"
                  style={{color:"#fff", borderColor:"rgba(255,255,255,.3)"}}>
                  Browse others
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── EndoPath4Youth full page ── */
function EndoPathPage({ b }) {
  const AMBER      = "#c87818";
  const AMBER_DARK = "#7a4800";
  const AMBER_MID  = "#e08820";

  const stats = [
    { value:200, label:"Students Reached", suffix:"+" },
    { value:1,   label:"Speaker Events" },
    { value:3,   label:"Posts Published", suffix:"+" },
    { value:4,   label:"Active Initiatives" },
  ];

  return (
    <div data-branch={b.slug}>

      {/* ── Hero ── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(135deg, ${AMBER_DARK} 0%, ${AMBER} 55%, #e8a840 100%)`,
        minHeight:520, display:"grid", placeItems:"center",
        paddingBlock:"clamp(72px,10vw,120px)",
      }}>
        <svg style={{position:"absolute",right:"-4%",top:"-15%",width:"50%",opacity:.12,pointerEvents:"none"}} viewBox="0 0 600 600">
          {Array.from({length:12}).map((_,i)=>(
            <rect key={i} x={i*52} y={0} width={32} height={600} fill="#fff" opacity={0.04+i*0.025}/>
          ))}
        </svg>
        <svg style={{position:"absolute",left:"3%",bottom:"8%",opacity:.1,pointerEvents:"none"}} width="160" height="160" viewBox="0 0 160 160">
          {Array.from({length:16}).map((_,i)=><circle key={i} cx={(i%4)*38+19} cy={Math.floor(i/4)*38+19} r="3.5" fill="#fff"/>)}
        </svg>

        <div className="container b-grid-hero" style={{position:"relative"}}>
          <div className="stack" style={{gap:24,color:"#fff"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:10,
              background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.25)",
              borderRadius:999,padding:"6px 16px 6px 8px",
              fontSize:13,fontWeight:600,letterSpacing:".04em",width:"fit-content",
            }}>
              <BranchMark branch={b} size={28} circle={false} style={{borderRadius:8}}/>
              EndoPath4Youth · M4Y Branch
            </span>
            <h1 style={{fontSize:"clamp(38px,5vw,68px)",color:"#fff",lineHeight:.95}}>
              EndoPath<br/>
              <span style={{opacity:.65}}>4Youth</span>
            </h1>
            <p style={{fontSize:18,color:"rgba(255,255,255,.85)",maxWidth:520,lineHeight:1.6}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-primary" style={{background:"#fff",color:AMBER_DARK,border:"none",fontWeight:700}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.35)"}}>All branches</Link>
            </div>
          </div>
          <div style={{display:"grid",placeItems:"center"}}>
            {b.logo
              ? <img src={b.logo} alt="EndoPath4Youth logo" style={{width:"min(88%,300px)",height:"min(88%,300px)",objectFit:"contain"}}/>
              : <I.flask style={{width:80,height:80,color:"rgba(255,255,255,.8)"}}/>
            }
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{background:"var(--paper)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div className="b-stats-4">
            {stats.map((s,i)=>(
              <div key={i} style={{borderRight:i<stats.length-1?"1px solid var(--line)":"none"}}>
                <O4YStat {...s} accentColor={AMBER}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + Mission ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
        <div className="container two-col-grid" style={{gap:48}}>
          <Reveal>
            <div className="card" style={{padding:"clamp(28px,4vw,44px)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span className="eyebrow">About</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:16,color:"var(--ink2)",lineHeight:1.75,marginTop:4}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              padding:"clamp(28px,4vw,44px)",
              background:`linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
              borderRadius:"var(--r-lg)",
              height:"100%",display:"flex",flexDirection:"column",gap:16,color:"#fff",
              position:"relative",overflow:"hidden",
            }}>
              <svg style={{position:"absolute",top:"-20%",right:"-8%",opacity:.12,pointerEvents:"none"}} width="220" height="220" viewBox="0 0 220 220">
                {Array.from({length:6}).map((_,i)=><rect key={i} x={i*38} y={0} width={24} height={220} fill="#fff" opacity={0.06+i*0.03}/>)}
              </svg>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",opacity:.65}}>Our Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15,color:"#fff"}}>Why it matters.</h2>
              <p style={{fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.7,fontWeight:450}}>{b.mission}</p>
              <Link to="/join" className="btn" style={{
                marginTop:"auto",alignSelf:"flex-start",
                background:"rgba(255,255,255,.18)",color:"#fff",
                border:"1px solid rgba(255,255,255,.3)",backdropFilter:"blur(4px)",
              }}>
                Get involved <I.arrow className="arr"/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Past Events ── */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)",background:"var(--g50)",borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span className="eyebrow">Past Events</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What we've done.</h2>
            </div></Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:24}}>
              {b.past.map((e,i)=>(
                <Reveal key={i} delay={i*80}>
                  <div className="b-event-row" style={{
                    display:"grid",
                    gridTemplateColumns: i%2===0 ? "1fr 1.5fr" : "1.5fr 1fr",
                    gap:0,borderRadius:"var(--r-lg)",overflow:"hidden",
                    boxShadow:"var(--sh-1)",background:"var(--surface)",
                    border:"1px solid var(--line)",minHeight:280,
                  }}>
                    <div style={{order:i%2===0?0:1,position:"relative",overflow:"hidden",minHeight:240}}>
                      <PH label={e.t} src={e.img||null}
                        style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:0,transition:"transform .5s ease"}}
                      />
                      <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg, rgba(122,72,0,.35), transparent)`}}/>
                    </div>
                    <div style={{order:i%2===0?1:0,padding:"clamp(28px,4vw,48px)",display:"flex",flexDirection:"column",justifyContent:"center",gap:14}}>
                      <span className="pill" style={{alignSelf:"flex-start",fontSize:11}}>Past Event</span>
                      <h3 style={{fontSize:"clamp(20px,2.2vw,28px)",lineHeight:1.2}}>{e.t}</h3>
                      <p style={{fontSize:15,color:"var(--ink2)",lineHeight:1.7}}>{e.d}</p>
                      <div style={{width:40,height:3,borderRadius:2,background:`linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})`,marginTop:4}}/>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Initiatives ── */}
      {b.initiatives && b.initiatives.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span className="eyebrow">Initiatives</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What we're building.</h2>
            </div></Reveal>
            <div className="two-col-grid">
              {b.initiatives.map((ini,i)=>{
                const Ic = I[ini.icon]||I.flask;
                const acs = [AMBER, AMBER_MID, "#b06810", "#d07820"];
                const ac = acs[i%acs.length];
                return (
                  <Reveal key={i} delay={i*70}>
                    <div style={{
                      borderRadius:"var(--r-lg)",overflow:"hidden",
                      border:"1px solid var(--line)",background:"var(--surface)",
                      boxShadow:"var(--sh-1)",display:"flex",flexDirection:"column",
                      transition:"box-shadow .25s, transform .25s",
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--sh-2)";e.currentTarget.style.transform="translateY(-3px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      <div style={{padding:"20px 24px",background:`linear-gradient(135deg, ${ac}, ${ac}cc)`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{width:44,height:44,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                          <Ic/>
                        </div>
                        <span style={{fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,.85)",background:"rgba(255,255,255,.15)",padding:"4px 10px",borderRadius:999}}>{ini.tag}</span>
                      </div>
                      <div style={{padding:"22px 24px 24px",flex:1,display:"flex",flexDirection:"column",gap:10}}>
                        <h3 style={{fontSize:18}}>{ini.t}</h3>
                        <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.65}}>{ini.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Posts & Publications ── */}
      {b.posts && b.posts.length > 0 && (
        <section style={{background:AMBER_DARK,paddingBlock:"clamp(48px,6vw,80px)",position:"relative",overflow:"hidden"}}>
          <svg style={{position:"absolute",right:0,top:0,opacity:.08,pointerEvents:"none"}} width="400" height="400" viewBox="0 0 400 400">
            {Array.from({length:8}).map((_,i)=><rect key={i} x={i*52} y={0} width={32} height={400} fill="#fff"/>)}
          </svg>
          <div className="container" style={{position:"relative"}}>
            <Reveal><div style={{marginBottom:36,color:"#fff"}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",opacity:.6}}>Posts & Publications</span>
              <h2 style={{fontSize:"clamp(26px,3vw,40px)",color:"#fff",marginTop:10}}>From our team.</h2>
            </div></Reveal>
            <div className="three-col-grid">
              {b.posts.map((post,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div style={{
                    background:"rgba(255,255,255,.08)",backdropFilter:"blur(8px)",
                    border:"1px solid rgba(255,255,255,.15)",
                    borderRadius:"var(--r-lg)",overflow:"hidden",
                    display:"flex",flexDirection:"column",
                    transition:"background .25s, transform .25s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.14)";e.currentTarget.style.transform="translateY(-4px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)";e.currentTarget.style.transform="translateY(0)"}}
                  >
                    {/* Cover image */}
                    <div style={{aspectRatio:"1/1",position:"relative",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,.1)"}}>
                      <PH label={post.title} src={post.img||null}
                        style={{position:"absolute",inset:0,width:"100%",height:"100%",borderRadius:0}}
                      />
                    </div>
                    <div style={{padding:"20px 22px 24px",display:"flex",flexDirection:"column",gap:10,flex:1}}>
                      <h3 style={{fontSize:16,color:"#fff",lineHeight:1.3}}>{post.title}</h3>
                      <p style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.6,flex:1}}>{post.desc}</p>
                      <a href={post.pdf} target="_blank" rel="noreferrer"
                        className="btn btn-sm"
                        style={{marginTop:8,alignSelf:"flex-start",background:"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.25)"}}>
                        <I.ext style={{width:13}}/> View Post
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Upcoming Events ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span className="eyebrow">Upcoming</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What's next.</h2>
            </div></Reveal>
            <div className="two-col-grid">
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div style={{
                    borderRadius:"var(--r-lg)",overflow:"hidden",
                    border:"1px solid var(--line)",background:"var(--surface)",
                    padding:"32px 36px",display:"flex",flexDirection:"column",gap:14,
                    boxShadow:"var(--sh-1)",position:"relative",
                    transition:"box-shadow .25s, transform .25s",
                  }}
                    onMouseEnter={e2=>{e2.currentTarget.style.boxShadow="var(--sh-2)";e2.currentTarget.style.transform="translateY(-3px)"}}
                    onMouseLeave={e2=>{e2.currentTarget.style.boxShadow="var(--sh-1)";e2.currentTarget.style.transform="translateY(0)"}}
                  >
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg, ${AMBER}, ${AMBER_DARK})`}}/>
                    <span className="pill deep" style={{alignSelf:"flex-start",fontSize:11}}>Upcoming</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,22px)"}}>{e.t}</h3>
                    <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.65}}>{e.d}</p>
                    <div style={{fontFamily:"var(--f-mono)",fontSize:12,color:AMBER,fontWeight:700,letterSpacing:".04em",marginTop:4}}>{e.when}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingTop:"clamp(24px,3vw,40px)",paddingBottom:"clamp(40px,5vw,64px)"}}>
        <div className="container">
          <Reveal>
            <div className="branch-cta-grid" style={{
              borderRadius:"var(--r-xl)",overflow:"hidden",
              background:`linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
              padding:"clamp(40px,6vw,72px)",
              position:"relative",
            }}>
              <svg style={{position:"absolute",right:0,top:0,opacity:.1,pointerEvents:"none"}} width="300" height="300" viewBox="0 0 300 300">
                {Array.from({length:6}).map((_,i)=><rect key={i} x={i*52} y={0} width={32} height={300} fill="#fff" opacity={.5}/>)}
              </svg>
              <div style={{color:"#fff"}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",opacity:.6}}>Get Involved</span>
                <h2 style={{fontSize:"clamp(26px,3vw,40px)",color:"#fff",marginTop:12}}>Join EndoPath4Youth.</h2>
                <p style={{fontSize:16,color:"rgba(255,255,255,.75)",marginTop:12,maxWidth:460,lineHeight:1.6}}>
                  Members get access to speaker events, career panels, community initiatives, and educational content spanning endocrinology, pathology, microbiology, and immunology.
                </p>
              </div>
              <div style={{display:"flex",gap:12,justifyContent:"flex-end",flexWrap:"wrap",position:"relative"}}>
                <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:AMBER_DARK,fontWeight:700,border:"none"}}>
                  Join the Branch <I.arrow className="arr"/>
                </Link>
                <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.3)"}}>
                  Browse others
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── Pharmacy4Youth full page (redesigned) ── */
function PharmacyPage({ b }) {
  const M  = "#8b1a1a";
  const MD = "#5a1010";
  const ML = "#b83030";

  return (
    <div data-branch={b.slug}>

      {/* ── HERO: full-height split, light left / dark right ── */}
      <section className="branch-hero-split">

        {/* LEFT - white panel with big typography */}
        <div style={{background:"var(--paper)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"clamp(60px,8vw,100px) clamp(32px,5vw,72px)",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"inline-flex",alignItems:"center",gap:9,background:`color-mix(in oklab,${M} 8%,#fff)`,border:`1px solid color-mix(in oklab,${M} 20%,#fff)`,borderRadius:999,padding:"5px 14px 5px 7px",width:"fit-content",marginBottom:32,fontSize:12,fontWeight:700,letterSpacing:".05em",color:M}}>
              <BranchMark branch={b} size={24} circle={false} style={{borderRadius:7}}/>
              Pharmacy4Youth · M4Y
            </div>
            <div style={{fontSize:"clamp(13px,1.2vw,16px)",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--g400)",marginBottom:16}}>Breaking misconceptions since day one.</div>
            <h1 style={{fontSize:"clamp(48px,6.5vw,88px)",fontWeight:900,lineHeight:.88,letterSpacing:"-.03em",color:"var(--ink)",marginBottom:28}}>
              Pharmacy<br/>
              <span style={{color:M}}>Beyond</span><br/>
              the Counter.
            </h1>
            <p style={{fontSize:17,color:"var(--ink2)",lineHeight:1.7,maxWidth:440,marginBottom:36}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg" style={{background:M,color:"#fff",fontWeight:700,border:"none"}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-lg btn-ghost">All branches</Link>
            </div>
          </Reveal>
          {/* bottom stats row */}
          <Reveal delay={120}>
            <div style={{display:"flex",gap:0,marginTop:60,borderTop:"1px solid var(--line)",paddingTop:28}}>
              {[
                {n:"4", label:"Pharmacist Panelists"},
                {n:"1", label:"Speaker Event"},
                {n:"4", label:"Active Initiatives"},
              ].map((s,i,arr)=>(
                <div key={i} style={{flex:1,paddingRight:24,borderRight:i<arr.length-1?"1px solid var(--line)":"none",paddingLeft:i>0?24:0}}>
                  <div style={{fontSize:"clamp(28px,3vw,40px)",fontWeight:900,color:M,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:12,color:"var(--g500)",fontWeight:600,marginTop:4,letterSpacing:".04em"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT - dark maroon panel with logo + tagline */}
        <div style={{background:`linear-gradient(155deg,${MD} 0%,${M} 60%,${ML} 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"clamp(60px,8vw,100px) clamp(32px,5vw,64px)",position:"relative",overflow:"hidden",gap:40}}>
          {/* Rx watermark */}
          <div style={{position:"absolute",right:"-5%",bottom:"-8%",fontSize:"clamp(180px,22vw,320px)",fontWeight:900,color:"rgba(255,255,255,.04)",lineHeight:1,userSelect:"none",letterSpacing:"-.05em",pointerEvents:"none"}}>Rx</div>
          {/* concentric circles decoration */}
          <svg style={{position:"absolute",left:"-15%",top:"-10%",opacity:.06,pointerEvents:"none"}} width="400" height="400" viewBox="0 0 400 400">
            {[40,80,120,160,200,240].map(r=><circle key={r} cx="0" cy="0" r={r} fill="none" stroke="#fff" strokeWidth="1.5"/>)}
          </svg>
          {b.logo && (
            <Reveal delay={80}>
              <img src={b.logo} alt="P4Y" style={{width:"min(200px,28vw)",objectFit:"contain",filter:"drop-shadow(0 12px 32px rgba(0,0,0,.5))",position:"relative",zIndex:1}}/>
            </Reveal>
          )}
          <Reveal delay={140}>
            <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:360}}>
              <p style={{fontSize:"clamp(15px,1.6vw,20px)",color:"rgba(255,255,255,.7)",lineHeight:1.7,fontStyle:"italic"}}>
                "Clinical. Industrial. Oncology. Community. Pharmacy is one of the most diverse careers in healthcare."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATEMENT BAND ── */}
      <section style={{background:M,paddingBlock:"clamp(32px,4vw,48px)"}}>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
          <Reveal>
            <p style={{fontSize:"clamp(18px,2.2vw,28px)",fontWeight:800,color:"#fff",lineHeight:1.2,margin:0}}>
              Pharmacy is <em style={{fontStyle:"normal",textDecoration:"underline",textDecorationColor:"rgba(255,255,255,.4)",textUnderlineOffset:4}}>not</em> just retail.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {["Clinical Pharmacy","Oncology","Industry","Community"].map((tag,i)=>(
                <span key={i} style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.85)",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:999,padding:"5px 14px"}}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT + MISSION ── */}
      <section style={{paddingBlock:"clamp(64px,7vw,96px)"}}>
        <div className="container two-col-grid" style={{gap:32}}>
          <Reveal>
            <div style={{padding:"clamp(36px,4vw,56px)",background:"var(--g50)",borderRadius:"var(--r-xl)",border:"1px solid var(--line)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:M}}>About</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:15,color:"var(--ink2)",lineHeight:1.85,flex:1}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div style={{padding:"clamp(36px,4vw,56px)",background:`linear-gradient(145deg,${MD} 0%,${M} 100%)`,borderRadius:"var(--r-xl)",height:"100%",display:"flex",flexDirection:"column",gap:16,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",bottom:-40,right:-40,width:180,height:180,borderRadius:"50%",border:"2px solid rgba(255,255,255,.08)"}}/>
              <div style={{position:"absolute",bottom:-80,right:-80,width:260,height:260,borderRadius:"50%",border:"2px solid rgba(255,255,255,.05)"}}/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15,color:"#fff"}}>Why we exist.</h2>
              <p style={{fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.85,flex:1,position:"relative",zIndex:1}}>{b.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MEET THE PHARMACIST: cinematic full-width ── */}
      {b.past && b.past.length > 0 && b.past[0].img && (
        <section style={{background:"var(--ink)",paddingBlock:0,position:"relative",overflow:"hidden"}}>
          {/* Background image full-bleed */}
          <div style={{position:"absolute",inset:0}}>
            <img src={b.past[0].img} alt="" style={{width:"100%",height:"100%",objectFit:"cover",opacity:.25}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,${MD}cc,${MD}f0)`}}/>
          </div>
          <div className="container" style={{position:"relative",zIndex:1,paddingBlock:"clamp(72px,8vw,110px)"}}>
            <Reveal>
              <div style={{maxWidth:720,margin:"0 auto",textAlign:"center",marginBottom:56}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Featured Event · {b.past[0].date}</span>
                <h2 style={{fontSize:"clamp(32px,4vw,60px)",fontWeight:900,color:"#fff",marginTop:12,lineHeight:.95,letterSpacing:"-.02em"}}>Meet the<br/>Pharmacist.</h2>
                <p style={{fontSize:16,color:"rgba(255,255,255,.7)",marginTop:20,lineHeight:1.75,maxWidth:560,margin:"20px auto 0"}}>{b.past[0].d}</p>
              </div>
            </Reveal>
            {/* Speaker cards in a row */}
            {b.speakers && (
              <div className="four-col-grid">
                {b.speakers.map((sp,i)=>{
                  const Ic = I[sp.icon]||I.capsules;
                  return (
                    <Reveal key={i} delay={i*60}>
                      <div style={{
                        background:"rgba(255,255,255,.07)",backdropFilter:"blur(16px)",
                        border:"1px solid rgba(255,255,255,.12)",
                        borderRadius:16,padding:"28px 20px",
                        textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:14,
                        transition:"background .25s,transform .3s",
                      }}
                        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.14)";e.currentTarget.style.transform="translateY(-6px)"}}
                        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.07)";e.currentTarget.style.transform="translateY(0)"}}
                      >
                        <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${ML},${M})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${M}80`}}>
                          <Ic style={{width:24,height:24,color:"#fff"}}/>
                        </div>
                        <span style={{fontSize:13,fontWeight:700,color:"#fff",lineHeight:1.35,textAlign:"center"}}>{sp.role}</span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── INITIATIVES: 2×2 with bold icon headers ── */}
      {b.initiatives && b.initiatives.length > 0 && (
        <section style={{paddingBlock:"clamp(64px,7vw,96px)"}}>
          <div className="container">
            <Reveal>
              <div style={{marginBottom:48,display:"flex",alignItems:"center",gap:20}}>
                <div style={{flex:1}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:M}}>Initiatives</span>
                  <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What we're building.</h2>
                </div>
                <div style={{width:80,height:3,background:`linear-gradient(90deg,${M},transparent)`,borderRadius:999,flexShrink:0}}/>
              </div>
            </Reveal>
            <div className="two-col-grid">
              {b.initiatives.map((ini,i)=>{
                const Ic = I[ini.icon]||I.capsules;
                const shades = [M, MD, ML, "#7a1010"];
                const shade = shades[i%shades.length];
                return (
                  <Reveal key={i} delay={i*55}>
                    <div style={{
                      borderRadius:20,overflow:"hidden",
                      boxShadow:"var(--sh-1)",border:"1px solid var(--line)",
                      background:"var(--surface)",
                      transition:"box-shadow .3s,transform .3s",
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 40px ${shade}30`;e.currentTarget.style.transform="translateY(-5px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      {/* header band */}
                      <div style={{padding:"22px 26px",background:`linear-gradient(135deg,${shade},${shade}cc)`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"center",gap:14}}>
                          <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                            <Ic style={{width:22,height:22}}/>
                          </div>
                          <h3 style={{fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.2}}>{ini.t}</h3>
                        </div>
                        <span style={{fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:"rgba(255,255,255,.8)",background:"rgba(255,255,255,.15)",padding:"4px 10px",borderRadius:999,whiteSpace:"nowrap",flexShrink:0,marginLeft:8}}>{ini.tag}</span>
                      </div>
                      {/* body */}
                      <div style={{padding:"22px 26px 26px"}}>
                        <p style={{fontSize:13,color:"var(--ink2)",lineHeight:1.7}}>{ini.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── POSTS ── */}
      {b.posts && b.posts.length > 0 && (
        <section style={{background:"var(--g50)",paddingBlock:"clamp(56px,6vw,80px)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:36}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:M}}>Posts</span>
              <h2 style={{fontSize:"clamp(26px,3vw,42px)",fontWeight:900,marginTop:8}}>From our team.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24}}>
              {b.posts.map((post,i)=>(
                <Reveal key={i} delay={i*60}>
                  <div style={{borderRadius:20,overflow:"hidden",background:"var(--paper)",boxShadow:"var(--sh-1)",border:"1px solid var(--line)",display:"flex",flexDirection:"column",transition:"box-shadow .3s,transform .3s"}}
                    onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--sh-3)";e.currentTarget.style.transform="translateY(-5px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                  >
                    <div style={{aspectRatio:"3/2",overflow:"hidden"}}>
                      <PH label={post.title} src={post.img||null} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:0,transition:"transform .4s"}}/>
                    </div>
                    <div style={{padding:"22px 24px 28px",flex:1,display:"flex",flexDirection:"column",gap:10}}>
                      <h3 style={{fontSize:16,fontWeight:700,lineHeight:1.3,color:"var(--ink)"}}>{post.title}</h3>
                      <p style={{fontSize:13,color:"var(--ink2)",lineHeight:1.65,flex:1}}>{post.desc}</p>
                      <a href={post.pdf} target="_blank" rel="noreferrer" className="btn btn-sm" style={{marginTop:8,alignSelf:"flex-start",background:M,color:"#fff",border:"none",borderRadius:999,fontWeight:700}}>
                        <I.ext style={{width:12}}/> View Post
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(64px,7vw,96px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:40}}>
              <span className="pharm-accent-text" style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:M}}>On the horizon</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What's next.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:24}}>
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div className="pharm-upcoming-card" style={{borderRadius:20,padding:"clamp(30px,4vw,48px)",background:`linear-gradient(135deg,color-mix(in oklab,${M} 5%,#fff),#fff)`,border:`1px solid color-mix(in oklab,${M} 15%,var(--line))`,position:"relative",overflow:"hidden",transition:"box-shadow .3s,transform .3s",boxShadow:"var(--sh-1)"}}
                    onMouseEnter={e2=>{e2.currentTarget.style.boxShadow=`0 16px 48px ${M}20`;e2.currentTarget.style.transform="translateY(-5px)"}}
                    onMouseLeave={e2=>{e2.currentTarget.style.boxShadow="var(--sh-1)";e2.currentTarget.style.transform="translateY(0)"}}
                  >
                    <div style={{position:"absolute",top:0,left:0,width:"100%",height:4,background:`linear-gradient(90deg,${M},${ML})`}}/>
                    <div className="pharm-upcoming-orb" style={{position:"absolute",right:-20,bottom:-20,width:120,height:120,borderRadius:"50%",background:`color-mix(in oklab,${M} 6%,transparent)`}}/>
                    <span className="pharm-upcoming-pill" style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",background:`color-mix(in oklab,${M} 10%,#fff)`,color:M,padding:"5px 12px",borderRadius:999,marginBottom:16}}>Upcoming</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.2,color:"var(--ink)"}}>{e.t}</h3>
                    <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.75,marginTop:12}}>{e.d}</p>
                    <div className="pharm-accent-text" style={{fontFamily:"var(--f-mono)",fontSize:12,color:M,fontWeight:700,letterSpacing:".05em",marginTop:20}}>{e.when}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
        <div className="container">
          <Reveal>
            <div style={{borderRadius:24,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,${MD} 0%,${M} 55%,${ML} 100%)`,padding:"clamp(56px,7vw,88px)"}}>
              <div style={{position:"absolute",right:"-4%",top:"-20%",fontSize:"clamp(200px,25vw,360px)",fontWeight:900,color:"rgba(255,255,255,.04)",lineHeight:1,userSelect:"none",pointerEvents:"none",letterSpacing:"-.05em"}}>Rx</div>
              <div className="branch-cta-grid" style={{position:"relative",zIndex:1,gap:48}}>
                <div style={{color:"#fff"}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",opacity:.5}}>Get Involved</span>
                  <h2 style={{fontSize:"clamp(30px,4vw,56px)",color:"#fff",marginTop:10,fontWeight:900,lineHeight:.95,letterSpacing:"-.02em"}}>Join<br/>Pharmacy4Youth.</h2>
                  <p style={{fontSize:16,color:"rgba(255,255,255,.7)",marginTop:18,maxWidth:420,lineHeight:1.75}}>
                    Direct access to pharmacist mentors, exclusive panels, career spotlights, and the upcoming Case Study Competition.
                  </p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
                  <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:MD,fontWeight:800,border:"none",width:"100%",justifyContent:"center"}}>
                    Join the Branch <I.arrow className="arr"/>
                  </Link>
                  <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.25)",width:"100%",justifyContent:"center"}}>
                    Browse all branches
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── Charity4Youth full page ── */
function CharityPage({ b }) {
  const C     = "#d63a3a";
  const CD    = "#9e1e1e";
  const CL    = "#e86060";
  const CPALE = "#fff8f7";

  return (
    <div data-branch={b.slug}>

      {/* ── Hero: photo collage right ── */}
      <section style={{position:"relative",overflow:"hidden",background:`linear-gradient(150deg,${CD} 0%,${C} 55%,${CL} 100%)`,paddingBlock:"clamp(80px,10vw,130px)"}}>
        <svg style={{position:"absolute",left:0,top:0,width:"100%",height:"100%",opacity:.06,pointerEvents:"none"}} viewBox="0 0 1200 600" preserveAspectRatio="none">
          {[0,1,2,3,4,5].map(i=><path key={i} d={`M0 ${80+i*90} Q300 ${40+i*90} 600 ${80+i*90} T1200 ${80+i*90}`} stroke="#fff" strokeWidth="1.5" fill="none"/>)}
        </svg>
        <div className="container b-grid-hero" style={{position:"relative",gap:48}}>
          <div style={{display:"flex",flexDirection:"column",gap:22,color:"#fff"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.13)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.22)",borderRadius:999,padding:"5px 16px 5px 7px",width:"fit-content",fontSize:12,fontWeight:700,letterSpacing:".05em"}}>
              <BranchMark branch={b} size={26} circle={false} style={{borderRadius:8}}/>
              Charity4Youth · M4Y Branch
            </div>
            <h1 style={{fontSize:"clamp(42px,5.5vw,76px)",color:"#fff",lineHeight:.9,fontWeight:800,letterSpacing:"-.02em"}}>
              Give.<br/>
              <span style={{color:"rgba(255,255,255,.45)"}}>Care.</span><br/>
              Advocate.
            </h1>
            <p style={{fontSize:17,color:"rgba(255,255,255,.82)",maxWidth:460,lineHeight:1.65}}>{b.tagline}</p>
            <div style={{display:"flex",gap:10,marginTop:6,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:CD,fontWeight:800,border:"none",borderRadius:999}}>Join this branch <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.3)",borderRadius:999}}>All branches</Link>
            </div>
            <a
              href="https://charity4youthorg.wixsite.com/charity4youth"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                width:"fit-content", marginTop:2,
                padding:"9px 18px 9px 12px",
                background:"rgba(255,255,255,.12)",
                border:"1px solid rgba(255,255,255,.22)",
                borderRadius:999,
                backdropFilter:"blur(10px)",
                color:"rgba(255,255,255,.92)",
                fontSize:13, fontWeight:600, letterSpacing:".01em",
                textDecoration:"none",
                transition:"background .2s, border-color .2s, color .2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.22)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.color="rgba(255,255,255,.92)"; }}
            >
              <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10" cy="10" r="8"/>
                <path d="M2 10h16M10 2c-2.5 3-4 5-4 8s1.5 5 4 8M10 2c2.5 3 4 5 4 8s-1.5 5-4 8"/>
              </svg>
              charity4youthorg.wixsite.com
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{opacity:.65}}>
                <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 8 8"/>
              </svg>
            </a>
          </div>
          {/* Photo collage */}
          <Reveal delay={100}>
            <div style={{position:"relative",height:420,display:"flex",alignItems:"center",justifyContent:"center"}}>
              {b.gallery && b.gallery[0] && (
                <div style={{position:"absolute",top:0,right:0,width:220,height:290,borderRadius:16,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.5)",transform:"rotate(3deg)",border:"3px solid rgba(255,255,255,.2)"}}>
                  <img src={b.gallery[0].src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              )}
              {b.gallery && b.gallery[2] && (
                <div style={{position:"absolute",bottom:0,left:0,width:200,height:260,borderRadius:16,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.5)",transform:"rotate(-4deg)",border:"3px solid rgba(255,255,255,.2)"}}>
                  <img src={b.gallery[2].src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              )}
              {b.gallery && b.gallery[4] && (
                <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%) rotate(1deg)",width:160,height:200,borderRadius:16,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.5)",border:"3px solid rgba(255,255,255,.2)"}}>
                  <img src={b.gallery[4].src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Impact stats ── */}
      <section style={{background:"var(--paper)",borderBottom:"1px solid var(--line)",borderTop:"1px solid var(--line)"}}>
        <div className="container">
          <div className="b-stats-4">
            {[
              {value:5, suffix:"+", label:"Bake Sales Run"},
              {value:4, label:"Campuses Reached"},
              {value:1, label:"WHO Series Posts", suffix:" weekly"},
              {value:2, label:"Upcoming Programs"},
            ].map((s,i,arr)=>(
              <div key={i} style={{borderRight:i<arr.length-1?"1px solid var(--line)":"none"}}>
                <O4YStat {...s} accentColor={C}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + Mission ── */}
      <section style={{paddingBlock:"clamp(56px,6vw,80px)",background:CPALE}}>
        <div className="container two-col-grid" style={{gap:24}}>
          <Reveal>
            <div style={{background:"var(--paper)",borderRadius:"var(--r-xl)",padding:"clamp(32px,4vw,52px)",boxShadow:"var(--sh-1)",border:"1px solid var(--line)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C}}>About</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,34px)",fontWeight:800,lineHeight:1.1}}>What this branch is.</h2>
              <p style={{fontSize:15,color:"var(--ink2)",lineHeight:1.8}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div style={{background:`linear-gradient(145deg,${CD},${C})`,borderRadius:"var(--r-xl)",padding:"clamp(32px,4vw,52px)",height:"100%",display:"flex",flexDirection:"column",gap:16,position:"relative",overflow:"hidden"}}>
              <svg style={{position:"absolute",right:-20,bottom:-20,opacity:.1,pointerEvents:"none"}} width="200" height="200" viewBox="0 0 200 200">
                {[40,80,120,160].map(r=><circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#fff" strokeWidth="1.5"/>)}
              </svg>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}>Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,34px)",fontWeight:800,color:"#fff",lineHeight:1.1}}>Why we exist.</h2>
              <p style={{fontSize:15,color:"rgba(255,255,255,.82)",lineHeight:1.8}}>{b.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Photo gallery ── */}
      {b.gallery && b.gallery.length > 0 && (
        <section style={{paddingBlock:"clamp(56px,6vw,80px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:36}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C}}>In Action</span>
              <h2 style={{fontSize:"clamp(28px,3vw,46px)",fontWeight:800,marginTop:8}}>From our events.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"auto auto",gap:12}}>
              {b.gallery.slice(0,5).map((img,i)=>(
                <Reveal key={i} delay={i*50}>
                  <div style={{
                    borderRadius:14,overflow:"hidden",
                    gridColumn: i===0 ? "1/3" : "auto",
                    gridRow: i===0 ? "1/2" : "auto",
                    aspectRatio: i===0 ? "16/8" : "4/3",
                    boxShadow:"var(--sh-2)",
                    transition:"transform .3s, box-shadow .3s",position:"relative",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="var(--sh-3)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="var(--sh-2)"}}
                  >
                    <img src={img.src} alt={img.caption} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"10px 14px",background:"linear-gradient(transparent,rgba(0,0,0,.55))"}}>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.85)",fontWeight:500}}>{img.caption}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Campus reach strip ── */}
      {b.campuses && (
        <section style={{background:C,paddingBlock:"clamp(28px,3vw,40px)"}}>
          <div className="container" style={{display:"flex",alignItems:"center",gap:32,flexWrap:"wrap",justifyContent:"center"}}>
            <span style={{fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.6)"}}>Active across</span>
            {b.campuses.map((campus,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.12)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.2)",borderRadius:999,padding:"8px 20px"}}>
                <I.pin style={{width:13,color:"rgba(255,255,255,.7)"}}/>
                <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{campus}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Initiatives ── */}
      {b.initiatives && b.initiatives.length > 0 && (
        <section style={{paddingBlock:"clamp(56px,6vw,80px)",background:CPALE}}>
          <div className="container">
            <Reveal><div style={{marginBottom:36}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C}}>Initiatives</span>
              <h2 style={{fontSize:"clamp(28px,3vw,46px)",fontWeight:800,marginTop:8}}>What we're building.</h2>
            </div></Reveal>
            <div className="two-col-grid" style={{gap:16}}>
              {b.initiatives.map((ini,i)=>{
                const Ic = I[ini.icon]||I.heart2;
                const colors = [C, CD, CL, "#b82828"];
                const cc = colors[i%colors.length];
                return (
                  <Reveal key={i} delay={i*60}>
                    <div style={{background:"var(--paper)",borderRadius:"var(--r-lg)",border:"1px solid var(--line)",overflow:"hidden",boxShadow:"var(--sh-1)",transition:"box-shadow .25s,transform .25s"}}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow="var(--sh-2)";e.currentTarget.style.transform="translateY(-3px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      <div style={{height:5,background:`linear-gradient(90deg,${cc},${cc}88)`}}/>
                      <div style={{padding:"24px 26px 28px",display:"flex",flexDirection:"column",gap:12}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                          <div style={{width:44,height:44,borderRadius:12,background:`linear-gradient(135deg,${cc},${cc}bb)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0}}>
                            <Ic style={{width:20,height:20}}/>
                          </div>
                          <span style={{fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",background:`color-mix(in oklab,${cc} 12%,#fff)`,color:cc,padding:"4px 10px",borderRadius:999}}>{ini.tag}</span>
                        </div>
                        <h3 style={{fontSize:17,fontWeight:700,lineHeight:1.25}}>{ini.t}</h3>
                        <p style={{fontSize:13,color:"var(--ink2)",lineHeight:1.65}}>{ini.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Upcoming events ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(56px,6vw,80px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:36}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C}}>Upcoming</span>
              <h2 style={{fontSize:"clamp(28px,3vw,46px)",fontWeight:800,marginTop:8}}>What's next.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:20}}>
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div style={{borderRadius:"var(--r-xl)",border:"1px solid var(--line)",background:"var(--surface)",padding:"clamp(28px,4vw,44px)",display:"flex",flexDirection:"column",gap:14,boxShadow:"var(--sh-1)",position:"relative",overflow:"hidden",transition:"box-shadow .25s,transform .25s"}}
                    onMouseEnter={e2=>{e2.currentTarget.style.boxShadow="var(--sh-3)";e2.currentTarget.style.transform="translateY(-4px)"}}
                    onMouseLeave={e2=>{e2.currentTarget.style.boxShadow="var(--sh-1)";e2.currentTarget.style.transform="translateY(0)"}}
                  >
                    <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:`linear-gradient(90deg,${C},${CL})`}}/>
                    <span style={{fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",background:`color-mix(in oklab,${C} 10%,#fff)`,color:C,padding:"4px 12px",borderRadius:999,alignSelf:"flex-start",marginTop:4}}>Upcoming</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.15}}>{e.t}</h3>
                    <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.7}}>{e.d}</p>
                    <div style={{fontFamily:"var(--f-mono)",fontSize:12,color:C,fontWeight:700,letterSpacing:".05em",marginTop:4}}>{e.when}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
        <div className="container">
          <Reveal>
            <div className="branch-cta-grid" style={{borderRadius:"var(--r-xl)",overflow:"hidden",background:`linear-gradient(135deg,${CD} 0%,${C} 55%,${CL} 100%)`,padding:"clamp(48px,6vw,80px)",position:"relative"}}>
              <svg style={{position:"absolute",right:"-2%",bottom:"-15%",opacity:.08,pointerEvents:"none"}} viewBox="0 0 400 400" width="400">
                {[0,1,2,3,4,5].map(i=><path key={i} d={`M0 ${60+i*60} Q100 ${20+i*60} 200 ${60+i*60} T400 ${60+i*60}`} stroke="#fff" strokeWidth="1.5" fill="none"/>)}
              </svg>
              <div style={{color:"#fff"}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",opacity:.55}}>Get Involved</span>
                <h2 style={{fontSize:"clamp(28px,3.5vw,50px)",color:"#fff",marginTop:10,fontWeight:800,lineHeight:1.0}}>Join Charity4Youth.</h2>
                <p style={{fontSize:16,color:"rgba(255,255,255,.72)",marginTop:14,maxWidth:440,lineHeight:1.7}}>
                  Raise funds, volunteer in hospitals, learn from WHO-recognized crises, and build your career in health equity - all while making a real difference.
                </p>
              </div>
              <div style={{display:"flex",gap:12,justifyContent:"flex-end",flexWrap:"wrap",position:"relative"}}>
                <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:CD,fontWeight:800,border:"none",borderRadius:999}}>Join the Branch <I.arrow className="arr"/></Link>
                <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.3)",borderRadius:999}}>Browse others</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── Dentistry4Youth full page ── */
function DentistryPage({ b }) {
  const D  = "#386098";
  const DD = "#1e3d5c";
  const DL = "#5a82b8";
  const DPALE = "#f4f7fc";

  return (
    <div data-branch={b.slug}>

      {/* ── HERO: white left / blue right ── */}
      <section className="branch-hero-split">
        {/* LEFT - white, big type */}
        <div style={{background:"var(--paper)",display:"flex",flexDirection:"column",justifyContent:"center",padding:"clamp(60px,8vw,100px) clamp(32px,5vw,72px)",position:"relative",zIndex:1}}>
          <Reveal>
            <div style={{display:"inline-flex",alignItems:"center",gap:9,background:`color-mix(in oklab,${D} 8%,#fff)`,border:`1px solid color-mix(in oklab,${D} 20%,#fff)`,borderRadius:999,padding:"5px 14px 5px 7px",width:"fit-content",marginBottom:32,fontSize:12,fontWeight:700,letterSpacing:".05em",color:D}}>
              <BranchMark branch={b} size={24} circle={false} style={{borderRadius:7}}/>
              Dentistry4Youth · M4Y
            </div>
            <div style={{fontSize:"clamp(12px,1.1vw,15px)",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--g400)",marginBottom:16}}>From aspiration to admission.</div>
            <h1 style={{fontSize:"clamp(46px,6vw,84px)",fontWeight:900,lineHeight:.88,letterSpacing:"-.03em",color:"var(--ink)",marginBottom:28}}>
              Your path<br/>
              <span style={{color:D}}>to dentistry</span><br/>
              starts here.
            </h1>
            <p style={{fontSize:17,color:"var(--ink2)",lineHeight:1.7,maxWidth:440,marginBottom:36}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg" style={{background:D,color:"#fff",fontWeight:700,border:"none"}}>Join this branch <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-lg btn-ghost">All branches</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{display:"flex",gap:0,marginTop:60,borderTop:"1px solid var(--line)",paddingTop:28}}>
              {[{n:"200+",label:"Event Attendees"},{n:"3",label:"Past Events"},{n:"1",label:"Upcoming"},{n:"4",label:"Initiatives"}].map((s,i,arr)=>(
                <div key={i} style={{flex:1,paddingRight:20,borderRight:i<arr.length-1?"1px solid var(--line)":"none",paddingLeft:i>0?20:0}}>
                  <div style={{fontSize:"clamp(22px,2.5vw,36px)",fontWeight:900,color:D,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:11,color:"var(--g500)",fontWeight:600,marginTop:4,letterSpacing:".04em"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        {/* RIGHT - blue panel */}
        <div style={{background:`linear-gradient(155deg,${DD} 0%,${D} 60%,${DL} 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"clamp(60px,8vw,100px) clamp(32px,5vw,64px)",position:"relative",overflow:"hidden",gap:36}}>
          <svg style={{position:"absolute",right:"-10%",top:"-10%",opacity:.06,pointerEvents:"none"}} width="500" height="500" viewBox="0 0 500 500">
            {[60,110,160,210,260].map(r=><circle key={r} cx="500" cy="0" r={r} fill="none" stroke="#fff" strokeWidth="1.5"/>)}
          </svg>
          <svg style={{position:"absolute",left:"-5%",bottom:"-5%",opacity:.05,pointerEvents:"none"}} width="300" height="300" viewBox="0 0 300 300">
            <path d="M0 150 Q75 60 150 150 T300 150" stroke="#fff" strokeWidth="2" fill="none"/>
            <path d="M0 200 Q75 110 150 200 T300 200" stroke="#fff" strokeWidth="1.5" fill="none"/>
            <path d="M0 100 Q75 10 150 100 T300 100" stroke="#fff" strokeWidth="1.5" fill="none"/>
          </svg>
          {b.logo && (
            <Reveal delay={80}>
              <img src={b.logo} alt="D4Y" style={{width:"min(190px,26vw)",objectFit:"contain",filter:"drop-shadow(0 12px 32px rgba(0,0,0,.4))",position:"relative",zIndex:1}}/>
            </Reveal>
          )}
          <Reveal delay={150}>
            <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:340}}>
              <p style={{fontSize:"clamp(14px,1.5vw,18px)",color:"rgba(255,255,255,.7)",lineHeight:1.75,fontStyle:"italic"}}>
                "We provide the roadmap - from high school to dental school, from local admissions to studying abroad."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATEMENT BAND ── */}
      <section style={{background:D,paddingBlock:"clamp(28px,3vw,44px)"}}>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
          <Reveal><p style={{fontSize:"clamp(16px,2vw,26px)",fontWeight:800,color:"#fff",lineHeight:1.2,margin:0}}>
            Demystifying dentistry - for every aspiring professional.
          </p></Reveal>
          <Reveal delay={80}>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {["Canadian Schools","US Admissions","International","Specialties"].map((tag,i)=>(
                <span key={i} style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.85)",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:999,padding:"5px 14px"}}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT + MISSION ── */}
      <section style={{paddingBlock:"clamp(36px,4vw,56px)"}}>
        <div className="container two-col-grid" style={{gap:32}}>
          <Reveal>
            <div style={{padding:"clamp(28px,3vw,44px)",background:DPALE,borderRadius:"var(--r-xl)",border:"1px solid var(--line)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:D}}>About</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:15,color:"var(--ink2)",lineHeight:1.85,flex:1}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div style={{padding:"clamp(28px,3vw,44px)",background:`linear-gradient(145deg,${DD},${D})`,borderRadius:"var(--r-xl)",height:"100%",display:"flex",flexDirection:"column",gap:16,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",bottom:-40,right:-40,width:180,height:180,borderRadius:"50%",border:"2px solid rgba(255,255,255,.08)"}}/>
              <div style={{position:"absolute",bottom:-80,right:-80,width:260,height:260,borderRadius:"50%",border:"2px solid rgba(255,255,255,.05)"}}/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15,color:"#fff"}}>Why we exist.</h2>
              <p style={{fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.85,flex:1,position:"relative",zIndex:1}}>{b.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(36px,4vw,56px)",background:DPALE}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:D}}>Past Events</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What we've done.</h2>
            </div></Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:20}}>
              {b.past.map((ev,i)=>{
                const Ic = I[ev.icon]||I.tooth;
                return (
                  <Reveal key={i} delay={i*60}>
                    <div style={{
                      background:"var(--paper)",borderRadius:20,border:"1px solid var(--line)",
                      overflow:"hidden",boxShadow:"var(--sh-1)",
                      display:"grid",gridTemplateColumns:"auto 1fr",
                      transition:"box-shadow .3s,transform .3s",
                    }}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 40px ${D}20`;e.currentTarget.style.transform="translateY(-3px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      {/* left accent */}
                      <div style={{background:`linear-gradient(180deg,${D},${DD})`,width:72,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:"28px 0"}}>
                        <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                          <Ic style={{width:20,height:20}}/>
                        </div>
                        <span style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,.7)",writingMode:"vertical-rl",transform:"rotate(180deg)"}}>{ev.tag}</span>
                      </div>
                      {/* content */}
                      <div style={{padding:"28px 32px 28px 28px",display:"flex",flexDirection:"column",gap:10}}>
                        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                          <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.15,color:"var(--ink)"}}>{ev.t}</h3>
                          {ev.stat && <span style={{fontSize:11,fontWeight:700,background:`color-mix(in oklab,${D} 10%,#fff)`,color:D,padding:"4px 12px",borderRadius:999,whiteSpace:"nowrap",letterSpacing:".04em"}}>{ev.stat}</span>}
                        </div>
                        <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.75}}>{ev.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── INITIATIVES ── */}
      {b.initiatives && b.initiatives.length > 0 && (
        <section style={{paddingBlock:"clamp(36px,4vw,56px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32,display:"flex",alignItems:"center",gap:20}}>
              <div style={{flex:1}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:D}}>Initiatives</span>
                <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What we're building.</h2>
              </div>
              <div style={{width:80,height:3,background:`linear-gradient(90deg,${D},transparent)`,borderRadius:999,flexShrink:0}}/>
            </div></Reveal>
            <div className="two-col-grid">
              {b.initiatives.map((ini,i)=>{
                const Ic = I[ini.icon]||I.tooth;
                const shades = [D, DD, DL, "#2e5080"];
                return (
                  <Reveal key={i} delay={i*55}>
                    <div style={{borderRadius:20,overflow:"hidden",boxShadow:"var(--sh-1)",border:"1px solid var(--line)",background:"var(--surface)",transition:"box-shadow .3s,transform .3s"}}
                      onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 12px 40px ${D}25`;e.currentTarget.style.transform="translateY(-5px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.boxShadow="var(--sh-1)";e.currentTarget.style.transform="translateY(0)"}}
                    >
                      <div style={{padding:"22px 26px",background:`linear-gradient(135deg,${shades[i%shades.length]},${shades[i%shades.length]}cc)`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"center",gap:14}}>
                          <div style={{width:48,height:48,borderRadius:14,background:"rgba(255,255,255,.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                            <Ic style={{width:22,height:22}}/>
                          </div>
                          <h3 style={{fontSize:16,fontWeight:700,color:"#fff",lineHeight:1.2}}>{ini.t}</h3>
                        </div>
                        <span style={{fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:"rgba(255,255,255,.8)",background:"rgba(255,255,255,.15)",padding:"4px 10px",borderRadius:999,whiteSpace:"nowrap",flexShrink:0,marginLeft:8}}>{ini.tag}</span>
                      </div>
                      <div style={{padding:"22px 26px 26px"}}>
                        <p style={{fontSize:13,color:"var(--ink2)",lineHeight:1.7}}>{ini.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(36px,4vw,56px)",background:DPALE}}>
          <div className="container">
            <Reveal><div style={{marginBottom:28}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:D}}>On the horizon</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What's next.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:24}}>
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div style={{borderRadius:20,padding:"clamp(32px,4vw,48px)",background:`linear-gradient(135deg,color-mix(in oklab,${D} 5%,#fff),#fff)`,border:`1px solid color-mix(in oklab,${D} 15%,var(--line))`,position:"relative",overflow:"hidden",boxShadow:"var(--sh-1)",transition:"box-shadow .3s,transform .3s"}}
                    onMouseEnter={e2=>{e2.currentTarget.style.boxShadow=`0 16px 48px ${D}20`;e2.currentTarget.style.transform="translateY(-5px)"}}
                    onMouseLeave={e2=>{e2.currentTarget.style.boxShadow="var(--sh-1)";e2.currentTarget.style.transform="translateY(0)"}}
                  >
                    <div style={{position:"absolute",top:0,left:0,width:"100%",height:4,background:`linear-gradient(90deg,${D},${DL})`}}/>
                    <div style={{position:"absolute",right:-20,bottom:-20,width:120,height:120,borderRadius:"50%",background:`color-mix(in oklab,${D} 5%,transparent)`}}/>
                    <span style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",background:`color-mix(in oklab,${D} 10%,#fff)`,color:D,padding:"5px 12px",borderRadius:999,marginBottom:16}}>Upcoming · {e.when}</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,26px)",fontWeight:800,lineHeight:1.15,color:"var(--ink)"}}>{e.t}</h3>
                    <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.75,marginTop:12}}>{e.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
        <div className="container">
          <Reveal>
            <div style={{borderRadius:24,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,${DD} 0%,${D} 55%,${DL} 100%)`,padding:"clamp(56px,7vw,88px)"}}>
              <svg style={{position:"absolute",right:"-3%",bottom:"-15%",opacity:.07,pointerEvents:"none"}} width="400" height="400" viewBox="0 0 400 400">
                {[50,100,150,200,250].map(r=><circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#fff" strokeWidth="1.5"/>)}
              </svg>
              <div className="branch-cta-grid" style={{position:"relative",zIndex:1,gap:48}}>
                <div style={{color:"#fff"}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",opacity:.5}}>Get Involved</span>
                  <h2 style={{fontSize:"clamp(30px,4vw,56px)",color:"#fff",marginTop:10,fontWeight:900,lineHeight:.95,letterSpacing:"-.02em"}}>Join<br/>Dentistry4Youth.</h2>
                  <p style={{fontSize:16,color:"rgba(255,255,255,.7)",marginTop:18,maxWidth:420,lineHeight:1.75}}>
                    Access shadowing events, application resources, specialist panels, and a community of future dental professionals.
                  </p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
                  <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:DD,fontWeight:800,border:"none",width:"100%",justifyContent:"center"}}>Join the Branch <I.arrow className="arr"/></Link>
                  <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.25)",width:"100%",justifyContent:"center"}}>Browse all branches</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── NeuroPsych4Youth full page ── */
function NeuroPsychPage({ b }) {
  const P     = "#8b5cf6";
  const PD    = "#4c1d95";
  const PL    = "#a78bfa";
  const PINK  = "#ec4899";
  const PK    = "#f472b6";
  const PPALE = "#fdf4ff";

  const { motion, useScroll, useTransform } = window.Motion;

  const heroRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const nodes = [
    {x:12,y:18},{x:28,y:8},{x:45,y:22},{x:62,y:12},{x:80,y:28},{x:92,y:15},
    {x:8,y:45},{x:25,y:55},{x:42,y:40},{x:58,y:52},{x:75,y:38},{x:88,y:55},
    {x:15,y:72},{x:35,y:80},{x:52,y:68},{x:68,y:78},{x:85,y:70},{x:95,y:82},
  ];

  const connections = React.useMemo(()=>{
    const c = [];
    nodes.forEach((n1,i)=>nodes.forEach((n2,j)=>{
      if(j<=i) return;
      const d = Math.sqrt((n1.x-n2.x)**2+(n1.y-n2.y)**2);
      if(d<22) c.push({i,j});
    }));
    return c;
  },[]);

  const focuses = b.focuses || [
    "Mental health awareness & stigma reduction",
    "Behavioural neuroscience & psychology",
    "Brain-based therapies & neurological disorders",
    "Emotional development & human behaviour",
    "Neuroscience research & laboratory skills",
    "Computational neuroscience & coding",
    "Brain-computer interfaces & neural engineering",
    "Career exploration in psychology & neuroscience",
  ];

  const focusIcons  = [I.heart, I.brain, I.eye, I.mind, I.flask, I.circuit, I.spark, I.arrow];
  const focusColors = [PINK, P, PL, PD, PK, P, PINK, PL];

  return (
    <div data-branch={b.slug}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="branch-hero-split" style={{background:"linear-gradient(135deg,#07001a 0%,#1a0a3e 50%,#0e0028 100%)"}}>

        {/* Neural network background */}
        <motion.div style={{position:"absolute",inset:0,zIndex:0,y:bgY}}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
            {connections.map(({i,j},ci)=>(
              <motion.line key={`l${ci}`}
                x1={`${nodes[i].x}%`} y1={`${nodes[i].y}%`}
                x2={`${nodes[j].x}%`} y2={`${nodes[j].y}%`}
                stroke={ci%3===0?PINK:PL} strokeWidth="0.12"
                animate={{opacity:[0.04,0.28,0.04]}}
                transition={{duration:2+(ci%4),repeat:Infinity,delay:ci*0.18,ease:"easeInOut"}}
              />
            ))}
            {nodes.map((n,i)=>(
              <motion.circle key={`n${i}`}
                cx={`${n.x}%`} cy={`${n.y}%`}
                fill={i%2===0?PINK:PL}
                animate={{r:["0.28%","0.52%","0.28%"],opacity:[0.25,0.75,0.25]}}
                transition={{duration:2+(i%4)*0.5,repeat:Infinity,delay:i*0.22,ease:"easeInOut"}}
              />
            ))}
          </svg>
          <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 70% 90% at 75% 50%,rgba(139,92,246,.2),transparent 60%),radial-gradient(ellipse 50% 70% at 20% 80%,rgba(236,72,153,.13),transparent 55%)`}}/>
        </motion.div>

        {/* LEFT - text */}
        <motion.div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",justifyContent:"center",padding:"clamp(60px,8vw,100px) clamp(32px,5vw,72px)",y:contentY,opacity:heroOpacity}}>
          <Reveal>
            <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.3)",borderRadius:999,padding:"5px 14px 5px 7px",width:"fit-content",marginBottom:32,fontSize:12,fontWeight:700,letterSpacing:".05em",color:PL}}>
              <BranchMark branch={b} size={24} circle={false} style={{borderRadius:7}}/>
              NeuroPsych4Youth · M4Y
            </div>
            <div style={{fontSize:"clamp(12px,1.1vw,15px)",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:16}}>Mind · Brain · Behaviour</div>
            <h1 style={{fontSize:"clamp(48px,6.5vw,88px)",fontWeight:900,lineHeight:.88,letterSpacing:"-.03em",marginBottom:28,color:"#fff"}}>
              Explore the<br/>
              <span style={{background:`linear-gradient(90deg,${PINK},${P},${PL})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Brain & Mind.</span>
            </h1>
            <p style={{fontSize:17,color:"rgba(255,255,255,.65)",lineHeight:1.75,maxWidth:440,marginBottom:36}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg" style={{background:`linear-gradient(135deg,${PINK},${P})`,color:"#fff",fontWeight:700,border:"none",boxShadow:`0 8px 24px ${P}55`}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-lg" style={{background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.85)",border:"1px solid rgba(255,255,255,.15)"}}>
                All branches
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{display:"flex",gap:0,marginTop:56,borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:28}}>
              {[{n:"5",label:"Past Events"},{n:"2",label:"Workshops Planned"},{n:"JYI",label:"Published Research"},{n:"200+",label:"Students Reached"}].map((s,i,arr)=>(
                <div key={i} style={{flex:1,paddingRight:20,borderRight:i<arr.length-1?"1px solid rgba(255,255,255,.1)":"none",paddingLeft:i>0?20:0}}>
                  <div style={{fontSize:"clamp(22px,2.5vw,36px)",fontWeight:900,color:PL,lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.4)",fontWeight:600,marginTop:4,letterSpacing:".04em"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        {/* RIGHT - logo + rings */}
        <div style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"center",padding:"60px 40px"}}>
          {[480,600,720].map((size,i)=>(
            <motion.div key={i} style={{position:"absolute",width:size,height:size,borderRadius:"50%",border:`1px solid rgba(${i===0?"236,72,153":"139,92,246"},${0.28-i*0.07})`}}
              animate={{scale:[1,1.05,1],opacity:[0.35,0.65,0.35]}}
              transition={{duration:3.5+i,repeat:Infinity,delay:i*0.9,ease:"easeInOut"}}
            />
          ))}
          <motion.div style={{position:"absolute",width:460,height:460,borderRadius:"50%",background:`radial-gradient(circle,${P}35 0%,transparent 70%)`,filter:"blur(36px)"}}
            animate={{scale:[1,1.25,1],opacity:[0.5,0.85,0.5]}}
            transition={{duration:4.5,repeat:Infinity,ease:"easeInOut"}}
          />
          {b.logo && (
            <motion.img src={b.logo} alt="NP4Y"
              style={{width:"min(440px,50vw)",objectFit:"contain",position:"relative",zIndex:1,filter:`drop-shadow(0 0 64px ${P}90) drop-shadow(0 0 20px ${PINK}70)`}}
              animate={{y:[0,-14,0],rotate:[-1,1,-1]}}
              transition={{duration:5.5,repeat:Infinity,ease:"easeInOut"}}
            />
          )}
        </div>
      </section>

      {/* ── STATEMENT BAND ── */}
      <section style={{background:`linear-gradient(135deg,#1a0050 0%,${PD} 35%,${P} 70%,${PINK} 100%)`,paddingBlock:"clamp(28px,3vw,44px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.22)"}}/>
        <div className="container" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
          <Reveal><p style={{fontSize:"clamp(16px,2vw,26px)",fontWeight:800,color:"#fff",lineHeight:1.2,margin:0}}>
            Demystifying the brain - one synapse at a time.
          </p></Reveal>
          <Reveal delay={80}>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {["Neuroscience","Psychology","Mental Health","Research","Technology"].map((tag,i)=>(
                <span key={i} style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.85)",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:999,padding:"5px 14px"}}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT + MISSION ── */}
      <section style={{paddingBlock:"clamp(48px,5vw,72px)",background:PPALE}}>
        <div className="container two-col-grid" style={{gap:24}}>
          <Reveal>
            <div style={{padding:"clamp(32px,4vw,48px)",background:"var(--paper)",borderRadius:"var(--r-xl)",border:`1px solid rgba(139,92,246,.15)`,boxShadow:`0 4px 28px rgba(139,92,246,.08)`,height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:P}}>About</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:15,color:"var(--ink2)",lineHeight:1.85,flex:1}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={70}>
            <div style={{padding:"clamp(32px,4vw,48px)",background:`linear-gradient(145deg,${PD},${P})`,borderRadius:"var(--r-xl)",height:"100%",display:"flex",flexDirection:"column",gap:16,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",border:"2px solid rgba(255,255,255,.08)"}}/>
              <div style={{position:"absolute",bottom:-60,right:-60,width:290,height:290,borderRadius:"50%",border:"2px solid rgba(255,255,255,.05)"}}/>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:800,lineHeight:1.15,color:"#fff"}}>Why we exist.</h2>
              <p style={{fontSize:15,color:"rgba(255,255,255,.78)",lineHeight:1.85,flex:1,position:"relative",zIndex:1}}>{b.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOCUS AREAS ── */}
      {focuses.length > 0 && (
        <section style={{paddingBlock:"clamp(48px,5vw,72px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:40}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:P}}>Focus Areas</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What we focus on.</h2>
            </div></Reveal>
            <div className="four-col-grid">
              {focuses.map((f,i)=>{
                const Ic  = focusIcons[i]  || I.brain;
                const col = focusColors[i] || P;
                return (
                  <Reveal key={i} delay={i*40}>
                    <motion.div
                      style={{borderRadius:20,padding:"28px 22px",background:"var(--paper)",border:`1px solid var(--line)`,borderTop:`3px solid ${col}`,boxShadow:"var(--sh-1)",height:"100%",display:"flex",flexDirection:"column",gap:14,cursor:"default"}}
                      whileHover={{y:-8,boxShadow:`0 20px 48px ${col}30`,borderColor:col,transition:{duration:.2}}}
                    >
                      <div style={{width:44,height:44,borderRadius:12,background:`${col}18`,display:"flex",alignItems:"center",justifyContent:"center",color:col}}>
                        <Ic style={{width:22,height:22}}/>
                      </div>
                      <p style={{fontSize:14,fontWeight:600,color:"var(--ink)",lineHeight:1.45,flex:1}}>{f}</p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── PAST EVENTS ── */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(48px,5vw,72px)",background:PPALE}}>
          <div className="container">
            <Reveal><div style={{marginBottom:36}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:P}}>Past Events</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What we've done.</h2>
            </div></Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {b.past.map((ev,i)=>{
                const Ic  = I[ev.icon] || I.brain;
                const acc = [PINK,P,PL,PD,PK][i%5];
                return (
                  <Reveal key={i} delay={i*55}>
                    <motion.div
                      style={{background:"var(--paper)",borderRadius:20,border:"1px solid var(--line)",overflow:"hidden",boxShadow:"var(--sh-1)",display:"grid",gridTemplateColumns:"auto 1fr"}}
                      whileHover={{y:-3,boxShadow:`0 12px 40px ${acc}28`,transition:{duration:.2}}}
                    >
                      <div style={{background:`linear-gradient(180deg,${acc},${acc}cc)`,width:72,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,padding:"28px 0"}}>
                        <div style={{width:42,height:42,borderRadius:12,background:"rgba(255,255,255,.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
                          <Ic style={{width:20,height:20}}/>
                        </div>
                        <span style={{fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:"rgba(255,255,255,.75)",writingMode:"vertical-rl",transform:"rotate(180deg)"}}>{ev.tag}</span>
                      </div>
                      <div style={{padding:"28px 32px 28px 28px",display:"flex",flexDirection:"column",gap:10}}>
                        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
                          <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.15,color:"var(--ink)"}}>{ev.t}</h3>
                          {ev.stat && <span style={{fontSize:11,fontWeight:700,background:`${acc}18`,color:acc,padding:"4px 12px",borderRadius:999,whiteSpace:"nowrap",letterSpacing:".04em"}}>{ev.stat}</span>}
                        </div>
                        <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.75}}>{ev.d}</p>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING ── */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(48px,5vw,72px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:P}}>On the Horizon</span>
              <h2 style={{fontSize:"clamp(28px,3.2vw,48px)",fontWeight:900,marginTop:8,lineHeight:1}}>What's next.</h2>
            </div></Reveal>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(380px,1fr))",gap:24}}>
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <motion.div
                    style={{borderRadius:20,padding:"clamp(32px,4vw,48px)",background:`linear-gradient(135deg,${PD},${P})`,position:"relative",overflow:"hidden",boxShadow:`0 8px 32px ${P}35`}}
                    whileHover={{y:-6,boxShadow:`0 20px 52px ${P}50`,transition:{duration:.2}}}
                  >
                    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${PINK},${PL})`}}/>
                    <div style={{position:"absolute",right:-20,bottom:-20,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
                    <span style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",background:"rgba(255,255,255,.15)",color:"#fff",padding:"5px 12px",borderRadius:999,marginBottom:16}}>Upcoming · {e.when}</span>
                    <h3 style={{fontSize:"clamp(18px,2vw,26px)",fontWeight:800,lineHeight:1.15,color:"#fff"}}>{e.t}</h3>
                    <p style={{fontSize:14,color:"rgba(255,255,255,.75)",lineHeight:1.75,marginTop:12}}>{e.d}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{paddingBlock:"clamp(40px,5vw,64px)",background:PPALE}}>
        <div className="container">
          <Reveal>
            <div style={{borderRadius:24,overflow:"hidden",position:"relative",background:`linear-gradient(135deg,#07001a 0%,${PD} 40%,${P} 80%,${PINK} 100%)`,padding:"clamp(56px,7vw,88px)"}}>
              <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.06,pointerEvents:"none"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                {nodes.slice(0,10).map((n,i)=><circle key={i} cx={`${n.x}%`} cy={`${n.y}%`} r=".5%" fill="#fff"/>)}
                {connections.slice(0,12).map(({i,j},ci)=><line key={ci} x1={`${nodes[i].x}%`} y1={`${nodes[i].y}%`} x2={`${nodes[j].x}%`} y2={`${nodes[j].y}%`} stroke="#fff" strokeWidth=".1"/>)}
              </svg>
              <div className="branch-cta-grid" style={{position:"relative",zIndex:1,gap:48}}>
                <div style={{color:"#fff"}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",opacity:.5}}>Get Involved</span>
                  <h2 style={{fontSize:"clamp(30px,4vw,56px)",color:"#fff",marginTop:10,fontWeight:900,lineHeight:.95,letterSpacing:"-.02em"}}>Join<br/>NeuroPsych4Youth.</h2>
                  <p style={{fontSize:16,color:"rgba(255,255,255,.7)",marginTop:18,maxWidth:420,lineHeight:1.75}}>
                    Access research workshops, career panels, mentorship, and a community of future neuroscientists, psychologists, and mental health advocates.
                  </p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
                  <Link to="/join" className="btn btn-lg" style={{background:`linear-gradient(135deg,${PINK},${P})`,color:"#fff",fontWeight:800,border:"none",width:"100%",justifyContent:"center",boxShadow:`0 8px 24px ${P}50`}}>Join the Branch <I.arrow className="arr"/></Link>
                  <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",borderColor:"rgba(255,255,255,.25)",width:"100%",justifyContent:"center"}}>Browse all branches</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── Rehab4Youth page ── */
function RehabPage({ b }) {
  const R  = "#d03868";
  const RD = "#8a1a3a";
  const RM = "#b82255";

  const stats = [
    { value:"120+", label:"Students Reached" },
    { value:"2",    label:"Events Hosted" },
    { value:"3",    label:"Allied Health Fields" },
    { value:"1",    label:"Shadowing Program" },
  ];

  const fields = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="5" r="2"/><path d="M5 20l2.5-6.5L9 16l3-9 3 9 1.5-2.5L19 20"/></svg>,
      name: "Physiotherapy",
      desc: "Movement rehabilitation, musculoskeletal assessment, and exercise-based recovery. One of Canada's fastest-growing health professions.",
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
      name: "Occupational Therapy",
      desc: "Restoring independence through adaptive strategies, assistive technology, and client-centred daily function.",
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      name: "Speech-Language Pathology",
      desc: "Diagnosing and treating communication disorders, voice, fluency, and swallowing dysfunction across the lifespan.",
    },
  ];

  return (
    <div data-branch={b.slug}>

      {/* Hero */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:`linear-gradient(135deg,${RD} 0%,${R} 55%,#e8507a 100%)`,
        minHeight:520, display:"grid", placeItems:"center",
        paddingBlock:"clamp(72px,10vw,120px)",
      }}>
        <svg style={{position:"absolute",bottom:"20%",left:0,right:0,width:"100%",opacity:.09,pointerEvents:"none"}}
          viewBox="0 0 1440 60" preserveAspectRatio="none">
          <polyline points="0,30 180,30 220,8 260,52 300,30 480,30 520,14 560,46 600,30 1440,30"
            fill="none" stroke="#fff" strokeWidth="2"/>
        </svg>
        <svg style={{position:"absolute",right:"5%",top:"10%",opacity:.1,pointerEvents:"none"}} width="180" height="180" viewBox="0 0 180 180">
          {Array.from({length:25}).map((_,i)=><circle key={i} cx={(i%5)*36+8} cy={Math.floor(i/5)*36+8} r="2.5" fill="#fff"/>)}
        </svg>
        <svg style={{position:"absolute",left:"-5%",bottom:"-15%",opacity:.07,pointerEvents:"none"}} width="320" height="320" viewBox="0 0 320 320">
          {[60,110,160,210].map(r=><circle key={r} cx="60" cy="260" r={r} stroke="#fff" strokeWidth="1" fill="none"/>)}
        </svg>

        <div className="container b-grid-hero" style={{position:"relative"}}>
          <div className="stack" style={{gap:24,color:"#fff"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:10,
              background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.25)",
              borderRadius:999,padding:"6px 16px 6px 8px",
              fontSize:13,fontWeight:600,letterSpacing:".04em",width:"fit-content",
            }}>
              <BranchMark branch={b} size={28} circle={false} style={{borderRadius:8}}/>
              Rehab4Youth · M4Y Branch
            </span>
            <h1 style={{fontSize:"clamp(40px,5.5vw,72px)",color:"#fff",lineHeight:.95}}>
              Rehab<br/><span style={{opacity:.6}}>4Youth</span>
            </h1>
            <p style={{fontSize:18,color:"rgba(255,255,255,.82)",maxWidth:500,lineHeight:1.65}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-primary" style={{background:"#fff",color:RD,border:"none",fontWeight:700}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>All branches</Link>
            </div>
          </div>
          <div style={{display:"grid",placeItems:"center"}}>
            {b.logo
              ? <img src={b.logo} alt="Rehab4Youth" style={{width:"min(88%,300px)",height:"min(88%,300px)",objectFit:"contain"}}/>
              : <div style={{width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.15)",display:"grid",placeItems:"center"}}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
            }
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:"var(--paper)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div className="b-stats-4">
            {stats.map((s,i)=>(
              <div key={i} style={{borderRight:i<stats.length-1?"1px solid var(--line)":"none"}}>
                <div style={{padding:"28px 0",textAlign:"center"}}>
                  <div style={{fontSize:"clamp(28px,3vw,42px)",fontWeight:900,color:R,lineHeight:1,letterSpacing:"-.02em"}}>{s.value}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"var(--mute)",letterSpacing:".06em",textTransform:"uppercase",marginTop:6}}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Mission */}
      <section style={{paddingBlock:"clamp(48px,6vw,72px)"}}>
        <div className="container two-col-grid" style={{gap:32}}>
          <Reveal>
            <div className="card" style={{padding:"clamp(28px,4vw,44px)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span className="eyebrow">About</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15}}>What this branch does.</h2>
              <p style={{fontSize:16,color:"var(--ink2)",lineHeight:1.8,flex:1}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              padding:"clamp(28px,4vw,44px)",
              background:`linear-gradient(135deg,${R} 0%,${RD} 100%)`,
              borderRadius:"var(--r-lg)",
              height:"100%",display:"flex",flexDirection:"column",gap:16,color:"#fff",
              position:"relative",overflow:"hidden",
            }}>
              <svg style={{position:"absolute",top:"-20%",right:"-8%",opacity:.12,pointerEvents:"none"}} width="200" height="200" viewBox="0 0 200 200">
                {[40,80,120,160].map(r=><circle key={r} cx="180" cy="30" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
              </svg>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.55)"}}>Our Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15,color:"#fff"}}>Why it matters.</h2>
              <p style={{fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.75,flex:1,position:"relative",zIndex:1}}>{b.mission}</p>
              <Link to="/join" className="btn" style={{
                marginTop:"auto",alignSelf:"flex-start",
                background:"rgba(255,255,255,.18)",color:"#fff",
                border:"1px solid rgba(255,255,255,.3)",backdropFilter:"blur(4px)",
              }}>Get involved <I.arrow className="arr"/></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Allied Health Fields */}
      <section style={{paddingBlock:"clamp(56px,7vw,80px)",background:"var(--g50)",borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16,marginBottom:40}}>
              <div>
                <span className="eyebrow">Fields we explore</span>
                <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10,lineHeight:1.05}}>Three paths in rehab.</h2>
              </div>
              <p style={{fontSize:15,color:"var(--ink2)",maxWidth:380,lineHeight:1.7}}>
                Each field has its own career pathway, clinical focus, and graduate training route.
              </p>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))",gap:16}}>
            {fields.map((f,i)=>(
              <Reveal key={i} delay={i*80}>
                <div className="card" style={{
                  padding:28,display:"flex",flexDirection:"column",gap:16,height:"100%",
                  borderTop:`3px solid ${R}`,
                }}>
                  <div style={{
                    width:44,height:44,borderRadius:12,
                    background:`${R}12`,border:`1px solid ${R}28`,
                    display:"grid",placeItems:"center",color:R,
                  }}>{f.icon}</div>
                  <h3 style={{fontSize:17,fontWeight:800,lineHeight:1.25}}>{f.name}</h3>
                  <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.7,flex:1}}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{paddingBlock:"clamp(48px,6vw,72px)"}}>
        <div className="container">
          <Reveal>
            <div style={{marginBottom:32}}>
              <span className="eyebrow">Gallery</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10,lineHeight:1.05}}>Rehab in action.</h2>
            </div>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:"1.25fr 1fr",gap:16}}>
            <Reveal>
              <PH label="Rehabilitation session" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80" aspect="3/4"
                style={{borderRadius:"var(--r-lg)",height:"100%",minHeight:280}}/>
            </Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <Reveal delay={80}>
                <PH label="Athlete training" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80" aspect="4/3"
                  style={{borderRadius:"var(--r-lg)"}}/>
              </Reveal>
              <Reveal delay={150}>
                <PH label="Rehab exercise" src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80" aspect="4/3"
                  style={{borderRadius:"var(--r-lg)"}}/>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(48px,6vw,72px)",background:"var(--g50)",borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <Reveal>
              <div style={{marginBottom:32}}>
                <span className="eyebrow">Past Events</span>
                <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What we've done.</h2>
              </div>
            </Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {b.past.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div className="card" style={{padding:0,overflow:"hidden",display:"grid",gridTemplateColumns:"5px 1fr"}}>
                    <div style={{background:`linear-gradient(180deg,${R},${RM})`}}/>
                    <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",gap:10}}>
                      <span style={{fontSize:11,fontWeight:700,color:R,letterSpacing:".06em",textTransform:"uppercase"}}>Past Event</span>
                      <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.2}}>{e.t}</h3>
                      <p style={{fontSize:14.5,color:"var(--ink2)",lineHeight:1.75}}>{e.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming */}
      {b.future && b.future.length > 0 && (
        <section style={{paddingBlock:"clamp(40px,5vw,64px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span className="eyebrow">Upcoming</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What's next.</h2>
            </div></Reveal>
            <div className="two-col-grid">
              {b.future.map((e,i)=>(
                <Reveal key={i} delay={i*60}>
                  <div className="card" style={{padding:0,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                    <div style={{height:4,background:`linear-gradient(90deg,${R},${RM})`}}/>
                    <div style={{padding:"28px 32px",flex:1,display:"flex",flexDirection:"column",gap:12}}>
                      <span className="pill sage" style={{alignSelf:"flex-start",fontSize:11}}>Upcoming</span>
                      <h3 style={{fontSize:20,lineHeight:1.2}}>{e.t}</h3>
                      <p style={{fontSize:14,color:"var(--ink2)",lineHeight:1.65,flex:1}}>{e.d}</p>
                      {e.when && <div style={{fontFamily:"var(--f-mono)",fontSize:12,color:"var(--mute)",marginTop:4}}>{e.when}</div>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{paddingBlock:"clamp(64px,8vw,96px)",background:RD,position:"relative",overflow:"hidden"}}>
        <svg style={{position:"absolute",right:0,top:0,opacity:.07,pointerEvents:"none"}} width="420" height="420" viewBox="0 0 420 420">
          {[70,130,190,250,310].map(r=><circle key={r} cx="420" cy="0" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
        </svg>
        <div className="container" style={{position:"relative"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
              <div style={{color:"#fff"}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.45)"}}>Get involved</span>
                <h2 style={{fontSize:"clamp(28px,3.5vw,48px)",color:"#fff",marginTop:12}}>Join Rehab4Youth.</h2>
                <p style={{fontSize:17,color:"rgba(255,255,255,.68)",marginTop:12,maxWidth:480,lineHeight:1.65}}>
                  Members receive branch-specific mentorship, event invites, and early access to shadowing in physiotherapy, OT, and SLP.
                </p>
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:RD,fontWeight:700,border:"none"}}>Join the branch <I.arrow className="arr"/></Link>
                <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>Browse others</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ── Surgery4Youth page ── */
function SurgeryPage({ b }) {
  const { motion } = window.Motion || {};
  const S  = "#603098";
  const SD = "#3a1060";
  const SM = "#8040b8";
  const SL = "#ede8f8";

  const stats = [
    { value:"200+", label:"Students Reached" },
    { value:"3",    label:"Events Hosted" },
    { value:"1",    label:"Publication" },
    { value:"2+",   label:"Surgeon Speakers" },
  ];

  return (
    <div data-branch={b.slug}>

      {/* ── Hero ── */}
      <section style={{
        position:"relative",overflow:"hidden",
        background:`linear-gradient(135deg,${SD} 0%,${S} 60%,#8050c0 100%)`,
        minHeight:520,display:"grid",placeItems:"center",
        paddingBlock:"clamp(72px,10vw,120px)",
      }}>
        {/* Scalpel-style cross-hatch lines */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.06,pointerEvents:"none"}} viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          {Array.from({length:12}).map((_,i)=>(
            <line key={i} x1={-100+i*80} y1="0" x2={i*80+200} y2="500" stroke="#fff" strokeWidth="1"/>
          ))}
        </svg>
        {/* Corner rings */}
        <svg style={{position:"absolute",right:"-6%",top:"-18%",opacity:.1,pointerEvents:"none"}} width="440" height="440" viewBox="0 0 440 440">
          {[60,110,165,220,280].map(r=><circle key={r} cx="420" cy="80" r={r} stroke="#fff" strokeWidth="1" fill="none"/>)}
        </svg>
        <svg style={{position:"absolute",left:"-4%",bottom:"-15%",opacity:.07,pointerEvents:"none"}} width="280" height="280" viewBox="0 0 280 280">
          {[50,95,140].map(r=><circle key={r} cx="20" cy="260" r={r} stroke="#fff" strokeWidth="1" fill="none"/>)}
        </svg>

        <div className="container b-grid-hero" style={{position:"relative"}}>
          <div className="stack" style={{gap:24,color:"#fff"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:10,
              background:"rgba(255,255,255,.14)",backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,.22)",
              borderRadius:999,padding:"6px 16px 6px 8px",
              fontSize:13,fontWeight:600,letterSpacing:".04em",width:"fit-content",
            }}>
              <BranchMark branch={b} size={28} circle={false} style={{borderRadius:8}}/>
              Surgery4Youth · M4Y Branch
            </span>
            <h1 style={{fontSize:"clamp(40px,5.5vw,72px)",color:"#fff",lineHeight:.95}}>
              Surgery<br/><span style={{opacity:.6}}>4Youth</span>
            </h1>
            <p style={{fontSize:18,color:"rgba(255,255,255,.8)",maxWidth:500,lineHeight:1.65}}>{b.tagline}</p>
            <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-primary" style={{background:"#fff",color:SD,border:"none",fontWeight:700}}>
                Join this branch <I.arrow className="arr"/>
              </Link>
              <Link to="/branches" className="btn btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>All branches</Link>
            </div>
          </div>
          <div style={{display:"grid",placeItems:"center"}}>
            {b.logo
              ? <img src={b.logo} alt="Surgery4Youth" style={{width:"min(88%,300px)",height:"min(88%,300px)",objectFit:"contain"}}/>
              : <I.scalpel style={{width:80,height:80,color:"rgba(255,255,255,.7)"}}/>
            }
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{background:"var(--paper)",borderBottom:"1px solid var(--line)"}}>
        <div className="container">
          <div className="b-stats-4">
            {stats.map((s,i)=>(
              <div key={i} style={{borderRight:i<stats.length-1?"1px solid var(--line)":"none"}}>
                <div style={{padding:"28px 0",textAlign:"center"}}>
                  <div style={{fontSize:"clamp(28px,3vw,42px)",fontWeight:900,color:S,lineHeight:1,letterSpacing:"-.02em"}}>{s.value}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"var(--mute)",letterSpacing:".06em",textTransform:"uppercase",marginTop:6}}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About + Mission ── */}
      <section style={{paddingBlock:"clamp(48px,6vw,72px)"}}>
        <div className="container two-col-grid" style={{gap:32}}>
          <Reveal>
            <div className="card" style={{padding:"clamp(28px,4vw,44px)",height:"100%",display:"flex",flexDirection:"column",gap:16}}>
              <span className="eyebrow">About</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15}}>What this branch is.</h2>
              <p style={{fontSize:16,color:"var(--ink2)",lineHeight:1.8,flex:1}}>{b.about}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              padding:"clamp(28px,4vw,44px)",
              background:`linear-gradient(135deg,${S} 0%,${SD} 100%)`,
              borderRadius:"var(--r-lg)",
              height:"100%",display:"flex",flexDirection:"column",gap:16,color:"#fff",
              position:"relative",overflow:"hidden",
            }}>
              <svg style={{position:"absolute",top:"-20%",right:"-8%",opacity:.12,pointerEvents:"none"}} width="220" height="220" viewBox="0 0 220 220">
                {[40,80,120,160].map(r=><circle key={r} cx="200" cy="30" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
              </svg>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(255,255,255,.5)"}}>Our Mission</span>
              <h2 style={{fontSize:"clamp(22px,2.5vw,32px)",lineHeight:1.15,color:"#fff"}}>Why it matters.</h2>
              <p style={{fontSize:17,color:"rgba(255,255,255,.85)",lineHeight:1.75,flex:1,position:"relative",zIndex:1}}>{b.mission}</p>
              <Link to="/join" className="btn" style={{
                marginTop:"auto",alignSelf:"flex-start",
                background:"rgba(255,255,255,.18)",color:"#fff",
                border:"1px solid rgba(255,255,255,.3)",backdropFilter:"blur(4px)",
              }}>Get involved <I.arrow className="arr"/></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Photo grid ── */}
      <section style={{paddingBlock:"clamp(48px,6vw,72px)",background:"var(--g50)",borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal>
            <div style={{marginBottom:32}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:S}}>Events & Speakers</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10,lineHeight:1.05}}>Surgery in action.</h2>
            </div>
          </Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <Reveal>
              <PH label="Women in Surgery Panel" src="./assets/surgery/women-in-surgery-panel.png" aspect="16/9"
                style={{borderRadius:"var(--r-lg)"}}/>
            </Reveal>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <Reveal delay={80}>
                <PH label="Surgery Unscripted with Dr. Dehghan" src="./assets/surgery/surgery-unscripted-dehghan.png" aspect="4/3"
                  style={{borderRadius:"var(--r-lg)"}}/>
              </Reveal>
              <Reveal delay={150}>
                <PH label="Surgery Unscripted with Dr. Zakhary" src="./assets/surgery/surgery-unscripted-zakhary.png" aspect="4/3"
                  style={{borderRadius:"var(--r-lg)"}}/>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Past Events ── */}
      {b.past && b.past.length > 0 && (
        <section style={{paddingBlock:"clamp(48px,6vw,72px)"}}>
          <div className="container">
            <Reveal><div style={{marginBottom:32}}>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:S}}>Past Events</span>
              <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>What we've done.</h2>
            </div></Reveal>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {b.past.map((e,i)=>(
                <Reveal key={i} delay={i*70}>
                  <div style={{
                    borderRadius:"var(--r-lg)",border:"1px solid var(--line)",
                    background:"var(--paper)",boxShadow:"var(--sh-1)",
                    overflow:"hidden",display:"grid",
                    gridTemplateColumns:i%2===0?"5px 1fr":"1fr 5px",
                    transition:"transform .25s,box-shadow .25s",
                  }}
                    onMouseEnter={ev=>{ev.currentTarget.style.transform="translateY(-3px)";ev.currentTarget.style.boxShadow=`0 16px 48px ${S}22`}}
                    onMouseLeave={ev=>{ev.currentTarget.style.transform="";ev.currentTarget.style.boxShadow="var(--sh-1)"}}
                  >
                    {i%2===0 && <div style={{background:`linear-gradient(180deg,${S},${SM})`}}/>}
                    <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",gap:10}}>
                      <span style={{fontSize:11,fontWeight:700,color:S,letterSpacing:".06em",textTransform:"uppercase"}}>Past Event</span>
                      <h3 style={{fontSize:"clamp(18px,2vw,24px)",fontWeight:800,lineHeight:1.2}}>{e.t}</h3>
                      <p style={{fontSize:14.5,color:"var(--ink2)",lineHeight:1.75}}>{e.d}</p>
                    </div>
                    {i%2!==0 && <div style={{background:`linear-gradient(180deg,${S},${SM})`}}/>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Magazine ── */}
      <section style={{paddingBlock:"clamp(48px,6vw,72px)",background:"var(--paper)",borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <Reveal><div style={{marginBottom:40}}>
            <span style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:S}}>Publications</span>
            <h2 style={{fontSize:"clamp(28px,3vw,42px)",marginTop:10}}>Surgery4Youth Magazine.</h2>
            <p style={{fontSize:16,color:"var(--ink2)",marginTop:12,maxWidth:560,lineHeight:1.65}}>The official publication of Surgery4Youth - case discussions, surgical op-eds, and interviews with practicing surgeons.</p>
          </div></Reveal>
          <div className="two-col-grid" style={{gap:20}}>
            <Reveal>
              <div style={{
                aspectRatio:"3/4",borderRadius:"var(--r-lg)",overflow:"hidden",
                background:`linear-gradient(155deg,${SD} 0%,${S} 60%,${SM} 100%)`,
                display:"flex",flexDirection:"column",justifyContent:"flex-end",
                padding:28,position:"relative",boxShadow:"var(--sh-2)",
              }}>
                <svg style={{position:"absolute",top:0,right:0,opacity:.12,pointerEvents:"none"}} width="200" height="200" viewBox="0 0 200 200">
                  {[40,80,120].map(r=><circle key={r} cx="180" cy="30" r={r} stroke="#fff" strokeWidth="1" fill="none"/>)}
                </svg>
                <div style={{position:"absolute",bottom:-24,left:-24,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
                <div style={{position:"relative"}}>
                  <div style={{fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.6)",marginBottom:10}}>Surgery4Youth</div>
                  <h3 style={{color:"#fff",fontSize:24,lineHeight:1.15,fontWeight:900}}>The Surgical<br/>Magazine</h3>
                  <div style={{marginTop:10,fontSize:13,color:"rgba(255,255,255,.5)"}}>Issue · Coming 2026</div>
                  <div style={{
                    marginTop:20,padding:"9px 16px",borderRadius:999,
                    background:"rgba(255,255,255,.18)",border:"1px solid rgba(255,255,255,.3)",
                    display:"inline-flex",alignItems:"center",gap:8,
                    fontSize:12,color:"rgba(255,255,255,.85)",fontWeight:600,
                  }}>
                    <I.book style={{width:14}}/> Preview coming soon
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="stack" style={{gap:16}}>
              <Reveal>
                <div style={{borderRadius:"var(--r-lg)",overflow:"hidden",border:"1px solid var(--line)",background:"var(--paper)",boxShadow:"var(--sh-1)",display:"flex",flexDirection:"column"}}>
                  <div style={{height:4,background:`linear-gradient(90deg,${S},${SM})`}}/>
                  <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",gap:12}}>
                    <span className="pill deep" style={{alignSelf:"flex-start",fontSize:11,background:SL,color:S}}>Past Issue</span>
                    <h3 style={{fontSize:19,lineHeight:1.2}}>Surgical Magazine / Journal - Vol. 1</h3>
                    <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.65}}>Our inaugural youth-led publication featured case discussions, candid interviews with surgeons across specialties, and editorial perspectives on training and identity in the OR.</p>
                    <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap"}}>
                      <span className="pill" style={{cursor:"pointer"}}><I.download style={{width:13}}/> PDF (Coming soon)</span>
                      <span className="pill" style={{cursor:"pointer"}}><I.ext style={{width:13}}/> View issue</span>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <div style={{borderRadius:"var(--r-lg)",overflow:"hidden",border:"1px solid var(--line)",background:"var(--g50)",boxShadow:"var(--sh-1)",display:"flex",flexDirection:"column"}}>
                  <div style={{height:4,background:`linear-gradient(90deg,${SM},#a070d8)`}}/>
                  <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",gap:10}}>
                    <div style={{fontFamily:"var(--f-mono)",fontSize:12,color:"var(--mute)"}}>Vol. 2 · 2026</div>
                    <h3 style={{fontSize:18,lineHeight:1.2}}>Next Edition - Submissions Open</h3>
                    <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.65}}>We're accepting case write-ups, perspective pieces, and Q&A submissions for the next issue. Open to all M4Y members.</p>
                    <Link to="/join" className="btn btn-sm" style={{marginTop:8,alignSelf:"flex-start",background:S,color:"#fff",border:"none"}}>Submit a piece <I.arrow className="arr"/></Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{paddingBlock:"clamp(64px,8vw,96px)",background:SD,position:"relative",overflow:"hidden"}}>
        <svg style={{position:"absolute",right:0,top:0,opacity:.07,pointerEvents:"none"}} width="420" height="420" viewBox="0 0 420 420">
          {[70,130,190,250,310].map(r=><circle key={r} cx="420" cy="0" r={r} stroke="#fff" strokeWidth="1.2" fill="none"/>)}
        </svg>
        <div className="container" style={{position:"relative"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap"}}>
              <div style={{color:"#fff"}}>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"rgba(255,255,255,.45)"}}>Get involved</span>
                <h2 style={{fontSize:"clamp(28px,3.5vw,48px)",color:"#fff",marginTop:12}}>Join Surgery4Youth.</h2>
                <p style={{fontSize:17,color:"rgba(255,255,255,.68)",marginTop:12,maxWidth:480,lineHeight:1.65}}>
                  Members receive branch-specific mentorship, event invites, and access to the Surgery4Youth publication.
                </p>
              </div>
              <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                <Link to="/join" className="btn btn-lg" style={{background:"#fff",color:SD,fontWeight:700,border:"none"}}>Join the branch <I.arrow className="arr"/></Link>
                <Link to="/branches" className="btn btn-lg btn-ghost" style={{color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>Browse others</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function BranchPage({ slug }) {
  const b = BRANCHES.find(x => x.slug === slug);
  if (!b) return <div style={{padding:80, textAlign:"center"}}>Branch not found.</div>;

  if (b.slug === "optom")     return <OptomPage b={b}/>;
  if (b.slug === "endo")      return <EndoPathPage b={b}/>;
  if (b.slug === "neuro")     return <NeuroPsychPage b={b}/>;
  if (b.slug === "pharmacy")  return <PharmacyPage b={b}/>;
  if (b.slug === "charity")   return <CharityPage b={b}/>;
  if (b.slug === "dentistry") return <DentistryPage b={b}/>;
  if (b.slug === "rehab")     return <RehabPage b={b}/>;
  if (b.slug === "surgery")   return <SurgeryPage b={b}/>;

  const Ic = I[b.icon];

  return (
    <div data-branch={b.slug}>
      <section className="branch-hero">
        <BranchMotif motif={b.motif}/>
        <div className="container b-grid-hero" style={{position:"relative"}}>
          <div className="stack" style={{gap:22}}>
            <span className="branch-badge" style={{display:"inline-flex", alignItems:"center", gap:10}}>
              <BranchMark branch={b} size={32} circle={false} style={{borderRadius:10}} />
              {b.name} · M4Y Branch
            </span>
            <h1 style={{fontSize:"clamp(44px,5.5vw,78px)"}}>{b.name}</h1>
            <p style={{fontSize:20, color:"var(--ink2)", maxWidth:580}}>{b.tagline}</p>
            <div style={{display:"flex", gap:12, marginTop:8, flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-primary" style={{background:"color-mix(in oklab, var(--accent) 80%, var(--g900))"}}>Join this branch <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-ghost">All branches</Link>
            </div>
          </div>
          <div style={{position:"relative"}}>
            <div style={{
              aspectRatio:"1/1",
              borderRadius:"var(--r-xl)",
              background:"linear-gradient(180deg, color-mix(in oklab, var(--accent) 20%, var(--paper)), color-mix(in oklab, var(--accent) 5%, var(--paper)))",
              border:"1px solid color-mix(in oklab, var(--accent) 30%, var(--line))",
              display:"grid", placeItems:"center", color:"var(--g900)",
              padding:24,
            }}>
              {b.logo ? (
                <img src={b.logo} alt={`${b.name} logo`} style={{width:"min(92%, 320px)", height:"min(92%, 320px)", objectFit:"contain"}} />
              ) : (
                <div style={{transform:"scale(5)", opacity:.5}}><Ic/></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container b-grid-wide">
          <SectionHead eyebrow="About" title="What this branch is."/>
          <p style={{fontSize:18, color:"var(--ink2)"}}>{b.about}</p>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container b-grid-wide">
          <SectionHead eyebrow="Mission" title="Why it matters."/>
          <div>
            <p style={{fontSize:20, color:"var(--g900)", fontFamily:"var(--f-display)", fontWeight:500, lineHeight:1.4}}>{b.mission}</p>
          </div>
        </div>
      </section>

      {b.past.length > 0 && (
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Past events" title="What we've done."/>
          <div className="grid three-col-grid" style={{gap:16, marginTop:40}}>
            {b.past.map((e, i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column"}}>
                <PH label={e.t} src={e.img||null} aspect="16/10" variant={i%3===0?"dark":i%3===1?"sage":""}/>
                <div style={{padding:"24px 28px", display:"flex", flexDirection:"column", gap:10, flex:1}}>
                  {e.tag && <span className="pill sage" style={{alignSelf:"flex-start", fontSize:11}}>{e.tag}</span>}
                  <h3 style={{fontSize:18, lineHeight:1.25}}>{e.t}</h3>
                  <p style={{fontSize:14, color:"var(--ink2)", lineHeight:1.65, flex:1}}>{e.d}</p>
                  {e.stat && <div className="mono" style={{color:"var(--g700)", fontSize:12, marginTop:4}}>{e.stat}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {b.future.length > 0 && (
      <section className="section" style={{background:"var(--g50)"}}>
        <div className="container">
          <SectionHead eyebrow="Upcoming" title="What's next."/>
          <div className="grid two-col-grid" style={{gap:16, marginTop:40}}>
            {b.future.map((e, i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column"}}>
                <div style={{height:4, background:"linear-gradient(90deg,var(--g500),var(--g300))", flexShrink:0}}/>
                <div style={{padding:"28px 32px", display:"flex", flexDirection:"column", gap:12, flex:1}}>
                  <span className="pill deep" style={{alignSelf:"flex-start", fontSize:11}}>Upcoming</span>
                  <h3 style={{fontSize:20, lineHeight:1.2}}>{e.t}</h3>
                  <p style={{fontSize:14, color:"var(--ink2)", lineHeight:1.65, flex:1}}>{e.d}</p>
                  <div className="mono" style={{color:"var(--g700)", fontSize:12, marginTop:4}}>{e.when}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Surgery branch: magazine placeholder */}
      {b.slug === "surgery" && (
        <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <SectionHead eyebrow="Publications" title="Surgery4Youth Magazine." blurb="The official publication of Surgery4Youth - case discussions, surgical op-eds, and interviews with practicing surgeons."/>
            <div className="grid two-col-grid" style={{gap:20, marginTop:36}}>
              <Reveal>
                <div className="magazine-placeholder-card" style={{aspectRatio:"3/4", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:28, position:"relative", overflow:"hidden"}}>
                  <div style={{position:"absolute", top:0, right:0, width:"60%", height:"60%", background:"linear-gradient(135deg,rgba(150,80,220,.25),transparent)", borderRadius:"0 0 0 100%"}}/>
                  <div style={{position:"absolute", bottom:-20, left:-20, width:120, height:120, borderRadius:"50%", background:"rgba(150,80,220,.15)"}}/>
                  <div style={{position:"relative"}}>
                    <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(150,80,220,.8)", marginBottom:10}}>Surgery4Youth</div>
                    <h3 style={{color:"#fff", fontSize:22, lineHeight:1.2}}>The Surgical Magazine</h3>
                    <div style={{marginTop:12, fontSize:13, color:"rgba(255,255,255,.5)"}}>Issue · Coming 2026</div>
                    <div style={{marginTop:20, padding:"8px 14px", borderRadius:999, background:"rgba(150,80,220,.25)", border:"1px solid rgba(150,80,220,.4)", display:"inline-flex", alignItems:"center", gap:8, fontSize:12, color:"rgba(255,255,255,.8)", fontWeight:600}}>
                      <I.book style={{width:14}}/> Preview coming soon
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="stack" style={{gap:16}}>
                <Reveal className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column"}}>
                  <div style={{height:4, background:"linear-gradient(90deg,var(--g900),var(--g600))", flexShrink:0}}/>
                  <div style={{padding:"28px 32px", display:"flex", flexDirection:"column", gap:12, flex:1}}>
                    <span className="pill deep" style={{alignSelf:"flex-start", fontSize:11}}>Past Issue</span>
                    <h3 style={{fontSize:19, lineHeight:1.2}}>Surgical Magazine / Journal - Vol. 1</h3>
                    <p style={{color:"var(--ink2)", fontSize:14, lineHeight:1.65, flex:1}}>
                      Our inaugural youth-led publication featured case discussions, candid interviews with surgeons across specialties, and editorial perspectives on training and identity in the OR.
                    </p>
                    <div style={{display:"flex", gap:10, marginTop:8, flexWrap:"wrap"}}>
                      <span className="pill" style={{cursor:"pointer"}}><I.download style={{width:13}}/> PDF (Coming soon)</span>
                      <span className="pill" style={{cursor:"pointer"}}><I.ext style={{width:13}}/> View issue</span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={60} className="card" style={{padding:0, overflow:"hidden", background:"var(--g50)", display:"flex", flexDirection:"column"}}>
                  <div style={{height:4, background:"linear-gradient(90deg,var(--g500),var(--g300))", flexShrink:0}}/>
                  <div style={{padding:"28px 32px", display:"flex", flexDirection:"column", gap:10, flex:1}}>
                    <div className="mono" style={{color:"var(--g700)", fontSize:12}}>Vol. 2 · 2026</div>
                    <h3 style={{fontSize:18, lineHeight:1.2}}>Next Edition - Submissions Open</h3>
                    <p style={{color:"var(--ink2)", fontSize:14, marginTop:4, lineHeight:1.65, flex:1}}>We're accepting case write-ups, perspective pieces, and Q&A submissions for the next issue. Open to all M4Y members.</p>
                    <Link to="/join" className="btn btn-primary btn-sm" style={{marginTop:8, alignSelf:"flex-start"}}>Submit a piece <I.arrow className="arr"/></Link>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="card branch-cta-grid" style={{
            padding:"clamp(36px,5vw,64px)",
            background:"linear-gradient(135deg, color-mix(in oklab, var(--accent) 25%, var(--paper)), var(--paper))",
            border:"1px solid color-mix(in oklab, var(--accent) 30%, var(--line))",
          }}>
            <div>
              <span className="eyebrow">Get involved</span>
              <h2 style={{marginTop:12}}>Join {b.name}.</h2>
              <p style={{fontSize:17, color:"var(--ink2)", marginTop:14, maxWidth:500}}>
                Members receive branch-specific mentorship, event invites, and research opportunities.
              </p>
            </div>
            <div style={{display:"flex", gap:12, justifyContent:"flex-end", flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg btn-primary">Join the Branch <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-lg btn-ghost">Browse others</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { BranchPage });
