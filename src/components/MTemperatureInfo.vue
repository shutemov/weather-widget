<template>
  <div class="temperature-info">
    <img class="image" :alt="`Weather state: ${weatherTitle}`" :src="iconSrc" />
    <div class="temperature">{{ temperature }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  weatherTitle: { type: String, default: "" },
  temperature: { type: Number, default: 0 },
  iconSrc: {
    type: String,
    default: "https://api.iconify.design/typcn:cog-outline.svg",
  },
});

defineEmits(["click:settings"]);
</script>

<style></style>
