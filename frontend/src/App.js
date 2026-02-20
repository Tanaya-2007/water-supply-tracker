import { useState } from "react";
import "./App.css";
import LoginPage  from "./pages/LoginPage";
import Header     from "./components/Header";
import Footer     from "./components/Footer";
import StatsBar   from "./components/StatsBar";
import WardsPage   from "./pages/WardsPage";
import PredictPage from "./pages/PredictPage";
import AlertsPage  from "./pages/AlertsPage";
import HomePage    from "./pages/HomePage";

const droplets = [
  { w:12, h:18, left:"4%",  dur:"6s",  delay:"0s"   },
  { w:7,  h:11, left:"10%", dur:"9s",  delay:"1.5s" },
  { w:16, h:24, left:"16%", dur:"7s",  delay:"3s"   },
  { w:9,  h:14, left:"22%", dur:"11s", delay:"0.8s" },
  { w:20, h:28, left:"30%", dur:"8s",  delay:"5s"   },
  { w:6,  h:9,  left:"37%", dur:"10s", delay:"2s"   },
  { w:14, h:20, left:"43%", dur:"7.5s",delay:"4s"   },
  { w:8,  h:13, left:"50%", dur:"9.5s",delay:"0.3s" },
  { w:18, h:26, left:"57%", dur:"6.5s",delay:"6s"   },
  { w:10, h:15, left:"63%", dur:"8.5s",delay:"1s"   },
  { w:22, h:32, left:"69%", dur:"7s",  delay:"3.5s" },
  { w:7,  h:11, left:"74%", dur:"11s", delay:"2.5s" },
  { w:15, h:22, left:"79%", dur:"9s",  delay:"0.5s" },
  { w:11, h:17, left:"84%", dur:"6s",  delay:"7s"   },
  { w:19, h:27, left:"89%", dur:"8s",  delay:"4.5s" },
  { w:8,  h:12, left:"93%", dur:"10s", delay:"1.8s" },
  { w:13, h:19, left:"97%", dur:"7.5s",delay:"3.2s" },
  { w:6,  h:9,  left:"25%", dur:"12s", delay:"5.5s" },
  { w:17, h:25, left:"47%", dur:"6.8s",delay:"2.8s" },
  { w:10, h:15, left:"71%", dur:"9.2s",delay:"0.1s" },
];

export default function App() {
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [activeTab, setActiveTab] = useState("wards");

  // 🔥 TODO: Replace with Firebase onAuthStateChanged listener
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, user => setLoggedIn(!!user));
  //   return unsub;
  // }, []);

  /* ── Show Login until authenticated ── */
  if (!loggedIn) {
    return (
      <>
        {/* droplets visible on login screen too */}
        {droplets.map((d, i) => (
          <div key={i} className="droplet-particle" style={{
            width: d.w, height: d.h, left: d.left,
            animationDuration: d.dur, animationDelay: d.delay,
          }} />
        ))}
        <LoginPage onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home":    return <HomePage />;
      case "wards":   return <WardsPage />;
      case "predict": return <PredictPage />;
      case "alerts":  return <AlertsPage />;
      default:        return <WardsPage />;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(160deg,#e0f2fe 0%,#bae6fd 50%,#e0f2fe 100%)" }}>
      {droplets.map((d, i) => (
        <div key={i} className="droplet-particle" style={{
          width: d.w, height: d.h, left: d.left,
          animationDuration: d.dur, animationDelay: d.delay,
        }} />
      ))}
      <div className="relative z-10">
        <Header />
        {(activeTab === "wards" || activeTab === "home") && <StatsBar />}
        <div className="pb-28">{renderPage()}</div>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}