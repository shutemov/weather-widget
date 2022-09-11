import { TOpenWeatherSuccessRequest } from "@/types/openWeather";

import apiService from "@/services/apiService";
import { TCity } from "@/types/types";

export default {
  async getWeatherByCityAndCountry(
    query: string
  ): Promise<TOpenWeatherSuccessRequest> {
    const res = await fetch(apiService.getWeatherByCityAndCountry(query));
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
    const res = await fetch(apiService.getWeatherByLatAndLon(lat, lon));
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
  async getCity(query: string): Promise<TCity[]> {
    const res = await fetch(apiService.getCity(query));
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  },
};
