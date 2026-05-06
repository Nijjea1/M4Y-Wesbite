/* Homepage */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg"/>
      <div className="hero-grid"/>
      <div className="container hero-in">
        <div style={{display:"grid", gridTemplateColumns:"1.25fr 1fr", gap:56, alignItems:"center"}}>
          <div className="stack" style={{gap:24}}>
            <img className="hero-brand-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={64} height={64} decoding="async" />
            <span className="eyebrow">CRA-registered Canadian charity</span>
            <h1>
              Empowering the next generation of{" "}
              <span style={{fontStyle:"italic", fontWeight:500, color:"var(--g600)"}}>healthcare</span> leaders.
            </h1>
            <p style={{fontSize:18, color:"var(--ink2)", maxWidth:640}}>
              Medicine4Youth is a student-led nonprofit connecting aspiring medical, research and
              allied-health students with mentorship, education and a global community of chapters
              and branches.
            </p>
            <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg btn-primary" style={{padding:"16px 28px"}}>Become a Member <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-lg btn-ghost" style={{padding:"16px 24px"}}>Explore Branches</Link>
            </div>
            <div style={{display:"flex", gap:34, marginTop:8, flexWrap:"wrap", color:"var(--mute)", fontSize:12.5}}>
              <span>Registered with the Canada Revenue Agency</span>
              <span>University chapters across Canada</span>
            </div>
          </div>
          <div style={{position:"relative", minHeight:460}}>
            <div style={{
              position:"absolute",
              right:0,
              top:20,
              width:"92%",
              height:"78%",
              borderRadius:24,
              background:"linear-gradient(180deg, #e7f4d8, #dff0cd)",
              border:"1px solid #d4e8bf"
            }}/>
            <div style={{position:"absolute", inset:0}}>
              <PH label="Student conducting mentored laboratory research" src={SITE_PHOTOS.heroMain} aspect="4/5" style={{
                position:"absolute",
                right:22,
                top:0,
                width:"66%",
                borderRadius:22,
                boxShadow:"var(--sh-2)"
              }}/>
              <PH label="Chapter members hosting a campus bake sale fundraiser" src={SITE_PHOTOS.heroCommunity} aspect="4/3" style={{
                position:"absolute",
                left:0,
                bottom:42,
                width:"48%",
                borderRadius:18,
                boxShadow:"var(--sh-2)"
              }}/>
              <PH label="Medicine4Youth leaders collaborating at a campus workspace" src={SITE_PHOTOS.heroLeaders} aspect="4/5" style={{
                position:"absolute",
                right:34,
                bottom:0,
                width:"34%",
                borderRadius:18,
                boxShadow:"var(--sh-2)"
              }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  const stats = [
    { n: 23, s: "", l: "University chapters", sub: "Across Canada" },
    { n: 10, s: "", l: "Specialty branches", sub: "Neuro · Psych · Dent · Pharm · BioEng · Optom · Charity · Endopath · Rehab · Surg" },
    { n: 60, s: "+", l: "SRP scholars", sub: "Over summer cohorts" },
    { n: 40, s: "+", l: "Events hosted", sub: "Panels, workshops, competitions" },
  ];
  return (
    <section className="section" style={{paddingTop:60, paddingBottom:60}}>
      <div className="container">
        <div className="grid" style={{gridTemplateColumns:"repeat(4, 1fr)", gap:1, background:"var(--line)", borderRadius:"var(--r-lg)", overflow:"hidden", border:"1px solid var(--line)"}}>
          {stats.map((st, i) => (
            <Reveal key={i} delay={i*80} className="stack" style={{padding:"36px 28px", background:"var(--paper)", gap:8}}>
              <div style={{fontFamily:"var(--f-display)", fontSize:"clamp(40px,5vw,64px)", fontWeight:900, letterSpacing:"-0.03em", color:"var(--g900)", lineHeight:1}}>
                <Counter to={st.n}/>{st.s}
              </div>
              <div style={{fontWeight:700, fontSize:15, color:"var(--g900)"}}>{st.l}</div>
              <div style={{color:"var(--mute)", fontSize:13}}>{st.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const items = [
    { i:"spark", t:"Mentorship", d:"1-to-1 and cohort-based mentorship pairing students with clinicians and senior mentees." },
    { i:"flask", t:"Research", d:"Our Summer Research Program (SRP) places students in mentored research with real deliverables." },
    { i:"pin", t:"Chapters", d:"Local secondary and post-secondary chapters run events in their community." },
    { i:"cal", t:"Programs and events", d:"Panels, competitions, the Healthcare Bowl, and Healthcare Horizons, all listed on the Programs page." },
  ];
  return (
    <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:60, alignItems:"start"}}>
          <SectionHead eyebrow="What we do" title="Four pillars, one ecosystem." blurb="We build the scaffolding students need to turn curiosity into a career in medicine, end to end."/>
          <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:16}}>
            {items.map((it, i) => {
              const Ic = I[it.i];
              return (
                <Reveal key={i} delay={i*60} className="card" style={{padding:26}}>
                  <div style={{width:44,height:44,borderRadius:12, background:"var(--g100)", display:"grid", placeItems:"center", color:"var(--g800)", marginBottom:18}}><Ic/></div>
                  <h3 style={{fontSize:20, marginBottom:8}}>{it.t}</h3>
                  <p style={{color:"var(--ink2)", fontSize:14.5}}>{it.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Opportunities() {
  const cards = [
    { t:"Become a Member", d:"Join as a general member via our quick form. Get newsletters, event invites, and early access to programs.", cta:"Join via Form", to:"/join", tag:"Google Form" },
    { t:"Apply to SRP", d:"Our 12-week Summer Research Program places students in mentored research with a final symposium.", cta:"See SRP", to:"/srp", tag:"Flagship" },
    { t:"Start a Chapter", d:"Lead M4Y at your school or campus. We provide the playbook, brand kit, and launch support.", cta:"Chapter Interest", to:"/chapters", tag:"Leadership" },
    { t:"Team Applications", d:"Join the national team: operations, design, research, outreach, branch leads, and more.", cta:"Open Roles", to:"/join", tag:"Core Team" },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Opportunities" title="A Linktree of real paths in." blurb="Everything a student could join, pitch, or apply for in one professional hub."/>
        <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:16, marginTop:36}}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i*70} className="card" style={{padding:32, display:"flex", flexDirection:"column", gap:14}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span className="pill sage">{c.tag}</span>
                <span className="mono" style={{color:"var(--mute)"}}>0{i+1}</span>
              </div>
              <h3 style={{fontSize:24}}>{c.t}</h3>
              <p style={{color:"var(--ink2)", fontSize:15}}>{c.d}</p>
              <Link to={c.to} className="link-underline" style={{marginTop:"auto", display:"inline-flex", gap:8, alignItems:"center", color:"var(--g800)"}}>
                {c.cta} <I.arrow/>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BranchesShowcase() {
  const loopedBranches = [...BRANCHES, ...BRANCHES];
  return (
    <section className="section" style={{background:"var(--g50)"}}>
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap:32, flexWrap:"wrap"}}>
          <SectionHead eyebrow="Specialty branches" title="Ten branches. One connected organization." blurb="Each branch runs its own events, mentorship, and research threads under one scalable brand system."/>
          <Link to="/branches" className="btn btn-ghost">All branches <I.arrow className="arr"/></Link>
        </div>
        <div className="branch-carousel" style={{marginTop:40}}>
          <div className="branch-carousel-track">
            {loopedBranches.map((b, i) => {
              return (
                <Reveal key={`${b.slug}-${i}`} delay={Math.min(i, BRANCHES.length - 1) * 55} className="branch-carousel-item">
                  <Link to={"/branches/"+b.slug} className="card branch-card" data-branch={b.slug} style={{display:"block", padding:"32px 30px", height:"100%", minHeight:250}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                      <BranchMark branch={b} size={56} />
                      <I.arrow />
                    </div>
                    <h3 style={{marginTop:24, fontSize:30, lineHeight:1.05}}>{b.name}</h3>
                    <p style={{color:"var(--ink2)", fontSize:15, marginTop:10, maxWidth:340}}>{b.tagline}</p>
                    <div style={{marginTop:22, height:1, background:"var(--line)"}}/>
                    <div style={{marginTop:15, display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--mute)"}}>
                      <span>{b.past.length} past events</span>
                      <span>{b.future.length} upcoming</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
        {/* Mobile fallback grid for easier touch interaction */}
        <div className="branch-carousel-mobile" style={{marginTop:28}}>
          <div className="grid" style={{gridTemplateColumns:"1fr", gap:16}}>
            {BRANCHES.map((b, i) => {
            return (
              <Reveal key={b.slug} delay={i*55}>
                <Link to={"/branches/"+b.slug} className="card" data-branch={b.slug} style={{display:"block", padding:28}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <BranchMark branch={b} size={52} />
                    <I.arrow />
                  </div>
                  <h3 style={{marginTop:22, fontSize:22}}>{b.name}</h3>
                  <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>{b.tagline}</p>
                  <div style={{marginTop:20, height:1, background:"var(--line)"}}/>
                  <div style={{marginTop:14, display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--mute)"}}>
                    <span>{b.past.length} past events</span>
                    <span>{b.future.length} upcoming</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsPreview() {
  return (
    <section className="section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap:32, flexWrap:"wrap"}}>
          <SectionHead eyebrow="Flagship programs" title="What's on the calendar." />
          <Link to="/programs" className="btn btn-ghost">View programs and events <I.arrow className="arr"/></Link>
        </div>
        <div className="grid" style={{gridTemplateColumns:"1.3fr 1fr 1fr", gap:16, marginTop:36}}>
          {EVENTS.slice(0,3).map((e, i) => (
            <Reveal key={i} delay={i*70} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column"}}>
              <PH label={e.t} src={e.photo} aspect={i===0?"16/11":"16/9"} variant={i===0?"dark":i===1?"sage":""}/>
              <div style={{padding:24, display:"flex", flexDirection:"column", gap:10, flex:1}}>
                <div style={{display:"flex", gap:8, alignItems:"center"}}>
                  <span className={"pill "+(e.tag==="Coming Soon"?"deep":"sage")}>{e.tag}</span>
                  <span className="mono" style={{color:"var(--mute)"}}>{e.date}</span>
                </div>
                <h3 style={{fontSize:20, marginTop:4}}>{e.t}</h3>
                <p style={{fontSize:14, color:"var(--ink2)"}}>{e.blurb}</p>
                <div style={{marginTop:"auto", display:"flex", gap:12, fontSize:12, color:"var(--mute)"}}>
                  <I.pin/> {e.loc}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SRPSpotlight() {
  return (
    <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:60, alignItems:"center"}}>
          <div>
            <div style={{position:"relative"}}>
              <PH label="Summer Research Program scholars and lab work" src={SITE_PHOTOS.srpSpotlight} aspect="4/5" variant="dark"/>
              <div className="card" style={{position:"absolute", right:-20, top:-20, padding:"14px 18px"}}>
                <div className="mono" style={{color:"var(--mute)"}}>Cohort '25</div>
                <div style={{fontFamily:"var(--f-display)", fontSize:28, fontWeight:900, color:"var(--g900)", lineHeight:1, marginTop:4}}>62 <span style={{fontSize:14, fontWeight:700, color:"var(--ink2)"}}>scholars</span></div>
              </div>
              <div className="card" style={{position:"absolute", left:-24, bottom:40, padding:"14px 18px", display:"flex", gap:10, alignItems:"center"}}>
                <I.flask/>
                <div>
                  <div style={{fontSize:12, color:"var(--mute)"}}>Output</div>
                  <div style={{fontWeight:800, color:"var(--g900)", fontSize:14}}>40+ student posters</div>
                </div>
              </div>
            </div>
          </div>
          <div className="stack" style={{gap:22}}>
            <span className="eyebrow">SRP · Flagship research</span>
            <h2>Summer Research Program</h2>
            <p style={{fontSize:17, color:"var(--ink2)"}}>
              Our flagship program places students in mentored research with clinicians and PIs across Canada, culminating in a symposium, a peer-reviewed M4Y publication, and a portfolio that actually opens doors.
            </p>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:14, marginTop:10}}>
              {[
                ["12 weeks", "Structured curriculum"],
                ["60+", "Students placed"],
                ["1:1", "Mentor pairings"],
                ["Symposium", "Closing showcase"],
              ].map(([a,b], i) => (
                <div key={i} style={{padding:"16px 18px", border:"1px solid var(--line)", borderRadius:14, background:"var(--cream)"}}>
                  <div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:22, color:"var(--g900)"}}>{a}</div>
                  <div style={{color:"var(--mute)", fontSize:13}}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{display:"flex", gap:10, marginTop:8}}>
              <Link to="/srp" className="btn btn-primary">Learn about SRP <I.arrow className="arr"/></Link>
              <Link to="/srp" className="btn btn-ghost">See past papers</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SponsorsTicker() {
  return (
    <section className="section" style={{paddingTop:60, paddingBottom:60}}>
      <div className="container">
        <div style={{textAlign:"center", marginBottom:28}}>
          <span className="eyebrow" style={{justifyContent:"center"}}>Partner ecosystem</span>
          <h3 style={{marginTop:10, fontSize:22, color:"var(--ink2)", fontWeight:500, fontFamily:"var(--f-body)", letterSpacing:0}}>
            Backed by leading prep, admissions, and community organizations.
          </h3>
        </div>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <span key={i} style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:24, color:"var(--g900)", opacity:.55, letterSpacing:"-0.02em"}}>
              {s.name}<span style={{color:"var(--g500)", margin:"0 0 0 48px"}}>·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container" style={{textAlign:"center", marginTop:28}}>
        <Link to="/sponsors" className="link-underline" style={{color:"var(--g800)", fontSize:14}}>See all partners & member discounts →</Link>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q:"M4Y turned a summer of 'what do I even do' into my first real research poster and a mentor I still text.", n:"Amara O.", r:"Grade 12 · Toronto" },
    { q:"Starting a chapter was way less scary than I thought. The playbook is tight and the central team actually shows up.", n:"Devon R.", r:"Chapter Lead · UBC" },
    { q:"I was deciding between pre-med and engineering. Neuroscience4Youth is the reason I'm doing both.", n:"Lena K.", r:"1st year · McGill" },
  ];
  return (
    <section className="section" style={{background:"var(--g100)"}}>
      <div className="container">
        <SectionHead eyebrow="Community proof" title="What students actually say." align="center"/>
        <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40}}>
          {quotes.map((t, i) => (
            <Reveal key={i} delay={i*80} className="card" style={{padding:30, display:"flex", flexDirection:"column", gap:18}}>
              <div style={{fontFamily:"var(--f-display)", fontSize:56, lineHeight:0.6, color:"var(--g500)"}}>“</div>
              <p style={{fontSize:16.5, color:"var(--ink)", lineHeight:1.5}}>{t.q}</p>
              <div style={{display:"flex", gap:12, alignItems:"center", marginTop:"auto"}}>
                <div style={{width:38, height:38, borderRadius:"50%", background:"var(--g300)"}}/>
                <div>
                  <div style={{fontWeight:800, fontSize:14, color:"var(--g900)"}}>{t.n}</div>
                  <div style={{fontSize:12, color:"var(--mute)"}}>{t.r}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero/>
      <ImpactStats/>
      <section className="section" style={{ background:"var(--paper)", borderBlock:"1px solid var(--line)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Explore"
            title="A focused site map, not an endless feed."
            blurb="Each area has its own dedicated page so visitors can quickly find what matters."
          />
          <div className="grid" style={{ gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:32 }}>
            {[
              { t:"About M4Y", d:"Mission, story, leadership, and values.", to:"/about" },
              { t:"Programs", d:"SRP, mentorship, Healthcare Bowl, Healthcare Horizons, chapters, and the Philippines tutoring project with Solander PH.", to:"/programs" },
              { t:"Branches", d:"Ten specialty sub-organizations with distinct tracks.", to:"/branches" },
              { t:"Contact & Join", d:"Membership, applications, and partnerships.", to:"/contact" },
            ].map((card, i) => (
              <Reveal key={card.t + String(i)} delay={i*55} className="card" style={{ padding:26, display:"flex", flexDirection:"column", gap:10 }}>
                <h3 style={{ fontSize:22 }}>{card.t}</h3>
                <p style={{ color:"var(--ink2)", fontSize:14.5 }}>{card.d}</p>
                <Link to={card.to} className="link-underline" style={{ marginTop:"auto", color:"var(--g800)", display:"inline-flex", gap:8, alignItems:"center" }}>
                  Open page <I.arrow/>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WhatWeDo/>
      <BranchesShowcase/>
      <EventsPreview/>
      <SRPSpotlight/>
      <CTABand/>
    </>
  );
}

Object.assign(window, { HomePage });
