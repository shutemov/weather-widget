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
</script>

<style scoped lang="scss"></style>
