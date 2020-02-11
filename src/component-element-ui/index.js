// element-ui 组件按需加载, 需要手动添加
// 所有组件 https://github.com/ElemeFE/element/blob/master/components.json , 导入命名采用 大驼峰
// 自定义主题 https://element.eleme.cn/#/zh-CN/component/custom-theme

import Vue from 'vue'
import {
  Loading,
  MessageBox,
  Message,
  Button,
} from 'element-ui'

Vue.component(Button.name, Button)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message
