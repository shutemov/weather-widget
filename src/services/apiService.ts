import { OPEN_WEATHER_API_KEY } from "@/constants";

export default {
  getWeatherByCityAndCountry(query: string): string {
    return `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  },
  getWeatherByLatAndLon(lat: number, lon: number): string {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  },
  getCity(query: string): string {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPEN_WEATHER_API_KEY}`;
  },
};
