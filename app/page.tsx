import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import CommandPalette from "@/components/CommandPalette";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GitHubGraph from "@/components/GitHubGraph";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getGithubRepos } from "@/lib/github";
import { GITHUB_USERNAME, EXCLUDED_REPOS, FEATURED_REPOS } from "@/data/projects-config";

export default async function Home() {
  // Fetch real GitHub repos at build/request time (ISR every hour)
  const allRepos = await getGithubRepos(GITHUB_USERNAME);
  const repos = allRepos.filter((r) =>
    FEATURED_REPOS.length > 0
      ? FEATURED_REPOS.includes(r.name)
      : !EXCLUDED_REPOS.includes(r.name) && (r.description || r.topics?.length > 0)
  );

  return (
    <>
      {/* Global decorations */}
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <div className="blob b1" />
      <div className="blob b2" />

      {/* Command Palette */}
      <CommandPalette />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Services />
      <Projects repos={repos} />
      <Experience />
      <GitHubGraph username={GITHUB_USERNAME} />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
