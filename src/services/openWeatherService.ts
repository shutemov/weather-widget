import {
  TOpenWeatherGeoSuccessRequest,
  TOpenWeatherSuccessRequest,
} from "@/types/openWeather";

import { OPEN_WEATHER_API_KEY } from "@/constants";

export default {
  async getWeatherByCityAndCountry(
    query: string
  ): Promise<TOpenWeatherSuccessRequest> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
  async getWeatherByLatAndLon(
    lat: number,
    lon: number
  ): Promise<TOpenWeatherSuccessRequest> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
  async getCity(query: string): Promise<TOpenWeatherGeoSuccessRequest[]> {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${OPEN_WEATHER_API_KEY}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
};
