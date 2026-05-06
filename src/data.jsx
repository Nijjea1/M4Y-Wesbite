/* Organization data */

const BRANCHES = [
  {
    slug: "neuro",
    name: "Neuroscience4Youth",
    short: "Neuro",
    tagline: "From neural circuits to behaviour: neuroscience made accessible.",
    about:
      "Neuroscience4Youth explores the structure and function of the brain, from neural circuits to behaviour and cognition. It aims to make complex neuroscience concepts accessible while highlighting current research and careers in the field.",
    mission:
      "Demystify the brain and connect youth with how neuroscience is studied and applied today.",
    past: [
      { t: "Research Poster Competition", d: "Open call for student-led neuroscience research, judged by a faculty panel across 4 categories." },
      { t: "Behind the Brain: Behavioural Neuroscience Panel", d: "Live panel with behavioural neuroscientists on addiction, memory, and decision-making." },
      { t: "Instagram Takeovers", d: "Rotating weekly takeovers by graduate researchers sharing lab life and projects." },
    ],
    future: [{ t: "Neuroscience4Youth Research Workshop", d: "Hands-on workshop covering literature review, methods, and poster development.", when: "Fall 2026" }],
    icon: "brain",
    motif: "neural-net",
    logo: "./assets/branch-logos/neuro.png",
    panelBg: "#f898b0",
  },
  {
    slug: "psych",
    name: "Psychology4Youth",
    short: "Psych",
    tagline: "Behavioural science, mental health, and the mind, made approachable.",
    about:
      "Psychology4Youth focuses on understanding human behavior, cognition, and mental health. The branch promotes awareness, critical thinking, and practical applications of psychology in everyday life.",
    mission:
      "Make psychology approachable while improving mental health literacy among youth.",
    past: [
      { t: "Psychology4Youth Career Panel", d: "Clinical, research, and industrial/organizational psychologists share their paths." },
      { t: "Disorders Research Infographic Competition", d: "Student-designed infographics breaking down DSM-classified disorders for general audiences." },
      { t: "Instagram Takeovers", d: "Grad students host takeovers on research, clinical training, and mental health in academia." },
    ],
    future: [{ t: "Mentorship Program", d: "1-to-1 pairings between undergraduate psychology students and high school mentees.", when: "Spring 2026" }],
    icon: "mind",
    motif: "orbit",
    logo: "./assets/branch-logos/psych.png",
    panelBg: "#d0c0f0",
  },
  {
    slug: "dentistry",
    name: "Dentistry4Youth",
    short: "Dentistry",
    tagline: "Oral health, clinical dentistry, and careers that start with a smile.",
    about:
      "Dentistry4Youth provides insight into oral health, dental practices, and careers in dentistry. It emphasizes prevention, patient care, and the importance of oral health in overall well-being.",
    mission:
      "Help youth see dentistry as a vital, rewarding healthcare path grounded in prevention and care.",
    past: [],
    future: [],
    icon: "tooth",
    motif: "arc",
    logo: "./assets/branch-logos/dentistry.png",
    panelBg: "#386098",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy4Youth",
    short: "Pharmacy",
    tagline: "Pharmacology, patient safety, and the science behind therapeutics.",
    about:
      "Pharmacy4Youth introduces students to pharmacology, drug development, and the role of pharmacists in healthcare. It highlights medication safety, patient education, and the science behind therapeutics.",
    mission:
      "Show how pharmacists protect patients and advance therapeutic science.",
    past: [],
    future: [],
    icon: "capsules",
    motif: "strata",
    logo: "./assets/branch-logos/pharmacy.png",
    panelBg: "#780000",
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
  },
  {
    slug: "optom",
    name: "Optometry4Youth",
    short: "Optometry",
    tagline: "Vision science, eye health, and clinical optometry, up close.",
    about:
      "Optometry4Youth explores vision science, eye health, and the role of optometrists. Students learn about common visual disorders, diagnostics, and the importance of eye care.",
    mission:
      "Make optometry visible and accessible for students exploring healthcare careers.",
    past: [
      { t: "Virtual Shadowing Series", d: "Recorded shadow sessions with practicing optometrists and residents." },
      { t: "Pre-Optometry Q&A", d: "Panel on OAT prep, school choice, and application strategy." },
    ],
    future: [{ t: "Clinical Cases Library", d: "Curated, youth-readable optometry case library with teaching commentary.", when: "Ongoing" }],
    icon: "eye",
    motif: "concentric",
    logo: "./assets/branch-logos/optom.png",
    panelBg: "#509090",
  },
  {
    slug: "charity",
    name: "Charity4Youth",
    short: "Charity",
    tagline: "Community engagement, advocacy, and impact beyond the clinic.",
    about:
      "Charity4Youth focuses on community engagement, advocacy, and social impact initiatives. It empowers youth to give back through volunteering, fundraising, and supporting underserved populations.",
    mission:
      "Mobilize young people to lead with compassion and serve their communities.",
    past: [],
    future: [],
    icon: "hands",
    motif: "hearts",
    logo: "./assets/branch-logos/charity.png",
    panelBg: "#f8d8c8",
  },
  {
    slug: "endo",
    name: "Endopath4Youth",
    short: "Endopath",
    tagline: "Hormones, reproductive health, and the systems beneath the surface.",
    about:
      "Endopath4Youth explores the science of hormones, reproductive health, and disease processes affecting the endocrine and reproductive systems. It promotes awareness and education around often under-discussed health topics.",
    mission:
      "Normalize dialogue and deepen understanding of endocrine and reproductive health.",
    past: [
      { t: "Pathology Case Series", d: "Weekly case-based deep-dives with pathology residents." },
      { t: "Hormones 101 Workshop", d: "Foundations of the endocrine system for high school students." },
    ],
    future: [{ t: "Diagnostic Sciences Panel", d: "A survey panel across clinical chemistry, histopathology, and molecular diagnostics.", when: "Summer 2026" }],
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

/* code: string | null when no member discount. Test-prep rows match Medicine4Youth Sponsorship Information (Chapters). */
const SPONSORS = [
  {
    name: "Wizeprep",
    logo: "/assets/event-sponsors/wizeprep.png",
    code: "Medicine4Youth",
    benefit:
      "Online learning and test prep (high school through MCAT, LSAT, and more). 15% off Wizeprep’s MCAT course for all M4Y members and event participants. 50% off for executive members; current executive list must be shared with Wizeprep for confirmation. Applies to MCAT Elite 515 (performance-based pricing, 144 class hours) and MCAT Self-Paced (1100+ videos, strategies, practice).",
    category: "Test prep",
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
    name: "Global University Systems (GUS)",
    logo: "/assets/event-sponsors/global-university-systems.png",
    code: null,
    benefit:
      "Coordinates networks across campus chapters to deliver standardized training (e.g. suturing workshops) and structured admissions support for students pursuing medical school abroad.",
    category: "Training & admissions",
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
    name: "Medschool Bros",
    logo: "/assets/event-sponsors/medschool-bro.png",
    code: null,
    benefit:
      "Structured admissions support for medical school abroad; Medicine4Youth collaborates with Medschool Bros for the International Medical Graduate (IMG) Conference.",
    category: "Admissions",
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
  heroMain: "./assets/site/lab-research-focus.png",
  heroCommunity: "./assets/site/chapter-bake-sale-windsor.png",
  heroLeaders: "./assets/site/leadership-duo-laptops.png",
  srpSpotlight: "./assets/site/chapter-donation-check.png",
  aboutTeam: "./assets/site/chapter-ubcv-team.png",
  aboutPrograms: "./assets/site/workshop-classroom.png",
  srpHeroWide: "./assets/site/clinical-skills-workshop.png",
  srpHeroPoster: "./assets/site/lab-hands-on-smiling.png",
  srpHeroLab: "./assets/site/chapters-outdoor-gathering.png",
  eventsFeaturedBowl: "./assets/site/study-collaboration.png",
  eventsFeaturedHorizons: "./assets/site/fundraiser-valentines-msf.png",
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
    photo: "./assets/site/lab-hands-on-smiling.png",
  },
  {
    t: "Healthcare Bowl",
    date: "Mar 14, 2026",
    loc: "University of Toronto",
    tag: "Programs",
    blurb:
      "M4Y's annual case-based competition where student teams work through healthcare scenarios together with near-peer and clinical mentorship.",
    photo: "./assets/site/lab-research-focus.png",
  },
  {
    t: "Healthcare Horizons",
    date: "November 23rd",
    loc: "Chapter-hosted",
    tag: "Events",
    blurb:
      "Interdisciplinary careers panel spanning medicine, dentistry, pharmacy, and optometry: admissions pathways, workforce themes, and practical insight. Our last session welcomed about 100 attendees.",
    photo: "./assets/site/clinical-skills-workshop.png",
  },
];

/* Partner logos on the Programs page (Healthcare Horizons and flagship programming). Files in assets/event-sponsors/. */
/* Root-relative paths so logos load on every route when using static hosting. */
const HEALTHCARE_HORIZONS_SPONSOR_LOGOS = [
  { src: "/assets/event-sponsors/astroff.png", alt: "Astroff" },
  { src: "/assets/event-sponsors/booster-prep.png", alt: "Booster Prep" },
  { src: "/assets/event-sponsors/blueprint-mcat.png", alt: "Blueprint MCAT preparation" },
  { src: "/assets/event-sponsors/coast2coast.png", alt: "Coast2Coast First Aid and Aquatics" },
  { src: "/assets/event-sponsors/global-university-systems.png", alt: "Global University Systems" },
  { src: "/assets/event-sponsors/imsf.png", alt: "International Medical School Fair" },
  { src: "/assets/event-sponsors/medschool-bro.png", alt: "Medschool Bros" },
  { src: "/assets/event-sponsors/oztrekk.png", alt: "OzTREKK" },
  { src: "/assets/event-sponsors/prep101.png", alt: "Prep101" },
  { src: "/assets/event-sponsors/wizeprep.png", alt: "Wizeprep" },
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
