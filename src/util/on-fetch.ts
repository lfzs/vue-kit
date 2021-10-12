function onFetch(fn: () => any) {
  if (__SSR_ENV__) {
    if (__SSR_ENV__ === 'server') return fn()
    else if (!window.__INITIAL_STATE__) return fn()
  } else {
    return fn()
  }
}

export {
  onFetch,
}
