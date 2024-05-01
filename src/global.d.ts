interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}

interface SeismicData {
  city: string;
  magnitute: number;
  latitude: number;
  longitude: number;
}

interface PlanetData {
  planet: string;
  mercury: number; 
  venus: number; 
  earth: number; 
  mars: number;
  jupiter: number; 
  saturn: number; 
  uranus: number; 
  neptune: number; 
  
}

interface SpaceWeatherData {
  date: string;
  solarWindSpeed: number;
  geomagneticStorm: number;
  
}

interface MarsWeatherData {
  sol: number;
  temperature: number;
  pressure: number;
  wind: number;
  
}
