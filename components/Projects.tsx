"use client";
import { useEffect, useRef, useState } from "react";
import type { GithubRepo } from "@/lib/github";
import {
  PROJECT_OVERRIDES,
  TECH_ICONS,
  LANG_ICONS,
  REPO_SCREEN_MAP,
  CUSTOM_PROJECTS,
  type CustomProject,
} from "@/data/projects-config";

interface Project {
  repoName: string;
  title: string;
  description: string;
  filter: string;
  url: string;
  liveUrl: string | null;
  githubUrl: string | null;
  techIcons: { icon: string; label: string }[];
  stars: number;
  screen: string;
  tags: string[];
  screenshot: string | null;
  badge?: string;
}

function buildProjects(repos: GithubRepo[]): Project[] {
  return repos.map((repo) => {
    const ov = PROJECT_OVERRIDES[repo.name] || {};

    // extraTech first so real tech shows before generic topic tags
    const techKeys = new Set<string>([
      ...(ov.extraTech || []),
      ...(repo.topics || []),
      repo.language?.toLowerCase() || "",
    ].filter(Boolean));

    const techIcons: { icon: string; label: string }[] = [];
    const seen = new Set<string>();
    techKeys.forEach((key) => {
      const t = TECH_ICONS[key];
      if (t && !seen.has(t.icon)) { techIcons.push(t); seen.add(t.icon); }
    });
    // Fallback: add primary language icon if no tech icons found
    if (techIcons.length === 0 && repo.language && LANG_ICONS[repo.language]) {
      techIcons.push({ icon: LANG_ICONS[repo.language], label: repo.language });
    }

    const filter = ov.filter || "Web App";
    const screen = REPO_SCREEN_MAP[repo.name] || "ecom";

    // Tags: first 2 are filter + derived category
    const tags = [filter];

    return {
      repoName: repo.name,
      title: ov.title || repo.name.replace(/-|_/g, " "),
      description: ov.description || repo.description || "No description provided.",
      filter,
      url: (ov.liveUrl || repo.homepage || "").replace(/^https?:\/\//, "") || `github.com/allahison/${repo.name}`,
      liveUrl: ov.liveUrl || repo.homepage || null,
      githubUrl: repo.html_url,
      techIcons: techIcons.slice(0, 5),
      stars: repo.stargazers_count,
      screen,
      tags,
      screenshot: ov.screenshot || null,
    };
  });
}

const FILTERS = ["All", "Web App", "Mobile", "AI/ML"];

function BrowserScreen({ type, screenshot }: { type: string; screenshot?: string | null }) {
  if (screenshot) return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={screenshot}
      alt="Project preview"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
      loading="lazy"
    />
  );
  if (type === "chat") return (
    <div className="scr-chat">
      <div className="scr-msg ai">Hello! How can I help?</div>
      <div className="scr-msg user">Show me the result</div>
      <div className="scr-msg ai">Here you go! ✨</div>
      <div className="scr-input">Type here...<i className="fa-solid fa-paper-plane" style={{ color: "var(--p)", fontSize: ".7rem" }} /></div>
    </div>
  );
  if (type === "dash") return (
    <div className="scr-dash">
      <div className="scr-kpi"><div className="scr-kpi-n">$48K</div><div className="scr-kpi-l">Revenue</div></div>
      <div className="scr-kpi"><div className="scr-kpi-n" style={{ color: "var(--p2)" }}>+23%</div><div className="scr-kpi-l">Growth</div></div>
      <div className="scr-chart">
        {[40, 65, 50, 80, 60, 90, 75, 100].map((h, i) => <div className="scr-bar" key={i} style={{ height: h + "%" }} />)}
      </div>
    </div>
  );
  if (type === "social") return (
    <div className="scr-social">
      <div className="scr-post">
        <div className="scr-post-head"><div className="scr-av" /><div className="scr-nm" /></div>
        <div className="scr-img2" />
      </div>
      <div className="scr-post">
        <div className="scr-post-head">
          <div className="scr-av" style={{ background: "linear-gradient(135deg,#10b981,#06b6d4)" }} />
          <div className="scr-nm" />
        </div>
      </div>
    </div>
  );
  if (type === "auth") return (
    <div className="scr-auth">
      <div className="scr-auth-card">
        <div className="scr-auth-logo" />
        <div className="scr-field" /><div className="scr-field" /><div className="scr-auth-btn" />
      </div>
    </div>
  );
  if (type === "pm") return (
    <div className="scr-pm">
      {[{ cls: "c1" }, { cls: "c2" }, { cls: "c3" }].map(({ cls }, i) => (
        <div className="scr-col" key={i}>
          <div className={`scr-col-h ${cls}`} />
          <div className="scr-task" /><div className="scr-task" />
        </div>
      ))}
    </div>
  );
  if (type === "pos") return (
    <div className="scr-pos">
      <div className="scr-pos-sidebar">
        <div className="scr-pos-logo"><span style={{ color: "#60a5fa", fontWeight: 700, fontSize: ".45rem" }}>⬡ NEXUS POS</span></div>
        {["Dashboard","Point of Sale","Inventory","Customers","Orders","Products","Reports","Expenses"].map((item, i) => (
          <div key={i} className="scr-pos-nav-item" style={{ background: i === 0 ? "rgba(96,165,250,.15)" : "transparent", color: i === 0 ? "#60a5fa" : "rgba(255,255,255,.45)" }}>{item}</div>
        ))}
      </div>
      <div className="scr-pos-main">
        <div className="scr-pos-topbar">
          <span style={{ color: "#fff", fontSize: ".45rem", fontWeight: 600 }}>Dashboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: ".3rem", fontWeight: 700 }}>A</span>
            </div>
            <span style={{ color: "rgba(255,255,255,.6)", fontSize: ".35rem" }}>Admin</span>
          </div>
        </div>
        <div className="scr-pos-kpis">
          {[
            { label: "Today's Sales", val: "$0.00", icon: "💲", color: "#10b981", bg: "rgba(16,185,129,.1)" },
            { label: "Today's Orders", val: "0", icon: "🛒", color: "#60a5fa", bg: "rgba(96,165,250,.1)" },
            { label: "Total Customers", val: "2", icon: "👥", color: "#818cf8", bg: "rgba(129,140,248,.1)" },
            { label: "Low Stock", val: "0", icon: "⚠️", color: "#f59e0b", bg: "rgba(245,158,11,.1)" },
          ].map((k, i) => (
            <div key={i} className="scr-pos-kpi" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".3rem", marginBottom: 2 }}>{k.label}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: ".5rem" }}>{k.val}</div>
                  <div style={{ color: "#10b981", fontSize: ".28rem", marginTop: 1 }}>↑ 12.5% vs yesterday</div>
                </div>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: k.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".4rem" }}>{k.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="scr-pos-bottom">
          <div className="scr-pos-chart-box" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ color: "#fff", fontSize: ".35rem", fontWeight: 600, marginBottom: 2 }}>Revenue Overview</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".28rem", marginBottom: 6 }}>Sales over the last 30 days</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 28 }}>
              {[20,35,25,45,30,55,40,60,45,70,50,65].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h + "%", background: "linear-gradient(180deg,#6366f1,#4f46e5)", borderRadius: "1px 1px 0 0", opacity: .8 }} />
              ))}
            </div>
          </div>
          <div className="scr-pos-orders-box" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ color: "#fff", fontSize: ".35rem", fontWeight: 600, marginBottom: 2 }}>Recent Orders</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".28rem", marginBottom: 4 }}>Latest transactions</div>
            {[1,2,3].map(i => <div key={i} style={{ height: 6, background: "rgba(255,255,255,.06)", borderRadius: 2, marginBottom: 3 }} />)}
          </div>
        </div>
      </div>
    </div>
  );
  if (type === "bizapp") return (
    <div className="scr-mapp" style={{ background: "#0d0d14" }}>
      <div className="scr-mapp-head">
        <div style={{ color: "rgba(255,255,255,.35)", fontSize: ".22rem" }}>Good morning, Maneeq201</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1 }}>
          <span style={{ fontWeight: 800, fontSize: ".42rem", color: "#fff" }}>M Aneeq ▾</span>
          <div style={{ display: "flex", gap: 5, color: "rgba(255,255,255,.4)", fontSize: ".32rem" }}>
            <i className="fa-regular fa-circle-question" /><i className="fa-regular fa-bell" />
          </div>
        </div>
      </div>
      <div className="scr-mapp-card" style={{ borderColor: "rgba(99,102,241,.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: "#6366f1", fontWeight: 700, fontSize: ".28rem" }}>Complete Your Setup</div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: ".22rem", marginBottom: 5 }}>3 of 4 steps completed</div>
          </div>
          <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #6366f1", borderTopColor: "transparent", flexShrink: 0 }} />
        </div>
        {["Add business name & domain","Trigger website scan","Customize widget colors"].map((s,i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontSize: ".18rem", fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: ".22rem" }}>{s}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid rgba(255,255,255,.25)", flexShrink: 0 }} />
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: ".22rem" }}>Install widget code</span>
        </div>
      </div>
      <div className="scr-mapp-card" style={{ background: "linear-gradient(135deg,#1e1b4b,#1a1a2e)", borderColor: "rgba(99,102,241,.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".22rem" }}>Total Leads</div>
            <div style={{ fontWeight: 900, fontSize: ".65rem", color: "#fff", lineHeight: 1 }}>1</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "rgba(99,102,241,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="fa-solid fa-users" style={{ color: "#818cf8", fontSize: ".4rem" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {[["#3b82f6","1 New"],["#f59e0b","0 Contacted"],["#22c55e","0 Qualified"]].map(([c,l],i) => (
            <span key={i} style={{ color: c, fontSize: ".22rem" }}>● {l}</span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 3, padding: "0 6px" }}>
        {[["fa-comment","25","Conversations"],["fa-phone","25","Voice Calls"],["fa-star","--","Avg Rating"]].map(([ic,v,l],i) => (
          <div key={i} style={{ flex: 1, background: "#1a1a2e", borderRadius: 5, padding: "4px 3px", textAlign: "center", border: "1px solid rgba(255,255,255,.06)" }}>
            <i className={`fa-solid ${ic}`} style={{ color: "rgba(255,255,255,.4)", fontSize: ".3rem" }} />
            <div style={{ fontWeight: 700, fontSize: ".38rem", color: "#fff" }}>{v}</div>
            <div style={{ color: "rgba(255,255,255,.3)", fontSize: ".2rem" }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="scr-mapp-nav">
        {[["fa-house","Home",true],["fa-users","Leads",false],["fa-list-check","Activity",false],["fa-comment","Chats",false],["fa-bars","More",false]].map(([ic,l,a],i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <i className={`fa-solid ${ic}`} style={{ color: a ? "#6366f1" : "rgba(255,255,255,.3)", fontSize: ".35rem", display: "block" }} />
            <span style={{ color: a ? "#6366f1" : "rgba(255,255,255,.3)", fontSize: ".2rem" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (type === "pdaapp") return (
    <div className="scr-mapp" style={{ background: "#0d1117", padding: "8px 6px 4px", gap: 5 }}>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: ".5rem", marginBottom: 4 }}>Settings</div>
      {/* Theme */}
      <div style={{ color: "rgba(255,255,255,.35)", fontSize: ".22rem", letterSpacing: ".06em", marginBottom: 3 }}>APPEARANCE</div>
      <div style={{ background: "#161b2e", borderRadius: 7, padding: "6px 8px", marginBottom: 5 }}>
        <div style={{ color: "#fff", fontSize: ".28rem", marginBottom: 6 }}>App Theme</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[["#c2550f","Deep\nHorizon"],["#2563eb","Midnight\nBlue"],["#16a34a","Forest"],["#d97706","Steel"]].map(([c,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: c, margin: "0 auto 3px", outline: i === 3 ? "2px solid #fff" : "none", outlineOffset: 1 }} />
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".19rem", whiteSpace: "pre-line", lineHeight: 1.2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Prefs */}
      <div style={{ color: "rgba(255,255,255,.35)", fontSize: ".22rem", letterSpacing: ".06em", marginBottom: 3 }}>OPERATIONAL PREFERENCES</div>
      <div style={{ background: "#161b2e", borderRadius: 7, overflow: "hidden", marginBottom: 5 }}>
        {["Auto-Sync Data","Sound on Scan","Vibration Feedback"].map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 8px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
            <span style={{ color: "#fff", fontSize: ".26rem" }}>{item}</span>
            <div style={{ width: 22, height: 12, borderRadius: 6, background: "#2563eb", position: "relative" }}>
              <div style={{ position: "absolute", right: 2, top: 2, width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
            </div>
          </div>
        ))}
      </div>
      {/* Buttons */}
      <div style={{ border: "1px solid rgba(255,255,255,.15)", borderRadius: 6, padding: "4px 0", textAlign: "center", marginBottom: 4 }}>
        <span style={{ color: "rgba(255,255,255,.5)", fontSize: ".26rem", letterSpacing: ".05em" }}>CLEAR CACHE</span>
      </div>
      <div style={{ background: "#2563eb", borderRadius: 6, padding: "4px 0", textAlign: "center", marginBottom: 5 }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: ".27rem", letterSpacing: ".05em" }}>LOGOUT</span>
      </div>
      {/* About */}
      <div style={{ color: "rgba(255,255,255,.35)", fontSize: ".22rem", letterSpacing: ".06em", marginBottom: 3 }}>ABOUT</div>
      <div style={{ background: "#161b2e", borderRadius: 7, overflow: "hidden" }}>
        {[["App Name","Maaab PDA",null],["Version","1.0.0",null],["Build",null,"DEBUG"]].map(([l,v,badge],i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
            <span style={{ color: "rgba(255,255,255,.45)", fontSize: ".24rem" }}>{l}</span>
            {badge ? <span style={{ background: "transparent", border: "1px solid #d97706", color: "#d97706", borderRadius: 3, padding: "1px 5px", fontSize: ".22rem", fontWeight: 700 }}>{badge}</span>
              : <span style={{ color: "#fff", fontWeight: 600, fontSize: ".24rem" }}>{v}</span>}
          </div>
        ))}
      </div>
    </div>
  );
  if (type === "litapp") return (
    <div className="scr-mapp" style={{ background: "#000" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1a0a0a 0%,#3d0000 40%,#1a0505 100%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 24, height: 24, borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="fa-solid fa-play" style={{ color: "#fff", fontSize: ".45rem", marginLeft: 2 }} />
        </div>
        <div style={{ position: "absolute", bottom: 8, left: 8 }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: ".27rem" }}>Tip @mmujoo</div>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".23rem" }}>#albanian #blunt & real-shota</div>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".21rem", marginTop: 1 }}>502 views · Mar-25</div>
        </div>
        <div style={{ position: "absolute", right: 6, top: 8, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          {[["fa-trophy","Contest"],["fa-film","Intro Feed"],["fa-video","Video DMs"]].map(([ic,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <i className={`fa-solid ${ic}`} style={{ color: "#fff", fontSize: ".4rem", display: "block" }} />
              <span style={{ color: "rgba(255,255,255,.6)", fontSize: ".19rem" }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", right: 6, bottom: 30, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
          {[["fa-heart","79"],["fa-comment-dots","23"],["fa-share","0"]].map(([ic,n],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <i className={`fa-solid ${ic}`} style={{ color: "#fff", fontSize: ".38rem", display: "block" }} />
              <span style={{ color: "#fff", fontSize: ".2rem" }}>{n}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="scr-mapp-nav" style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        {[["fa-house","Feed",true],["fa-compass","Explore",false],["fa-circle-plus","Create",false],["fa-bell","Activity",false],["fa-user","Me",false]].map(([ic,l,a],i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <i className={`fa-solid ${ic}`} style={{ color: a ? "#c026d3" : "rgba(255,255,255,.4)", fontSize: ".38rem", display: "block" }} />
            <span style={{ color: a ? "#c026d3" : "rgba(255,255,255,.4)", fontSize: ".2rem" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (type === "jarvis") return (
    <div style={{ background: "#0a0a14", width: "100%", height: "100%", display: "flex", flexDirection: "column", fontFamily: "monospace", overflow: "hidden" }}>
      <div style={{ background: "#0d0d1a", borderBottom: "1px solid rgba(233,30,99,.2)", padding: "5px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: "linear-gradient(135deg,#e91e63,#9c27b0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontSize: ".3rem", fontWeight: 900 }}>J</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: ".28rem", fontWeight: 900, letterSpacing: ".04em" }}>AI BASED GESTURE &amp; VOICE COMMAND CONTROL</div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#e91e63", boxShadow: "0 0 4px #e91e63" }} />
              <span style={{ color: "rgba(255,255,255,.4)", fontSize: ".18rem", letterSpacing: ".05em" }}>SPEAKING INTERFACE ACTIVE</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div><div style={{ color: "rgba(255,255,255,.3)", fontSize: ".17rem", letterSpacing: ".05em" }}>GESTURE MODE</div><div style={{ display: "flex", alignItems: "center", gap: 2 }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00bcd4" }} /><span style={{ color: "#00bcd4", fontSize: ".2rem", fontWeight: 700 }}>ACTIVE_SENSORS</span></div></div>
          <div><div style={{ color: "rgba(255,255,255,.3)", fontSize: ".17rem", letterSpacing: ".05em" }}>RESPONSE MODE</div><span style={{ color: "rgba(255,255,255,.65)", fontSize: ".2rem", fontWeight: 700 }}>LATENCY_OPTIMIZED</span></div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", padding: "8px", gap: 8, overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <div style={{ background: "#0d0d1a", border: "1px solid rgba(233,30,99,.18)", borderRadius: 8, padding: "8px 10px", width: "100%", display: "flex", alignItems: "flex-end", gap: 2, height: 52, justifyContent: "center" }}>
            {[8,14,22,30,18,26,36,28,20,34,14,22,18,30,25,20,28,36,22,18,30,15,26,20,33,18,28,36,22].map((h, i) => (
              <div key={i} style={{ width: 3, height: h, background: "linear-gradient(180deg,#e91e63,rgba(233,30,99,.25))", borderRadius: 1 }} />
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(233,30,99,.12)", border: "2px solid #e91e63", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(233,30,99,.35)" }}>
              <i className="fa-solid fa-microphone" style={{ color: "#e91e63", fontSize: ".58rem" }} />
            </div>
            <div style={{ border: "1.5px solid #00bcd4", borderRadius: 10, padding: "3px 9px" }}>
              <div style={{ color: "#00bcd4", fontSize: ".2rem", fontWeight: 700, letterSpacing: ".05em" }}>GESTURE ENGINE ACTIVE</div>
            </div>
          </div>
        </div>
        <div style={{ width: 95, display: "flex", flexDirection: "column", gap: 4, paddingTop: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.18)" }} />
            <span style={{ color: "rgba(255,255,255,.3)", fontSize: ".19rem", letterSpacing: ".05em" }}>NEURAL FEED</span>
          </div>
          {["synthesizing neural response...","processing audio stream...","synthesizing neural response...","link established, awaiting input.","neural link active"].map((t, i) => (
            <div key={i} style={{ color: `rgba(255,255,255,${Math.max(.15, .5 - i * .08)})`, fontSize: ".19rem" }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ background: "#0d0d1a", borderTop: "1px solid rgba(255,255,255,.06)", padding: "3px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div><div style={{ color: "rgba(255,255,255,.28)", fontSize: ".16rem", letterSpacing: ".04em" }}>QUANTUM CORE</div><div style={{ color: "#00bcd4", fontSize: ".19rem", fontWeight: 700 }}>STABLE · 0.02ms</div></div>
          <div><div style={{ color: "rgba(255,255,255,.28)", fontSize: ".16rem", letterSpacing: ".04em" }}>INTEGRITY</div><div style={{ color: "#4ade80", fontSize: ".19rem", fontWeight: 700 }}>SECURED</div></div>
        </div>
        <div style={{ color: "rgba(255,255,255,.18)", fontSize: ".17rem", letterSpacing: ".03em" }}>NEURAL LINK V3.5 · JARVIS IS PROFESSIONAL AND HIGHLY EFFICIENT.</div>
      </div>
    </div>
  );
  if (type === "bizlogin") return (
    <div className="scr-biz">
      {/* Left — login form */}
      <div className="scr-biz-left">
        <div style={{ fontWeight: 900, fontSize: ".5rem", color: "#fff", marginBottom: 8, letterSpacing: "-.01em" }}>
          Biz<span style={{ color: "#22c55e" }}>finder</span><span style={{ color: "rgba(255,255,255,.4)", fontWeight: 400, fontSize: ".35rem" }}>.ai</span>
        </div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: ".65rem", marginBottom: 2 }}>Welcome back</div>
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".28rem", marginBottom: 10 }}>Sign in to your dashboard.</div>
        <div style={{ color: "rgba(255,255,255,.7)", fontSize: ".28rem", marginBottom: 3 }}>Email</div>
        <div className="scr-biz-field" style={{ marginBottom: 6 }}>
          <span style={{ color: "rgba(255,255,255,.25)", fontSize: ".28rem" }}>name@example.com</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".28rem" }}>Password</span>
          <span style={{ color: "#22c55e", fontSize: ".28rem" }}>Forgot?</span>
        </div>
        <div className="scr-biz-field" style={{ marginBottom: 6 }}>
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: ".32rem", letterSpacing: 2 }}>••••••••••</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 8 }}>
          <div style={{ width: 7, height: 7, background: "#22c55e", borderRadius: 1 }} />
          <span style={{ color: "rgba(255,255,255,.5)", fontSize: ".27rem" }}>Keep me signed in on this device</span>
        </div>
        <div style={{ background: "linear-gradient(90deg,#16a34a,#22c55e)", borderRadius: 4, padding: "5px 0", textAlign: "center", marginBottom: 6 }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: ".32rem" }}>Sign in</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
          <span style={{ color: "rgba(255,255,255,.3)", fontSize: ".24rem" }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
        </div>
        <div style={{ border: "1px solid rgba(255,255,255,.12)", borderRadius: 4, padding: "3px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <span style={{ fontSize: ".35rem" }}>G</span>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: ".28rem", fontWeight: 600 }}>Continue with Google</span>
        </div>
      </div>
      {/* Right — testimonial */}
      <div className="scr-biz-right">
        <div className="scr-biz-card">
          <div style={{ color: "#facc15", fontSize: ".45rem", marginBottom: 5 }}>★★★★★</div>
          <div style={{ color: "#fff", fontSize: ".3rem", lineHeight: 1.6, marginBottom: 8, fontStyle: "italic" }}>
            &ldquo;BizFinder picked up 14 missed calls in the first week. Two of them were $4k catering orders.&rdquo;
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#16a34a,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: ".3rem" }}>JM</span>
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: ".3rem" }}>Jessica Mendez</div>
              <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".26rem" }}>Owner · Caffeinated Clay</div>
            </div>
          </div>
        </div>
        <div className="scr-biz-stats">
          {[["2,400+","Businesses"],["$12M+","Revenue"],["4.9/5","Rating"]].map(([n,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: ".45rem" }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".26rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  if (type === "corp") return (
    <div className="scr-corp">
      {/* Navbar */}
      <div className="scr-corp-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 14, height: 14, background: "#fff", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#0a0f1e", fontWeight: 900, fontSize: ".35rem" }}>MG</span>
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: ".35rem", lineHeight: 1 }}>Mivan Global</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: ".25rem" }}>LTD</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {["Services","Industries","Company"].map(n => (
            <span key={n} style={{ color: "rgba(255,255,255,.6)", fontSize: ".28rem" }}>{n}</span>
          ))}
          <div style={{ background: "#2563eb", borderRadius: 3, padding: "2px 5px" }}>
            <span style={{ color: "#fff", fontSize: ".27rem", fontWeight: 600 }}>Book Free Consultation</span>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="scr-corp-hero">
        <div className="scr-corp-left">
          <div style={{ color: "#1d9bf0", fontSize: ".3rem", fontWeight: 600, letterSpacing: ".04em", marginBottom: 4 }}>MIVAN GLOBAL LTD · UK DIGITAL OPERATIONS PARTNER</div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: ".7rem", lineHeight: 1.15, marginBottom: 2 }}>AUTOMATE YOUR</div>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: ".7rem", lineHeight: 1.15, marginBottom: 2 }}>BUSINESS.</div>
          <div style={{ color: "#1d9bf0", fontWeight: 900, fontSize: ".7rem", lineHeight: 1.15, marginBottom: 2 }}>SCALE YOUR</div>
          <div style={{ color: "#1d9bf0", fontWeight: 900, fontSize: ".7rem", lineHeight: 1.15, marginBottom: 2 }}>SALES.</div>
          <div style={{ color: "rgba(255,255,255,.85)", fontWeight: 900, fontSize: ".7rem", lineHeight: 1.15, marginBottom: 6 }}>CONTROL EVERYTHING.</div>
          <div style={{ color: "rgba(255,255,255,.55)", fontSize: ".28rem", lineHeight: 1.5, marginBottom: 8, maxWidth: 130 }}>
            Mivan Global Ltd helps growing businesses connect CRM, AI agents, e-commerce and marketing into one automated system.
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <div style={{ background: "#2563eb", borderRadius: 3, padding: "3px 7px" }}>
              <span style={{ color: "#fff", fontSize: ".28rem", fontWeight: 600 }}>Book a Free Consultation</span>
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 3, padding: "3px 7px" }}>
              <span style={{ color: "#fff", fontSize: ".28rem" }}>Explore Services</span>
            </div>
          </div>
        </div>
        <div className="scr-corp-right">
          <div className="scr-corp-img" />
          <div className="scr-corp-badge-exp">
            <div style={{ color: "#fff", fontWeight: 900, fontSize: ".6rem" }}>7+</div>
            <div style={{ color: "rgba(255,255,255,.8)", fontSize: ".25rem", fontWeight: 600 }}>YEARS EXPERIENCE</div>
          </div>
          <div className="scr-corp-badge-uk">
            <div style={{ color: "#fff", fontWeight: 700, fontSize: ".32rem" }}>UK-Based</div>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: ".24rem", letterSpacing: ".03em" }}>DIGITAL OPERATIONS PARTNER</div>
          </div>
        </div>
      </div>
    </div>
  );
  // default: ecom
  return (
    <div className="scr-ecom">
      {[
        { img: "linear-gradient(135deg,#e0e7ff,#fce7f3)", price: "linear-gradient(90deg,var(--p),var(--p2))" },
        { img: "linear-gradient(135deg,#d1fae5,#bfdbfe)", price: "linear-gradient(90deg,#10b981,#06b6d4)" },
        { img: "linear-gradient(135deg,#fce7f3,#f3e8ff)", price: "linear-gradient(90deg,#db2777,#9333ea)" },
      ].map((item, i) => (
        <div className="scr-ecom-item" key={i}>
          <div className="scr-ecom-img" style={{ background: item.img }} />
          <div className="scr-ecom-line" />
          <div className="scr-ecom-price" style={{ background: item.price }} />
        </div>
      ))}
    </div>
  );
}

export default function Projects({ repos }: { repos: GithubRepo[] }) {
  const [active, setActive] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const customBuilt: Project[] = CUSTOM_PROJECTS.map((cp: CustomProject) => ({
    repoName: cp.repoName,
    title: cp.title,
    description: cp.description,
    filter: cp.filter,
    url: cp.url,
    liveUrl: cp.liveUrl,
    githubUrl: cp.githubUrl,
    techIcons: cp.extraTech.map((k) => TECH_ICONS[k]).filter(Boolean).slice(0, 4),
    stars: cp.stars,
    screen: cp.screen,
    tags: cp.tags,
    screenshot: cp.screenshot,
    badge: cp.badge,
  }));

  const projects = [...customBuilt, ...buildProjects(repos)];
  const filtered = active === "All" ? projects : projects.filter((p) => p.filter === active);

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

    // 3D tilt
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".pj");
    cards?.forEach((card) => {
      card.addEventListener("mouseenter", () => { card.style.transition = "box-shadow .4s"; });
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-10px)`;
        card.style.transition = "transform .1s";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform .5s ease, box-shadow .4s";
      });
    });

    return () => io.disconnect();
  }, [active]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="wrap">
        <div className="center rv">
          <div className="eyebrow">Portfolio</div>
          <h2 className="s-h">Featured <span>Projects</span></h2>
          <p className="s-sub" style={{ maxWidth: 480, margin: ".75rem auto 0" }}>
            Real projects I&apos;ve built — sourced live from my{" "}
            <a href="https://github.com/allahison" target="_blank" rel="noreferrer" style={{ color: "var(--p)", fontWeight: 700 }}>
              GitHub
            </a>.
          </p>
        </div>

        <div className="proj-filters rv">
          {FILTERS.map((f) => (
            <button key={f} className={`pf${active === f ? " on" : ""}`} onClick={() => setActive(f)}>{f}</button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div className="pj rv" key={p.repoName} data-d={Math.min(i * 80, 400)}>
              <div className="browser">
                <div className="b-bar">
                  <div className="b-dots">
                    <div className="b-d r" /><div className="b-d y" /><div className="b-d g" />
                  </div>
                  <div className="b-url">
                    <i className={p.liveUrl ? "fa-solid fa-lock" : "fa-brands fa-github"} />
                    {p.url}
                  </div>
                </div>
                <div className="b-screen"><BrowserScreen type={p.screen} screenshot={p.screenshot} /></div>
              </div>

              <div className="pj-body">
                <div className="pj-tags">
                  {p.badge && <span className="pj-tag pj-tag-client">{p.badge}</span>}
                  {p.tags.map((t) => <span key={t} className="pj-tag">{t}</span>)}
                </div>
                <div className="pj-title">{p.title}</div>
                <div className="pj-desc">{p.description}</div>
                <div className="pj-foot">
                  <div className="pj-links">
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="pj-link" title="View on GitHub">
                        <i className="fa-brands fa-github" />
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="pj-link" title="Live Demo">
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--muted)", padding: "3rem 0" }}>
            No projects found for this filter.
          </p>
        )}
      </div>
    </section>
  );
}
