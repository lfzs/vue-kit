// 识别静态资源模块
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.woff'
declare module '*.woff2'
declare module '*.eot'
declare module '*.ttf'
declare module '*.otf'

// 识别 .vue 文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明 process.env 下的环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    readonly APP_ENV: 'development' | 'staging' | 'production',
    readonly SSR: '1' | '2', // 1 ssr 客户端、2 ssr 服务端
  }
}
