/* Organization data */

const BRANCHES = [
  {
    slug: "dentistry",
    name: "Dentistry4Youth",
    short: "D4Y",
    tagline: "Bridging the gap between academic interest and dental school reality - for every aspiring dentist.",
    about:
      "Dentistry4Youth is a student-led initiative dedicated to making the field of dentistry accessible, transparent, and engaging for aspiring dental professionals. As a branch of Medicine4Youth, we empower the next generation of dental students through early exposure, educational resources, and community mentorship.",
    mission:
      "Bridge the gap between academic interest and professional reality. We provide youth with the tools to navigate the dental school application process, understand the diverse pathways to becoming a dentist, and explore the clinical complexities of oral healthcare.",
    past: [
      {
        t: "Beyond Barriers D4Y",
        d: "An international seminar for pre-dental students from high school to university - including Canadian and American applicants. In partnership with OzTREKK and a Canadian student studying in Ireland, we provided firsthand insights into international dental education, career realities, and the experience of studying dentistry abroad.",
        icon: "globe",
        stat: "International Reach",
        tag: "Seminar",
      },
      {
        t: "Virtual Shadowing Event",
        d: "An interactive virtual clinical session featuring a specialized dentist who shared real-world case studies and patient scenarios. With 200+ attendees, students gained a behind-the-scenes look at the variety of cases dentists handle daily - including mid-session MCQs to test diagnostic thinking.",
        icon: "eye",
        stat: "200+ Attendees",
        tag: "Virtual Event",
      },
      {
        t: "Instagram Takeovers",
        d: "Ongoing takeovers on our social media platforms by dental students and professionals, featuring day-in-the-life content and live Q&As. Our community gets a real-time look at dental school life and the diverse specialties within the profession.",
        icon: "inst",
        stat: "Ongoing",
        tag: "Social Media",
      },
    ],
    future: [
      {
        t: "Specialist Virtual Shadowing",
        d: "A specialized panel featuring 2–3 dental specialists who will share why they chose their field, the rigorous academic requirements for residency, and unique clinical insights. Designed to help students understand the diverse career trajectories available beyond general dentistry.",
        when: "May 2026",
      },
    ],
    initiatives: [
      {
        t: "International Dental Education",
        d: "Connecting pre-dental students with pathways to study dentistry internationally - including Ireland, Australia, and other destinations - through partnerships with programs like OzTREKK.",
        tag: "Global",
        icon: "globe",
      },
      {
        t: "Virtual Shadowing Program",
        d: "Live virtual clinical sessions where practicing dentists and specialists walk students through real cases, MCQ challenges, and career Q&As - accessible from anywhere.",
        tag: "Virtual · Ongoing",
        icon: "eye",
      },
      {
        t: "Application & Pathway Advising",
        d: "Resources and mentorship to help students navigate the dental school application process - DAT prep, personal statements, interview prep, and understanding both Canadian and American pathways.",
        tag: "Mentorship",
        icon: "book",
      },
      {
        t: "Specialist Spotlight Series",
        d: "Deep-dive panels with dental specialists across orthodontics, oral surgery, periodontics, and more - exploring what residency really looks like and what makes each specialty unique.",
        tag: "Coming 2026",
        icon: "tooth",
      },
    ],
    icon: "tooth",
    motif: "arc",
    logo: "./assets/branch-logos/dentistry.png",
    panelBg: "#386098",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy4Youth",
    short: "P4Y",
    tagline: "Pharmacy is not just retail - explore clinical practice, oncology, pharma industry, and beyond.",
    about:
      "Pharmacy4Youth bridges the gap between the classroom and the diverse realities of pharmacy practice. From hospital clinical pharmacists to oncology specialists, northern community pharmacists, and roles within pharmaceutical companies, we expose students to the full spectrum of what a pharmacy career can look like - and show them it extends far beyond the retail counter.",
    mission:
      "Break the misconception that pharmacy equals retail. Inspire students to explore the breadth of pharmacy careers - clinical, industrial, research, and community - through real connections with practicing professionals.",
    past: [
      {
        t: "Meet the Pharmacist",
        d: "A Q&A and networking panel featuring pharmacists from clinical pharmacy, pharma companies, oncology, and northern community practice. Students joined live to gain insights into diverse pharmacy careers and network directly with professionals - emphasizing that pharmacy is far more than retail.",
        img: "./assets/pharmacy/meet-pharmacist-cover.png",
        date: "May 28, 2026 · 5–7 PM",
      },
    ],
    future: [
      {
        t: "Case Study Competition",
        d: "Teams are given a real-world healthcare issue and must develop a drug solution - addressing synthesis, FDA/Health Canada approval (NDAs), labelling, clinical trials, marketing, pricing, and commercial strategy. Proposals are judged by professionals from legal, pharma, and research backgrounds.",
        when: "Coming 2026–2027",
      },
    ],
    initiatives: [
      {
        t: "Meet the Pharmacist Series",
        d: "Recurring panels connecting students with pharmacists working in underrepresented and specialized fields - from oncology and clinical hospital settings to northern community practice and global pharma companies.",
        tag: "Recurring · Speaker Series",
        icon: "capsules",
      },
      {
        t: "Case Study Competition",
        d: "An annual innovation challenge where students develop a full drug proposal - from synthesis and clinical trials to regulatory submissions and commercial launch strategy - judged by legal, pharma, and research professionals.",
        tag: "Annual · Coming 2026",
        icon: "flask",
      },
      {
        t: "Pharmacy Career Spotlights",
        d: "Educational content highlighting rarely-discussed pharmacy career paths - oncology pharmacists, pharmaceutical scientists, health policy advisors, and pharmacists serving Indigenous and remote communities.",
        tag: "Ongoing",
        icon: "book",
      },
      {
        t: "Networking & Mentorship",
        d: "Direct access to pharmacist mentors across specialties. Students can ask questions, explore career options, and build professional connections before they graduate.",
        tag: "Ongoing",
        icon: "heart2",
      },
    ],
    posts: [
      {
        title: "Meet the Pharmacist - Event Post",
        desc: "Official event promotion for the Meet the Pharmacist Q&A panel on May 28th, 2026.",
        pdf: "./assets/pharmacy/meet-the-pharmacist.pdf",
        img: "./assets/pharmacy/meet-pharmacist-cover.png",
      },
    ],
    speakers: [
      { role: "Clinical Pharmacist", icon: "capsules" },
      { role: "Pharma Company Professional", icon: "flask" },
      { role: "Oncology Pharmacist", icon: "heart2" },
      { role: "Northern Community Pharmacist", icon: "book" },
    ],
    icon: "capsules",
    motif: "strata",
    logo: "./assets/branch-logos/pharmacy.png",
    panelBg: "#780000",
  },
  {
    slug: "optom",
    name: "Optometry4Youth",
    short: "O4Y",
    tagline: "Empowering the next generation of optometry professionals - from curiosity to clinic.",
    about:
      "Optometry4Youth (O4Y) is a student-led branch of Medicine4Youth based in North America. We are dedicated to empowering youth interested in optometry and vision science by providing accessible education and experiences that spark curiosity and support career exploration. We envision a future where every student with an interest in optometry can confidently pursue their passion, regardless of background or access to resources. Through community, education, and mentorship, we strive to make the path to optometry school more visible, equitable, and empowering for youth at every stage of their journey.",
    mission:
      "Equip and inspire the next generation of optometry professionals by providing accessible resources, personalized support, and meaningful opportunities. We have reached hundreds of students through interactive events, engaging educational content, and community outreach focused on vision health and the path to optometry school.",
    past: [
      {
        t: "Waterloo Optometry Info Panel",
        d: "Moderated Q&A with current University of Waterloo Optometry students who shared their journeys, challenges, and advice for future applicants - giving students real, unfiltered insight into what it takes to get in.",
        img: "./assets/optom/berkeley-admissions.png",
      },
      {
        t: "Virtual Shadowing Event with Dr. Vasudha Rao",
        d: "Students virtually shadowed practicing optometrist Dr. Vasudha Rao, who walked the audience through her daily workflow, career trajectory, and real patient case examples. Participants received a 1-hour shadowing certificate signed by Dr. Rao and the O4Y team.",
        img: "./assets/optom/virtual-shadowing.webp",
      },
    ],
    future: [
      {
        t: "OAT Prep Event",
        d: "Current optometry students walk through each section of the OAT - scoring, competitive benchmarks, study resources, common mistakes, and a sample reading comprehension walkthrough.",
        when: "Coming 2026",
      },
      {
        t: "School Admissions Panel",
        d: "Breakout-style event where representatives from North American optometry schools share program insights, admissions criteria, and campus life. Students rotate through small groups to ask questions about both Canadian and U.S. schools.",
        when: "Coming 2026",
      },
    ],
    initiatives: [
      {
        t: "Glasses Donation Drive",
        d: "In collaboration with 20/20 Mission and M4Y chapters, O4Y places eyeglass donation boxes across Canadian university campuses. Collected glasses are sorted, cleaned, and redistributed to individuals in low-income communities locally and internationally.",
        tag: "Active · Ongoing",
        icon: "heart2",
      },
      {
        t: "Focus Forward Newsletter",
        d: "O4Y's monthly newsletter highlighting recent discoveries in optometry, eye health education, OAT prep tips, ocular disease spotlights, and career features from practicing optometrists.",
        tag: "Monthly",
        icon: "book",
        href: "https://drive.google.com/drive/folders/1HvsfKJZmo66vvsRiTf5Pk8WxOCp5i44Q?usp=sharing",
      },
      {
        t: "Instagram Takeovers",
        d: "Ongoing takeovers by current optometry students and practicing optometrists who walk our audience through a day in their life while answering live questions from followers.",
        tag: "Ongoing",
        icon: "inst",
      },
      {
        t: "Fun Fact Friday Stories",
        d: "Biweekly interactive Instagram stories covering optometry facts, ocular diseases of the week, and vision science highlights - designed to educate and grow our community.",
        tag: "Biweekly",
        icon: "eye",
      },
    ],
    igPosts: [
      { img: "./assets/optom/focus-forward.webp",       caption: "Focus Forward - Issue 01" },
      { img: "./assets/optom/berkeley-admissions.png",  caption: "Berkeley School of Optometry" },
      { img: "./assets/optom/cataracts-fact.png",       caption: "Ocular Disease of the Week: Cataracts" },
      { img: "./assets/optom/geriatric-optometry.png",  caption: "Geriatric Optometry" },
      { img: "./assets/optom/eye-anatomy-basics.png",   caption: "Eye Anatomy Basics Pt. 2" },
    ],
    icon: "eye",
    motif: "concentric",
    logo: "./assets/branch-logos/optom.png",
    panelBg: "#509090",
  },
  {
    slug: "neuro",
    name: "NeuroPsych4Youth",
    short: "NP4Y",
    tagline: "Bridging neuroscience and psychology for the next generation of curious minds - from neural circuits to human behaviour.",
    about:
      "NeuroPsych4Youth is a student-led initiative dedicated to making neuroscience and psychology more accessible, engaging, and relevant for youth. As a branch of Medicine4Youth, we empower the next generation through education, research, innovation, and community support. We bring together the biological, technological, and behavioural sciences behind the brain and mind - exploring mental health, emotional development, human behaviour, neural engineering, brain-computer interfaces, computational neuroscience, and emerging neuroscience technologies.",
    mission:
      "Our mission is to help youth better understand the brain, mind, and human behaviour through accessible education, research opportunities, mentorship, and youth-focused initiatives. We bridge the gap between scientific research and everyday life by promoting psychological literacy, reducing mental health stigma, and exposing students to real-world applications in neuroscience and psychology. Through workshops, competitions, panels, and collaborative events, we equip students with the knowledge and confidence to explore careers in neuroscience, psychology, mental health, research, and health innovation.",
    past: [
      { t: "Research Poster Competition", d: "Students collaborated in teams of 3–4 to create research posters on non-invasive brain stimulation therapies for MDD in low-resource communities. The top three teams had their posters published in the Journal of Young Investigators (JYI).", icon: "book", stat: "Published in JYI", tag: "Competition" },
      { t: "Behind the Brain: Behavioural Neuroscience Panel", d: "A moderated panel featuring professionals in behavioural neuroscience who shared their educational pathways, research experiences, and career insights, including Q&A sessions and discussion on navigating academia and finding research opportunities.", icon: "brain", stat: "Expert Panel", tag: "Seminar" },
      { t: "Psychology Career Panel", d: "A moderated panel featuring professionals from diverse psychology backgrounds discussing academic pathways, career realities, job outlook, financial considerations, and advice for students pursuing psychology-related careers.", icon: "mind", stat: "Multi-Pathway", tag: "Panel" },
      { t: "Disorders Research Infographic Competition", d: "Participants created educational infographics on psychological disorders covering definitions, symptoms, risk factors, and treatment options - building research, communication, and design skills while increasing mental health awareness.", icon: "eye", stat: "Awareness Initiative", tag: "Competition" },
      { t: "Instagram Takeovers", d: "Ongoing takeovers by professionals, researchers, and graduate students in neuroscience, psychology, and mental health. Featuring day-in-the-life content, Q&As, career advice, and insights into academic and professional pathways.", icon: "inst", stat: "Ongoing", tag: "Social Media" },
    ],
    future: [
      { t: "NeuroPsych Research Workshop", d: "An interactive workshop introducing students to key concepts and skills in neuroscience and psychology research - covering finding opportunities, cold-emailing professors, creating research posters, wet and dry lab techniques, and advancements in emerging technologies.", when: "Fall 2026" },
    ],
    focuses: [
      "Mental health awareness & stigma reduction",
      "Behavioural neuroscience & psychology",
      "Brain-based therapies & neurological disorders",
      "Emotional development & human behaviour",
      "Neuroscience research & laboratory skills",
      "Computational neuroscience & coding",
      "Brain-computer interfaces & neural engineering",
      "Career exploration in psychology & neuroscience",
    ],
    icon: "brain",
    motif: "neural-net",
    logo: "./assets/branch-logos/neuro.png",
    panelBg: "#8b5cf6",
  },
  {
    slug: "charity",
    name: "Charity4Youth",
    short: "C4Y",
    tagline: "Healthcare meets heart - fundraising, advocacy, and humanitarian awareness for the next generation.",
    about:
      "Charity4Youth is the humanitarian arm of Medicine4Youth, mobilizing students across campuses to fundraise, volunteer, and advocate for global and local health causes. From campus bake sales to hospital volunteering, C4Y turns student energy into real-world impact.",
    mission:
      "Empower youth to take action - through fundraising, volunteering, and awareness - and show that compassion is a core competency in medicine.",
    past: [
      {
        t: "C4Y x M4Y UofT Bake Sale",
        d: "Multi-day fundraising bake sale on the UofT campus featuring pie-in-the-face, duct-tape-the-teacher, and baked goods. Raised funds for local health charities.",
        img: "./assets/charity/bake-sale-banner.jpg",
        date: "November 2025",
        campus: "University of Toronto",
      },
      {
        t: "C4Y x D4Y UofT Bake Sale",
        d: "Collaboration with Dentistry4Youth for a joint bake sale fundraiser at the University of Toronto, combining dental and medical charity advocacy.",
        img: "./assets/charity/bake-sale-night.jpg",
        date: "November 2025",
        campus: "University of Toronto",
      },
      {
        t: "Charitable Advising for High Schoolers",
        d: "Mentorship and advising sessions helping high school students understand how to get involved in health-related charitable work and volunteering early in their careers.",
        img: null,
        date: "Ongoing",
        campus: "Multi-campus",
      },
      {
        t: "WHO Humanitarian Series",
        d: "Weekly educational post series covering humanitarian crises acknowledged by the World Health Organization - making global health accessible and relevant to students.",
        img: null,
        date: "Ongoing",
        campus: "All campuses",
      },
    ],
    future: [
      {
        t: "Hospital Volunteering",
        d: "Organized volunteer placements at hospitals and healthcare facilities, giving students hands-on exposure to patient care environments while giving back to the community.",
        when: "Coming 2026–2027",
      },
      {
        t: "D4Y Collaboration",
        d: "A joint initiative with Dentistry4Youth combining oral health awareness with charitable fundraising - reaching underserved communities across multiple campuses.",
        when: "Coming 2026–2027",
      },
    ],
    initiatives: [
      {
        t: "WHO Humanitarian Series",
        d: "A weekly post series educating students on WHO-recognized humanitarian crises worldwide - connecting future healthcare professionals to global health realities.",
        tag: "Weekly · Ongoing",
        icon: "globe",
      },
      {
        t: "Campus Bake Sale Program",
        d: "Multi-campus fundraising events at UofT, McGill, UBC, and UWindsor featuring baked goods, fun activities, and community building - all proceeds go to health charities.",
        tag: "Multi-campus",
        icon: "heart2",
      },
      {
        t: "Charitable Advising",
        d: "Direct advising for high school students on how to engage in meaningful charitable work related to healthcare - from volunteering pathways to grant writing basics.",
        tag: "Youth-Focused",
        icon: "book",
      },
      {
        t: "Hospital Volunteering",
        d: "Coordinated volunteer placements in hospitals and clinics, providing students with meaningful community service hours and exposure to real healthcare environments.",
        tag: "Coming 2026",
        icon: "stethoscope",
      },
    ],
    gallery: [
      { src: "./assets/charity/bake-sale-toronto.jpg", caption: "UofT Bake Sale - Toronto skyline" },
      { src: "./assets/charity/bake-sale-banner.jpg", caption: "M4Y UofT Chapter bake sale table" },
      { src: "./assets/charity/bake-sale-night.jpg", caption: "Night bake sale - UofT campus" },
      { src: "./assets/charity/duct-tape-wall.jpg", caption: "Duct-tape fundraiser activity" },
      { src: "./assets/charity/pie-in-face.jpg", caption: "Pie-in-the-face fundraiser" },
      { src: "./assets/charity/baked-goods.jpg", caption: "Baked goods for the sale" },
    ],
    campuses: ["University of Toronto", "McGill University", "UBC", "University of Windsor"],
    icon: "heart2",
    motif: "wave",
    logo: "./assets/branch-logos/charity.png",
    panelBg: "#e04545",
  },
  {
    slug: "bioeng",
    name: "BioEng4Youth",
    short: "BioEng",
    tagline: "Where engineering meets medicine: devices, tissue tech, and biotech.",
    about:
      "BioEng4Youth introduces students to the intersection of engineering and healthcare, exploring innovations like medical devices, tissue engineering, and biotechnology. Through workshops and hands-on learning, students gain insight into how engineering can solve real-world health challenges.",
    mission:
      "Inspire the next wave of engineers solving problems at the frontier of human health.",
    past: [],
    future: [],
    icon: "circuit",
    motif: "editorial",
    logo: "./assets/branch-logos/bioeng.png",
    panelBg: "#105068",
    externalUrl: "https://www.bioeng4youth.ca/",
  },
  {
    slug: "endo",
    name: "EndoPath4Youth",
    short: "EndoPath",
    tagline: "Where endocrinology meets pathology - bridging hormones, disease, and human health.",
    about:
      "EndoPath4Youth sits at the intersection of endocrinology and pathology. We explore how hormonal systems break down, how disease processes unfold at the cellular and molecular level, and what that means for diagnosis and treatment. From the mechanisms of bladder cancer to the science of the endocrine system, we make complex biomedical topics accessible, relevant, and inspiring for the next generation of healthcare professionals.",
    mission:
      "To bridge the gap between foundational science and clinical medicine - empowering youth to understand, discuss, and pursue careers in endocrinology, pathology, microbiology, and immunology.",
    past: [
      {
        t: "Pathology in Practice",
        d: "A speaker bio event featuring Julia Kochanowski - a researcher with a background in forensic science, biology, and clinical & translational science. Julia shared her work on the pathogenesis of human disease, with a focus on the role of Metallothionein-3 (MT-3) in bladder cancer and acute kidney injury (AKI). Attendees gained insight into how molecular biomarkers are shaping our understanding of disease progression.",
        img: "./assets/endo/event-post-1-cover.png",
      },
    ],
    future: [
      {
        t: "Guest Speaker & Career Shadowing Panel",
        d: "An interdisciplinary panel broadening into endocrinology, microbiology, and immunology. Current professionals share their career paths, clinical experiences, and advice for students navigating these specialties.",
        when: "Summer 2026",
      },
      {
        t: "Community Events & Feminine Hygiene Product Drive",
        d: "A campus-based community initiative combining health education with tangible impact - collecting and distributing feminine hygiene products to underserved communities while raising awareness about menstrual health equity.",
        when: "2026–2027 School Year",
      },
    ],
    initiatives: [
      {
        t: "Pathology in Practice Series",
        d: "Monthly speaker events connecting students with researchers and clinicians working in pathology, clinical laboratory science, and translational medicine. Each session dives into a real disease process or diagnostic challenge.",
        tag: "Monthly · Ongoing",
        icon: "flask",
      },
      {
        t: "EndoPath Story Series",
        d: "An ongoing Instagram story series covering topics across endocrinology, pathology, microbiology, and immunology - presented in an engaging, accessible format for students at all levels.",
        tag: "Ongoing",
        icon: "inst",
      },
      {
        t: "Feminine Hygiene Product Drive",
        d: "A community health equity initiative collecting and distributing feminine hygiene products to underserved individuals on and around Canadian university campuses.",
        tag: "Annual",
        icon: "heart2",
      },
      {
        t: "EndoPath Educational Content",
        d: "Regular posts breaking down complex topics in endocrinology and pathology - from how thyroid hormones regulate metabolism to how cancer cells evade immune detection.",
        tag: "Biweekly",
        icon: "book",
      },
    ],
    posts: [
      { title: "The Pathology of Alzheimer's Disease", desc: "A breakdown of the neurodegeneration behind the most common form of dementia - amyloid plaques, tau tangles, and what they mean for diagnosis.", pdf: "./assets/endo/website-post-2.pdf", img: "./assets/endo/post-cover-1.png" },
      { title: "Pathogen Weekly", desc: "A weekly breakdown of infectious disease, microbiology, and immunology - making complex pathogens accessible for students.", pdf: "./assets/endo/website-post-3.pdf", img: "./assets/endo/post-cover-2.png" },
      { title: "Guest Speaker: Julia Kochanowski", desc: "Researcher Julia Kochanowski presents her work on Metallothionein-3 in bladder cancer and acute kidney injury.", pdf: "./assets/endo/event-post-1.pdf", img: "./assets/endo/event-cover-1.png" },
    ],
    icon: "flask",
    motif: "strata",
    logo: "./assets/branch-logos/endo.png",
    panelBg: "#f8c078",
  },
  {
    slug: "rehab",
    name: "Rehab4Youth",
    short: "Rehab",
    tagline: "Movement, recovery, and rehabilitation sciences for real lives.",
    about:
      "Rehab4Youth highlights rehabilitation sciences, including physiotherapy, occupational therapy, and patient recovery. It emphasizes improving quality of life through movement, function, and holistic care.",
    mission:
      "Connect youth with how rehabilitation restores independence and dignity.",
    past: [
      { t: "Rehab Careers Panel", d: "Physiotherapists, OTs, and SLPs share day-in-the-life experience and pathways." },
      { t: "Adaptive Sport Spotlight", d: "Feature series on adaptive athletes and the rehab science behind them." },
    ],
    future: [{ t: "Shadowing Partnership Program", d: "Structured virtual shadowing with rehab clinicians across Canada.", when: "Winter 2026" }],
    icon: "run",
    motif: "wave",
    logo: "./assets/branch-logos/rehab.png",
    panelBg: "#d03868",
  },
  {
    slug: "surgery",
    name: "Surgery4Youth",
    short: "Surgery",
    tagline: "Surgical principles, specialties, and innovations in operative care.",
    about:
      "Surgery4Youth introduces students to surgical principles, specialties, and innovations in operative care. It provides insight into the skills, decision-making, and teamwork involved in surgical practice.",
    mission:
      "Give youth an honest window into surgical careers and the culture of the OR.",
    past: [
      { t: "Surgery Unscripted with Dr. Kristina Zakhary", d: "A candid interview series with a practicing surgeon on training, cases, and identity." },
      { t: "Women in Surgery Panel", d: "A panel spotlighting women surgeons across specialties and career stages." },
      { t: "Surgical Magazine / Journal", d: "Youth-led publication featuring case discussions, interviews, and surgical op-eds." },
    ],
    future: [{ t: "Suture Clinic Workshop", d: "Virtual hands-on workshop co-led with surgical residents.", when: "TBD" }],
    icon: "scalpel",
    motif: "editorial",
    logo: "./assets/branch-logos/surgery.png",
    panelBg: "#603098",
  },
];

