# vue 项目脚手架

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
│   ├── constant # 常量
│   ├── env.js
│   ├── filter # 过滤器
│   ├── helper
│   ├── main.js # 入口文件
│   ├── router.js # 路由
│   ├── static
│   ├── store
│   │   ├── helper
│   │   │   ├── Cache.js # 将需要缓存的 store 缓存到内存中
│   │   │   └── List.js # 列表 store 可继承使用
│   │   └── index.js
│   ├── style
│   ├── util
│   │   └── fetch-action.js # 用来装饰 store 的 fetchData 方法，监听请求是否完成，并添加 tryFetchData 方法
│   └── view
├── webpack.config.js
└── yarn.lock
```

## 命名规范

- 文件/文件夹命名：单数、小写、中划线分割、构造函数的文件首字母大写(如: Item-detail-store.js)

## 注意事项

- 自动全局注册 src/component 文件下的组件(只匹配 base-*.vue 命名的组件，其他命名方式不会注册)

- element-plus 组件按需加载, 需要手动在 src/component/element-plus 添加
