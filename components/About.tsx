"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const d = +(e.target as HTMLElement).dataset.d! || 0;
        setTimeout(() => {
          e.target.classList.add("in");
          e.target.closest("section")?.querySelectorAll<HTMLElement>("[data-target]").forEach((n) => {
            n.textContent = "0";
          });
          e.target.querySelectorAll<HTMLElement>("[data-target]").forEach((n) => {
            const tgt = +n.dataset.target!;
            const step = Math.ceil(tgt / 50);
            let cur = 0;
            const tid = setInterval(() => {
              cur = Math.min(cur + step, tgt);
              n.textContent = cur + (tgt >= 10 ? "+" : "");
              if (cur >= tgt) clearInterval(tid);
            }, 30);
          });
        }, d);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });

    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="wrap">
        <div className="about-g">
          <div className="profile-wrap rl">
            <div className="f-badge" style={{ top: "-1rem", right: "-1rem", animationDuration: "3.5s" }}>
              <i className="fa-brands fa-android" />Android Developer
            </div>
            <div className="f-badge" style={{ bottom: "1rem", left: "-1rem", animationDuration: "4.5s", animationDelay: "-.7s" }}>
              <i className="fa-solid fa-earth-americas" style={{ color: "var(--p3)" }} />US &amp; UK Clients
            </div>
            <div className="profile-photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile.jpg" alt="Muhammad Arslan" className="profile-photo" />
              <div className="profile-photo-overlay">
                <div className="ppo-avail">
                  <span className="ppo-dot" />Available for work
                </div>
                <div className="ppo-name">Muhammad Arslan</div>
                <div className="ppo-role">Android &amp; Full-Stack Developer</div>
                <div className="ppo-links">
                  <a href="https://www.linkedin.com/in/muhammad-arslan-aa8808276/" target="_blank" rel="noreferrer" className="ppo-link"><i className="fa-brands fa-linkedin-in" /></a>
                  <a href="https://github.com/Allahison" target="_blank" rel="noreferrer" className="ppo-link"><i className="fa-brands fa-github" /></a>
                  <a href="mailto:hafiz.ars.21@gmail.com" className="ppo-link"><i className="fa-solid fa-envelope" /></a>
                </div>
              </div>
              <div className="ppo-stats">
                <div className="ppo-stat"><div className="ppo-n" data-target="2">0</div><div className="ppo-l">Clients</div></div>
                <div className="ppo-divider" />
                <div className="ppo-stat"><div className="ppo-n" data-target="6">0</div><div className="ppo-l">Projects</div></div>
                <div className="ppo-divider" />
                <div className="ppo-stat"><div className="ppo-n" data-target="3">0</div><div className="ppo-l">Countries</div></div>
              </div>
            </div>
          </div>

          <div className="rr">
            <div className="eyebrow">About Me</div>
            <h2 className="s-h">Building apps for<br /><span>global clients</span></h2>
            <p className="about-p" style={{ marginTop: "1.2rem" }}>
              I&apos;m Muhammad Arslan, a BS Software Engineering graduate from Riphah International University (Class of 2026), based in Punjab, Pakistan. I&apos;m currently working as a freelance Android developer for US and UK clients — building native Android apps with Kotlin &amp; Java and full-stack web applications with React &amp; Node.js.
            </p>
            <p className="about-p">
              Alongside client work, I build cross-platform apps with React Native and have an AI background — my Final Year Project, JARVIS, combined real-time gesture recognition with voice command control using Python and OpenCV. Available for freelance and full-time roles worldwide — immediate start.
            </p>
            <div className="skills-tags">
              {["Native Android", "React Native", "Full-Stack Web", "AI & Automation", "Remote-Ready", "Immediate Start"].map((t) => (
                <span key={t} className="s-tag">{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-solid"><i className="fa-solid fa-paper-plane fa-sm" /> Work With Me</a>
              <a href="#projects" className="btn btn-outline"><i className="fa-solid fa-folder-open fa-sm" /> See Projects</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
