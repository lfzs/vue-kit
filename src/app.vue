<template>
  <router-view v-slot="{ Component }">

    <suspense>
      <component :is="Component" />
      <template #fallback>
        <base-page-error v-if="error" :error="error" />
        <base-page-loading v-else />
      </template>
    </suspense>

  </router-view>
</template>

<script>
  import { ref, onErrorCaptured } from 'vue'
  export default {
    name: 'app',
    setup() {
      const error = ref(null)
      onErrorCaptured((e, instance, info) => (info === 'setup function') && (error.value = e)) // 只捕获 setup function 的 error

      return {
        error
      }
    }
  }
</script>
