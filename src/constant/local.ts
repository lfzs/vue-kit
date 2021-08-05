// 本地存储的 key
// 统一 LOCAL_PREFIX 前缀，方便 clearUselessLocalStorage 函数清理无效的存储 key
import { LOCAL_PREFIX } from './common'
export const TOKEN_KEY = `${LOCAL_PREFIX}TOKEN_KEY`
