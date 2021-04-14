<template>
  <router-view v-slot="{ Component }" v-if="active">
    <template v-if="Component">
      <base-page :component="Component" />
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
