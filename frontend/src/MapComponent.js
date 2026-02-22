import { useEffect, useRef, useState } from "react";
import { wardData, statusConfig } from "./data";

/* ── Ward polygons — Sangli ── */
const wardPolygons = {
  "Vishrambag":  [[16.8580,74.5750],[16.8620,74.5820],[16.8600,74.5890],[16.8550,74.5900],[16.8510,74.5840],[16.8530,74.5760]],
  "Miraj":       [[16.8180,74.6380],[16.8240,74.6460],[16.8220,74.6530],[16.8160,74.6540],[16.8120,74.6470],[16.8140,74.6390]],
  "Sangli Camp": [[16.8700,74.5620],[16.8750,74.5700],[16.8730,74.5770],[16.8670,74.5780],[16.8630,74.5710],[16.8650,74.5630]],
  "Gaokiwadi":   [[16.8400,74.5900],[16.8460,74.5970],[16.8440,74.6040],[16.8380,74.6050],[16.8340,74.5980],[16.8360,74.5910]],
  "Wanlesswadi": [[16.8300,74.6040],[16.8360,74.6110],[16.8340,74.6180],[16.8280,74.6190],[16.8240,74.6120],[16.8260,74.6050]],
  "Kupwad":      [[16.8760,74.6160],[16.8820,74.6230],[16.8800,74.6300],[16.8740,74.6310],[16.8700,74.6240],[16.8720,74.6170]],
};

/* ── Pune wards ── */
const puneWards = [
  { id:7,  name:"Shivajinagar", status:"green",  accuracy:88, users:34, nextSupply:"5:30 AM", delay:"On Time",    zone:"Zone A" },
  { id:8,  name:"Kothrud",      status:"yellow", accuracy:65, users:21, nextSupply:"8:00 AM", delay:"1 hr late",  zone:"Zone B" },
  { id:9,  name:"Hadapsar",     status:"red",    accuracy:42, users:19, nextSupply:"9:30 AM", delay:"2 hrs late", zone:"Zone C" },
  { id:10, name:"Aundh",        status:"green",  accuracy:91, users:28, nextSupply:"5:30 AM", delay:"On Time",    zone:"Zone A" },
];
const punePolygons = {
  "Shivajinagar": [[18.5300,73.8450],[18.5360,73.8520],[18.5340,73.8590],[18.5280,73.8600],[18.5230,73.8530],[18.5260,73.8460]],
  "Kothrud":      [[18.5050,73.8100],[18.5110,73.8180],[18.5090,73.8250],[18.5030,73.8260],[18.4980,73.8190],[18.5010,73.8120]],
  "Hadapsar":     [[18.5000,73.9300],[18.5060,73.9380],[18.5040,73.9450],[18.4980,73.9460],[18.4930,73.9390],[18.4960,73.9310]],
  "Aundh":        [[18.5580,73.8050],[18.5640,73.8120],[18.5620,73.8190],[18.5560,73.8200],[18.5510,73.8130],[18.5540,73.8060]],
};

/* ── Nashik wards ── */
const nashikWards = [
  { id:11, name:"Nashik Road", status:"green",  accuracy:85, users:22, nextSupply:"6:00 AM", delay:"On Time",     zone:"Zone A" },
  { id:12, name:"Cidco",       status:"yellow", accuracy:70, users:17, nextSupply:"7:30 AM", delay:"45 min late", zone:"Zone B" },
  { id:13, name:"Satpur",      status:"red",    accuracy:48, users:25, nextSupply:"10:00 AM",delay:"3 hrs late",  zone:"Zone C" },
];
const nashikPolygons = {
  "Nashik Road": [[19.9800,73.8300],[19.9860,73.8380],[19.9840,73.8450],[19.9780,73.8460],[19.9730,73.8390],[19.9760,73.8310]],
  "Cidco":       [[19.9650,73.7900],[19.9710,73.7980],[19.9690,73.8050],[19.9630,73.8060],[19.9580,73.7990],[19.9610,73.7910]],
  "Satpur":      [[20.0050,73.7700],[20.0110,73.7780],[20.0090,73.7850],[20.0030,73.7860],[19.9980,73.7790],[20.0010,73.7710]],
};

const cities = {
  sangli: { name:"Sangli-Miraj-Kupwad", label:"Sangli", lat:16.845, lng:74.600, zoom:13, wards:wardData,    polygons:wardPolygons,  info:"SMC · 6 wards live" },
  pune:   { name:"Pune Municipal Corp.", label:"Pune",   lat:18.520, lng:73.856, zoom:12, wards:puneWards,   polygons:punePolygons,  info:"PMC · 4 wards live" },
  nashik: { name:"Nashik Municipal Corp.",label:"Nashik",lat:19.990, lng:73.790, zoom:13, wards:nashikWards, polygons:nashikPolygons,info:"NMC · 3 wards live" },
};

