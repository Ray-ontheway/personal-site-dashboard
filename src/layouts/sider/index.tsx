import { defineComponent } from 'vue'
import './sider.scss'

export default defineComponent({
  name: 'RSider',
  setup() {
    return () => (
      <el-aside class={['aside']} style="width: 200px">
        <h1>未实现的Sider</h1>
      </el-aside>
    )
  },
})
