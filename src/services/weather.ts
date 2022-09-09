import { TOpenWeatherSuccessRequest } from "@/types/openWeather";
import apiService from "@/services/apiService";

export default {
  async getWeather(query: string): Promise<TOpenWeatherSuccessRequest> {
    const data = await fetch(apiService.getWeather(query));
    return await data.json();
  },
};
