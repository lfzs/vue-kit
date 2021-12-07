<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'base-client-only',

    setup(props, { slots }) {
      const isMounted = ref(false)
      onMounted(() => isMounted.value = true)
      return () => slots.default && isMounted.value ? slots.default() : null
    },
  })
</script>
