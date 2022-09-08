<template>
  <div class="weather-card">
    <div class="header">
      <h1 class="title">{{ city }}, {{ country }}</h1>
      <div class="gear">
        <img
          class="image"
          alt="settings"
          width="30"
          height="30"
          src="https://api.iconify.design/typcn:cog-outline.svg"
        />
      </div>
    </div>
    <div class="temperature-info">
      <img
        class="image"
        :alt="`Weather state: ${weatherTitle}`"
        :src="iconSrc"
      />
      <div class="temperature">{{ wholePartOfTemp }}</div>
    </div>
    <div class="description">
      Feels like {{ feelsLikeTemp }}. {{ weatherTitle }}.
      {{ capitalizedWeatherDescription }}.
    </div>
    <div class="weather-info">
      <div class="info-row">
        <div class="wind-speed">
          <img
            class="img"
            alt="Wind direction"
            :width="weatherInfoImgSize"
            :height="weatherInfoImgSize"
            src="https://api.iconify.design/typcn:location-arrow.svg"
          />
          <span class="value">{{ windSpeed }} m/s SSE</span>
        </div>
        <div class="pressure">
          <img
            class="img"
            :width="weatherInfoImgSize"
            :height="weatherInfoImgSize"
            src="https://api.iconify.design/wi:barometer.svg"
            alt="barometer"
          />
          <span class="value">{{ pressure }} hPa</span>
        </div>
      </div>
      <div class="info-row">
        <div class="humidity">Humidity: {{ humidity }}%</div>
        <div class="dew-point">
          <span class="value">Dew point: 111 °C</span>
        </div>
      </div>
      <div class="info-row">Visibility: {{ visibilityM2Km }}km</div>
    </div>
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
  } = mockData;

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
</script>

<style lang="scss" scoped>
.weather-card {
  > .header {
    display: flex;
    align-content: space-between;
  }
}
</style>
