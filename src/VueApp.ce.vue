<template>
  <div class="main-app" style="position: relative">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, Ref, ref } from "vue";

import OWeatherCard from "@/components/OWeatherCard.ce.vue";
import OSettings, { TDataRow } from "@/components/OSettings.ce.vue";
import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";

import { get } from "@/helpers/storage";
import { EStorageKeys } from "@/types/storage";
import weather from "@/services/weather";
import { TOpenWeatherSuccessRequest } from "./types/openWeather";

const isSettingsOn = ref(false);
const cities = ref([]);
const openWeatherData: Ref<TOpenWeatherSuccessRequest[]> = ref([]);

onMounted(async () => {
  const data = await get(EStorageKeys.cities);
  cities.value = data !== null ? JSON.parse(data) : [];

  cities.value.forEach(async (city: TDataRow) => {
    const cityWeather = await weather.getWeather(city.name);
    openWeatherData.value.push(cityWeather);
  });
});

const headerTitle = computed(() =>
  cities.value.length ? (cities.value[0] as TDataRow).name : ""
);
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-app {
  min-width: 200px;
  max-width: 350px;
  padding: 10px 16px;
  height: 450px;
  font-family: "Courier New", Courier, monospace;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
