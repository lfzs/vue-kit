<template>
  <span class="count-down">{{ time }}</span>
</template>

<script>
  import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'
  import { formatSecond } from '@/util/common'
  import dayjs from 'dayjs'

  export default defineComponent({
    name: 'count-down',
    props: {
      now: {
        type: Date,
        default: () => new Date(),
      },
      end: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        default: 'DD天HH时mm分ss秒',
      },
    },

    emits: ['finish'],

    setup(props, { emit }) {
      let timer = null

      const s = dayjs(props.end).diff(props.now, 'second')

      const second = ref(s > 0 ? s : 0)
      if (second.value > 0) {
        const fn = () => {
          if (second.value > 0) {
            second.value = second.value - 1
          } else {
            emit('finish')
            clearInterval(timer)
          }
        }

        fn()
        timer = setInterval(fn, 1000)
      }

      const time = computed(() => formatSecond(second.value, props.unit))
      onBeforeUnmount(() => clearInterval(timer))
      return { time }
    },
  })
</script>

<style>
  .count-down {
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
