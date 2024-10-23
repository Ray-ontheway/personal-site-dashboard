// 保证当前文件在模块作用域中执行，而不是全局作用域; 不加的话，原来的 `vue-router` 在其他模块中import会爆红
export {}

declare module '*.vue' {
  import { DefineComponent } from 'vue'

  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderIdx?: number
    title: string
    requiresAuth?: boolean
    iconName: string
    roles?: string[]
    hidden?: boolean
    hiddenChildren?: boolean
  }
}
