import 'es6-promise/auto'

// 全局样式
import 'normalize.css'
import '@/style/var-class/index.less'
import '@/style/icon-class.less'
import '@/style/reset.less'

import * as local from '@/constant/local'
import { LOCAL_PREFIX } from '@/constant'
import { rootElementSetVhProperty, clearUselessLocalStorage } from '@/util/common'

rootElementSetVhProperty()

const usedKeys = Object.values(local)
setTimeout(() => clearUselessLocalStorage(LOCAL_PREFIX, usedKeys), 0)
