import { wardData, statusConfig } from "../data";

const trendColor = t=>t==="stable"?"#0ea5e9":t==="improving"?"#16a34a":"#dc2626";
const trendIcon  = t=>t==="stable"?"➡️":t==="improving"?"📈":"📉";
const borderClr  = s=>s==="green"?"#16a34a":s==="yellow"?"#d97706":"#dc2626";

export default function PredictPage(){
  const preds=wardData.map(w=>({...w,
    predictedDelay:w.status==="green"?"On Time":w.status==="yellow"?"~45 mins":"~2–3 hours",
    confidence:w.status==="green"?92:w.status==="yellow"?74:61,
    trend:w.status==="green"?"stable":w.status==="yellow"?"improving":"worsening",
  }));

  return(
    <div style={{maxWidth:1152,margin:"0 auto",padding:"20px 16px 0"}}>

      {/* ── Hero banner — text only, no overflow icon ── */}
      <div className="anim-wave-in" style={{
        position:"relative",overflow:"hidden",
        borderRadius:20,marginBottom:24,
        padding:"24px 24px",
        background:"linear-gradient(135deg,#0369a1,#0ea5e9 55%,#06b6d4)",
        boxShadow:"0 8px 32px rgba(3,105,161,0.3)",
      }}>
        {/* Water photo underlay */}
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1200&q=80')",
          backgroundSize:"cover",backgroundPosition:"center 55%",
          opacity:0.18,
        }}/>
        {/* Content — text only, no icon that could overflow */}
        <div style={{position:"relative",zIndex:1}}>
          <h2 style={{
            fontFamily:"'Raleway',sans-serif",fontWeight:900,
            fontSize:"clamp(20px,4vw,28px)",color:"#fff",
            letterSpacing:"-0.3px",margin:"0 0 6px",
          }}>
            🔮 Supply Predictions
          </h2>
          <p style={{color:"rgba(186,230,253,0.9)",fontWeight:600,fontSize:"clamp(11px,2.5vw,13px)",margin:0}}>
            scikit-learn ML · 30-day ward history · Updated hourly
          </p>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,
            marginTop:12,padding:"5px 14px",borderRadius:999,
            background:"rgba(52,211,153,0.18)",border:"1px solid rgba(52,211,153,0.38)",
          }}>
            <span style={{fontSize:12,fontWeight:900,color:"#34d399",fontFamily:"'Nunito',sans-serif"}}>✨ ML Powered</span>
          </div>
        </div>
      </div>

      {/* ── Section title ── */}
      <h2 style={{
        fontFamily:"'Raleway',sans-serif",fontWeight:900,
        fontSize:"clamp(20px,4vw,28px)",letterSpacing:"-0.4px",
        color:"#0f172a",margin:"0 0 16px",
      }}>Ward Forecasts</h2>

      {/* ── Cards grid ── */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
        gap:14,paddingBottom:100,
      }}>
        {preds.map((w,i)=>{
          const bc=borderClr(w.status);
          return(
            <div key={w.id} className="water-card glass-white anim-wave-in" style={{
              animationDelay:`${i*0.08}s`,
              borderTop:`4px solid ${bc}`,
              borderRadius:20,
              padding:"18px 16px",
              boxShadow:"0 4px 24px rgba(6,182,212,0.09)",
            }}>
              {/* Card top */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,gap:8}}>
                <div style={{minWidth:0}}>
                  <h3 style={{
                    fontFamily:"'Raleway',sans-serif",fontWeight:900,
                    fontSize:"clamp(16px,3vw,20px)",color:"#0f172a",
                    letterSpacing:"-0.3px",margin:"0 0 4px",
                  }}>{w.name}</h3>
                  <p style={{fontSize:11,fontWeight:700,color:"#94a3b8",margin:0}}>{w.zone}</p>
                </div>
                <span style={{
                  display:"inline-flex",alignItems:"center",gap:5,flexShrink:0,
                  padding:"4px 12px",borderRadius:999,
                  fontSize:11,fontWeight:800,
                  background:`${trendColor(w.trend)}12`,
                  border:`1px solid ${trendColor(w.trend)}30`,
                  color:trendColor(w.trend),
                  fontFamily:"'Nunito',sans-serif",
                }}>
                  {trendIcon(w.trend)} {w.trend}
                </span>
              </div>

              {/* Stats row */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
                {[
                  {label:"Predicted",  value:w.predictedDelay, color:bc},
                  {label:"Confidence", value:`${w.confidence}%`},
                  {label:"Tomorrow",   value:w.nextSupply},
                ].map((item,j)=>(
                  <div key={j} style={{
                    borderRadius:12,padding:"10px 6px",
                    background:"rgba(240,249,255,0.9)",
                    border:"1px solid rgba(6,182,212,0.1)",
                    textAlign:"center",
                  }}>
                    <p style={{
                      fontFamily:"'Raleway',sans-serif",fontWeight:900,fontSize:9,
                      textTransform:"uppercase",letterSpacing:"0.08em",
                      color:"#94a3b8",margin:"0 0 4px",
                    }}>{item.label}</p>
                    <p style={{
                      fontWeight:800,fontSize:"clamp(11px,2.5vw,13px)",
                      color:item.color||"#334155",
                      fontFamily:"'Nunito',sans-serif",margin:0,
                    }}>{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Confidence bar */}
              <div style={{height:7,borderRadius:999,overflow:"hidden",background:"rgba(6,182,212,0.1)",marginBottom:5}}>
                <div style={{
                  height:"100%",borderRadius:999,
                  width:`${w.confidence}%`,
                  background:trendColor(w.trend),
                  animation:"bar-fill 1s ease",
                }}/>
              </div>
              <p style={{fontSize:11,fontWeight:700,color:"#94a3b8",textAlign:"right",margin:0}}>
                {w.confidence}% confidence
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}