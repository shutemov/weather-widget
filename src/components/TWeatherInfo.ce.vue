<template>
  <div class="template-wrapper">
    <h1
      v-if="!isSettingsOn && !cities.length"
      style="font-size: 15pt; width: 80%"
    >
      Please select a city in the settings
    </h1>
    <img
      v-if="!isSettingsOn"
      src="https://api.iconify.design/typcn:cog-outline.svg"
      width="30"
      height="30"
      style="position: absolute; top: 0px; right: 8px"
      @click="$router.push({ name: Route.Settings })"
    />
    <div
      v-if="!isSettingsOn && !cities.length"
      style="
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <img
        src="https://api.iconify.design/wi:day-haze.svg"
        width="200"
        height="200"
        style=""
        @click="isSettingsOn = !isSettingsOn"
      />
    </div>
    <OWeatherCard
      v-else
      v-for="(item, index) in openWeatherData"
      :key="index"
      :city-data="item"
      @click:settings="isSettingsOn = true"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";

import OWeatherCard from "@/components/OWeatherCard.ce.vue";
import OSettings, { TDataRow } from "@/components/OSettings.ce.vue";
import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";

import { get } from "@/helpers/storage";
import { EStorageKeys } from "@/types/types";
import openWeatherService from "@/services/openWeatherService";
import { TOpenWeatherSuccessRequest } from "@/types/openWeather";
import { Route } from "@/router";

const isSettingsOn = ref(false);
const cities: Ref<TDataRow[]> = ref([]);
const openWeatherData: Ref<TOpenWeatherSuccessRequest[]> = ref([]);

onMounted(async () => {
  const data = await get(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];

  (async () => {
    for (const city of cities.value) {
      const cityWeather = await openWeatherService.getWeather(city.name);
      openWeatherData.value.push(cityWeather);
    }
  })();
});
</script>

<style scoped lang="scss">
.template-wrapper {
  position: relative;
}
</style>
