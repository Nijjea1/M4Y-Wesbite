/* Homepage */

/* 3 PQRST complexes in a 1600×200 viewBox — midline at y=100 */
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

function ECGLine({ hovered, cursor }) {
  const [bpm, setBpm] = useState(72);

  useEffect(() => {
    if (!hovered) return;
    const id = setInterval(() => setBpm(68 + Math.floor(Math.random() * 8)), 900);
    return () => clearInterval(id);
  }, [hovered]);

  const color = hovered ? "#4ade80" : "var(--g500)";
  const strokeW = hovered ? 2.8 : 2;

  return (
    <div className="ecg-hero-container">
      {/* Scrolling ECG track */}
      <div
        className={"ecg-track" + (hovered ? " ecg-hovered" : "")}
        style={{ animationDuration: hovered ? "14s" : "36s" }}
      >
        {[0, 1].map(k => (
          <svg
            key={k}
            viewBox="0 0 1600 200"
            width="1600"
            height="320"
            preserveAspectRatio="none"
            style={{ flexShrink: 0, display: "block" }}
          >
            <path
              d={ECG_PATH_LARGE}
              stroke={color}
              strokeWidth={strokeW}
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke .4s ease, stroke-width .3s ease" }}
            />
          </svg>
        ))}
      </div>

      {/* Interactive overlays — only when hovered */}
      {hovered && cursor && (
        <>
          {/* Radial spotlight */}
          <div
            className="ecg-spotlight"
            style={{ left: cursor.x, top: cursor.y }}
          />
          {/* Live monitor readout */}
          <div className="ecg-monitor">
            <div className="ecg-monitor-bpm">{bpm}</div>
            <div className="ecg-monitor-label">BPM · Sinus Rhythm</div>
          </div>
        </>
      )}
    </div>
  );
}

