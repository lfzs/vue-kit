<template>
  <nav class="flex-center">
    <button @click="$router.push('/item/id')">index</button>
    |
    <button @click="$router.push('/item/id/status')">status</button>
  </nav>

  <router-view />
</template>

<script>
  export default {
    name: 'item',
  }
</script>
