"use client";
import { useEffect, useState, useCallback } from "react";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  const applyTheme = useCallback((t: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
    setTheme(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 60);
      let cur = "hero";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 130) cur = s.id;
      });
      setActiveId(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const navLinks = [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav id="nav" className={solid ? "solid" : ""}>
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-bracket">&#123;</span>
          <span className="nav-logo-name">Arslan</span>
          <span className="nav-logo-bracket">&#125;</span>
        </a>
        <ul className="nav-menu">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={activeId === href.slice(1) ? "act" : ""}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-r">
          <button id="theme-btn" aria-label="Toggle theme" onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}>
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`} />
          </button>
          <a href="#contact" className="nav-hire">Hire Me <i className="fa-solid fa-arrow-right fa-xs" /></a>
          <button id="burger" className={menuOpen ? "on" : ""} aria-label="Menu" onClick={() => toggleMenu(!menuOpen)}>
            <span className="bl" /><span className="bl" /><span className="bl" />
          </button>
        </div>
      </nav>

      <div id="mob-nav" className={menuOpen ? "open" : ""}>
        <button className="mob-close" onClick={() => toggleMenu(false)}>
          <i className="fa-solid fa-xmark" />
        </button>
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => toggleMenu(false)}>{label}</a>
        ))}
      </div>
    </>
  );
}
