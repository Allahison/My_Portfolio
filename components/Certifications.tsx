"use client";
import { useEffect, useRef } from "react";

const CERTS = [
  {
    stripe: "linear-gradient(90deg,#FF9900,#ffb84d)",
    badgeBg: "rgba(255,153,0,.1)",
    logoBg: "rgba(255,153,0,.1)",
    icon: "fa-brands fa-aws",
    iconColor: "#FF9900",
    title: "AWS Certified Developer — Associate",
    org: "Amazon Web Services",
    date: "Issued: March 2024",
    id: "AWS-DEV-2024-XXXX",
  },
  {
    stripe: "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)",
    badgeBg: "rgba(66,133,244,.1)",
    logoBg: "rgba(66,133,244,.1)",
    icon: "fa-brands fa-google",
    iconColor: "#4285F4",
    title: "Google Professional Cloud Developer",
    org: "Google Cloud",
    date: "Issued: November 2023",
    id: "GCP-DEV-2023-XXXX",
  },
  {
    stripe: "linear-gradient(90deg,#1877F2,#42a5f5)",
    badgeBg: "rgba(24,119,242,.1)",
    logoBg: "rgba(24,119,242,.1)",
    icon: "fa-brands fa-meta",
    iconColor: "#1877F2",
    title: "Meta Frontend Developer Certificate",
    org: "Meta / Coursera",
    date: "Issued: July 2023",
    id: "META-FE-2023-XXXX",
  },
  {
    stripe: "linear-gradient(90deg,#13aa52,#3fe897)",
    badgeBg: "rgba(19,170,82,.1)",
    logoBg: "rgba(19,170,82,.1)",
    icon: "devicon-mongodb-plain colored",
    iconColor: "#13aa52",
    title: "MongoDB Certified Developer",
    org: "MongoDB University",
    date: "Issued: January 2023",
    id: "MDB-DEV-2023-XXXX",
    isDevicon: true,
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const d = +(e.target as HTMLElement).dataset.d! || 0;
        setTimeout(() => e.target.classList.add("in"), d);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    sectionRef.current?.querySelectorAll(".rv,.rl,.rr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="certs" ref={sectionRef}>
      <div className="wrap">
        <div className="center rv">
          <div className="eyebrow">Achievements</div>
          <h2 className="s-h">Certifications &amp; <span>Awards</span></h2>
          <p className="s-sub" style={{ maxWidth: 480, margin: ".75rem auto 0" }}>
            Verified credentials from leading tech platforms and organizations.
          </p>
        </div>
        <div className="cert-grid">
          {CERTS.map((c, i) => (
            <div className="cert-card rv" key={c.title} data-d={i * 80}>
              <div className="cert-stripe" style={{ background: c.stripe }} />
              <div className="cert-badge" style={{ background: c.badgeBg }}>
                <i className={c.icon} style={{ color: c.iconColor, fontSize: c.isDevicon ? "1rem" : undefined }} />
              </div>
              <div className="cert-logo" style={{ background: c.logoBg }}>
                <i className={c.icon} style={{ color: c.iconColor, fontSize: c.isDevicon ? undefined : undefined }} />
              </div>
              <div className="cert-title">{c.title}</div>
              <div className="cert-org"><i className="fa-solid fa-building" />{c.org}</div>
              <div className="cert-date">{c.date}</div>
              <div className="cert-id">Credential ID: {c.id}</div>
              <a href="#" className="cert-verify">
                <i className="fa-solid fa-shield-check" style={{ color: "#10b981" }} />
                Verify Certificate <i className="fa-solid fa-arrow-right fa-xs" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
