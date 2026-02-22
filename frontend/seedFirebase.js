// Run this ONCE to push all city data to Firebase Realtime DB
// Usage: node seedFirebase.js

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAUw4uubz7wVFkBwNWUmGqhcCDL7vHrlt4",
  authDomain: "water-supply-tracker-8cad0.firebaseapp.com",
  projectId: "water-supply-tracker-8cad0",
  storageBucket: "water-supply-tracker-8cad0.firebasestorage.app",
  messagingSenderId: "1350709633597",
  appId: "1:1350709633597:web:723ce969de89575c0e8fc4",
  databaseURL: "https://water-supply-tracker-8cad0-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

const data = {
  cities: {
    sangli: {
      name: "Sangli-Miraj-Kupwad",
      label: "Sangli",
      wards: {
        1: { id:1, name:"Vishrambag",  zone:"Zone C", status:"green",  nextSupply:"6:00 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:45, accuracy:92 },
        2: { id:2, name:"Miraj",       zone:"Zone B", status:"red",    nextSupply:"8:30 AM", duration:"1 hr",  pressure:"Low",    delay:"2 hrs late",  users:32, accuracy:67 },
        3: { id:3, name:"Sangli Camp", zone:"Zone A", status:"yellow", nextSupply:"7:00 AM", duration:"2 hrs", pressure:"Medium", delay:"45 min late", users:28, accuracy:78 },
        4: { id:4, name:"Gaokiwadi",   zone:"Zone C", status:"green",  nextSupply:"6:30 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:31, accuracy:88 },
        5: { id:5, name:"Wanlesswadi", zone:"Zone B", status:"yellow", nextSupply:"7:30 AM", duration:"1 hr",  pressure:"Medium", delay:"30 min late", users:22, accuracy:74 },
        6: { id:6, name:"Kupwad",      zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"3 hrs", pressure:"High",   delay:"On Time",     users:28, accuracy:95 },
      },
      alerts: {
        1: { id:1, type:"outage",   ward:"Miraj",       msg:"Pump failure at Zone B station",    time:"10 min ago", severity:"high"   },
        2: { id:2, type:"delay",    ward:"Sangli Camp",  msg:"45 min delay due to demand surge",  time:"1 hr ago",   severity:"medium" },
        3: { id:3, type:"restored", ward:"Vishrambag",   msg:"Supply restored after maintenance", time:"2 hrs ago",  severity:"low"    },
        4: { id:4, type:"delay",    ward:"Wanlesswadi",  msg:"Low pressure — crew dispatched",    time:"3 hrs ago",  severity:"medium" },
      },
    },
    pune: {
      name: "Pune Municipal Corporation",
      label: "Pune",
      wards: {
        7:  { id:7,  name:"Shivajinagar", zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:34, accuracy:88 },
        8:  { id:8,  name:"Kothrud",      zone:"Zone B", status:"yellow", nextSupply:"8:00 AM", duration:"1 hr",  pressure:"Medium", delay:"1 hr late",   users:21, accuracy:65 },
        9:  { id:9,  name:"Hadapsar",     zone:"Zone C", status:"red",    nextSupply:"9:30 AM", duration:"1 hr",  pressure:"Low",    delay:"2 hrs late",  users:19, accuracy:42 },
        10: { id:10, name:"Aundh",        zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"3 hrs", pressure:"High",   delay:"On Time",     users:28, accuracy:91 },
        11: { id:11, name:"Kharadi",      zone:"Zone D", status:"yellow", nextSupply:"7:30 AM", duration:"2 hrs", pressure:"Medium", delay:"45 min late", users:25, accuracy:70 },
        12: { id:12, name:"Katraj",       zone:"Zone C", status:"red",    nextSupply:"10:00 AM",duration:"1 hr",  pressure:"Low",    delay:"3 hrs late",  users:18, accuracy:55 },
      },
      alerts: {
        1: { id:1, type:"outage",   ward:"Hadapsar",     msg:"Main pipeline burst near ring road",   time:"5 min ago",  severity:"high"   },
        2: { id:2, type:"outage",   ward:"Katraj",       msg:"Pump station offline for maintenance", time:"30 min ago", severity:"high"   },
        3: { id:3, type:"delay",    ward:"Kothrud",      msg:"Supply delayed due to high demand",    time:"1 hr ago",   severity:"medium" },
        4: { id:4, type:"restored", ward:"Shivajinagar", msg:"Pressure normalized after repair",     time:"2 hrs ago",  severity:"low"    },
      },
    },
    nashik: {
      name: "Nashik Municipal Corporation",
      label: "Nashik",
      wards: {
        13: { id:13, name:"Nashik Road",  zone:"Zone A", status:"green",  nextSupply:"6:00 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:38, accuracy:85 },
        14: { id:14, name:"Cidco",        zone:"Zone B", status:"yellow", nextSupply:"8:00 AM", duration:"1 hr",  pressure:"Medium", delay:"45 min late", users:29, accuracy:70 },
        15: { id:15, name:"Satpur",       zone:"Zone C", status:"red",    nextSupply:"10:00 AM",duration:"1 hr",  pressure:"Low",    delay:"3 hrs late",  users:24, accuracy:48 },
        16: { id:16, name:"Panchavati",   zone:"Zone A", status:"green",  nextSupply:"6:30 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:33, accuracy:82 },
        17: { id:17, name:"Deolali Camp", zone:"Zone B", status:"yellow", nextSupply:"7:30 AM", duration:"1 hr",  pressure:"Medium", delay:"1 hr late",   users:20, accuracy:63 },
      },
      alerts: {
        1: { id:1, type:"outage",   ward:"Satpur",      msg:"Industrial zone pump failure",        time:"15 min ago", severity:"high"   },
        2: { id:2, type:"delay",    ward:"Cidco",       msg:"Pressure drop in Zone B pipeline",    time:"1 hr ago",   severity:"medium" },
        3: { id:3, type:"restored", ward:"Nashik Road", msg:"Supply fully restored after repair",  time:"2 hrs ago",  severity:"low"    },
        4: { id:4, type:"delay",    ward:"Deolali Camp",msg:"Maintenance work causing 1hr delay",  time:"3 hrs ago",  severity:"medium" },
      },
    },
  }
};

async function seed() {
  try {
    await set(ref(db, "/"), data);
    console.log("✅ Firebase seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seed();