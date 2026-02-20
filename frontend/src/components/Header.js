import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="relative overflow-hidden z-20 shadow-lg"
      style={{ background: "linear-gradient(135deg,#0369a1 0%,#0284c7 45%,#0ea5e9 75%,#06b6d4 100%)" }}>

      {/* Water photo overlay */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 60%",
          mixBlendMode: "overlay", opacity: 0.22,
        }} />

      {/* Shimmer */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 20% 40%,rgba(255,255,255,0.14) 0%,transparent 65%)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex items-center justify-between gap-3">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="anim-drop-bob flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: "rgba(255,255,255,0.22)", backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}>💧</div>
          <div>
            <h1 className="font-black text-white leading-none"
              style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(18px,3.5vw,26px)", letterSpacing: "-0.4px", textShadow: "0 2px 10px rgba(0,0,0,0.18)" }}>
              JalDarpan
            </h1>
            <p className="font-bold uppercase tracking-widest mt-0.5"
              style={{ fontSize: "clamp(7px,1.2vw,10px)", color: "rgba(224,242,254,0.85)", letterSpacing: "0.16em" }}>
              Sangli · Miraj · Kupwad
            </p>
          </div>
        </div>

        {/* Right badges */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-red-300 flex-shrink-0"
              style={{ animation: "pulse-ring 1.5s ease-in-out infinite" }} />
            <span className="text-white font-black tracking-widest" style={{ fontSize: 11 }}>LIVE</span>
          </div>
          <div className="px-3 py-1.5 rounded-full hidden sm:block"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,255,255,0.35)" }}>
            <span className="font-extrabold text-white" style={{ fontFamily: "'Nunito',sans-serif", fontSize: "clamp(11px,1.8vw,14px)", letterSpacing: "0.04em" }}>
              {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}