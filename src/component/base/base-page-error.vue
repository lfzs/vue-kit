<template>
  <div class="base-page-error flex-center">
    {{ code }}{{ msg }}
  </div>
</template>

<script>
  export default {
    name: 'base-page-error',
    props: {
      msg: {
        type: String,
        default: '',
      },
      code: {
        type: Number,
        default: null
      },
    },
  }
</script>

<style lang="less" scoped>
  .base-page-error {
    height: calc(100 * var(--vh));
  }
</style>
