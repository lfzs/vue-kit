<template>
  <div>
    list
    <button @click="toDetail">to detail</button>
  </div>
</template>

<script>
  export default {

    methods: {
      toDetail() {
        this.$router.push('/order/detail')
      },
    },
  }
</script>
