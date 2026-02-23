import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, runTransaction, update, get } from "firebase/database";

const REPORT_THRESHOLD = 5;

// Ask user their ward on first use, store in localStorage
function getUserWard() {
  return localStorage.getItem("jaldarpan_ward") || null;
}
function setUserWard(wardName) {
  localStorage.setItem("jaldarpan_ward", wardName);
}

export default function ReportModal({ onClose, ward, cityKey, allWards = [] }) {
  const [reported,      setReported]      = useState(false);
  const [type,          setType]          = useState(null);
  const [userWard,      setUserWardState] = useState(getUserWard());
  const [pickingWard,   setPickingWard]   = useState(!getUserWard());
  const [error,         setError]         = useState("");

  // If user hasn't set their ward yet, show ward picker first
  const handleWardPick = (wardName) => {
    setUserWard(wardName);
    setUserWardState(wardName);
    setPickingWard(false);
  };

  const handle = async (reportType) => {
    // Only allow reporting from user's own ward
    if (userWard && ward && userWard !== ward.name) {
      setError(`You can only report for your ward (${userWard}). This is ${ward.name}.`);
      return;
    }

    setType(reportType);
    setReported(true);

    if (!ward || !cityKey) { setTimeout(onClose, 2600); return; }

    const statusMap = { "no_water":"red", "low_pressure":"yellow", "flowing":"green" };
    const reportedStatus = statusMap[reportType] || "yellow";

    try {
      // Use string key to match Firebase
      const wardKey = String(ward.id);
      const reportRef = ref(db, `reports/${cityKey}/${wardKey}/${reportedStatus}`);

      // Atomic increment
      let newCount = 0;
      await runTransaction(reportRef, (current) => {
        newCount = (current || 0) + 1;
        return newCount;
      });

      // Re-read to get accurate count
      const snap = await get(reportRef);
      const count = snap.val() || 0;

      if (count >= REPORT_THRESHOLD) {
        // Update ward status in Firebase — all users see this instantly via onValue
        await update(ref(db, `cities/${cityKey}/wards/${wardKey}`), {
          status: reportedStatus,
          delay:  reportedStatus==="green" ? "On Time"
                : reportedStatus==="yellow" ? "~45 mins"
                : "Supply Off",
        });
        // Reset count
        await update(ref(db, `reports/${cityKey}/${wardKey}`), { [reportedStatus]: 0 });
      }
    } catch (err) {
      console.error("Report error:", err);
    }

    setTimeout(onClose, 2600);
  };

  // ── Ward picker screen ──
  if (pickingWard) {
    return (
      <div onClick={onClose} style={{
        position:"fixed", inset:0, zIndex:9999,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:"rgba(3,55,90,0.5)", backdropFilter:"blur(10px)",
        padding:"16px 16px 90px 16px",
      }}>
        <div onClick={e=>e.stopPropagation()} style={{
          width:"100%", maxWidth:520, borderRadius:28,
          background:"white", boxShadow:"0 20px 80px rgba(6,182,212,0.22)",
          overflow:"hidden",
        }}>
          <div style={{height:5, background:"linear-gradient(90deg,#0369a1,#0ea5e9,#06b6d4,#38bdf8)"}}/>
          <div style={{padding:"24px 24px 28px"}}>
            <h2 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:20,
                        color:"#0f172a", marginBottom:6, textAlign:"center"}}>
              📍 Select Your Ward
            </h2>
            <p style={{fontSize:13, color:"#64748b", fontWeight:600, textAlign:"center", marginBottom:20}}>
              You can only report issues for your own ward. This is saved on your device.
            </p>
            <div style={{display:"flex", flexDirection:"column", gap:10}}>
              {allWards.length > 0 ? allWards.map(w => (
                <button key={w.id} onClick={() => handleWardPick(w.name)} style={{
                  padding:"14px 18px", borderRadius:14, border:"1.5px solid rgba(6,182,212,0.25)",
                  background:"rgba(240,249,255,0.8)", cursor:"pointer", textAlign:"left",
                  fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:14, color:"#0369a1",
                  transition:"all 0.2s",
                }}>
                  📍 {w.name} <span style={{fontSize:11, color:"#94a3b8", fontWeight:600}}>· {w.zone}</span>
                </button>
              )) : (
                <p style={{textAlign:"center", color:"#94a3b8", fontSize:13}}>
                  Please select a city on the Map first.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main report screen ──
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9999,
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"rgba(3,55,90,0.5)", backdropFilter:"blur(10px)",
      padding:"16px 16px 90px 16px",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"100%", maxWidth:520, borderRadius:28,
        background:"white", boxShadow:"0 20px 80px rgba(6,182,212,0.22)",
        overflow:"hidden",
      }}>
        <div style={{height:5, background:"linear-gradient(90deg,#0369a1,#0ea5e9,#06b6d4,#38bdf8)"}}/>
        <div style={{width:40, height:4, borderRadius:999, background:"#e2e8f0", margin:"14px auto 20px"}}/>

        {!reported ? (
          <div style={{padding:"0 24px 28px"}}>
            <div style={{textAlign:"center", marginBottom:20}}>
              <h2 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:22,
                          color:"#0f172a", marginBottom:6}}>
                What's happening at your tap?
              </h2>
              <p style={{fontSize:13, color:"#0369a1", fontWeight:700}}>
                📍 Your ward: {userWard || ward?.name}
              </p>
              {ward && userWard !== ward.name && (
                <div style={{marginTop:8, padding:"8px 14px", borderRadius:10,
                              background:"#fef2f2", border:"1px solid #fca5a5"}}>
                  <p style={{fontSize:12, color:"#dc2626", fontWeight:700, margin:0}}>
                    ⚠️ You're viewing {ward.name} but your registered ward is {userWard}.
                    You can only report for {userWard}.
                  </p>
                </div>
              )}
              <button onClick={()=>setPickingWard(true)}
                style={{marginTop:8, fontSize:11, color:"#94a3b8", background:"none",
                        border:"none", cursor:"pointer", textDecoration:"underline"}}>
                Change my ward
              </button>
            </div>

            {error && (
              <div style={{padding:"10px 14px", borderRadius:12, marginBottom:14,
                            background:"#fef2f2", border:"1px solid #fca5a5",
                            color:"#dc2626", fontSize:13, fontWeight:700}}>
                ⚠️ {error}
              </div>
            )}

            {[
              { key:"no_water",     emoji:"🚫", label:"No Water",     sub:"Tap is completely dry",     bg:"#fef2f2", border:"#fca5a5", color:"#dc2626" },
              { key:"low_pressure", emoji:"💧", label:"Low Pressure", sub:"Water is trickling slowly", bg:"#fffbeb", border:"#fcd34d", color:"#d97706" },
              { key:"flowing",      emoji:"✅", label:"Flowing Fine", sub:"Water supply is normal",    bg:"#f0fdf4", border:"#86efac", color:"#16a34a" },
            ].map(opt => (
              <button key={opt.key} onClick={() => handle(opt.key)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:16,
                padding:"16px 18px", borderRadius:16, marginBottom:10,
                background:opt.bg, border:`2px solid ${opt.border}`,
                cursor:"pointer", textAlign:"left", transition:"all 0.2s",
                opacity: (userWard && ward && userWard !== ward.name) ? 0.4 : 1,
              }}>
                <span style={{fontSize:28}}>{opt.emoji}</span>
                <div>
                  <div style={{fontWeight:800, fontSize:15, color:opt.color}}>{opt.label}</div>
                  <div style={{fontSize:12, color:"#64748b", marginTop:2}}>{opt.sub}</div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{padding:"32px 24px 40px", textAlign:"center"}}>
            <div style={{fontSize:52, marginBottom:16}}>
              {type==="no_water" ? "🚨" : type==="low_pressure" ? "⚠️" : "🎉"}
            </div>
            <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:20,
                        color:"#0f172a", marginBottom:8}}>Report Submitted!</h3>
            <p style={{fontSize:13, color:"#64748b", fontWeight:600, maxWidth:260, margin:"0 auto"}}>
              When {REPORT_THRESHOLD}+ users report the same issue, the map and status update automatically for everyone!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}