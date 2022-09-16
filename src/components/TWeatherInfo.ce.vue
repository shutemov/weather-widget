<template>
  <div class="toast-wrapper" v-for="name in toasts" :key="name">
    <MToast :text="`😔 Can't get data in ${name}`" />
  </div>

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
import MToast from "@/components/MToast.ce.vue";

import { getCurrentPosition } from "@/helpers/geoPosition";
import { EStorageKeys, TDataRow } from "@/types/types";
import {
  TOpenWeatherError,
  TOpenWeatherSuccessRequest,
} from "@/types/openWeather";
import { Route } from "@/router";
import openWeatherService from "@/services/openWeatherService";

const cities: Ref<TDataRow[]> = ref([]);
const openWeatherData: Ref<TOpenWeatherSuccessRequest[]> = ref([]);
const toasts: Ref<string[]> = ref([]);

const router = useRouter();

onMounted(async () => {
  const data = localStorage.getItem(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];

  if (!cities.value.length) {
    handleEmptyState();
    return;
  }

  await getWeatherForAllCities();
});

const handleEmptyState = async () => {
  const permissions = await navigator.permissions.query({
    name: "geolocation",
  });

  if (permissions.state === "granted") {
    const geoPosition = await getCurrentPosition();
    const { latitude, longitude } = geoPosition.coords;
    const weather = await openWeatherService.getWeatherByLatAndLon(
      latitude,
      longitude
    );
    openWeatherData.value.push(weather);

    return;
  }
  router.push({ name: Route.HomeEmpty });
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
        if (!toasts.value.includes(name)) toasts.value.push(name);
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

  > :deep(.weather-card) {
    &:first-of-type {
      > .header {
        width: 75%;
        > .title {
          padding-right: 12px;
        }
      }
    }
  }
}

.toast-wrapper {
  &:not(:first-of-type) {
    margin-top: 8px;
  }
}
</style>
