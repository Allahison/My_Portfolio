// ─────────────────────────────────────────────────
//  GitHub username — change this to your GitHub handle
// ─────────────────────────────────────────────────
export const GITHUB_USERNAME = "allahison";

// ─────────────────────────────────────────────────
//  Only show these repos (leave empty to show all non-excluded)
// ─────────────────────────────────────────────────
export const FEATURED_REPOS = [
  "Mivn-Globel-Website",
  "sales-manager-pro",
];

// ─────────────────────────────────────────────────
//  Repos to EXCLUDE from the showcase
// ─────────────────────────────────────────────────
export const EXCLUDED_REPOS = [
  "Allahison",       // profile readme
  "CodeWithArslan",
  "Codewitharslan1",
  "Final",
  "final--Hakathone",
  "Studen_App",      // duplicate of Student_App_Redux
  "counter_App_Redux",
  "Birthday_Wishes",
  "Image_Gallery",
  "Memorey_Card_Game",
];

// ─────────────────────────────────────────────────
//  Per-repo overrides — add extra info for any repo
//  All fields are optional; GitHub data is used as fallback
// ─────────────────────────────────────────────────
export const PROJECT_OVERRIDES: Record<string, Partial<ProjectOverride>> = {
  "Youtube-Video-Downloder": {
    title: "YouTube Video Downloader",
    description: "A full-stack YouTube video downloader built with Node.js backend and a clean web frontend. Supports multiple quality options and formats.",
    extraTech: ["nodejs", "javascript", "html", "css"],
    liveUrl: "https://youtube-video-downloder-alpha.vercel.app",
    filter: "Web App",
  },
  "Mivn-Globel-Website": {
    title: "Mivan Global — Business Website",
    description: "Corporate website for Mivan Global Ltd — UK Digital Operations Partner. Fully responsive with smooth animations and a modern business design.",
    extraTech: ["javascript", "css", "html", "nodejs"],
    liveUrl: "https://mivanglobal.co.uk/",
    filter: "Web App",
  },
  "Bill_Manegment_app": {
    title: "Bill Management App",
    description: "A complete billing and invoice management application built with React. Create, track and manage invoices with a clean dashboard.",
    extraTech: ["react", "javascript"],
    filter: "Web App",
  },
  "Facebook_Clone": {
    title: "Facebook UI Clone",
    description: "A pixel-perfect Facebook UI clone built with React and JavaScript. Includes News Feed, Stories, and responsive layout.",
    extraTech: ["react", "javascript", "css"],
    filter: "Web App",
  },
  "Student_App_Redux": {
    title: "Student Management (Redux)",
    description: "A student record management app demonstrating advanced Redux state management with CRUD operations.",
    extraTech: ["react", "redux", "javascript"],
    filter: "Web App",
  },
  "KidsApp": {
    title: "Kids Learning App",
    description: "A fun and interactive mobile application for kids built with React Native. Features educational games and colorful UI.",
    extraTech: ["react-native", "javascript"],
    filter: "Mobile",
  },
  "Weather_App": {
    title: "Real-Time Weather App",
    description: "A weather application that fetches live weather data via API. Shows temperature, humidity, wind speed with beautiful weather icons.",
    extraTech: ["react", "javascript", "api"],
    filter: "Web App",
  },
  "e-comrece-website": {
    title: "E-Commerce Website",
    description: "A fully responsive e-commerce website with product catalog, cart functionality, and checkout flow built with React.",
    extraTech: ["react", "javascript", "css"],
    filter: "Web App",
  },
  "converter-speact-to-text": {
    title: "Speech to Text Converter",
    description: "A web app that converts spoken words to text in real-time using the Web Speech API — no backend required.",
    extraTech: ["javascript", "html", "css"],
    filter: "Web App",
  },
  "restorent-21": {
    title: "Restaurant Management App",
    description: "A restaurant management and online ordering web application with menu management and order tracking.",
    extraTech: ["javascript", "react", "css"],
    filter: "Web App",
  },
  "AI_Assistent-Zoya": {
    title: "AI Assistant Zoya",
    description: "A professional-grade autonomous AI assistant for Windows system control and development automation. Powered by TypeScript with intelligent command parsing.",
    extraTech: ["typescript", "ai", "automation"],
    filter: "AI/ML",
  },
  "Remote-Work-Monitor": {
    title: "Remote Work Monitor",
    description: "A professional remote work monitoring and team collaboration platform with real-time analytics, task management, WebRTC video calls, and team huddles.",
    extraTech: ["react", "supabase", "webrtc", "javascript"],
    filter: "Web App",
  },
  "connectify": {
    title: "Connectify — Social Media App",
    description: "Full-stack social media application built with React and Supabase. Features real-time posts, user follows, messaging, and a responsive feed.",
    extraTech: ["react", "javascript", "supabase"],
    liveUrl: "https://connectify-livid.vercel.app",
    filter: "Web App",
  },
  "sales-manager-pro": {
    title: "NEXUS Enterprise POS",
    description: "Enterprise POS with role-based auth, real-time KPI dashboard, inventory alerts, sales analytics, and customer CRM — React + Express monorepo.",
    extraTech: ["react", "typescript", "tailwind", "postgresql", "express"],
    liveUrl: "https://sales-manager-pro-henna.vercel.app/",
    filter: "Web App",
  },
};

