# vue 项目脚手架

## 使用

```shell

# 安装依赖
$ yarn install

# 复制环境配置文件
$ cp .env.development.example .env.development

# 启动
# CSR 模式启动
$ yarn start

# SSR 模式启动
$ yarn start:ssr

```

## 命名规范

- 文件/文件夹命名：单数、小写、中划线分割

## 注意事项

- 会自动全局注册 src/component/base/ 文件夹下的组件(只匹配 base-*.vue 命名的组件，其他命名方式不会注册)

- /static 下的文件将会被复制到根目录
