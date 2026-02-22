import MapComponent from '../MapComponent';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-24">
      <div style={{ marginBottom:20 }}>
        <h2 style={{
          fontFamily:"'Raleway',sans-serif", fontWeight:900,
          fontSize:"clamp(26px,5vw,36px)", color:"#0f172a",
          letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:4,
        }}>Live Ward Map</h2>
        <p style={{ fontSize:13, fontWeight:700, color:"#94a3b8" }}>
          Click any pin or ward name to see real-time water supply status
        </p>
      </div>
      <MapComponent />
    </div>
  );
}