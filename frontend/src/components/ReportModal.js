import { useState } from "react";
import { db } from "../firebase";
import { ref, runTransaction, update, push } from "firebase/database";

const REPORT_THRESHOLD = 1; // Change to 5 for production

export default function ReportModal({ ward, cityKey, onClose }) {
  const [step,     setStep]     = useState("pick"); // "pick" | "done"
  const [loading,  setLoading]  = useState(false);

  if (!ward || !cityKey) return null;

  const reportOptions = [
    { type:"no_water",     icon:"🚱", label:"No Water",      sub:"Tap is completely dry",       newStatus:"red",    alertType:"outage", alertMsg:`No water supply reported in ${ward.name}` },
    { type:"low_pressure", icon:"🔻", label:"Low Pressure",  sub:"Water is flowing but weak",   newStatus:"low_pressure", alertType:"delay",  alertMsg:`Low water pressure reported in ${ward.name}` },
    { type:"flowing",      icon:"💧", label:"Water Flowing", sub:"Supply is normal and strong",  newStatus:"green",  alertType:"restored", alertMsg:`Water supply confirmed flowing in ${ward.name}` },
  ];

  const handleReport = async (option) => {
    setLoading(true);
    try {
      const wardId     = String(ward.id);
      const reportPath = `reports/${cityKey}/${wardId}/${option.type}`;
      const wardPath   = `cities/${cityKey}/wards/${wardId}`;
      const alertsPath = `cities/${cityKey}/alerts`;

      let shouldUpdate = false;

      // Increment report count atomically
      await runTransaction(ref(db, reportPath), (current) => {
        return (current || 0) + 1;
      }).then((result) => {
        if (result.snapshot.val() >= REPORT_THRESHOLD) {
          shouldUpdate = true;
        }
      });

      if (shouldUpdate) {
        // Update ward status in Firebase → all pages update instantly
        await update(ref(db, wardPath), { status: option.newStatus });

        // Also reset count so it doesn't keep triggering
        await update(ref(db, `reports/${cityKey}/${wardId}`), { [option.type]: 0 });

        // Push alert to Firebase → Alerts tab updates instantly
        await push(ref(db, alertsPath), {
          type:     option.alertType,
          ward:     ward.name,
          msg:      option.alertMsg,
          time:     "Just now",
          severity: option.alertType === "outage" ? "high" : option.alertType === "delay" ? "medium" : "low",
        });
      }

      setStep("done");
      setTimeout(onClose, 2500);
    } catch (err) {
      console.error("Report error:", err);
      setStep("done");
      setTimeout(onClose, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:999,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"16px 16px 90px",
      background:"rgba(3,55,90,0.5)", backdropFilter:"blur(10px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width:"100%", maxWidth:460,
        background:"#fff", borderRadius:28,
        boxShadow:"0 24px 80px rgba(6,182,212,0.28),0 8px 24px rgba(0,0,0,0.12)",
        overflow:"hidden",
      }}>
        {/* Top gradient bar */}
        <div style={{ height:4, background:"linear-gradient(90deg,#0369a1,#0ea5e9,#06b6d4,#38bdf8)" }}/>
        <div style={{ width:36, height:4, borderRadius:999, background:"#e2e8f0", margin:"14px auto 0" }}/>

        {step === "pick" ? (
          <div style={{ padding:"16px 20px 28px" }}>
            {/* Title */}
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <h2 style={{
                fontFamily:"'Raleway',sans-serif", fontWeight:900,
                fontSize:"clamp(17px,4vw,21px)", color:"#1e293b",
                letterSpacing:"-0.3px", margin:"0 0 4px",
              }}>
                Report for {ward.name}
              </h2>
              <p style={{ fontSize:12, fontWeight:600, color:"#94a3b8", margin:0 }}>
                What is the current water status at your tap?
              </p>
            </div>

            {/* 3 report buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
              {reportOptions.map(opt => (
                <button key={opt.type}
                  onClick={() => !loading && handleReport(opt)}
                  style={{
                    display:"flex", alignItems:"center", gap:14,
                    padding:"16px 18px", borderRadius:18, border:"none",
                    cursor: loading ? "not-allowed" : "pointer",
                    background:
                      opt.newStatus === "green"        ? "#f0fdf4" :
                      opt.newStatus === "low_pressure" ? "#fff7ed" : "#fff5f5",
                    borderLeft: `4px solid ${
                      opt.newStatus === "green"        ? "#16a34a" :
                      opt.newStatus === "low_pressure" ? "#ea580c" : "#dc2626"
                    }`,
                    opacity: loading ? 0.6 : 1,
                    transition:"transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { if(!loading){ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
                >
                  <span style={{ fontSize:32, flexShrink:0 }}>{opt.icon}</span>
                  <div style={{ textAlign:"left" }}>
                    <p style={{
                      fontFamily:"'Raleway',sans-serif", fontWeight:900,
                      fontSize:15, color:"#1e293b", margin:"0 0 2px",
                    }}>{opt.label}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:"#94a3b8", margin:0 }}>{opt.sub}</p>
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:18, color:"#cbd5e1" }}>→</span>
                </button>
              ))}
            </div>

            <p style={{ textAlign:"center", fontSize:11, fontWeight:600, color:"#94a3b8", margin:0 }}>
              📍 Report updates the map when confirmed by {REPORT_THRESHOLD}+ users
            </p>
          </div>
        ) : (
          /* Success screen */
          <div style={{ padding:"36px 20px 44px", textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:14 }}>✅</div>
            <h2 style={{
              fontFamily:"'Raleway',sans-serif", fontWeight:900,
              fontSize:24, color:"#1e293b", margin:"0 0 8px",
            }}>Report Submitted!</h2>
            <p style={{ fontSize:13, fontWeight:600, color:"#94a3b8", margin:"0 0 20px" }}>
              Thank you for helping your community stay informed.
            </p>
            <div style={{
              borderRadius:14, padding:"12px 16px",
              fontSize:13, fontWeight:700, color:"#0369a1",
              background:"#e0f2fe", border:"1px solid rgba(6,182,212,0.3)",
            }}>
              🗺️ Map updates when {REPORT_THRESHOLD} user{REPORT_THRESHOLD > 1 ? "s" : ""} confirm{REPORT_THRESHOLD === 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}