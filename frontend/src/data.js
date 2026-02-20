export const wardData = [
    { id: 1, name: "Vishrambag",  status: "green",  accuracy: 87, users: 24, nextSupply: "6:00 AM", delay: "On Time",      zone: "Zone A" },
    { id: 2, name: "Miraj",       status: "red",    accuracy: 43, users: 31, nextSupply: "8:30 AM", delay: "2.5 hrs late", zone: "Zone B" },
    { id: 3, name: "Sangli",      status: "yellow", accuracy: 67, users: 18, nextSupply: "7:00 AM", delay: "45 min late",  zone: "Zone A" },
    { id: 4, name: "Kupwad",      status: "green",  accuracy: 91, users: 12, nextSupply: "6:00 AM", delay: "On Time",      zone: "Zone C" },
    { id: 5, name: "Wanlesswadi", status: "red",    accuracy: 38, users: 27, nextSupply: "9:00 AM", delay: "3 hrs late",   zone: "Zone B" },
    { id: 6, name: "Gaokiwadi",   status: "yellow", accuracy: 72, users: 9,  nextSupply: "7:30 AM", delay: "1 hr late",    zone: "Zone C" },
  ];
  
  export const statusConfig = {
    green:  { label: "Water Flowing", color: "#059669", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.3)",  dot: "#10b981", emoji: "💧" },
    yellow: { label: "Coming Soon",   color: "#d97706", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  dot: "#f59e0b", emoji: "⏳" },
    red:    { label: "No Supply",     color: "#dc2626", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)",   dot: "#ef4444", emoji: "🚱" },
  };
  
  export const alertsData = [
    { id: 1, ward: "Miraj",       type: "outage",  message: "Water supply disrupted due to pump failure at main station", time: "2 hrs ago", icon: "🚨", severity: "high"   },
    { id: 2, ward: "Wanlesswadi", type: "outage",  message: "No supply expected until 9:00 AM tomorrow morning",         time: "3 hrs ago", icon: "⚠️", severity: "high"   },
    { id: 3, ward: "Sangli",      type: "delay",   message: "Supply delayed by 45 minutes — pipeline maintenance",       time: "5 hrs ago", icon: "🔧", severity: "medium" },
    { id: 4, ward: "Vishrambag",  type: "restore", message: "Water supply restored after 2-hour outage",                 time: "6 hrs ago", icon: "✅", severity: "low"    },
    { id: 5, ward: "Kupwad",      type: "update",  message: "Corporation announces extra supply on Sunday 6–9 AM",       time: "8 hrs ago", icon: "📢", severity: "info"   },
  ];