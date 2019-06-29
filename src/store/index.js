import Vue from 'vue'
import vuex from 'vuex'

import axios from 'axios'

import confapi from '@/config/api'

Vue.use(vuex)

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

export default new vuex.Store(
    {
        state: {
            confdata: { flag: false, list: {}, tree: {} }
        },
        actions: {
            initConf (context, args) {
                context.commit('initConfData', args)
            }
        },
        mutations: {
            initConfData (state, force) {
                if (!force && state.confdata.flag) {
                    Promise.resolve(true)
                } else {
                    Promise
                    .all(
                        [
                            new Promise((resolve, reject) => {
                                http
                                .get(confapi.conf.tree)
                                .then(r => { resolve(r) }, r => { reject(r) })
                            }),
                            new Promise((resolve, reject) => {
                                http
                                .get(confapi.conf.list)
                                .then(r => { resolve(r) }, r => { reject(r) })
                            })
                        ]
                    )
                    .then(back => {
                        console.log(back)
                        if (back[0].data.code === '0' && back[1].data.code === '0') {
                            state.confdata.tree = back[0].data.data
                            state.confdata.list = back[1].data.data
                            state.confdata.flag = true
                        } else {
                            var error = new Error()

                            return Promise.reject(Object.assign(error, { name: '错误', message: '获取配置数据错误' }))
                        }
                    })
                }
            }
        }
    }
)
