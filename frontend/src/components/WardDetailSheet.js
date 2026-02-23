const statusConfig = {
  green:  { label:"Water Flowing", color:"#16a34a", dot:"#22c55e", bg:"rgba(220,252,231,0.55)", border:"#bbf7d0", emoji:"💧" },
  yellow: { label:"Coming Soon",   color:"#d97706", dot:"#f59e0b", bg:"rgba(254,243,199,0.55)", border:"#fde68a", emoji:"⏳" },
  red:    { label:"No Supply",     color:"#dc2626", dot:"#ef4444", bg:"rgba(254,226,226,0.55)", border:"#fecaca", emoji:"🚱" },
};
const accColor = n=>n>=80?"#16a34a":n>=60?"#d97706":"#dc2626";
const accLabel = n=>n>=80?"Excellent 🏆":n>=60?"Average ⚠️":"Poor 🚨";
const borderClr = {green:"#16a34a", yellow:"#d97706", red:"#dc2626"};

export default function WardDetailSheet({ ward, onClose }) {
  if(!ward) return null;
  const cfg = statusConfig[ward.status];
  const bc  = borderClr[ward.status];

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:50,
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(3,55,90,0.45)", backdropFilter:"blur(10px)",
      padding:"16px 16px 90px 16px",
    }}>
      <div onClick={e=>e.stopPropagation()}
        className="anim-slide-up no-scroll"
        style={{
          width:"100%", maxWidth:560, borderRadius:28,
          background:"white", boxShadow:"0 20px 80px rgba(6,182,212,0.25)",
          maxHeight:"calc(100vh - 120px)", overflowY:"auto",
        }}>

        {/* Water photo strip */}
        <div style={{
          height:140, position:"relative", overflow:"hidden",
          borderRadius:"28px 28px 0 0",
          background:`linear-gradient(135deg,${bc}CC,${bc}88)`,
        }}>
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=70')",
            backgroundSize:"cover", backgroundPosition:"center 65%", opacity:0.38,
          }}/>
          <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 25%,white 100%)"}}/>
          <div style={{position:"absolute", bottom:14, left:24, right:24, display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
            <div>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontSize:11, fontWeight:900, padding:"5px 12px", borderRadius:999, marginBottom:8,
                background:"rgba(255,255,255,0.92)", color:bc, fontFamily:"'Nunito',sans-serif",
              }}>
                <span style={{width:7, height:7, borderRadius:"50%", background:bc, display:"inline-block"}}/>
                {cfg.label}
              </span>
              <h2 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:28,
                          color:"white", textShadow:"0 2px 16px rgba(0,0,0,0.25)", letterSpacing:"-0.4px"}}>
                {ward.name}
              </h2>
            </div>
            <button onClick={onClose} style={{
              width:36, height:36, borderRadius:"50%",
              background:"rgba(255,255,255,0.85)", border:"1px solid rgba(255,255,255,0.9)",
              cursor:"pointer", fontSize:14, color:"#475569", display:"flex",
              alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.12)",
              flexShrink:0,
            }}>✕</button>
          </div>
        </div>

        <div style={{padding:"8px 24px 4px"}}>
          <p style={{fontSize:13, fontWeight:700, color:"#94a3b8"}}>{ward.zone} · Sangli Municipal Corporation</p>
        </div>

        {/* Accuracy box */}
        <div style={{
          margin:"12px 20px", borderRadius:24, padding:"22px",
          background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",
          border:"1px solid rgba(6,182,212,0.15)",
        }}>
          <p style={{fontSize:10, fontWeight:900, color:"#94a3b8", textTransform:"uppercase",
                     letterSpacing:"0.12em", marginBottom:14, fontFamily:"'Raleway',sans-serif"}}>
            📊 Municipal Accuracy Score
          </p>
          <div style={{display:"flex", alignItems:"center", gap:20, marginBottom:14}}>
            <div style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:68,
                         lineHeight:1, color:accColor(ward.accuracy)}}>
              {ward.accuracy}%
            </div>
            <div>
              <div style={{fontSize:15, fontWeight:900, color:accColor(ward.accuracy),
                           marginBottom:6, fontFamily:"'Raleway',sans-serif"}}>
                {accLabel(ward.accuracy)}
              </div>
              <p style={{fontSize:13, fontWeight:600, color:"#475569", lineHeight:1.5}}>
                Met schedule <strong style={{color:"#1e293b", fontWeight:800}}>{Math.round(ward.accuracy/14.3)} of last 7 days</strong>
              </p>
            </div>
          </div>
          <div style={{height:10, background:"rgba(6,182,212,0.1)", borderRadius:999, overflow:"hidden", marginBottom:6}}>
            <div style={{width:`${ward.accuracy}%`, height:"100%", background:accColor(ward.accuracy),
                         borderRadius:999, animation:"bar-fill 1.2s ease"}}/>
          </div>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, color:"#94a3b8"}}>
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* Detail grid */}
        <div style={{margin:"0 20px 16px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
          {[
            {icon:"🕐", label:"Next Supply", value:ward.nextSupply},
            {icon:"⚡", label:"Delay",       value:ward.delay, color:bc},
            {icon:"👥", label:"Reports",     value:`${ward.users} citizens`},
            {icon:"📍", label:"Zone",        value:ward.zone},
          ].map((t,i)=>(
            <div key={i} style={{background:"#f0f9ff", border:"1px solid rgba(6,182,212,0.12)", borderRadius:18, padding:16}}>
              <span style={{fontSize:20, display:"block", marginBottom:8}}>{t.icon}</span>
              <p style={{fontSize:10, fontWeight:900, color:"#94a3b8", textTransform:"uppercase",
                         letterSpacing:"0.08em", marginBottom:4, fontFamily:"'Raleway',sans-serif"}}>{t.label}</p>
              <p style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:15,
                         color:t.color||"#0f172a"}}>{t.value}</p>
            </div>
          ))}
        </div>

        <div style={{padding:"0 20px 24px"}}>
          <button className="ripple" style={{
            width:"100%", padding:"15px", borderRadius:18, border:"none", cursor:"pointer",
            background:"linear-gradient(135deg,#0ea5e9,#06b6d4)", color:"white",
            fontSize:15, fontWeight:800, fontFamily:"'Nunito',sans-serif",
            boxShadow:"0 8px 24px rgba(6,182,212,0.4)",
          }}>
            🔔 Set Reminder for Next Supply
          </button>
        </div>
      </div>
    </div>
  );
}