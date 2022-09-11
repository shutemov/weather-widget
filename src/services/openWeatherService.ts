import { TOpenWeatherSuccessRequest } from "@/types/openWeather";

import apiService from "@/services/apiService";
import { TCity } from "@/types/types";

export default {
  async getWeatherByCityAndCountry(
    query: string
  ): Promise<TOpenWeatherSuccessRequest> {
    const data = await fetch(apiService.getWeatherByCityAndCountry(query));
    return await data.json();
  },
  async getWeatherByLatAndLon(
    lat: number,
    lon: number
  ): Promise<TOpenWeatherSuccessRequest> {
    const data = await fetch(apiService.getWeatherByLatAndLon(lat, lon));
    return await data.json();
  },
  async getCity(query: string): Promise<TCity[]> {
    const data = await fetch(apiService.getCity(query));
    return await data.json();
  },
};
