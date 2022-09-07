<template>
  <div class="main-app">
    <OWeatherCard />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import OWeatherCard from "./components/OWeatherCard.vue";

import { OPEN_WEATHER_API_KEY } from "@/constants";

onMounted(async () => {
  console.log(OPEN_WEATHER_API_KEY);
});
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

:deep(.title) {
  font-size: 35px !important;
  color: lightpink;
}
</style>
