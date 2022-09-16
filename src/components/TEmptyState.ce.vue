<template>
  <div class="empty-state-container">
    <MWidgetHeader
      action-img="https://api.iconify.design/fxemoji:wrench.svg"
      @click:icon="$router.push({ name: Route.Settings })"
    />
    <div class="empty-state-content">
      <img
        class="img"
        src="https://api.iconify.design/wi:day-haze.svg"
        width="200"
        height="200"
        alt="Logo: sunset"
      />
      <h2 class="subtitle">
        To work better, we need your permission to use geolocation, please
        activate it in the upper right corner or by clicking button
      </h2>
      <button class="button" @click="handlePermission">
        I have enabled geolocation
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";
import { Route } from "@/router";
import { getCurrentPosition } from "@/helpers/geoPosition";

const router = useRouter();

const handlePermission = async () => {
  try {
    await getCurrentPosition();
    router.push({ name: Route.Home });
  } catch (err) {
    return;
  }
};
</script>

<style scoped lang="scss">
.empty-state-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .empty-state-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    > .img {
      filter: invert(52%) sepia(45%) saturate(13%) hue-rotate(59deg)
        brightness(95%) contrast(91%);
    }

    > .subtitle {
      text-align: center;
      font-size: 12pt;
      color: #888;
      font-weight: 400;
    }

    > .button {
      background-color: lightblue;
      color: white;
      border: none;
      height: 40px;
      border-radius: 5px;
      font-size: 12pt;
      padding: 0 8px;
      margin-top: 5px;
    }
  }
}
</style>
