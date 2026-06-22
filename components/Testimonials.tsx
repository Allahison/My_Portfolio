"use client";
import { useEffect, useRef } from "react";

const STATS = [
  { value: "2", label: "Active Clients", icon: "fa-solid fa-handshake" },
  { value: "6+", label: "Projects Built", icon: "fa-solid fa-layer-group" },
  { value: "3", label: "Countries Served", icon: "fa-solid fa-earth-americas" },
  { value: "24h", label: "Response Time", icon: "fa-solid fa-bolt" },
];

const WHY = [
  {
    icon: "fa-solid fa-rocket",
    title: "Fast Delivery",
    desc: "Deadline-first mindset. I ship features on time — scope is planned, not guessed.",
  },
  {
    icon: "fa-solid fa-mobile-screen",
    title: "Mobile + Web",
    desc: "Native Android with Kotlin/Java and modern React web — both under one roof.",
  },
  {
    icon: "fa-solid fa-comments",
    title: "Clear Communication",
    desc: "Daily updates, quick replies, no radio silence. You always know where things stand.",
  },
  {
    icon: "fa-solid fa-code",
    title: "Clean Code",
    desc: "Readable, maintainable, production-ready code. No hacky shortcuts, ever.",
  },
  {
    icon: "fa-solid fa-earth-americas",
    title: "Remote-Ready",
    desc: "Actively working with US and UK clients across time zones — zero friction.",
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Fresh Perspective",
    desc: "2026 graduate with latest tech knowledge and no outdated habits to unlearn.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const d = +(e.target as HTMLElement).dataset.d! || 0;
        setTimeout(() => e.target.classList.add("in"), d);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef}>
      <div className="wrap">

        {/* ── Stats ── */}
        <div className="center rv">
          <div className="eyebrow">By The Numbers</div>
          <h2 className="s-h">Results That <span>Speak</span></h2>
        </div>

        <div className="stats-row rv">
          {STATS.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-ico"><i className={s.icon} /></div>
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Why Work With Me ── */}
        <div className="center rv why-heading" style={{marginTop:"3.5rem"}}>
          <div className="eyebrow">Why Me</div>
          <h2 className="s-h">Why Work <span>With Me</span></h2>
        </div>

        <div className="why-grid">
          {WHY.map((w, i) => (
            <div className="why-card rv" key={w.title} data-d={i * 80}>
              <div className="why-ico-wrap"><i className={w.icon} /></div>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
