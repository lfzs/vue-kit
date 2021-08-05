// 识别 .vue 文件
declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

// 声明 process.env 下的环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'development' | 'staging' | 'production',
  }
}
