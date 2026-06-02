/* App root + router switch */

/* ============================================================
   ERROR BOUNDARY
   ============================================================ */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { console.error("M4Y ErrorBoundary caught:", err, info); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center", background:"var(--cream)"}}>
        <img src="./assets/medicine4youth-logo.png" alt="Medicine4Youth logo" width={64} height={64} style={{borderRadius:"50%", marginBottom:24}}/>
        <h1 style={{fontSize:"clamp(28px,4vw,40px)", color:"var(--ink)"}}>Something went wrong.</h1>
        <p style={{color:"var(--ink2)", marginTop:12, maxWidth:400}}>Please refresh the page. If the problem persists, contact us at Presidents@medicine4youth.ca</p>
        <button
          className="btn btn-primary"
          style={{marginTop:28}}
          onClick={() => window.location.reload()}
        >
          Refresh page
        </button>
      </div>
    );
  }
}

/* ============================================================
   ROUTE → META MAPPING
   ============================================================ */
const ROUTE_META = {
  "/":         { title:"Medicine4Youth | Student-Led Medical Education",        description:"Medicine4Youth is a Canadian nonprofit empowering youth through accessible medical education, research programs, and specialty healthcare branches." },
  "/about":    { title:"About | Medicine4Youth",                                description:"Learn about Medicine4Youth — a CRA-registered Canadian nonprofit founded by students, mentored by clinicians." },
  "/programs": { title:"Programs | Medicine4Youth",                             description:"Summer Research Program, Healthcare Bowl, Healthcare Horizons, and more — every M4Y program in one place." },
  "/branches": { title:"Branches | Medicine4Youth",                             description:"Nine specialty branches spanning neuroscience, dentistry, pharmacy, surgery, optometry, and more." },
  "/srp":      { title:"Summer Research Program | Medicine4Youth",              description:"A 12-week mentored research program with real outputs, a closing symposium, and a publication pipeline." },
  "/sponsors": { title:"Sponsors & Partners | Medicine4Youth",                  description:"Member discount codes and partner benefits from Medicine4Youth's sponsor network." },
  "/chapters": { title:"Chapters | Medicine4Youth",                             description:"University chapters across Canada. Find yours or start one at your institution." },
  "/contact":  { title:"Join & Contact | Medicine4Youth",                       description:"Become a Medicine4Youth member, apply to a chapter, or get in touch with the team." },
  "/join":     { title:"Join & Contact | Medicine4Youth",                       description:"Become a Medicine4Youth member, apply to a chapter, or get in touch with the team." },
};
const OG_IMAGE = "https://medicine4youth.ca/assets/medicine4youth-logo.png";
const SITE_URL = "https://medicine4youth.ca";

/* ============================================================
   APP
   ============================================================ */
function App() {
  const { route, go } = useRoute();

  React.useEffect(() => {
    if (route === "/ssrp") go("/srp");
    if (route === "/events") go("/programs");
    if (route === "/resources") go("/programs");
  }, [route, go]);

  /* SEO meta */
  const meta = ROUTE_META[route] || ROUTE_META["/"];
  const canonicalPath = route === "" ? "/" : route;

  /* BioEng external redirect with loading screen */
  const [redirecting, setRedirecting] = React.useState(false);

  let page;
  if (route === "/" || route === "") page = <HomePage/>;
  else if (route === "/about") page = <AboutPage/>;
  else if (route === "/programs") page = <ProgramsPage/>;
  else if (route === "/branches") page = <BranchesPage/>;
  else if (route.startsWith("/branches/")) {
    const slug = route.split("/")[2];
    const branch = BRANCHES.find(b => b.slug === slug);
    if (branch && branch.externalUrl) {
      if (!redirecting) {
        setRedirecting(true);
        setTimeout(() => { window.location.replace(branch.externalUrl); }, 600);
      }
      page = (
        <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:20, background:"var(--cream)"}}>
          <img src="./assets/medicine4youth-logo.png" alt="Medicine4Youth logo" width={56} height={56} style={{borderRadius:"50%", opacity:.85}}/>
          <p style={{color:"var(--ink2)", fontFamily:"var(--f-mono)", fontSize:13, letterSpacing:".06em", textTransform:"uppercase"}}>Redirecting to {branch.name}…</p>
        </div>
      );
    } else {
      if (redirecting) setRedirecting(false);
      page = <BranchPage slug={slug}/>;
    }
  }
  else if (route === "/events") page = <ProgramsPage/>;
  else if (route === "/srp" || route === "/ssrp") page = <SRPPage/>;
  else if (route === "/sponsors") page = <SponsorsPage/>;
  else if (route === "/chapters") page = <ChaptersPage/>;
  else if (route === "/contact" || route === "/join") page = <ContactPage/>;
  else page = (
    <PageHero
      eyebrow="404"
      title="Page not found."
      blurb="The page you're looking for doesn't exist. Head back home and find what you need."
    />
  );

  return (
    <ErrorBoundary>
      <GlobalStyles/>
      <MetaTags
        title={meta.title}
        description={meta.description}
        ogImage={OG_IMAGE}
        canonicalPath={canonicalPath}
      />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav/>
      <main id="main-content">{page}</main>
      <Footer/>
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider>
    <App/>
  </RouterProvider>
);
