import { useState } from "react";
import { wardData } from "../data";

export default function ReportModal({ onClose }) {
  const [reported, setReported] = useState(false);
  const [type,     setType]     = useState(null);
  const [pressure, setPressure] = useState(null);
  const total = wardData.reduce((a, b) => a + b.users, 0);

  const handle = (t) => { setType(t); setReported(true); setTimeout(onClose, 2600); };

  const inputBtnStyle = (active) => ({
    padding:"10px 6px", borderRadius:14,
    fontSize:12, fontWeight:700,
    cursor:"pointer", transition:"all 0.15s",
    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
    background: active ? "#e0f2fe" : "#f8fafc",
    border: active ? "1.5px solid #0ea5e9" : "1.5px solid #e2e8f0",
    color: active ? "#0369a1" : "#64748b",
  });

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:50,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"16px 16px 90px",
      background:"rgba(3,55,90,0.5)", backdropFilter:"blur(10px)",
    }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up" style={{
        width:"100%", maxWidth:480,
        maxHeight:"calc(100vh - 120px)",
        overflowY:"auto",
        background:"#fff",
        borderRadius:28,
        boxShadow:"0 24px 80px rgba(6,182,212,0.28),0 8px 24px rgba(0,0,0,0.12)",
        msOverflowStyle:"none", scrollbarWidth:"none",
      }}>
        {/* Top bar */}
        <div style={{ height:4, borderRadius:"28px 28px 0 0", background:"linear-gradient(90deg,#0369a1,#0ea5e9,#06b6d4,#38bdf8)" }} />
        <div style={{ width:36, height:4, borderRadius:999, background:"#e2e8f0", margin:"14px auto 0" }} />

        {!reported ? (
          <div style={{ padding:"16px 20px 28px" }}>
            {/* Title */}
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif", fontWeight:900,
                fontSize:"clamp(18px,4vw,22px)", color:"#1e293b",
                letterSpacing:"-0.3px", margin:"0 0 6px",
              }}>What's happening at your tap?</h2>
              <p style={{ fontSize:13, fontWeight:600, color:"#94a3b8", margin:0 }}>
                Helps <strong style={{ color:"#334155", fontWeight:800 }}>{total}+</strong> neighbours stay informed
              </p>
            </div>

            {/* Status buttons */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:18 }}>
              {[
                { t:"yes", icon:"💧", label:"Water Running", sub:"Tap is flowing right now", border:"#16a34a", bg:"#f0fdf4", shadow:"rgba(22,163,74,0.18)" },
                { t:"no",  icon:"🚱", label:"No Water",      sub:"Tap is completely dry",    border:"#dc2626", bg:"#fff5f5", shadow:"rgba(220,38,38,0.18)" },
              ].map(b => (
                <button key={b.t} onClick={() => handle(b.t)} className="ripple" style={{
                  background:b.bg, border:`2px solid ${b.border}40`, borderRadius:20,
                  padding:"18px 10px", display:"flex", flexDirection:"column",
                  alignItems:"center", gap:8, cursor:"pointer",
                  boxShadow:`0 4px 20px ${b.shadow}`, transition:"transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
                >
                  <span style={{ fontSize:40 }}>{b.icon}</span>
                  <span style={{ fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:15, color:"#1e293b" }}>{b.label}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:"#94a3b8", textAlign:"center" }}>{b.sub}</span>
                </button>
              ))}
            </div>

            {/* Pressure */}
            <div style={{ marginBottom:14 }}>
              <p style={{ fontSize:13, fontWeight:800, color:"#475569", textAlign:"center", margin:"0 0 10px", fontFamily:"'Raleway',sans-serif" }}>
                Water Pressure <span style={{ color:"#94a3b8", fontWeight:600 }}>(optional)</span>
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {[{label:"Low",emoji:"🔻"},{label:"Medium",emoji:"↔️"},{label:"High",emoji:"🔺"}].map(p => (
                  <button key={p.label} onClick={() => setPressure(p.label)} style={inputBtnStyle(pressure === p.label)}>
                    <span style={{ fontSize:18 }}>{p.emoji}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <p style={{ textAlign:"center", fontSize:12, fontWeight:600, color:"#94a3b8", margin:0 }}>
              📍 GPS location captured automatically
            </p>
          </div>
        ) : (
          <div style={{ padding:"32px 20px 40px", textAlign:"center" }}>
            <div className="anim-bounce-pop" style={{ fontSize:68, marginBottom:16, display:"inline-block" }}>
              {type === "yes" ? "💧" : "✅"}
            </div>
            <h2 style={{ fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:26, color:"#1e293b", margin:"0 0 10px" }}>
              Thank you!
            </h2>
            <p style={{ fontSize:14, fontWeight:600, color:"#94a3b8", margin:"0 0 24px" }}>
              Helping <strong style={{ fontWeight:800, color:"#334155" }}>{total}+ neighbours</strong> stay informed
            </p>
            <div style={{ borderRadius:16, padding:"14px 18px", fontSize:13, fontWeight:700, color:"#0369a1", background:"#e0f2fe", border:"1px solid rgba(6,182,212,0.3)" }}>
              🗺️ Map updates when 3 more users confirm
            </div>
          </div>
        )}
      </div>
    </div>
  );
}