function Hero() {
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  function onMouseMove(e) {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
    >
      <div className="hero-bg"/>
      <div className="hero-grid"/>
      <ECGLine hovered={hovered} cursor={cursor}/>
      <div className="container hero-in" style={{ position: "relative", zIndex: 2 }}>
        <div style={{display:"grid", gridTemplateColumns:"1.25fr 1fr", gap:56, alignItems:"center"}}>
          <div className="stack" style={{gap:22}}>
            <img className="hero-brand-logo" src={ORG_LOGO} alt="Medicine4Youth official logo showing a heartbeat pulse" width={64} height={64} decoding="async" />
            <div className="est-badge">
              <span style={{width:6,height:6,borderRadius:"50%",background:"var(--g500)",display:"inline-block"}}/>
              Est. 2020
            </div>
            <span className="eyebrow">CRA-registered Canadian not-for-profit</span>
            <h1>
              Empowering the next generation of{" "}
              <span style={{fontStyle:"italic", fontWeight:500, color:"var(--g600)"}}>healthcare</span> leaders.
            </h1>
            <p style={{fontSize:18, color:"var(--ink2)", maxWidth:620}}>
              Medicine4Youth is a student-led not-for-profit connecting aspiring medical, research, and
              allied-health students with mentorship, education, and a global community of chapters
              and branches.
            </p>
            <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
              <Link to="/join" className="btn btn-lg btn-primary" style={{padding:"16px 28px"}}>Become a Member <I.arrow className="arr"/></Link>
              <Link to="/branches" className="btn btn-lg btn-ghost" style={{padding:"16px 24px"}}>Explore Branches</Link>
            </div>
            <div style={{display:"flex", gap:34, marginTop:4, flexWrap:"wrap", color:"var(--mute)", fontSize:12.5}}>
              <span>Registered with the Canada Revenue Agency</span>
              <span>University chapters across Canada</span>
            </div>
          </div>
          <div style={{position:"relative", minHeight:460}}>
            <div style={{
              position:"absolute", right:0, top:20, width:"92%", height:"78%",
              borderRadius:24, background:"linear-gradient(180deg,#e7f4d8,#dff0cd)", border:"1px solid #d4e8bf"
            }}/>
            <div style={{position:"absolute", inset:0}}>
              <PH label="Student conducting mentored laboratory research" src={SITE_PHOTOS.heroMain} aspect="4/5" style={{
                position:"absolute", right:22, top:0, width:"66%", borderRadius:22, boxShadow:"var(--sh-2)"
              }}/>
              <PH label="Chapter members hosting a campus bake sale fundraiser" src={SITE_PHOTOS.heroCommunity} aspect="4/3" style={{
                position:"absolute", left:0, bottom:42, width:"48%", borderRadius:18, boxShadow:"var(--sh-2)"
              }}/>
              <PH label="Medicine4Youth leaders collaborating at a campus workspace" src={SITE_PHOTOS.heroLeaders} aspect="4/5" style={{
                position:"absolute", right:34, bottom:0, width:"34%", borderRadius:18, boxShadow:"var(--sh-2)"
              }}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const projects = [
    {
      tag: "Hackathon",
      tagAccent: true,
      title: "Bioengineering Hackathon",
      subtitle: "Biohacks",
      desc: "Our flagship bioengineering hackathon brings students together to design and prototype solutions to real-world health challenges — hardware, software, and everything in between. Teams pitch to a panel of clinicians and engineers for prizes and mentorship.",
      cta: "Visit Biohacks",
      href: "https://bio-eng4-youth-ijat.vercel.app/",
      external: true,
      stat1: ["48h", "Hackathon"],
      stat2: ["Teams", "Multi-discipline"],
      color: "rgba(16,80,104,.85)",
      accent: "#3ec8f0",
    },
    {
      tag: "Branch",
      tagAccent: false,
      title: "Charity for Youth",
      subtitle: "Charity4Youth",
      desc: "Community engagement, advocacy, and tangible social impact. Charity4Youth mobilizes our members to lead fundraisers, volunteer initiatives, and outreach programs that serve underserved populations across Canada.",
      cta: "Explore the branch",
      href: "/branches/charity",
      external: false,
      stat1: ["Local", "Chapters"],
      stat2: ["Fundraisers", "& Drives"],
      color: "rgba(120,30,30,.8)",
      accent: "#f4a0a0",
    },
    {
      tag: "Upcoming",
      tagAccent: false,
      title: "SRP Research Symposium",
      subtitle: "Annual Symposium · Aug 2026",
      desc: "The closing showcase for our Summer Research Program cohort. Scholars present their mentored research through posters and lightning talks to an audience of clinicians, faculty, and peers — then move into the M4Y publication pipeline.",
      cta: "Learn about SRP",
      href: "/srp",
      external: false,
      stat1: ["Aug 22", "2026"],
      stat2: ["Hybrid", "Event"],
      color: "rgba(30,60,45,.9)",
      accent: "#a8dba0",
    },
  ];

  return (
    <section className="featured-projects-section">
      <div className="container">
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", gap:24, flexWrap:"wrap", marginBottom:44}}>
          <div>
            <span className="eyebrow" style={{color:"var(--g300)"}}>Major endeavors</span>
            <h2 style={{color:"#fff", marginTop:12}}>What we're building right now.</h2>
          </div>
          <Link to="/programs" className="btn btn-ghost" style={{color:"rgba(255,255,255,.8)", borderColor:"rgba(255,255,255,.2)"}}>All programs <I.arrow className="arr"/></Link>
        </div>
        <div className="featured-grid" style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20}}>
          {projects.map((p, i) => (
            <Reveal key={i} delay={i*80} className="featured-card" style={{display:"flex", flexDirection:"column"}}>
              <div style={{
                height:160, background:p.color, display:"flex", alignItems:"flex-end",
                padding:"24px", position:"relative", overflow:"hidden",
              }}>
                <div style={{
                  position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%",
                  background:p.accent, opacity:.15,
                }}/>
                <div style={{
                  position:"absolute", bottom:-30, left:-30, width:160, height:160, borderRadius:"50%",
                  border:`1px solid ${p.accent}`, opacity:.2,
                }}/>
                <span className={`featured-card-badge${p.tagAccent?" accent":""}`}>{p.tag}</span>
              </div>
              <div style={{padding:"28px 26px", display:"flex", flexDirection:"column", gap:12, flex:1}}>
                <div>
                  <div style={{fontFamily:"var(--f-mono)", fontSize:10.5, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.45)", marginBottom:6}}>{p.subtitle}</div>
                  <h3 style={{color:"#fff", fontSize:"clamp(18px,1.6vw,22px)", lineHeight:1.15}}>{p.title}</h3>
                </div>
                <p style={{color:"rgba(255,255,255,.62)", fontSize:14, lineHeight:1.58, flex:1}}>{p.desc}</p>
                <div style={{display:"flex", gap:16, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.1)"}}>
                  {[p.stat1, p.stat2].map(([a,b], si) => (
                    <div key={si}>
                      <div style={{fontFamily:"var(--f-display)", fontWeight:900, fontSize:18, color:"#fff", lineHeight:1}}>{a}</div>
                      <div style={{fontSize:11, color:"rgba(255,255,255,.4)", marginTop:2}}>{b}</div>
                    </div>
                  ))}
                </div>
                <div style={{paddingTop:4}}>
                  {p.external ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{color:"rgba(255,255,255,.8)", borderColor:"rgba(255,255,255,.2)"}}>
                      {p.cta} <I.ext/>
                    </a>
                  ) : (
                    <Link to={p.href} className="btn btn-ghost btn-sm" style={{color:"rgba(255,255,255,.8)", borderColor:"rgba(255,255,255,.2)"}}>
                      {p.cta} <I.arrow className="arr"/>
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  const stats = [
    { n: 23, s: "", l: "University chapters", sub: "Across Canada" },
    { n: 10, s: "", l: "Specialty branches", sub: "Neuro · Psych · Dent · Pharm · BioEng · Optom · Charity · Endopath · Rehab · Surg" },
    { n: 62, s: "+", l: "SRP scholars", sub: "Over summer cohorts" },
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
              <div style={{fontWeight:700, fontSize:15, color:"var(--ink)"}}>{st.l}</div>
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
    { i:"spark", t:"Mentorship", d:"1-to-1 and cohort-based mentorship pairing students with clinicians and senior mentees across Canada." },
    { i:"flask", t:"Research", d:"Our Summer Research Program places students in mentored research with real, portfolio-worthy output." },
    { i:"pin", t:"Chapters", d:"Local post-secondary chapters run events, fundraisers, and workshops under the M4Y umbrella." },
    { i:"cal", t:"Programs & Events", d:"The Healthcare Bowl, Healthcare Horizons, the Philippines tutoring project, and more — all on one page." },
  ];
  return (
    <section className="section" style={{background:"var(--paper)", borderBlock:"1px solid var(--line)"}}>
      <div className="container">
        <div style={{display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:60, alignItems:"start"}}>
          <SectionHead eyebrow="What we do" title="Four pillars, one ecosystem." blurb="We build the scaffolding students need to turn curiosity into a career in medicine — end to end."/>
          <div className="grid" style={{gridTemplateColumns:"1fr 1fr", gap:16}}>
            {items.map((it, i) => {
              const Ic = I[it.i];
              return (
                <Reveal key={i} delay={i*60} className="card" style={{padding:26}}>
                  <div style={{width:44,height:44,borderRadius:12,background:"var(--g100)",display:"grid",placeItems:"center",color:"var(--g800)",marginBottom:18}}><Ic/></div>
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
    { t:"Become a Member", d:"Join as a general member. Get newsletters, event invites, and early access to programs and sponsor codes.", cta:"Join via Form", to:"/join", tag:"Google Form" },
    { t:"Apply to SRP", d:"Our 12-week Summer Research Program places students in mentored research ending in a symposium and publication.", cta:"See SRP", to:"/srp", tag:"Flagship" },
    { t:"Start a Chapter", d:"Lead M4Y at your school or campus. We provide the playbook, brand kit, and launch support — you bring the students.", cta:"Chapter Interest", to:"/chapters", tag:"Leadership" },
    { t:"Team Applications", d:"Join the national team: operations, design, research, outreach, branch leads, and more. Open on a rolling basis.", cta:"Open Roles", to:"/join", tag:"Core Team" },
  ];
  return (
    <section className="section">
      <div className="container">
        <SectionHead eyebrow="Opportunities" title="Real paths in — not just a sign-up page." blurb="Every meaningful way to get involved with Medicine4Youth, in one place."/>
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
            {loopedBranches.map((b, i) => (
              <Reveal key={`${b.slug}-${i}`} delay={Math.min(i, BRANCHES.length - 1) * 55} className="branch-carousel-item">
                <Link to={"/branches/"+b.slug} className="card branch-card" data-branch={b.slug} style={{display:"block", padding:"32px 30px", height:"100%", minHeight:250}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <BranchMark branch={b} size={56} />
                    <I.arrow />
                  </div>
                  <h3 style={{marginTop:24, fontSize:28, lineHeight:1.08}}>{b.name}</h3>
                  <p style={{color:"var(--ink2)", fontSize:15, marginTop:10, maxWidth:340}}>{b.tagline}</p>
                  <div style={{marginTop:22, height:1, background:"var(--line)"}}/>
                  <div style={{marginTop:15, display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--mute)"}}>
                    <span>{b.past.length} past events</span>
                    <span>{b.future.length} upcoming</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="branch-carousel-mobile" style={{marginTop:28}}>
          <div className="grid" style={{gridTemplateColumns:"1fr", gap:16}}>
            {BRANCHES.map((b, i) => (
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
            ))}
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
          <Link to="/programs" className="btn btn-ghost">View all programs <I.arrow className="arr"/></Link>
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
                ["12 weeks","Structured curriculum"],
                ["62+","Students placed"],
                ["1:1","Mentor pairings"],
                ["Symposium","Closing showcase"],
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

function InstagramFeed() {
  const posts = [
    { src: SITE_PHOTOS.heroCommunity, likes: 312, caption: "Our Windsor chapter running a bake sale fundraiser for the community 🍰", tag: "Community" },
    { src: SITE_PHOTOS.srpSpotlight, likes: 284, caption: "SRP scholars presenting at the 2025 Research Symposium 🔬", tag: "Research" },
    { src: SITE_PHOTOS.aboutTeam, likes: 198, caption: "McMaster chapter team photo — proud of everyone showing up 💚", tag: "Chapter" },
    { src: SITE_PHOTOS.aboutPrograms, likes: 241, caption: "Workshop day with our Healthcare Horizons panel guests 📚", tag: "Events" },
    { src: SITE_PHOTOS.srpHeroWide, likes: 376, caption: "Clinical skills training with our partners at IMSF 🩺", tag: "Programs" },
    { src: SITE_PHOTOS.srpHeroPoster, likes: 159, caption: "Lab hands-on with SRP mentors — science is fun when it's real 🧬", tag: "SRP" },
    { src: SITE_PHOTOS.heroLeaders, likes: 203, caption: "Behind the scenes with the M4Y leadership team 🤝", tag: "Team" },
    { src: SITE_PHOTOS.eventsFeaturedBowl, likes: 322, caption: "Healthcare Bowl team collaboration — case season is heating up 📋", tag: "Bowl" },
  ];

  return (
    <section className="section ig-section">
      <div className="container" style={{marginBottom:28}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"end", gap:24, flexWrap:"wrap"}}>
          <SectionHead
            eyebrow="@medicine4youth"
            title="The community in motion."
            blurb="Follow along on Instagram for chapter events, SRP updates, and behind-the-scenes moments."
          />
          <a href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="btn btn-ghost">
            <I.inst/> Follow us
          </a>
        </div>
      </div>
      <div className="ig-scroll-outer">
        <div className="ig-scroll-track">
          {posts.map((p, i) => (
            <a key={i} href="https://www.instagram.com/medicine4youth/" target="_blank" rel="noreferrer" className="ig-post-card" style={{textDecoration:"none"}}>
              <PH label={p.caption} src={p.src} aspect="1/1" style={{borderRadius:0, borderBottom:"1px solid var(--line)"}}/>
              <div style={{padding:"12px 14px"}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
                  <span className="pill sage" style={{fontSize:10.5, padding:"4px 9px"}}>{p.tag}</span>
                  <div style={{display:"flex", gap:5, alignItems:"center", color:"var(--mute)", fontSize:12}}>
                    <I.heart2 style={{color:"#e0575a"}}/> {p.likes}
                  </div>
                </div>
                <p style={{fontSize:12.5, color:"var(--ink2)", lineHeight:1.5, margin:0, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"}}>{p.caption}</p>
              </div>
            </a>
          ))}
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
    { q:"Starting a chapter was way less daunting than I expected. The playbook is solid and the central team actually shows up.", n:"Devon R.", r:"Chapter Lead · McMaster" },
    { q:"I was choosing between pre-med and engineering. Neuroscience4Youth is the reason I'm doing both.", n:"Lena K.", r:"1st year · McGill" },
  ];
  return (
    <section className="section" style={{background:"var(--g100)"}}>
      <div className="container">
        <SectionHead eyebrow="From the community" title="What students actually say." align="center"/>
        <div className="grid" style={{gridTemplateColumns:"repeat(3,1fr)", gap:16, marginTop:40}}>
          {quotes.map((t, i) => (
            <Reveal key={i} delay={i*80} className="card" style={{padding:30, display:"flex", flexDirection:"column", gap:18}}>
              <div style={{fontFamily:"var(--f-display)", fontSize:56, lineHeight:0.6, color:"var(--g500)"}}>"</div>
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
      <FeaturedProjects/>
      <ImpactStats/>
      <WhatWeDo/>
      <BranchesShowcase/>
      <EventsPreview/>
      <SRPSpotlight/>
      <InstagramFeed/>
      <SponsorsTicker/>
      <Testimonials/>
      <CTABand/>
    </>
  );
}

Object.assign(window, { HomePage });
