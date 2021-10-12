<template>
  <keep-alive v-for="item of components" :key="item.fullPath">
    <base-suspense
      v-if="(item.fullPath === $route.fullPath) && $route.meta.keepAlive"
      :component="item.component"
      :suspense="$route.meta.suspense"
      @refresh="() => global.incRouterKey()"
    />
  </keep-alive>

  <base-suspense
    v-if="!$route.meta.keepAlive"
    :component="component"
    :suspense="$route.meta.suspense"
    @refresh="() => global.incRouterKey()"
  />
</template>

<script setup>
  import { watch, onBeforeUnmount, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import { useGlobalStore } from '@/store'
  const global = useGlobalStore()

  const props = defineProps({
    component: {
      type: Object,
      default: () => ({})
    },
  })

  const components = reactive([])
  const route = useRoute()
  const stoper = watch(() => props.component, newValue => {
    const { forward = true } = route.meta
    if (forward) {
      components.push({ fullPath: route.fullPath, component: newValue })
    } else {
      // 后退删除后面所有路由
      const index = components.findIndex(c => c.fullPath === route.fullPath)
      if (index > -1) components.splice(index + 1)
    }
  }, { immediate: true })

  onBeforeUnmount(() => stoper())
</script>
