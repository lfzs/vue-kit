<template>
  <div>
    <router-link to="/order/detail">detail</router-link>
    <router-link to="/order">list</router-link>
    <router-view />
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scop>
  div {
    border: 1px solid blue;
  }
</style>
