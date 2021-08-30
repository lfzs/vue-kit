<template>
  <router-view v-slot="{ Component }" v-if="active">
    <base-page :component="Component" />
  </router-view>
</template>

<script lang="ts" setup>
  import { provide } from 'vue'
  import { useRefreshCurrentRoute } from '@/hook/router'

  const { active, refreshCurrentRoute } = useRefreshCurrentRoute()
  provide('refreshCurrentRoute', refreshCurrentRoute)
</script>

