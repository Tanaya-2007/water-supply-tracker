const statusConfig = {
  green:        { label:"Water Flowing", color:"#16a34a", dot:"#22c55e", bg:"rgba(220,252,231,0.7)", border:"#bbf7d0", emoji:"💧" },
  yellow:       { label:"Coming Soon",   color:"#ca8a04", dot:"#eab308", bg:"rgba(254,249,195,0.7)", border:"#fde68a", emoji:"⏳" },
  low_pressure: { label:"Low Pressure",  color:"#ea580c", dot:"#f97316", bg:"rgba(255,237,213,0.7)", border:"#fed7aa", emoji:"🔻" },
  red:          { label:"No Supply",     color:"#dc2626", dot:"#ef4444", bg:"rgba(254,226,226,0.7)", border:"#fecaca", emoji:"🚱" },
};
const accColor = n=>n>=80?"#16a34a":n>=60?"#d97706":"#dc2626";
const accLabel = n=>n>=80?"Excellent 🏆":n>=60?"Average ⚠️":"Poor 🚨";
const borderClr = {green:"#16a34a", yellow:"#ca8a04", low_pressure:"#ea580c", red:"#dc2626"};

export default function WardDetailSheet({ ward, onClose }) {
  if(!ward) return null;
  const cfg = statusConfig[ward.status] || statusConfig.green;
  const bc  = borderClr[ward.status]   || "#16a34a";

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:999,
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(3,55,90,0.55)", backdropFilter:"blur(12px)",
      padding:"16px 16px 100px 16px",
    }}>
      <div onClick={e=>e.stopPropagation()}
        className="anim-slide-up"
        style={{
          width:"100%", maxWidth:520, borderRadius:28,
          background:"white", boxShadow:"0 20px 80px rgba(6,182,212,0.3)",
          maxHeight:"90vh", overflowY:"auto",
          msOverflowStyle:"none", scrollbarWidth:"none",
        }}>

        {/* Clean header — no image, solid gradient */}
        <div style={{
          padding:"24px 24px 20px",
          borderRadius:"28px 28px 0 0",
          background:`linear-gradient(135deg,${bc}22,${bc}08)`,
          borderBottom:`3px solid ${bc}33`,
        }}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
            <div>
              {/* Status badge */}
              <span style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:12, fontWeight:900, padding:"6px 14px", borderRadius:999, marginBottom:12,
                background:`${bc}18`, border:`1.5px solid ${bc}55`,
                color:bc, fontFamily:"'Nunito',sans-serif",
              }}>
                <span style={{width:8, height:8, borderRadius:"50%", background:bc, display:"inline-block"}}/>
                {cfg.emoji} {cfg.label}
              </span>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:30,
                color:"#0f172a", letterSpacing:"-0.5px", margin:0, lineHeight:1.1,
              }}>
                {ward.name}
              </h2>
              <p style={{fontSize:13, fontWeight:700, color:"#94a3b8", margin:"6px 0 0"}}>
                {ward.zone} · Sangli Municipal Corporation
              </p>
            </div>
            <button onClick={onClose} style={{
              width:38, height:38, borderRadius:"50%", flexShrink:0,
              background:"rgba(0,0,0,0.06)", border:"1px solid rgba(0,0,0,0.08)",
              cursor:"pointer", fontSize:16, color:"#475569",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>✕</button>
          </div>
        </div>

        <div style={{padding:"20px"}}>

          {/* Accuracy box */}
          <div style={{
            borderRadius:20, padding:"20px",
            background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",
            border:"1px solid rgba(6,182,212,0.15)", marginBottom:14,
          }}>
            <p style={{fontSize:10, fontWeight:900, color:"#94a3b8", textTransform:"uppercase",
                       letterSpacing:"0.12em", marginBottom:12, fontFamily:"'Raleway',sans-serif"}}>
              📊 Municipal Accuracy Score
            </p>
            <div style={{display:"flex", alignItems:"center", gap:20, marginBottom:12}}>
              <div style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:64,
                           lineHeight:1, color:accColor(ward.accuracy)}}>
                {ward.accuracy}%
              </div>
              <div>
                <div style={{fontSize:15, fontWeight:900, color:accColor(ward.accuracy),
                             marginBottom:4, fontFamily:"'Raleway',sans-serif"}}>
                  {accLabel(ward.accuracy)}
                </div>
                <p style={{fontSize:13, fontWeight:600, color:"#475569", lineHeight:1.5, margin:0}}>
                  Met schedule <strong style={{color:"#1e293b", fontWeight:800}}>{Math.round(ward.accuracy/14.3)} of last 7 days</strong>
                </p>
              </div>
            </div>
            <div style={{height:10, background:"rgba(6,182,212,0.1)", borderRadius:999, overflow:"hidden", marginBottom:6}}>
              <div style={{width:`${ward.accuracy}%`, height:"100%", background:accColor(ward.accuracy),
                           borderRadius:999}}/>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, color:"#94a3b8"}}>
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          {/* Detail grid */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14}}>
            {[
              {icon:"🕐", label:"Next Supply", value:ward.nextSupply},
              {icon:"⚡", label:"Delay",       value:ward.delay, color:bc},
              {icon:"👥", label:"Reports",     value:`${ward.users} citizens`},
              {icon:"📍", label:"Zone",        value:ward.zone},
            ].map((t,i)=>(
              <div key={i} style={{background:"#f8fafc", border:"1px solid rgba(6,182,212,0.12)", borderRadius:16, padding:14}}>
                <span style={{fontSize:20, display:"block", marginBottom:6}}>{t.icon}</span>
                <p style={{fontSize:10, fontWeight:900, color:"#94a3b8", textTransform:"uppercase",
                           letterSpacing:"0.08em", marginBottom:4, fontFamily:"'Raleway',sans-serif", margin:"0 0 4px"}}>{t.label}</p>
                <p style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:15,
                           color:t.color||"#0f172a", margin:0}}>{t.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}