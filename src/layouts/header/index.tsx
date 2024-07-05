import { defineComponent } from 'vue'

import './index.scss'

export default defineComponent({
  name: 'RHeader',
  setup() {
    return () => (
      <div class={['app-logo']}>
        <h1>未实现的Header</h1>
      </div>
    )
  },
})
