import { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

export function useCityData(cityKey) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityKey) { setData(null); setLoading(false); return; }

    setLoading(true);
    const cityRef = ref(db, `cities/${cityKey}`);
    const unsub   = onValue(cityRef, (snap) => {
      if (snap.exists()) {
        const raw = snap.val();
        setData({
          ...raw,
          wards:       raw.wards       ? Object.values(raw.wards)       : [],
          alerts:      raw.alerts      ? Object.values(raw.alerts)      : [],
          predictions: raw.predictions ? Object.values(raw.predictions) : [],
        });
      } else {
        setData(null || null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [cityKey]);

  return { data, loading };
}