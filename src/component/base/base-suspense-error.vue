<template>
  <div class="base-suspense-error flex-center min-height-fullscreen" @click="$emit('refresh')">
    {{ message }}
  </div>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import { getErrorMessage } from '@/util/common'

  export default defineComponent({
    name: 'base-suspense-error',
    emits: ['refresh'],
    props: {
      error: {
        type: Object,
        default: () => ({}),
      },
    },

    setup(props) {
      return {
        message: computed(() => getErrorMessage(props.error)),
      }
    },
  })
</script>
