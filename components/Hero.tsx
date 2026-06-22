"use client";
import { useEffect, useRef } from "react";

const WORDS = ["Android Apps.", "Web Apps.", "Mobile Apps.", "AI Systems.", "React Native Apps."];

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const heroSecRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let wi = 0, ci = 0, del = false;
    let tid: ReturnType<typeof setTimeout>;

    const type = () => {
      if (!typedRef.current) return;
      const w = WORDS[wi];
      if (!del) {
        typedRef.current.textContent = w.slice(0, ++ci);
        if (ci === w.length) { del = true; tid = setTimeout(type, 1600); return; }
      } else {
        typedRef.current.textContent = w.slice(0, --ci);
        if (ci === 0) { del = false; wi = (wi + 1) % WORDS.length; }
      }
      tid = setTimeout(type, del ? 60 : 110);
    };
    tid = setTimeout(type, 2200);

    // Hero parallax
    const heroCard = document.getElementById("heroCard");
    const chips = document.querySelectorAll<HTMLElement>(".hero-chip");

    const onMove = (e: MouseEvent) => {
      const r = heroSecRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (heroCard) {
        heroCard.style.transition = "transform .05s";
        heroCard.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateX(${x * 10}px) translateY(${y * 6}px)`;
      }
      chips.forEach((c, i) => {
        const f = (i + 1) * 5;
        c.style.transform = `translateX(${x * f}px) translateY(${y * f * 0.7}px)`;
      });
    };
    const onLeave = () => {
      if (heroCard) { heroCard.style.transition = "transform .6s ease"; heroCard.style.transform = ""; }
      chips.forEach((c) => { c.style.transform = ""; c.style.transition = "transform .6s ease"; });
    };

    heroSecRef.current?.addEventListener("mousemove", onMove, { passive: true });
    heroSecRef.current?.addEventListener("mouseleave", onLeave);

    // 3D tilt on hero card
    const tilt3D = (card: HTMLElement | null) => {
      if (!card) return;
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`;
        card.style.transition = "transform .1s";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.transition = "transform .5s ease";
      });
    };
    tilt3D(heroCard);

    // Magnetic buttons
    document.querySelectorAll<HTMLElement>(".btn,.nav-hire,.sub-btn").forEach((b) => {
      b.addEventListener("mousemove", (e: MouseEvent) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.22}px) translateY(-3px)`;
      });
      b.addEventListener("mouseleave", () => { b.style.transform = ""; });
    });

    return () => {
      clearTimeout(tid);
    };
  }, []);

  return (
    <section id="hero" ref={heroSecRef}>
      <div className="dot-grid" />
      <div className="hero-g">
        <div className="hero-left">
          <div className="avail-badge">
            <div className="badge-dot" />
            Open to full-time &amp; freelance roles
          </div>
          <div className="building-card">
            <div className="b-dot" />
            <span className="b-label">Currently building</span>
            <span className="b-name">BizFinder — Android App</span>
            <div className="b-prog-wrap"><div className="b-prog" /></div>
            <span style={{ fontSize: ".72rem", color: "var(--muted)", fontWeight: 700 }}>70%</span>
          </div>
          <h1 className="hero-h1">
            <span className="l1">Building</span>
            <span className="l2" ref={typedRef}>Android Apps.</span>
          </h1>
          <p className="hero-sub">
            Android &amp; Full-Stack Developer from Punjab, Pakistan — crafting native Android apps and modern web solutions for US &amp; UK clients.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-solid">
              <i className="fa-solid fa-layer-group fa-sm" /> View My Work
            </a>
            <a href="/Muhammad_Arslan_CV.pdf" download="Muhammad_Arslan_CV.pdf" className="btn btn-outline">
              <i className="fa-solid fa-download fa-sm" /> Download CV
            </a>
          </div>
          <div className="hero-devicons">
            <span>Built with</span>
            <i className="devicon-kotlin-plain colored" title="Kotlin" />
            <i className="devicon-java-plain colored" title="Java" />
            <i className="devicon-react-original colored" title="React" />
            <i className="devicon-nodejs-plain colored" title="Node.js" />
            <i className="devicon-typescript-plain colored" title="TypeScript" />
            <i className="devicon-python-plain colored" title="Python" />
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-chip" style={{ top: "-.5rem", left: "-5rem", animationDuration: "3.5s" }}>
            <i className="devicon-kotlin-plain colored" />Kotlin / Java
          </div>
          <div className="hero-chip" style={{ bottom: "5rem", left: "-5.5rem", animationDuration: "4.5s", animationDelay: "-.5s" }}>
            <i className="devicon-react-original colored" />React Native
          </div>
          <div className="hero-chip" style={{ top: "3rem", right: "-5rem", animationDuration: "4s", animationDelay: "-1s" }}>
            <i className="devicon-nextjs-plain" />Next.js
          </div>

          <div className="code-editor" id="heroCard">
            <div className="ed-bar">
              <div className="ed-dots">
                <div className="ed-dot" style={{ background: "#ff5f57" }} />
                <div className="ed-dot" style={{ background: "#febc2e" }} />
                <div className="ed-dot" style={{ background: "#28c840" }} />
              </div>
              <div className="ed-tab">
                <i className="devicon-kotlin-plain colored" style={{ fontSize: ".85rem" }} />
                ArslanDev.kt
              </div>
            </div>
            <div className="ed-body">
              <div><span className="ln">1</span><span className="cmt">{"// Muhammad Arslan — Android & Full-Stack Dev"}</span></div>
              <div><span className="ln">2</span></div>
              <div><span className="ln">3</span><span className="kw">val</span><span className="norm"> developer = </span><span className="fn">Developer</span><span className="norm">{"("}</span></div>
              <div><span className="ln">4</span><span className="norm">{"  "}</span><span className="attr">name</span><span className="norm"> = </span><span className="str">&quot;Muhammad Arslan&quot;</span><span className="norm">,</span></div>
              <div><span className="ln">5</span><span className="norm">{"  "}</span><span className="attr">stack</span><span className="norm"> = listOf(</span><span className="str">&quot;Kotlin&quot;</span><span className="norm">, </span><span className="str">&quot;React&quot;</span><span className="norm">, </span><span className="str">&quot;Node&quot;</span><span className="norm">),</span></div>
              <div><span className="ln">6</span><span className="norm">{"  "}</span><span className="attr">clients</span><span className="norm"> = listOf(</span><span className="str">&quot;US&quot;</span><span className="norm">, </span><span className="str">&quot;UK&quot;</span><span className="norm">),</span></div>
              <div><span className="ln">7</span><span className="norm">{"  "}</span><span className="attr">available</span><span className="norm"> = </span><span className="kw">true</span></div>
              <div><span className="ln">8</span><span className="norm">{")"}</span></div>
              <div><span className="ln">9</span></div>
              <div><span className="ln">10</span><span className="kw">fun</span><span className="norm"> </span><span className="fn">main</span><span className="norm">{"() {"}</span></div>
              <div><span className="ln">11</span><span className="norm">{"  "}</span><span className="fn">println</span><span className="norm">(</span><span className="str">&quot;Open to opportunities!&quot;</span><span className="norm">)</span></div>
              <div><span className="ln">12</span><span className="norm">{"  developer."}</span><span className="fn">build</span><span className="norm">{"()"}</span></div>
              <div><span className="ln">13</span><span className="norm">{"}"}</span></div>
            </div>
            <div className="ed-terminal">
              <span className="t-prompt">~/arslan-dev</span>
              <span className="t-cmd">./gradlew assembleDebug</span>
              <span className="t-ok"><i className="fa-solid fa-circle-check fa-xs" /> BUILD SUCCESSFUL</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue"><div className="s-line" />SCROLL</div>
    </section>
  );
}
