<script>
import base from '@/component/mixin/base'

import XxLayer from '@/component/frame/layer'

import { Group, XInput, XButton } from 'vux'

export default {
    components: {
        XxLayer,
        Group,
        XInput,
        XButton
    },
    mixins: [base],
    data () {
        return {
            type: 'password',
            login: {
                item: { username: null, password: null }
            }
        }
    },
    created () {
        this.showLoading(false)
    },
    methods: {
        doLogin () {
            this.showLoading(true)
            this.$http
            .post(this.$confapi.user.login, this.login.item)
            .then(
                response => {
                    if (response.data.code === '0') {
                        var data = response.data.data
                        this.$localdata.id = data.user.id
                        this.$localdata.uname = data.user.uname
                        this.$localdata.ctime = data.user.ctime
                        this.$localdata.token = data.auth.token
                        this.$localdata.etime = data.auth.etime

                        return this.$router.push('/home?v=' + new Date().getTime())
                    }
                    this.showLoading(false)
                    this.showAlertMessage({ title: '提示', content: response.data.note })
                },
                response => {
                    this.showLoading(false)
                    this.showAlertMessage({ title: '错误', content: response.data.note })
                }
            )
        }
    }
}
</script>

<template>
    <div class="login">
        <xx-layer
            :alert="alert"
            :confirm="confirm"
            :loading="loading"></xx-layer>
        <group>
            <x-input
                required
                title="账号"
                v-model="login.item.username"
                @keyup.enter.native="doLogin">
            </x-input>
        </group>
        <group>
            <x-input
                required
                title="密码"
                v-model="login.item.password"
                :type="type"
                @keyup.enter.native="doLogin">
            </x-input>
        </group>
        <group><x-button type="primary" @click.native="doLogin">登录</x-button></group>
    </div>
</template>
