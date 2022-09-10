import { TOpenWeatherSuccessRequest } from "@/types/openWeather";

import apiService from "@/services/apiService";
import { TCity } from "@/types/types";

export default {
  async getWeather(query: string): Promise<TOpenWeatherSuccessRequest> {
    const data = await fetch(apiService.getWeather(query));
    return await data.json();
  },
  async getCity(query: string): Promise<TCity[]> {
    const data = await fetch(apiService.getCity(query));
    return await data.json();
  },
};
