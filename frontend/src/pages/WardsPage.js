import { useState } from "react";
import { useCityData } from "../useCityData";
import WardCard       from "../components/WardCard";
import WardDetailSheet from "../components/WardDetailSheet";
import ReportModal    from "../components/ReportModal";

export default function WardsPage({ selectedCity }) {
  const { data: city, loading } = useCityData(selectedCity);
  const wards = city?.wards || [];
  const [filter,       setFilter]       = useState("all");
  const [selectedWard, setSelectedWard] = useState(null);
  const [reportWard,   setReportWard]   = useState(null);

  if (!selectedCity) return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  minHeight:"60vh", fontFamily:"'Nunito',sans-serif", textAlign:"center", padding:"20px"}}>
      <div style={{fontSize:56, marginBottom:16}}>🗺️</div>
      <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:22, color:"#0f172a", marginBottom:8}}>
        No City Selected
      </h3>
      <p style={{fontSize:14, fontWeight:700, color:"#64748b", maxWidth:280}}>
        Go to the <strong>Map</strong> tab and tap Sangli, Pune or Nashik to see ward-level water supply status here.
      </p>
    </div>
  );


  const filters = [
    { key:"all",    label:"All Wards" },
    { key:"green",  label:"💧 Flowing" },
    { key:"yellow", label:"⏳ Coming Soon" },
    { key:"red",    label:"🚱 No Supply" },
  ];

  const filtered = filter === "all" ? wards : wards.filter(w => w.status === filter);

  return (
    <div style={{maxWidth:1280, margin:"0 auto", padding:"20px 16px 100px"}}>

      {/* City label */}
      <div style={{marginBottom:16}}>
        <h2 style={{
          fontFamily:"'Raleway',sans-serif", fontWeight:900,
          fontSize:"clamp(22px,5vw,32px)", color:"#0f172a",
          letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:4,
        }}>Ward Status</h2>
        <p style={{fontSize:13, fontWeight:700, color:"#94a3b8", margin:0}}>
          {wards.length} wards · {city?.name} · Live
        </p>
      </div>

      {/* Filter chips */}
      <div style={{
        display:"flex", gap:10, overflowX:"auto", paddingBottom:4,
        scrollbarWidth:"none", marginBottom:20,
      }}>
        {filters.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding:"10px 20px", borderRadius:999, whiteSpace:"nowrap",
            flexShrink:0, border:"none", cursor:"pointer",
            fontFamily:"'Nunito',sans-serif", fontWeight:800, fontSize:13,
            background: filter===f.key ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)",
            color:       filter===f.key ? "#0369a1" : "#64748b",
            outline:     filter===f.key ? "1.5px solid rgba(6,182,212,0.5)" : "1.5px solid transparent",
            boxShadow:   filter===f.key ? "0 4px 12px rgba(6,182,212,0.2)" : "none",
            transition:"all 0.2s ease",
          }}>{f.label}</button>
        ))}
      </div>

      {/* Ward grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
        gap:16,
      }}>
        {filtered.map(ward => (
          <WardCard
            key={ward.id}
            ward={ward}
            onClick={() => setSelectedWard(ward)}
            onReport={() => setReportWard(ward)}
          />
        ))}
      </div>

      {selectedWard && (
        <WardDetailSheet ward={selectedWard} onClose={() => setSelectedWard(null)} onReport={() => { setReportWard(selectedWard); setSelectedWard(null); }}/>
      )}
      {reportWard && (
        <ReportModal ward={reportWard} cityKey={selectedCity} allWards={wards} onClose={() => setReportWard(null)}/>
      )}
    </div>
  );
}