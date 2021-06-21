<template>
  <router-view v-slot="{ Component, route }" v-if="active">
    <base-page :component="Component" :route="route" />
  </router-view>
</template>

<script>
  import { provide, ref, nextTick } from 'vue'
  export default {
    name: 'app',

    setup() {
      // 路由重载
      const active = ref(true)
      const refreshCurrentRoute = () => {
        active.value = false
        nextTick(() => active.value = true)
      }
      provide('refreshCurrentRoute', refreshCurrentRoute)
      return {
        active,
        refreshCurrentRoute
      }
    }
  }
</script>
