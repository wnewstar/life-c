import Vue from 'vue'

import App from '@/component/main'

import store from '@/store/index'
import router from '@/router/index'

import axios from 'axios'
import moment from 'moment'

import confapi from '@/config/api'
import confmenu from '@/config/menu'

import '@/plugin/Vhighlight'

import '@/style/style.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = true

Vue.filter('datetime', (time) => {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
})

const http = axios.create({
    timeout: 5000,
    baseURL: process.env.API_ROOT
})

http.interceptors.request.use(
    config => {
        config.headers['X-AUTH-TOKEN'] = localStorage.token
        config.headers['Content-Type'] = 'application/json'

        return config
    }
)

router.beforeEach((to, from, next) => {
    var path = to.path
    var data = localStorage
    var time = new Date().getTime() / 1000
    path === '/login' || (data.token && data.etime > time) ? next() : next('/login')
})

Vue.prototype.$http = http
Vue.prototype.$moment = moment
Vue.prototype.$confapi = confapi
Vue.prototype.$confmenu = confmenu
Vue.prototype.$localdata = localStorage

window.app = new Vue({ el: '#app-box', store, router, template: '<App/>', components: { App: App } })
