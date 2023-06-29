import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router/index'
import pinia from './store'
import registerIcons from './global/register-icons'

createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
