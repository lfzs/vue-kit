<template>
  <div class="base-list-status">
    <div class="flex-center" v-if="status.isEmpty">{{ emptyText }}</div>
    <div class="flex-center" v-else-if="status.isNoMore">{{ reachBottomText }}</div>
    <div class="flex-center" v-else><i class="el-icon-loading" />{{ loadingText }}</div>
  </div>
</template>

<script>
  export default {
    name: 'list-status',
    props: {
      status: {
        type: Object,
        required: true,
      },
      emptyText: {
        type: String,
        default: '暂无数据',
      },
      reachBottomText: {
        type: String,
        default: '已经到底了',
      },
      loadingText: {
        type: String,
        default: '加载中...',
      },
    },
  }
</script>

<style lang="less">
  .base-list-status {
    color: @color2;
    padding: 30px 0;

    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }

</style>
