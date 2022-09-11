<template>
  <div class="template-wrapper">
    <img
      src="https://api.iconify.design/typcn:cog-outline.svg"
      width="30"
      height="30"
      class="cog"
      @click="$router.push({ name: Route.Settings })"
    />
    <OWeatherCard
      v-for="(item, index) in openWeatherData"
      :key="index"
      :city-data="item"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";

import OWeatherCard from "@/components/OWeatherCard.ce.vue";
import OSettings from "@/components/OSettings.ce.vue";

import { get } from "@/helpers/storage";
import { EStorageKeys, TDataRow } from "@/types/types";
import { TOpenWeatherSuccessRequest } from "@/types/openWeather";
import { Route } from "@/router";
import openWeatherService from "@/services/openWeatherService";

const cities: Ref<TDataRow[]> = ref([]);
const openWeatherData: Ref<TOpenWeatherSuccessRequest[]> = ref([]);

const router = useRouter();

onMounted(async () => {
  const data = await get(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];

  if (!cities.value.length) {
    navigator.geolocation.getCurrentPosition(
      async (geoLocationPosition) => {
        const { latitude, longitude } = geoLocationPosition.coords;
        const weather = await openWeatherService.getWeatherByLatAndLon(
          latitude,
          longitude
        );
        openWeatherData.value.push(weather);
      },
      (data) => {
        console.log("error", data);
        router.push({ name: Route.HomeEmpty });
      }
    );
  }

  (async () => {
    for (const { name } of cities.value) {
      const cityWeather = await openWeatherService.getWeatherByCityAndCountry(
        name
      );
      openWeatherData.value.push(cityWeather);
    }
  })();
});
</script>

<style scoped lang="scss">
.template-wrapper {
  position: relative;

  > .cog {
    position: absolute;
    top: 12px;
    right: 0px;
  }
}
</style>
