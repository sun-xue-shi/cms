import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router/index'
import pinia from './store'
import registerIcons from './global/register-icons'

//按需引入样式
import 'element-plus/theme-chalk/el-message.css'

//全局引入样式
// import 'element-plus/dist/index.css'
createApp(App).use(router).use(pinia).use(registerIcons).mount('#app')
