import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupMock } from './mock'

import 'virtual:svg-icons-register'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  // setupMock()
  app.mount('#app')
}

bootstrap()
