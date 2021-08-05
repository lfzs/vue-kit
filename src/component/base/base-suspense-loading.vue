<template>
  <div class="base-suspense-loading flex-center min-height-fullscreen">Loading...</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'base-suspense-loading',
  })
</script>

<style lang="less" scoped>
  @keyframes opacity {
    0% {
      opacity: 0.05;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.05;
    }
  }

  .base-suspense-loading {
    font-size: 16px;
    opacity: 0;
    animation: opacity 2s infinite 0.5s; // deplay 0.5s
  }
</style>
