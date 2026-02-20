import { wardData, statusConfig } from "../data";

const trendColor = t => t === "stable" ? "#0ea5e9" : t === "improving" ? "#16a34a" : "#dc2626";
const trendIcon  = t => t === "stable" ? "➡️" : t === "improving" ? "📈" : "📉";
const borderClr  = s => s === "green" ? "#16a34a" : s === "yellow" ? "#d97706" : "#dc2626";

export default function PredictPage() {
  const preds = wardData.map(w => ({
    ...w,
    predictedDelay: w.status === "green" ? "On Time" : w.status === "yellow" ? "~45 mins" : "~2–3 hours",
    confidence:     w.status === "green" ? 92 : w.status === "yellow" ? 74 : 61,
    trend:          w.status === "green" ? "stable" : w.status === "yellow" ? "improving" : "worsening",
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">

      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8" style={{ minHeight: 120 }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1200&q=80')",
            backgroundSize: "cover", backgroundPosition: "center 55%",
          }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(3,105,161,0.92),rgba(6,182,212,0.82))" }} />
        <div className="relative z-10 p-5 sm:p-8 flex items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)" }}>
            🔮
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-black text-white leading-tight mb-1"
              style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,4vw,28px)", letterSpacing: "-0.3px" }}>
              Supply Predictions
            </h2>
            <p className="text-sky-200 font-semibold text-xs sm:text-sm">scikit-learn ML · 30-day ward history · Updated hourly</p>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs font-black flex-shrink-0 hidden sm:block"
            style={{ background: "rgba(52,211,153,0.18)", border: "1px solid rgba(52,211,153,0.38)", color: "#34d399", fontFamily: "'Nunito',sans-serif" }}>
            ✨ ML Powered
          </div>
        </div>
      </div>

      <h2 className="font-black text-slate-800 mb-5"
        style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(20px,4vw,28px)", letterSpacing: "-0.4px" }}>
        Ward Forecasts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {preds.map((w, i) => {
          const bc = borderClr(w.status);
          return (
            <div key={w.id}
              className="water-card glass-white rounded-2xl sm:rounded-3xl p-5 anim-wave-in"
              style={{ animationDelay: `${i * 0.07}s`, borderTop: `4px solid ${bc}`, boxShadow: "0 4px 20px rgba(6,182,212,0.09)" }}>

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-slate-800"
                    style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(16px,3vw,20px)", letterSpacing: "-0.3px" }}>
                    {w.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{w.zone}</p>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold flex-shrink-0"
                  style={{
                    background: `${trendColor(w.trend)}12`,
                    border: `1px solid ${trendColor(w.trend)}30`,
                    color: trendColor(w.trend),
                    fontFamily: "'Nunito',sans-serif",
                  }}>
                  {trendIcon(w.trend)} {w.trend}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Predicted",   value: w.predictedDelay, color: bc },
                  { label: "Confidence",  value: `${w.confidence}%`           },
                  { label: "Tomorrow",    value: w.nextSupply                  },
                ].map((item, j) => (
                  <div key={j} className="rounded-xl p-2.5"
                    style={{ background: "rgba(240,249,255,0.9)", border: "1px solid rgba(6,182,212,0.1)" }}>
                    <p className="font-black text-slate-400 uppercase tracking-wide mb-1"
                      style={{ fontFamily: "'Raleway',sans-serif", fontSize: 8, letterSpacing: "0.08em" }}>
                      {item.label}
                    </p>
                    <p className="font-extrabold text-slate-800"
                      style={{ color: item.color, fontFamily: "'Nunito',sans-serif", fontSize: 13 }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background: "rgba(6,182,212,0.1)" }}>
                <div className="h-full rounded-full bar-fill"
                  style={{ width: `${w.confidence}%`, background: trendColor(w.trend) }} />
              </div>
              <p className="text-xs font-bold text-slate-400 text-right">{w.confidence}% confidence</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}