export interface ProjectOverride {
  title: string;
  description: string;
  extraTech: string[];
  liveUrl: string;
  filter: string;
  screenshot: string;
}

// ─────────────────────────────────────────────────
//  Client / non-GitHub projects (shown first)
// ─────────────────────────────────────────────────
export interface CustomProject {
  repoName: string;
  title: string;
  description: string;
  filter: string;
  url: string;
  liveUrl: string | null;
  githubUrl: string | null;
  extraTech: string[];
  screen: string;
  screenshot: string | null;
  tags: string[];
  stars: number;
  badge?: string;
}

export const CUSTOM_PROJECTS: CustomProject[] = [
  {
    repoName: "jarvis-ai-fyp",
    title: "JARVIS — AI Voice & Gesture Control",
    description: "Final Year Project: AI system combining real-time gesture recognition (OpenCV) and voice command processing. Controls desktop apps hands-free with a neural command pipeline.",
    filter: "AI/ML",
    url: "fyp-jarvis",
    liveUrl: null,
    githubUrl: "https://github.com/Allahison/AI_Assistent-Zoya/tree/main/zoya-ai-assistant",
    extraTech: ["python", "opencv", "ai", "machine-learning"],
    screen: "jarvis",
    screenshot: null,
    tags: ["AI/ML", "FYP"],
    stars: 0,
    badge: "FYP Project",
  },
  {
    repoName: "bizfinder-ai",
    title: "BizFinder.ai",
    description: "AI-powered SaaS for a UK client. Automated lead discovery, business insights, and outreach — with role-based auth and real-time analytics.",
    filter: "Web App",
    url: "bizfinder.ai",
    liveUrl: "https://bizfinder.ai/",
    githubUrl: null,
    extraTech: ["react", "typescript", "ai", "nodejs"],
    screen: "bizlogin",
    screenshot: null,
    tags: ["AI/ML"],
    stars: 0,
    badge: "Client Project",
  },
  {
    repoName: "bizfinder-app",
    title: "BizFinder — Mobile App",
    description: "Mobile companion app for BizFinder.ai. Manage leads, track conversations, monitor voice calls, and complete business setup — all from your phone.",
    filter: "Mobile",
    url: "bizfinder.ai",
    liveUrl: "https://bizfinder.ai/",
    githubUrl: null,
    extraTech: ["react-native", "typescript", "ai", "nodejs"],
    screen: "bizapp",
    screenshot: null,
    tags: ["Mobile"],
    stars: 0,
    badge: "Client Project",
  },
  {
    repoName: "maaab-pda",
    title: "Maaab PDA — Warehouse App",
    description: "Mobile PDA app for warehouse operations. Features barcode scanning, auto-sync, theme customization (4 themes), and operational preferences — built for field teams.",
    filter: "Mobile",
    url: "maaab-pda",
    liveUrl: null,
    githubUrl: null,
    extraTech: ["react-native", "typescript", "nodejs"],
    screen: "pdaapp",
    screenshot: null,
    tags: ["Mobile"],
    stars: 0,
    badge: "Client Project",
  },
  {
    repoName: "litit-app",
    title: "Lit.it — Video Social App",
    description: "Short-form video social platform — TikTok-style feed with contests, intro videos, private video DMs, coins system, and creator monetization.",
    filter: "Mobile",
    url: "lit.it",
    liveUrl: "https://lit.it/",
    githubUrl: null,
    extraTech: ["react-native", "typescript", "nodejs", "mongodb"],
    screen: "litapp",
    screenshot: null,
    tags: ["Mobile"],
    stars: 0,
    badge: "Client Project",
  },
];

