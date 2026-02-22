const tabs = [
  { id: "home",    icon: "🗺️", label: "Map"     },
  { id: "wards",   icon: "🏘️", label: "Wards"   },
  { id: "predict", icon: "🔮", label: "Predict" },
  { id: "alerts",  icon: "🔔", label: "Alerts"  },
];

export default function Footer({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 w-full"
      style={{
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 -4px 24px rgba(6,182,212,0.12)",
        borderTop: "1px solid rgba(6,182,212,0.15)",
        zIndex:9999
      }}>
      <div className="max-w-lg mx-auto flex justify-around items-center px-2 py-1">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl relative transition-all duration-300"
              style={{
                background: active ? "rgba(6,182,212,0.08)" : "transparent",
                border: active ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
              }}>
              {/* Active top bar */}
              {active && (
                <span className="absolute -top-px left-1/2 h-0.5 rounded-b-full anim-nav-grow"
                  style={{ transform: "translateX(-50%)", background: "linear-gradient(90deg,#0ea5e9,#06b6d4)", width: 32 }} />
              )}
              <span className={`text-xl transition-transform duration-300 ${active ? "scale-110" : "scale-100"}`}>
                {tab.icon}
              </span>
              <span className="text-xs font-extrabold tracking-wide"
                style={{
                  color: active ? "#0369a1" : "#94a3b8",
                  fontFamily: "'Nunito',sans-serif",
                  fontSize: 10,
                }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}