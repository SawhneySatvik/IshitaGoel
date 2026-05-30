export const SITE_URL = "https://ishitagoel.vercel.app";

export type Tag =
  | "AI"
  | "Research"
  | "Design"
  | "Product"
  | "Sustainability"
  | "Leadership"
  | "Writing";

export const profile = {
  name: "Ishita Goel",
  location: "Geelong, Victoria, Australia",
  email: "ishitagoel250@gmail.com",
  github: "https://github.com/IshitaGoel",
  linkedin: "https://www.linkedin.com/in/ishitagoel-89a256248",
  ngo: "https://kaushalup.org",
  cv: "/ishita-cv.pdf",
  photo: "/assets/images/IshitaMainPortrait.jpg",
  tagline: "I build technology that makes people feel seen.",
  subline:
    "AI researcher and designer working at the intersection of human-centered and sustainable machine learning. Founder of Kaushal Up.",
  available: "Open to work anywhere — currently in Geelong",
};

export const greetings = ["Hello", "नमस्ते", "こんにちは", "Hallo"];

export const about: string[] = [
  "I’ve always been curious about the “why” behind things — why people choose certain apps, why some ideas spark change, and why design can make or break an experience. I’m studying Computer Science with a specialisation in AI & Machine Learning, but my interests have always reached past the code.",
  "I’m most energised when I’m creating — designing a product, running a federated-learning experiment, writing, or planning a community event. I’m drawn to the intersection of tech, design, and real-world impact, especially work that helps people feel seen, supported, or empowered.",
  "I care about meaningful work, quiet details, and bold ideas — and I believe in asking questions, learning on the go, and not waiting for “perfect” to start.",
];

export type ResearchItem = {
  title: string;
  org: string;
  period: string;
  location?: string;
  blurb: string;
  points?: string[];
  tags: Tag[];
  slug?: string;
  current?: boolean;
  cover: string;
};

export const research: ResearchItem[] = [
  {
    title: "Research Intern",
    org: "Deakin University",
    period: "Mar 2026 — Present",
    location: "Geelong, Australia",
    blurb:
      "Current research role exploring applied machine learning. (Project summary to be added.)",
    tags: ["Research", "AI"],
    current: true,
    cover: "linear-gradient(135deg, #7e8b6b 0%, #4f5a40 100%)",
  },
  {
    title: "Federated Learning in Modern Healthcare",
    org: "under Dr. Sivashankar G. · SRM IST",
    period: "Nov 2024 — Apr 2025",
    blurb:
      "Designed a privacy-preserving federated-learning pipeline for decentralised healthcare data — keeping patient records on-device while still training a shared model.",
    points: [
      "Built the pipeline in TensorFlow, reaching 91% accuracy on decentralised datasets.",
      "Studied the trade-offs between communication efficiency and data security in distributed systems.",
    ],
    tags: ["Research", "AI"],
    slug: "federated-learning",
    cover: "linear-gradient(135deg, #c2693f 0%, #8a4a2e 100%)",
  },
];

export type Project = {
  title: string;
  year: string;
  blurb: string;
  stack: string[];
  tags: Tag[];
  slug?: string;
  github?: string;
  cover: string;
};

