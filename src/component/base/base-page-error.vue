<template>
  <div class="base-page-error flex-center" @click="onReload">
    {{ code }}{{ msg }}
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { getErrorMessage } from '@/util'

  export default {
    name: 'base-page-error',
    props: {
      error: {
        type: Object,
        default: () => ({}),
      },
    },

    setup(props) {
      return {
        msg: computed(() => getErrorMessage(props.error?.response?.data)),
        code: computed(() => props.error?.response?.status),
        onReload: () => window.refreshCurrentRoute(),
      }
    },
  }
</script>

<style lang="less" scoped>
  .base-page-error {
    height: calc(100 * var(--vh));
  }
</style>
