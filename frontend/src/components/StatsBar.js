import { wardData } from "../data";

export default function StatsBar() {
  const flowing   = wardData.filter(w => w.status === "green").length;
  const soon      = wardData.filter(w => w.status === "yellow").length;
  const outage    = wardData.filter(w => w.status === "red").length;
  const reporters = wardData.reduce((a, b) => a + b.users, 0);

  const stats = [
    { value: flowing,   label: "Flowing",     sub: "Wards with supply", emoji: "💧", colorA: "#0ea5e9", colorB: "#06b6d4", shadow: "rgba(14,165,233,0.18)", top: "#0ea5e9" },
    { value: soon,      label: "Coming Soon", sub: "Expected shortly",  emoji: "⏳", colorA: "#f59e0b", colorB: "#fbbf24", shadow: "rgba(245,158,11,0.18)",  top: "#f59e0b" },
    { value: outage,    label: "No Supply",   sub: "Active outages",    emoji: "🚱", colorA: "#ef4444", colorB: "#f87171", shadow: "rgba(239,68,68,0.18)",   top: "#ef4444" },
    { value: reporters, label: "Reporters",   sub: "Active citizens",   emoji: "👥", colorA: "#6366f1", colorB: "#818cf8", shadow: "rgba(99,102,241,0.18)",  top: "#6366f1" },
  ];

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 mt-4 mb-2">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="glass-white water-card rounded-2xl p-4 sm:p-5 text-center anim-wave-in cursor-default"
            style={{
              animationDelay: `${i * 0.08}s`,
              boxShadow: `0 6px 24px ${s.shadow}, 0 1px 0 rgba(255,255,255,0.95) inset`,
              borderTop: `3px solid ${s.top}`,
            }}>
            <div className="text-3xl sm:text-4xl mb-2">{s.emoji}</div>
            <div
              className="text-4xl sm:text-5xl font-black mb-1 leading-none"
              style={{
                fontFamily: "'Raleway',sans-serif",
                background: `linear-gradient(135deg,${s.colorA},${s.colorB})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
              {s.value}
            </div>
            <div className="font-extrabold text-slate-700 text-sm sm:text-base mb-0.5"
              style={{ fontFamily: "'Raleway',sans-serif" }}>{s.label}</div>
            <div className="text-xs font-semibold text-slate-400 hidden sm:block">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}