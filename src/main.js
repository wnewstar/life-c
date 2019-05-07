import Vue from 'vue'
import VueResource from 'vue-resource'

import App from '@/component/main'
import router from '@/router/index.js'
import apimobile from '@/config/apimobile.js'

import moment from 'moment'

import '@/plugin/Vhighlight.js'

import '@/style/style.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = true

Vue.use(VueResource)

Vue.filter('datetime', (time) => {
    return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss')
})

Vue.http.interceptors.push((request, next) => {
    request.headers.set('Content-Type', 'application/json'), next()
})

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-AUTH-TOKEN', localStorage.token), next()
})

router.beforeEach((to, from, next) => {
    var path = to.path
    var data = localStorage
    var time = new Date().getTime() / 1000
    path === '/login' || (data.token && data.etime > time) ? next() : next('/login')
})

Vue.prototype.http = Vue.http
Vue.prototype.apim = apimobile
Vue.prototype.local = localStorage

window.app = new Vue({ el: '#app-box', router, template: '<App/>', components: { App: App } })
