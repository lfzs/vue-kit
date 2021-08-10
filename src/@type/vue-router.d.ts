declare module 'vue-router' {
  interface RouteMeta {
    title?: string, // 当前页面的 title
    forward?: boolean, // 当前页面是新页面（前进）
    keepAlive?: boolean, // 当前页面是否需要缓存
    suspense?: boolean, // 当前页面实现需要显示 loading 状态
  }
}

export {}
