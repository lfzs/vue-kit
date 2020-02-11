<template>
  <div>
    <h2 @click="log">nav</h2>
    <span v-for="item in nav" :key="item">{{ item }}</span>
  </div>
</template>

<script>
  import { sleep } from '@/util'
  export default {
    name: 'base-nav',
    data() {
      return {
        nav: [1, 2, 3, 4, 6],
      }
    },

    async mounted() {
      await sleep(5000)
      await axios.get('home/horizontal_data')
    },

    methods: {
      log() {
        this.nav.push('666')
        axios.get('home/horizontal_data')
      },
    },
  }
</script>

<style lang="less" scoped>
  span {
    border: 1px solid #000;
  }
</style>
