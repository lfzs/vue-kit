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
    suspense: Boolean,
  })
  defineEmits(['refresh'])

  const error = ref(null)
  onErrorCaptured((e, instance, info) => {
    // 只捕获 setup function 的 error
    if (info === 'setup function') {
      error.value = e
    }
  })
</script>

<!-- TODO ts 下 suspense 会报错  -->
<!-- <script lang="ts" setup>
  import { ref, onErrorCaptured } from 'vue'
  // import type { RouteComponent } from 'vue-router'
  import { RequestResponseData } from 'axios'

  interface Props {
    // component: RouteComponent,
    // TODO vue defineProps 暂时不支持外部导入类型
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any,
    suspense?: boolean,
  }

  withDefaults(defineProps<Props>(), {
    suspense: true,
  })

  defineEmits<{
    (e: 'refresh'): void,
  }>()

  const error = ref<RequestResponseData>()
  onErrorCaptured((e, instance, info) => {
    // 只捕获 setup function 的 error
    if (info === 'setup function') {
      error.value = e
    }
  })
</script> -->
