<template>
  <div
    class="base-suspense-error flex-center min-height-fullscreen pointer"
    @click="$emit('refresh')"
  >
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { getErrorMessage } from '@/util'
  import { RequestResponseData } from 'axios'

  interface Props {
    error: RequestResponseData,
  }
  const props = defineProps<Props>()

  defineEmits<{
    (e: 'refresh'): void,
  }>()

  const message = computed(() => getErrorMessage(props.error))
</script>
