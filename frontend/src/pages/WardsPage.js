import { useState } from "react";
import { wardData } from "../data";
import WardCard from "../components/WardCard";
import WardDetailSheet from "../components/WardDetailSheet";
import ReportModal from "../components/ReportModal";

const filters = [
  { key: "all",    label: "All Wards"    },
  { key: "green",  label: "💧 Flowing"   },
  { key: "yellow", label: "⏳ Coming"    },
  { key: "red",    label: "🚱 No Supply" },
];

export default function WardsPage() {
  const [selected,    setSelected]    = useState(null);
  const [reportOpen,  setReport]      = useState(false);
  const [filter,      setFilter]      = useState("all");
  const filtered = filter === "all" ? wardData : wardData.filter(w => w.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="font-black text-slate-800 leading-tight"
            style={{ fontFamily: "'Raleway',sans-serif", fontSize: "clamp(24px,5vw,34px)", letterSpacing: "-0.5px" }}>
            Ward Status
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">
            {wardData.length} wards · Sangli Municipal Corporation · Live
          </p>
        </div>
        <button
          onClick={() => setReport(true)}
          className="ripple self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm text-white hover:-translate-y-1 transition-all"
          style={{
            background: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
            boxShadow: "0 6px 20px rgba(6,182,212,0.35)",
            fontFamily: "'Nunito',sans-serif",
          }}>
          📍 Report Status
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200"
              style={{
                fontFamily: "'Nunito',sans-serif",
                background: active ? "rgba(6,182,212,0.12)" : "white",
                border: active ? "1.5px solid rgba(6,182,212,0.55)" : "1.5px solid #e2e8f0",
                color: active ? "#0369a1" : "#64748b",
                boxShadow: active ? "0 0 0 3px rgba(6,182,212,0.09)" : "0 1px 3px rgba(0,0,0,0.05)",
                transform: active ? "scale(1.04)" : "scale(1)",
              }}>
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
        {filtered.map((w, i) => (
          <div key={w.id} className="anim-wave-in" style={{ animationDelay: `${i * 0.06}s` }}>
            <WardCard ward={w} onClick={setSelected} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 rounded-3xl glass-white">
            <span className="text-5xl block mb-3">🔍</span>
            <p className="text-slate-400 font-bold">No wards match this filter</p>
          </div>
        )}
      </div>

      {selected    && <WardDetailSheet ward={selected} onClose={() => setSelected(null)} />}
      {reportOpen  && <ReportModal onClose={() => setReport(false)} />}
    </div>
  );
}