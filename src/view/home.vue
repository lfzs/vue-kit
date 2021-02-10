<template>
  <div class="flex-center">
    <img src="@/static/logo.png">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
</template>

<script>
  export default {
    name: 'home',

    setup() {
      return {
        desc: 'Hello Vue!'
      }
    },
  }
</script>

<style lang="less" scoped>
  img {
    width: 80px;
  }
</style>
