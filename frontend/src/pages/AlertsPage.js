const alertsData = [
  { id:1, ward:"Miraj",       type:"outage",   msg:"Water supply disrupted due to pump failure at Zone B pumping station",  time:"2 hrs ago", icon:"🚨" },
  { id:2, ward:"Wanlesswadi", type:"outage",   msg:"No supply expected until 9:00 AM tomorrow due to pipeline repair work", time:"3 hrs ago", icon:"🚨" },
  { id:3, ward:"Sangli",      type:"delay",    msg:"Supply delayed by 45 minutes due to increased demand in Zone A",        time:"4 hrs ago", icon:"⚠️" },
  { id:4, ward:"Gaokiwadi",   type:"delay",    msg:"Low pressure reported by 9 residents — maintenance crew dispatched",    time:"5 hrs ago", icon:"⚠️" },
  { id:5, ward:"Vishrambag",  type:"restored", msg:"Water supply fully restored after 2-hour emergency maintenance work",   time:"6 hrs ago", icon:"✅" },
  { id:6, ward:"Kupwad",      type:"info",     msg:"Supply schedule updated for next week — no disruptions expected",       time:"1 day ago", icon:"ℹ️" },
];

const S = {
  outage:   { color:"#dc2626", bg:"#fff5f5",  border:"#fecaca" },
  delay:    { color:"#d97706", bg:"#fffbeb",  border:"#fde68a" },
  restored: { color:"#16a34a", bg:"#f0fdf4",  border:"#bbf7d0" },
  info:     { color:"#0ea5e9", bg:"#f0f9ff",  border:"#bae6fd" },
};

export default function AlertsPage() {
  const outages  = alertsData.filter(a => a.type === "outage").length;
  const delays   = alertsData.filter(a => a.type === "delay").length;
  const restored = alertsData.filter(a => a.type === "restored").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="font-black text-slate-800"
            style={{ fontFamily:"'Raleway',sans-serif", fontSize:"clamp(24px,5vw,34px)", letterSpacing:"-0.5px" }}>
            Alerts & Updates
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1">Real-time ward alerts · Auto-refreshed every 30s</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto"
          style={{ background:"#fff5f5", border:"1.5px solid #fecaca" }}>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-xs font-black text-red-600" style={{ fontFamily:"'Nunito',sans-serif" }}>
            {alertsData.length} Active
          </span>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-8">
        {[
          { label:"Outages",  count:outages,  icon:"🚨", ...S.outage  },
          { label:"Delays",   count:delays,   icon:"⚠️", ...S.delay   },
          { label:"Restored", count:restored, icon:"✅", ...S.restored },
        ].map((s, i) => (
          <div key={i}
            className="water-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center anim-wave-in"
            style={{ animationDelay:`${i*0.1}s`, background:s.bg, border:`2px solid ${s.border}`, boxShadow:`0 6px 24px ${s.color}18` }}>
            <div className="text-2xl sm:text-4xl mb-2">{s.icon}</div>
            <div className="font-black leading-none mb-1"
              style={{ fontFamily:"'Raleway',sans-serif", fontSize:"clamp(28px,6vw,48px)", color:s.color }}>
              {s.count}
            </div>
            <div className="font-extrabold text-xs sm:text-sm" style={{ color:s.color, fontFamily:"'Nunito',sans-serif" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Live feed label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse inline-block" />
        <h3 className="text-sm font-extrabold text-slate-400 tracking-wide" style={{ fontFamily:"'Nunito',sans-serif" }}>
          Live Alert Feed
        </h3>
      </div>

      {/* Alert list */}
      <div className="flex flex-col gap-3">
        {alertsData.map((alert, i) => {
          const s = S[alert.type];
          return (
            <div key={alert.id}
              className="anim-wave-in glass-white rounded-2xl p-4 sm:p-5 flex gap-4 items-start hover:translate-x-1 transition-all duration-300"
              style={{ animationDelay:`${i*0.06}s`, borderLeft:`4px solid ${s.color}`, boxShadow:`0 3px 16px ${s.color}12` }}>
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background:s.bg, border:`1.5px solid ${s.border}` }}>
                {alert.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-black text-slate-800 text-sm sm:text-base" style={{ fontFamily:"'Raleway',sans-serif" }}>
                    {alert.ward}
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex-shrink-0 ml-2">{alert.time}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed mb-2">{alert.msg}</p>
                <span className="inline-block text-xs font-extrabold px-3 py-1 rounded-full"
                  style={{ background:s.bg, border:`1.5px solid ${s.border}`, color:s.color, fontFamily:"'Nunito',sans-serif" }}>
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}