<template>
  <div class="base-list-status">
    <div class="flex-center" v-if="listStatus.isEmpty">{{ emptyText }}</div>
    <el-divider v-else-if="listStatus.isNoMore">{{ reachBottomText }}</el-divider>
    <div class="flex-center loading" v-else><i class="el-icon-loading" />{{ loadingText }}</div>
  </div>
</template>

<script>
  export default {
    name: 'list-status',
    props: {
      listStatus: {
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

    .el-divider__text {
      background-color: @bg;
      color: @color2;
      font-weight: normal;
    }

    .loading {
      i {
        font-size: 17px;
        margin-right: 10px;
      }
    }
  }

</style>