// ─────────────────────────────────────────────────
//  Topic/language → devicon class mapping
// ─────────────────────────────────────────────────
export const TECH_ICONS: Record<string, { icon: string; label: string }> = {
  react:         { icon: "devicon-react-original colored",       label: "React" },
  "react-native":{ icon: "devicon-react-original colored",       label: "React Native" },
  nodejs:        { icon: "devicon-nodejs-plain colored",          label: "Node.js" },
  javascript:    { icon: "devicon-javascript-plain colored",      label: "JavaScript" },
  typescript:    { icon: "devicon-typescript-plain colored",      label: "TypeScript" },
  python:        { icon: "devicon-python-plain colored",          label: "Python" },
  redux:         { icon: "devicon-redux-original colored",        label: "Redux" },
  css:           { icon: "devicon-css3-plain colored",            label: "CSS3" },
  html:          { icon: "devicon-html5-plain colored",           label: "HTML5" },
  mongodb:       { icon: "devicon-mongodb-plain colored",         label: "MongoDB" },
  postgresql:    { icon: "devicon-postgresql-plain colored",      label: "PostgreSQL" },
  docker:        { icon: "devicon-docker-plain colored",          label: "Docker" },
  firebase:      { icon: "devicon-firebase-plain colored",        label: "Firebase" },
  nextjs:        { icon: "devicon-nextjs-plain",                  label: "Next.js" },
  tailwind:      { icon: "devicon-tailwindcss-plain colored",     label: "Tailwind" },
  git:           { icon: "devicon-git-plain colored",             label: "Git" },
  api:           { icon: "fa-solid fa-plug",                      label: "REST API" },
  youtube:       { icon: "fa-brands fa-youtube",                  label: "YouTube API" },
  "social-media":{ icon: "fa-brands fa-facebook",                 label: "Social Media" },
  ecommerce:     { icon: "fa-solid fa-cart-shopping",             label: "E-Commerce" },
  weather:       { icon: "fa-solid fa-cloud-sun",                 label: "Weather API" },
  mobile:        { icon: "fa-solid fa-mobile-screen",             label: "Mobile" },
  management:    { icon: "fa-solid fa-table-list",                label: "Dashboard" },
  business:      { icon: "fa-solid fa-briefcase",                 label: "Business" },
  restaurant:    { icon: "fa-solid fa-utensils",                  label: "Restaurant" },
  "speech-to-text":{ icon: "fa-solid fa-microphone",             label: "Speech API" },
  game:          { icon: "fa-solid fa-gamepad",                   label: "Game" },
  kids:          { icon: "fa-solid fa-child",                     label: "Kids App" },
  supabase:      { icon: "devicon-supabase-plain colored",        label: "Supabase" },
  webrtc:        { icon: "fa-solid fa-video",                     label: "WebRTC" },
  ai:            { icon: "fa-solid fa-robot",                     label: "AI" },
  automation:    { icon: "fa-solid fa-gears",                     label: "Automation" },
  vite:          { icon: "devicon-vitejs-plain colored",          label: "Vite" },
  express:       { icon: "devicon-express-original",              label: "Express" },
  drizzle:       { icon: "fa-solid fa-database",                  label: "Drizzle ORM" },
  opencv:        { icon: "fa-solid fa-eye",                        label: "OpenCV" },
  "machine-learning": { icon: "fa-solid fa-brain",                label: "ML" },
  kotlin:        { icon: "devicon-kotlin-plain colored",           label: "Kotlin" },
  java:          { icon: "devicon-java-plain colored",             label: "Java" },
};

// ─────────────────────────────────────────────────
//  Language → devicon (primary language fallback)
// ─────────────────────────────────────────────────
export const LANG_ICONS: Record<string, string> = {
  JavaScript: "devicon-javascript-plain colored",
  TypeScript: "devicon-typescript-plain colored",
  Python:     "devicon-python-plain colored",
  CSS:        "devicon-css3-plain colored",
  HTML:       "devicon-html5-plain colored",
  Go:         "devicon-go-plain colored",
  Rust:       "devicon-rust-plain",
  Java:       "devicon-java-plain colored",
};

// ─────────────────────────────────────────────────
//  Screen type for browser mockup (by filter category)
// ─────────────────────────────────────────────────
export const FILTER_TO_SCREEN: Record<string, string> = {
  "Web App": "ecom",
  "Mobile":  "social",
  "API":     "auth",
  "AI/ML":   "chat",
  "SaaS":    "dash",
};

export const REPO_SCREEN_MAP: Record<string, string> = {
  "Youtube-Video-Downloder": "chat",
  "Mivn-Globel-Website":     "corp",
  "Bill_Manegment_app":      "dash",
  "Facebook_Clone":          "social",
  "Student_App_Redux":       "pm",
  "KidsApp":                 "social",
  "Weather_App":             "dash",
  "e-comrece-website":       "ecom",
  "converter-speact-to-text":"chat",
  "restorent-21":            "ecom",
  "AI_Assistent-Zoya":       "chat",
  "Remote-Work-Monitor":     "dash",
  "connectify":              "social",
  "sales-manager-pro":       "pos",
};
