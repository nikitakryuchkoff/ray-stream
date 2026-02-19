export interface City {
  name: string;
  lat: number;
  lng: number;
  hub?: boolean;
}

export const cities: City[] = [
  { name: "TASHKENT", lat: 41.3, lng: 69.3, hub: true },
  { name: "HONG KONG", lat: 22.3, lng: 114.2 },
  { name: "GUANGZHOU", lat: 23.1, lng: 113.3 },
  { name: "DUBAI", lat: 25.2, lng: 55.3 },
  { name: "ISTANBUL", lat: 41.0, lng: 29.0 },
  { name: "MOSCOW", lat: 55.8, lng: 37.6 },
  { name: "ALMATY", lat: 43.2, lng: 76.9 },
  { name: "DUSHANBE", lat: 38.6, lng: 68.8 },
];
