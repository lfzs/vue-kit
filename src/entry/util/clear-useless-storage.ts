import * as local from '@/constant/local'
import { LOCAL_PREFIX } from '@/constant'

// 根据使用到的 key, 清除本地未使用到的存储数据
function clearUselessLocalStorage() {
  const usedKeys = Object.values(local)
  clear(LOCAL_PREFIX, usedKeys)
}

function clear(keyPrefix = '', usedKeys: string[]) {
  const uselessKeys: string[] = []

  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index) ?? ''
    // 固定的 prefix 且 未使用到 => 没用到
    const useless = key.startsWith(keyPrefix) && !usedKeys.includes(key)
    if (useless) uselessKeys.push(key)
  }

  for (const key of uselessKeys) {
    localStorage.removeItem(key)
  }
}

export {
  clearUselessLocalStorage,
}
