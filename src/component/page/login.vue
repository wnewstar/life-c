<script>
import Common from '@/component/common/common'
import { Group, XInput, XButton, Alert, Loading, TransferDom } from 'vux'

export default {
    components: {
        Alert,
        Loading,
        Group,
        XInput,
        XButton
    },
    directives: {
        TransferDom
    },
    mixins: [Common],
    data () {
        return {
            api: {
                user: this.apim.user
            },
            type: 'password',
            login: {
                item: { username: null, password: null }
            }
        }
    },
    created () {
        this.setLoading(false)
    },
    methods: {
        doLogin () {
            this.setLoading(true)
            this.http.post(this.api.user.login, this.login.item).then(
                response => {
                    if (response.body.code === '0') {
                        var data = response.body.data
                        this.local.id = data.user.id
                        this.local.uname = data.user.uname
                        this.local.ctime = data.user.ctime
                        this.local.token = data.auth.token
                        this.local.etime = data.auth.etime

                        return this.$router.push('/home?v=' + new Date().getTime())
                    }
                    this.setLoading(false)
                    this.showAlertMessage({ title: '提示', content: response.body.text })
                },
                response => {
                    this.setLoading(false)
                    this.showAlertMessage({ title: '错误', content: response.body.text })
                }
            )
        }
    }
}
</script>

<style scoped>
    div.login {
        top: 40%;
        left: 50%;
        width: 90%;
        position: absolute;
        transform: translate(-50%, -50%);
    }
</style>

<template>
    <div class="login">
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

        <loading :show="flagm.a"></loading>
        <div v-transfer-dom><alert v-model="alert.show" :title="alert.title" :content="alert.content"></alert></div>
    </div>
</template>
