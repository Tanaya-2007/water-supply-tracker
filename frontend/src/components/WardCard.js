const statusConfig = {
  green:  { label:"Water Flowing", color:"#16a34a", dot:"#22c55e", bg:"rgba(220,252,231,0.55)", border:"#16a34a" },
  yellow: { label:"Coming Soon",   color:"#d97706", dot:"#f59e0b", bg:"rgba(254,243,199,0.55)", border:"#d97706" },
  red:    { label:"No Supply",     color:"#dc2626", dot:"#ef4444", bg:"rgba(254,226,226,0.55)", border:"#dc2626" },
};

const accColor = n => n>=80?"#16a34a":n>=60?"#d97706":"#dc2626";

export default function WardCard({ ward, onClick, onReport }) {
  const cfg = statusConfig[ward.status] || statusConfig.green;
  const r   = 29, circ = 2*Math.PI*r;

  return (
    <div style={{
      borderRadius:24, overflow:"hidden", cursor:"pointer",
      background:"rgba(255,255,255,0.92)", backdropFilter:"blur(20px)",
      border:"1px solid rgba(255,255,255,0.95)",
      borderTop:`4px solid ${cfg.border}`,
      boxShadow:"0 4px 24px rgba(6,182,212,0.09)",
    }}>
      <div style={{padding:20}} onClick={onClick}>
        {/* Top row */}
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14}}>
          <div style={{flex:1, paddingRight:12}}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:5,
              padding:"4px 12px", borderRadius:999, marginBottom:10,
              background:cfg.bg, border:`1px solid ${cfg.border}44`,
              fontSize:11, fontWeight:800, color:cfg.color,
            }}>
              <span style={{width:6,height:6,borderRadius:"50%",background:cfg.dot,display:"inline-block"}}/>
              {cfg.label}
            </div>
            <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:19,
                        color:"#0f172a", lineHeight:1.2, marginBottom:4}}>{ward.name}</h3>
            <p style={{fontSize:11, fontWeight:700, color:"#94a3b8"}}>{ward.zone} · SMC</p>
          </div>
          {/* Accuracy donut */}
          <div style={{position:"relative", width:68, height:68, flexShrink:0}}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="6"/>
              <circle cx="34" cy="34" r={r} fill="none"
                stroke={accColor(ward.accuracy||70)} strokeWidth="6"
                strokeDasharray={`${((ward.accuracy||70)/100)*circ} ${circ}`}
                strokeLinecap="round" transform="rotate(-90 34 34)"/>
            </svg>
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:12,color:accColor(ward.accuracy||70)}}>
                {ward.accuracy||70}%
              </span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div style={{display:"flex", flexDirection:"column", gap:7}}>
          {[
            {icon:"🕐", label:"Next Supply", value:ward.nextSupply||"--"},
            {icon:"⚡", label:"Delay",       value:ward.delay||"--",   bg:cfg.bg, border:`${cfg.border}22`, color:cfg.color},
            {icon:"👥", label:"Reports",     value:`${ward.users||0} active`},
          ].map((row,i)=>(
            <div key={i} style={{display:"flex", justifyContent:"space-between", alignItems:"center",
                                  padding:"9px 12px", borderRadius:12,
                                  background:row.bg||"rgba(240,249,255,0.9)",
                                  border:`1px solid ${row.border||"rgba(6,182,212,0.12)"}`}}>
              <span style={{fontSize:12, fontWeight:600, color:"#64748b"}}>{row.icon} {row.label}</span>
              <span style={{fontSize:12, fontWeight:800, color:row.color||"#1e293b"}}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Report button - separate from onClick so it doesn't open detail */}
      <div style={{padding:"0 20px 16px", display:"flex", gap:8}}>
        <button
          onClick={e=>{ e.stopPropagation(); onClick(); }}
          style={{
            flex:1, padding:"9px", borderRadius:12, border:"1.5px solid rgba(6,182,212,0.2)",
            background:"rgba(240,249,255,0.8)", color:"#0369a1",
            fontWeight:800, fontSize:12, cursor:"pointer", fontFamily:"'Nunito',sans-serif",
          }}>
          View Details →
        </button>
        <button
          onClick={e=>{ e.stopPropagation(); onReport(); }}
          style={{
            flex:1, padding:"9px", borderRadius:12, border:"none",
            background:"linear-gradient(135deg,#ef4444,#dc2626)",
            color:"white", fontWeight:800, fontSize:12,
            cursor:"pointer", fontFamily:"'Nunito',sans-serif",
            boxShadow:"0 4px 12px rgba(220,38,38,0.3)",
          }}>
          🚨 Report Issue
        </button>
      </div>
    </div>
  );
}