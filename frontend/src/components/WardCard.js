import { statusConfig } from "../data";

const accColor = n => n>=80?"#16a34a":n>=60?"#d97706":"#dc2626";
const stStyle = {
  green:  {border:"#16a34a",bg:"rgba(220,252,231,0.55)",badge:"text-emerald-700 bg-emerald-50 border-emerald-200"},
  yellow: {border:"#d97706",bg:"rgba(254,243,199,0.55)",badge:"text-amber-700 bg-amber-50 border-amber-200"},
  red:    {border:"#dc2626",bg:"rgba(254,226,226,0.55)",badge:"text-red-700 bg-red-50 border-red-200"},
};

export default function WardCard({ ward, onClick }) {
  const cfg = statusConfig[ward.status];
  const st  = stStyle[ward.status];
  const r   = 29, circ = 2*Math.PI*r;

  return (
    <div onClick={()=>onClick(ward)}
      className="water-card glass-white rounded-3xl overflow-hidden cursor-pointer"
      style={{borderTop:`4px solid ${st.border}`,
              boxShadow:`0 4px 24px rgba(6,182,212,0.09),0 1px 0 rgba(255,255,255,0.95) inset`}}>
      <div className="p-5">
        {/* Top row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border mb-3 ${st.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{background:st.border}}/>
              {cfg.label}
            </span>
            <h3 className="font-black text-slate-800 leading-tight mb-1"
              style={{fontFamily:"'Raleway',sans-serif",fontSize:"20px",letterSpacing:"-0.3px"}}>
              {ward.name}
            </h3>
            <p className="text-xs font-bold text-slate-400 tracking-wide">{ward.zone} · SMC</p>
          </div>
          {/* Donut */}
          <div className="relative flex-shrink-0" style={{width:68,height:68}}>
            <svg width="68" height="68" viewBox="0 0 68 68">
              <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(6,182,212,0.12)" strokeWidth="6"/>
              <circle cx="34" cy="34" r={r} fill="none"
                stroke={accColor(ward.accuracy)} strokeWidth="6"
                strokeDasharray={`${(ward.accuracy/100)*circ} ${circ}`}
                strokeLinecap="round" transform="rotate(-90 34 34)"
                style={{transition:"stroke-dasharray 1.2s ease"}}/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-black text-xs leading-none"
                style={{color:accColor(ward.accuracy),fontFamily:"'Raleway',sans-serif"}}>
                {ward.accuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Info rows */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{background:"rgba(240,249,255,0.9)",border:"1px solid rgba(6,182,212,0.12)"}}>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-2">🕐 Next Supply</span>
            <span className="text-xs font-extrabold text-slate-700">{ward.nextSupply}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{background:st.bg,border:`1px solid ${st.border}22`}}>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-2">⚡ Status</span>
            <span className="text-xs font-extrabold" style={{color:st.border}}>{ward.delay}</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{background:"rgba(240,249,255,0.9)",border:"1px solid rgba(6,182,212,0.12)"}}>
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-2">👥 Reports</span>
            <span className="text-xs font-extrabold text-slate-700">{ward.users} active</span>
          </div>
        </div>
        <p className="text-right text-xs font-bold mt-3" style={{color:"rgba(6,182,212,0.65)"}}>
          Tap for details →
        </p>
      </div>
    </div>
  );
}