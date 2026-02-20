const tabs=[
  {id:"home",icon:"🗺️",label:"Map"},
  {id:"wards",icon:"🏘️",label:"Wards"},
  {id:"predict",icon:"🔮",label:"Predict"},
  {id:"alerts",icon:"🔔",label:"Alerts"},
];

export default function Footer({activeTab,setActiveTab}){
  return(
    <nav className="fixed bottom-0 left-0 w-full z-50"
      style={{background:"rgba(255,255,255,0.93)",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
              borderTop:"1px solid rgba(6,182,212,0.15)",boxShadow:"0 -4px 30px rgba(6,182,212,0.1)"}}>
      <div className="max-w-3xl mx-auto flex justify-around py-3 pb-5">
        {tabs.map(tab=>{
          const active=activeTab===tab.id;
          return(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1.5 px-6 py-2 rounded-2xl relative transition-all duration-300"
              style={{background:active?"rgba(6,182,212,0.08)":"transparent",
                      border:active?"1px solid rgba(6,182,212,0.18)":"1px solid transparent"}}>
              {active&&<span className="absolute -top-px left-1/2 h-0.5 rounded-b-full anim-nav-grow"
                style={{transform:"translateX(-50%)",background:"linear-gradient(90deg,#0ea5e9,#06b6d4)"}}/>}
              <span className={`text-2xl transition-transform duration-300 ${active?"scale-110":""}`}>{tab.icon}</span>
              <span className="text-xs font-extrabold tracking-wide"
                style={{color:active?"#0ea5e9":"#94a3b8",fontFamily:"'Nunito',sans-serif"}}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}