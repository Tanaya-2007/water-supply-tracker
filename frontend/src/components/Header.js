import { useEffect, useState } from "react";

const cityNames = {
  sangli: "Sangli · Miraj · Kupwad",
  pune:   "Pune",
  nashik: "Nashik",
};

export default function Header({ onAdminClick, selectedCity }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header style={{
      background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 55%,#06b6d4 100%)",
      boxShadow:"0 8px 40px rgba(3,105,161,0.35)",
      position:"sticky", top:0, zIndex:50, overflow:"hidden",
    }}>
      {/* Water photo overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=80')",
        backgroundSize:"cover", backgroundPosition:"center 60%",
        mixBlendMode:"overlay", opacity:0.3,
      }}/>
      {/* Shimmer */}
      <div style={{
        position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
        background:"radial-gradient(ellipse 60% 50% at 25% 40%,rgba(255,255,255,0.18) 0%,transparent 65%),radial-gradient(ellipse 35% 55% at 85% 25%,rgba(255,255,255,0.1) 0%,transparent 60%)"
      }}/>

      <div style={{
        position:"relative", zIndex:10,
        maxWidth:1280, margin:"0 auto",
        padding:"12px 16px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:10,
      }}>
        {/* Brand */}
        <div style={{display:"flex", alignItems:"center", gap:12, minWidth:0}}>
          <div className="anim-drop-bob" style={{
            width:44, height:44, borderRadius:14, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(255,255,255,0.22)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.45)",
            boxShadow:"0 8px 24px rgba(0,0,0,0.15),inset 0 1px 0 rgba(255,255,255,0.4)",
          }}>
            <span style={{fontSize:22}}>💧</span>
          </div>
          <div style={{minWidth:0}}>
            <h1 style={{
              fontFamily:"'Raleway',sans-serif", fontWeight:900,
              fontSize:"clamp(18px,4vw,26px)",
              color:"white", lineHeight:1, letterSpacing:"-0.5px",
              textShadow:"0 2px 12px rgba(0,0,0,0.2)", margin:0,
            }}>JalDarpan</h1>
            <p style={{
              color:"rgba(224,242,254,0.85)", fontSize:"clamp(8px,1.5vw,10px)",
              fontWeight:700, marginTop:3, letterSpacing:"0.15em",
              textTransform:"uppercase", margin:"3px 0 0",
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
            }}>{cityNames[selectedCity] || "Sangli · Miraj · Kupwad"}</p>
          </div>
        </div>

        {/* Right side */}
        <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
          {/* LIVE badge */}
          <div style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"7px 14px", borderRadius:999,
            background:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.35)",
          }}>
            <span style={{
              width:8, height:8, borderRadius:"50%", background:"#fca5a5",
              display:"inline-block", animation:"pulse-ring 1.5s ease-in-out infinite",
            }}/>
            <span style={{fontSize:11, fontWeight:900, color:"white", letterSpacing:"0.15em"}}>LIVE</span>
          </div>

          {/* Clock */}
          <div style={{
            padding:"7px 14px", borderRadius:999,
            background:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)",
            border:"1.5px solid rgba(255,255,255,0.35)",
          }}>
            <span style={{
              fontFamily:"'Nunito',sans-serif", fontSize:"clamp(11px,2vw,13px)",
              fontWeight:800, color:"white",
            }}>
              {time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}
            </span>
          </div>

          {/* Admin button — solid, clearly visible */}
          <button onClick={onAdminClick} style={{
            display:"flex", alignItems:"center", gap:6,
            padding:"8px 16px", borderRadius:999,
            background:"rgba(255,255,255,0.95)",
            border:"none",
            color:"#0369a1", fontWeight:900, fontSize:"clamp(11px,2vw,13px)",
            cursor:"pointer", fontFamily:"'Nunito',sans-serif",
            boxShadow:"0 4px 16px rgba(0,0,0,0.18)",
            flexShrink:0,
            transition:"all 0.2s ease",
          }}
          onMouseEnter={e=>{e.currentTarget.style.background="#e0f2fe"; e.currentTarget.style.transform="scale(1.05)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.95)"; e.currentTarget.style.transform="scale(1)";}}>
            🛡️ <span style={{display:"inline"}}>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}