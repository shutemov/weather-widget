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
      />
      <h2 class="subtitle">
        There is a problem with getting your geolocation. Please select a city
        in the settings
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";
import { Route } from "@/router";

let timer: number;

const router = useRouter();

onMounted(async () => {
  navigator.geolocation.getCurrentPosition(
    () => {
      router.push({ name: Route.Home });
    },
    () => {
      timer = setInterval(() => {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state !== "denied")
              router.push({ name: Route.Home });
          });
      }, 2000);
    }
  );
});

onUnmounted(() => {
  clearInterval(timer);
});
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

    > .subtitle {
      text-align: center;
      font-size: 12pt;
      color: #888;
    }

    > .img {
      filter: invert(52%) sepia(45%) saturate(13%) hue-rotate(59deg)
        brightness(95%) contrast(91%);
    }
  }
}
</style>
