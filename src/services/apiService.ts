import { OPEN_WEATHER_API_KEY } from "../constants";

export default {
  getWeather(query: string): string {
    return `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
  },
};
