<template>
  <div class="flex-center">
    <img src="@/static/logo.png">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
</template>

<script>
  import { homeStore } from '@/store'
  export default {
    name: 'home',

    async setup() {
      await homeStore.tryFetchData()
      return {
        desc: 'Hello Vue!',
        homeStore,
      }
    },
  }
</script>

<style lang="less" scoped>
  img {
    width: 80px;
  }
</style>
