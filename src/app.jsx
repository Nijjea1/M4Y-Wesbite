/* App root + router switch */

function App() {
  const { route, go } = useRoute();

  React.useEffect(() => {
    if (route === "/ssrp") go("/srp");
    if (route === "/events") go("/programs");
    if (route === "/resources") go("/programs");
  }, [route, go]);

  let page;
  if (route === "/" || route === "") page = <HomePage/>;
  else if (route === "/about") page = <AboutPage/>;
  else if (route === "/programs") page = <ProgramsPage/>;
  else if (route === "/branches") page = <BranchesPage/>;
  else if (route.startsWith("/branches/")) {
    const slug = route.split("/")[2];
    const branch = BRANCHES.find(b => b.slug === slug);
    if (branch && branch.externalUrl) {
      window.location.replace(branch.externalUrl);
      page = null;
    } else {
      page = <BranchPage slug={slug}/>;
    }
  }
  else if (route === "/events") page = <ProgramsPage/>;
  else if (route === "/srp" || route === "/ssrp") page = <SRPPage/>;
  else if (route === "/sponsors") page = <SponsorsPage/>;
  else if (route === "/chapters") page = <ChaptersPage/>;
  else if (route === "/contact" || route === "/join") page = <ContactPage/>;
  else page = <div style={{padding:"120px 28px", textAlign:"center"}}>
    <h1>Page not found.</h1>
    <Link to="/" className="btn btn-primary" style={{marginTop:24}}>Back home</Link>
  </div>;

  return (
    <>
      <Nav/>
      <main>{page}</main>
      <Footer/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider>
    <App/>
  </RouterProvider>
);
