declare module 'vue-router' {
  interface RouteMeta {
    forward?: boolean, // 当前页面是新页面（前进，默认 true）
    keepAlive?: boolean, // 当前页面是否需要缓存
    suspense?: boolean, // 当前页面异步加载需要显示的 loading 状态（默认 true）
  }
}

export {}
