<template>
  <div class="weather-info">
    <div class="info-row">
      <div class="wind-speed">
        <img
          class="img"
          alt="Wind direction"
          :width="weatherInfoImgSize"
          :height="weatherInfoImgSize"
          :src="windDirectionIcon"
        />
        <span class="value">{{ windSpeed }} m/s SSE</span>
      </div>
      <div class="pressure">
        <img
          class="img"
          :width="weatherInfoImgSize"
          :height="weatherInfoImgSize"
          :src="pressureIcon"
          alt="Barometer"
        />
        <span class="value">{{ pressure }} hPa</span>
      </div>
    </div>
    <div class="info-row">
      <div class="humidity">Humidity: {{ humidity }}%</div>
      <div class="visibility">Visibility: {{ visibility }}km</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  weatherInfoImgSize: { type: Number, default: 35 },
  windSpeed: { type: Number, default: 0 },
  pressure: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  visibility: { type: Number, default: 0 },
  windDirectionIcon: {
    type: String,
    default: "https://api.iconify.design/typcn:location-arrow.svg",
  },
  pressureIcon: {
    type: String,
    default: "https://api.iconify.design/wi:barometer.svg",
  },
});
</script>

<style></style>
