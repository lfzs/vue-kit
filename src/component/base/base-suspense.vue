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

<script setup>
  import { ref, onErrorCaptured } from 'vue'

  defineProps({
    component: {
      type: Object,
      default: () => ({})
    },
    suspense: {
      type: Boolean,
      default: true,
    },
  })
  defineEmits(['refresh'])

  const error = ref(null)
  onErrorCaptured((e, instance, info) => {
    // 只捕获 setup function 的 error
    if (info === 'setup function') {
      error.value = e || {}
    }
  })
</script>
