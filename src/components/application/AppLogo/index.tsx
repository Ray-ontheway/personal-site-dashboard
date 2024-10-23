import { defineComponent } from 'vue'
import { SvgIcon } from '@components/Icon'

import './index.scss'

export default defineComponent({
  name: 'AppLogo',
  setup() {
    return () => (
      <div class={['app-logo']}>
        <SvgIcon name="logo" color={'#fff'} class={['app-logo-icon']} />
        <h1>R-Admin</h1>
      </div>
    )
  },
})
