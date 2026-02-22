import MapComponent from "../MapComponent";

export default function HomePage({ selectedCity, onCityChange }) {
  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"16px 16px 100px" }}>
      <div style={{ marginBottom:14 }}>
        <h2 style={{
          fontFamily:"'Raleway',sans-serif", fontWeight:900,
          fontSize:"clamp(22px,5vw,30px)", color:"#0f172a",
          letterSpacing:"-0.5px", lineHeight:1.1, marginBottom:4,
        }}>Live Supply Map</h2>
        <p style={{ fontSize:13, fontWeight:700, color:"#94a3b8", margin:0 }}>
          Maharashtra water network · Click any city to explore wards
        </p>
      </div>
      <MapComponent selectedCity={selectedCity} onCityChange={onCityChange} />
    </div>
  );
}