/* code: string | null when no member discount. Ordered by sponsorship priority. */
const SPONSORS = [
  {
    name: "Global University Systems (GUS)",
    logo: "/assets/event-sponsors/global-university-systems.png",
    code: null,
    benefit:
      "Coordinates networks across campus chapters to deliver standardized training (e.g. suturing workshops) and structured admissions support for students pursuing medical school abroad.",
    category: "Study Abroad",
  },
  {
    name: "International Medical School Fair (IMSF)",
    logo: "/assets/event-sponsors/imsf.png",
    code: null,
    benefit:
      "Showcases international medical schools and offers hands-on clinical skills training including phlebotomy and intramuscular injection workshops to prepare students for applications and practical experience.",
    category: "Fairs & clinical skills",
  },
  {
    name: "OzTREKK",
    logo: "/assets/event-sponsors/oztrekk.png",
    code: null,
    benefit:
      "Connects students with medical and dental schools in Australia with guidance through the application process; supports local chapter events and resources.",
    category: "Study abroad",
  },
  {
    name: "Astroff",
    logo: "/assets/event-sponsors/astroff.png",
    code: "medicine4youth",
    benefit:
      "Canadian admissions consulting and test prep for CASPer, MMIs, Kira Talent, and professional-school interviews: mock tests, coaching, and application support. 15% off self-paced Astroff courses for all M4Y members.",
    category: "Admissions & interviews",
  },
  {
    name: "Wizeprep",
    logo: "/assets/event-sponsors/wizeprep.png",
    code: "Medicine4Youth",
    benefit:
      "Online learning and test prep (high school through MCAT, LSAT, and more). 15% off Wizeprep's MCAT course for all M4Y members and event participants. 50% off for executive members; current executive list must be shared with Wizeprep for confirmation. Applies to MCAT Elite 515 (performance-based pricing, 144 class hours) and MCAT Self-Paced (1100+ videos, strategies, practice).",
    category: "Test prep",
  },
  {
    name: "Booster Prep",
    logo: "/assets/event-sponsors/booster-prep.png",
    code: "med4youth",
    benefit:
      "High-yield question banks, full-length exams, flashcards, and analytics for standardized tests. Partner provisions: 90- and 180-day DATBooster Premium; 90- and 180-day OATBooster Premium; 30- and 60-day Casper memberships.",
    category: "Test prep",
  },
  {
    name: "MCAT Blueprint",
    logo: "/assets/event-sponsors/blueprint-mcat.png",
    code: "CMMSG109809",
    benefit:
      "Individualized MCAT study plans, prep packages, and tutoring. 15% off all Blueprint courses (not stackable with sitewide sales); 20% off exam bundles; 10% off tutoring.",
    category: "MCAT prep",
  },
  {
    name: "Prep 101",
    logo: "/assets/event-sponsors/prep101.png",
    code: "Med4youth555",
    benefit:
      "University undergrad exam prep and comprehensive MCAT coaching. $500 off the Prep101 MCAT course with member code.",
    category: "MCAT prep",
  },
  {
    name: "Coast2Coast First Aid & Aquatics",
    logo: "/assets/event-sponsors/coast2coast.png",
    code: null,
    benefit:
      "CPR workshops and first aid training with certification recognized by the Canadian Red Cross: essential life-saving skills that meet widely accepted safety standards.",
    category: "Certifications",
  },
];

