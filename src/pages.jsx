/* Main pages */

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Medicine4Youth" title="Student-led. Clinician-mentored. Built to last."
        blurb="We are a registered not-for-profit charity with the Canada Revenue Agency (CRA). Medicine4Youth is not a U.S. 501(c) organization; we operate as a Canadian nonprofit serving students here and abroad."
        rightSlot={<div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          <PH label="Medicine4Youth leadership" src={SITE_PHOTOS.aboutTeam} aspect="3/4" variant="sage"/>
          <PH label="Students in a Medicine4Youth workshop" src={SITE_PHOTOS.aboutPrograms} aspect="3/4" variant="dark" style={{marginTop:40}}/>
        </div>}
      />
      <section className="section">
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:60}}>
          <SectionHead eyebrow="Our story" title="Why Medicine4Youth exists."/>
          <div className="stack" style={{gap:20, fontSize:17, color:"var(--ink2)"}}>
            <p>
              Medicine4Youth is a registered not-for-profit charity organization in Canada for aspiring students pursuing careers in medicine. Our ultimate mission is to empower youth who share our passion for medicine by providing essential resources and opportunities to explore a future in healthcare. Through student-led research projects, interactive webinars with medical students, and hands-on workshops at high school and university chapters, we cultivate an environment that nurtures and inspires the next generation of medical professionals.
            </p>
            <p>
              Mentorship connects youth with medical students, residents, and healthcare professionals. Education means workshops, panels, and Q&amp;A on admissions, careers, and pathways. Community building happens through chapters worldwide at secondary and post-secondary schools: each chapter advances mentorship, outreach, and programming locally.
            </p>
            <p>
              Medicine4Youth also supports branches that let members explore passions across clinical and scientific fields. Programs and initiatives include the chapter network, international tutoring partnerships, and the Summer Research Program described on the Programs and SRP pages.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="Meet the presidents" title="The people behind the program."/>
          <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:24, marginTop:40}}>
            {[
              { n:"Anita Alizadeh", r:"Founder & President", photo:"./assets/headshots/anita.png", b:"Anita is an Honours Psychology, Neuroscience & Behaviour student at McMaster University. Her research interests focus on psychedelics and neuropharmacology within psychology and neuroscience. As Founder and President, Anita oversees the organization's growth, leading outreach efforts and fostering meaningful community connections.", li:"https://www.linkedin.com/in/anita-alizadeh-a60ba8286/" },
              { n:"Ibrahim Khan", r:"President", photo:"./assets/headshots/ibrahim.png", b:"Ibrahim is an Honours Health Sciences student at the University of Ottawa. His research interests include disability, assistive technology, and rehabilitation sciences, with a focus on mental health. As President, Ibrahim spearheads initiatives that bridge gaps in health education, empowering youth through accessible, community-based programming.", li:"https://www.linkedin.com/in/ibrahim-khan-05ik4308/" },
            ].map((p,i) => (
              <Reveal key={i} delay={i*80} className="card" style={{padding:0, display:"grid", gridTemplateColumns:"200px 1fr", overflow:"hidden"}}>
                <div style={{position:"relative", minHeight:280, background:"var(--g100)"}}>
                  <img src={p.photo} alt={`Portrait of ${p.n}`} loading="lazy" decoding="async" style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top"}} />
                </div>
                <div style={{padding:28, display:"flex", flexDirection:"column", gap:10}}>
                  <span className="mono" style={{color:"var(--g800)"}}>{p.r}</span>
                  <h3 style={{fontSize:26}}>{p.n}</h3>
                  <p style={{color:"var(--ink2)", fontSize:14}}>{p.b}</p>
                  <div style={{display:"flex", gap:8, marginTop:"auto"}}>
                    <a href={p.li} target="_blank" rel="noreferrer" className="pill link-underline" style={{display:"inline-flex", gap:8, alignItems:"center"}}><I.link/> LinkedIn</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Values" title="What we optimize for." align="center"/>
          <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:40}}>
            {[
              ["Credibility", "Programs with real outputs, not filler."],
              ["Access", "Opportunities that find students, not the other way around."],
              ["Mentorship", "Every member gets a human, not a portal."],
              ["Scalability", "A system that grows without breaking."],
            ].map(([a,b], i) => (
              <Reveal key={i} delay={i*60} className="card" style={{padding:28}}>
                <div className="mono" style={{color:"var(--g800)"}}>0{i+1}</div>
                <h3 style={{fontSize:20, marginTop:10}}>{a}</h3>
                <p style={{fontSize:14, color:"var(--ink2)", marginTop:8}}>{b}</p>
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
              {q:"Is Medicine4Youth a registered charity?", a:"Yes. We are registered as a Canadian not-for-profit charity with the Canada Revenue Agency (CRA). We are not a U.S. 501(c) nonprofit."},
              {q:"Who can join?", a:"Any high school or post-secondary student interested in medicine, healthcare, or allied health sciences."},
              {q:"Is there a cost to join?", a:"General membership is free. Some paid programs (e.g. specialized workshops) may carry a small fee; sponsor codes typically reduce external costs when available."},
              {q:"Can I start a chapter?", a:"Yes. Visit the Chapters page to submit interest; we will send a playbook and schedule an intake call."},
              {q:"How do I apply to SRP?", a:"Applications open seasonally. See the Summer Research Program page for eligibility, timelines, and previous scholar outputs."},
            ]}/>
          </div>
        </div>
      </section>
      <CTABand/>
    </>
  );
}

