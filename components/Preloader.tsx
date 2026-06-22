"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={hidden ? "hide" : ""}>
      <div className="pre-logo">&lt;Dev /&gt;</div>
      <div className="pre-bar-wrap"><div className="pre-bar" /></div>
      <div className="pre-txt">Loading Portfolio...</div>
    </div>
  );
}