export const projects: Project[] = [
  {
    title: "On The Move",
    year: "Mar 2025",
    blurb:
      "An iOS vehicle-pooling app for safer, smarter rides — built for college students, professors, and working professionals to cut travel costs and travel more securely.",
    stack: ["SwiftUI", "UIKit", "MapKit", "Flask", "Supabase"],
    tags: ["Product", "Design", "AI"],
    slug: "on-the-move",
    cover: "linear-gradient(135deg, #c2693f 0%, #7e8b6b 100%)",
  },
  {
    title: "Lawyer Up",
    year: "Feb 2024",
    blurb:
      "A legal chatbot built for the Google Solution Challenge 2024 that makes legal information more accessible, helping people get guidance quickly.",
    stack: ["Gemini Pro", "Google AI Studio", "JavaScript"],
    tags: ["AI", "Product"],
    cover: "linear-gradient(135deg, #cf8a5f 0%, #7e8b6b 100%)",
  },
  {
    title: "Ask Your PDF",
    year: "Nov 2023",
    blurb:
      "A generative-AI web app that lets you upload a PDF and converse with it in real time — retrieval-augmented answers grounded in your own documents.",
    stack: ["Python", "Streamlit", "LangChain", "FAISS", "GPT-3.5"],
    tags: ["AI"],
    cover: "linear-gradient(135deg, #b98a6a 0%, #6b635a 100%)",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
  tags: Tag[];
};

export const experience: ExperienceItem[] = [
  {
    role: "iOS Developer Intern",
    org: "Infosys",
    period: "Apr 2025 — May 2025",
    location: "Mysore, India",
    points: [
      "Led a 10-member team to design and deploy an iOS app in SwiftUI.",
      "Ran the project on Agile SCRUM, coordinating sprints and deliverables in Jira.",
      "Selected from 1000+ applicants for the two-semester Apple × Infosys iOS Developer Program.",
    ],
    tags: ["Product", "Design", "Leadership"],
  },
  {
    role: "Product Intern",
    org: "Mosaic Digital (HT Media) · VCCEdge",
    period: "Jun 2024 — Jul 2024",
    location: "Gurugram, India",
    points: [
      "Contributed to product development, UI/UX design, and SEO strategy for VCCEdge.",
      "Developed go-to-market strategies to strengthen product positioning and engagement.",
    ],
    tags: ["Product", "Design"],
  },
  {
    role: "IT & Content Intern",
    org: "BAI Infosolutions",
    period: "Jun 2023 — Jul 2023",
    location: "Gurugram, India",
    points: [
      "Designed UI/UX for TaxiVaxi and wrote for TaxiVaxi Corporate.",
      "Published “Bleisure Travel — When Business Meets Leisure”.",
    ],
    tags: ["Design", "Writing"],
  },
];

export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Python", "Java", "C", "C++", "Swift", "JavaScript", "HTML", "CSS"],
  },
  {
    group: "ML & Data",
    items: ["TensorFlow", "NumPy", "Pandas", "Matplotlib", "MySQL"],
  },
  {
    group: "Web",
    items: ["React", "Next.js", "Tailwind", "Bootstrap"],
  },
  {
    group: "Design",
    items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Excalidraw", "Canva"],
  },
  {
    group: "Tools",
    items: ["Git & GitHub", "Jira", "Notion"],
  },
  {
    group: "Spoken",
    items: ["English (Fluent)", "Hindi (Native)", "German (Basic)", "Japanese (Basic)"],
  },
];

export type EducationItem = {
  school: string;
  detail: string;
  period: string;
  note?: string;
};

