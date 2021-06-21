<template>
  <div class="base-suspense-error flex-center height-fullscreen" @click="$emit('refresh')">
    {{ message }}
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { getErrorMessage } from '@/util'

  export default {
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
  }
</script>

