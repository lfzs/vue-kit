<template>
  <span class="count-down">{{ time }}</span>
</template>

<script lang="ts" setup>
  import { computed, ref, onBeforeUnmount } from 'vue'
  import { formatSecond } from '@/helper/common'
  import dayjs from 'dayjs'

  interface Props {
    // 时间戳
    now?: number,
    end: number,
    unit?: string,
  }
  const props = withDefaults(defineProps<Props>(), {
    now: Date.now(),
    unit: 'DD天HH时mm分ss秒',
  })

  const emit = defineEmits<{
    (e: 'finish'): void,
  }>()

  let timer = -1
  onBeforeUnmount(() => clearInterval(timer))

  const diff = dayjs(props.end).diff(props.now, 'second')
  const second = ref(diff > 0 ? diff : 0)

  const updateSecond = () => {
    const updater = () => {
      if (second.value > 0) {
        second.value = second.value - 1
      } else {
        emit('finish')
        clearInterval(timer)
      }
    }
    timer = window.setInterval(updater, 1000)
  }
  updateSecond()
  const time = computed(() => formatSecond(second.value, props.unit))
</script>

<style>
  .count-down {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
