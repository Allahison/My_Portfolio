"use client";
import { useEffect, useRef } from "react";

const TIMELINE = [
  {
    icon: "fa-solid fa-mobile-screen",
    date: "Apr 2026 — Present",
    role: "Freelance Android Developer",
    company: "BizFinder.ai — US Client (Remote)",
    desc: "Contract Android developer for BizFinder.ai — a UK-based AI business intelligence SaaS. Translating client-provided designs into fully functional native Android UI using Kotlin and Java.",
    chips: ["Kotlin", "Java", "Android", "REST API"],
  },
  {
    icon: "fa-solid fa-warehouse",
    date: "Apr 2026 — Present",
    role: "Freelance Android Developer",
    company: "Mivan Global — UK Client (Remote)",
    desc: "Building a warehouse and PDA management application for a UK-based digital operations company. Developed barcode scanning flows, sync engine, and settings for handheld scanning devices.",
    chips: ["Kotlin", "Java", "Android", "Barcode Scanning"],
  },
  {
    icon: "fa-solid fa-laptop-code",
    date: "2023 — 2024",
    role: "Web & App Development Training",
    company: "Saylani Mass IT Training Program — Faisalabad",
    desc: "Completed an intensive full-stack web and mobile development program. Built 10+ projects covering frontend, backend, and mobile app development from design mockup to deployment.",
    chips: ["React", "Node.js", "React Native", "MongoDB"],
  },
  {
    icon: "fa-solid fa-graduation-cap",
    date: "2022 — 2026",
    role: "BS Software Engineering",
    company: "Riphah International University — Faisalabad",
    desc: "Completed Bachelor's degree in Software Engineering. Coursework covered algorithms, data structures, software architecture, mobile development, and web engineering.",
    chips: ["Software Engineering", "OOP", "Algorithms", "Databases"],
  },
];

export default function Experience() {
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
    <section id="experience" ref={sectionRef}>
      <div className="exp-wrap">
        <div className="center rv">
          <div className="eyebrow">Career Journey</div>
          <h2 className="s-h">Work <span>Experience</span></h2>
        </div>
        <div className="tl">
          {TIMELINE.map((item, i) => (
            <div className="tl-item rv" key={i} data-d={i * 100}>
              <div className="tl-dot"><i className={item.icon} /></div>
              <div className="tl-box">
                <div className="tl-date"><i className="fa-regular fa-calendar" />{item.date}</div>
                <div className="tl-role">{item.role}</div>
                <div className="tl-co"><i className="fa-solid fa-building" />{item.company}</div>
                <div className="tl-desc">{item.desc}</div>
                <div className="chips">
                  {item.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
