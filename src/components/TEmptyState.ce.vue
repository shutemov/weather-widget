<template>
  <div>
    <MWidgetHeader
      :title="emptyStateHeader"
      action-img="https://api.iconify.design/typcn:cog-outline.svg"
      @click:icon="$router.push({ name: Route.Settings })"
    />
    <div class="empty-state-content">
      <img
        class="img"
        src="https://api.iconify.design/wi:day-haze.svg"
        width="200"
        height="200"
      />
      <h2 class="subtitle">The problem with getting your geolocation</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

import MWidgetHeader from "@/components/MWidgetHeader.ce.vue";
import { Route } from "@/router";

const emptyStateHeader = ref("Please select a city in the settings");
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
.empty-state-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > .subtitle {
    text-align: center;
  }
}
</style>
