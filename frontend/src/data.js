export const wardData = [
  { id:1, name:"Vishrambag",  zone:"Zone C", status:"green",  accuracy:91, nextSupply:"6:00 AM", delay:"On Time",     users:84 },
  { id:2, name:"Miraj",       zone:"Zone B", status:"red",    accuracy:43, nextSupply:"8:30 AM", delay:"2.5 hrs late",users:31 },
  { id:3, name:"Sangli Camp", zone:"Zone A", status:"yellow", accuracy:67, nextSupply:"7:00 AM", delay:"45 min late", users:18 },
  { id:4, name:"Gaokiwadi",   zone:"Zone C", status:"green",  accuracy:87, nextSupply:"6:30 AM", delay:"On Time",     users:12 },
  { id:5, name:"Wanlesswadi", zone:"Zone D", status:"red",    accuracy:38, nextSupply:"9:00 AM", delay:"3 hrs late",  users:22 },
  { id:6, name:"Kupwad",      zone:"Zone E", status:"yellow", accuracy:72, nextSupply:"7:30 AM", delay:"30 min late", users:19 },
];

export const statusConfig = {
  green:  { label:"Water Flowing", emoji:"💧", color:"#16a34a", bg:"rgba(220,252,231,0.8)" },
  yellow: { label:"Coming Soon",   emoji:"⏳", color:"#d97706", bg:"rgba(254,243,199,0.8)" },
  red:    { label:"No Supply",     emoji:"🚱", color:"#dc2626", bg:"rgba(254,226,226,0.8)" },
};