import { useState } from "react";
import { wardData } from "../data";
import WardCard from "../components/WardCard";
import WardDetailSheet from "../components/WardDetailSheet";
import ReportModal from "../components/ReportModal";

const filters = [
  { key: "all",    label: "All Wards", emoji: "🌐" },
  { key: "green",  label: "Flowing",   emoji: "💧" },
  { key: "yellow", label: "Coming",    emoji: "⏳" },
  { key: "red",    label: "No Supply", emoji: "🚱" },
];

export default function WardsPage() {
  const [selected,   setSelected]  = useState(null);
  const [reportOpen, setReport]    = useState(false);
  const [filter,     setFilter]    = useState("all");
  const filtered = filter === "all" ? wardData : wardData.filter(w => w.status === filter);

  return (
    <div style={{ maxWidth: 1152, margin: "0 auto", padding: "20px 16px 0" }}>

      {/* ── Page header ── */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 20, gap: 12, flexWrap: "wrap",
      }}>
        <div style={{ minWidth: 0 }}>
          <h2 style={{
            fontFamily: "'Raleway',sans-serif", fontWeight: 900,
            fontSize: "clamp(22px,5vw,34px)", letterSpacing: "-0.5px",
            color: "#0f172a", margin: 0, lineHeight: 1.2,
          }}>Ward Status</h2>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginTop: 4 }}>
            {wardData.length} wards · Sangli Municipal Corporation · Live
          </p>
        </div>
        <button onClick={() => setReport(true)} className="ripple" style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "11px 20px", borderRadius: 16,
          background: "linear-gradient(135deg,#0ea5e9,#06b6d4)",
          border: "none", color: "#fff", fontWeight: 800, fontSize: 13,
          cursor: "pointer", flexShrink: 0,
          boxShadow: "0 6px 20px rgba(6,182,212,0.38)",
          fontFamily: "'Nunito',sans-serif", transition: "transform 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          📍 Report Status
        </button>
      </div>

      {/* ── Filter chips — same white glass look always, only border changes ── */}
      <div style={{
        display: "flex", flexDirection: "row", gap: 8,
        marginBottom: 20, overflowX: "auto", paddingBottom: 4,
        msOverflowStyle: "none", scrollbarWidth: "none",
      }}>
        {filters.map(f => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 18px", borderRadius: 999,
                fontSize: 13, fontWeight: 800,
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'Nunito',sans-serif",
                whiteSpace: "nowrap", flexShrink: 0,
                /* always white glass — no bg color change on active */
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(12px)",
                /* only the border changes to show selection */
                border: active
                  ? "2px solid #0ea5e9"
                  : "2px solid rgba(255,255,255,0.95)",
                /* text color stays consistent */
                color: active ? "#0369a1" : "#64748b",
                /* subtle shadow lift on active */
                boxShadow: active
                  ? "0 4px 16px rgba(14,165,233,0.22), 0 1px 0 rgba(255,255,255,0.95) inset"
                  : "0 2px 8px rgba(6,182,212,0.08), 0 1px 0 rgba(255,255,255,0.95) inset",
              }}
            >
              <span style={{ fontSize: 15 }}>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Ward cards grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
        gap: 14, paddingBottom: 100,
      }}>
        {filtered.map((w, i) => (
          <div key={w.id} className="anim-wave-in" style={{ animationDelay: `${i * 0.07}s` }}>
            <WardCard ward={w} onClick={setSelected} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: "1/-1", textAlign: "center",
            padding: "60px 20px", borderRadius: 24,
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(6,182,212,0.15)",
          }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>🔍</span>
            <p style={{ color: "#94a3b8", fontWeight: 700, fontSize: 14 }}>No wards match this filter</p>
          </div>
        )}
      </div>

      {selected   && <WardDetailSheet ward={selected} onClose={() => setSelected(null)} />}
      {reportOpen && <ReportModal onClose={() => setReport(false)} />}
    </div>
  );
}