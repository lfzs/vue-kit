<template>
  <suspense v-if="suspense">
    <component :is="component" />
    <template #fallback>
      <base-suspense-error v-if="error" :error="error" @refresh="$emit('refresh')" />
      <base-suspense-loading v-else />
    </template>
  </suspense>

  <component :is="component" v-else />
</template>

<script>
  import { defineComponent, ref, onErrorCaptured } from 'vue'
  export default defineComponent({
    name: 'base-suspense',
    emits: ['refresh'],
    props: {
      component: {
        type: Object,
        default: null,
      },

      suspense: {
        type: Boolean,
        default: true,
      },
    },

    setup() {
      const error = ref(null)
      onErrorCaptured((e, instance, info) => (info === 'setup function') && (error.value = e)) // 只捕获 setup function 的 error

      return {
        error,
      }
    },
  })
</script>
