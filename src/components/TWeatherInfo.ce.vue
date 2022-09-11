<template>
  <div class="template-wrapper">
    <img
      src="https://api.iconify.design/fxemoji:wrench.svg"
      width="30"
      height="30"
      class="cog"
      @click="$router.push({ name: Route.Settings })"
    />
    <img
      src="https://api.iconify.design/heroicons-outline:refresh.svg"
      width="30"
      height="30"
      class="update"
      @click="handleUpdate"
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
import {
  TOpenWeatherError,
  TOpenWeatherSuccessRequest,
} from "@/types/openWeather";
import { Route } from "@/router";
import openWeatherService from "@/services/openWeatherService";

const cities: Ref<TDataRow[]> = ref([]);
const openWeatherData: Ref<TOpenWeatherSuccessRequest[]> = ref([]);

const router = useRouter();

onMounted(async () => {
  const data = await get(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];

  if (!cities.value.length) {
    handleEmptyState();
    return;
  }

  await getWeatherForAllCities();
});

const handleEmptyState = async () => {
  await navigator.permissions.query({ name: "geolocation" }).then(
    async () => {
      navigator.geolocation.getCurrentPosition(
        async (geoLocationPosition) => {
          const { latitude, longitude } = geoLocationPosition.coords;
          const weather = await openWeatherService.getWeatherByLatAndLon(
            latitude,
            longitude
          );
          openWeatherData.value.push(weather);
        },
        () => {
          router.push({ name: Route.HomeEmpty });
        }
      );
    },
    (err) => {
      console.error("err", err);
    }
  );
};

const getWeatherForAllCities = async () => {
  for (const { name } of cities.value) {
    try {
      const cityWeather = await openWeatherService.getWeatherByCityAndCountry(
        name
      );
      openWeatherData.value.push(cityWeather);
    } catch (error) {
      const err = error as TOpenWeatherError;

      if (err.message === "city not found") {
        alert(`We can't get weather data in: ${name}`);
      }

      cities.value = cities.value.filter((item) => item.name !== name);

      if (!cities.value.length) {
        handleEmptyState();
      }

      continue;
    }
  }
};

const handleUpdate = async () => {
  openWeatherData.value = [];

  if (!cities.value.length) {
    handleEmptyState();
    return;
  }

  await getWeatherForAllCities();
};
</script>

<style scoped lang="scss">
.template-wrapper {
  position: relative;

  > .cog {
    position: absolute;
    top: 12px;
    right: 0px;
  }

  > .update {
    position: absolute;
    top: 12px;
    right: 40px;
  }
}
</style>
