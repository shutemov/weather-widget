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

:deep(.weather-card) {
  font-family: "Courier New", Courier, monospace;
  padding: 10px 16px;
  min-width: 200px;
  max-width: 300px;
  height: 500px;
  display: flex;
  flex-direction: column;
  > .header {
    display: flex;
    align-content: space-between;
    justify-content: space-between;

    > .title {
      font-size: 15pt;
    }

    > .gear {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  > .temperature-info {
    display: flex;
    justify-content: center;
    align-items: center;

    > .image {
      flex-grow: 1;
    }

    > .temperature {
      font-size: 25pt;
      font-weight: bold;
      flex-grow: 1;
      text-align: center;

      &::after {
        content: "°";
      }
    }
  }
}
</style>
