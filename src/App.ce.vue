<template>
  <div class="main-app" style="position: relative">
    <div>
      <slot name="test" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

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
