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
defineEmits(["click:close"]);
</script>

<style scoped lang="scss"></style>
