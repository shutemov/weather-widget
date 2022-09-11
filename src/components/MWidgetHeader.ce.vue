<template>
  <div class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="img" v-if="actionImg">
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
    default: "",
  },
});

defineEmits(["click:icon"]);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-grow: 0;
  align-content: space-between;
  justify-content: space-between;

  > .title {
    font-size: 15pt;
  }

  > .img {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