export const education: EducationItem[] = [
  {
    school: "SRM Institute of Science and Technology",
    detail: "B.Tech, Computer Science — AI & Machine Learning",
    period: "2022 — 2026",
    note: "CGPA 9.57 · Founder’s Scholarship (75% tuition)",
  },
  {
    school: "Delhi Public School, R.K. Puram",
    detail: "Class XII — CBSE",
    period: "2022",
    note: "86.0%",
  },
  {
    school: "Delhi Public School, Rohini",
    detail: "Class X — CBSE",
    period: "2020",
    note: "95.2%",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  sustainability?: boolean;
};

export const achievements: Achievement[] = [
  {
    title: "iOS Developer Program — Apple × Infosys",
    detail: "Selected from 1000+ applicants for the two-semester program.",
  },
  {
    title: "United Nations Young Leaders Programme",
    detail: "UN systems, conference diplomacy, the SDGs, and leadership.",
    sustainability: true,
  },
  {
    title: "UN Climate Change Pre-Incubation Program · Cohort 3.0",
    detail: "Climate-focused venture pre-incubation.",
    sustainability: true,
  },
  {
    title: "Energy Within Environmental Constraints",
    detail: "Certification on energy systems and sustainability.",
    sustainability: true,
  },
  {
    title: "Pre-Incubation Program Cohort 3.0 — IIM Lucknow",
    detail: "Ideation, design thinking, product, pitch decks, and finance.",
  },
  {
    title: "Artificial Intelligence — IIT Kanpur",
    detail: "Supervised & unsupervised ML, deep learning, neural networks.",
  },
  {
    title: "Full Stack Web Development — IIT Kanpur",
    detail: "MongoDB, Express, React, Node.",
  },
  {
    title: "NPTEL",
    detail: "Data Structures & Algorithms, Python for Data Science, Java.",
  },
];

export type LeadershipItem = {
  role: string;
  org: string;
  period: string;
  blurb: string;
  points?: string[];
  href?: string;
  slug?: string;
  tags: Tag[];
  image?: string; // drop a file in /public/assets and set e.g. "/assets/kaushal-up.jpg"
};

export const leadership: LeadershipItem[] = [
  {
    role: "Founder",
    org: "Kaushal Up Foundation",
    period: "Jun 2024 — Present",
    blurb:
      "An NGO built on a simple belief: education that empowers, skills that transform. We bring skill-based learning to underprivileged communities.",
    points: [
      "Free sessions in startup mentoring, finance, soft skills, music, sports, and technical skills.",
      "Ran a book-donation drive, a UN SDG seminar, a startup seminar, and teaching drives.",
    ],
    href: "https://kaushalup.org",
    slug: "kaushal-up",
    tags: ["Leadership", "Sustainability"],
    image: "/assets/images/IshitaAtAKaushalUpBookDistribution.jpg",
  },
  {
    role: "Student Coordinator",
    org: "Ramanujan Mathematics Club, SRM",
    period: "Aug 2023 — Present",
    blurb:
      "Coordinated a 30+ member team to organise multiple successful campus events.",
    tags: ["Leadership"],
    image: "/assets/images/IshitaAtMathClubEventStage.jpg",
  },
];

export type WritingItem = {
  title: string;
  outlet: string;
  year: string;
  href: string;
};

export const writing: WritingItem[] = [
  {
    title: "Bleisure Travel — When Business Meets Leisure",
    outlet: "TaxiVaxi Corporate",
    year: "2023",
    href: "https://taxivaxi.com/blogs/bleisure-travel-when-business-meets-leisure/",
  },
];

export const now =
  "Right now I’m a research intern at Deakin University, exploring how machine learning can stay human-centered and sustainable. In between, I’m growing Kaushal Up, sketching in Figma, and staying open to what’s next.";

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type GalleryItem = {
  label: string;
  aspect: string;
  src?: string; // drop a file in /public/assets and set e.g. "/assets/sdg-seminar.jpg"
};

// "Moments" gallery — real photos + swap-ready placeholders for upcoming ones.
export const gallery: GalleryItem[] = [
  {
    label: "Apple × Infosys iOS program",
    aspect: "2/3",
    src: "/assets/images/IshitaInfosysInternshipCompletion.jpg",
  },
  {
    label: "AI Summit India",
    aspect: "4/3",
    src: "/assets/images/IshitaAISummitIndia.jpg",
  },
  { label: "Kaushal Up session", aspect: "4/5" },
  {
    label: "Receiving the award",
    aspect: "16/10",
    src: "/assets/images/IshitaTakingAward.jpg",
  },
  { label: "UN SDG seminar", aspect: "4/3" },
  {
    label: "At a diversity event",
    aspect: "3/4",
    src: "/assets/images/IshitaAtADiversityEvent.jpg",
  },
  { label: "In the studio", aspect: "1/1" },
  {
    label: "Candid",
    aspect: "13/10",
    src: "/assets/images/IshitaCandid.jpg",
  },
  {
    label: "With a friend",
    aspect: "4/3",
    src: "/assets/images/IshitaWithSatvik.jpg",
  },
  { label: "Geelong", aspect: "4/5" },
  { label: "Teaching drive", aspect: "4/3" },
  { label: "Design work", aspect: "1/1" },
];

// Verifiable résumé numbers only — no invented figures.
export const stats: Stat[] = [
  { value: 9.57, decimals: 2, label: "CGPA at SRM" },
  { value: 1000, suffix: "+", label: "applicants beaten — Apple × Infosys" },
  { value: 91, suffix: "%", label: "accuracy, federated-learning research" },
  { value: 30, suffix: "+", label: "team coordinated" },
  { value: 4, label: "languages spoken" },
  { value: 3, label: "industry internships" },
];

export type ReadingItem = {
  title: string;
  author: string;
  status: "reading" | "finished" | "queued";
  note?: string;
  link?: string;
};

// Placeholder bookshelf — Ishita can edit these freely.
export const reading: ReadingItem[] = [
  {
    title: "Designing for the Digital Age",
    author: "Kim Goodwin",
    status: "reading",
    note: "Revisiting the fundamentals of human-centered product design.",
  },
  {
    title: "Weapons of Math Destruction",
    author: "Cathy O’Neil",
    status: "finished",
    note: "A sharp reminder that fairness has to be designed in, not bolted on.",
  },
  {
    title: "The Alignment Problem",
    author: "Brian Christian",
    status: "finished",
    note: "The book that nudged me toward responsible-ML research.",
  },
  {
    title: "Range",
    author: "David Epstein",
    status: "queued",
    note: "On why generalists thrive — feels relevant to working across tech, design, and impact.",
  },
];
