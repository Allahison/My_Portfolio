"use client";
import { useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: "fa-brands fa-android",
    title: "Android Development",
    desc: "Native Android apps in Kotlin & Java — barcode scanning, REST API integration, custom UI, and Play Store deployment. Currently serving US & UK clients.",
  },
  {
    icon: "fa-solid fa-mobile-screen",
    title: "Cross-Platform Mobile",
    desc: "React Native apps for iOS & Android from a single codebase. Built production apps including social video platforms, AI companions, and business tools.",
  },
  {
    icon: "fa-solid fa-code",
    title: "Full-Stack Web Development",
    desc: "End-to-end web apps with React / Next.js frontend and Node.js / Express backend — dashboards, POS systems, SaaS platforms, and corporate websites.",
  },
  {
    icon: "fa-solid fa-brain",
    title: "AI & Automation",
    desc: "AI-powered features and automation tools — from gesture & voice control systems (Python, OpenCV) to intelligent SaaS integrations and AI assistants.",
  },
];

export default function Services() {
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
    <section id="services" ref={sectionRef}>
      <div className="wrap">
        <div className="center rv">
          <div className="eyebrow">What I Do</div>
          <h2 className="s-h">Services I <span>Offer</span></h2>
          <p className="s-sub" style={{ maxWidth: 480, margin: ".75rem auto 0" }}>
            End-to-end development services tailored to your product needs.
          </p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <div className="svc-card rv" key={s.title} data-d={i * 80}>
              <div className="svc-icon"><i className={s.icon} /></div>
              <div className="svc-arrow"><i className="fa-solid fa-arrow-right" /></div>
              <div className="svc-title">{s.title}</div>
              <div className="svc-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