function ProgramsPage() {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Research", "Programs", "Events"];
  const shown = filter === "All" ? EVENTS : EVENTS.filter((e) => e.tag === filter);
  const programs = [
    { t:"Summer Research Program (SRP)", d:"Secondary and post-secondary students join mentored research aligned with their interests: curiosity, critical thinking, mentorship, and fundamentals of healthcare research, ending in symposium and publication.", tag:"Flagship", to:"/srp" },
    { t:"Mentorship Program", d:"1:1 mentorship pairings with clinicians, grad students, and senior mentees.", tag:"Community" },
    { t:"Healthcare Bowl", d:"M4Y's annual case-based competition across student teams. Dates and host details are in the flagship calendar below.", tag:"Programs" },
    { t:"Healthcare Horizons", d:"Interdisciplinary panel on medicine, dentistry, pharmacy, and optometry: pathways, workforce themes, and real-world experience. See the calendar below.", tag:"Events" },
    { t:"Chapter Program", d:"University chapters with shared brand and playbook.", tag:"Leadership", to:"/chapters" },
  ];
  return (
    <>
      <PageHero eyebrow="Programs" title="Programs, outreach, and flagship events." blurb="Medicine4Youth runs national offerings and chapter-led programming: mentored research, competitions, interdisciplinary panels, and global outreach. That includes the Philippines tutoring project with Solander PH, supporting children through local child care organizations and orphanages with academic help and mentorship. From applications to event dates, this page is the single hub."/>
      <section className="section">
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
          {programs.map((p,i) => (
            <Reveal key={p.t} delay={i*60} className="card" style={{padding:32, display:"flex", flexDirection:"column", gap:12}}>
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <span className={"pill "+(p.tag==="Coming Soon"?"deep":"sage")}>{p.tag}</span>
                <span className="mono" style={{color:"var(--mute)"}}>Program {String(i+1).padStart(2,"0")}</span>
              </div>
              <h3 style={{fontSize:24, marginTop:8}}>{p.t}</h3>
              <p style={{color:"var(--ink2)", fontSize:15}}>{p.d}</p>
              {p.to && <Link to={p.to} className="link-underline" style={{color:"var(--g800)", marginTop:8, display:"inline-flex", gap:6, alignItems:"center"}}>Learn more <I.arrow/></Link>}
            </Reveal>
          ))}
        </div>
      </section>

      <section id="flagship-events" className="section" style={{scrollMarginTop: 88}}>
        <div className="container">
          <SectionHead eyebrow="Flagship calendar" title="SRP symposium, Healthcare Bowl, and Healthcare Horizons." blurb="Filter by Research, Programs, or Events. Specialty branches host additional programming on their own sites."/>
          <div className="tabs" style={{marginBottom:32}}>
            {tags.map((t) => (
              <div key={t} className={"tab " + (filter === t ? "active" : "")} onClick={() => setFilter(t)} role="button" tabIndex={0} onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); setFilter(t); } }}>
                {t}
              </div>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 340px))",
              justifyContent: "start",
              gap: 16,
            }}
          >
            {shown.map((e, i) => (
              <Reveal key={e.t + e.date} delay={i * 50} className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", maxWidth: 340, width: "100%"}}>
                <PH label={e.t} src={e.photo} aspect="4/3" variant={i % 3 === 0 ? "dark" : i % 3 === 1 ? "sage" : ""} />
                <div style={{padding:18, display:"flex", flexDirection:"column", gap:8, flex:1}}>
                  <div style={{display:"flex", gap:8}}>
                    <span className={"pill " + (e.tag === "Coming Soon" || e.date === "Coming Soon" ? "deep" : "sage")}>{e.tag}</span>
                  </div>
                  <h3 style={{fontSize:17, lineHeight:1.2}}>{e.t}</h3>
                  <p style={{fontSize:13, color:"var(--ink2)", lineHeight:1.5}}>{e.blurb}</p>
                  <div style={{marginTop:"auto", display:"flex", gap:14, fontSize:12, color:"var(--mute)", paddingTop:14, borderTop:"1px solid var(--line)", flexWrap:"wrap"}}>
                    <span style={{display:"flex", gap:6, alignItems:"center"}}><I.cal /> {e.date}</span>
                    <span style={{display:"flex", gap:6, alignItems:"center"}}><I.pin /> {e.loc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {HEALTHCARE_HORIZONS_SPONSOR_LOGOS.length > 0 ? (
        <section className="section" style={{paddingTop:0}}>
          <div className="container">
            <div className="divider" style={{marginBottom:28}} />
            <span className="eyebrow">Partners</span>
            <p style={{color:"var(--ink2)", fontSize:15, marginTop:12, maxWidth:720}}>Organizations that support Healthcare Horizons and other flagship Medicine4Youth events. Logos are shown as provided by each partner.</p>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 132px), 168px))",
                justifyContent: "start",
                gap: 14,
                marginTop: 24,
              }}
            >
              {HEALTHCARE_HORIZONS_SPONSOR_LOGOS.map((logo) => (
                <div
                  key={logo.src}
                  className="card"
                  style={{
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 76,
                    background: "var(--paper)",
                  }}
                >
                  <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" style={{maxHeight: 44, maxWidth: "100%", width: "auto", objectFit: "contain"}} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" style={{background:"var(--g50)"}}>
        <div className="container">
          <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:20}}>
            <div className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", background:"linear-gradient(135deg, var(--g100), var(--g300))"}}>
              <PH label="Student teams collaborating at a Healthcare Bowl style event" src={SITE_PHOTOS.eventsFeaturedBowl} aspect="16/9" style={{borderRadius:0}} />
              <div style={{padding:32}}>
                <span className="pill deep">Programs</span>
                <h2 style={{marginTop:18}}>Healthcare Bowl</h2>
                <p style={{color:"var(--ink2)", fontSize:16, marginTop:12, maxWidth:420}}>M4Y's annual case-based competition for student teams. Fast-paced scenarios, collaborative problem solving, and mentorship from people across healthcare pathways.</p>
                <div style={{display:"flex", gap:18, marginTop:24, flexWrap:"wrap"}}>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:26, color:"var(--g900)"}}>40+</div><div style={{fontSize:12, color:"var(--mute)"}}>Teams</div></div>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:26, color:"var(--g900)"}}>{"Mar '26"}</div><div style={{fontSize:12, color:"var(--mute)"}}>Next edition</div></div>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:26, color:"var(--g900)"}}>UofT</div><div style={{fontSize:12, color:"var(--mute)"}}>Host</div></div>
                </div>
              </div>
            </div>
            <div className="card" style={{padding:0, overflow:"hidden", display:"flex", flexDirection:"column", background:"var(--g900)", color:"#fff", position:"relative"}}>
              <PH label="Healthcare Horizons interdisciplinary panel" src={SITE_PHOTOS.eventsFeaturedHorizons} aspect="16/9" variant="dark" style={{borderRadius:0, opacity:.95}} />
              <div style={{padding:32, position:"relative"}}>
                <div style={{position:"absolute", right:-40, top:-80, width:200, height:200, borderRadius:"50%", background:"var(--g500)", opacity:.25}} />
                <span className="pill sage" style={{background:"rgba(255,255,255,.95)", color:"var(--g900)", borderColor:"transparent"}}>Events</span>
                <h2 style={{marginTop:18, color:"#fff"}}>Healthcare Horizons</h2>
                <p style={{color:"#c3d2c7", fontSize:16, marginTop:12, maxWidth:420}}>Interdisciplinary panel on medicine, dentistry, pharmacy, and optometry: education pathways, workforce themes, and candid experiences across fields.</p>
                <div style={{display:"flex", gap:18, marginTop:24, flexWrap:"wrap"}}>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:26, color:"#fff"}}>Nov 23</div><div style={{fontSize:12, color:"#a8b8ae"}}>Last session date</div></div>
                  <div><div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:26, color:"#fff"}}>~100</div><div style={{fontSize:12, color:"#a8b8ae"}}>Attendees</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="More initiatives" title="Chapters, the Philippines project, and research." align="center"/>
          <div className="grid" style={{gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap:16, marginTop:36}}>
            {[
              { t:"Philippines tutoring project", d:"In partnership with Solander PH, a local non-profit, Medicine4Youth supports child care organizations and orphanages with academic support and mentorship for children in need." },
              { t:"Medicine4Youth chapters", d:"Chapters at secondary and post-secondary schools worldwide bring the mission to life through local mentorship, outreach, and educational programming." },
              { t:"Summer Research Program", d:"Secondary and post-secondary students engage in research aligned with their interests and passions, with intellectual curiosity, critical thinking, mentorship, and foundations in scientific inquiry and healthcare research." },
            ].map((row, i) => (
              <Reveal key={row.t} delay={i * 60} className="card" style={{padding:26}}>
                <h3 style={{fontSize:19}}>{row.t}</h3>
                <p style={{color:"var(--ink2)", fontSize:14, marginTop:10, lineHeight:1.55}}>{row.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand/>
    </>
  );
}

function BranchesPage() {
  return (
    <>
      <PageHero eyebrow="Specialty branches" title="Ten sub-organizations. One scalable brand." blurb="Each branch operates independently with its own mentorship threads, events, and research output, connected through shared infrastructure."/>
      <section className="section">
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20}}>
          {BRANCHES.map((b, i) => {
            return (
              <Reveal key={b.slug} delay={i*50}>
                <Link to={"/branches/"+b.slug} className="card" data-branch={b.slug} style={{display:"grid", gridTemplateColumns:"1fr 1.3fr", padding:0, overflow:"hidden", minHeight:260}}>
                  <div style={{
                    padding:"18px 16px 22px",
                    background:b.panelBg || "var(--accent)",
                    display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"stretch", textAlign:"center", gap:14,
                    color:"#fff",
                    textShadow:"0 1px 2px rgba(0,0,0,.22)",
                  }}>
                    <div style={{flex:"1 1 auto", display:"flex", alignItems:"center", justifyContent:"center", minHeight:0, width:"100%", padding:0}}>
                      <BranchMark branch={b} size={280} circle fill style={{maxWidth: "100%"}} />
                    </div>
                    <div>
                      <div className="mono" style={{color:"rgba(255,255,255,.88)", textShadow:"none"}}>M4Y Branch</div>
                      <h3 style={{fontSize:22, marginTop:6, color:"#fff", textShadow:"0 1px 3px rgba(0,0,0,.25)"}}>{b.name}</h3>
                    </div>
                  </div>
                  <div style={{padding:28, display:"flex", flexDirection:"column", gap:12}}>
                    <p style={{color:"var(--ink2)", fontSize:15}}>{b.tagline}</p>
                    <div style={{marginTop:"auto", display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"1px solid var(--line)"}}>
                      <span style={{fontSize:12, color:"var(--mute)"}}>{b.past.length} past · {b.future.length} upcoming</span>
                      <I.arrow/>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      <CTABand/>
    </>
  );
}

function SRPPage() {
  return (
    <>
      <PageHero eyebrow="Summer Research Program" title="Research that goes somewhere."
        blurb="The Summer Research Program (SRP) is our flagship mentored research stream: twelve weeks of structured work with real, portfolio-worthy output and a closing symposium."
        rightSlot={<div style={{display:"grid", gridTemplateColumns:"1fr", gap:12}}>
          <PH label="SRP scholar in the laboratory" src={SITE_PHOTOS.srpHeroWide} aspect="3/2" variant="dark"/>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
            <PH label="Hands-on student research" src={SITE_PHOTOS.srpHeroPoster} aspect="4/3" variant="sage"/>
            <PH label="SRP team presenting outcomes" src={SITE_PHOTOS.srpSpotlight} aspect="4/3"/>
          </div>
        </div>}/>

      <section className="section">
        <div className="container">
          <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"var(--line)", borderRadius:"var(--r-lg)", overflow:"hidden", border:"1px solid var(--line)"}}>
            {[
              [62,"+", "Scholars across cohorts"],
              [40,"+","Final posters"],
              [12,"","Weeks · structured program"],
              [15,"+","Mentor labs"],
            ].map(([n,s,l],i) => (
              <Reveal key={i} delay={i*60} className="stack" style={{padding:"36px 28px", background:"var(--paper)", gap:6}}>
                <div style={{fontFamily:"var(--f-display)", fontSize:"clamp(36px,4.5vw,56px)", fontWeight:900, color:"var(--g900)", lineHeight:1}}>
                  <Counter to={n}/>{s}
                </div>
                <div style={{color:"var(--mute)", fontSize:13}}>{l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Twelve weeks, four milestones."/>
          <div className="grid" style={{gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:40}}>
            {[
              ["Weeks 1–3", "Onboarding", "Matching, literature review, and methods foundations."],
              ["Weeks 4–6", "Research core", "Guided data collection, analysis, and mentor checkpoints."],
              ["Weeks 7–9", "Drafting", "Poster and manuscript drafts with structured feedback."],
              ["Weeks 10–12", "Symposium", "Final showcase and peer-reviewed M4Y publication pipeline."],
            ].map(([w,t,d], i) => (
              <Reveal key={i} delay={i*70} className="card" style={{padding:28}}>
                <div className="mono" style={{color:"var(--g800)"}}>{w}</div>
                <h3 style={{fontSize:20, marginTop:10}}>{t}</h3>
                <p style={{fontSize:14, color:"var(--ink2)", marginTop:8}}>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap:32, flexWrap:"wrap"}}>
            <SectionHead eyebrow="Past papers" title="A sample of student research output."/>
            <Link to="/programs" className="btn btn-ghost">Programs hub <I.arrow className="arr"/></Link>
          </div>
          <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:36}}>
            {PAPERS.map((p, i) => (
              <Reveal key={i} delay={i*50} className="card" style={{padding:28, display:"flex", flexDirection:"column", gap:12, minHeight:240}}>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <span className="pill sage">{p.type}</span>
                  <span className="mono" style={{color:"var(--mute)"}}>#{String(i+1).padStart(3,"0")}</span>
                </div>
                <h3 style={{fontSize:18, marginTop:"auto"}}>{p.t}</h3>
                <div style={{fontSize:13, color:"var(--mute)"}}>{p.auth}</div>
                <div style={{display:"flex", gap:8, marginTop:8}}>
                  <span className="pill"><I.ext/> PDF</span>
                  <span className="pill">Cite</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Apply to SRP 2026" sub="Applications open seasonally; eligibility and timelines are on our intake forms." primary={["Start Application", "/join"]} secondary={["Read FAQ","/about"]}/>
    </>
  );
}

function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="Partners" title="A premium partner ecosystem."
        blurb="Member discount codes from our chapter sponsorship agreements are listed on each card below. Partners without a code focus on workshops, training, fairs, or in-kind programming; details are in the card copy."/>
      <section className="section">
        <div className="container">
          <div className="grid" style={{gridTemplateColumns:"repeat(2,1fr)", gap:16}}>
            {SPONSORS.map((s, i) => (
              <Reveal key={s.name} delay={i*40} className="card" style={{padding:28}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:20}}>
                  <div style={{flex:1}}>
                    <div className="mono" style={{color:"var(--g800)"}}>{s.category}</div>
                    <h3 style={{fontSize:24, marginTop:8}}>{s.name}</h3>
                    <p style={{color:"var(--ink2)", fontSize:15, marginTop:10}}>{s.benefit}</p>
                  </div>
                  <div style={{width:112, minWidth:112, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:"#fff", borderRadius:14, border:"1px solid var(--line)", padding:"10px 12px", minHeight:88}}>
                    {s.logo ? (
                      <img src={s.logo} alt={`${s.name} logo`} loading="lazy" decoding="async" style={{maxWidth:"100%", maxHeight:68, width:"auto", height:"auto", objectFit:"contain"}} />
                    ) : (
                      <PH label={`${s.name} logo`} aspect="1/1" style={{width:72, borderRadius:10}} />
                    )}
                  </div>
                </div>
                {s.code ? (
                  <div style={{marginTop:20, padding:"14px 18px", borderRadius:12, background:"var(--g50)", border:"1px dashed var(--g300)", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:11, color:"var(--mute)", letterSpacing:"0.08em", textTransform:"uppercase"}}>Member code</div>
                      <div style={{fontFamily:"var(--f-mono)", fontWeight:700, fontSize:16, color:"var(--g900)", marginTop:2}}>{s.code}</div>
                    </div>
                    <button type="button" className="btn btn-sm btn-ghost" onClick={()=>navigator.clipboard?.writeText(s.code)}>Copy</button>
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background:"var(--g900)", color:"#fff"}}>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:48, alignItems:"center"}}>
          <div>
            <span className="eyebrow" style={{color:"var(--g300)"}}>Become a partner</span>
            <h2 style={{color:"#fff", marginTop:12}}>Reach a national community of pre-health students.</h2>
            <p style={{color:"#c3d2c7", fontSize:17, marginTop:14, maxWidth:520}}>We work with trusted partners across admissions, test prep, research, and community. If you'd like to sponsor or co-host, tell us more.</p>
            <Link to="/contact" className="btn btn-cream" style={{marginTop:24}}>Partnership Inquiry <I.arrow className="arr"/></Link>
          </div>
          <div className="stack" style={{gap:12}}>
            {[
              ["Category exclusivity", "Be the sole partner in your category within M4Y programs."],
              ["Workshop co-hosting", "Run branded sessions inside SRP or chapter programming."],
              ["Member benefits", "Offer codes and perks to our vetted member base."],
            ].map(([a,b], i) => (
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

function ChaptersPage() {
  return (
    <>
      <PageHero eyebrow="Chapters" title="M4Y on campuses across Canada." blurb="Our university chapter network spans institutions from coast to coast, with room to grow as students bring M4Y to new schools."/>
      <section className="section" style={{paddingTop:48}}>
        <div className="container">
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:24, marginBottom:32}}>
            <div>
              <div className="mono" style={{color:"var(--g800)"}}>Active network</div>
              <h2 style={{fontSize:"clamp(26px, 3vw, 34px)", marginTop:8, marginBottom:0}}>{CHAPTERS.length} chapters</h2>
              <p style={{fontSize:15, color:"var(--ink2)", marginTop:10, maxWidth:520, marginBottom:0}}>
                Post-secondary chapters run local events, fundraisers, and workshops under the Medicine4Youth umbrella.
              </p>
            </div>
            <Link to="/join" className="btn btn-primary">Start a chapter <I.arrow className="arr"/></Link>
          </div>
          <div
            className="chapters-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.city} delay={Math.min(i * 22, 280)} className="card" style={{
                padding: "22px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minHeight: 130,
                justifyContent: "space-between",
              }}>
                <div style={{display: "flex", gap: 14, alignItems: "flex-start"}}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "var(--g100)",
                    border: "1px solid var(--line2)",
                    display: "grid",
                    placeItems: "center",
                    color: "var(--g800)",
                    flexShrink: 0,
                  }}>
                    <I.pin/>
                  </div>
                  <div style={{minWidth: 0}}>
                    <div style={{fontWeight: 800, fontSize: 16, color: "var(--g900)", lineHeight: 1.3}}>{c.city}</div>
                    <div style={{fontSize: 12, color: "var(--mute)", marginTop: 6}}>{c.type}</div>
                  </div>
                </div>
                <span className={"pill " + (c.status === "Active" ? "sage" : "deep")} style={{alignSelf: "flex-start"}}>{c.status}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100} className="card" style={{
            marginTop: 36,
            padding: "28px 32px",
            background: "linear-gradient(135deg, var(--g50), #fff)",
            border: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}>
            <div style={{maxWidth: 520}}>
              <h3 style={{margin: 0, fontSize: 20, color: "var(--g900)"}}>Branches &amp; national programs</h3>
              <p style={{fontSize: 14, color: "var(--ink2)", marginTop: 10, marginBottom: 0, lineHeight: 1.55}}>
                Chapters are campus-based; specialty branches (Neuro, Surgery, Charity4Youth, and more) run cross-Canada programming. Explore both to find your fit.
              </p>
            </div>
            <div style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
              <Link to="/branches" className="btn btn-primary">Explore branches <I.arrow className="arr"/></Link>
              <Link to="/programs" className="btn btn-ghost">Programs</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{background:"var(--g100)"}}>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1.3fr", gap:48, alignItems:"center"}}>
          <SectionHead eyebrow="Start a chapter" title="We send the playbook. You send the students."/>
          <div className="stack" style={{gap:14}}>
            {[
              ["01","Submit interest","Tell us about your school, team, and why now."],
              ["02","Intake call","30-min call with central team + brand kit + playbook."],
              ["03","Launch","Go live with your first event within 60 days."],
            ].map(([n,t,d], i) => (
              <div key={i} className="card" style={{padding:22, display:"grid", gridTemplateColumns:"56px 1fr", gap:20, alignItems:"center"}}>
                <div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:32, color:"var(--g500)"}}>{n}</div>
                <div>
                  <div style={{fontWeight:800, color:"var(--g900)"}}>{t}</div>
                  <div style={{fontSize:14, color:"var(--ink2)"}}>{d}</div>
                </div>
              </div>
            ))}
            <Link to="/join" className="btn btn-primary" style={{marginTop:12, alignSelf:"flex-start"}}>Submit Chapter Interest <I.arrow className="arr"/></Link>
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
        <div className="container" style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16}}>
          {[
            { t:"Pre-Med Application Guide", tag:"Guide" },
            { t:"Research Methods Primer", tag:"Guide" },
            { t:"SRP Scholar Posters (Cohort '25)", tag:"Archive" },
            { t:"Interview Prep: MMI", tag:"Guide" },
            { t:"Branch Brand Kit", tag:"Chapter Kit" },
            { t:"Event Planning Playbook", tag:"Chapter Kit" },
            { t:"Neuroscience4Youth Reading List", tag:"Reading List" },
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

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Join · Contact" title="Let's build something together." blurb="Become a general member, apply to the team, or get in touch. We reply fast."/>
      <section className="section">
        <div className="container" style={{display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:48, alignItems:"start"}}>
          <div className="card" style={{padding:40}}>
            <span className="eyebrow">General Membership · Google Form</span>
            <h2 style={{marginTop:12, fontSize:36}}>Become a member.</h2>
            <p style={{color:"var(--ink2)", marginTop:10}}>Fill out the short form. We will add you to our newsletter, invite you to member events, and send sponsor codes.</p>
            <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:14, marginTop:28}}>
              <div className="field"><label>First name</label><input placeholder="Anita"/></div>
              <div className="field"><label>Last name</label><input placeholder="Lastname"/></div>
              <div className="field" style={{gridColumn:"span 2"}}><label>Email</label><input placeholder="you@school.edu"/></div>
              <div className="field"><label>School / Institution</label><input placeholder="University of Toronto"/></div>
              <div className="field"><label>Grade / Year</label><select><option>Grade 11</option><option>Grade 12</option><option>Undergrad Yr 1</option><option>Undergrad Yr 2+</option><option>Graduate</option></select></div>
              <div className="field" style={{gridColumn:"span 2"}}><label>Interests</label>
                <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                  {["Mentorship","SRP","Neuroscience","Psychology","Dentistry","Pharmacy","BioEng","Optometry","Charity","Endopath","Rehab","Surgery","Chapter Lead"].map(x => (
                    <label key={x} style={{display:"inline-flex", gap:6, alignItems:"center", padding:"8px 12px", border:"1px solid var(--line)", borderRadius:999, fontSize:13, cursor:"pointer"}}>
                      <input type="checkbox"/> {x}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-lg" style={{marginTop:24}}>Submit Form <I.arrow className="arr"/></button>
            <div style={{fontSize:12, color:"var(--mute)", marginTop:14}}>This placeholder embeds a Google Form on launch, wired to the M4Y intake sheet.</div>
          </div>
          <div className="stack" style={{gap:16}}>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Email</h3>
              <a href="mailto:Presidents@medicine4youth.ca" className="link-underline" style={{color:"var(--g800)", display:"inline-flex", gap:8, alignItems:"center", marginTop:8}}><I.mail/> Presidents@medicine4youth.ca</a>
            </div>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Socials</h3>
              <div style={{display:"flex", gap:10, marginTop:12, flexWrap:"wrap"}}>
                <a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="pill"><I.inst/> @medicine4youth</a>
                <a href="https://www.linkedin.com/company/medicine4youth/" target="_blank" rel="noreferrer" className="pill"><I.link/> LinkedIn</a>
              </div>
            </div>
            <div className="card" style={{padding:28, background:"var(--g50)"}}>
              <h3 style={{fontSize:20}}>Apply to the Team</h3>
              <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>We open roles across operations, design, research, branches, and outreach.</p>
              <a href="https://forms.gle/" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{marginTop:14}}>See Open Roles <I.arrow className="arr"/></a>
            </div>
            <div className="card" style={{padding:28}}>
              <h3 style={{fontSize:20}}>Linktree</h3>
              <p style={{color:"var(--ink2)", fontSize:14, marginTop:8}}>One link for all our current opportunities, forms, and events.</p>
              <a href="https://linktr.ee/medicine4youth" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{marginTop:14}}><I.ext/> linktr.ee/medicine4youth</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { AboutPage, ProgramsPage, BranchesPage, SRPPage, SponsorsPage, ChaptersPage, ResourcesPage, ContactPage });
