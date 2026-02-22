import { useState, useEffect } from "react";
import { cityData, alertColors, statusConfig } from "./citydata";
import { db } from "./firebase";
import { ref, update, onValue } from "firebase/database";

const cityOptions = [
  { key:"sangli", label:"🏙️ Sangli-Miraj-Kupwad" },
  { key:"pune",   label:"🏙️ Pune" },
  { key:"nashik", label:"🏙️ Nashik" },
];

export default function AdminDashboard({ onBack, selectedCity: initCity = "sangli" }) {
  const [city,         setCity]         = useState(initCity);
  const [activeTab,    setActiveTab]    = useState("wards");
  const [editingId,    setEditingId]    = useState(null);
  const [editData,     setEditData]     = useState({});
  const [saved,        setSaved]        = useState(null);
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastSent,setBroadcastSent]= useState(false);

  // Live data from Firebase
  const [wards,  setWards]  = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Subscribe to Firebase on city change
  useEffect(() => {
    const unsub1 = onValue(ref(db, `cities/${city}/wards`), snap => {
      setWards(snap.exists() ? Object.values(snap.val()) : cityData[city]?.wards || []);
    });
    const unsub2 = onValue(ref(db, `cities/${city}/alerts`), snap => {
      setAlerts(snap.exists() ? Object.values(snap.val()) : cityData[city]?.alerts || []);
    });
    return () => { unsub1(); unsub2(); };
  }, [city]);

  const flowing = wards.filter(w=>w.status==="green").length;
  const soon    = wards.filter(w=>w.status==="yellow").length;
  const outage  = wards.filter(w=>w.status==="red").length;

  const startEdit  = (ward) => { setEditingId(ward.id); setEditData({...ward}); };
  const cancelEdit = () => { setEditingId(null); setEditData({}); };
  const saveEdit = () => {
    update(ref(db, `cities/${city}/wards/${editingId}`), editData);
    setSaved(editingId); setEditingId(null);
    setTimeout(()=>setSaved(null),2500);
  };
  const quickStatus = (id, status) => {
    update(ref(db, `cities/${city}/wards/${id}`), {
      status,
      delay: status==="green"?"On Time":status==="yellow"?"~45 mins":"Supply Off",
    });
    setSaved(id); setTimeout(()=>setSaved(null),2000);
  };

  const inputStyle = {
    width:"100%", padding:"10px 12px", borderRadius:12,
    background:"rgba(255,255,255,0.95)", border:"1.5px solid rgba(6,182,212,0.25)",
    color:"#0f172a", fontSize:13, fontWeight:700,
    fontFamily:"'Nunito',sans-serif", outline:"none", boxSizing:"border-box",
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(160deg,#e0f2fe 0%,#bae6fd 50%,#e0f2fe 100%)",
      fontFamily:"'Nunito',sans-serif",
    }}>

      {/* Header */}
      <header style={{
        background:"linear-gradient(135deg,#0369a1 0%,#0ea5e9 55%,#06b6d4 100%)",
        boxShadow:"0 8px 40px rgba(3,105,161,0.35)",
        position:"sticky", top:0, zIndex:50, overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1920&q=80')",
          backgroundSize:"cover", backgroundPosition:"center 60%",
          mixBlendMode:"overlay", opacity:0.3,
        }}/>
        <div style={{
          position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto",
          padding:"12px 16px", display:"flex", alignItems:"center",
          justifyContent:"space-between", gap:10,
        }}>
          <div style={{display:"flex", alignItems:"center", gap:12}}>
            <div style={{
              width:44, height:44, borderRadius:14,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
              background:"rgba(255,255,255,0.22)", backdropFilter:"blur(12px)",
              border:"1.5px solid rgba(255,255,255,0.45)",
            }}>🛡️</div>
            <div>
              <h1 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                           fontSize:"clamp(16px,4vw,22px)", color:"white",
                           lineHeight:1, letterSpacing:"-0.3px", margin:0}}>
                JalDarpan Admin
              </h1>
              <p style={{color:"rgba(224,242,254,0.85)", fontSize:10, fontWeight:700,
                          margin:"3px 0 0", letterSpacing:"0.15em", textTransform:"uppercase"}}>
                Municipal Control Panel
              </p>
            </div>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <div style={{display:"flex", alignItems:"center", gap:6, padding:"6px 14px",
                          borderRadius:999, background:"rgba(255,255,255,0.2)",
                          border:"1.5px solid rgba(255,255,255,0.35)"}}>
              <span style={{width:8, height:8, borderRadius:"50%", background:"#fca5a5",
                             display:"inline-block", animation:"pulse-ring 1.5s ease-in-out infinite"}}/>
              <span style={{fontSize:11, fontWeight:900, color:"white"}}>LIVE ADMIN</span>
            </div>
            {onBack && (
              <button onClick={onBack} style={{
                padding:"8px 16px", borderRadius:999,
                background:"rgba(255,255,255,0.95)", border:"none",
                color:"#0369a1", fontWeight:900, fontSize:12,
                cursor:"pointer", fontFamily:"'Nunito',sans-serif",
              }}>← Back to App</button>
            )}
          </div>
        </div>
      </header>

      <div style={{maxWidth:1280, margin:"0 auto", padding:"24px 16px 100px"}}>

        {/* City selector */}
        <div style={{
          display:"flex", alignItems:"center", gap:12, marginBottom:24,
          padding:"16px 20px", borderRadius:20,
          background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,0.95)",
          boxShadow:"0 4px 20px rgba(6,182,212,0.1)",
          flexWrap:"wrap",
        }}>
          <span style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                         fontSize:14, color:"#0f172a", flexShrink:0}}>
            📍 Select City:
          </span>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {cityOptions.map(c=>(
              <button key={c.key} onClick={()=>{ setCity(c.key); setEditingId(null); }} style={{
                padding:"9px 20px", borderRadius:999, border:"none",
                cursor:"pointer", fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13,
                background: city===c.key?"linear-gradient(135deg,#0ea5e9,#06b6d4)":"rgba(240,249,255,0.8)",
                color:       city===c.key?"white":"#0369a1",
                boxShadow:   city===c.key?"0 4px 12px rgba(6,182,212,0.35)":"none",
                outline:     city===c.key?"none":"1.5px solid rgba(6,182,212,0.2)",
                transition:"all 0.2s ease",
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:14, marginBottom:24}}>
          {[
            {label:"Total Wards", value:wards.length,                     emoji:"🏘️", color:"#0ea5e9", shadow:"rgba(14,165,233,0.2)"},
            {label:"Flowing",     value:flowing,                           emoji:"💧", color:"#16a34a", shadow:"rgba(22,163,74,0.2)"},
            {label:"Coming Soon", value:soon,                              emoji:"⏳", color:"#d97706", shadow:"rgba(217,119,6,0.2)"},
            {label:"No Supply",   value:outage,                            emoji:"🚱", color:"#dc2626", shadow:"rgba(220,38,38,0.2)"},
            {label:"Reporters",   value:wards.reduce((a,b)=>a+b.users,0), emoji:"👥", color:"#6366f1", shadow:"rgba(99,102,241,0.2)"},
          ].map((s,i)=>(
            <div key={i} style={{
              background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)",
              border:"1px solid rgba(255,255,255,0.95)", borderTop:`3px solid ${s.color}`,
              borderRadius:22, padding:"18px 14px", textAlign:"center",
              boxShadow:`0 6px 24px ${s.shadow}`,
            }}>
              <div style={{fontSize:26, marginBottom:8}}>{s.emoji}</div>
              <div style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                            fontSize:"clamp(24px,5vw,36px)", color:s.color, lineHeight:1, marginBottom:4}}>
                {s.value}
              </div>
              <div style={{fontSize:11, fontWeight:800, color:"#64748b"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          display:"flex", gap:8, marginBottom:20,
          background:"rgba(255,255,255,0.6)", backdropFilter:"blur(12px)",
          borderRadius:18, padding:6, border:"1px solid rgba(255,255,255,0.95)",
        }}>
          {[
            {id:"wards",     label:"🏘️ Ward Control"},
            {id:"alerts",    label:"🔔 Alerts"},
            {id:"broadcast", label:"📢 Broadcast"},
          ].map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
              flex:1, padding:"11px 8px", borderRadius:12, border:"none",
              background:activeTab===t.id?"linear-gradient(135deg,#0ea5e9,#06b6d4)":"transparent",
              color:activeTab===t.id?"white":"#64748b",
              fontWeight:800, fontSize:"clamp(11px,2vw,13px)", cursor:"pointer",
              fontFamily:"'Nunito',sans-serif",
              boxShadow:activeTab===t.id?"0 4px 12px rgba(6,182,212,0.35)":"none",
              transition:"all 0.25s ease",
            }}>{t.label}</button>
          ))}
        </div>

        {/* WARD CONTROL */}
        {activeTab==="wards" && (
          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            {wards.map(ward=>{
              const cfg       = statusConfig[ward.status];
              const isEditing = editingId===ward.id;
              const justSaved = saved===ward.id;
              return (
                <div key={ward.id} style={{
                  background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)",
                  border:`1.5px solid ${justSaved?"#4ade80":isEditing?"rgba(6,182,212,0.5)":"rgba(255,255,255,0.95)"}`,
                  borderLeft:`4px solid ${cfg.dot}`,
                  borderRadius:20, padding:"18px",
                  boxShadow:"0 4px 24px rgba(6,182,212,0.09)",
                  transition:"border-color 0.3s ease",
                }}>
                  {isEditing ? (
                    <div>
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",
                                    marginBottom:16, flexWrap:"wrap", gap:8}}>
                        <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                                    fontSize:16, color:"#0369a1", margin:0}}>
                          ✏️ Editing: {ward.name}
                        </h3>
                        <div style={{display:"flex", gap:8}}>
                          <button onClick={saveEdit} style={{
                            padding:"8px 20px", borderRadius:999, border:"none",
                            background:"linear-gradient(135deg,#0ea5e9,#06b6d4)",
                            color:"white", fontWeight:800, fontSize:12, cursor:"pointer",
                            fontFamily:"'Nunito',sans-serif",
                          }}>✓ Save</button>
                          <button onClick={cancelEdit} style={{
                            padding:"8px 16px", borderRadius:999,
                            background:"rgba(255,255,255,0.8)", border:"1.5px solid #e2e8f0",
                            color:"#64748b", fontWeight:700, fontSize:12, cursor:"pointer",
                            fontFamily:"'Nunito',sans-serif",
                          }}>Cancel</button>
                        </div>
                      </div>
                      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12}}>
                        {[
                          {label:"Ward Name",   key:"name"},
                          {label:"Zone",        key:"zone"},
                          {label:"Next Supply", key:"nextSupply"},
                          {label:"Duration",    key:"duration"},
                          {label:"Delay",       key:"delay"},
                        ].map(f=>(
                          <div key={f.key}>
                            <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                                           marginBottom:5, letterSpacing:"0.1em", textTransform:"uppercase"}}>
                              {f.label}
                            </label>
                            <input value={editData[f.key]||""} onChange={e=>setEditData(p=>({...p,[f.key]:e.target.value}))} style={inputStyle}/>
                          </div>
                        ))}
                        <div>
                          <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                                         marginBottom:5, letterSpacing:"0.1em", textTransform:"uppercase"}}>Status</label>
                          <select value={editData.status||"green"} onChange={e=>setEditData(p=>({...p,status:e.target.value}))}
                            style={{...inputStyle, cursor:"pointer"}}>
                            <option value="green">💧 Flowing</option>
                            <option value="yellow">⏳ Coming Soon</option>
                            <option value="red">🚱 No Supply</option>
                          </select>
                        </div>
                        <div>
                          <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                                         marginBottom:5, letterSpacing:"0.1em", textTransform:"uppercase"}}>Pressure</label>
                          <select value={editData.pressure||"Medium"} onChange={e=>setEditData(p=>({...p,pressure:e.target.value}))}
                            style={{...inputStyle, cursor:"pointer"}}>
                            <option value="High">🔺 High</option>
                            <option value="Medium">↔️ Medium</option>
                            <option value="Low">🔻 Low</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12}}>
                      <div style={{display:"flex", alignItems:"center", gap:12, flex:1, minWidth:0}}>
                        <div style={{
                          width:44, height:44, borderRadius:14, flexShrink:0,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          background:cfg.bg, border:`1.5px solid ${cfg.border}`,
                        }}>
                          <span style={{width:14, height:14, borderRadius:"50%", background:cfg.dot,
                                         display:"inline-block", boxShadow:`0 0 8px ${cfg.dot}88`}}/>
                        </div>
                        <div style={{minWidth:0}}>
                          <div style={{display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3}}>
                            <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                                        fontSize:"clamp(14px,3vw,17px)", color:"#0f172a", margin:0}}>
                              {ward.name}
                            </h3>
                            <span style={{padding:"3px 10px", borderRadius:999, fontSize:11, fontWeight:800,
                                           background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`}}>
                              {cfg.label}
                            </span>
                            {justSaved && <span style={{fontSize:11, fontWeight:800, color:"#16a34a"}}>✓ Saved!</span>}
                          </div>
                          <p style={{fontSize:12, color:"#64748b", margin:0, fontWeight:600}}>
                            {ward.zone} · Next: {ward.nextSupply} · {ward.delay} · {ward.pressure} pressure
                          </p>
                        </div>
                      </div>
                      <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", flexShrink:0}}>
                        {["green","yellow","red"].map(s=>(
                          <button key={s} onClick={()=>quickStatus(ward.id,s)}
                            disabled={ward.status===s} title={statusConfig[s].label}
                            style={{
                              width:26, height:26, borderRadius:"50%",
                              border:`2px solid ${statusConfig[s].dot}`,
                              background:ward.status===s?statusConfig[s].dot:"transparent",
                              cursor:ward.status===s?"default":"pointer",
                              opacity:ward.status===s?1:0.45, transition:"all 0.2s ease",
                            }}/>
                        ))}
                        <button onClick={()=>startEdit(ward)} style={{
                          padding:"8px 16px", borderRadius:999,
                          background:"rgba(240,249,255,0.9)", border:"1.5px solid rgba(6,182,212,0.3)",
                          color:"#0369a1", fontWeight:800, fontSize:12, cursor:"pointer",
                          fontFamily:"'Nunito',sans-serif",
                        }}>✏️ Edit</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ALERTS */}
        {activeTab==="alerts" && (
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                         fontSize:20, color:"#0f172a", margin:"0 0 12px"}}>
              Recent Alerts — {cityData[city]?.name}
            </h3>
            {alerts.map(alert=>{
              const ac = alertColors[alert.type];
              return (
                <div key={alert.id} style={{
                  display:"flex", alignItems:"flex-start", gap:14,
                  background:"rgba(255,255,255,0.9)", backdropFilter:"blur(20px)",
                  border:`1px solid rgba(255,255,255,0.95)`, borderLeft:`5px solid ${ac.color}`,
                  borderRadius:20, padding:"16px 18px", boxShadow:`0 4px 20px ${ac.color}12`,
                }}>
                  <div style={{width:46, height:46, borderRadius:14, flexShrink:0, fontSize:20,
                                display:"flex", alignItems:"center", justifyContent:"center",
                                background:ac.bg, border:`1.5px solid ${ac.border}`}}>
                    {ac.icon}
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4, marginBottom:4}}>
                      <span style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:15, color:"#0f172a"}}>
                        {alert.ward}
                      </span>
                      <span style={{fontSize:11, fontWeight:700, color:"#94a3b8"}}>{alert.time}</span>
                    </div>
                    <p style={{fontSize:13, color:"#475569", margin:0, fontWeight:600, lineHeight:1.5}}>{alert.msg}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BROADCAST */}
        {activeTab==="broadcast" && (
          <div style={{maxWidth:560}}>
            <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:22, color:"#0f172a", margin:"0 0 6px"}}>
              📢 Broadcast to Citizens
            </h3>
            <p style={{fontSize:13, color:"#64748b", margin:"0 0 22px", fontWeight:600}}>
              Send alert to {cityData[city]?.name} residents
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:14}}>
              <div>
                <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                               marginBottom:6, letterSpacing:"0.1em", textTransform:"uppercase"}}>Select Ward</label>
                <select style={{...inputStyle, cursor:"pointer"}}>
                  <option value="all">📍 All Wards</option>
                  {wards.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                               marginBottom:6, letterSpacing:"0.1em", textTransform:"uppercase"}}>Alert Type</label>
                <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                  {[
                    {label:"🚨 Outage",   color:"#dc2626", bg:"rgba(254,226,226,0.6)", border:"#fecaca"},
                    {label:"⚠️ Delay",    color:"#d97706", bg:"rgba(254,243,199,0.6)", border:"#fde68a"},
                    {label:"✅ Restored", color:"#16a34a", bg:"rgba(220,252,231,0.6)", border:"#bbf7d0"},
                    {label:"ℹ️ Info",     color:"#0369a1", bg:"rgba(224,242,254,0.6)", border:"#bae6fd"},
                  ].map(t=>(
                    <button key={t.label} style={{
                      padding:"9px 18px", borderRadius:999, border:`1.5px solid ${t.border}`,
                      background:t.bg, color:t.color, fontWeight:800, fontSize:12,
                      cursor:"pointer", fontFamily:"'Nunito',sans-serif",
                    }}>{t.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{display:"block", fontSize:10, fontWeight:900, color:"#94a3b8",
                               marginBottom:6, letterSpacing:"0.1em", textTransform:"uppercase"}}>Message</label>
                <textarea value={broadcastMsg} onChange={e=>setBroadcastMsg(e.target.value)}
                  placeholder="Type your message to citizens..." rows={4}
                  style={{...inputStyle, resize:"vertical", lineHeight:1.7, padding:"12px 14px"}}/>
              </div>
              {broadcastSent ? (
                <div style={{padding:"16px 20px", borderRadius:18,
                              background:"rgba(220,252,231,0.6)", border:"1.5px solid #bbf7d0",
                              display:"flex", alignItems:"center", gap:10}}>
                  <span style={{fontSize:22}}>✅</span>
                  <span style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:15, color:"#16a34a"}}>
                    Broadcast sent!
                  </span>
                </div>
              ) : (
                <button onClick={()=>{if(broadcastMsg.trim()){setBroadcastSent(true);setTimeout(()=>setBroadcastSent(false),3000);}}}
                  style={{
                    width:"100%", padding:"14px", borderRadius:18, border:"none",
                    background:"linear-gradient(135deg,#0ea5e9,#06b6d4)",
                    color:"white", fontWeight:900, fontSize:15, cursor:"pointer",
                    fontFamily:"'Nunito',sans-serif",
                    boxShadow:"0 8px 24px rgba(6,182,212,0.38)",
                    opacity:broadcastMsg.trim()?1:0.5,
                  }}>📢 Send Broadcast</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}