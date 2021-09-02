<template>
  <div class="flex-center">
    <img src="@/static/logo.png" class="icon-logo">
  </div>
  <h2 class="flex-center">{{ desc }}</h2>
  <el-button type="primary">主要按钮</el-button>
  <count-down :end="1630492642042" />
</template>

<script setup>
  import { CountDown } from '@/component/common'
  import { ElButton } from 'element-plus'

  import { homeStore } from '@/store'
  await homeStore.fetchData()
  const desc = 'Hello Vue!'
</script>
