import MapComponent from "../MapComponent";

export default function HomePage() {
  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"16px 12px 100px" }}>
      <div style={{ marginBottom:14 }}>
        <h2 style={{
          fontFamily:"'Raleway',sans-serif", fontWeight:900,
          fontSize:"clamp(20px,5vw,30px)", letterSpacing:"-0.5px",
          color:"#0f172a", margin:"0 0 4px", lineHeight:1.2,
        }}>Live Supply Map</h2>
        <p style={{ fontSize:"clamp(10px,2.5vw,12px)", fontWeight:700, color:"#475569", margin:0 }}>
          Maharashtra water network · Click any district to explore wards
        </p>
      </div>
      <MapComponent />
    </div>
  );
}