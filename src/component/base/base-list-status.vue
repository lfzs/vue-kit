<template>
  <div class="base-list-status">
    <slot name="empty" v-if="status.isEmpty">
      <div class="flex-center">{{ emptyText }}</div>
    </slot>

    <slot name="noMore" v-else-if="status.isNoMore">
      <div class="flex-center">{{ noMoreText }}</div>
    </slot>

    <slot name="loadMore" v-else-if="status.canLoadMore">
      <div class="flex-center" @click="() => $emit('loadMore')">{{ loadMoreText }}</div>
    </slot>

    <slot name="loading" v-else>
      <div class="flex-center"><i class="el-icon-loading" />{{ loadingText }}</div>
    </slot>

  </div>
</template>

<script lang="ts" setup>
  interface Props {
    status: {
      canLoadMore: boolean,
      isNoMore: boolean,
      isLoading: boolean,
      isEmpty: boolean,
    },
    emptyText?: string,
    noMoreText?: string,
    loadMoreText?: string,
    loadingText?: string,
  }

  withDefaults(defineProps<Props>(), {
    emptyText: '暂无数据',
    noMoreText: '已经到底了',
    loadMoreText: '加载更多',
    loadingText: '加载中...',
  })
  defineEmits<{
    (e: 'loadMore'): void,
  }>()
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
