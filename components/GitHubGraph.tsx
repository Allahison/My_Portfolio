"use client";
import { useEffect, useRef } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PATTERN = [0,0,1,1,2,3,4,4,3,2,1,0,1,2,3,4,3,4,4,3,2,1,0,1,2,3,4,3,2,3,4,4,3,2,1,0,1,2,3,4,3,2,1,2,3,4,3,1,0,0];

export default function GitHubGraph({ username }: { username: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const monthsRef = useRef<HTMLDivElement>(null);

  const STATS = [
    { target: 20, label: "Repositories", icon: "fa-solid fa-book fa-xs" },
    { target: 0, label: "GitHub Stars", icon: "fa-solid fa-star fa-xs" },
    { target: 150, label: "Contributions", icon: "fa-solid fa-fire fa-xs" },
    { target: 15, label: "Pull Requests", icon: "fa-solid fa-code-pull-request fa-xs" },
  ];

  useEffect(() => {
    // Build grid
    if (gridRef.current && !gridRef.current.children.length) {
      for (let w = 0; w < 52; w++) {
        const week = document.createElement("div");
        week.className = "gh-week";
        for (let d = 0; d < 7; d++) {
          const day = document.createElement("div");
          const base = PATTERN[Math.floor(Math.random() * PATTERN.length)];
          const lvl = Math.random() < 0.3 ? 0 : base;
          const count = lvl === 0 ? 0 : Math.floor(Math.random() * 5 + 1) * lvl;
          day.className = "gh-day" + (lvl > 0 ? " l" + Math.min(lvl, 4) : "");
          day.title = count === 0 ? "No contributions" : `${count} contribution${count > 1 ? "s" : ""}`;
          week.appendChild(day);
        }
        gridRef.current.appendChild(week);
      }
    }

    // Build months row
    if (monthsRef.current && !monthsRef.current.children.length) {
      MONTHS.forEach((m) => {
        const s = document.createElement("span");
        s.textContent = m;
        s.className = "gh-month";
        monthsRef.current!.appendChild(s);
      });
    }

    // Scroll reveal + counters
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const d = +(e.target as HTMLElement).dataset.d! || 0;
        setTimeout(() => {
          e.target.classList.add("in");
          e.target.querySelectorAll<HTMLElement>("[data-target]").forEach((n) => {
            const tgt = +n.dataset.target!;
            if (tgt === 0) { n.textContent = "0"; return; }
            const step = Math.ceil(tgt / 50);
            let cur = 0;
            const tid = setInterval(() => {
              cur = Math.min(cur + step, tgt);
              n.textContent = cur + "+";
              if (cur >= tgt) clearInterval(tid);
            }, 25);
          });
        }, d);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="github" ref={sectionRef}>
      <div className="wrap">
        <div className="center rv">
          <div className="eyebrow">Open Source</div>
          <h2 className="s-h">GitHub <span>Activity</span></h2>
          <p className="s-sub" style={{ maxWidth: 500, margin: ".75rem auto 0" }}>
            Consistently shipping code across personal and client projects.
          </p>
        </div>

        <div className="gh-wrap rv">
          <div className="gh-top">
            <div className="gh-title">
              <i className="fa-brands fa-github" />
              <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                github.com/{username}
              </a>
            </div>
            <div className="gh-count">Activity overview</div>
          </div>
          <div className="gh-months" ref={monthsRef} />
          <div className="gh-grid" ref={gridRef} />
          <div className="gh-legend">
            <span>Less</span>
            <div className="gh-l-box" />
            <div className="gh-l-box gh-day l1" />
            <div className="gh-l-box gh-day l2" />
            <div className="gh-l-box gh-day l3" />
            <div className="gh-l-box gh-day l4" />
            <span>More</span>
          </div>
        </div>

        <div className="gh-stats rv" style={{ transitionDelay: ".2s" }}>
          {STATS.map((s) => (
            <div className="gh-stat" key={s.label}>
              <div className="gh-stat-n" data-target={s.target}>0</div>
              <div className="gh-stat-l"><i className={s.icon} /> {s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