/* Real photography: community, labs, chapters, workshops */
const SITE_PHOTOS = {
  heroMain: "./assets/site/iv-practice-closeup.jpg",
  heroCommunity: "./assets/site/clinical-skills-workshop.png",
  heroLeaders: "./assets/site/m4y-chapter-group-banners.jpg",
  srpSpotlight: "./assets/site/chapter-donation-check.png",
  aboutTeam: "./assets/site/m4y-leadership-hoodies.jpg",
  aboutPrograms: "./assets/site/fundraiser-valentines-msf.png",
  srpHeroWide: "./assets/site/stop-the-bleed-clinical.jpg",
  srpHeroPoster: "./assets/site/suturing-workshop-mcmaster.jpg",
  srpHeroLab: "./assets/site/outdoor-campus-gathering.jpg",
  eventsFeaturedBowl: "./assets/site/academic-session-m4y.jpg",
  eventsFeaturedHorizons: "./assets/site/surgery-workshop-classroom.jpg",
};

/* Flagship M4Y calendar items. Branch-specific panels and workshops live on branch sites. */
const EVENTS = [
  {
    t: "SRP Research Symposium",
    date: "Aug 22, 2026",
    loc: "Hybrid",
    tag: "Research",
    blurb:
      "Closing symposium for the Summer Research Program: scholar posters, mentorship, and celebration of student-led inquiry aligned with your academic interests.",
    photo: "./assets/site/iv-administration-demo.jpg",
  },
  {
    t: "Healthcare Bowl",
    date: "Mar 14, 2026",
    loc: "University of Toronto",
    tag: "Programs",
    blurb:
      "M4Y's annual case-based competition where student teams work through healthcare scenarios together with near-peer and clinical mentorship.",
    photo: "./assets/site/chapter-bake-sale-windsor.png",
  },
  {
    t: "Healthcare Horizons",
    date: "November 23rd",
    loc: "Chapter-hosted",
    tag: "Events",
    blurb:
      "Interdisciplinary careers panel spanning medicine, dentistry, pharmacy, and optometry: admissions pathways, workforce themes, and practical insight. Our last session welcomed about 100 attendees.",
    photo: "./assets/site/outdoor-campus-gathering.jpg",
  },
];

