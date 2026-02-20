import { statusConfig } from "../data";
const accColor = n=>n>=80?"#16a34a":n>=60?"#d97706":"#dc2626";
const accLabel = n=>n>=80?"Excellent 🏆":n>=60?"Average ⚠️":"Poor 🚨";
const borderClr = {green:"#16a34a",yellow:"#d97706",red:"#dc2626"};

export default function WardDetailSheet({ ward, onClose }) {
  if(!ward) return null;
  const cfg=statusConfig[ward.status];
  const bc=borderClr[ward.status];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{background:"rgba(3,55,90,0.45)",backdropFilter:"blur(10px)"}} onClick={onClose}>
      <div className="w-full max-w-2xl anim-slide-up no-scroll overflow-y-auto"
        style={{maxHeight:"90vh",background:"white",borderRadius:"36px 36px 0 0",
                boxShadow:"0 -20px 80px rgba(6,182,212,0.22)"}} onClick={e=>e.stopPropagation()}>

        {/* Water photo strip */}
        <div className="relative overflow-hidden" style={{height:150,borderRadius:"36px 36px 0 0",
          background:`linear-gradient(135deg,${bc}CC,${bc}99)`}}>
          <div className="absolute inset-0" style={{
            backgroundImage:"url('https://images.unsplash.com/photo-1559825481-12a05cc00344?w=800&q=70')",
            backgroundSize:"cover",backgroundPosition:"center 65%",opacity:0.38}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(180deg,transparent 25%,white 100%)"}}/>
          <div className="absolute bottom-4 left-7 right-7 flex justify-between items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black px-3 py-1.5 rounded-full mb-2"
                style={{background:"rgba(255,255,255,0.92)",color:bc,fontFamily:"'Nunito',sans-serif"}}>
                <span className="w-2 h-2 rounded-full inline-block" style={{background:bc}}/>{cfg.label}
              </span>
              <h2 className="text-3xl font-black text-white drop-shadow-lg"
                style={{fontFamily:"'Raleway',sans-serif",textShadow:"0 2px 16px rgba(0,0,0,0.25)",letterSpacing:"-0.4px"}}>
                {ward.name}
              </h2>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/85 flex items-center justify-center text-slate-500 text-sm hover:scale-110 transition-transform"
              style={{border:"1px solid rgba(255,255,255,0.9)",boxShadow:"0 2px 8px rgba(0,0,0,0.12)"}}>✕</button>
          </div>
        </div>

        <div className="px-7 pt-3 pb-3 border-b border-sky-50">
          <p className="text-sm font-bold text-slate-400">{ward.zone} · Sangli Municipal Corporation</p>
        </div>

        {/* Accuracy Hero */}
        <div className="mx-5 my-5 rounded-3xl p-6"
          style={{background:"linear-gradient(135deg,#f0f9ff,#e0f2fe)",border:"1px solid rgba(6,182,212,0.15)"}}>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5"
            style={{fontFamily:"'Raleway',sans-serif"}}>📊 Municipal Accuracy Score</p>
          <div className="flex items-center gap-6 mb-5">
            <div className="font-black leading-none"
              style={{fontFamily:"'Raleway',sans-serif",fontSize:72,color:accColor(ward.accuracy)}}>
              {ward.accuracy}%
            </div>
            <div>
              <div className="text-base font-black mb-2" style={{color:accColor(ward.accuracy),fontFamily:"'Raleway',sans-serif"}}>
                {accLabel(ward.accuracy)}
              </div>
              <p className="text-sm font-semibold text-slate-500 leading-relaxed">
                Met schedule <strong className="text-slate-700 font-extrabold">{Math.round(ward.accuracy/14.3)} of last 7 days</strong>
              </p>
            </div>
          </div>
          <div className="h-3 rounded-full overflow-hidden mb-2" style={{background:"rgba(6,182,212,0.1)"}}>
            <div className="h-full rounded-full" style={{width:`${ward.accuracy}%`,background:accColor(ward.accuracy),animation:"bar-fill 1.2s ease"}}/>
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="px-5 grid grid-cols-2 gap-3 mb-5">
          {[
            {icon:"🕐",label:"Next Supply",value:ward.nextSupply},
            {icon:"⚡",label:"Delay",value:ward.delay,color:bc},
            {icon:"👥",label:"Reports",value:`${ward.users} citizens`},
            {icon:"📍",label:"Zone",value:ward.zone},
          ].map((t,i)=>(
            <div key={i} className="rounded-2xl p-4" style={{background:"#f0f9ff",border:"1px solid rgba(6,182,212,0.12)"}}>
              <span className="text-xl block mb-2">{t.icon}</span>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wide mb-1"
                style={{fontFamily:"'Raleway',sans-serif",letterSpacing:"0.08em"}}>{t.label}</p>
              <p className="font-extrabold text-slate-800"
                style={{color:t.color,fontFamily:"'Raleway',sans-serif",fontSize:16}}>{t.value}</p>
            </div>
          ))}
        </div>

        <div className="px-5 pb-10">
          <button className="w-full py-4 rounded-2xl font-black text-white text-base ripple"
            style={{background:"linear-gradient(135deg,#0ea5e9,#06b6d4)",
                    boxShadow:"0 8px 24px rgba(6,182,212,0.4)",fontFamily:"'Nunito',sans-serif"}}>
            🔔 Set Reminder for Next Supply
          </button>
        </div>
      </div>
    </div>
  );
}