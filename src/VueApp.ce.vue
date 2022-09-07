<template>
  <div class="main-app">
    <ComponentA />
  </div>
</template>

<script setup lang="ts">
import ComponentA from "./components/ComponentA.vue";
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

:deep(.title) {
  font-size: 35px !important;
  color: lightpink;
}
</style>