/* Partner logos on the Programs page (Healthcare Horizons and flagship programming). Files in assets/event-sponsors/. */
/* Root-relative paths so logos load on every route when using static hosting. */
const HEALTHCARE_HORIZONS_SPONSOR_LOGOS = [
  { src: "/assets/event-sponsors/global-university-systems.png", alt: "Global University Systems" },
  { src: "/assets/event-sponsors/imsf.png", alt: "International Medical School Fair" },
  { src: "/assets/event-sponsors/oztrekk.png", alt: "OzTREKK" },
  { src: "/assets/event-sponsors/astroff.png", alt: "Astroff" },
  { src: "/assets/event-sponsors/wizeprep.png", alt: "Wizeprep" },
  { src: "/assets/event-sponsors/booster-prep.png", alt: "Booster Prep" },
  { src: "/assets/event-sponsors/blueprint-mcat.png", alt: "Blueprint MCAT preparation" },
  { src: "/assets/event-sponsors/prep101.png", alt: "Prep101" },
  { src: "/assets/event-sponsors/coast2coast.png", alt: "Coast2Coast First Aid and Aquatics" },
];

const PAPERS = [
  { t: "Neurovascular Coupling in Adolescent Populations: A Review", auth: "M. Nguyen, A. Patel, SRP '25", type: "Review" },
  { t: "Wearable Sensing for Post-Concussion Recovery", auth: "J. Chen, SRP '25", type: "Original Research" },
  { t: "Microbiome Signatures in Pediatric IBD", auth: "S. Ramanathan, SRP '24", type: "Original Research" },
  { t: "Adolescent Mental Health Across School Transitions", auth: "L. Okafor, SRP '24", type: "Review" },
  { t: "Point-of-care Diagnostics: a Youth Primer", auth: "D. Halvorsen, SRP '25", type: "Methods" },
  { t: "Computational Models of Pain Perception", auth: "R. Gill, SRP '25", type: "Original Research" },
];

