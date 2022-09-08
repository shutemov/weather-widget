<template>
  <div class="settings-container">
    <MWeatherCardHeader
      title="Settings"
      actionImg="https://api.iconify.design/heroicons-outline:x.svg"
      @click:icon="$emit('click:close')"
    />
  </div>
</template>

<script setup lang="ts">
import MWeatherCardHeader from "./MWeatherCardHeader.vue";

import { Ref, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import draggable from "vuedraggable";

import { OPEN_WEATHER_API_KEY } from "@/constants";

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

const addItem = () => {
  if (isValidQuery()) {
    cities.value.push({
      id: cities.value.length + 1,
      name: cityQuery.value,
    });

    cityQuery.value = "";
  }
};

const deleteItem = (id: number) => {
  cities.value = cities.value.filter((item) => item.id !== id);
};

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

</script>

<style scoped lang="scss"></style>
