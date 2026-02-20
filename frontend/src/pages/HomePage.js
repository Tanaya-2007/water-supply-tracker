export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl anim-wave-in" style={{ minHeight: 380 }}>
        <div className="absolute inset-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')",
            backgroundSize: "cover", backgroundPosition: "center",
          }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(3,105,161,0.3),rgba(6,182,212,0.6))" }} />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[380px] text-center px-6 sm:px-12">
          <div className="text-6xl sm:text-8xl mb-5">🗺️</div>
          <h2 className="font-black text-white mb-3 drop-shadow-lg"
            style={{ fontFamily:"'Raleway',sans-serif", fontSize:"clamp(24px,6vw,40px)", letterSpacing:"-0.5px", textShadow:"0 2px 20px rgba(0,0,0,0.2)" }}>
            Live Map Coming Soon
          </h2>
          <p className="font-semibold text-sky-100 text-sm sm:text-base max-w-md leading-relaxed">
            Google Maps with real-time color-coded ward zones, supply overlays & citizen clustering
          </p>
        </div>
      </div>
    </div>
  );
}