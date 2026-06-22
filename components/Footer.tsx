export default function Footer() {
  const NAV = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="ft">
      {/* gradient top line */}
      <div className="ft-topline" />

      {/* CTA banner */}
      <div className="ft-cta">
        <div className="ft-cta-inner">
          <div>
            <div className="ft-cta-tag">Open to opportunities</div>
            <h3 className="ft-cta-h">Let&apos;s build something<br /><span>great together</span></h3>
            <p className="ft-cta-sub">Available for freelance projects and full-time roles worldwide.</p>
          </div>
          <div className="ft-cta-actions">
            <a href="#contact" className="ft-hire-btn">Hire Me</a>
            <a href="https://www.linkedin.com/in/muhammad-arslan-aa8808276/" target="_blank" rel="noreferrer" className="ft-soc"><i className="fa-brands fa-linkedin-in" /></a>
            <a href="https://github.com/Allahison" target="_blank" rel="noreferrer" className="ft-soc"><i className="fa-brands fa-github" /></a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="ft-main">
        <div className="ft-grid">
          {/* Brand */}
          <div className="ft-brand">
            <a href="#hero" className="ft-logo"><span className="ft-logo-br">&#123;</span> Arslan <span className="ft-logo-br">&#125;</span></a>
            <p className="ft-bio">
              Software Engineering graduate from Riphah International University.
              Building web &amp; mobile apps for US and UK clients.
            </p>
            <div className="ft-avail">
              <span className="ft-dot" />
              Available for work — Immediate start
            </div>
          </div>

          {/* Navigation */}
          <div className="ft-col">
            <div className="ft-col-title">Navigation</div>
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="ft-link">
                <i className="fa-solid fa-chevron-right ft-chevron" />{n.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="ft-col">
            <div className="ft-col-title">Contact</div>
            <a href="mailto:hafiz.ars.21@gmail.com" className="ft-info-row">
              <div className="ft-icon-wrap"><i className="fa-solid fa-envelope" /></div>
              <span>hafiz.ars.21@gmail.com</span>
            </a>
            <div className="ft-info-row">
              <div className="ft-icon-wrap"><i className="fa-solid fa-phone" /></div>
              <span>+92 346 876 7192</span>
            </div>
            <div className="ft-info-row">
              <div className="ft-icon-wrap"><i className="fa-solid fa-location-dot" /></div>
              <span>Punjab, Pakistan</span>
            </div>
            <div className="ft-info-row">
              <div className="ft-icon-wrap"><i className="fa-solid fa-globe" /></div>
              <span>Open to relocation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bar">
        <span>&copy; 2026 Muhammad Arslan — All rights reserved</span>
        <span>BS Software Engineering Graduate</span>
      </div>
    </footer>
  );
}
