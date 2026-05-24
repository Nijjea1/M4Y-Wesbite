/* Branch template, parameterized by slug */

function BranchMotif({ motif }) {
  // decorative bg pattern per branch
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

function BranchPage({ slug }) {
  const b = BRANCHES.find(x => x.slug === slug);
  if (!b) return <div style={{padding:80, textAlign:"center"}}>Branch not found.</div>;
  const Ic = I[b.icon];

  return (
    <div data-branch={b.slug}>
      <section className="branch-hero">
        <BranchMotif motif={b.motif}/>
        <div className="container" style={{position:"relative", display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:60, alignItems:"center"}}>
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
              background:"linear-gradient(180deg, color-mix(in oklab, var(--accent) 20%, #fff), color-mix(in oklab, var(--accent) 5%, #fff))",
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
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:60}}>
          <SectionHead eyebrow="About" title="What this branch is."/>
          <p style={{fontSize:18, color:"var(--ink2)"}}>{b.about}</p>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:60}}>
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
          <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40}}>
            {b.past.map((e, i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:0, overflow:"hidden"}}>
                <PH label={e.t} aspect="16/10" variant={i%3===0?"dark":i%3===1?"sage":""}/>
                <div style={{padding:24}}>
                  <h3 style={{fontSize:18}}>{e.t}</h3>
                  <p style={{fontSize:14, color:"var(--ink2)", marginTop:10}}>{e.d}</p>
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
          <div className="grid" style={{gridTemplateColumns:"repeat(2,1fr)", gap:16, marginTop:40}}>
            {b.future.map((e, i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:32, display:"grid", gridTemplateColumns:"1fr auto", gap:20, alignItems:"center"}}>
                <div>
                  <span className="pill deep">Upcoming</span>
                  <h3 style={{fontSize:22, marginTop:12}}>{e.t}</h3>
                  <p style={{fontSize:14, color:"var(--ink2)", marginTop:8}}>{e.d}</p>
                  <div className="mono" style={{color:"var(--g800)", marginTop:14}}>{e.when}</div>
                </div>
                <I.arrow/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Optometry branch: newsletter download */}
      {b.slug === "optom" && (
        <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <SectionHead eyebrow="Publications" title="Branch newsletter & resources."/>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:16, marginTop:36}}>
              <Reveal className="publication-download-card">
                <div className="pub-icon-box">
                  <I.book/>
                </div>
                <div style={{flex:1}}>
                  <div className="mono" style={{color:"var(--g800)", marginBottom:6}}>Newsletter · Issue 01</div>
                  <h3 style={{fontSize:20}}>Optometry4Youth Newsletter</h3>
                  <p style={{color:"var(--ink2)", fontSize:14, marginTop:8, lineHeight:1.55}}>
                    Our branch newsletter covers vision science highlights, pre-optometry guidance, OAT resources, and career spotlights from practicing optometrists.
                  </p>
                  <div style={{display:"flex", gap:10, marginTop:16, flexWrap:"wrap"}}>
                    <a href="./assets/publications/optom-newsletter-01.pdf" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <I.download/> Download PDF
                    </a>
                    <a href="./assets/publications/optom-newsletter-01.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                      <I.ext/> View Online
                    </a>
                  </div>
                  <div style={{fontSize:11, color:"var(--mute)", marginTop:10, fontFamily:"var(--f-mono)", letterSpacing:".04em", textTransform:"uppercase"}}>
                    Published by Optometry4Youth · 2025
                  </div>
                </div>
              </Reveal>
              <Reveal delay={60} className="card" style={{padding:28, background:"var(--g50)", display:"flex", flexDirection:"column", gap:12}}>
                <div className="mono" style={{color:"var(--g800)"}}>Clinical Cases Library</div>
                <h3 style={{fontSize:20}}>Ongoing Resource</h3>
                <p style={{color:"var(--ink2)", fontSize:14, lineHeight:1.55}}>
                  A curated library of optometry cases written for pre-optometry students. Each case includes a chief complaint, clinical findings, and teaching commentary.
                </p>
                <span className="pill deep" style={{width:"fit-content"}}>Ongoing · 2025</span>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Surgery branch: magazine placeholder */}
      {b.slug === "surgery" && (
        <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
          <div className="container">
            <SectionHead eyebrow="Publications" title="Surgery4Youth Magazine." blurb="The official publication of Surgery4Youth — case discussions, surgical op-eds, and interviews with practicing surgeons."/>
            <div className="grid" style={{gridTemplateColumns:"1fr 1.4fr", gap:20, marginTop:36}}>
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
                <Reveal className="card" style={{padding:28}}>
                  <span className="pill deep">Past Issue</span>
                  <h3 style={{fontSize:19, marginTop:12}}>Surgical Magazine / Journal — Vol. 1</h3>
                  <p style={{color:"var(--ink2)", fontSize:14, marginTop:8, lineHeight:1.55}}>
                    Our inaugural youth-led publication featured case discussions, candid interviews with surgeons across specialties, and editorial perspectives on training and identity in the OR.
                  </p>
                  <div style={{display:"flex", gap:10, marginTop:16, flexWrap:"wrap"}}>
                    <span className="pill" style={{cursor:"pointer"}}><I.download style={{width:13}}/> PDF (Coming soon)</span>
                    <span className="pill" style={{cursor:"pointer"}}><I.ext style={{width:13}}/> View issue</span>
                  </div>
                </Reveal>
                <Reveal delay={60} className="card" style={{padding:28, background:"var(--g50)"}}>
                  <div className="mono" style={{color:"var(--g800)", marginBottom:8}}>Vol. 2 · 2026</div>
                  <h3 style={{fontSize:18}}>Next Edition — Submissions Open</h3>
                  <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>We're accepting case write-ups, perspective pieces, and Q&A submissions for the next issue. Open to all M4Y members.</p>
                  <Link to="/join" className="btn btn-primary btn-sm" style={{marginTop:14, alignSelf:"flex-start"}}>Submit a piece <I.arrow className="arr"/></Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="card" style={{
            padding:"clamp(36px,5vw,64px)",
            background:"linear-gradient(135deg, color-mix(in oklab, var(--accent) 25%, #fff), #fff)",
            border:"1px solid color-mix(in oklab, var(--accent) 30%, var(--line))",
            display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:40, alignItems:"center"
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
