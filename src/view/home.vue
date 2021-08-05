<template>
  <div class="flex-center">
    <img src="@/static/logo.png" class="icon-logo">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { sleep } from '@/util/common'
  import { homeStore } from '@/store'

  export default defineComponent({
    name: 'home',

    async setup() {
      await sleep(200)
      await homeStore.fetchData()
      return {
        homeStore,
        desc: 'Hello Vue!',
      }
    },
  })
</script>
