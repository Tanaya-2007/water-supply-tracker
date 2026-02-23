import { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginPage      from "./pages/LoginPage";
import Header         from "./components/Header";
import Footer         from "./components/Footer";
import StatsBar       from "./components/StatsBar";
import WardsPage      from "./pages/WardsPage";
import PredictPage    from "./pages/PredictPage";
import AlertsPage     from "./pages/AlertsPage";
import HomePage       from "./pages/HomePage";
import AdminDashboard from "./AdminDashboard";

const bubbles = [
  { size:18,  left:"5%",  dur:"9s",  delay:"0s"   },
  { size:10,  left:"11%", dur:"13s", delay:"2s"   },
  { size:25,  left:"18%", dur:"10s", delay:"5s"   },
  { size:14,  left:"24%", dur:"14s", delay:"1s"   },
  { size:30,  left:"31%", dur:"11s", delay:"7s"   },
  { size:8,   left:"38%", dur:"12s", delay:"3s"   },
  { size:20,  left:"44%", dur:"9.5s",delay:"0.5s" },
  { size:12,  left:"51%", dur:"13s", delay:"4s"   },
  { size:28,  left:"57%", dur:"10s", delay:"8s"   },
  { size:16,  left:"63%", dur:"11s", delay:"1.5s" },
  { size:22,  left:"69%", dur:"12s", delay:"6s"   },
  { size:9,   left:"75%", dur:"14s", delay:"2.5s" },
  { size:32,  left:"80%", dur:"10s", delay:"0.8s" },
  { size:13,  left:"86%", dur:"13s", delay:"9s"   },
  { size:19,  left:"91%", dur:"11s", delay:"3.5s" },
  { size:7,   left:"96%", dur:"9s",  delay:"1.2s" },
  { size:24,  left:"35%", dur:"12s", delay:"4.5s" },
  { size:11,  left:"47%", dur:"10s", delay:"6.5s" },
  { size:17,  left:"73%", dur:"13s", delay:"2.2s" },
  { size:26,  left:"88%", dur:"11s", delay:"7.5s" },
];

function Bubbles() {
  return (
    <>
      {bubbles.map((b, i) => (
        <div key={i} className="bubble-particle"
          style={{ width:b.size, height:b.size, left:b.left,
                   animationDuration:b.dur, animationDelay:b.delay }} />
      ))}
    </>
  );
}

export default function App() {
  const [user,         setUser]         = useState(null);
  const [authReady,    setAuthReady]    = useState(false);
  const [activeTab,    setActiveTab]    = useState("home");
  const [adminMode,    setAdminMode]    = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const handlePredict = async (zoneName) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/predict", {
      zone: zoneName,
      hour: new Date().getHours(),
      temperature: 30 // Example temp
    });
    alert("Prediction: " + response.data.prediction);
  } catch (error) {
    console.error("Error reaching backend:", error);
  }
};

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return unsub;
  }, []);

  const handleLogout = () => signOut(auth);

  if (!authReady) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
                    background:"linear-gradient(160deg,#e0f2fe 0%,#bae6fd 50%,#e0f2fe 100%)" }}>
        <div className="anim-drop-bob" style={{fontSize:48}}>💧</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Bubbles />
        <LoginPage onLogin={() => {}} />
      </>
    );
  }

  if (adminMode) {
    return <AdminDashboard onBack={() => setAdminMode(false)} selectedCity={selectedCity} />;
  }

  const renderPage = () => {
    switch (activeTab) {
    case "home":
default:
  return <HomePage 
    selectedCity={selectedCity} 
    onCityChange={(city) => {
      setSelectedCity(city);
      handlePredict(city); // This sends the city name to your Backend terminal!
    }} 
  />;
      case "wards":   return <WardsPage selectedCity={selectedCity} />;
      case "predict": return <PredictPage selectedCity={selectedCity} />;
      case "alerts":  return <AlertsPage selectedCity={selectedCity} />;
      default:        return <HomePage selectedCity={selectedCity} onCityChange={setSelectedCity} />;
    }
  };

  return (
    <div className="min-h-screen relative"
      style={{ background:"linear-gradient(160deg,#e0f2fe 0%,#bae6fd 50%,#e0f2fe 100%)" }}>
      <Bubbles />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header user={user} onLogout={handleLogout}
                onAdminClick={() => setAdminMode(true)}
                selectedCity={selectedCity} />
        {(activeTab === "wards" || activeTab === "home") && <StatsBar selectedCity={selectedCity} />}
        <main className="flex-1" style={{ paddingBottom:100 }}>
          {renderPage()}
        </main>
        <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
