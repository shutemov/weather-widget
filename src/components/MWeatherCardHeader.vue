<template>
  <div class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="gear">
      <img
        class="image"
        alt="Settings"
        :width="actionImgSize"
        :height="actionImgSize"
        :src="actionImg"
        @click="$emit('click:icon')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: "" },
  actionImgSize: { type: Number, default: 30 },
  actionImg: {
    type: String,
    default: "https://api.iconify.design/typcn:cog-outline.svg",
  },
});

defineEmits(["click:settings"]);
</script>

<style></style>
