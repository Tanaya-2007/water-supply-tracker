import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { wardData } from './data';

// Status colors for markers
const statusColor = {
  green:  "#16a34a",
  yellow: "#d97706",
  red:    "#dc2626",
};

const statusLabel = {
  green:  "Water Flowing",
  yellow: "Coming Soon",
  red:    "No Supply",
};

// Default center — Sangli-Miraj-Kupwad area
const DEFAULT_CENTER = { lat: 16.8524, lng: 74.5815 };
const DEFAULT_ZOOM   = 13;

// Ward base coordinates for SMC area
// These are real approximate coords for each ward
const wardCoordinates = {
  "Vishrambag":  { lat: 16.8524, lng: 74.5815 },
  "Miraj":       { lat: 16.8230, lng: 74.6450 },
  "Sangli Camp": { lat: 16.8667, lng: 74.5667 },
  "Gaokiwadi":   { lat: 16.8450, lng: 74.5950 },
  "Wanlesswadi": { lat: 16.8350, lng: 74.6100 },
  "Kupwad":      { lat: 16.8750, lng: 74.6200 },
};

export default function MapComponent() {
  const [selectedWard,  setSelectedWard]  = useState(null);
  const [mapCenter,     setMapCenter]     = useState(DEFAULT_CENTER);
  const [mapZoom,       setMapZoom]       = useState(DEFAULT_ZOOM);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [activeFilter,  setActiveFilter]  = useState("all");

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Filter wards based on active status filter
  const filteredWards = wardData.filter(w =>
    activeFilter === "all" ? true : w.status === activeFilter
  );

  // When user clicks a ward from the sidebar list — pan map to it
  const focusWard = (ward) => {
    const coords = wardCoordinates[ward.name];
    if (coords) {
      setMapCenter(coords);
      setMapZoom(15);
      setSelectedWard(ward);
    }
  };

  if (!apiKey) {
    return (
      <div style={{
        height: 500, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "rgba(240,249,255,0.9)", borderRadius: 24,
        border: "2px dashed rgba(6,182,212,0.3)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:800,
                    fontSize:18, color:"#0369a1", marginBottom:8 }}>
          Google Maps API Key Missing!
        </p>
        <p style={{ fontSize:13, color:"#64748b", fontWeight:600, textAlign:"center", padding:"0 24px" }}>
          Add <code style={{background:"#e0f2fe",padding:"2px 6px",borderRadius:4}}>REACT_APP_GOOGLE_MAPS_API_KEY</code> to your <code style={{background:"#e0f2fe",padding:"2px 6px",borderRadius:4}}>.env</code> file in the frontend folder
        </p>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", gap:16, flexDirection:"column" }}>

      {/* Filter bar */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:13, fontWeight:800, color:"#475569",
                       fontFamily:"'Raleway',sans-serif" }}>Filter:</span>
        {[
          { key:"all",    label:"All Wards" },
          { key:"green",  label:"💧 Flowing" },
          { key:"yellow", label:"⏳ Coming Soon" },
          { key:"red",    label:"🚱 No Supply" },
        ].map(f => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)} style={{
            padding:"8px 18px", borderRadius:999, fontSize:12, fontWeight:800,
            cursor:"pointer", border:"none", fontFamily:"'Nunito',sans-serif",
            background: activeFilter===f.key ? "rgba(6,182,212,0.15)" : "white",
            color: activeFilter===f.key ? "#0369a1" : "#64748b",
            outline: activeFilter===f.key ? "1.5px solid rgba(6,182,212,0.5)" : "1.5px solid #e2e8f0",
            transition:"all 0.2s ease",
          }}>
            {f.label}
          </button>
        ))}

        {/* Reset view button */}
        <button onClick={() => { setMapCenter(DEFAULT_CENTER); setMapZoom(DEFAULT_ZOOM); setSelectedWard(null); }}
          style={{
            padding:"8px 18px", borderRadius:999, fontSize:12, fontWeight:800,
            cursor:"pointer", border:"none", fontFamily:"'Nunito',sans-serif",
            background:"linear-gradient(135deg,#0ea5e9,#06b6d4)", color:"white",
            marginLeft:"auto",
          }}>
          🎯 Reset View
        </button>
      </div>

      {/* Map + Sidebar layout */}
      <div style={{ display:"flex", gap:16 }}>

        {/* Map */}
        <div style={{ flex:1, borderRadius:24, overflow:"hidden",
                      boxShadow:"0 8px 32px rgba(6,182,212,0.15)", minHeight:480 }}>
          <APIProvider apiKey={apiKey}>
            <Map
              center={mapCenter}
              zoom={mapZoom}
              onCenterChanged={e => setMapCenter(e.detail.center)}
              onZoomChanged={e  => setMapZoom(e.detail.zoom)}
              gestureHandling="greedy"
              disableDefaultUI={false}
              style={{ width:"100%", height:480 }}
            >
              {filteredWards.map(ward => {
                const coords = wardCoordinates[ward.name];
                if (!coords) return null;
                return (
                  <Marker
                    key={ward.id}
                    position={coords}
                    title={ward.name}
                    onClick={() => {
                      setSelectedWard(ward);
                      setMapCenter(coords);
                      setMapZoom(15);
                    }}
                  />
                );
              })}

              {selectedWard && wardCoordinates[selectedWard.name] && (
                <InfoWindow
                  position={wardCoordinates[selectedWard.name]}
                  onCloseClick={() => setSelectedWard(null)}
                >
                  <div style={{ padding:"6px 2px", minWidth:160,
                                fontFamily:"'Nunito',sans-serif" }}>
                    <h3 style={{ fontFamily:"'Raleway',sans-serif", fontWeight:900,
                                 fontSize:15, color:"#0f172a", marginBottom:6 }}>
                      {selectedWard.name}
                    </h3>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                      <span style={{ width:10, height:10, borderRadius:"50%", display:"inline-block",
                                     background:statusColor[selectedWard.status] }}/>
                      <span style={{ fontSize:12, fontWeight:800,
                                     color:statusColor[selectedWard.status] }}>
                        {statusLabel[selectedWard.status]}
                      </span>
                    </div>
                    {[
                      { icon:"🕐", text:`Next: ${selectedWard.nextSupply}` },
                      { icon:"⚡", text:selectedWard.delay },
                      { icon:"📊", text:`Accuracy: ${selectedWard.accuracy}%` },
                      { icon:"👥", text:`${selectedWard.users} reporters` },
                    ].map((row,i) => (
                      <p key={i} style={{ fontSize:12, color:"#475569",
                                          fontWeight:600, margin:"3px 0" }}>
                        {row.icon} {row.text}
                      </p>
                    ))}
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>

        {/* Sidebar — ward list */}
        <div style={{
          width:200, display:"flex", flexDirection:"column", gap:8,
          maxHeight:480, overflowY:"auto",
          scrollbarWidth:"none",
        }}>
          {filteredWards.map(ward => (
            <div key={ward.id} onClick={() => focusWard(ward)}
              style={{
                padding:"12px 14px", borderRadius:16, cursor:"pointer",
                background: selectedWard?.id===ward.id
                  ? "rgba(6,182,212,0.12)" : "rgba(255,255,255,0.9)",
                border: selectedWard?.id===ward.id
                  ? "1.5px solid rgba(6,182,212,0.5)" : "1.5px solid rgba(255,255,255,0.95)",
                boxShadow:"0 2px 12px rgba(6,182,212,0.08)",
                transition:"all 0.2s ease",
                borderLeft:`4px solid ${statusColor[ward.status]}`,
              }}>
              <p style={{ fontFamily:"'Raleway',sans-serif", fontWeight:900,
                          fontSize:13, color:"#0f172a", marginBottom:3 }}>
                {ward.name}
              </p>
              <p style={{ fontSize:11, fontWeight:700,
                          color:statusColor[ward.status] }}>
                {statusLabel[ward.status]}
              </p>
              <p style={{ fontSize:11, fontWeight:600, color:"#94a3b8", marginTop:2 }}>
                {ward.zone}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display:"flex", gap:20, flexWrap:"wrap",
        padding:"12px 18px", borderRadius:14,
        background:"rgba(255,255,255,0.9)",
        border:"1px solid rgba(6,182,212,0.12)",
      }}>
        <span style={{ fontSize:13, fontWeight:800, color:"#475569",
                       fontFamily:"'Raleway',sans-serif" }}>Legend:</span>
        {Object.entries(statusColor).map(([key, color]) => (
          <div key={key} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:11, height:11, borderRadius:"50%",
                           background:color, display:"inline-block",
                           boxShadow:`0 0 6px ${color}88` }}/>
            <span style={{ fontSize:12, fontWeight:700, color:"#475569" }}>
              {statusLabel[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}