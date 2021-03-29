<template>
  <router-view v-slot="{ Component, route }">
    <template v-if="active">

      <suspense v-if="route.meta.suspense">
        <component :is="Component" />
        <template #fallback><base-fallback :error="error" /></template>
      </suspense>
      <component :is="Component" v-else />

    </template>
  </router-view>
</template>

<script>
  import { ref, nextTick, onErrorCaptured } from 'vue'
  export default {
    name: 'app',
    setup() {
      const error = ref(null)
      onErrorCaptured((e, instance, info) => (info === 'setup function') && (error.value = e))

      // 路由重载
      const active = ref(true)
      window.refreshCurrentRoute = () => {
        active.value = false
        nextTick(() => active.value = true)
      }

      return {
        error,
        active,
      }
    }
  }
</script>
