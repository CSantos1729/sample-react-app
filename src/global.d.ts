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

interface DaysData {
  city: string;
  dayOne: number;
  dayTwo: number;
  dayThree: number;
  
}

interface SpaceWeatherData {
  date: string;
  solarWindSpeed: number;
  geomagneticStorm: number;
  // Add more fields as needed based on the response from your API
}
