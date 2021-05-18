<template>
  <div class="flex-center">
    <img src="@/static/logo.png" class="icon-logo">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
</template>

<script>
  export default {
    name: 'home',

    setup() {
      return {
        desc: 'Hello Vue!',
      }
    },
  }
</script>
