<template>
  <div class="base-page-error flex-center" @click="onReload">
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

    emits: ['clearError'],

    setup(props, { emit }) {
      return {
        onReload() {
          emit('clearError')
          window.refreshCurrentRoute()
        },
      }
    },
  }
</script>

<style lang="less" scoped>
  .base-page-error {
    height: calc(100 * var(--vh));
  }
</style>
