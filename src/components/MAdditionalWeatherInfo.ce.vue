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
          :style="{ transform: `rotate(${windDeg}deg)` }"
        />
        <span class="value">{{ windSpeed }} m/s {{ windDirection }}</span>
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
import { computed } from "vue-demi";

const props = defineProps({
  weatherInfoImgSize: { type: Number, default: 35 },
  windSpeed: { type: Number, default: 0 },
  windDeg: { type: Number, default: 0 },
  pressure: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  visibility: { type: Number, default: 0 },
  windDirectionIcon: {
    type: String,
    default: "https://api.iconify.design/humbleicons:arrow-up.svg",
  },
  pressureIcon: {
    type: String,
    default: "https://api.iconify.design/wi:barometer.svg",
  },
});

enum CardinalDirections {
  North = "N",
  NorthNorthEast = "NNE",
  NorthEast = "NE",
  EastNorthEast = "ENE",
  East = "E",
  EastSouthEast = "ESE",
  SouthEast = "SE",
  SouthSouthEast = "SSE",
  South = "S",
  SouthSouthWest = "SSW",
  SouthWest = "SW",
  WestSouthWest = "WSW",
  West = "W",
  WestNorthWest = "WNW",
  NorthWest = "NW",
  NorthNorthWest = "NNW",
}

const windDirection = computed(() => {
  if (props.windDeg < 10) return CardinalDirections.North;
  if (props.windDeg > 10 && props.windDeg < 30)
    return CardinalDirections.NorthNorthEast;
  if (props.windDeg >= 30 && props.windDeg < 55)
    return CardinalDirections.NorthEast;
  if (props.windDeg >= 55 && props.windDeg < 80)
    return CardinalDirections.EastNorthEast;
  if (props.windDeg >= 80 && props.windDeg < 100)
    return CardinalDirections.East;
  if (props.windDeg >= 100 && props.windDeg < 125)
    return CardinalDirections.EastSouthEast;
  if (props.windDeg >= 125 && props.windDeg < 145)
    return CardinalDirections.SouthEast;
  if (props.windDeg >= 145 && props.windDeg < 170)
    return CardinalDirections.SouthSouthEast;
  if (props.windDeg >= 170 && props.windDeg < 190)
    return CardinalDirections.South;
  if (props.windDeg >= 190 && props.windDeg < 215)
    return CardinalDirections.SouthSouthWest;
  if (props.windDeg >= 215 && props.windDeg < 235)
    return CardinalDirections.SouthWest;
  if (props.windDeg >= 235 && props.windDeg < 260)
    return CardinalDirections.WestSouthWest;
  if (props.windDeg >= 260 && props.windDeg < 280)
    return CardinalDirections.West;
  if (props.windDeg >= 280 && props.windDeg < 305)
    return CardinalDirections.WestNorthWest;
  if (props.windDeg >= 305 && props.windDeg < 325)
    return CardinalDirections.NorthWest;
  if (props.windDeg >= 325 && props.windDeg < 350)
    return CardinalDirections.NorthNorthWest;
  if (props.windDeg >= 350 && props.windDeg < 360)
    return CardinalDirections.North;
});
</script>

<style scoped lang="scss">
.weather-info {
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
</style>
