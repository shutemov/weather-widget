<template>
  <div class="settings-container">
    <MWidgetHeader
      title="Settings"
      action-img="https://api.iconify.design/heroicons-outline:x.svg"
      @click="$router.push({ name: Route.Home })"
    />
    <draggable
      v-model="cities"
      class="cities-container"
      group="people"
      item-key="isoCode"
      @start="drag = true"
      @end="drag = false"
      @change="handleOrderChange"
    >
      <template #item="{ element }">
        <div class="data-row">
          <div class="wrapper">
            <img
              class="burger"
              width="20"
              height="20"
              src="https://api.iconify.design/mdi-light:format-line-spacing.svg"
            />
            <span class="title">
              {{ element.name }}
            </span>
          </div>
          <img
            src="https://api.iconify.design/mdi-light:delete.svg"
            @click="deleteItem(element.id)"
          />
        </div>
      </template>
    </draggable>
    <div class="search-input">
      <h1 class="title">Add location:</h1>
      <div class="input-wrapper">
        <input
          v-model="cityQuery"
          class="input"
          list="cityname"
          @keydown.enter="addItem"
          @input="debounceSuggestedCities"
        />
        <datalist id="cityname">
          <option
            v-for="(country, index) in suggestedCities"
            :key="index"
            :value="`${country.name}, ${country.isoCode}`"
          ></option>
        </datalist>
        <img
          class="enter"
          src="https://api.iconify.design/ion:add.svg"
          @keydown.enter="addItem"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MWidgetHeader from "./MWidgetHeader.ce.vue";

import { onMounted, Ref, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";

import MWidgetHeader from "./MWidgetHeader.ce.vue";

import openWeatherService from "@/services/openWeatherService";
import { get, set } from "@/helpers/storage";
import { EStorageKeys } from "@/types/types";
import { Route } from "@/router";
import { OPEN_WEATHER_API_KEY } from "@/constants";
import { TCity, TDataRow } from "@/types/types";

const cities: Ref<TDataRow[]> = ref([]);
const suggestedCities: Ref<TCity[]> = ref([]);
const cityQuery = ref("");

const drag = ref(false);

defineEmits(["click:close"]);

onMounted(async () => {
  const data = await get(EStorageKeys.Cities);
  cities.value = data !== null ? JSON.parse(data) : [];
});

const addItem = async () => {
  if (isValidQuery()) {
    cities.value.push({
      id: cities.value.length + 1,
      name: cityQuery.value,
    });

    await updateLocalStorage();

    cityQuery.value = "";
  }
};

const deleteItem = async (id: number) => {
  cities.value = cities.value.filter((item) => item.id !== id);
  await updateLocalStorage();
};

const debounceSuggestedCities = useDebounceFn(async () => {
  await getSuggestedCities();
}, 1000);

const getSuggestedCities = async () => {
  if (!cityQuery.value) return;

  const normalizedQueryString = normalizeString(cityQuery.value);

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${normalizedQueryString}&limit=5&appid=${OPEN_WEATHER_API_KEY}`
  );
  const data = await res.json();

  suggestedCities.value = distinctCitiesByIsoCode(data).map(
    ({ name, country: isoCode }: any) => ({
      name,
      isoCode,
    })
  );
};

const isValidQuery = () => {
  const preparedQueryString = normalizeString(cityQuery.value);

  const isQueryValid = !!suggestedCities.value.find((country) => {
    const targetString = `${country.name}, ${country.isoCode}`;
    const normalizedString = normalizeString(targetString);

    return preparedQueryString === normalizedString;
  });

  return isQueryValid;
};

const normalizeString = (str: string) =>
  str.replace(/\s/g, "").toLowerCase().trim();
  str
    .split(",")
    .map((item) => item.trim())
    .join(",");

const distinctCitiesByIsoCode = (cities: TCity[]) => {
  const uniqueIsoCode: string[] = [];

  return cities.filter((country: any) => {
    const isDuplicate = uniqueIsoCode.includes(country.country);

    if (!isDuplicate) {
      uniqueIsoCode.push(country.country);

      return true;
    }

    return false;
  });
};

const handleOrderChange = async () => {
  await updateLocalStorage();
};

const updateLocalStorage = async () =>
  await set({ key: EStorageKeys.Cities, value: JSON.stringify(cities.value) });
</script>

<style scoped lang="scss">
.settings-container {
  height: 100%;
  display: flex;
  flex-direction: column;

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

        > .title {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
