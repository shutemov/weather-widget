<template>
  <div v-if="isShow" class="toast" @click="$emit('click:toast')">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const isShow = ref(true);

const props = defineProps({
  text: { type: String },
  timeout: {
    type: Number,
    default: 2000,
  },
  withoutTimer: {
    type: Boolean,
  },
});

defineEmits(["click:toast"]);

onMounted(() => {
  console.log("mounted");
  if (props.withoutTimer) return;
  setTimeout(() => {
    isShow.value = false;
  }, props.timeout);
});
</script>

<style lang="scss" scoped>
.toast {
  width: 100%;
  min-height: 50px;
  padding: 4px;
  background-color: rgb(248, 231, 185);
  border-color: black;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
