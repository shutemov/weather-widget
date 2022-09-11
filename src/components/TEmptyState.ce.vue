<template>
  <div>
    <MWidgetHeader
      :title="emptyStateHeader"
      action-img="https://api.iconify.design/typcn:cog-outline.svg"
      @click:icon="$router.push({ name: Route.Settings })"
    />
    <div class="empty-state-content">
      <img
        class="img"
        src="https://api.iconify.design/wi:day-haze.svg"
        width="200"
        height="200"
      />
      <h2 class="subtitle">The problem with getting your geolocation</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
<style scoped lang="scss">
</style>
