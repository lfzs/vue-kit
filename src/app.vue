<template>
  <router-view v-slot="{ Component, route }">
    <template v-if="active">
      <base-page :component="Component" :suspense="route.meta.suspense" />
    </template>
  </router-view>
</template>

<script>
  import { ref, nextTick } from 'vue'
  export default {
    name: 'app',
    setup() {

      // 路由重载
      const active = ref(true)
      window.refreshCurrentRoute = () => {
        active.value = false
        nextTick(() => active.value = true)
      }

      return {
        active,
      }
    }
  }
</script>
