import { useEffect, useState } from "react";

const cityNames = {
  sangli: "Sangli · Miraj · Kupwad",
  pune:   "Pune",
  nashik: "Nashik",
};

export default function Header({ onAdminClick, selectedCity, role, onLogout }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          max-width: 1280px;
          margin: 0 auto;
          gap: 8px;
        }
        .header-brand { display:flex; align-items:center; gap:10px; min-width:0; flex:1; }
        .header-logo  { width:40px; height:40px; border-radius:12px; flex-shrink:0;
                        display:flex; align-items:center; justify-content:center;
                        background:rgba(255,255,255,0.22); backdrop-filter:blur(12px);
                        border:1.5px solid rgba(255,255,255,0.45); font-size:20px; }
        .header-title { font-family:'Raleway',sans-serif; font-weight:900; color:white;
                        line-height:1; letter-spacing:-0.5px; margin:0;
                        font-size:clamp(16px,4vw,24px); white-space:nowrap; }
        .header-sub   { color:rgba(224,242,254,0.85); font-size:clamp(7px,1.8vw,10px);
                        font-weight:700; margin:2px 0 0; letter-spacing:0.12em;
                        text-transform:uppercase; white-space:nowrap;
                        overflow:hidden; text-overflow:ellipsis; max-width:160px; }
        .header-right { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .header-pill  { display:flex; align-items:center; gap:5px;
                        padding:6px 10px; border-radius:999px;
                        background:rgba(255,255,255,0.2); backdrop-filter:blur(12px);
                        border:1.5px solid rgba(255,255,255,0.35); }
        .header-pill span.label { font-size:11px; font-weight:900; color:white; letter-spacing:0.12em; }
        .header-clock { padding:6px 10px; border-radius:999px;
                        background:rgba(255,255,255,0.2); backdrop-filter:blur(12px);
                        border:1.5px solid rgba(255,255,255,0.35);
                        font-family:'Nunito',sans-serif; font-size:clamp(10px,2vw,13px);
                        font-weight:800; color:white; white-space:nowrap; }
        .header-admin { display:flex; align-items:center; gap:5px;
                        padding:7px 14px; border-radius:999px;
                        background:rgba(255,255,255,0.95); border:none;
                        color:#0369a1; font-weight:900; font-size:13px;
                        cursor:pointer; font-family:'Nunito',sans-serif;
                        box-shadow:0 4px 16px rgba(0,0,0,0.18);
                        white-space:nowrap; transition:all 0.2s ease; }
        .header-admin:hover { background:#e0f2fe; transform:scale(1.04); }
        .header-logout { display:flex; align-items:center; gap:5px;
                         padding:7px 14px; border-radius:999px;
                         background:rgba(255,255,255,0.95); border:none;
                         color:#dc2626; font-weight:900; font-size:13px;
                         cursor:pointer; font-family:'Nunito',sans-serif;
                         box-shadow:0 4px 16px rgba(0,0,0,0.18);
                         white-space:nowrap; transition:all 0.2s ease; }
        .header-logout:hover { background:#fee2e2; transform:scale(1.04); }
        @media (max-width: 380px) {
          .header-logout span { display:none; }
          .header-logout { padding:7px 10px; }
        }
        /* Hide clock on very small screens */
        @media (max-width: 380px) {
          .header-clock { display:none; }
          .header-sub   { display:none; }
          .header-admin span { display:none; }
          .header-admin { padding:7px 10px; }
        }
        /* Hide LIVE label on small screens */
        @media (max-width: 480px) {
          .header-pill span.label { display:none; }
          .header-pill { padding:6px 8px; }
        }
      `}</style>

      <header style={{
        background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 55%,#06b6d4 100%)",
        boxShadow:"0 8px 40px rgba(3,105,161,0.35)",
        position:"sticky", top:0, zIndex:200, overflow:"hidden",
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
          background:"radial-gradient(ellipse 60% 50% at 25% 40%,rgba(255,255,255,0.18) 0%,transparent 65%)"
        }}/>

        <div className="header-inner" style={{position:"relative", zIndex:10}}>
          {/* Brand */}
          <div className="header-brand">
            <div className="header-logo anim-drop-bob">💧</div>
            <div style={{minWidth:0}}>
              <h1 className="header-title">JalDarpan</h1>
              <p className="header-sub">
                {cityNames[selectedCity] || "Maharashtra"}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="header-right">
            {/* LIVE */}
            <div className="header-pill">
              <span style={{
                width:8, height:8, borderRadius:"50%", background:"#fca5a5",
                display:"inline-block", animation:"pulse-ring 1.5s ease-in-out infinite", flexShrink:0,
              }}/>
              <span className="label">LIVE</span>
            </div>

            {/* Clock */}
            <div className="header-clock">
              {time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}
            </div>

            {/* Admin — only for admin role */}
            {role === "admin" && (
              <button className="header-admin" onClick={onAdminClick}>
                🛡️<span> Admin</span>
              </button>
            )}

            {/* Logout */}
            <button className="header-logout" onClick={onLogout}>
              🚪<span> Logout</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}