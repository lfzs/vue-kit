<template>
  <keep-alive v-for="item of components" :key="item.fullPath">
    <base-suspense
      v-if="(item.fullPath === $route.fullPath) && $route.meta.keepAlive"
      :component="item.component"
      :suspense="$route.meta.suspense"
      @refresh="refreshCurrentRoute"
    />
  </keep-alive>

  <base-suspense
    v-if="!$route.meta.keepAlive"
    :component="component"
    :suspense="$route.meta.suspense"
    @refresh="refreshCurrentRoute"
  />
</template>

<script lang="ts" setup>
  import { watch, onBeforeUnmount, reactive, inject } from 'vue'
  import { useRoute } from 'vue-router'
  import type { RouteComponent } from 'vue-router'

  interface ComponentItem {
    fullPath: string,
    component: RouteComponent,
  }
  const props = defineProps<{
    // component: RouteComponent,
    // TODO vue defineProps 暂时不支持外部导入类型
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
  }>()

  const components = reactive<ComponentItem[]>([])

  const route = useRoute()
  const stoper = watch(() => props.component, (newValue: RouteComponent) => {
    if (route.meta.forward) {
      components.push({ fullPath: route.fullPath, component: newValue })
    } else {
      // 后退删除后面所有路由
      const index = components.findIndex(c => c.fullPath === route.fullPath)
      if (index > -1) components.splice(index + 1)
    }
  }, { immediate: true })

  const refreshCurrentRoute = inject('refreshCurrentRoute')
  onBeforeUnmount(() => stoper())
</script>
