<template>
  <div class="flex-center" @click="$router.push('signin')">
    <img src="@/static/logo.png" class="icon-logo">
  </div>
  <h2 class="flex-center" @click="globalStore.incRouterKey">{{ desc }}</h2>
  <div>{{ homeStore._fetchDataState }}</div>
  <base-client-only>
    <count-down :end="1690492642042" />
  </base-client-only>
  <div>{{ homeStore.data }}</div>
</template>

<script setup>
  import { onFetch } from '@/util'
  import { CountDown } from '@/component/common'
  import { useGlobalStore, useHomeStore } from '@/store'
  import { useHead } from '@vueuse/head'
  const homeStore = useHomeStore()
  const globalStore = useGlobalStore()

  await onFetch(async () => {
    await homeStore.fetchData()
  })

  useHead({
    title: Object.keys(homeStore.data),
  })

  const desc = 'Hello Vue!'
</script>
