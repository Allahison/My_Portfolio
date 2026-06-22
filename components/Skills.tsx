"use client";
import { useEffect, useRef } from "react";

const SKILLS = [
  { icon: "devicon-kotlin-plain colored",     name: "Kotlin / Java",          cat: "Native Android",        w: 88 },
  { icon: "devicon-react-original colored",   name: "React / React Native",   cat: "Web & Mobile",          w: 90 },
  { icon: "devicon-nextjs-plain",             name: "Next.js",                cat: "Fullstack Framework",   w: 85 },
  { icon: "devicon-javascript-plain colored", name: "JavaScript / TypeScript", cat: "Core Language",         w: 87 },
  { icon: "devicon-nodejs-plain colored",     name: "Node.js / Express",       cat: "Backend",               w: 82 },
  { icon: "devicon-python-plain colored",     name: "Python / OpenCV",         cat: "AI & Automation",       w: 75 },
  { icon: "devicon-mongodb-plain colored",    name: "MongoDB / PostgreSQL",    cat: "Databases",             w: 80 },
];

const PILLS = [
  ["devicon-android-plain colored",      "Android SDK"],
  ["devicon-html5-plain colored",        "HTML5"],
  ["devicon-css3-plain colored",         "CSS3"],
  ["devicon-tailwindcss-plain colored",  "Tailwind"],
  ["devicon-nextjs-plain",               "Next.js"],
  ["fa-solid fa-plug",                   "REST API"],
  ["devicon-git-plain colored",          "Git"],
  ["devicon-github-original",            "GitHub"],
  ["devicon-vercel-plain",               "Vercel"],
  ["devicon-vscode-plain colored",       "VS Code"],
  ["devicon-figma-plain colored",        "Figma"],
  ["fa-solid fa-robot",                  "Claude CLI"],
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const d = +(e.target as HTMLElement).dataset.d! || 0;
        setTimeout(() => {
          e.target.classList.add("in");
          e.target.querySelectorAll<HTMLElement>(".bar-fg").forEach((b) => {
            b.style.width = b.dataset.w + "%";
          });
        }, d);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="wrap">
        <div className="center rv">
          <div className="eyebrow">Technical Skills</div>
          <h2 className="s-h">My <span>Tech Stack</span></h2>
          <p className="s-sub" style={{ maxWidth: 480, margin: ".75rem auto 0" }}>
            Tools and technologies I use daily to build production-grade software.
          </p>
        </div>
        <div className="sk-grid">
          {SKILLS.map((s, i) => (
            <div className="sk-card rv" key={s.name} data-d={i * 70}>
              <i className={`${s.icon} sk-logo`} />
              <div className="sk-name">{s.name}</div>
              <div className="sk-cat">{s.cat}</div>
              <div className="bar-bg"><div className="bar-fg" data-w={s.w} /></div>
              <div className="bar-n">{s.w}%</div>
            </div>
          ))}
        </div>
        <div className="tech-row rv" style={{ transitionDelay: ".3s" }}>
          {PILLS.map(([cls, label]) => (
            <div className="t-pill" key={label}><i className={cls} />{label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
