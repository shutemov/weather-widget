<template>
  <div class="main-app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
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