const greyDistricts = [
  { name:"Kolhapur",   lat:16.705, lng:74.243 },
  { name:"Solapur",    lat:17.680, lng:75.906 },
  { name:"Aurangabad", lat:19.876, lng:75.343 },
  { name:"Nagpur",     lat:21.145, lng:79.088 },
  { name:"Amravati",   lat:20.937, lng:77.779 },
  { name:"Nanded",     lat:19.138, lng:77.321 },
  { name:"Satara",     lat:17.680, lng:73.995 },
  { name:"Ratnagiri",  lat:16.994, lng:73.300 },
];

const statusColors = {
  green:  { fill:"#22c55e", stroke:"#16a34a" },
  yellow: { fill:"#f59e0b", stroke:"#d97706" },
  red:    { fill:"#ef4444", stroke:"#dc2626" },
};

/* ── Real Maharashtra GeoJSON URL (hosted on GitHub raw / unpkg CDN) ── */
const MH_GEOJSON_URL =
  "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson";

export default function MapComponent() {
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const [view,    setView]    = useState("maharashtra");
  const [cityKey, setCityKey] = useState(null);

  /* ── Load Leaflet from CDN ── */
  const loadLeaflet = (cb) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id="leaflet-css"; link.rel="stylesheet";
      link.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    if (window.L) { cb(); return; }
    if (!document.getElementById("leaflet-js")) {
      const s = document.createElement("script");
      s.id="leaflet-js"; s.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      s.onload=cb; document.body.appendChild(s);
    } else {
      document.getElementById("leaflet-js").addEventListener("load", cb);
    }
  };

  const destroyMap = () => {
    if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current=null; }
  };

  /* ── MAHARASHTRA STATE VIEW ── */
  const buildMaharashtraView = () => {
    destroyMap();
    if (!mapRef.current) return;
    const L = window.L;

    const map = L.map(mapRef.current, {
      center:[18.8,76.5], zoom:7,
      zoomControl:true, attributionControl:false,
      minZoom:6, maxZoom:10,
    });
    leafletRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",{maxZoom:19,opacity:0.5}).addTo(map);

    /* ── Fetch real GeoJSON and draw only Maharashtra ── */
    fetch(MH_GEOJSON_URL)
      .then(r => r.json())
      .then(data => {
        // Filter to Maharashtra state only
        const mhFeature = {
          type: "FeatureCollection",
          features: data.features.filter(f =>
            f.properties.NAME_1 === "Maharashtra" ||
            f.properties.ST_NM === "Maharashtra" ||
            f.properties.name === "Maharashtra" ||
            f.properties.NAME === "Maharashtra"
          ),
        };

        if (mhFeature.features.length === 0) {
          // Fallback: draw all states dimly, Maharashtra highlighted by label
          L.geoJSON(data, {
            style: f => {
              const isMH = Object.values(f.properties).some(v =>
                typeof v === "string" && v.toLowerCase().includes("maharashtra")
              );
              return isMH
                ? { color:"#0369a1", fillColor:"#0ea5e9", fillOpacity:0.12, weight:2.5 }
                : { color:"#cbd5e1", fillColor:"transparent", fillOpacity:0, weight:0.5 };
            },
          }).addTo(map);
        } else {
          L.geoJSON(mhFeature, {
            style: {
              color:"#0369a1",
              fillColor:"#0ea5e9",
              fillOpacity:0.12,
              weight:2.5,
              smoothFactor:2,
            },
          }).addTo(map);
        }
      })
      .catch(() => {
        /* If fetch fails (no internet on device) — skip boundary silently */
        console.warn("Maharashtra GeoJSON unavailable — skipping boundary");
      });

    /* ── Active city pill markers ── */
    Object.entries(cities).forEach(([key, city]) => {
      const icon = L.divIcon({
        className:"",
        html:`<div style="
          display:flex;align-items:center;gap:6px;
          background:linear-gradient(135deg,#0ea5e9,#06b6d4);
          border:2px solid #0369a1;border-radius:20px;
          padding:6px 13px 6px 9px;
          box-shadow:0 4px 16px rgba(14,165,233,0.45);
          cursor:pointer;font-family:'Nunito',sans-serif;white-space:nowrap;
        ">
          <span style="width:8px;height:8px;border-radius:50%;background:#fff;display:inline-block;flex-shrink:0;"></span>
          <span style="font-size:12px;font-weight:800;color:#fff;">${city.label}</span>
          <span style="font-size:10px;color:rgba(255,255,255,0.8);">▶</span>
        </div>`,
        iconAnchor:[55,16],
      });
      const marker = L.marker([city.lat,city.lng],{icon}).addTo(map);
      marker.on("click",()=>{ setCityKey(key); setView("city"); });
      marker.bindTooltip(
        `<div style="font-family:'Nunito',sans-serif;font-size:12px;font-weight:700;color:#0369a1;">${city.info} — Click to explore</div>`,
        { direction:"top", offset:[0,-10] }
      );
    });

    /* ── Grey coming-soon districts ── */
    greyDistricts.forEach(dist => {
      const icon = L.divIcon({
        className:"",
        html:`<div style="
          display:flex;align-items:center;gap:5px;
          background:rgba(255,255,255,0.88);
          border:1.5px solid #cbd5e1;border-radius:14px;
          padding:4px 10px 4px 7px;
          box-shadow:0 2px 6px rgba(0,0,0,0.08);
          font-family:'Nunito',sans-serif;white-space:nowrap;
        ">
          <span style="width:6px;height:6px;border-radius:50%;background:#cbd5e1;display:inline-block;"></span>
          <span style="font-size:11px;font-weight:700;color:#94a3b8;">${dist.name}</span>
        </div>`,
        iconAnchor:[38,12],
      });
      const m = L.marker([dist.lat,dist.lng],{icon}).addTo(map);
      m.bindPopup(`
        <div style="font-family:'Nunito',sans-serif;padding:2px 4px;">
          <div style="font-weight:900;font-size:13px;color:#334155;margin-bottom:3px;">${dist.name}</div>
          <div style="font-size:11px;color:#94a3b8;">🔜 Integration coming soon</div>
        </div>
      `,{maxWidth:160,className:"ward-popup"});
    });
  };

  /* ── CITY WARD VIEW ── */
  const buildCityView = (key) => {
    destroyMap();
    if (!mapRef.current || !key) return;
    const L    = window.L;
    const city = cities[key];

    const map = L.map(mapRef.current, {
      center:[city.lat,city.lng], zoom:city.zoom,
      zoomControl:true, attributionControl:false,
    });
    leafletRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{maxZoom:19}).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",{maxZoom:19,opacity:0.6}).addTo(map);

    city.wards.forEach(ward => {
      const coords = city.polygons[ward.name];
      if (!coords) return;
      const col = statusColors[ward.status];
      const cfg = statusConfig[ward.status];

      const polygon = L.polygon(coords,{
        color:col.stroke, fillColor:col.fill, fillOpacity:0.30,
        weight:2.5, dashArray:ward.status==="red"?"6,4":null,
      }).addTo(map);

      polygon.bindPopup(`
        <div style="font-family:'Nunito',sans-serif;min-width:160px;padding:2px 4px;">
          <div style="font-family:'Raleway',sans-serif;font-weight:900;font-size:15px;color:#0f172a;margin-bottom:6px;">${ward.name}</div>
          <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:800;background:${col.fill}22;border:1.5px solid ${col.stroke};color:${col.stroke};margin-bottom:8px;">
            <span style="width:6px;height:6px;border-radius:50%;background:${col.stroke};display:inline-block;"></span>${cfg.label}
          </div>
          <div style="font-size:12px;color:#475569;margin-bottom:3px;">🕐 Next: <strong>${ward.nextSupply}</strong></div>
          <div style="font-size:12px;color:#475569;margin-bottom:3px;">⚡ ${ward.delay}</div>
          <div style="font-size:12px;color:#475569;">👥 ${ward.users} active reporters</div>
        </div>
      `,{maxWidth:220,className:"ward-popup"});

      const center = polygon.getBounds().getCenter();
      L.marker(center,{
        icon:L.divIcon({
          className:"",
          html:`<div style="font-family:'Raleway',sans-serif;font-weight:900;font-size:11px;color:#0f172a;background:rgba(255,255,255,0.92);border:1.5px solid ${col.stroke};padding:3px 8px;border-radius:8px;white-space:nowrap;pointer-events:none;box-shadow:0 2px 8px rgba(0,0,0,0.1);">${ward.name}</div>`,
          iconAnchor:[36,10],
        }),
      }).addTo(map);
    });
  };

  useEffect(()=>{
    loadLeaflet(()=>{
      if (view==="maharashtra") buildMaharashtraView();
      else if (view==="city"&&cityKey) buildCityView(cityKey);
    });
    return destroyMap;
    // eslint-disable-next-line
  },[view,cityKey]);

  const city        = cityKey ? cities[cityKey] : null;
  const activeWards = city ? city.wards : [];
  const flowing     = activeWards.filter(w=>w.status==="green").length;
  const soon        = activeWards.filter(w=>w.status==="yellow").length;
  const outage      = activeWards.filter(w=>w.status==="red").length;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>

      {/* Breadcrumb */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6,fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:800}}>
          <span onClick={()=>{setView("maharashtra");setCityKey(null);}}
            style={{cursor:"pointer",color:view==="maharashtra"?"#0369a1":"#94a3b8",textDecoration:view!=="maharashtra"?"underline":"none"}}>
            🗺️ Maharashtra
          </span>
          {view==="city"&&city&&<>
            <span style={{color:"#cbd5e1"}}>›</span>
            <span style={{color:"#0369a1"}}>{city.name}</span>
          </>}
        </div>
        {view==="city"&&(
          <button onClick={()=>{setView("maharashtra");setCityKey(null);}} style={{
            display:"flex",alignItems:"center",gap:5,
            padding:"6px 14px",borderRadius:999,
            border:"1.5px solid rgba(6,182,212,0.3)",
            background:"rgba(255,255,255,0.9)",cursor:"pointer",
            fontSize:12,fontWeight:800,color:"#0369a1",fontFamily:"'Nunito',sans-serif",
          }}>← Back to Maharashtra</button>
        )}
      </div>

      {/* Legend pills — city view */}
      {view==="city"&&(
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[
            {color:"#22c55e",border:"#16a34a",label:"Water Flowing",count:flowing},
            {color:"#f59e0b",border:"#d97706",label:"Coming Soon",  count:soon},
            {color:"#ef4444",border:"#dc2626",label:"No Supply",    count:outage},
          ].map(s=>(
            <div key={s.label} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 14px",borderRadius:999,background:`${s.color}18`,border:`1.5px solid ${s.border}55`,fontSize:12,fontWeight:800,color:s.border,fontFamily:"'Nunito',sans-serif"}}>
              <span style={{width:9,height:9,borderRadius:"50%",background:s.color,display:"inline-block"}}/>
              {s.count} {s.label}
            </div>
          ))}
        </div>
      )}

      {/* Hint — Maharashtra view */}
      {view==="maharashtra"&&(
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:14,background:"rgba(14,165,233,0.08)",border:"1.5px solid rgba(14,165,233,0.2)",fontFamily:"'Nunito',sans-serif"}}>
          <span style={{fontSize:18}}>💡</span>
          <p style={{fontSize:12,fontWeight:700,color:"#0369a1",margin:0}}>
            Click <strong>Sangli</strong>, <strong>Pune</strong> or <strong>Nashik</strong> to explore live ward-level water supply status
          </p>
        </div>
      )}

      {/* Map */}
      <div style={{borderRadius:20,overflow:"hidden",border:"1.5px solid rgba(6,182,212,0.2)",boxShadow:"0 8px 32px rgba(6,182,212,0.15)"}}>
        <div ref={mapRef} style={{height:"clamp(340px,55vw,520px)",width:"100%"}}/>
        <style>{`
          .leaflet-control-attribution{display:none!important;}
          .leaflet-control-zoom{border:none!important;box-shadow:0 4px 16px rgba(6,182,212,0.2)!important;border-radius:12px!important;overflow:hidden;}
          .leaflet-control-zoom a{background:rgba(255,255,255,0.95)!important;color:#0369a1!important;font-weight:900!important;border:none!important;border-bottom:1px solid rgba(6,182,212,0.15)!important;width:34px!important;height:34px!important;line-height:34px!important;}
          .leaflet-control-zoom a:hover{background:#e0f2fe!important;}
          .ward-popup .leaflet-popup-content-wrapper{border-radius:16px!important;box-shadow:0 8px 32px rgba(6,182,212,0.2)!important;border:1px solid rgba(6,182,212,0.15)!important;padding:4px!important;}
          .ward-popup .leaflet-popup-tip{background:#fff!important;}
          .ward-popup .leaflet-popup-close-button{color:#94a3b8!important;font-size:18px!important;}
          .leaflet-tooltip{border-radius:10px!important;border:1px solid rgba(6,182,212,0.2)!important;box-shadow:0 4px 12px rgba(6,182,212,0.15)!important;padding:4px 10px!important;}
        `}</style>
      </div>

      <p style={{fontSize:11,fontWeight:600,color:"#94a3b8",textAlign:"center",margin:0}}>
        {view==="maharashtra"
          ? "🗺️ Maharashtra boundary · Blue = active cities · Grey = coming soon"
          : `💧 Tap any ward area to see live supply details · ${city?.name}`}
      </p>
    </div>
  );
}