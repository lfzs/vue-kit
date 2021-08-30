<template>
  <div class="flex-center">
    <img src="@/static/logo.png" class="icon-logo">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
</template>

<script lang="ts" setup>
  // import { homeStore } from '@/store'
  // await homeStore.fetchData()
  const desc = 'Hello Vue!'
</script>
