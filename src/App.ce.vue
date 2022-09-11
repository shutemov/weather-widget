<template>
  <div class="main-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
.main-app {
  min-width: 200px;
  max-width: 285px;
  padding: 10px 16px;
  height: 450px;
  font-family: "Open Sans", "Courier New", sans-serif;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
