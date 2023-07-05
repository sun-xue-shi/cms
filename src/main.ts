import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router/index'
import pinia from './store'
import icons from './global/register-icons'

//按需引入样式
import 'element-plus/theme-chalk/el-message.css'
import useLoginStore from './store/login/login'

//全局引入样式
// import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(icons)
app.use(pinia)

const LoginStore = useLoginStore()
LoginStore.loadLocalCacheAction()

app.use(router)
app.mount('#app')
