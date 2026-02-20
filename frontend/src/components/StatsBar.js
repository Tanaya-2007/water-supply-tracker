import { wardData } from "../data";

export default function StatsBar() {
  const flowing   = wardData.filter(w => w.status === "green").length;
  const soon      = wardData.filter(w => w.status === "yellow").length;
  const outage    = wardData.filter(w => w.status === "red").length;
  const reporters = wardData.reduce((a, b) => a + b.users, 0);

  const stats = [
    { value: flowing,   label: "Flowing",     sub: "Wards with supply",  emoji: "💧", colorA: "#0ea5e9", colorB: "#06b6d4", shadow: "rgba(14,165,233,0.18)" },
    { value: soon,      label: "Coming Soon",  sub: "Expected shortly",   emoji: "⏳", colorA: "#f59e0b", colorB: "#fbbf24", shadow: "rgba(245,158,11,0.18)"  },
    { value: outage,    label: "No Supply",    sub: "Active outages",     emoji: "🚱", colorA: "#ef4444", colorB: "#f87171", shadow: "rgba(239,68,68,0.18)"   },
    { value: reporters, label: "Reporters",    sub: "Active citizens",    emoji: "👥", colorA: "#6366f1", colorB: "#818cf8", shadow: "rgba(99,102,241,0.18)"  },
  ];

  return (
    <section style={{ padding: "20px 16px 16px", width: "100%", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* 
          Responsive grid:
          • ≥640px  → 4 columns
          • <640px  → 2 columns  (via inline media-query trick using CSS custom property)
          We use a simple CSS class defined in App.css for this.
        */}
        <div className="stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",   /* overridden to 2 on mobile via .stats-grid */
          gap: 12,
          width: "100%",
        }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass-white water-card ripple anim-wave-in"
              style={{
                animationDelay: `${i * 0.09}s`,
                borderRadius: 20,
                padding: "18px 12px",
                textAlign: "center",
                cursor: "default",
                borderTop: `3px solid ${s.colorA}`,
                boxShadow: `0 6px 28px ${s.shadow}, 0 1px 0 rgba(255,255,255,0.95) inset`,
                minWidth: 0,          /* prevent overflow */
                overflow: "hidden",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 900, lineHeight: 1, marginBottom: 6,
                background: `linear-gradient(135deg, ${s.colorA}, ${s.colorB})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(12px, 2vw, 15px)",
                fontWeight: 800, color: "#1e293b", marginBottom: 4,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {s.label}
              </div>
              <div style={{
                fontSize: "clamp(9px, 1.5vw, 11px)",
                fontWeight: 600, color: "#94a3b8",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}