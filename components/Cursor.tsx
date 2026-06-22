"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const cur = document.getElementById("cur")!;
    const ring = document.getElementById("cur-r")!;
    const trails = [1, 2, 3, 4, 5].map((i) => document.getElementById(`t${i}`)!);
    let mx = 0, my = 0, rx = 0, ry = 0;
    const trailPos = trails.map(() => ({ x: 0, y: 0 }));
    const speeds = [0.08, 0.06, 0.05, 0.04, 0.03];

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + "px"; cur.style.top = my + "px";
      cur.style.opacity = "1";
    };
    document.addEventListener("mousemove", onMove);

    let raf: number;
    const loop = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      trails.forEach((t, i) => {
        const prev = i === 0 ? { x: mx, y: my } : trailPos[i - 1];
        trailPos[i].x += (prev.x - trailPos[i].x) * speeds[i];
        trailPos[i].y += (prev.y - trailPos[i].y) * speeds[i];
        t.style.left = trailPos[i].x + "px";
        t.style.top = trailPos[i].y + "px";
        t.style.opacity = String(0.5 - i * 0.1);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    const hovEls = document.querySelectorAll("a,button,.sk-card,.pj,.testi,.as-box,.pm-item,.svc-card,.t-pill,.soc,.c-link,.s-tag,.pf,.nav-hire,.cert-card");
    const addHov = (el: Element) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("hov"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("hov"));
    };
    hovEls.forEach(addHov);

    const spotlight = document.getElementById("spotlight")!;
    const onMoveSpot = (e: MouseEvent) => {
      spotlight.style.left = e.clientX + "px";
      spotlight.style.top = e.clientY + "px";
    };
    document.addEventListener("mousemove", onMoveSpot, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", onMoveSpot);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />
      <div className="trail" id="t1" style={{ width: 6, height: 6 }} />
      <div className="trail" id="t2" style={{ width: 5, height: 5 }} />
      <div className="trail" id="t3" style={{ width: 4, height: 4 }} />
      <div className="trail" id="t4" style={{ width: 3, height: 3 }} />
      <div className="trail" id="t5" style={{ width: 2, height: 2 }} />
      <div id="spotlight" />
    </>
  );
}
