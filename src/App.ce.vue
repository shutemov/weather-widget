<template>
  <div class="main-app" style="position: relative">
    <div>
      <slot name="test" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject, provide } from "vue";
import { onMounted } from "vue-demi";
import { set } from "./helpers/storage";
import { widgetIdKey } from "./symbols";
import { EStorageKeys } from "./types/storage";

onMounted(async () => {
  // eslint-disable-next-line no-undef
  const widgets: NodeListOf<Element> =
    document.querySelectorAll("weather-widget");

  const arrayIds = [...widgets].map(
    (item: Element) => (item.childNodes[0] as HTMLElement).innerHTML
  );

  const data = (widgets[0].childNodes[0] as HTMLElement).innerHTML;

  const widgetId = `${EStorageKeys.WidgetPrefix}-${data}`;

  await set({ key: "ids", value: JSON.stringify(arrayIds) });
  // await set({ key: widgetId, value: JSON.stringify([]) });
});
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-app {
  min-width: 200px;
  max-width: 350px;
  padding: 10px 16px;
  height: 450px;
  font-family: "Courier New", Courier, monospace;
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
