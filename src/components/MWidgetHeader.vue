<template>
  <div
    class="header"
    style="
      display: flex;
      align-content: space-between;
      justify-content: space-between;
    "
  >
    <h1 class="title" style="font-size: 15pt">{{ title }}</h1>
    <div class="img" style="height: 100%; display: flex; align-items: center">
      <img
        v-if="actionImg"
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
    default: "",
  },
});

defineEmits(["click:icon"]);
</script>

<style></style>