const CHAPTERS = [
  { city: "University of Toronto, St. George", type: "Post-secondary", status: "Active" },
  { city: "University of Toronto, Mississauga", type: "Post-secondary", status: "Active" },
  { city: "University of Toronto, Scarborough", type: "Post-secondary", status: "Active" },
  { city: "York University", type: "Post-secondary", status: "Active" },
  { city: "Toronto Metropolitan University (TMU)", type: "Post-secondary", status: "Active" },
  { city: "Queen's University", type: "Post-secondary", status: "Active" },
  { city: "McMaster University", type: "Post-secondary", status: "Active" },
  { city: "Western University", type: "Post-secondary", status: "Active" },
  { city: "University of Windsor", type: "Post-secondary", status: "Active" },
  { city: "University of Waterloo", type: "Post-secondary", status: "Active" },
  { city: "University of Guelph", type: "Post-secondary", status: "Active" },
  { city: "University of Ottawa", type: "Post-secondary", status: "Active" },
  { city: "Ontario Tech University", type: "Post-secondary", status: "Active" },
  { city: "McGill University", type: "Post-secondary", status: "Active" },
  { city: "Dalhousie University", type: "Post-secondary", status: "Active" },
  { city: "University of British Columbia, Vancouver", type: "Post-secondary", status: "Active" },
  { city: "University of British Columbia Okanagan", type: "Post-secondary", status: "Active" },
  { city: "University of Calgary", type: "Post-secondary", status: "Active" },
  { city: "University of Alberta", type: "Post-secondary", status: "Active" },
  { city: "University of Manitoba", type: "Post-secondary", status: "Active" },
  { city: "University of Winnipeg", type: "Post-secondary", status: "Active" },
  { city: "Northwestern Polytechnic", type: "Post-secondary", status: "Active" },
  { city: "Brock University", type: "Post-secondary", status: "Active" },
];

const ORG_LOGO = "./assets/medicine4youth-logo.png";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Branches", to: "/branches" },
  { label: "Chapters", to: "/chapters" },
  { label: "SRP", to: "/srp" },
  { label: "Sponsors", to: "/sponsors" },
  { label: "Contact", to: "/contact" },
];

Object.assign(window, { BRANCHES, SPONSORS, EVENTS, HEALTHCARE_HORIZONS_SPONSOR_LOGOS, PAPERS, CHAPTERS, NAV, SITE_PHOTOS, ORG_LOGO });
