declare module '*.vue' {
  import { DefineComponent } from 'vue'

  type Component = DefineComponent<{}, {}, any>
  export { Component }
}
