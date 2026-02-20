import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header style={{
      background: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #06b6d4 100%)",
      boxShadow: "0 4px 24px rgba(3,105,161,0.3)",
      position: "relative",
      overflow: "hidden",
      width: "100%",
    }}>
      {/* Water photo overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=80')",
        backgroundSize: "cover", backgroundPosition: "center 60%",
        mixBlendMode: "overlay", opacity: 0.28,
      }} />
      {/* Shimmer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 25% 40%, rgba(255,255,255,0.16) 0%, transparent 65%)",
      }} />

      {/* ── Main content row ── */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: 1280, margin: "0 auto",
        padding: "16px 20px",          /* ← good padding all sides */
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div className="anim-drop-bob" style={{
            width: 44, height: 44, borderRadius: 14, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
            background: "rgba(255,255,255,0.22)", backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.45)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}>💧</div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Raleway', sans-serif", fontWeight: 900,
              fontSize: "clamp(18px, 3.5vw, 26px)",
              color: "#fff", lineHeight: 1,
              letterSpacing: "-0.4px",
              textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              margin: 0, whiteSpace: "nowrap",
            }}>JalDarpan</h1>
            <p style={{
              fontSize: "clamp(8px, 1.5vw, 10px)", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(224,242,254,0.9)", marginTop: 4,
              textShadow: "0 1px 6px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
            }}>Sangli · Miraj · Kupwad</p>
          </div>
        </div>

        {/* Right badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: 999, padding: "6px 12px",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#fca5a5",
              display: "inline-block", flexShrink: 0,
              animation: "pulse-ring 1.5s ease-in-out infinite",
            }} />
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 900, letterSpacing: "1.5px" }}>LIVE</span>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: 999, padding: "6px 14px",
          }}>
            <span style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 800,
              fontSize: "clamp(11px, 1.8vw, 13px)", color: "#fff",
              letterSpacing: "0.05em",
            }}>
              {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>
      
    </header>
  );
}