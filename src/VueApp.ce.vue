<template>
  <div class="main-app" style="position: relative">
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
      style="position: absolute; top: 20px; right: 16px"
      @click="isSettingsOn = !isSettingsOn"
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
    <OSettings v-if="isSettingsOn" @click:close="isSettingsOn = false" />
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
import { computed, onMounted, Ref, ref } from "vue";

import OWeatherCard from "@/components/OWeatherCard.vue";
import OSettings, { TDataRow } from "@/components/OSettings.vue";
import MWidgetHeader from "@/components/MWidgetHeader.vue";

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
  overflow: scroll;
  font-family: "Courier New", Courier, monospace;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

:deep(.weather-card) {
  display: flex;
  flex-direction: column;
  // > .header {
  //   display: flex;
  //   align-content: space-between;
  //   justify-content: space-between;

  //   > .title {
  //     font-size: 15pt;
  //   }

  //   > .img {
  //     height: 100%;
  //     display: flex;
  //     align-items: center;
  //   }
  // }

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
  height: 100%;
  display: flex;
  flex-direction: column;
  > .header {
    display: flex;
    flex-grow: 0;
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

  > .cities-container {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    > .data-row {
      display: flex;
      justify-content: space-between;
      min-height: 30px;
      background-color: lightgray;
      margin-top: 16px;
      padding: 4px 8px;

      > .wrapper {
        display: flex;
        align-items: center;

        > .burger {
        }

        > .title {
          margin-left: 10px;
        }
      }
    }
  }

  > .search-input {
    display: flex;
    flex-direction: column;
    flex-grow: 0;

    > .input-wrapper {
      display: flex;
      > .input {
        flex-grow: 1;
      }
    }
    > .title {
      font-size: 10pt;
    }
  }
}
</style>
