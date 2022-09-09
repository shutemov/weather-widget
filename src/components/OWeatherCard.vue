<template>
  <div class="weather-card">
    <h1 style="font-size: 15pt">{{ countryTitle }}</h1>
    <MTemperatureInfo
      :weather-title="weatherTitle"
      :temperature="wholePartOfTemp"
      :icon-src="iconSrc"
    />
    <div class="description">
      Feels like {{ feelsLikeTemp }}. {{ capitalizedWeatherDescription }}.
    </div>
    <MAdditionalWeatherInfo
      :wind-speed="windSpeed"
      :pressure="pressure"
      :humidity="humidity"
      :visibility="visibilityM2Km"
    />
  </div>
</template>

<script lang="ts" setup>
import MTemperatureInfo from "./MTemperatureInfo.vue";
import MAdditionalWeatherInfo from "./MAdditionalWeatherInfo.vue";

import mockData from "@/assets/mockWeather.json";
import { computed, onMounted, ref, PropType } from "vue";
import { TOpenWeatherSuccessRequest } from "@/types/openWeather";

const feelsLikeTemp = ref(0);
const temp = ref(0);
const city = ref("");
const country = ref("");
const icon = ref("");
const weatherTitle = ref("");
const weatherDescription = ref("");
const humidity = ref(0);
const windSpeed = ref(0);
const windDeg = ref(0);
const pressure = ref(0);
const visibility = ref(0);

const weatherInfoImgSize = 25;

onMounted(() => {
  const {
    name,
    sys: { country: _country },
    weather: [{ icon: _icon, main: main, description: description }],
    main: {
      feels_like: _feels_like,
      temp: _temp,
      humidity: _humidity,
      pressure: _pressure,
    },
    wind: { speed: _speed, deg: _deg },
    visibility: _visibility,
  } = props.cityData ? props.cityData : mockData;

  city.value = name;
  country.value = _country;
  icon.value = _icon;
  feelsLikeTemp.value = _feels_like;
  weatherTitle.value = main;
  weatherDescription.value = description;
  temp.value = _temp;
  humidity.value = _humidity;
  windSpeed.value = _speed;
  windDeg.value = _deg;
  pressure.value = _pressure;
  visibility.value = _visibility;
});

const props = defineProps({
  cityData: {
    type: Object as PropType<TOpenWeatherSuccessRequest>,
  },
});

defineEmits(["click:settings"]);

const iconSrc = computed(
  () => `http://openweathermap.org/img/wn/${icon.value}@4x.png`
);

const capitalizedWeatherDescription = computed(
  () =>
    weatherDescription.value.charAt(0).toUpperCase() +
    weatherDescription.value.slice(1)
);

const visibilityM2Km = computed(() => visibility.value / 1000);

const wholePartOfTemp = computed(() => Math.trunc(temp.value));

const countryTitle = computed(() => city.value + ", " + country.value);

const handle = () => {
  console.log("handle settings click");
};
</script>

<style lang="scss"></style>
