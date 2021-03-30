<template>
  <suspense v-if="suspense">
    <component :is="component" />
    <template #fallback>
      <base-page-error v-if="error" :error="error" />
      <base-page-loading v-else />
    </template>
  </suspense>

  <component :is="component" v-else />
</template>

<script>
  import { ref, onErrorCaptured } from 'vue'

  export default {
    name: 'base-loading-screen',

    props: {
      suspense: {
        type: Boolean,
        default: false,
      },
      component: {
        type: Object,
        default: () => ({}),
      },
    },

    setup() {
      const error = ref(null)
      onErrorCaptured((e, instance, info) => (info === 'setup function') && (error.value = e)) // 只捕获 setup function 的 error
      return {
        error,
      }
    }
  }
</script>
