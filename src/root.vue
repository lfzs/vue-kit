<template>
  <!-- TODO remove key 变不会完全销毁实例 v-if -->
  <router-view v-slot="{ Component }" :key="globalStore.routerKey">
    <base-page :component="Component" />
  </router-view>
</template>

<script setup>
  import { useGlobalStore } from '@/store'
  const globalStore = useGlobalStore()
</script>
