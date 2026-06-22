"use client";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "mailto:hafiz.ars.21@gmail.com", icon: "fa-solid fa-envelope", label: "hafiz.ars.21@gmail.com" },
  { href: "tel:+923468767192", icon: "fa-solid fa-phone", label: "+92 346 876 7192" },
  { href: "https://www.linkedin.com/in/muhammad-arslan-aa8808276/", icon: "fa-brands fa-linkedin-in", label: "linkedin.com/in/muhammad-arslan" },
  { href: "https://github.com/Allahison", icon: "fa-brands fa-github", label: "github.com/Allahison" },
  { href: "#", icon: "fa-solid fa-location-dot", label: "Punjab, Pakistan — Open to relocation" },
];

const QUICK = [
  { icon: "fa-solid fa-briefcase", text: "Hi Arslan, I have a freelance project for you." },
  { icon: "fa-solid fa-handshake", text: "Hi Arslan, I'd like to discuss a full-time opportunity." },
  { icon: "fa-solid fa-mobile-screen", text: "Hi Arslan, I want to hire you for Android development." },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setTimeout(() => e.target.classList.add("in"), 0);
        io.unobserve(e.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });
    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openWhatsApp = () => {
    const text = encodeURIComponent(msg.trim() || "Hi Arslan, I'd like to connect with you.");
    window.open(`https://wa.me/923468767192?text=${text}`, "_blank", "noreferrer");
  };

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-g">
        <div className="rl">
          <div className="eyebrow">Get In Touch</div>
          <h2 className="s-h">Let&apos;s Build<br /><span>Something Great</span></h2>
          <p className="contact-p">
            Available for freelance projects and full-time roles worldwide — immediate start. Whether you have a project in mind or just want to connect, I respond within 24 hours.
          </p>
          <div className="c-links">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="c-link" target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noreferrer" : undefined}>
                <div className="c-link-ic"><i className={l.icon} /></div>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rr wa-card">
          {/* Header */}
          <div className="wa-hd">
            <div className="wa-av"><i className="fa-brands fa-whatsapp" /></div>
            <div className="wa-hinfo">
              <div className="wa-hname">Muhammad Arslan</div>
              <div className="wa-hstat"><span className="wa-hdot" />Online · Replies within hours</div>
            </div>
            <div className="wa-hbadge">WhatsApp</div>
          </div>

          {/* Body */}
          <div className="wa-bd">
            {/* Quick picks */}
            <div className="wa-sec">
              <div className="wa-sec-lbl"><i className="fa-solid fa-bolt" />What can I help you with?</div>
              <div className="wa-ql">
                {QUICK.map((q) => (
                  <button
                    key={q.text}
                    className={`wa-qb${msg === q.text ? " sel" : ""}`}
                    onClick={() => setMsg(msg === q.text ? "" : q.text)}
                  >
                    <span className="wa-qi"><i className={q.icon} /></span>
                    <span className="wa-qt">{q.text}</span>
                    {msg === q.text && <i className="fa-solid fa-circle-check wa-ck" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="wa-divider"><span>or type your own</span></div>

            {/* Custom textarea */}
            <div className="wa-ta-wrap">
              <textarea
                className="wa-ta"
                placeholder="Hi Arslan, I'd like to discuss..."
                value={msg}
                onChange={(e) => setMsg(e.target.value.slice(0, 500))}
                rows={3}
                maxLength={500}
              />
              <div className="wa-cc">{msg.length} / 500</div>
            </div>

            {/* CTA */}
            <button className="wa-cta" onClick={openWhatsApp}>
              <i className="fa-brands fa-whatsapp wa-cta-ico" />
              <span>Open WhatsApp</span>
              <i className="fa-solid fa-arrow-right wa-cta-arr" />
            </button>
            <p className="wa-note"><i className="fa-solid fa-shield-halved" />Message opens pre-filled — just tap send.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
