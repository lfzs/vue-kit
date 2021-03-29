<template>
  <base-page-error v-if="error" :msg="msg" :code="code" />
  <base-page-loading v-else />
</template>

<script>

  import { getErrorMessage } from '@/util'
  import { computed } from 'vue'
  export default {
    name: 'base-fallback',
    props: {
      error: {
        type: Object,
        default: null,
      },
    },

    setup(props) {
      return {
        msg: computed(() => getErrorMessage(props.error?.response?.data)),
        code: computed(() => props.error?.response?.status),
      }
    }
  }
</script>
