// 根元素添加 --vh 变量
function rootElementSetVhProperty() {
  // 1vh = window.innerHeight * 0.01px
  const vh = `${window.innerHeight * 0.01}px`
  const setProperty = () => document.documentElement.style.setProperty('--vh', vh)
  setProperty()
  window.addEventListener('resize', setProperty)
}
export {
  rootElementSetVhProperty,
}
