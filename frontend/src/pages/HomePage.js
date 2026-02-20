export default function HomePage(){
  return(
    <div className="max-w-7xl mx-auto px-8 pt-6">
      <div className="relative overflow-hidden rounded-3xl anim-wave-in" style={{minHeight:420}}>
        <div className="absolute inset-0" style={{
          backgroundImage:"url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')",
          backgroundSize:"cover",backgroundPosition:"center"}}/>
        <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(3,105,161,0.3),rgba(6,182,212,0.55)"}}/>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[420px] text-center px-8">
          <div className="text-8xl mb-6">🗺️</div>
          <h2 className="font-black text-white mb-3 drop-shadow-lg"
            style={{fontFamily:"'Raleway',sans-serif",fontSize:40,letterSpacing:"-0.5px",textShadow:"0 2px 24px rgba(0,0,0,0.2)"}}>
            Live Map Coming Soon
          </h2>
          <p className="font-semibold text-sky-100 text-base max-w-lg leading-relaxed">
            Google Maps with real-time color-coded ward zones, supply overlays & citizen clustering
          </p>
        </div>
      </div>
    </div>
  );
}