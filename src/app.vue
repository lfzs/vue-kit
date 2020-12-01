<template>
  <div class="container">
    <keep-alive>
      <router-view v-if="$get($route, 'meta.keepAlive')" />
    </keep-alive>
    <router-view v-if="!$get($route, 'meta.keepAlive')" />
  </div>
</template>

<script>
  // 全局样式
  import 'normalize.css'
  import '@/style/app.less'

  export default {
    name: 'app',
  }
</script>
