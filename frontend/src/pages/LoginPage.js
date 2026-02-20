import { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function LoginPage({ onLogin }) {
  const [tab,      setTab]      = useState("signin");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (tab === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // onAuthStateChanged in App.js handles redirect automatically
    } catch (err) {
      // Show friendly error messages
      const msg = err.code === "auth/wrong-password"       ? "Incorrect password. Try again."
                : err.code === "auth/user-not-found"       ? "No account found with this email."
                : err.code === "auth/email-already-in-use" ? "Email already registered. Sign in instead."
                : err.code === "auth/weak-password"        ? "Password must be at least 6 characters."
                : err.code === "auth/invalid-email"        ? "Please enter a valid email address."
                : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged handles redirect automatically
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const inputStyle = {
    width:"100%", padding:"14px 16px", borderRadius:14, fontSize:14,
    fontWeight:600, fontFamily:"'Nunito',sans-serif",
    background:"rgba(255,255,255,0.13)", border:"1.5px solid rgba(255,255,255,0.25)",
    color:"white", outline:"none", boxSizing:"border-box",
    transition:"border-color 0.2s ease",
  };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:999,
      display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden",
    }}>
      {/* Background */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"url('https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1920&q=90')",
        backgroundSize:"cover", backgroundPosition:"center",
        filter:"brightness(0.45) saturate(1.4)",
      }}/>
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(160deg,rgba(1,20,45,0.75) 0%,rgba(3,80,140,0.55) 60%,rgba(1,40,70,0.7) 100%)",
      }}/>

      {/* Glassmorphism card */}
      <div style={{
        position:"relative", zIndex:10,
        width:"100%", maxWidth:420, margin:"0 16px",
        borderRadius:28,
        background:"rgba(255,255,255,0.13)",
        backdropFilter:"blur(32px)", WebkitBackdropFilter:"blur(32px)",
        border:"1.5px solid rgba(255,255,255,0.22)",
        boxShadow:"0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08) inset",
        padding:"36px 32px",
      }}>
        {/* Logo */}
        <div style={{textAlign:"center", marginBottom:28}}>
          <div style={{
            width:60, height:60, borderRadius:18, margin:"0 auto 14px",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:28,
            background:"rgba(255,255,255,0.18)", border:"1.5px solid rgba(255,255,255,0.35)",
            boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
          }} className="anim-drop-bob">💧</div>
          <h1 style={{
            fontFamily:"'Raleway',sans-serif", fontWeight:900, fontSize:28,
            color:"white", letterSpacing:"-0.5px", textShadow:"0 2px 16px rgba(0,0,0,0.4)",
            marginBottom:4,
          }}>JalDarpan</h1>
          <p style={{fontSize:12, fontWeight:700, color:"rgba(147,210,255,0.8)",
                     letterSpacing:"0.18em", textTransform:"uppercase"}}>
            Sangli · Miraj · Kupwad
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:4,
          background:"rgba(255,255,255,0.08)", borderRadius:14, padding:4, marginBottom:24,
        }}>
          {["signin","signup"].map(t=>(
            <button key={t} onClick={()=>{ setTab(t); setError(""); }} style={{
              padding:"10px", borderRadius:11, fontSize:13, fontWeight:800,
              fontFamily:"'Nunito',sans-serif", cursor:"pointer", border:"none",
              transition:"all 0.25s ease",
              background:tab===t?"linear-gradient(135deg,#0ea5e9,#06b6d4)":"transparent",
              color:tab===t?"white":"rgba(255,255,255,0.5)",
              boxShadow:tab===t?"0 4px 12px rgba(6,182,212,0.4)":"none",
            }}>
              {t==="signin"?"Sign In":"Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{display:"flex", flexDirection:"column", gap:14, marginBottom:20}}>
          {tab==="signup" && (
            <div>
              <label style={{display:"block", fontSize:12, fontWeight:700,
                             color:"rgba(147,210,255,0.85)", marginBottom:7, letterSpacing:"0.04em"}}>
                Full Name
              </label>
              <input value={name} onChange={e=>setName(e.target.value)}
                placeholder="Enter your name" style={inputStyle}
                onFocus={e=>e.target.style.borderColor="rgba(14,165,233,0.7)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.25)"}/>
            </div>
          )}
          <div>
            <label style={{display:"block", fontSize:12, fontWeight:700,
                           color:"rgba(147,210,255,0.85)", marginBottom:7, letterSpacing:"0.04em"}}>
              Email Address
            </label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="you@example.com" style={inputStyle}
              onFocus={e=>e.target.style.borderColor="rgba(14,165,233,0.7)"}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.25)"}/>
          </div>
          <div>
            <label style={{display:"block", fontSize:12, fontWeight:700,
                           color:"rgba(147,210,255,0.85)", marginBottom:7, letterSpacing:"0.04em"}}>
              Password
            </label>
            <div style={{position:"relative"}}>
              <input type={showPass?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="Enter password" style={{...inputStyle, paddingRight:48}}
                onFocus={e=>e.target.style.borderColor="rgba(14,165,233,0.7)"}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.25)"}/>
              <button onClick={()=>setShowPass(!showPass)} style={{
                position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                background:"none", border:"none", cursor:"pointer",
                fontSize:16, color:"rgba(255,255,255,0.5)",
              }}>{showPass ? "Hide" : "Show"}</button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            marginBottom:14, padding:"10px 14px", borderRadius:12,
            background:"rgba(239,68,68,0.18)", border:"1px solid rgba(239,68,68,0.4)",
            color:"#fca5a5", fontSize:13, fontWeight:700, fontFamily:"'Nunito',sans-serif",
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit */}
        <button onClick={handleSubmit} className="ripple" style={{
          width:"100%", padding:"14px", borderRadius:16, border:"none",
          background:"linear-gradient(135deg,#0ea5e9,#06b6d4)",
          color:"white", fontSize:15, fontWeight:800, fontFamily:"'Nunito',sans-serif",
          cursor: loading ? "not-allowed" : "pointer", marginBottom:14,
          boxShadow:"0 8px 28px rgba(14,165,233,0.5)",
          opacity: loading ? 0.7 : 1,
          transition:"opacity 0.2s ease",
        }}>
          {loading ? "Please wait…" : tab==="signin" ? "Sign In →" : "Create Account →"}
        </button>

        {/* Divider */}
        <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:14}}>
          <div style={{flex:1, height:1, background:"rgba(255,255,255,0.15)"}}/>
          <span style={{fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.4)"}}>or</span>
          <div style={{flex:1, height:1, background:"rgba(255,255,255,0.15)"}}/>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} style={{
          width:"100%", padding:"13px", borderRadius:16, border:"1.5px solid rgba(255,255,255,0.25)",
          background:"rgba(255,255,255,0.95)", color:"#374151",
          fontSize:14, fontWeight:800, fontFamily:"'Nunito',sans-serif",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          boxShadow:"0 4px 16px rgba(0,0,0,0.2)", transition:"transform 0.2s ease",
        }}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        <p style={{textAlign:"center", fontSize:11, fontWeight:600,
                   color:"rgba(255,255,255,0.35)", marginTop:20}}>
          Sangli Municipal Corporation · Citizen Portal
        </p>
      </div>
    </div>
  );
}