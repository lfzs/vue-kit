<template>
  <div class="base-list-status">
    <slot name="empty" v-if="status.isEmpty">
      <div class="flex-center">{{ emptyText }}</div>
    </slot>

    <slot name="noMore" v-else-if="status.isNoMore">
      <div class="flex-center">{{ reachBottomText }}</div>
    </slot>

    <slot name="loading" v-else>
      <div class="flex-center"><i class="el-icon-loading" />{{ loadingText }}</div>
    </slot>

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

<style lang="less" scoped>
  .base-list-status {
    color: @color2;
    padding: 30px 0;

    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }

</style>
