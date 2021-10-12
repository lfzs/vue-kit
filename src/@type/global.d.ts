// 识别静态资源模块
declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.bmp'
declare module '*.webp'
declare module '*.ttf'
declare module '*.otf'
declare module '*.woff'
declare module '*.woff2'
declare module '*.eot'

// 识别 .vue 文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明 process.env 下的环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production', // 提供给第三方依赖使用
    readonly APP_ENV: 'development' | 'staging' | 'production', // 环境区分
    readonly PORT: string, // Node 服务端口
    readonly SERVER_HOST: string, // 后端 API 服务地址
  }
}

// 声明 webpack 注入的环境变量
// declare const __APP_ENV__: 'development' | 'staging' | 'production'
declare const __SSR_ENV__: 'client' | 'server'

interface Window {
  __INITIAL_STATE__: any, // 服务端渲染挂载的属性
}
