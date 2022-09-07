<template>
  <div class="weather-card">
    <div class="header">
      <h1 class="title">{{ city }}, {{ country }}</h1>
      <div class="gear">
        <img class="image" width="30" height="30" src="@/assets/svg/gear.svg" />
      </div>
    </div>
    <div class="temperature-info">
      <img class="image" :src="iconSrc" />
      <div class="temperature">{{ temp }}</div>
    </div>
    <div class="description">
      Feels like {{ feelsLikeTemp }}. {{ weatherTitle }}.
      {{ capitalizedWeatherDescription }}.
    </div>
    <div class="weather-info" />
  </div>
</template>

<script lang="ts" setup>
import mockData from "@/assets/mockWeather.json";
import { computed, onMounted, ref } from "vue";

const feelsLikeTemp = ref(0);
const temp = ref(0);
const city = ref("");
const country = ref("");
const icon = ref("");
const weatherTitle = ref("");
const weatherDescription = ref("");

onMounted(() => {
  const {
    name,
    sys: { country: _country },
    weather: [{ icon: _icon, main: main, description: description }],
    main: { feels_like: _feels_like, temp: _temp },
  } = mockData;

  console.log(name, _country);

  city.value = name;
  country.value = _country;
  icon.value = _icon;
  feelsLikeTemp.value = _feels_like;
  weatherTitle.value = main;
  weatherDescription.value = description;
  temp.value = _temp;
});

const iconSrc = computed(
  () => `http://openweathermap.org/img/wn/${icon.value}@4x.png`
);
const capitalizedWeatherDescription = computed(
  () =>
    weatherDescription.value.charAt(0).toUpperCase() +
    weatherDescription.value.slice(1)
);
</script>

<style lang="scss" scoped>
.weather-card {
  > .header {
    display: flex;
    align-content: space-between;
  }
}
</style>
