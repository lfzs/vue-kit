<template>
  <div class="base-page-loading flex-center">Loading...</div>
</template>

<script>
  export default {
    name: 'base-page-loading',
  }
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

  .base-page-loading {
    height: calc(100 * var(--vh));
    font-size: 16px;
    opacity: 0;
    animation: opacity 3s infinite 2s;
  }
</style>
