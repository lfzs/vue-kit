<template>
  <div class="base-page-loading flex-center">
    loading...
  </div>
</template>

<script>
  export default {
    name: 'base-page-loading',
  }
</script>

<style lang="less" scoped>
  .base-page-loading {
    height: calc(100 * var(--vh));
  }
</style>
