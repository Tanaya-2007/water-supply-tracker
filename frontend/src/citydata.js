// Central city data — all pages use this
export const cityData = {
    sangli: {
      name: "Sangli-Miraj-Kupwad",
      label: "Sangli",
      wards: [
        { id:1, name:"Vishrambag",  zone:"Zone C", status:"green",  nextSupply:"6:00 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:45, accuracy:92 },
        { id:2, name:"Miraj",       zone:"Zone B", status:"red",    nextSupply:"8:30 AM", duration:"1 hr",  pressure:"Low",    delay:"2 hrs late",  users:32, accuracy:67 },
        { id:3, name:"Sangli Camp", zone:"Zone A", status:"yellow", nextSupply:"7:00 AM", duration:"2 hrs", pressure:"Medium", delay:"45 min late", users:28, accuracy:78 },
        { id:4, name:"Gaokiwadi",   zone:"Zone C", status:"green",  nextSupply:"6:30 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:31, accuracy:88 },
        { id:5, name:"Wanlesswadi", zone:"Zone B", status:"yellow", nextSupply:"7:30 AM", duration:"1 hr",  pressure:"Medium", delay:"30 min late", users:22, accuracy:74 },
        { id:6, name:"Kupwad",      zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"3 hrs", pressure:"High",   delay:"On Time",     users:28, accuracy:95 },
      ],
      alerts: [
        { id:1, type:"outage",   ward:"Miraj",       msg:"Pump failure at Zone B station",    time:"10 min ago", severity:"high"   },
        { id:2, type:"delay",    ward:"Sangli Camp",  msg:"45 min delay due to demand surge",  time:"1 hr ago",   severity:"medium" },
        { id:3, type:"restored", ward:"Vishrambag",   msg:"Supply restored after maintenance", time:"2 hrs ago",  severity:"low"    },
        { id:4, type:"delay",    ward:"Wanlesswadi",  msg:"Low pressure — crew dispatched",    time:"3 hrs ago",  severity:"medium" },
      ],
      predictions: [
        { ward:"Vishrambag",  prediction:"On time tomorrow", confidence:94, trend:"stable",  nextDelay:"None" },
        { ward:"Miraj",       prediction:"3 hr delay likely", confidence:81, trend:"worse",  nextDelay:"3 hrs" },
        { ward:"Sangli Camp", prediction:"30 min delay",      confidence:72, trend:"improving", nextDelay:"30 min" },
        { ward:"Gaokiwadi",   prediction:"On time tomorrow", confidence:90, trend:"stable",  nextDelay:"None" },
        { ward:"Wanlesswadi", prediction:"1 hr delay",        confidence:68, trend:"stable",  nextDelay:"1 hr" },
        { ward:"Kupwad",      prediction:"On time tomorrow", confidence:96, trend:"stable",  nextDelay:"None" },
      ],
    },

    pune: {
      name: "Pune Municipal Corporation",
      label: "Pune",
      wards: [
        { id:7,  name:"Shivajinagar", zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",    users:34, accuracy:88 },
        { id:8,  name:"Kothrud",      zone:"Zone B", status:"yellow", nextSupply:"8:00 AM", duration:"1 hr",  pressure:"Medium", delay:"1 hr late",  users:21, accuracy:65 },
        { id:9,  name:"Hadapsar",     zone:"Zone C", status:"red",    nextSupply:"9:30 AM", duration:"1 hr",  pressure:"Low",    delay:"2 hrs late", users:19, accuracy:42 },
        { id:10, name:"Aundh",        zone:"Zone A", status:"green",  nextSupply:"5:30 AM", duration:"3 hrs", pressure:"High",   delay:"On Time",    users:28, accuracy:91 },
        { id:11, name:"Kharadi",      zone:"Zone D", status:"yellow", nextSupply:"7:30 AM", duration:"2 hrs", pressure:"Medium", delay:"45 min late",users:25, accuracy:70 },
        { id:12, name:"Katraj",       zone:"Zone C", status:"red",    nextSupply:"10:00 AM",duration:"1 hr",  pressure:"Low",    delay:"3 hrs late", users:18, accuracy:55 },
      ],
      alerts: [
        { id:1, type:"outage",   ward:"Hadapsar",     msg:"Main pipeline burst near ring road",  time:"5 min ago",  severity:"high"   },
        { id:2, type:"outage",   ward:"Katraj",       msg:"Pump station offline for maintenance",time:"30 min ago", severity:"high"   },
        { id:3, type:"delay",    ward:"Kothrud",      msg:"Supply delayed due to high demand",   time:"1 hr ago",   severity:"medium" },
        { id:4, type:"restored", ward:"Shivajinagar", msg:"Pressure normalized after repair",    time:"2 hrs ago",  severity:"low"    },
      ],
      predictions: [
        { ward:"Shivajinagar", prediction:"On time tomorrow",  confidence:90, trend:"stable",    nextDelay:"None"   },
        { ward:"Kothrud",      prediction:"45 min delay",      confidence:74, trend:"improving",  nextDelay:"45 min" },
        { ward:"Hadapsar",     prediction:"2 hr delay likely", confidence:62, trend:"worse",      nextDelay:"2 hrs"  },
        { ward:"Aundh",        prediction:"On time tomorrow",  confidence:93, trend:"stable",     nextDelay:"None"   },
        { ward:"Kharadi",      prediction:"30 min delay",      confidence:71, trend:"stable",     nextDelay:"30 min" },
        { ward:"Katraj",       prediction:"Full day outage",   confidence:58, trend:"worse",      nextDelay:"All day"},
      ],
    },

    nashik: {
      name: "Nashik Municipal Corporation",
      label: "Nashik",
      wards: [
        { id:13, name:"Nashik Road",  zone:"Zone A", status:"green",  nextSupply:"6:00 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:22, accuracy:85 },
        { id:14, name:"Cidco",        zone:"Zone B", status:"yellow", nextSupply:"7:30 AM", duration:"1 hr",  pressure:"Medium", delay:"45 min late", users:17, accuracy:70 },
        { id:15, name:"Satpur",       zone:"Zone C", status:"red",    nextSupply:"10:00 AM",duration:"1 hr",  pressure:"Low",    delay:"3 hrs late",  users:25, accuracy:48 },
        { id:16, name:"Panchavati",   zone:"Zone A", status:"green",  nextSupply:"6:00 AM", duration:"2 hrs", pressure:"High",   delay:"On Time",     users:19, accuracy:82 },
        { id:17, name:"Deolali Camp", zone:"Zone B", status:"yellow", nextSupply:"8:00 AM", duration:"1 hr",  pressure:"Medium", delay:"1 hr late",   users:14, accuracy:63 },
      ],
      alerts: [
        { id:1, type:"outage",   ward:"Satpur",      msg:"Industrial demand spike caused outage", time:"20 min ago", severity:"high"   },
        { id:2, type:"delay",    ward:"Cidco",       msg:"Valve maintenance causing delay",        time:"1 hr ago",   severity:"medium" },
        { id:3, type:"delay",    ward:"Deolali Camp",msg:"Low reservoir — reduced supply hours",   time:"2 hrs ago",  severity:"medium" },
        { id:4, type:"restored", ward:"Nashik Road", msg:"Full pressure restored",                 time:"3 hrs ago",  severity:"low"    },
      ],
      predictions: [
        { ward:"Nashik Road",  prediction:"On time tomorrow",  confidence:87, trend:"stable",   nextDelay:"None"   },
        { ward:"Cidco",        prediction:"30 min delay",      confidence:69, trend:"improving", nextDelay:"30 min" },
        { ward:"Satpur",       prediction:"2 hr delay likely", confidence:55, trend:"worse",     nextDelay:"2 hrs"  },
        { ward:"Panchavati",   prediction:"On time tomorrow",  confidence:84, trend:"stable",    nextDelay:"None"   },
        { ward:"Deolali Camp", prediction:"1 hr delay",        confidence:66, trend:"stable",    nextDelay:"1 hr"   },
      ],
    },
  };

  export const alertColors = {
    outage:   { color:"#dc2626", bg:"rgba(254,226,226,0.6)", border:"#fecaca", icon:"🚨", label:"Outage"   },
    delay:    { color:"#d97706", bg:"rgba(254,243,199,0.6)", border:"#fde68a", icon:"⚠️", label:"Delay"    },
    restored: { color:"#16a34a", bg:"rgba(220,252,231,0.6)", border:"#bbf7d0", icon:"✅", label:"Restored" },
  };

  export const statusConfig = {
    green:  { label:"Flowing",     color:"#16a34a", bg:"rgba(220,252,231,0.6)", border:"#bbf7d0", dot:"#22c55e" },
    yellow: { label:"Coming Soon", color:"#d97706", bg:"rgba(254,243,199,0.6)", border:"#fde68a", dot:"#f59e0b" },
    red:    { label:"No Supply",   color:"#dc2626", bg:"rgba(254,226,226,0.6)", border:"#fecaca", dot:"#ef4444" },
  };
