const alertsData=[
  {id:1,ward:"Miraj",      type:"outage",  msg:"Water supply disrupted due to pump failure at Zone B pumping station", time:"2 hrs ago",icon:"🚨"},
  {id:2,ward:"Wanlesswadi",type:"outage",  msg:"No supply expected until 9:00 AM tomorrow due to pipeline repair work",  time:"3 hrs ago",icon:"🚨"},
  {id:3,ward:"Sangli",     type:"delay",   msg:"Supply delayed by 45 minutes due to increased demand in Zone A",        time:"4 hrs ago",icon:"⚠️"},
  {id:4,ward:"Gaokiwadi",  type:"delay",   msg:"Low pressure reported by 9 residents — maintenance crew dispatched",     time:"5 hrs ago",icon:"⚠️"},
  {id:5,ward:"Vishrambag", type:"restored",msg:"Water supply fully restored after 2-hour emergency maintenance work",    time:"6 hrs ago",icon:"✅"},
  {id:6,ward:"Kupwad",     type:"info",    msg:"Supply schedule updated for next week — no disruptions expected",        time:"1 day ago",icon:"ℹ️"},
];

const S={
  outage:  {color:"#dc2626",bg:"#fff5f5",border:"#fecaca",label:"Outage"},
  delay:   {color:"#d97706",bg:"#fffbeb",border:"#fde68a",label:"Delay"},
  restored:{color:"#16a34a",bg:"#f0fdf4",border:"#bbf7d0",label:"Restored"},
  info:    {color:"#0ea5e9",bg:"#f0f9ff",border:"#bae6fd",label:"Info"},
};

export default function AlertsPage(){
  const outages  = alertsData.filter(a=>a.type==="outage").length;
  const delays   = alertsData.filter(a=>a.type==="delay").length;
  const restored = alertsData.filter(a=>a.type==="restored").length;

  return(
    <div style={{maxWidth:896,margin:"0 auto",padding:"20px 16px 0"}}>

      {/* ── Page header ── */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,gap:12,flexWrap:"wrap"}}>
        <div style={{minWidth:0}}>
          <h2 style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:"clamp(22px,5vw,34px)",
                      letterSpacing:"-0.4px",color:"#0f172a",margin:0,lineHeight:1.15}}>
            Alerts &amp; Updates
          </h2>
          <p style={{fontSize:12,fontWeight:700,color:"#94a3b8",marginTop:5}}>
            Real-time ward alerts · Auto-refreshed every 30s
          </p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:999,flexShrink:0,
                     background:"#fff5f5",border:"1.5px solid #fecaca"}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#ef4444",display:"inline-block",animation:"pulse-ring 1.5s ease-in-out infinite"}}/>
          <span style={{fontSize:12,fontWeight:900,color:"#dc2626",fontFamily:"'Nunito',sans-serif"}}>
            {alertsData.length} Active
          </span>
        </div>
      </div>

      {/* ── Summary cards — 3 equal columns, always ── */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:24}}>
        {[
          {label:"Outages", count:outages,  icon:"🚨",...S.outage},
          {label:"Delays",  count:delays,   icon:"⚠️",...S.delay},
          {label:"Restored",count:restored, icon:"✅",...S.restored},
        ].map((s,i)=>(
          <div key={i} className="water-card anim-wave-in" style={{
            animationDelay:`${i*0.1}s`,
            background:s.bg,
            border:`2px solid ${s.border}`,
            borderRadius:20,
            padding:"16px 8px",
            textAlign:"center",
            boxShadow:`0 6px 24px ${s.color}15`,
          }}>
            <div style={{fontSize:"clamp(22px,5vw,36px)",marginBottom:6}}>{s.icon}</div>
            <div style={{
              fontFamily:"'Raleway',sans-serif",fontWeight:900,
              fontSize:"clamp(28px,6vw,48px)",
              color:s.color,lineHeight:1,marginBottom:4,
            }}>{s.count}</div>
            <div style={{fontWeight:800,fontSize:"clamp(11px,2.5vw,14px)",color:s.color,fontFamily:"'Nunito',sans-serif"}}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Feed header ── */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:"#38bdf8",display:"inline-block",animation:"pulse-ring 1.5s ease-in-out infinite"}}/>
        <h3 style={{fontWeight:800,color:"#94a3b8",fontSize:13,letterSpacing:"0.05em",fontFamily:"'Nunito',sans-serif",margin:0}}>
          Live Alert Feed
        </h3>
      </div>

      {/* ── Alert cards ── */}
      <div style={{display:"flex",flexDirection:"column",gap:12,paddingBottom:100}}>
        {alertsData.map((alert,i)=>{
          const s=S[alert.type];
          return(
            <div key={alert.id} className="glass-white anim-wave-in water-card" style={{
              animationDelay:`${i*0.07}s`,
              borderRadius:20,
              padding:"14px 16px",
              display:"flex",
              alignItems:"flex-start",
              gap:12,
              borderLeft:`5px solid ${s.color}`,
              boxShadow:`0 4px 20px ${s.color}12`,
            }}>
              {/* Icon box */}
              <div style={{
                width:44,height:44,borderRadius:14,
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:20,flexShrink:0,
                background:s.bg,border:`1.5px solid ${s.border}`,
              }}>{alert.icon}</div>

              {/* Content */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,gap:8,flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Raleway',sans-serif",fontWeight:900,color:"#0f172a",fontSize:15}}>
                    {alert.ward}
                  </span>
                  <span style={{fontSize:11,fontWeight:700,color:"#94a3b8",flexShrink:0}}>{alert.time}</span>
                </div>
                <p style={{fontSize:13,fontWeight:600,color:"#475569",lineHeight:1.55,marginBottom:8,wordBreak:"break-word"}}>
                  {alert.msg}
                </p>
                <span style={{
                  display:"inline-block",fontSize:11,fontWeight:800,
                  padding:"3px 12px",borderRadius:999,
                  background:s.bg,border:`1.5px solid ${s.border}`,
                  color:s.color,fontFamily:"'Nunito',sans-serif",
                }}>
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}