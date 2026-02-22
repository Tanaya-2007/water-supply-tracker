import { useState } from "react";
import { cityData, alertColors } from "../citydata";

export default function AlertsPage({ selectedCity }) {
  const city   = cityData[selectedCity];
  const alerts = city?.alerts || [];
  const [filter, setFilter] = useState("all");

  if (!selectedCity) return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  minHeight:"60vh", fontFamily:"'Nunito',sans-serif", textAlign:"center", padding:"20px"}}>
      <div style={{fontSize:56, marginBottom:16}}>🔔</div>
      <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:22, color:"#0f172a", marginBottom:8}}>
        No City Selected
      </h3>
      <p style={{fontSize:14, fontWeight:700, color:"#64748b", maxWidth:280}}>
        Go to the <strong>Map</strong> tab and tap a city to see alerts here.
      </p>
    </div>
  );

  const filtered = filter === "all" ? alerts : alerts.filter(a => a.type === filter);

  const high   = alerts.filter(a=>a.severity==="high").length;
  const medium = alerts.filter(a=>a.severity==="medium").length;
  const low    = alerts.filter(a=>a.severity==="low").length;

  return (
    <div style={{maxWidth:1280, margin:"0 auto", padding:"20px 16px 100px"}}>

      <div style={{marginBottom:16}}>
        <h2 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                    fontSize:"clamp(22px,5vw,32px)", color:"#0f172a",
                    letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:4}}>
          Live Alerts
        </h2>
        <p style={{fontSize:13, fontWeight:700, color:"#94a3b8", margin:0}}>
          {alerts.length} alerts · {city?.name}
        </p>
      </div>

      {/* Summary cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20}}>
        {[
          {label:"Critical",  value:high,   color:"#dc2626", bg:"rgba(254,226,226,0.7)", border:"#fecaca"},
          {label:"Warnings",  value:medium, color:"#d97706", bg:"rgba(254,243,199,0.7)", border:"#fde68a"},
          {label:"Info",      value:low,    color:"#16a34a", bg:"rgba(220,252,231,0.7)", border:"#bbf7d0"},
        ].map(s=>(
          <div key={s.label} style={{
            padding:"14px 12px", borderRadius:18, textAlign:"center",
            background:s.bg, border:`1.5px solid ${s.border}`,
            boxShadow:`0 4px 16px ${s.color}12`,
          }}>
            <div style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                          fontSize:"clamp(24px,5vw,36px)", color:s.color, lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:12, fontWeight:800, color:s.color, marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{display:"flex", gap:8, marginBottom:16, flexWrap:"wrap"}}>
        {[
          {key:"all",      label:"All"},
          {key:"outage",   label:"🚨 Outage"},
          {key:"delay",    label:"⚠️ Delay"},
          {key:"restored", label:"✅ Restored"},
        ].map(f=>(
          <button key={f.key} onClick={()=>setFilter(f.key)} style={{
            padding:"8px 18px", borderRadius:999, border:"none",
            cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:12,
            background: filter===f.key?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.6)",
            color:       filter===f.key?"#0369a1":"#64748b",
            outline:     filter===f.key?"1.5px solid rgba(6,182,212,0.5)":"1.5px solid transparent",
            boxShadow:   filter===f.key?"0 4px 12px rgba(6,182,212,0.2)":"none",
            transition:"all 0.2s ease",
          }}>{f.label}</button>
        ))}
      </div>

      {/* Alert list */}
      <div style={{display:"flex", flexDirection:"column", gap:12}}>
        {filtered.length===0 && (
          <div style={{textAlign:"center", padding:"40px 20px", color:"#94a3b8",
                        fontWeight:700, fontSize:15}}>
            No alerts for this filter 🎉
          </div>
        )}
        {filtered.map(alert=>{
          const ac = alertColors[alert.type];
          return (
            <div key={alert.id} style={{
              display:"flex", alignItems:"flex-start", gap:14,
              background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)",
              border:`1px solid rgba(255,255,255,0.95)`,
              borderLeft:`5px solid ${ac.color}`,
              borderRadius:20, padding:"16px 18px",
              boxShadow:`0 4px 20px ${ac.color}12`,
            }}>
              <div style={{
                width:46, height:46, borderRadius:14, flexShrink:0,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
                background:ac.bg, border:`1.5px solid ${ac.border}`,
              }}>{ac.icon}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",
                              marginBottom:4, flexWrap:"wrap", gap:4}}>
                  <span style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                                 fontSize:15, color:"#0f172a"}}>{alert.ward}</span>
                  <div style={{display:"flex", alignItems:"center", gap:8}}>
                    <span style={{fontSize:11, fontWeight:800, padding:"2px 8px", borderRadius:99,
                                   background:ac.bg, color:ac.color, border:`1px solid ${ac.border}`}}>
                      {ac.label}
                    </span>
                    <span style={{fontSize:11, fontWeight:700, color:"#94a3b8"}}>{alert.time}</span>
                  </div>
                </div>
                <p style={{fontSize:13, color:"#475569", margin:0, fontWeight:600, lineHeight:1.5, wordBreak:"break-word"}}>
                  {alert.msg}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}