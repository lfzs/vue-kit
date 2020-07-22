# vue-kit Vue 项目脚手架

## 使用

- `yarn start`

## 目录结构

```shell
├── README.md
├── babel.config.js
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── app.vue
│   ├── component # 组件目录
│   ├── constant
│   ├── env.js
│   ├── filter # 过滤器
│   ├── helper
│   ├── main.js # 入口文件
│   ├── router.js # 路由
│   ├── static
│   ├── store
│   ├── style
│   ├── util
│   └── view
├── webpack.config.js
└── yarn.lock
```

## 注意事项

- 自动全局注册 src/component 文件下的组件(只匹配 base-*.vue 命名的组件，其他命名方式不会注册)。element-ui 组件按需加载, 需要手动在 src/component/element-ui 添加
