import { statusConfig } from "../data";

const accColor = n => n >= 80 ? "#16a34a" : n >= 60 ? "#d97706" : "#dc2626";
const accLabel = n => n >= 80 ? "Excellent 🏆" : n >= 60 ? "Average ⚠️" : "Poor 🚨";
const borderClr = { green:"#16a34a", yellow:"#d97706", red:"#dc2626" };

export default function WardDetailSheet({ ward, onClose }) {
  if (!ward) return null;
  const cfg = statusConfig[ward.status];
  const bc  = borderClr[ward.status];

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:50,
      display:"flex", alignItems:"flex-end", justifyContent:"center",
      background:"rgba(3,55,90,0.45)", backdropFilter:"blur(10px)",
    }}>
      <div onClick={e => e.stopPropagation()} className="anim-slide-up no-scroll" style={{
        width:"100%", maxWidth:560,
        maxHeight:"90vh", overflowY:"auto",
        background:"#fff",
        borderRadius:"28px 28px 0 0",
        boxShadow:"0 -20px 80px rgba(6,182,212,0.22)",
      }}>
        {/* Photo strip */}
        <div style={{
          position:"relative", overflow:"hidden", height:140,
          borderRadius:"28px 28px 0 0",
          background:`linear-gradient(135deg,${bc}CC,${bc}99)`,
        }}>
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=70')",
            backgroundSize:"cover", backgroundPosition:"center 65%", opacity:0.35,
          }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 25%,#fff 100%)" }} />
          <div style={{ position:"absolute", bottom:14, left:20, right:20, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:11, fontWeight:900, padding:"5px 12px", borderRadius:999, marginBottom:6,
                background:"rgba(255,255,255,0.92)", color:bc,
              }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:bc, display:"inline-block" }} />
                {cfg.label}
              </span>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:26,
                color:"#fff", margin:0,
                textShadow:"0 2px 16px rgba(0,0,0,0.25)", letterSpacing:"-0.4px",
              }}>{ward.name}</h2>
            </div>
            <button onClick={onClose} style={{
              width:34, height:34, borderRadius:"50%",
              background:"rgba(255,255,255,0.88)",
              border:"1px solid rgba(255,255,255,0.9)",
              cursor:"pointer", fontSize:14, color:"#64748b",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 2px 8px rgba(0,0,0,0.12)",
            }}>✕</button>
          </div>
        </div>

        {/* Zone row */}
        <div style={{ padding:"10px 20px 10px", borderBottom:"1px solid #f0f9ff" }}>
          <p style={{ fontSize:12, fontWeight:700, color:"#94a3b8", margin:0 }}>{ward.zone} · Sangli Municipal Corporation</p>
        </div>

        {/* Accuracy hero */}
        <div style={{
          margin:"16px 16px 0",
          padding:"20px", borderRadius:20,
          background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",
          border:"1px solid rgba(6,182,212,0.15)",
        }}>
          <p style={{ fontSize:10, fontWeight:900, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.12em", margin:"0 0 14px", fontFamily:"'Raleway',sans-serif" }}>
            📊 Municipal Accuracy Score
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:14 }}>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:64, color:accColor(ward.accuracy), lineHeight:1 }}>
              {ward.accuracy}%
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:900, color:accColor(ward.accuracy), fontFamily:"'Raleway',sans-serif", marginBottom:5 }}>
                {accLabel(ward.accuracy)}
              </div>
              <p style={{ fontSize:13, fontWeight:600, color:"#64748b", margin:0, lineHeight:1.5 }}>
                Met schedule <strong style={{ color:"#334155", fontWeight:800 }}>{Math.round(ward.accuracy / 14.3)} of last 7 days</strong>
              </p>
            </div>
          </div>
          <div style={{ height:10, borderRadius:999, overflow:"hidden", background:"rgba(6,182,212,0.1)", marginBottom:6 }}>
            <div style={{ height:"100%", borderRadius:999, width:`${ward.accuracy}%`, background:accColor(ward.accuracy), animation:"bar-fill 1.2s ease" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, color:"#94a3b8" }}>
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* Detail grid */}
        <div style={{ padding:"14px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:4 }}>
          {[
            { icon:"🕐", label:"Next Supply", value:ward.nextSupply },
            { icon:"⚡", label:"Delay",       value:ward.delay,      color:bc },
            { icon:"👥", label:"Reports",     value:`${ward.users} citizens` },
            { icon:"📍", label:"Zone",        value:ward.zone },
          ].map((t, i) => (
            <div key={i} style={{ borderRadius:16, padding:"14px 12px", background:"#f0f9ff", border:"1px solid rgba(6,182,212,0.12)" }}>
              <span style={{ fontSize:20, display:"block", marginBottom:6 }}>{t.icon}</span>
              <p style={{ fontSize:9, fontWeight:900, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 4px", fontFamily:"'Raleway',sans-serif" }}>{t.label}</p>
              <p style={{ fontWeight:800, fontSize:14, color:t.color || "#334155", margin:0, fontFamily:"'Raleway',sans-serif" }}>{t.value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding:"0 16px 32px" }}>
          <button className="ripple" style={{
            width:"100%", padding:"14px", borderRadius:18,
            background:"linear-gradient(135deg,#0ea5e9,#06b6d4)",
            border:"none", color:"#fff", fontWeight:900, fontSize:14,
            cursor:"pointer", fontFamily:"'Nunito',sans-serif",
            boxShadow:"0 8px 24px rgba(6,182,212,0.4)",
          }}>
            🔔 Set Reminder for Next Supply
          </button>
        </div>
      </div>
    </div>
  );
}