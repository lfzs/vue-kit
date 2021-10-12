import { createPinia } from 'pinia'

function createStore() {
  const store = createPinia()
  return store

}

export {
  createStore,
}
