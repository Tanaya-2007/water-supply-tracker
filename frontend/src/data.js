import { cityData, statusConfig } from "./citydata";

// Flatten all wards from all cities into a single list
export const wardData = Object.values(cityData).flatMap(city => city.wards || []);

export { statusConfig };

