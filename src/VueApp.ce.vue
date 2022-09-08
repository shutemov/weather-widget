<template>
  <div class="main-app">
    <OSettings v-if="isSettingsOn" @click:close="isSettingsOn = false" />
    <OWeatherCard v-else @click:settings="isSettingsOn = true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import OWeatherCard from "./components/OWeatherCard.vue";
import OSettings from "./components/OSettings.vue";

import { OPEN_WEATHER_API_KEY } from "@/constants";

const isSettingsOn = ref(false);

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

.main-app {
  min-width: 200px;
  max-width: 350px;
  padding: 10px 16px;
  height: 500px;
  font-family: "Courier New", Courier, monospace;
}

:deep(.weather-card) {
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
      font-size: 30pt;
      font-weight: bold;
      flex-grow: 1;
      text-align: center;

      &::after {
        content: "°C";
      }
    }
  }

  > .weather-info {
    padding: 10px;

    > .info-row {
      &:not(:first-child) {
        margin-top: 15px;
      }

      display: flex;
      justify-content: space-between;

      > .wind-speed {
        display: flex;
        align-items: center;
        > .img {
          transform: rotate(90deg);
        }

        > .value {
          margin-left: 10px;
        }
      }
      > .pressure {
        display: flex;
        align-items: center;
        > .value {
          margin-left: 10px;
        }
      }
    }
  }
}

:deep(.settings-container) {
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
}
</style>
