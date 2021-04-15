<template>
  <router-view v-slot="{ Component }">
    <template v-if="currentRoute">
      <base-page :component="Component" />
    </template>
  </router-view>
</template>

<script>
  import { currentRoute } from '@/store'
  export default {
    name: 'app',
    setup() {
      return {
        currentRoute,
      }
    }
  }
</script>
