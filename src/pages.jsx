/* Main pages */

/* ============================================================
   ABOUT PAGE
   ============================================================ */
function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Medicine4Youth"
        title="Student-led. Clinician-mentored. Built to last."
        blurb="We are a registered not-for-profit organization with the Canada Revenue Agency (CRA). Medicine4Youth is not a U.S. 501(c) organization - we operate as a Canadian not-for-profit serving students here and abroad."
        rightSlot={
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <PH label="Medicine4Youth leadership" src={SITE_PHOTOS.aboutTeam} aspect="3/4" variant="sage"/>
            <PH label="Students in a Medicine4Youth workshop" src={SITE_PHOTOS.aboutPrograms} aspect="3/4" variant="dark" style={{marginTop:40}}/>
          </div>
        }
      />

      <section className="section">
        <div className="about-story-grid container">
          <SectionHead eyebrow="Our story" title="Why Medicine4Youth exists."/>
          <div className="stack" style={{gap:20, fontSize:17, color:"var(--ink2)"}}>
            <p>
              Medicine4Youth started from a simple observation: the path into medicine is opaque, and that opacity isn't evenly distributed. Students at under-resourced schools, in smaller cities, or without family connections to healthcare often have no map. We built one.
            </p>
            <p>
              We are a CRA-registered Canadian not-for-profit. Our work happens through student-led research projects, mentorship with clinicians and residents, workshops at high school and university chapters, and international partnerships that extend our reach beyond Canada. The goal is consistent: give every student who wants to pursue healthcare a real foothold - not just inspiration, but structure.
            </p>
            <p>
              Medicine4Youth also supports ten specialty branches, each focused on a distinct healthcare field. Alongside the chapter network and our flagship programs, we run the Philippines tutoring project through a partnership with Solander PH, supporting children in local care organizations with academic mentorship.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="Meet the presidents" title="The people behind the program."/>
          <div className="presidents-grid" style={{marginTop:40}}>
            {[
              {
                n:"Anita Alizadeh",
                r:"Founder & President",
                photo:"./assets/headshots/anita.png",
                b:"Anita is an Honours Psychology, Neuroscience & Behaviour student at McMaster University. Her research interests focus on psychedelics and neuropharmacology within psychology and neuroscience. As Founder and President, Anita oversees the organization's growth, leads outreach efforts, and builds the community connections that keep M4Y moving."
              },
              {
                n:"Ibrahim Khan",
                r:"President",
                photo:"./assets/headshots/ibrahim.png",
                b:"Ibrahim is an Honours Health Sciences student at the University of Ottawa. His research interests span disability, assistive technology, and rehabilitation sciences, with a focus on mental health. As President, Ibrahim leads initiatives that close gaps in health education - making opportunities accessible and community-grounded.",
                li:"https://www.linkedin.com/in/ibrahim-khan-05ik4308/"
              },
            ].map((p,i) => (
              <Reveal key={i} delay={i*80} className="card president-card-inner" style={{padding:0}}>
                <div style={{position:"relative", minHeight:300, background:"var(--g100)"}}>
                  <img src={p.photo} alt={`Portrait of ${p.n}`} loading="lazy" decoding="async" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top"}} />
                  <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(31,58,48,.18), transparent 50%)"}}/>
                </div>
                <div style={{padding:"28px 32px", display:"flex", flexDirection:"column", gap:12}}>
                  <span className="pill sage" style={{alignSelf:"flex-start", fontSize:11}}>{p.r}</span>
                  <h3 style={{fontSize:24, lineHeight:1.15}}>{p.n}</h3>
                  <p style={{color:"var(--ink2)", fontSize:14.5, lineHeight:1.72}}>{p.b}</p>
                  {p.li && (
                    <div style={{display:"flex", gap:8, marginTop:4}}>
                      <a href={p.li} target="_blank" rel="noreferrer" className="pill link-underline" style={{display:"inline-flex", gap:8, alignItems:"center"}}><I.link/> LinkedIn</a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Values" title="What we optimize for." align="center"/>
          <div className="two-col-grid" style={{marginTop:48, gap:24, alignItems:"start"}}>
            {[
              ["Credibility","Programs with real outputs - not filler."],
              ["Access","Opportunities that find students, not the other way around."],
              ["Mentorship","Every member gets a human, not a portal."],
              ["Scalability","A system that grows without breaking."],
            ].map(([a,b], i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:"36px 40px", display:"flex", flexDirection:"column", gap:14, borderLeft:"4px solid var(--g500)"}}>
                <div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:48, color:"var(--g300)", lineHeight:1}}>0{i+1}</div>
                <h3 style={{fontSize:21, marginTop:4}}>{a}</h3>
                <p style={{fontSize:15.5, color:"var(--ink2)", lineHeight:1.7}}>{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--g50)"}}>
        <div className="container">
          <SectionHead eyebrow="Frequently asked" title="Answers, briefly."/>
          <div style={{marginTop:32, maxWidth:820}}>
            <FAQ items={[
              {q:"Is Medicine4Youth a registered organization?", a:"Yes. We are registered as a Canadian not-for-profit with the Canada Revenue Agency (CRA). We are not a charity in the traditional sense and not a U.S. 501(c) nonprofit."},
              {q:"Who can join?", a:"Any high school or post-secondary student interested in medicine, healthcare, or allied health sciences."},
              {q:"Is there a cost to join?", a:"General membership is free. Some paid programs may carry a small fee; sponsor codes typically reduce external costs when available."},
              {q:"Can I start a chapter?", a:"Yes. Visit the Chapters page to submit interest - we'll send a playbook and schedule an intake call."},
              {q:"How do I apply to SRP?", a:"Applications open seasonally. See the Summer Research Program page for eligibility, timelines, and previous scholar outputs."},
            ]}/>
          </div>
        </div>
      </section>
      <CTABand/>
    </>
  );
}

/* ============================================================
   PROGRAMS PAGE (combined Events + Programs)
   ============================================================ */
function ProgramsPage() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Research", "Programs", "Events"];
  const shown = filter === "All" ? EVENTS : EVENTS.filter((e) => e.tag === filter);

  const programs = [
    { t:"Summer Research Program (SRP)", d:"Secondary and post-secondary students join mentored research aligned with their interests - critical thinking, scientific inquiry, and real deliverables. The program culminates in a closing symposium and publication pipeline.", tag:"Flagship", to:"/srp" },
    { t:"Mentorship Program", d:"1:1 mentorship pairings with clinicians, graduate students, and senior mentees, matched to your field and goals.", tag:"Community" },
    { t:"Healthcare Bowl", d:"M4Y's annual case-based competition across student teams. Fast-paced healthcare scenarios, collaborative problem-solving, and near-peer mentorship.", tag:"Programs" },
    { t:"Healthcare Horizons", d:"An interdisciplinary panel spanning medicine, dentistry, pharmacy, and optometry - education pathways, workforce themes, and candid insight. Past sessions have drawn close to 100 attendees.", tag:"Events" },
    { t:"Chapter Program", d:"University chapters with shared brand, playbook, and programming support - your local entry point into the M4Y network.", tag:"Leadership", to:"/chapters" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Programs & Events"
        title="Every M4Y program, on one page."
        blurb="From mentored research and case competitions to interdisciplinary panels and international outreach - this is the full picture of what Medicine4Youth runs, hosts, and builds."
      />

      {/* Program cards */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Core programs" title="What we run year-round."/>
          <div className="two-col-grid" style={{marginTop:48, gap:28}}>
            {programs.map((p,i) => (
              <Reveal key={p.t} delay={i*60} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", height:"100%"}}>
                {/* Accent bar */}
                <div style={{height:4, flexShrink:0, background: p.tag==="Flagship" ? "linear-gradient(90deg,var(--g900),var(--g600))" : "linear-gradient(90deg,var(--g500),var(--g300))"}}/>
                <div style={{padding:"36px 40px", display:"flex", flexDirection:"column", flex:1, position:"relative"}}>
                  {/* Watermark number */}
                  <div style={{position:"absolute", right:28, top:20, fontFamily:"var(--f-display)", fontWeight:900, fontSize:80, color:"var(--g50)", lineHeight:1, userSelect:"none", pointerEvents:"none"}}>{String(i+1).padStart(2,"0")}</div>
                  {/* Tag */}
                  <span className={"pill "+(p.tag==="Flagship"?"deep":"sage")} style={{alignSelf:"flex-start"}}>{p.tag}</span>
                  {/* Title */}
                  <h3 style={{fontSize:22, marginTop:22, lineHeight:1.2}}>{p.t}</h3>
                  {/* Description - flex:1 fills remaining height so short cards match tall ones */}
                  <p style={{color:"var(--ink2)", fontSize:15.5, lineHeight:1.75, marginTop:14, flex:1}}>{p.d}</p>
                  {/* Link */}
                  {p.to && (
                    <Link to={p.to} className="link-underline" style={{color:"var(--g800)", marginTop:28, display:"inline-flex", gap:6, alignItems:"center", fontWeight:700, fontSize:14}}>
                      Learn more <I.arrow/>
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events spotlight */}
      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="Flagship events" title="Healthcare Bowl and Healthcare Horizons."/>
          <div className="two-col-grid" style={{marginTop:36}}>
            <Reveal className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", background:"linear-gradient(135deg,var(--g50),var(--cream))"}}>
              <div style={{flexShrink:0}}>
                <PH label="Student teams collaborating at a Healthcare Bowl event" src={SITE_PHOTOS.eventsFeaturedBowl} aspect="16/9" style={{borderRadius:0}}/>
              </div>
              <div style={{padding:36, flex:1, display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <span className="pill deep">Programs</span>
                <h2 style={{marginTop:20}}>Healthcare Bowl</h2>
                <p style={{color:"var(--ink2)", fontSize:16, marginTop:14, maxWidth:420, lineHeight:1.65}}>
                  M4Y's annual case-based competition. Student teams tackle real-world healthcare scenarios under time pressure - collaborative, mentored, and genuinely competitive.
                </p>
                <div style={{display:"flex", gap:24, marginTop:28, flexWrap:"wrap"}}>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:28, color:"var(--g900)", lineHeight:1}}>40+</div><div style={{fontSize:12.5, color:"var(--mute)", marginTop:5}}>Teams</div></div>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:28, color:"var(--g900)", lineHeight:1}}>{"Mar '26"}</div><div style={{fontSize:12.5, color:"var(--mute)", marginTop:5}}>Next edition</div></div>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:28, color:"var(--g900)", lineHeight:1}}>UofT</div><div style={{fontSize:12.5, color:"var(--mute)", marginTop:5}}>Host</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div style={{
                borderRadius:"var(--r-lg)", overflow:"hidden",
                boxShadow:"0 2px 8px rgba(0,0,0,.08)",
                display:"flex", flexDirection:"column", height:"100%",
                backgroundColor:"#1f3a30",
                border:"1px solid rgba(255,255,255,.08)",
                transition:"transform .3s ease, box-shadow .3s ease",
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.22)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,.08)"}}
              >
                <div style={{flexShrink:0}}>
                  <PH label="Healthcare Horizons interdisciplinary panel" src={SITE_PHOTOS.eventsFeaturedHorizons} aspect="16/9" variant="dark" style={{borderRadius:0, opacity:.9}}/>
                </div>
                <div style={{padding:36, flex:1, display:"flex", flexDirection:"column", justifyContent:"center", gap:0}}>
                  <span style={{display:"inline-block", alignSelf:"flex-start", padding:"5px 14px", borderRadius:999, fontSize:12, fontWeight:700, letterSpacing:".04em", backgroundColor:"rgba(255,255,255,.15)", color:"#ffffff", border:"1px solid rgba(255,255,255,.2)"}}>Events</span>
                  <div style={{marginTop:18, fontFamily:"var(--f-display)", fontWeight:900, fontSize:"clamp(28px,3vw,42px)", lineHeight:1.05, color:"#ffffff", letterSpacing:"-0.02em"}}>Healthcare Horizons</div>
                  <div style={{color:"#aed4bc", fontSize:16, marginTop:14, lineHeight:1.7}}>
                    An interdisciplinary panel on medicine, dentistry, pharmacy, and optometry - education pathways, workforce themes, and candid experience from practitioners across fields.
                  </div>
                  <div style={{display:"flex", gap:24, marginTop:24, flexWrap:"wrap"}}>
                    <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:28, color:"#ffffff", lineHeight:1}}>Nov 23</div><div style={{fontSize:12.5, color:"#6a9a80", marginTop:5}}>Last session</div></div>
                    <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:28, color:"#ffffff", lineHeight:1}}>~100</div><div style={{fontSize:12.5, color:"#6a9a80", marginTop:5}}>Attendees</div></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filtered calendar */}
      <section id="flagship-events" className="section" style={{scrollMarginTop:88}}>
        <div className="container">
          <SectionHead eyebrow="Flagship calendar" title="SRP symposium, Healthcare Bowl, Healthcare Horizons." blurb="Filter by category. Specialty branches host additional programming on their own pages."/>
          <div className="tabs" style={{marginBottom:32, marginTop:24}}>
            {tags.map((t) => (
              <div key={t} className={"tab "+(filter===t?"active":"")} onClick={()=>setFilter(t)} role="button" tabIndex={0}
                onKeyDown={(ev)=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();setFilter(t);}}}>
                {t}
              </div>
            ))}
          </div>
          <div className="grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),340px))", justifyContent:"start", gap:16}}>
            {shown.map((e,i) => (
              <Reveal key={e.t+e.date} delay={i*50} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", maxWidth:340, width:"100%"}}>
                <PH label={e.t} src={e.photo} aspect="4/3" variant={i%3===0?"dark":i%3===1?"sage":""}/>
                <div style={{padding:"20px 22px", display:"flex", flexDirection:"column", gap:10, flex:1}}>
                  <span className={"pill "+(e.tag==="Coming Soon"||e.date==="Coming Soon"?"deep":"sage")}>{e.tag}</span>
                  <h3 style={{fontSize:18, lineHeight:1.25, marginTop:2}}>{e.t}</h3>
                  <p style={{fontSize:13.5, color:"var(--ink2)", lineHeight:1.6}}>{e.blurb}</p>
                  <div style={{marginTop:"auto", display:"flex", gap:14, fontSize:12.5, color:"var(--mute)", paddingTop:14, borderTop:"1px solid var(--line)", flexWrap:"wrap"}}>
                    <span style={{display:"flex", gap:6, alignItems:"center"}}><I.cal/>{e.date}</span>
                    <span style={{display:"flex", gap:6, alignItems:"center"}}><I.pin/>{e.loc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philippines Tutoring - dedicated section */}
      <PhilippinesSection/>

      {/* Partners */}
      {HEALTHCARE_HORIZONS_SPONSOR_LOGOS.length > 0 && (
        <section className="section" style={{paddingTop:0}}>
          <div className="container">
            <div className="divider" style={{marginBottom:28}}/>
            <span className="eyebrow">Partners</span>
            <p style={{color:"var(--ink2)", fontSize:15, marginTop:12, maxWidth:720}}>Organizations that support Healthcare Horizons and other flagship Medicine4Youth events.</p>
            <div className="grid" style={{gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,132px),168px))", justifyContent:"start", gap:14, marginTop:24}}>
              {HEALTHCARE_HORIZONS_SPONSOR_LOGOS.map((logo)=>(
                <div key={logo.src} className="card" style={{padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"center", minHeight:76, background:"var(--paper)"}}>
                  <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" style={{maxHeight:44, maxWidth:"100%", width:"auto", objectFit:"contain"}}/>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Summary CTA */}
      <CTABand title="Find your program." sub="Whether you're joining SRP, starting a chapter, or attending Healthcare Bowl - your path starts here."/>
    </>
  );
}

function PhilippinesSection() {
  return (
    <section className="section philippines-section">
      <div className="container" style={{position:"relative", zIndex:1}}>
        <div className="chapters-start-grid" style={{gap:56}}>
          <div className="stack" style={{gap:22}}>
            <div style={{display:"inline-flex", alignItems:"center", gap:10, padding:"8px 14px", borderRadius:999, background:"rgba(135,183,131,.18)", border:"1px solid rgba(135,183,131,.3)", width:"fit-content"}}>
              <I.globe style={{color:"#a8dba0"}}/>
              <span style={{fontFamily:"var(--f-mono)", fontSize:10.5, letterSpacing:".12em", textTransform:"uppercase", color:"#a8dba0"}}>International Program</span>
            </div>
            <h2 style={{color:"#fff", fontSize:"clamp(28px,3.5vw,48px)"}}>Philippines Tutoring Project</h2>
            <p style={{fontSize:18, color:"rgba(255,255,255,.72)", lineHeight:1.62}}>
              In partnership with <strong style={{color:"rgba(255,255,255,.92)"}}>Solander PH</strong>, a local non-profit, Medicine4Youth volunteers provide academic support and mentorship to children in care organizations and orphanages across the Philippines.
            </p>
            <p style={{fontSize:16, color:"rgba(255,255,255,.58)", lineHeight:1.6}}>
              Sessions span core subjects and study skills - delivered by trained M4Y volunteers who connect with students remotely. The program reflects our belief that mentorship isn't bound by borders.
            </p>
            <div style={{display:"flex", gap:12, flexWrap:"wrap", marginTop:8}}>
              <Link to="/join" className="btn btn-primary" style={{background:"rgba(255,255,255,.12)", borderColor:"rgba(255,255,255,.25)", color:"#fff"}}>Get Involved <I.arrow className="arr"/></Link>
              <Link to="/programs" className="btn btn-ghost" style={{borderColor:"rgba(255,255,255,.2)", color:"rgba(255,255,255,.7)"}}>All Programs</Link>
            </div>
          </div>
          <div className="stack" style={{gap:16}}>
            <div className="grid two-col-grid-sm" style={{gap:14}}>
              {[
                ["Partner","Solander PH - a Philippines-based not-for-profit"],
                ["Scope","Children in care organizations and orphanages"],
                ["Format","Remote tutoring and mentorship sessions"],
                ["Focus","Academic support, study skills, and encouragement"],
              ].map(([label,val], i) => (
                <div key={i} className="philippines-stat-box">
                  <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(135,183,131,.7)", marginBottom:8}}>{label}</div>
                  <div style={{fontSize:14, color:"rgba(255,255,255,.82)", lineHeight:1.4, fontWeight:600}}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{padding:"22px 24px", borderRadius:"var(--r-lg)", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)"}}>
              <div style={{fontFamily:"var(--f-display)", fontSize:56, lineHeight:.65, color:"rgba(135,183,131,.4)", marginBottom:16}}>"</div>
              <p style={{fontSize:15, color:"rgba(255,255,255,.7)", lineHeight:1.55, fontStyle:"italic"}}>
                Mentorship should reach the students who need it most - not just those who already have access.
              </p>
              <div style={{marginTop:14, fontSize:12, color:"rgba(255,255,255,.38)", fontFamily:"var(--f-mono)", letterSpacing:".06em", textTransform:"uppercase"}}>Medicine4Youth - Program Mandate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BRANCHES PAGE
   ============================================================ */
function BranchesPage() {
  return (
    <>
      <PageHero eyebrow="Specialty branches" title="Nine sub-organizations. One scalable brand." blurb="Each branch operates independently with its own mentorship threads, events, and research output - connected through shared infrastructure and a common mission."/>
      <section className="section">
        <div className="three-col-grid container">
          {BRANCHES.map((b, i) => (
            <Reveal key={b.slug} delay={i*50}>
              {(() => {
                const inner = (
                  <>
                    <div style={{
                      padding:"32px 28px 26px",
                      background:b.panelBg||"var(--g800)",
                      position:"relative", overflow:"hidden",
                    }}>
                      <div style={{position:"absolute",right:-20,top:-20,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.07)",pointerEvents:"none"}}/>
                      <div style={{position:"absolute",right:10,bottom:-38,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,.05)",pointerEvents:"none"}}/>
                      <div style={{position:"relative"}}>
                        <BranchMark branch={b} size={52} circle style={{boxShadow:"0 4px 16px rgba(0,0,0,.28)"}}/>
                        <div className="mono" style={{color:"rgba(255,255,255,.55)",marginTop:18,fontSize:9.5,letterSpacing:".12em"}}>M4Y Branch</div>
                        <h3 style={{fontSize:21,marginTop:6,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,.25)",lineHeight:1.15}}>{b.name}</h3>
                      </div>
                    </div>
                    <div style={{padding:"22px 28px",flex:1,display:"flex",flexDirection:"column",gap:12}}>
                      <p style={{color:"var(--ink2)",fontSize:14,lineHeight:1.68}}>{b.tagline}</p>
                      <div style={{marginTop:"auto",display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,borderTop:"1px solid var(--line)"}}>
                        <span style={{fontSize:11.5,color:"var(--mute)"}}>{b.past.length} past · {b.future.length} upcoming</span>
                        <div style={{display:"flex",alignItems:"center",gap:4,fontSize:13,fontWeight:700,color:"var(--g800)"}}>Explore <I.arrow style={{width:15,height:15}}/></div>
                      </div>
                    </div>
                  </>
                );
                const cls = "card";
                const sty = {display:"flex", flexDirection:"column", padding:0, overflow:"hidden"};
                return b.externalUrl
                  ? <a key={b.slug} href={b.externalUrl} target="_blank" rel="noreferrer" className={cls} data-branch={b.slug} style={sty}>{inner}</a>
                  : <Link key={b.slug} to={"/branches/"+b.slug} className={cls} data-branch={b.slug} style={sty}>{inner}</Link>;
              })()}
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand/>
    </>
  );
}

/* ============================================================
   SRP PAGE
   ============================================================ */
function PaperBooklet() {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(false);

  function goTo(next) {
    if (next < 0 || next >= PAPERS.length || turning) return;
    setTurning(true);
    setTimeout(() => { setPage(next); setTurning(false); }, 560);
  }

  const p = PAPERS[page];

  return (
    <div className="booklet-shell">
      <div className="booklet-wrapper">
        {/* Left page - table of contents */}
        <div className="booklet-left">
          <div>
            <span className="eyebrow" style={{fontSize:9.5}}>SRP Publication Archive</span>
            <h3 style={{marginTop:10, fontSize:18}}>Past Papers</h3>
            <p style={{color:"var(--ink2)", fontSize:13, marginTop:8, lineHeight:1.55}}>Student research outputs from Summer Research Program cohorts. Each paper went through M4Y's internal review pipeline.</p>
          </div>
          <div className="stack" style={{gap:8, marginTop:4}}>
            {PAPERS.map((pa, i) => (
              <button key={i} type="button" onClick={()=>goTo(i)}
                style={{
                  textAlign:"left", padding:"10px 14px", borderRadius:10,
                  border:`1px solid ${i===page?"var(--g500)":"var(--line)"}`,
                  background:i===page?"var(--g50)":"transparent",
                  cursor:"pointer", transition:"all .2s",
                }}>
                <div style={{fontFamily:"var(--f-mono)", fontSize:9.5, color:"var(--mute)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:4}}>
                  #{String(i+1).padStart(3,"0")} · {pa.type}
                </div>
                <div style={{fontSize:12.5, fontWeight:700, color:"var(--g900)", lineHeight:1.35}}>{pa.t}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right page - paper detail */}
        <div className={"booklet-right"+(turning?" page-turn-anim":"")}>
          <div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
              <span className="pill sage">{p.type}</span>
              <span className="mono" style={{color:"var(--mute)"}}>#{String(page+1).padStart(3,"0")}</span>
            </div>
            <h3 style={{fontSize:20, lineHeight:1.25, color:"var(--g900)", marginTop:12}}>{p.t}</h3>
            <div style={{fontSize:13, color:"var(--mute)", marginTop:10, fontStyle:"italic"}}>{p.auth}</div>
          </div>

          <div style={{flex:1, display:"flex", flexDirection:"column", gap:14}}>
            <div style={{padding:18, borderRadius:12, background:"var(--g50)", border:"1px solid var(--line)"}}>
              <div className="mono" style={{color:"var(--g800)", marginBottom:8}}>Abstract</div>
              <p style={{fontSize:13.5, color:"var(--ink2)", lineHeight:1.65}}>
                This paper represents student-led research conducted under the M4Y Summer Research Program. Scholars worked with clinician and faculty mentors over 12 weeks to design, execute, and present their inquiry at the closing symposium.
              </p>
            </div>
            <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
              <span className="pill" style={{cursor:"pointer"}}><I.download style={{width:13}}/> PDF</span>
              <span className="pill" style={{cursor:"pointer"}}><I.book style={{width:13}}/> Cite</span>
              <span className="pill" style={{cursor:"pointer"}}><I.ext style={{width:13}}/> DOI</span>
            </div>
          </div>

          <div className="booklet-nav">
            <button type="button" className="btn btn-ghost btn-sm" onClick={()=>goTo(page-1)} disabled={page===0 || turning}>
              ← Previous
            </button>
            <span style={{fontFamily:"var(--f-mono)", fontSize:11, color:"var(--mute)", flex:1, textAlign:"center"}}>
              {page+1} of {PAPERS.length}
            </span>
            <button type="button" className="btn btn-primary btn-sm" onClick={()=>goTo(page+1)} disabled={page===PAPERS.length-1 || turning}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SRPPage() {
  return (
    <>
      <PageHero
        eyebrow="Summer Research Program"
        title="Research that goes somewhere."
        blurb="The Summer Research Program (SRP) is our flagship mentored research stream: twelve structured weeks with real, portfolio-worthy output and a closing symposium."
        rightSlot={
          <div style={{display:"grid", gridTemplateColumns:"1fr", gap:12}}>
            <PH label="SRP scholar in the laboratory" src={SITE_PHOTOS.srpHeroWide} aspect="3/2" variant="dark"/>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
              <PH label="Hands-on student research" src={SITE_PHOTOS.srpHeroPoster} aspect="4/3" variant="sage"/>
              <PH label="SRP team presenting outcomes" src={SITE_PHOTOS.srpSpotlight} aspect="4/3"/>
            </div>
          </div>
        }
      />

      <section style={{background:"var(--g900)", paddingBlock:"clamp(48px,6vw,72px)"}}>
        <div className="container">
          <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)"}}>
            {[
              {n:62, s:"+", l:"Scholars",      sub:"Across cohorts",        icon:"flask"},
              {n:40, s:"+", l:"Final posters", sub:"Submitted per cohort",  icon:"book"},
              {n:12, s:"",  l:"Weeks",          sub:"Structured program",    icon:"cal"},
              {n:15, s:"+", l:"Mentor labs",   sub:"Partner institutions",  icon:"pin"},
            ].map(({n,s,l,sub,icon},i) => {
              const Ic = I[icon];
              return (
                <Reveal key={i} delay={i*60}>
                  <div style={{
                    padding:"clamp(28px,3.5vw,44px) clamp(20px,2.5vw,32px)",
                    borderRight: i<3 ? "1px solid rgba(255,255,255,.1)" : "none",
                    display:"flex", flexDirection:"column", gap:18,
                  }}>
                    <div style={{
                      width:44, height:44, borderRadius:12, flexShrink:0,
                      background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"var(--g300)",
                    }}><Ic/></div>
                    <div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:"clamp(38px,4.5vw,58px)", color:"#ffffff", lineHeight:1, letterSpacing:"-.02em"}}>
                      <Counter to={n}/>{s}
                    </div>
                    <div>
                      <div style={{fontWeight:700, fontSize:15, color:"rgba(255,255,255,.92)", lineHeight:1.2}}>{l}</div>
                      <div style={{fontSize:13, color:"#c3d2c7", marginTop:5, lineHeight:1.5}}>{sub}</div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Twelve weeks, four milestones."/>

          <div className="four-col-grid" style={{marginTop:48, alignItems:"stretch"}}>
            {[
              {w:"Weeks 1–3",  t:"Onboarding",    d:"Matching, literature review, and methods foundations.",                    accent:"var(--g900)", badge:"var(--g900)"},
              {w:"Weeks 4–6",  t:"Research core",  d:"Guided data collection, analysis, and mentor checkpoints.",               accent:"var(--g600)", badge:"var(--g600)"},
              {w:"Weeks 7–9",  t:"Drafting",       d:"Poster and manuscript drafts with structured feedback.",                   accent:"var(--g500)", badge:"var(--g500)"},
              {w:"Weeks 10–12",t:"Symposium",      d:"Final showcase and the M4Y publication pipeline.",                        accent:"var(--g300)", badge:"var(--g300)"},
            ].map(({w,t,d,accent,badge},i) => (
              <Reveal key={i} delay={i*70}>
                <div style={{
                  height:"100%", display:"flex", flexDirection:"column",
                  borderRadius:"var(--r-lg)", overflow:"hidden",
                  border:"1px solid var(--line)",
                  boxShadow:"var(--sh-1)",
                  background:"#fff",
                  transition:"transform .25s, box-shadow .25s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--sh-2)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--sh-1)"}}
                >
                  {/* Accent top bar */}
                  <div style={{height:4, background:accent, flexShrink:0}}/>

                  <div style={{padding:"28px 26px", display:"flex", flexDirection:"column", flex:1}}>
                    {/* Week label + step badge row */}
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20}}>
                      <span style={{
                        fontFamily:"var(--f-mono)", fontSize:11, fontWeight:700,
                        letterSpacing:".08em", textTransform:"uppercase",
                        padding:"4px 10px", borderRadius:999,
                        background:"var(--g50)", border:"1px solid var(--line)",
                        color:"var(--g600)",
                      }}>{w}</span>
                      <div style={{
                        width:40, height:40, borderRadius:"50%",
                        background:badge,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0,
                      }}>
                        <span style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:16, color:"#fff", lineHeight:1}}>0{i+1}</span>
                      </div>
                    </div>

                    <h3 style={{fontSize:20, lineHeight:1.2, color:"var(--g900)"}}>{t}</h3>
                    <p style={{fontSize:14.5, color:"var(--ink2)", marginTop:10, lineHeight:1.68, flex:1}}>{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap:32, flexWrap:"wrap", marginBottom:36}}>
            <SectionHead eyebrow="Research archive" title="Browse the paper library."/>
            <Link to="/programs" className="btn btn-ghost">Programs hub <I.arrow className="arr"/></Link>
          </div>
          <PaperBooklet/>
        </div>
      </section>

    </>
  );
}

/* ============================================================
   SPONSORS PAGE
   ============================================================ */
function SponsorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="A partner ecosystem built for students."
        blurb="Member discount codes from our chapter sponsorship agreements are listed on each card. Partners without a code deliver workshops, clinical skills training, fairs, or in-kind programming."
      />
      <section className="section">
        <div className="container">
          <div className="two-col-grid" style={{alignItems:"start", gap:24}}>
            {SPONSORS.map((s,i) => (
              <Reveal key={s.name} delay={i*40}>
                <div style={{
                  borderRadius:"var(--r-lg)", overflow:"hidden",
                  border:"1px solid var(--line)", background:"#fff",
                  boxShadow:"var(--sh-1)",
                  display:"flex", flexDirection:"column",
                  transition:"transform .25s, box-shadow .25s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--sh-2)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="var(--sh-1)"}}
                >
                  {/* Accent top bar */}
                  <div style={{height:4, background:"linear-gradient(90deg,var(--g900),var(--g500))"}}/>

                  {/* Card header: logo + category */}
                  <div style={{padding:"22px 28px", borderBottom:"1px solid var(--line)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16}}>
                    <div style={{
                      height:52, minWidth:96, maxWidth:120, flexShrink:0,
                      background:"var(--g50)", borderRadius:10, border:"1px solid var(--line)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      padding:"8px 14px",
                    }}>
                      {s.logo ? (
                        <img src={s.logo} alt={`${s.name} logo`} loading="lazy" decoding="async" style={{maxWidth:88, maxHeight:36, width:"auto", height:"auto", objectFit:"contain"}}/>
                      ) : (
                        <span style={{fontWeight:800, fontSize:18, color:"var(--g600)"}}>{s.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="pill sage" style={{fontSize:11}}>{s.category}</span>
                  </div>

                  {/* Body */}
                  <div style={{padding:"24px 28px", display:"flex", flexDirection:"column", flex:1, gap:14}}>
                    <h3 style={{fontSize:20, color:"var(--g900)", lineHeight:1.2, margin:0}}>{s.name}</h3>
                    <p style={{color:"var(--ink2)", fontSize:14.5, lineHeight:1.72, flex:1, margin:0}}>{s.benefit}</p>

                    {/* Member code or partner badge */}
                    {s.code ? (
                      <div style={{marginTop:6, padding:"15px 20px", borderRadius:12, background:"var(--g50)", border:"1px dashed var(--g300)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
                        <div>
                          <div style={{fontSize:11, color:"var(--mute)", letterSpacing:".08em", textTransform:"uppercase", fontWeight:700}}>Member code</div>
                          <div style={{fontFamily:"var(--f-mono)", fontWeight:700, fontSize:16, color:"var(--g900)", marginTop:4}}>{s.code}</div>
                        </div>
                        <button type="button" className="btn btn-sm btn-ghost" onClick={()=>navigator.clipboard?.writeText(s.code)}>Copy</button>
                      </div>
                    ) : (
                      <div style={{marginTop:6, padding:"13px 18px", borderRadius:12, background:"rgba(31,58,48,.04)", border:"1px solid var(--line)", display:"flex", alignItems:"center", gap:10}}>
                        <I.check style={{width:15, height:15, color:"var(--g600)", flexShrink:0}}/>
                        <span style={{fontSize:13, color:"var(--ink2)", fontWeight:500}}>No code required - benefit is automatic</span>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--g900)", color:"#fff"}}>
        <div className="chapters-start-grid container">
          <div>
            <span className="eyebrow" style={{color:"var(--g300)"}}>Become a partner</span>
            <h2 style={{color:"#fff", marginTop:12}}>Reach a national community of pre-health students.</h2>
            <p style={{color:"#c3d2c7", fontSize:17, marginTop:14, maxWidth:520}}>We work with trusted partners across admissions, test prep, research, and community programming. Category exclusivity, workshop co-hosting, and member benefits all available.</p>
            <a href="https://forms.gle/medicine4youth-sponsorship" target="_blank" rel="noreferrer" className="btn btn-cream" style={{marginTop:24}}>Sponsorship Inquiry <I.arrow className="arr"/></a>
          </div>
          <div className="stack" style={{gap:12}}>
            {[
              ["Category exclusivity","Be the sole partner in your category within M4Y programs."],
              ["Workshop co-hosting","Run branded sessions inside SRP or chapter programming."],
              ["Member benefits","Offer codes and perks to our vetted member base."],
            ].map(([a,b],i) => (
              <div key={i} style={{padding:"18px 22px", borderRadius:14, border:"1px solid rgba(255,255,255,.15)", background:"rgba(255,255,255,.04)"}}>
                <div style={{fontWeight:800, color:"#fff"}}>{a}</div>
                <div style={{color:"#c3d2c7", fontSize:14, marginTop:4}}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   CHAPTERS PAGE - Interactive Map
   ============================================================ */

/*
  Recalculated for viewBox "0 0 900 480"
  lon range: -140 to -52 (88°), lat range: 41 to 58 (17°)
  x = (140 - |lon|) / 88 * 900
  y = (58 - lat)   / 17 * 480
*/
const CHAPTER_LOCATIONS = [
  { name:"University of British Columbia, Vancouver",  lat:49.2606,  lng:-123.2460, prov:"BC" },
  { name:"University of British Columbia Okanagan",    lat:49.9396,  lng:-119.3960, prov:"BC" },
  { name:"Northwestern Polytechnic",                   lat:55.1694,  lng:-118.7972, prov:"AB" },
  { name:"University of Alberta",                      lat:53.5232,  lng:-113.5263, prov:"AB" },
  { name:"University of Calgary",                      lat:51.0797,  lng:-114.1304, prov:"AB" },
  { name:"University of Manitoba",                     lat:49.8083,  lng:-97.1333,  prov:"MB" },
  { name:"University of Winnipeg",                     lat:49.8951,  lng:-97.1384,  prov:"MB" },
  { name:"University of Ottawa",                       lat:45.4215,  lng:-75.6919,  prov:"ON" },
  { name:"Queen's University",                         lat:44.2253,  lng:-76.4951,  prov:"ON" },
  { name:"McGill University",                          lat:45.5048,  lng:-73.5772,  prov:"QC" },
  { name:"Dalhousie University",                       lat:44.6366,  lng:-63.5917,  prov:"NS" },
  { name:"McMaster University",                        lat:43.2609,  lng:-79.9192,  prov:"ON" },
  { name:"Western University",                         lat:43.0096,  lng:-81.2737,  prov:"ON" },
  { name:"University of Windsor",                      lat:42.3065,  lng:-83.0710,  prov:"ON" },
  { name:"University of Waterloo",                     lat:43.4723,  lng:-80.5449,  prov:"ON" },
  { name:"University of Guelph",                       lat:43.5318,  lng:-80.2270,  prov:"ON" },
  { name:"Brock University",                           lat:43.1184,  lng:-79.2484,  prov:"ON" },
  { name:"York University",                            lat:43.7735,  lng:-79.5019,  prov:"ON" },
  { name:"University of Toronto, Mississauga",         lat:43.5489,  lng:-79.6631,  prov:"ON" },
  { name:"University of Toronto, St. George",          lat:43.6629,  lng:-79.3957,  prov:"ON" },
  { name:"University of Toronto, Scarborough",         lat:43.7844,  lng:-79.1864,  prov:"ON" },
  { name:"Toronto Metropolitan University (TMU)",      lat:43.6577,  lng:-79.3788,  prov:"ON" },
  { name:"Ontario Tech University",                    lat:43.9455,  lng:-78.8970,  prov:"ON" },
];

function ChaptersMap() {
  const [search, setSearch] = useState("");
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const query = search.toLowerCase().trim();
  const filtered = query
    ? CHAPTER_LOCATIONS.filter(c => c.name.toLowerCase().includes(query) || c.prov.toLowerCase().includes(query))
    : CHAPTER_LOCATIONS;

  useEffect(() => {
    if (!window.L || mapRef.current) return;

    const map = window.L.map(mapElRef.current, {
      center: [54, -96],
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    const makeIcon = (dim) => window.L.divIcon({
      className: "",
      html: `<div style="
        width:${dim}px;height:${dim}px;border-radius:50%;
        background:#e53935;border:2.5px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,.35);
        transition:transform .15s;
      "></div>`,
      iconSize: [dim, dim],
      iconAnchor: [dim/2, dim/2],
      popupAnchor: [0, -dim/2 - 4],
    });

    CHAPTER_LOCATIONS.forEach(c => {
      const marker = window.L.marker([c.lat, c.lng], { icon: makeIcon(14) })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:sans-serif;min-width:180px">
            <div style="font-size:13px;font-weight:700;color:#1f3a30;line-height:1.3">${c.name}</div>
            <div style="font-size:11px;color:#5f8a78;margin-top:4px;font-weight:600;letter-spacing:.05em">${c.prov}</div>
          </div>
        `, { maxWidth: 260 });
      markersRef.current.push({ marker, chapter: c });
    });

    return () => { map.remove(); mapRef.current = null; markersRef.current = []; };
  }, []);

  useEffect(() => {
    markersRef.current.forEach(({ marker, chapter }) => {
      const match = !query || chapter.name.toLowerCase().includes(query) || chapter.prov.toLowerCase().includes(query);
      marker.setOpacity(match ? 1 : 0.15);
    });
  }, [query]);

  return (
    <div className="map-outer" style={{overflow:"hidden"}}>
      <div className="map-search-wrap" style={{position:"relative"}}>
        <span style={{position:"absolute",left:18,top:"50%",transform:"translateY(-50%)",color:"var(--mute)",pointerEvents:"none"}}>
          <I.search/>
        </span>
        <input
          type="search"
          placeholder="Search for your university or province…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{paddingLeft:44,width:"100%"}}
        />
      </div>

      <div ref={mapElRef} style={{height:480,width:"100%"}}/>

      {query && (
        <div style={{padding:"14px 24px 16px",borderTop:"1px solid var(--line)"}}>
          <div style={{fontSize:13,color:"var(--mute)",marginBottom:filtered.length?10:0}}>
            {filtered.length
              ? <><strong style={{color:"var(--g900)"}}>{filtered.length}</strong> chapter{filtered.length!==1?"s":""} match <em>"{search}"</em></>
              : <>No chapters found for <em>"{search}"</em></>}
          </div>
          {filtered.length > 0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {filtered.map(c => (
                <span key={c.name} className="pill sage" style={{fontSize:12}}>{c.name}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChaptersPage() {
  return (
    <>
      <PageHero eyebrow="Chapters" title="M4Y on campuses across Canada." blurb="Our university chapter network spans institutions from coast to coast. Each chapter runs local mentorship, events, and programming under the M4Y umbrella."/>

      <section className="section">
        <div className="container">
          {/* Header row */}
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:32, marginBottom:48}}>
            <div>
              <span className="eyebrow">Active network</span>
              <h2 style={{fontSize:"clamp(28px,3.5vw,42px)", marginTop:12, marginBottom:0}}>{CHAPTERS.length} chapters across Canada</h2>
              <p style={{fontSize:16, color:"var(--ink2)", marginTop:14, maxWidth:560, marginBottom:0, lineHeight:1.7}}>
                Post-secondary chapters run local mentorship, events, and workshops under the Medicine4Youth umbrella - find yours on the map below.
              </p>
            </div>
            <Link to="/join" className="btn btn-primary btn-lg">Start a chapter <I.arrow className="arr"/></Link>
          </div>

          {/* Interactive map */}
          <ChaptersMap/>

          {/* CTA card */}
          <Reveal delay={100} style={{marginTop:48}}>
            <div style={{
              borderRadius:"var(--r-lg)", overflow:"hidden",
              background:"var(--g900)",
              boxShadow:"0 4px 28px rgba(0,0,0,.18)",
            }}>
              <div style={{height:4, background:"linear-gradient(90deg,var(--g500),var(--g300))"}}/>
              <div style={{
                padding:"clamp(28px,4vw,48px)",
                display:"flex", flexWrap:"wrap", alignItems:"flex-start",
                justifyContent:"space-between", gap:36,
                position:"relative", overflow:"hidden",
              }}>
                <svg style={{position:"absolute",right:-20,top:-80,opacity:.06,pointerEvents:"none"}} width="340" height="340" viewBox="0 0 340 340">
                  {[50,100,155,210].map(r => <circle key={r} cx="340" cy="0" r={r} fill="none" stroke="#fff" strokeWidth="1.5"/>)}
                </svg>
                <div style={{flex:1, minWidth:260, position:"relative", zIndex:1}}>
                  <span style={{display:"inline-block", fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"var(--g300)", marginBottom:12}}>National ecosystem</span>
                  <h3 style={{fontSize:"clamp(20px,2.5vw,26px)", fontWeight:800, color:"#ffffff", lineHeight:1.15, margin:"0 0 14px"}}>Branches &amp; national programs</h3>
                  <p style={{fontSize:15.5, color:"#c3d2c7", lineHeight:1.72, maxWidth:520, margin:"0 0 22px"}}>
                    Chapters are campus-based. Specialty branches run cross-Canada programming independent of any single university. Explore both to find your fit.
                  </p>
                  <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                    {["Neuro","Surgery","Charity4Youth","Pharmacy4Youth","Dentistry4Youth"].map(name => (
                      <span key={name} style={{fontSize:12, fontWeight:600, padding:"5px 14px", borderRadius:999, background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.2)", color:"#e8f3ee"}}>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:12, position:"relative", zIndex:1, flexShrink:0, minWidth:180}}>
                  <Link to="/branches" className="btn btn-primary" style={{justifyContent:"center"}}>Explore branches <I.arrow className="arr"/></Link>
                  <Link to="/programs" className="btn btn-ghost" style={{color:"#e8f3ee", borderColor:"rgba(255,255,255,.25)", justifyContent:"center"}}>Programs</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{background:"var(--g50)", borderTop:"1px solid var(--line)"}}>
        <div className="chapters-start-grid container">
          <Reveal>
            <SectionHead eyebrow="Start a chapter" title="We send the playbook. You bring the students."/>
          </Reveal>
          <div className="stack" style={{gap:0}}>
            {[
              {n:"01", t:"Submit interest",  d:"Tell us about your school, team, and why now.", icon:"spark"},
              {n:"02", t:"Intake call",       d:"30-min call with the central team. We hand over the brand kit and playbook.", icon:"cal"},
              {n:"03", t:"Launch",            d:"Go live with your first event within 60 days of intake.", icon:"pin"},
            ].map(({n,t,d,icon}, i, arr) => {
              const Ic = I[icon];
              const isLast = i === arr.length - 1;
              const circleBg = i===0 ? "var(--g900)" : i===1 ? "var(--g600)" : "var(--g500)";
              return (
                <Reveal key={i} delay={i*80}>
                  <div style={{position:"relative", paddingBottom: isLast ? 0 : 20}}>
                    {!isLast && (
                      <div style={{
                        position:"absolute", left:27, top:58, width:2, bottom:0,
                        background:"linear-gradient(to bottom,var(--g500),var(--line))",
                        zIndex:0,
                      }}/>
                    )}
                    <div style={{display:"flex", gap:20, alignItems:"flex-start", position:"relative", zIndex:1}}>
                      <div style={{
                        width:56, height:56, borderRadius:"50%", flexShrink:0,
                        background:circleBg,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:"0 2px 10px rgba(0,0,0,.12)",
                        border:"3px solid var(--g50)",
                      }}>
                        <span style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:16, color:"#ffffff", lineHeight:1}}>{n}</span>
                      </div>
                      <div style={{
                        flex:1, padding:"20px 26px", borderRadius:"var(--r-lg)",
                        background:"#ffffff", border:"1px solid var(--line)",
                        boxShadow:"0 1px 6px rgba(0,0,0,.05)",
                      }}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:12}}>
                          <div style={{fontWeight:800, color:"var(--g900)", fontSize:17, lineHeight:1.2}}>{t}</div>
                          <div style={{width:36, height:36, borderRadius:10, background:"var(--g50)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--g600)", flexShrink:0, border:"1px solid var(--line)"}}>
                            <Ic style={{width:16, height:16}}/>
                          </div>
                        </div>
                        <div style={{fontSize:15, color:"var(--ink2)", marginTop:8, lineHeight:1.65}}>{d}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
            <Link to="/join" className="btn btn-primary" style={{marginTop:28, alignSelf:"flex-start"}}>Submit Chapter Interest <I.arrow className="arr"/></Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============================================================
   CONTACT PAGE
   ============================================================ */
function downloadCSV(data) {
  const headers = ["First Name","Last Name","Email","School","Grade","Interests"];
  const row = [data.first, data.last, data.email, data.school, data.grade, data.interests.join("; ")];
  const csv = [headers, row].map(r => r.map(v => `"${String(v||"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `m4y-member-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function ContactPage() {
  const [form, setForm] = useState({first:"",last:"",email:"",school:"",grade:"9-10",interests:[]});
  const [submitted, setSubmitted] = useState(false);

  function handleInterest(x) {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(x) ? f.interests.filter(i=>i!==x) : [...f.interests, x]
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    downloadCSV(form);
    setSubmitted(true);
  }

  return (
    <>
      <PageHero eyebrow="Join · Contact" title="Let's build something together." blurb="Become a general member, apply to the team, or get in touch. We move fast."/>
      <section className="section">
        <div className="contact-layout container">
          <div className="card" style={{padding:40}}>
            {submitted ? (
              <div style={{textAlign:"center", padding:"40px 0"}}>
                <div style={{width:64, height:64, borderRadius:"50%", background:"var(--g100)", display:"grid", placeItems:"center", color:"var(--g800)", margin:"0 auto 20px"}}><I.check/></div>
                <h2 style={{fontSize:28}}>You're in.</h2>
                <p style={{color:"var(--ink2)", marginTop:12}}>Your details were downloaded as a CSV - our team will add you to the intake sheet shortly. Welcome to M4Y.</p>
                <button type="button" className="btn btn-ghost" style={{marginTop:24}} onClick={()=>setSubmitted(false)}>Submit another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <span className="eyebrow">General Membership</span>
                <h2 style={{marginTop:12, fontSize:32}}>Become a member.</h2>
                <p style={{color:"var(--ink2)", marginTop:10}}>Fill out the form. We'll add you to our newsletter, send sponsor codes, and invite you to member events.</p>
                <div className="two-col-grid-sm" style={{marginTop:28}}>
                  <div className="field">
                    <label>First name</label>
                    <input required placeholder="First name" value={form.first} onChange={e=>setForm(f=>({...f,first:e.target.value}))}/>
                  </div>
                  <div className="field">
                    <label>Last name</label>
                    <input required placeholder="Last name" value={form.last} onChange={e=>setForm(f=>({...f,last:e.target.value}))}/>
                  </div>
                  <div className="field" style={{gridColumn:"span 2"}}>
                    <label>Email</label>
                    <input required type="email" placeholder="you@school.edu" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                  </div>
                  <div className="field">
                    <label>School / Institution</label>
                    <input placeholder="McMaster University" value={form.school} onChange={e=>setForm(f=>({...f,school:e.target.value}))}/>
                  </div>
                  <div className="field">
                    <label>Grade / Year</label>
                    <select value={form.grade} onChange={e=>setForm(f=>({...f,grade:e.target.value}))}>
                      <option>9-10</option><option>11-12</option><option>Undergraduate Year 1-2</option><option>Undergraduate Year 3-4</option><option>Graduate</option>
                    </select>
                  </div>
                  <div className="field" style={{gridColumn:"span 2"}}>
                    <label>Interests</label>
                    <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:4}}>
                      {["Mentorship","SRP","Neuroscience","Psychology","Dentistry","Pharmacy","BioEng","Optometry","Charity","Endopath","Rehab","Surgery","Chapter Lead"].map(x => (
                        <label key={x} style={{
                          display:"inline-flex", gap:6, alignItems:"center",
                          padding:"8px 12px", border:`1px solid ${form.interests.includes(x)?"var(--g500)":"var(--line)"}`,
                          borderRadius:999, fontSize:13, cursor:"pointer",
                          background:form.interests.includes(x)?"var(--g50)":"transparent",
                          transition:"all .15s",
                        }}>
                          <input type="checkbox" checked={form.interests.includes(x)} onChange={()=>handleInterest(x)} style={{display:"none"}}/> {x}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{marginTop:24}}>Submit & Download CSV <I.arrow className="arr"/></button>
                <div style={{fontSize:12, color:"var(--mute)", marginTop:14}}>Submitting downloads your details as a CSV for our intake team. Data is not sent to any third party.</div>
              </form>
            )}
          </div>

          <div className="stack" style={{gap:16}}>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Email</h3>
              <a href="mailto:Presidents@medicine4youth.ca" className="link-underline" style={{color:"var(--g800)", display:"inline-flex", gap:8, alignItems:"center", marginTop:8}}>
                <I.mail/> Presidents@medicine4youth.ca
              </a>
            </div>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Socials</h3>
              <div style={{display:"flex", gap:10, marginTop:12, flexWrap:"wrap"}}>
                <a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="pill"><I.inst/> @medicine4youth</a>
                <a href="https://www.linkedin.com/company/medicine4youth/" target="_blank" rel="noreferrer" className="pill"><I.link/> LinkedIn</a>
              </div>
            </div>
            <div className="card" style={{padding:28, background:"var(--g50)"}}>
              <h3 style={{fontSize:20}}>Sponsorship Inquiry</h3>
              <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>Interested in sponsoring Medicine4Youth programs or events? Tell us more and we'll send our sponsorship package and next steps.</p>
              <a href="https://forms.gle/medicine4youth-sponsorship" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{marginTop:14}}>
                Open Sponsorship Form <I.arrow className="arr"/>
              </a>
            </div>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Linktree</h3>
              <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>One link for all current opportunities, forms, and events.</p>
              <a href="https://linktr.ee/medicine4youth" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{marginTop:14}}>
                <I.ext/> linktr.ee/medicine4youth
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title="Everything students need, in one hub." blurb="Guides, past papers, slide decks, and toolkits curated by the M4Y team and chapter leads."/>
      <section className="section">
        <div className="container three-col-grid" style={{gap:16}}>
          {[
            { t:"Pre-Med Application Guide", tag:"Guide" },
            { t:"Research Methods Primer", tag:"Guide" },
            { t:"SRP Scholar Posters (Cohort '25)", tag:"Archive" },
            { t:"Interview Prep: MMI", tag:"Guide" },
            { t:"Branch Brand Kit", tag:"Chapter Kit" },
            { t:"Event Planning Playbook", tag:"Chapter Kit" },
            { t:"NeuroPsych4Youth Reading List", tag:"Reading List" },
            { t:"Chapter Social Media Toolkit", tag:"Chapter Kit" },
            { t:"Sponsor Perks One-Pager", tag:"Member" },
          ].map((r,i) => (
            <Reveal key={i} delay={i*40} className="card" style={{padding:28}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span className="pill sage">{r.tag}</span>
                <I.ext/>
              </div>
              <h3 style={{fontSize:20, marginTop:16}}>{r.t}</h3>
              <div style={{marginTop:16, display:"flex", gap:8}}>
                <span className="pill">PDF</span>
                <span className="pill">Notion</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AboutPage, ProgramsPage, BranchesPage, SRPPage, SponsorsPage, ChaptersPage, ResourcesPage, ContactPage, PhilippinesSection });
