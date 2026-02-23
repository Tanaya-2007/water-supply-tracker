import { useCityData } from "../useCityData";

/* ── defined inline — no cityData.js needed ── */
const statusConfig = {
  green:        { label:"Water Flowing", color:"#16a34a", bg:"rgba(220,252,231,0.7)", border:"#bbf7d0", dot:"#22c55e" },
  yellow:       { label:"Coming Soon",   color:"#ca8a04", bg:"rgba(254,249,195,0.7)", border:"#fde68a", dot:"#eab308" },
  low_pressure: { label:"Low Pressure",  color:"#ea580c", bg:"rgba(255,237,213,0.7)", border:"#fed7aa", dot:"#f97316" },
  red:          { label:"No Supply",     color:"#dc2626", bg:"rgba(254,226,226,0.7)", border:"#fecaca", dot:"#ef4444" },
};

const trendIcon  = { stable:"→", improving:"↑", worse:"↓" };
const trendColor = { stable:"#0369a1", improving:"#16a34a", worse:"#dc2626" };
const confidenceColor = (c) => c>=85?"#16a34a":c>=65?"#d97706":"#dc2626";

export default function PredictPage({ selectedCity }) {
  const { data: city, loading } = useCityData(selectedCity);
  const predictions = city?.predictions || [];
  const wards       = city?.wards       || [];

  if (!selectedCity) return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  minHeight:"60vh", fontFamily:"'Nunito',sans-serif", textAlign:"center", padding:"20px"}}>
      <div style={{fontSize:56, marginBottom:16}}>🔮</div>
      <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:22, color:"#0f172a", marginBottom:8}}>
        No City Selected
      </h3>
      <p style={{fontSize:14, fontWeight:700, color:"#64748b", maxWidth:280}}>
        Go to the <strong>Map</strong> tab and tap a city to see ML predictions here.
      </p>
    </div>
  );

  if (loading) return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                  minHeight:"60vh", fontFamily:"'Nunito',sans-serif"}}>
      <div style={{fontSize:48, marginBottom:12}}>🔮</div>
      <p style={{fontWeight:800, color:"#6366f1", fontSize:16}}>Loading predictions...</p>
    </div>
  );

  const getWard = (wardName) => wards.find(w => w.name === wardName);

  return (
    <div style={{maxWidth:1280, margin:"0 auto", padding:"20px 16px 100px"}}>

      {/* Header */}
      <div style={{marginBottom:20}}>
        <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:6, flexWrap:"wrap"}}>
          <h2 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                      fontSize:"clamp(22px,5vw,32px)", color:"#0f172a",
                      letterSpacing:"-0.5px", lineHeight:1.1, margin:0}}>
            🔮 Supply Predictions
          </h2>
          <span style={{
            padding:"4px 14px", borderRadius:999, fontSize:11, fontWeight:900,
            background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"white",
            letterSpacing:"0.08em",
          }}>ML POWERED</span>
        </div>
        <p style={{fontSize:13, fontWeight:700, color:"#94a3b8", margin:0}}>
          Next 24hr predictions · {city?.name} · RandomForest model
        </p>
      </div>

      {predictions.length === 0 && (
        <div style={{textAlign:"center", padding:"60px 20px", color:"#94a3b8", fontWeight:700, fontSize:15}}>
          No predictions available yet.
        </div>
      )}

      {/* Prediction cards */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16}}>
        {predictions.map((pred, i) => {
          const ward = getWard(pred.ward);
          const sc   = statusConfig[ward?.status] || statusConfig.green;
          const tc   = trendColor[pred.trend]     || "#0369a1";
          return (
            <div key={i} style={{
              background:"rgba(255,255,255,0.92)", backdropFilter:"blur(20px)",
              border:"1px solid rgba(255,255,255,0.95)",
              borderTop:`3px solid ${tc}`,
              borderRadius:22, padding:"20px",
              boxShadow:"0 4px 24px rgba(6,182,212,0.1)",
            }}>
              {/* Ward name + trend */}
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14}}>
                <div>
                  <h3 style={{fontFamily:"'Raleway',sans-serif", fontWeight:900,
                               fontSize:17, color:"#0f172a", margin:"0 0 4px"}}>
                    {pred.ward}
                  </h3>
                  {ward && (
                    <span style={{
                      padding:"2px 10px", borderRadius:999, fontSize:11, fontWeight:800,
                      background:sc.bg, color:sc.color, border:`1px solid ${sc.border}`,
                    }}>{sc.label}</span>
                  )}
                </div>
                <div style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  padding:"8px 12px", borderRadius:14,
                  background:`${tc}12`, border:`1.5px solid ${tc}30`,
                }}>
                  <span style={{fontSize:20, lineHeight:1}}>{trendIcon[pred.trend] || "→"}</span>
                  <span style={{fontSize:10, fontWeight:800, color:tc, marginTop:3,
                                 textTransform:"capitalize"}}>{pred.trend}</span>
                </div>
              </div>

              {/* Prediction text */}
              <p style={{fontSize:14, fontWeight:800, color:"#0f172a", margin:"0 0 14px", lineHeight:1.4}}>
                {pred.prediction}
              </p>

              {/* Confidence bar */}
              <div style={{marginBottom:10}}>
                <div style={{display:"flex", justifyContent:"space-between", marginBottom:5}}>
                  <span style={{fontSize:11, fontWeight:800, color:"#64748b"}}>Confidence</span>
                  <span style={{fontSize:11, fontWeight:900, color:confidenceColor(pred.confidence)}}>
                    {pred.confidence}%
                  </span>
                </div>
                <div style={{height:6, borderRadius:99, background:"rgba(6,182,212,0.1)"}}>
                  <div style={{
                    height:"100%", borderRadius:99, width:`${pred.confidence}%`,
                    background:`linear-gradient(90deg,${confidenceColor(pred.confidence)},${confidenceColor(pred.confidence)}88)`,
                    transition:"width 1s ease",
                  }}/>
                </div>
              </div>

              {/* Next delay */}
              <div style={{
                display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:12,
                background:"rgba(240,249,255,0.8)", border:"1px solid rgba(6,182,212,0.15)",
              }}>
                <span style={{fontSize:14}}>⏱️</span>
                <span style={{fontSize:12, fontWeight:800, color:"#0369a1"}}>
                  Expected delay: {pred.nextDelay === "None" ? "No delay 🎉" : pred.nextDelay}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}