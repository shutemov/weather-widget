<template>
  <div class="settings-container">
    <MWeatherCardHeader
      title="Settings"
      actionImg="https://api.iconify.design/heroicons-outline:x.svg"
      @click:icon="$emit('click:close')"
    />

    <draggable
      class="cities-container"
      v-model="cities"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="isoCode"
      @change="handleDraggableChange"
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
          @keydown.enter="addItem"
          @input="debounceSuggestedCities"
          list="cityname"
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
import MWeatherCardHeader from "./MWeatherCardHeader.vue";

import { onMounted, Ref, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";

import { OPEN_WEATHER_API_KEY } from "@/constants";

import { get, set } from "@/helpers/storage";
import { EStorageKeys } from "@/types/storage";

type TCity = {
  name: string;
  isoCode: string;
};

type TDataRow = {
  id?: number;
  name: string;
};

const cities: Ref<TDataRow[]> = ref([]);
const suggestedCities: Ref<TCity[]> = ref([]);
const cityQuery = ref("");

const drag = ref(false);

defineEmits(["click:close"]);

onMounted(async () => {
  const data = await get(EStorageKeys.cities);
  cities.value = data !== null ? JSON.parse(data) : [];
});

const addItem = async () => {
  if (isValidQuery()) {
    cities.value.push({
      id: cities.value.length + 1,
      name: cityQuery.value,
    });

    await set({
      key: EStorageKeys.cities,
      value: JSON.stringify(cities.value),
    });

    cityQuery.value = "";
  }
};

const deleteItem = (id: number) => {
  cities.value = cities.value.filter((item) => item.id !== id);
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

const handleDraggableChange = async () => {
  console.log(cities.value);
  await set({ key: EStorageKeys.cities, value: JSON.stringify(cities.value) });
};
</script>

<style scoped lang="scss"></style>
