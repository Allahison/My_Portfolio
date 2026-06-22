"use client";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "#hero", icon: "fa-solid fa-house", label: "Home", bg: "rgba(16,185,129,.14)", color: "#10b981" },
  { href: "#about", icon: "fa-solid fa-user", label: "About", bg: "rgba(99,79,255,.14)", color: "#634fff" },
  { href: "#skills", icon: "fa-solid fa-code", label: "Skills", bg: "rgba(14,165,233,.14)", color: "#0ea5e9" },
  { href: "#services", icon: "fa-solid fa-briefcase", label: "Services", bg: "rgba(245,158,11,.14)", color: "#f59e0b" },
  { href: "#projects", icon: "fa-solid fa-folder-open", label: "Projects", bg: "rgba(219,39,119,.14)", color: "#db2777" },
  { href: "#experience", icon: "fa-solid fa-timeline", label: "Experience", bg: "rgba(139,92,246,.14)", color: "#8b5cf6" },
  { href: "#certs", icon: "fa-solid fa-certificate", label: "Certifications", bg: "rgba(251,146,60,.14)", color: "#fb923c" },
  { href: "#github", icon: "fa-brands fa-github", label: "GitHub Activity", bg: "rgba(148,163,184,.14)", color: "#94a3b8" },
  { href: "#contact", icon: "fa-solid fa-envelope", label: "Contact", bg: "rgba(52,211,153,.14)", color: "#34d399" },
];

const ACTION_ITEMS = [
  { action: "theme", icon: "fa-solid fa-circle-half-stroke", label: "Toggle Dark / Light Mode", bg: "rgba(250,204,21,.14)", color: "#facc15", sc: "T" },
  { href: "/resume.pdf", icon: "fa-solid fa-file-arrow-down", label: "Download Resume", bg: "rgba(67,56,202,.14)", color: "#4338ca" },
  { href: "mailto:maneeq201@gmail.com", icon: "fa-solid fa-paper-plane", label: "Send an Email", bg: "rgba(236,72,153,.14)", color: "#ec4899" },
  { action: "top", icon: "fa-solid fa-arrow-up", label: "Back to Top", bg: "rgba(6,182,212,.14)", color: "#06b6d4", sc: "↑" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const ovRef = useRef<HTMLDivElement>(null);

  const allItems = [...NAV_ITEMS, ...ACTION_ITEMS];

  const execItem = (item: typeof allItems[number]) => {
    setOpen(false);
    document.body.style.overflow = "";
    if ("action" in item && item.action) {
      if (item.action === "theme") {
        const cur = document.documentElement.getAttribute("data-theme");
        const next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        // fire a storage event so Navbar can sync
        window.dispatchEvent(new StorageEvent("storage", { key: "theme", newValue: next }));
      } else if (item.action === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if ("href" in item && item.href) {
      if (item.href.startsWith("#")) {
        const t = document.querySelector(item.href);
        if (t) t.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.href;
      }
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen((v) => !v); setIdx(0); }
      if (!open) return;
      if (e.key === "Escape") { setOpen(false); document.body.style.overflow = ""; }
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, allItems.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); execItem(allItems[idx]); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div id="cmd-ov" className={open ? "open" : ""} ref={ovRef} onClick={(e) => { if (e.target === ovRef.current) { setOpen(false); } }}>
      <div id="cmd-box">
        <div id="cmd-list">
          <div className="cmd-grp">
            <div className="cmd-grp-lbl">Navigate</div>
            {NAV_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`cmd-item${idx === i ? " hi" : ""}`}
                onClick={() => execItem(item)}
                onMouseEnter={() => setIdx(i)}
              >
                <div className="cmd-icon" style={{ background: item.bg }}>
                  <i className={item.icon} style={{ color: item.color }} />
                </div>
                <span className="cmd-item-label">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="cmd-grp">
            <div className="cmd-grp-lbl">Actions</div>
            {ACTION_ITEMS.map((item, i) => {
              const globalIdx = NAV_ITEMS.length + i;
              return (
                <div
                  key={item.label}
                  className={`cmd-item${idx === globalIdx ? " hi" : ""}`}
                  onClick={() => execItem(item)}
                  onMouseEnter={() => setIdx(globalIdx)}
                >
                  <div className="cmd-icon" style={{ background: item.bg }}>
                    <i className={item.icon} style={{ color: item.color }} />
                  </div>
                  <span className="cmd-item-label">{item.label}</span>
                  {"sc" in item && item.sc && <span className="cmd-sc">{item.sc}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="cmd-foot">
          <span><kbd className="cmd-k">↑ ↓</kbd> navigate</span>
          <span><kbd className="cmd-k">↵</kbd> open</span>
          <span><kbd className="cmd-k">Esc</kbd> close</span>
          <span style={{ marginLeft: "auto" }}><kbd className="cmd-k">Ctrl</kbd> + <kbd className="cmd-k">K</kbd> to open</span>
        </div>
      </div>
    </div>
  );
}
