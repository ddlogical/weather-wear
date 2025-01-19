export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number
}

export interface CityLocal {
  city: string;
  lat: number;
  lon: number
}