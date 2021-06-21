<template>
  <keep-alive v-for="item of components" :key="item.fullPath">
    <base-suspense
      v-if="(item.fullPath === route.fullPath) && route.meta.keepAlive"
      :component="item.component"
      :suspense="route.meta.suspense"
      @refresh="refreshCurrentRoute"
    />
  </keep-alive>

  <base-suspense
    v-if="!route.meta.keepAlive"
    :component="component"
    :suspense="route.meta.suspense"
    @refresh="refreshCurrentRoute"
  />
</template>

<script>
  import { watch, onBeforeUnmount, reactive, inject } from 'vue'
  export default {
    name: 'base-page',
    props: {
      component: {
        type: Object,
        default: () => ({}),
      },

      route: {
        type: Object,
        default: () => ({}),
      },
    },

    setup(props) {
      const components = reactive([])

      const stoper = watch(() => props.component, newValue => {
        const { meta, fullPath } = props.route
        if (meta.forward) {
          components.push({ fullPath, component: newValue })
        } else {
          // 后退删除后面所有路由
          const index = components.findIndex(c => c.fullPath === fullPath)
          if (index > -1) components.splice(index + 1)
        }
      }, { immediate: true })

      onBeforeUnmount(() => stoper())

      return {
        components,
        refreshCurrentRoute: inject('refreshCurrentRoute')
      }
    },
  }
</script>
